import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import uaTest from './lib/uaTest'
import isElectron from 'is-electron'
import AutoUpdate from './components/AutoUpdate'
import './api/common/axiosInit'
import './style/reset.css'
import './style/index.less'

if (isElectron()) AutoUpdate()

if (!uaTest.browser.Chrome) {
  window.location.href = '/upgradeBrowser.html'
} else {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}
