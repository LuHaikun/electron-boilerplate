const log = require('./log')
const { ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')
const constant = require('../../src/constant/index')
const emitter = require('./emitter')

const {
  ERROR,
  CHECKING_FOR_UPDATE,
  UPDATE_AVAILABLE,
  UPDATE_NOT_AVAILABLE,
  DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
  DOWNLOAD_UPDATE,
  CHECK_FOR_UPDATE,
  QUIT_AND_INSTALL,
  CANCEL_DOWNLOAD,
  APP_URL
} = constant

const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新',
  isUpdate: '开始更新……',
  download: '执行下载',
  autoUpdate: '执行自动更新检查'
}

module.exports = function (win) {
  autoUpdater.logger = log
  autoUpdater.autoDownload = false
  autoUpdater.setFeedURL(APP_URL)

  // 更新报错
  autoUpdater.on(ERROR, function (error) {
    log.error(error)
    emitter(win, ERROR, error)
  })

  // 检查更新
  autoUpdater.on(CHECKING_FOR_UPDATE, function () {
    log.info(message.checking)
    emitter(win, CHECKING_FOR_UPDATE)
  })

  // 发现可用更新
  autoUpdater.on(UPDATE_AVAILABLE, function (info) {
    log.info(message.updateAva)
    emitter(win, UPDATE_AVAILABLE, info)
  })

  // 无可用更新
  autoUpdater.on(UPDATE_NOT_AVAILABLE, function () {
    log.info(message.updateNotAva)
    emitter(win, UPDATE_NOT_AVAILABLE)
  })

  // 下载进度
  autoUpdater.on(DOWNLOAD_PROGRESS, function (progressObj) {
    log.info(progressObj)
    emitter(win, DOWNLOAD_PROGRESS, progressObj)
  })

  // 更新包下载完成
  autoUpdater.on(UPDATE_DOWNLOADED, function (info) {
    emitter(win, UPDATE_DOWNLOADED, info)
  })

  // 开始下载更新包
  ipcMain.on(DOWNLOAD_UPDATE, () => {
    log.warn(message.download)
    autoUpdater.downloadUpdate()
      .then((cancelToken) => {
        ipcMain.once(CANCEL_DOWNLOAD, () => {
          cancelToken()
        })
      })
  })

  // 开始检查更新
  ipcMain.on(CHECK_FOR_UPDATE, () => {
    // 执行自动更新检查
    log.warn(message.autoUpdate)
    autoUpdater.checkForUpdates()
  })

  // 退出并安装
  ipcMain.on(QUIT_AND_INSTALL, () => {
    autoUpdater.quitAndInstall()
  })
}
