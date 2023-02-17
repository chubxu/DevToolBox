'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, clipboard, nativeTheme } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

import { readFileSync, writeFile, mkdir } from 'fs';
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'

// 处理复制到粘贴板操作
function handleCopyAction(event, text) {
  clipboard.writeText(text)
}

// 处理黑暗模式转换操作
function handleDarkModeToggle() {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
}

// 处理读取文件操作
function handleReadFile(event, hostName) {
  if (hostName === 'default') {
    let defaultHostFilePath = 'C:/Windows/System32/drivers/etc/hosts'
    let content = readFileSync(defaultHostFilePath, 'utf8')
    return content
  }
}

// 处理写入host文件操作
function writeHostFile(event, hostListString) {
  let hostList = JSON.parse(hostListString)
  mkdir('./host', (err) => {
    if (err) {
      console.log('host文件夹已经存在')
    }
    hostList.forEach(host => {
      if (host.name != 'default') {
        writeFile(`./host/${host.name}`, host.content, {flag: 'w+'}, (err) => {
          if (err) throw err
          console.log('The file has been saved!')
        })
      }
    })
  })
}

function registerIpcHandler() {
  ipcMain.on('copy', handleCopyAction)
  ipcMain.handle('dark-mode:toggle', handleDarkModeToggle)
  ipcMain.handle('read-file', handleReadFile)
  ipcMain.handle('write-host-file', writeHostFile)
}

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 隐藏菜单栏
// Menu.setApplicationMenu(null)
async function createWindow() {
  const win = new BrowserWindow({
    // 最小窗口尺寸
    // minWidth: 900,
    // minHeight: 600,
    resizable: false,

    // 添加icon
    icon: path.join(__dirname, '/icon.png'),

    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,

      nodeIntegration: true,
      // 预加载
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // 最大化窗口展示
  win.maximize()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  registerIpcHandler()
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}