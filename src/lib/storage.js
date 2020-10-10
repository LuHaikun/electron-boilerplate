/**
 * @author 陆海鹍
 * @date 2020-07-15 15:26:18
 * @description 描述 本地缓存
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
const ls = window.localStorage

const get = function (key) {
  return ls.getItem(key)
}

const set = function (key, value) {
  ls.setItem(key, value)
}

const remove = function (key) {
  ls.removeItem(key)
}

export default {
  get,
  set,
  remove
}
