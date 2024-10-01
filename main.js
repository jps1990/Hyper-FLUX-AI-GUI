// main.js

	require('dotenv').config(); // Charger les variables d'environnement depuis .env
	const { app, BrowserWindow, ipcMain } = require('electron');
	const path = require('path');
	const Replicate = require('replicate');
	const fs = require('fs');

	let replicateApiToken = process.env.REPLICATE_API_TOKEN; // Récupère le token depuis .env

	// Gestion de la mise à jour du token via IPC
	ipcMain.handle('set-replicate-token', (event, newToken) => {
		replicateApiToken = newToken; // Mise à jour du token API
		console.log(`Nouveau token API défini: ${replicateApiToken}`);
		return { success: true };
	});

	// Fonction d'appel à l'API Replicate avec le token
	ipcMain.handle('invoke-replicate-api', async (event, dataToSend) => {
		if (!replicateApiToken) {
			console.error("Token API manquant.");
			throw new Error("Le token API n'est pas configuré.");
		}
		try {
			const response = await axios.post('https://api.replicate.com/v1/predictions', dataToSend, {
				headers: {
					Authorization: `Token ${replicateApiToken}`
				}
			});
			return response.data;
		} catch (error) {
			console.error("Erreur lors de l'appel à l'API Replicate:", error);
			throw error;
		}
	});

// Chemin vers le dossier des données utilisateur
const userDataPath = app.getPath('userData');
const dataFilePath = path.join(userDataPath, 'data.json');

// Initialisation des données
let data = {
    apiToken: process.env.REPLICATE_API_TOKEN || '',
    prompts: [], // Tableau de { id, prompt }
    loraLinks: [] // Tableau de { id, link }
};

// Fonction pour charger les données depuis data.json
function loadData() {
    try {
        if (fs.existsSync(dataFilePath)) {
            const rawData = fs.readFileSync(dataFilePath);
            data = JSON.parse(rawData);
        } else {
            saveData(); // Créer data.json avec les données par défaut
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
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

    // Envoyer les données d'environnement au frontend après le chargement de la page
    win.webContents.on('did-finish-load', () => {
        const token = data.apiToken;
        console.log('Token API:', token); // Log pour voir le token
        win.webContents.send('env-data', { apiToken: token });
    });

    // Ouvrir les outils de développement pour le debugging (décommentez si nécessaire)
    // win.webContents.openDevTools();
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

// Gérer les requêtes venant du frontend

// Exécuter un modèle Replicate
ipcMain.handle('run-replicate-model', async (event, { model, input }) => {
    try {
        const modelVersion = MODEL_VERSIONS[model];
        if (!modelVersion) {
            throw new Error(`Modèle inconnu: ${model}`);
        }

        // Initialiser Replicate avec le token API actuel
        const replicate = new Replicate({
            auth: data.apiToken
        });

        console.log(`Exécution du modèle: ${modelVersion} avec l'entrée:`, input); // Log des détails

        const output = await replicate.run(
            modelVersion,
            { input: input }
        );

        console.log('Sortie de Replicate:', output); // Log de la sortie

        // Envoyer la réponse au frontend
        event.sender.send('replicate-response', { output: output, model: model });

        return { output: output };
    } catch (error) {
        console.error('Erreur lors de l\'appel à Replicate:', error); // Log de l'erreur
        event.sender.send('replicate-response', { error: error.message, model: model });
        return { error: error.message };
    }
});

// Obtenir le Token API
ipcMain.handle('get-api-token', async () => {
    return data.apiToken;
});

// Définir le Token API
ipcMain.handle('set-api-token', async (event, token) => {
    data.apiToken = token;
    saveData();
    return { success: true };
});

// Obtenir les Prompts sauvegardés
ipcMain.handle('get-prompts', async () => {
    return data.prompts;
});

// Sauvegarder un nouveau Prompt
ipcMain.handle('save-prompt', async (event, prompt) => {
    const id = Date.now();
    data.prompts.push({ id, prompt });
    saveData();
    return { success: true, id };
});

// Supprimer un Prompt
ipcMain.handle('delete-prompt', async (event, id) => {
    const index = data.prompts.findIndex(p => p.id === id);
    if (index !== -1) {
        data.prompts.splice(index, 1);
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Prompt non trouvé' };
});

// Obtenir les Lora Links sauvegardés
ipcMain.handle('get-lora-links', async () => {
    return data.loraLinks;
});

// Sauvegarder un nouveau Lora Link
ipcMain.handle('save-lora-link', async (event, link) => {
    const id = Date.now();
    data.loraLinks.push({ id, link });
    saveData();
    return { success: true, id };
});

// Supprimer un Lora Link
ipcMain.handle('delete-lora-link', async (event, id) => {
    const index = data.loraLinks.findIndex(l => l.id === id);
    if (index !== -1) {
        data.loraLinks.splice(index, 1);
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Lora Link non trouvé' };
});
