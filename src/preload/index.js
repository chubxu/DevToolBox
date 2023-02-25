import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const electronAPI = {
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
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
    // contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', electronAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electronAPI = electronAPI
  // window.api = api
}
