import { 
  app, 
  BrowserWindow, 
  clipboard,
  dialog, 
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
const { Octokit } = require("@octokit/rest")
const moment = require('moment')

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
    // icon: join(__dirname, "../../resources/icon.png"),
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

  // 监听非最大化事件，通知titlebar切换icon
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('drag-to-unmaximize')
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

function uploadJsonFile() {
  let uploadResult = {
    hasRead: false,
    jsonData: '',
  }
  let result = dialog.showOpenDialogSync({
    filters: [{
      name: 'json文件',
      extensions: ['json']
    }],
    properties: ['openFile'],
    message: '选择要导入的json文件',
    buttonLabel: '导入'
  })
  if (result) {
    uploadResult.hasRead = true
    uploadResult.jsonData =  readFileSync(result[0], 'utf8')
  }
  return JSON.stringify(uploadResult)
}

function uploadCssFile() {
  let uploadResult = {
    hasRead: false,
    cssData: '',
  }
  let result = dialog.showOpenDialogSync({
    filters: [{
      name: 'css文件',
      extensions: ['css']
    }],
    properties: ['openFile'],
    message: '选择要导入的css文件',
    buttonLabel: '导入'
  })
  if (result) {
    uploadResult.hasRead = true
    uploadResult.cssData =  readFileSync(result[0], 'utf8')
  }
  return JSON.stringify(uploadResult)
}

function downloadFile(event, data) {
  let specifiedFileData = JSON.parse(data)
  writeFile(process.env.HOME + `/Desktop/${specifiedFileData.suffix}Data-${Date.now()}.${specifiedFileData.suffix}`, 
            specifiedFileData.data, 
            {flag: 'w+'},  
            (err) => {
              if (err) throw err
              console.log(`${specifiedFileData.suffix}文件写入成功`)
            }
  )
}

async function listCommits(event, params) {
  const octokit = new Octokit()
  let maxCount = 0
  let minCount = 0
  let paramsObj = JSON.parse(params)
  let scatterDataArray = []
  let scatterDataObject = {}
  await octokit.rest.repos.listCommits({
    owner: paramsObj.owner,
    repo: paramsObj.repo,
    since: paramsObj.since,
    until: paramsObj.until,
    per_page: paramsObj.perPage,
  }).then(({ data }) => {
    if (data && data.length > 0) { 
      data.forEach(({ commit: { committer: {  date } } }) => {
        if (date) {
          let day = moment.utc(date, "YYYY-MM-DD").format('YYYY-MM-DD')
          let hour = moment.utc(date, "YYYY-MM-DDTHH:mm:ss").hour() + 8

          if (scatterDataObject[day] === undefined) {
            scatterDataObject[day] = {}
          }
          
          if (scatterDataObject[day][hour] !== undefined) {
            scatterDataObject[day][hour]++
          } else {
            scatterDataObject[day][hour] = 1
          }

          maxCount = Math.max(maxCount, scatterDataObject[day][hour])
          minCount = Math.min(minCount, scatterDataObject[day][hour])
        }
      })
      Object.keys(scatterDataObject).forEach(day => {
        Object.keys(scatterDataObject[day]).forEach(hour => {
          let scatterData = [day, Number.parseInt(hour), scatterDataObject[day][hour]]
          scatterDataArray.push(scatterData)
        })
      })
    }
  }).catch(err => {
    console.error(err)
  })
  let retObj = {
    scatterDataArray,
    minCount,
    maxCount
  }
  return JSON.stringify(retObj)
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
  ipcMain.handle('upload-json-file', uploadJsonFile)
  ipcMain.handle('upload-css-file', uploadCssFile)
  ipcMain.handle('download-file', downloadFile)
  ipcMain.handle('fetch-list-commits', listCommits)
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
