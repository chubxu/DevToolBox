import { 
  app, 
  BrowserWindow, 
  clipboard, 
  globalShortcut, 
  ipcMain, 
  Menu, 
  nativeTheme,
  protocol, 
  shell, 
} from 'electron'
import { join } from 'path'
import { readFileSync, writeFile, mkdir, mkdirSync, rmSync, readdirSync } from 'fs';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?assets'

let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'DevToolBox',
    frame: false,

    autoHideMenuBar: true,

    // 最小窗口尺寸
    minWidth: 900,
    minHeight: 600,

    

    // 添加icon
    icon: join(__dirname, "../../resources/icon.png"),
    // ...(process.platform === 'linux' ? { icon } : { icon }),

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 注册全局快捷键
  globalShortcut.register('CommandOrControl+K', () => {
    mainWindow.webContents.send('show-global-search', true)
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

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
function readHostFileHandler(event) {
  try {
    mkdirSync('./host')
  } catch(err) {
    console.log('host文件夹已经存在')
  }

  let activeName
  let hostList = []

  let fileArray = readdirSync('./host')
  fileArray.forEach(file => {
    if (!file.startsWith('.')) {
      let fileContent = readFileSync(`./host/${file}`, 'utf8')
      hostList.push({
        name: file, 
        switch: false,
        content: fileContent,
        deleteButtonVisible: false,
      })
    } else {
      activeName = readFileSync(`./host/${file}`, 'utf8')
    }
  })

  if (activeName) {
    hostList.forEach(host => {
      if (host.name === activeName) {
        host.switch = true
      }
    })
  } else {
    let defaultHostFilePath = 'C:/Windows/System32/drivers/etc/hosts'
    let content = readFileSync(defaultHostFilePath, 'utf8')
    hostList.unshift({
      name: 'default',
      switch: true,
      content: content,
      deleteButtonVisible: false,
    })
  }
  

  return JSON.stringify(hostList)
}

// 处理写入host文件操作
function writeHostFileHandler(event, hostListString) {
  let hostList = JSON.parse(hostListString)
  mkdir('./host', (err) => {
    if (err) {
      console.log('host文件夹已经存在')
    }
    hostList.forEach(host => {
      if (host.switch) {
        writeFile('./host/.active', host.name, {flag: 'w+'}, (err) => {
          if (err) throw err
          console.log('当前激活host写入成功!')
        })
      }
      writeFile(`./host/${host.name}`, host.content, {flag: 'w+'}, (err) => {
        if (err) throw err
        console.log(`${host.name}文件写入成功`)
      })
    })
  })
}

// 处理删除host文件
function deleteHostFileHandler(event, hostName) {
  rmSync(`./host/${hostName}`, {
    force: true
  })
}

// 处理写入系统host文件
function writeSystemHostFileHandler(event, content) {
  writeFile('C:/Windows/System32/drivers/etc/hosts', content, {flag: 'w+'}, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
  })
}

function registerIpcHandler() {
  ipcMain.on('copy', handleCopyAction)
  ipcMain.handle('dark-mode:toggle', handleDarkModeToggle)
  ipcMain.handle('read-host-file', readHostFileHandler)
  ipcMain.handle('write-host-file', writeHostFileHandler)
  ipcMain.handle('delete-host-file', deleteHostFileHandler)
  ipcMain.handle('write-system-host-file', writeSystemHostFileHandler)
  ipcMain.handle('minimize-window', () => { mainWindow.minimize() })
  ipcMain.handle('unmaximize-window', () => { mainWindow.unmaximize() })
  ipcMain.handle('maximize-window', () => { mainWindow.maximize() })
  ipcMain.handle('close-window', () => { mainWindow.close() })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  registerIpcHandler()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
