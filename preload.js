const { contextBridge, ipcRenderer } = require('electron');
//const { v4: uuidv4 } = require('uuid'); // Assurez-vous que vous avez installé 'uuid'

// Exposer l'API Electron via contextBridge
contextBridge.exposeInMainWorld('electronAPI', {
    // Appel à l'API Replicate pour exécuter un modèle
    runReplicateModel: (data) => ipcRenderer.invoke('run-replicate-model', data),

	// Get Token by Web Browser
	openExternalLink: (url) => ipcRenderer.send('open-external-link', url),

    // Gestion du token API : obtenir et définir
    getApiToken: () => ipcRenderer.invoke('get-api-token'),
    setApiToken: (token) => ipcRenderer.invoke('set-api-token', token),
    deleteApiToken: () => ipcRenderer.invoke('delete-api-token'), // Ajouté

    // Fonctions pour gérer les prompts
    getPrompts: () => ipcRenderer.invoke('get-prompts'),
    savePrompt: (prompt) => ipcRenderer.invoke('save-prompt', prompt),
    deletePrompt: (id) => ipcRenderer.invoke('delete-prompt', id),

    // Fonctions pour gérer les liens LoRA
    getLoraLinks: () => ipcRenderer.invoke('get-lora-links'),
    saveLoraLink: (link) => ipcRenderer.invoke('save-lora-link', link),
    deleteLoraLink: (id) => ipcRenderer.invoke('delete-lora-link', id),

    // Fonctions pour gérer les Seeds
    getSeeds: () => ipcRenderer.invoke('get-seeds'),
    saveSeed: (seed) => ipcRenderer.invoke('save-seed', seed),
    deleteSeed: (id) => ipcRenderer.invoke('delete-seed', id),

    // Nouvelle Fonction : Générer une Seed Aléatoire
    generateRandomSeed: (seed) => ipcRenderer.invoke('generate-random-seed', seed),

    // Fonction pour envoyer des messages au main
    send: (channel, data) => {
        const validChannels = [
            'request-env-data', 
            'setApiToken', 
            'runReplicateModel', 
            'savePrompt', 
            'deletePrompt', 
            'getPrompts', 
            'saveLoraLink', 
            'deleteLoraLink', 
            'getLoraLinks',
            'get-seeds',
            'save-seed',
            'delete-seed',
            'generate-random-seed',
            'delete-api-token' // Ajouter le canal ici
        ];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

    // Fonction pour recevoir des messages du main
    receive: (channel, func) => {
        const validChannels = ['env-data', 'setApiToken-response', 'replicate-response'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});
