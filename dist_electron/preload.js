const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  copyJson: (title) => ipcRenderer.send('copy-json', title),
  copyMd5TextDigest: (title) => ipcRenderer.send('copy-md5', title)
})