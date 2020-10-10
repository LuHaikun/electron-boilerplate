import React from 'react'
import {
  Button,
  notification,
  Progress
} from 'antd'
import constant from '../../constant'

export default () => {
  const os = window.api.os
  const ipcRenderer = window.api.ipcRenderer
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
    APP_URL,
    SET_DOWNLOAD_URL,
    FILE_DOWNLOAD_PROGRESS,
    FILE_DOWNLOAD_DONE,
    FILE_SAVE_PATH,
    CANCEL_FILE_DOWNLOAD,
    CANCEL_DOWNLOAD
  } = constant
  const sendMessage = (type, data = {}) => {
    ipcRenderer.send(type, data)
  }
  const checkUpdateNotification = () => {
    notification.info({
      key: CHECKING_FOR_UPDATE,
      message: '检查更新',
      description: '正在检查更新....',
      duration: null
    })
  }

  const updateNotAvaNotification = () => {
    notification.success({
      key: UPDATE_NOT_AVAILABLE,
      message: '检查更新',
      description: '目前已是最新版本！'
    })
  }
  const updateAvailableNotification = (info) => {
    const downloadUpdate = () => {
      const isMAC = os.platform() === 'darwin'
      if (isMAC) {
        const fileURL = `${APP_URL}${info.path}`
        sendMessage(SET_DOWNLOAD_URL, fileURL)
        closeNotification(UPDATE_AVAILABLE)
      } else {
        sendMessage(DOWNLOAD_UPDATE) // 下载更新包
        closeNotification(UPDATE_AVAILABLE)
      }
    }
    notification.info({
      key: UPDATE_AVAILABLE,
      message: '发现新版本',
      description: '发现新版本是否立即更新？',
      btn: (
        <Button
          type='primary'
          size='small'
          onClick={downloadUpdate}
        >
          立即更新
        </Button>
      ),
      duration: null
    })
  }
  const downloadProgressNotification = (percent) => {
    closeNotification(UPDATE_AVAILABLE)
    notification.open({
      key: DOWNLOAD_PROGRESS,
      message: '更新中',
      description: (
        <Progress percent={Math.round(percent)} />
      ),
      duration: null,
      onClose: () => {
        sendMessage(CANCEL_DOWNLOAD)
      }
    })
  }

  const downloadedNotification = () => {
    closeNotification(DOWNLOAD_PROGRESS)
    notification.success({
      key: UPDATE_DOWNLOADED,
      message: '下载完成',
      description: '新版本已下载，是否立即安装？',
      btn: (
        <Button
          type='primary'
          size='small'
          onClick={() => {
            sendMessage(QUIT_AND_INSTALL)
          }}
        >
          立即安装
        </Button>
      ),
      duration: null
    })
  }
  const downloadFile = (percent) => {
    closeNotification(UPDATE_AVAILABLE)

    notification.open({
      key: FILE_DOWNLOAD_PROGRESS,
      message: '下载安装包',
      description: (
        <Progress percent={Math.round(percent)} />
      ),
      duration: null,
      onClose: () => {
        sendMessage(CANCEL_FILE_DOWNLOAD)
      }
    })
  }

  const downloadFileDone = () => {
    closeNotification(FILE_DOWNLOAD_PROGRESS)
  }

  const downloadFileDoneTip = (path) => {
    notification.success({
      key: FILE_DOWNLOAD_DONE,
      message: '下载完成',
      description: `安装包下载完成，已保存在：${path}`
    })
  }

  const errorNotification = (data) => {
    notification.error({
      key: ERROR,
      message: '更新错误',
      description: `更新错误信息：${data}`
    })
  }

  const closeNotification = (key) => {
    notification.close(key)
  }

  // 处理信息
  const handleMessage = () => {
    ipcRenderer.on('message', (e, { type, data }) => {
      closeNotification(CHECKING_FOR_UPDATE)
      switch (type) {
        case ERROR: // 错误
          console.log(data)
          errorNotification(data.code)
          break
        case CHECKING_FOR_UPDATE: // 检查更新
          checkUpdateNotification()
          break
        case UPDATE_NOT_AVAILABLE: // 无可用更新
          updateNotAvaNotification()
          break
        case UPDATE_AVAILABLE: // 有更新包
          updateAvailableNotification(data)
          break
        case DOWNLOAD_PROGRESS: // 更新进度
          downloadProgressNotification(data.percent)
          break
        case UPDATE_DOWNLOADED: // 更新包下载完成
          downloadedNotification()
          break
        case FILE_DOWNLOAD_PROGRESS:
          downloadFile(data)
          break
        case FILE_DOWNLOAD_DONE:
          downloadFileDone()
          break
        case FILE_SAVE_PATH:
          downloadFileDoneTip(data)
          break
        default:
          break
      }
    })
  }

  handleMessage()
  // 检查更新
  sendMessage(CHECK_FOR_UPDATE)
}
