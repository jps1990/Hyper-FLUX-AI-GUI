const { app, BrowserWindow, ipcMain, shell } = require('electron'); // Ajout de 'shell'
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const Replicate = require('replicate');
const { v4: uuidv4 } = require('uuid'); // Pour des IDs uniques

// Charger les variables d'environnement depuis .env
dotenv.config();

// Chemin vers le dossier des données utilisateur
const userDataPath = app.getPath('userData');
const dataFilePath = path.join(userDataPath, 'data.json');

// Initialisation des données
let data = {
    apiToken: process.env.REPLICATE_API_TOKEN || '',
    prompts: [], // Tableau de { id, prompt }
    loraLinks: [], // Tableau de { id, link }
    seeds: [] // Liste des seeds : { id, value }
};

// Fonction pour charger les données depuis data.json
function loadData() {
    try {
        if (fs.existsSync(dataFilePath)) {
            const rawData = fs.readFileSync(dataFilePath);
            data = JSON.parse(rawData);
            
            // Assurez-vous que toutes les propriétés existent et sont des tableaux
            data.seeds = Array.isArray(data.seeds) ? data.seeds : [];
            data.prompts = Array.isArray(data.prompts) ? data.prompts : [];
            data.loraLinks = Array.isArray(data.loraLinks) ? data.loraLinks : [];
            data.apiToken = data.apiToken || '';
        } else {
            saveData(); // Créer data.json avec les données par défaut
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // Réinitialiser les données en cas d'erreur
        data = {
            apiToken: '',
            prompts: [],
            loraLinks: [],
            seeds: []
        };
        saveData();
    }
}

// Fonction pour sauvegarder les données dans data.json
function saveData() {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données:', error);
    }
}

// Charger les données au démarrage
loadData();

// Définir les versions des modèles avec le format correct 'owner/name:version' si nécessaire
const MODEL_VERSIONS = {
    'flux-16step': 'lucataco/hyper-flux-16step:382cf8959fb0f0d665b26e7e80b8d6dc3faaef1510f14ce017e8c732bb3d1eb7',
    'flux-8step': 'lucataco/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad',
    'flux-schnell': 'black-forest-labs/flux-schnell',
    'flux-mjv3': 'fofr/flux-mjv3:f8bba190713142471df7ef2adba00fe9c84f5d63b5c48702082f2718e7f4d8b2', // Hash de version correct
    'flux-pro': 'black-forest-labs/flux-pro',
    'flux-dev': 'black-forest-labs/flux-dev'
};

// Classe Mersenne Twister pour générer des seeds aléatoires
class MersenneTwister {
    constructor(seed) {
        if (seed === undefined) {
            seed = new Date().getTime();
        }
        this.mt = new Array(624);
        this.mti = 625;
        this.init_genrand(seed);
    }

    init_genrand(s) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < 624; this.mti++) {
            let s_val = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = (((s_val & 0xffff0000) >>> 16) * 1812433253) + ((s_val & 0x0000ffff) * 1812433253) + this.mti;
            this.mt[this.mti] >>>= 0;
        }
    }

    genrand_int32() {
        let y;
        const mag01 = [0x0, 0x9908b0df];

        if (this.mti >= 624) {
            let kk;

            if (this.mti === 625) {
                this.init_genrand(5489);
            }

            for (kk = 0; kk < 227; kk++) {
                y = (this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff);
                this.mt[kk] = this.mt[kk + 397] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < 623; kk++) {
                y = (this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff);
                this.mt[kk] = this.mt[kk - (624 - 397)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[623] & 0x80000000) | (this.mt[0] & 0x7fffffff);
            this.mt[623] = this.mt[396] ^ (y >>> 1) ^ mag01[y & 0x1];

            this.mti = 0;
        }

        y = this.mt[this.mti++];
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);

        return y >>> 0;
    }
}

// Fonction pour créer la fenêtre principale
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Charger le preload.js
            nodeIntegration: false,  // Désactiver l'intégration de Node.js pour la sécurité
            contextIsolation: true,  // Activer contextIsolation pour utiliser contextBridge
            enableRemoteModule: false // Désactiver le remote module pour la sécurité
        }
    });

    win.loadFile('index.html');

    // Ouvrir les outils de développement pour le debugging (décommentez si nécessaire)
    // win.webContents.openDevTools();

    // Envoyer les données d'environnement au frontend après le chargement de la page
    win.webContents.on('did-finish-load', () => {
        const token = data.apiToken;
        console.log('Token API:', token); // Log pour voir le token
        // Envoyer le token, mais frontend doit le masquer
        win.webContents.send('env-data', { apiToken: token });
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Fonction pour exécuter un modèle Replicate
ipcMain.handle('run-replicate-model', async (event, { model, input }) => {
    try {
        const modelVersion = MODEL_VERSIONS[model];
        if (!modelVersion) {
            throw new Error(`Modèle inconnu: ${model}`);
        }

        // Vérifier que le prompt est bien présent
        if (!input.prompt) {
            throw new Error('Le champ "prompt" est requis.');
        }

        // Validation de la seed
        if (typeof input.seed !== 'number' || input.seed < 0 || input.seed > 4294967295) {
            throw new Error('Seed invalide. Elle doit être un nombre entre 0 et 4294967295.');
        }

        // Vérifier les dimensions personnalisées et l'aspect ratio
        const ratio = input.aspect_ratio || '1:1'; // Valeur par défaut
        let width, height;

        if (ratio !== 'custom') {
            switch (ratio) {
                case '16:9':
                    width = 1280;
                    height = 720;
                    break;
                case '21:9':
                    width = 1440;
                    height = 640;
                    break;
                case '3:2':
                    width = 960;
                    height = 640;
                    break;
                case '2:3':
                    width = 640;
                    height = 960;
                    break;
                case '4:5':
                    width = 800;
                    height = 1000;
                    break;
                case '5:4':
                    width = 1000;
                    height = 800;
                    break;
                case '3:4':
                    width = 768;
                    height = 1024;
                    break;
                case '4:3':
                    width = 1024;
                    height = 768;
                    break;
                case '9:16':
                    width = 720;
                    height = 1280;
                    break;
                case '9:21':
                    width = 640;
                    height = 1440;
                    break;
                default:
                    width = 1024;
                    height = 1024;
            }

            // Ajouter les dimensions au payload
            input.width = width;
            input.height = height;
        } else {
            // 'custom' aspect_ratio: utiliser input.width et input.height tel que défini par le frontend
            if (!input.width || !input.height) {
                throw new Error('Dimensions personnalisées manquantes pour le rapport d\'aspect personnalisé.');
            }
            // Optionnel : Valider les dimensions
            if (input.width < 256 || input.height < 256 || input.width > 1440 || input.height > 1440) {
                throw new Error('Dimensions personnalisées invalides. La largeur et la hauteur doivent être entre 256 et 1440.');
            }
        }

        // Initialiser Replicate avec le token API actuel
        const replicate = new Replicate({
            auth: data.apiToken
        });

        console.log(`Exécution du modèle: ${modelVersion} avec l'entrée:`, input); // Log des détails
        console.log(`Données envoyées à Replicate:`, JSON.stringify(input, null, 2)); // Log des données

        const output = await replicate.run(
            modelVersion,
            { input: input }
        );

        console.log('Sortie de Replicate:', output); // Log de la sortie

        // Retourner la sortie au frontend
        return { output: output };
    } catch (error) {
        console.error('Erreur lors de l\'appel à Replicate:', error); // Log de l'erreur
        return { error: error.message };
    }
});

// Gestion des Tokens API
ipcMain.handle('get-api-token', async () => {
    return data.apiToken;  // Retourne le token stocké
});

ipcMain.handle('set-api-token', async (event, token) => {
    // Validation du format du token
    const tokenRegex = /^r8_[A-Za-z0-9]{16,}$/; // Regex pour valider les tokens
    if (!tokenRegex.test(token)) {
        throw new Error('Format de token invalide.');  // Erreur si le format ne correspond pas
    }
    
    data.apiToken = token;  // Si valide, on stocke le token
    saveData();  // Sauvegarde des données (implémentation déjà existante)
    return { success: true };  // Retourne une confirmation de succès
});


// Gestion du `delete-api-token`
ipcMain.handle('delete-api-token', async () => {
    data.apiToken = '';
    saveData();
    return { success: true };
});

// Gestion des Seeds
ipcMain.handle('get-seeds', async () => {
    return data.seeds;
});

ipcMain.handle('save-seed', async (event, seedValue) => {
    // Validation de la seed
    const seedNum = parseInt(seedValue, 10);
    if (isNaN(seedNum) || seedNum < 0 || seedNum > 4294967295) {
        throw new Error('Seed invalide. Elle doit être un nombre entre 0 et 4294967295.');
    }

    const id = uuidv4(); // Utiliser UUID pour un identifiant unique
    data.seeds.push({ id, value: seedNum });
    saveData();
    return { success: true, id };
});

ipcMain.handle('delete-seed', async (event, id) => {
    const index = data.seeds.findIndex(seed => seed.id === id);
    if (index !== -1) {
        data.seeds.splice(index, 1);
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Seed non trouvée.' };
});

// Gestion des Prompts sauvegardés
ipcMain.handle('get-prompts', async () => {
    return data.prompts;
});

ipcMain.handle('save-prompt', async (event, prompt) => {
    const id = uuidv4();
    data.prompts.push({ id, prompt });
    saveData();
    return { success: true, id };
});

ipcMain.handle('delete-prompt', async (event, id) => {
    const index = data.prompts.findIndex(p => p.id === id);
    if (index !== -1) {
        data.prompts.splice(index, 1);
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Prompt non trouvé' };
});

// Gestion des Lora Links sauvegardés
ipcMain.handle('get-lora-links', async () => {
    return data.loraLinks;
});

ipcMain.handle('save-lora-link', async (event, link) => {
    const id = uuidv4();
    data.loraLinks.push({ id, link });
    saveData();
    return { success: true, id };
});

ipcMain.handle('delete-lora-link', async (event, id) => {
    const index = data.loraLinks.findIndex(l => l.id === id);
    if (index !== -1) {
        data.loraLinks.splice(index, 1);
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Lora Link non trouvé' };
});

// Fonction pour générer une seed aléatoire
ipcMain.handle('generate-random-seed', async (event, seed) => {
    try {
        const mt = new MersenneTwister(seed);
        const generatedSeed = mt.genrand_int32();
        return generatedSeed;
    } catch (error) {
        console.error('Erreur lors de la génération de la seed:', error);
        throw new Error('Erreur lors de la génération de la seed.');
    }
});

// **Nouvelle Fonctionnalité : Ouvrir des Liens Externes**
ipcMain.on('open-external-link', (event, url) => {
    // Vérifiez que l'URL est une chaîne valide
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
        shell.openExternal(url).catch(err => {
            console.error('Erreur lors de l\'ouverture du lien externe:', err);
        });
    } else {
        console.error('URL invalide reçue pour l\'ouverture externe:', url);
    }
});
