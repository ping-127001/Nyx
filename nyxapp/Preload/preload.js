const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    closeApplication: () => ipcRenderer.send("close_application")
});