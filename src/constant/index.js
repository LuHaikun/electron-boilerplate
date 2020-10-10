const pkg = require('../../package.json')

const STORAGE_USER_KEY = 'user_data'

module.exports = {
  STORAGE_USER_KEY: STORAGE_USER_KEY,
  ERROR: 'error', // 发生错误
  CHECKING_FOR_UPDATE: 'checking-for-update', // 检查更新
  UPDATE_AVAILABLE: 'update-available', // 发现可用更新
  UPDATE_NOT_AVAILABLE: 'update-not-available', // 无可用更新
  DOWNLOAD_PROGRESS: 'download-progress', // 下载进度
  UPDATE_DOWNLOADED: 'update-downloaded', // 下载完成
  DOWNLOAD_UPDATE: 'download-update', // 下载安装包
  CHECK_FOR_UPDATE: 'check-for-update', // 开始检查更新
  QUIT_AND_INSTALL: 'quit-and-install', // 退出并更新
  WILL_DOWNLOAD: 'will-download', // 允许用户控制下载项目
  APP_URL: pkg.build.publish.url, // app 存放的路径
  CANCEL_DOWNLOAD: 'CANCEL_DOWNLOAD', // 取消更新包下载
  SET_DOWNLOAD_URL: 'SET_DOWNLOAD_URL', // 设置下载地址
  PAUSE_FILE_DOWNLOAD: 'PAUSE_FILE_DOWNLOAD', // 暂停文件下载
  CANCEL_FILE_DOWNLOAD: 'CANCEL_FILE_DOWNLOAD', // 取消文件下载
  RESUME_FILE_DOWNLOAD: 'RESUME_FILE_DOWNLOAD', // 继续文件下载
  FILE_DOWNLOAD_PROGRESS: 'FILE_DOWNLOAD_PROGRESS', // 文件下载中
  GET_SAVE_PATH: 'GET_SAVE_PATH', // 获取文件保存路径
  FILE_DOWNLOAD_DONE: 'FILE_DOWNLOAD_DONE', // 文件下载完成
  FILE_DOWNLOAD_FAIL: 'FILE_DOWNLOAD_FAIL', // 文件下载失败
  FILE_SAVE_PATH: 'FILE_SAVE_PATH' // 文件保存路径
}
