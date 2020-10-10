module.exports = function (win, type, data = {}) {
  win.webContents.send('message', {
    type,
    data
  })
}
