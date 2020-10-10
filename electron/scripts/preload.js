// 在页面加载之前需要执行的相关代码;
const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const electron = require('electron')
const fileTree = require('fs-file-tree')
// const constant = require('../../src/constant')

const {
  remote,
  getAppPath,
  ipcRenderer
} = electron

window.api = {
  os,
  fs,
  path,
  remote,
  // constant,
  getAppPath,
  ipcRenderer,
  fileTree
}

// 页面内容加载之前需要引入的一些代码
window.addEventListener('DOMNodeInserted', () => {

})

// 页面内容加载之后需要引入的一些操作
window.addEventListener('DOMContentLoaded', () => {

})
