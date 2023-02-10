const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  copyJson: (title) => ipcRenderer.send('copy', title),
  copyMd5TextDigest: (title) => ipcRenderer.send('copy', title),
  copyConvertedTime: (title) => ipcRenderer.send('copy', title),
  copyConvertedTimestamp: (title) => ipcRenderer.send('copy', title)
})