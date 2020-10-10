const { ipcMain } = require('electron')
const log = require('./log')
const constant = require('../../src/constant/index')
const emitter = require('./emitter')

const {
  WILL_DOWNLOAD,
  SET_DOWNLOAD_URL,
  FILE_DOWNLOAD_PROGRESS,
  FILE_DOWNLOAD_DONE,
  GET_SAVE_PATH,
  FILE_DOWNLOAD_FAIL,
  FILE_SAVE_PATH,
  CANCEL_FILE_DOWNLOAD
} = constant

module.exports = function (win) {
  // 开始文件下载
  ipcMain.on(SET_DOWNLOAD_URL, (e, data) => {
    win.webContents.downloadURL(data)
  })

  // 监听文件下载事件
  win.webContents.session.on(WILL_DOWNLOAD, (e, item) => {
    const savePath = item.getSavePath()
    const totalSize = item.getTotalBytes()
    // 文件下载中
    item.on('updated', (e, state) => {
      if (state === 'interrupted') {
        emitter(win, FILE_DOWNLOAD_FAIL)
        log('下载任务被打断，可恢复')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          log('暂停下载')
        } else {
          log(`接收数据: ${item.getReceivedBytes()}`)
          if (!savePath) {
            item.pause()
          } else {
            if (item.isPaused()) item.resume()
            const receivedSize = item.getReceivedBytes()
            const progressing = (receivedSize / totalSize) * 100
            emitter(win, FILE_DOWNLOAD_PROGRESS, progressing)
          }
        }
      }
    })

    ipcMain.once(GET_SAVE_PATH, () => {
      emitter(win, FILE_SAVE_PATH, savePath)
    })

    ipcMain.once(CANCEL_FILE_DOWNLOAD, () => {
      item.cancel()
    })

    // 文件下载完成
    item.once('done', (e, state) => {
      if (state === 'completed') {
        emitter(win, FILE_SAVE_PATH, savePath) // 发送文件存放的路径
        emitter(win, FILE_DOWNLOAD_DONE)
      } else if (state === 'interrupted') {
        emitter(win, FILE_DOWNLOAD_FAIL)
      }
    })
  })
}
