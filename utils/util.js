const app = getApp();
import {
  request
} from './request'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const membershipObj = {
  0: "大众会员",
  1: "黄金会员",
  2: "钻石会员",
  3: "超级VIP"
}

const uuid = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid;
}

const getUserInfo = (self, store = true, fn) => {
  request('/peopleinfo/getUserInfo', {
      uid: app.globalData.userInfo.rowGuid
    },
    (data) => {
      if (data.code == 200) {
        if (store && data.userInfo) {
          app.globalData.userInfo = data.userInfo || {}
          wx.setStorage({
            key: "userInfo",
            data: data.userInfo || {}
          })
        }
        if (fn) {
          fn(data.userInfo || {})
        } else {
          self.setData({
            userInfo: data.userInfo
          })
        }
      }
    }
  )
}

module.exports = {
  formatTime,
  membershipObj,
  uuid,
  getUserInfo
}