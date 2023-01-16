const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  copyJson: (title) => ipcRenderer.send('copy-json', title)
})