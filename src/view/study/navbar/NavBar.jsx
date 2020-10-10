
import React, { Component } from 'react'

import style from './style.scss'

class NavBarIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: []
    }
  }

  render () {
    return (
      <div className={style['nav-bar']}>
        <ul className={style['nav-menu']}>
          <li><a ref='#'>home</a></li>
          <li><a ref='#'>first</a>
            <ul className={style['nav-submenu']}>
              <li><a ref='#'>one</a></li>
              <li><a ref='#'>two</a></li>
              <li><a ref='#'>three</a></li>
              <li><a ref='#'>four</a></li>
              <li><a ref='#'>five</a></li>
              <li><a ref='#'>six</a></li>
            </ul>
          </li>
          <li><a ref='#'>second</a></li>
          <li><a ref='#'>third</a>
            <ul className={style['nav-submenu']}>
              <li><a ref='#'>one</a></li>
              <li><a ref='#'>two</a></li>
              <li><a ref='#'>three</a></li>
              <li><a ref='#'>four</a></li>
              <li><a ref='#'>five</a></li>
              <li><a ref='#'>six</a></li>
            </ul>
          </li>
          <li><a ref='#'>fourth</a></li>
          <li><a ref='#'>other</a>
            <ul className={style['nav-submenu']}>
              <li><a ref='#'>one</a></li>
              <li><a ref='#'>two</a></li>
              <li><a ref='#'>three</a></li>
              <li><a ref='#'>four</a></li>
              <li><a ref='#'>five</a></li>
              <li><a ref='#'>six</a></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavBarIndex
