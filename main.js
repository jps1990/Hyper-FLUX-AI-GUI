const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const Replicate = require('replicate');
const { v4: uuidv4 } = require('uuid'); // Ajout de UUID pour des IDs uniques si nécessaire

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
    'flux-dev': 'black-forest-labs/flux-dev',
    'flux-pro': 'black-forest-labs/flux-pro',
    'flux-schnell': 'black-forest-labs/flux-schnell',
    'flux-mjv3': 'fofr/flux-mjv3:f8bba190713142471df7ef2adba00fe9c84f5d63b5c48702082f2718e7f4d8b2' // Ajout du hash de version correct
};

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

        // Envoyer la réponse au frontend
        event.sender.send('replicate-response', { output: output, model: model, seed: input.seed });

        return { output: output };
    } catch (error) {
        console.error('Erreur lors de l\'appel à Replicate:', error); // Log de l'erreur
        event.sender.send('replicate-response', { error: error.message, model: model });
        return { error: error.message };
    }
});

// Gestion des Tokens API
ipcMain.handle('get-api-token', async () => {
    return data.apiToken;
});

ipcMain.handle('set-api-token', async (event, token) => {
    // Validation du format du token
    const tokenRegex = /^r8_[A-Za-z0-9]{16,}$/; // Ajustez la regex selon le format exact
    if (!tokenRegex.test(token)) {
        throw new Error('Format de token invalide.');
    }
    data.apiToken = token;
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
