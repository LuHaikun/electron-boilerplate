
import React, { Component } from 'react'

import style from './style.scss'

class FourLeafIndex extends Component {
  constructor (props) {
    super(props)
    this.container = React.createRef()
  }

  componentDidMount = () => {
  }

  switchDivStyle = (e, activeClass, commonClass, backgroundColor) => {
    if (e.target.className.includes(activeClass)) {
      e.target.className = style[commonClass]
      this.container.current.style.setProperty('background', 'none')
    } else {
      e.target.className = style[activeClass]
      this.container.current.style.setProperty('background', backgroundColor)
    }
  }

  onDivClick = (e, flag) => {
    switch (flag) {
      case 1:
        this.switchDivStyle(e, 'four-leaf-one-active', 'four-leaf-one', 'rgba(238,10,10,0.6)')
        break
      case 2:
        this.switchDivStyle(e, 'four-leaf-two-active', 'four-leaf-two', 'rgba(252,235,3,0.86)')
        break
      case 3:
        this.switchDivStyle(e, 'four-leaf-three-active', 'four-leaf-three', 'rgba(149,247,3,0.86)')
        break
      case 4:
        this.switchDivStyle(e, 'four-leaf-four-active', 'four-leaf-four', 'rgba(5,190,247,0.86)')
        break
      default:
        break
    }
  }

  render () {
    return (
      <div className={style['four-leaf-wrapper']} ref={this.container}>
        <div className={style['four-leaf-container']}>
          <div className={style['four-leaf-one']} onClick={(e) => this.onDivClick(e, 1)}>医疗</div>
          <div className={style['four-leaf-two']} onClick={(e) => this.onDivClick(e, 2)}>饮食</div>
          <div className={style['four-leaf-three']} onClick={(e) => this.onDivClick(e, 3)}>运动</div>
          <div className={style['four-leaf-four']} onClick={(e) => this.onDivClick(e, 4)}>购物</div>
        </div>
      </div>
    )
  }
}

export default FourLeafIndex
