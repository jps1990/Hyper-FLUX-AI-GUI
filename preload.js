// preload.js

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Appel à l'API Replicate pour exécuter un modèle
    runReplicateModel: (data) => ipcRenderer.invoke('run-replicate-model', data),

    // Gestion du token API : obtenir et définir
    getApiToken: () => ipcRenderer.invoke('get-api-token'),
    setApiToken: (token) => ipcRenderer.invoke('set-api-token', token),

    // Fonctions pour gérer les prompts
    getPrompts: () => ipcRenderer.invoke('get-prompts'),
    savePrompt: (prompt) => ipcRenderer.invoke('save-prompt', prompt),
    deletePrompt: (id) => ipcRenderer.invoke('delete-prompt', id),

    // Fonctions pour gérer les liens LoRA
    getLoraLinks: () => ipcRenderer.invoke('get-lora-links'),
    saveLoraLink: (link) => ipcRenderer.invoke('save-lora-link', link),
    deleteLoraLink: (id) => ipcRenderer.invoke('delete-lora-link', id),

    // Fonction pour recevoir les réponses depuis le backend
    receive: (channel, func) => {
        const validChannels = ['replicate-response', 'env-data'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});
