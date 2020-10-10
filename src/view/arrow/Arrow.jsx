import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.scss'

class Arrow extends Component {
  render () {
    return (
      <div className={style['arrow-wrapper']}>
        <div className={classnames(style['row-item'], style['row-admin'])}>
          <div className={classnames(style['flow-item'], style['flow-item-0'])}><div title='管理员'>管理员</div></div>
          <div className={classnames(style['flow-item'], style['flow-item-1'])}><div title='维护公司'>维护公司</div></div>
          <div className={classnames(style['flow-item'], style['flow-item-2'])}><div title='添加用户'>添加用户</div></div>
          <div className={classnames(style['flow-item'], style['flow-item-3'])}><div title='维护权限'>维护权限</div></div>
        </div>
        <div className={classnames(style['row-item'], style['row-dev'])}>
          <div className={classnames(style['flow-item'], style['flow-item-0'])}><div title='研发人员'>研发人员</div></div>
          <div className={classnames(style['flow-item'], style['flow-item-1'])}><div title='领取任务和Bug'>领取任务和Bug</div></div>
          <div className={classnames(style['flow-item'], style['flow-item-2'])}><div title='更新状态'>更新状态</div></div>
          <div className={classnames(style['flow-item'], style['flow-item-3'])}><div title='完成任务和Bug'>完成任务和Bug</div></div>
        </div>
      </div>
    )
  }
}

export default Arrow
