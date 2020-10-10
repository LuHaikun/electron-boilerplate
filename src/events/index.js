
/**
 * @author 陆海鹍
 * @date 2020-07-15 15:26:18
 * @description 描述 事件模块
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

export const onEvent = function (eventType, cb) {
  emitter.on(eventType, cb)
}

export const emitEvent = function (eventType, ...args) {
  emitter.emit(eventType, args)
}

export const removeEvent = function (eventType, cb) {
  emitter.off(eventType, cb)
}

export default {
  emitter,
  onEvent,
  emitEvent,
  removeEvent
}
