import React, { Component } from 'react'

import { Icon } from 'antd'
import style from './style.scss'

class NavIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: []
    }
  }

  render () {
    return (
      <div className={style['tool-bar']}>
        <div className={style['tool-bar-panel']}>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='user' className={style['panel-item-icon']} />
            <em>京东会员</em>
          </div>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='shopping-cart' className={style['panel-item-icon']} />
            <em>购物车</em>
          </div>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='heart' className={style['panel-item-icon']} />
            <em>关注</em>
          </div>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='environment' className={style['panel-item-icon']} />
            <em>足迹</em>
          </div>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='tags' className={style['panel-item-icon']} />
            <em>消息</em>
          </div>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='search' className={style['panel-item-icon']} />
            <em>质询</em>
          </div>
          <div className={style['tool-bar-panel-item']}>
            <Icon type='customer-service' className={style['panel-item-icon']} />
            <em>反馈</em>
          </div>
        </div>
      </div>
    )
  }
}

export default NavIndex
