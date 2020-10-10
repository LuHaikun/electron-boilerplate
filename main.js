// Modules to control application life and create native browser window
const path = require('path')
const { app, BrowserWindow } = require('electron')
const update = require('./electron/scripts/updater')
const download = require('./electron/scripts/download')

// 创建窗口
let mainWindow
function createWindow () {
  // 创建一个新的浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'electron/scripts/preload.js')
    }
  })

  // 并且装载应用的 index.html 页面
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '/dist/index.html'))
    app.setPath('exe', process.resourcesPath)
  } else {
    mainWindow.loadURL('http://localhost:8081')
    // 打开开发工具页面
    mainWindow.webContents.openDevTools()
    app.setPath('exe', __dirname)
  }

  mainWindow.on('closed', () => {
    // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里存放窗口对象，在窗口关闭的时候应当删除相应的元素
    mainWindow = null
  })
  update(mainWindow)
  download(mainWindow)
}

// 监听应用准备完成的事件
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // 对于OSX系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他窗口打开
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 监听所有窗口关闭的事件
app.on('window-all-closed', function () {
  // 对于OSX系统，应用和相应的菜单栏会一直激活直到用户通过 Cmd + Q 显式退出
  if (process.platform !== 'darwin') app.quit()
})
