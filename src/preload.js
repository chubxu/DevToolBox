const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  copy: (text) => ipcRenderer.send('copy', text),
  copyJson: (title) => ipcRenderer.send('copy', title),
  copyMd5TextDigest: (title) => ipcRenderer.send('copy', title),
  copyConvertedTime: (title) => ipcRenderer.send('copy', title),
  copyConvertedTimestamp: (title) => ipcRenderer.send('copy', title),

  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),

  readHostFile: () => ipcRenderer.invoke('read-host-file'),
  writeHostFile: (hostList) => ipcRenderer.invoke('write-host-file', hostList),
  writeSystemHostFile: (content) => ipcRenderer.invoke('write-system-host-file', content),
  deleteHostFile: (filename) => ipcRenderer.invoke('delete-host-file', filename),
})