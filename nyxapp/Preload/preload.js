const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    closeApplication: () => ipcRenderer.send("close_application"),
    maximizeApplication: () => ipcRenderer.send("maximize_application"),
    minimizeApplication: () => ipcRenderer.send("minimize_application")
});