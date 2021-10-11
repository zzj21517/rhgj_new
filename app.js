// app.js
import {
  BASEURL
} from './utils/host'
App({
  getUserInfo(uid) {
    wx.request({
      url: `${BASEURL}/peopleinfo/getUserInfo`,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }, //传在请求的header里
      data: {
        "param": {
          uid,
        }
      },
      success: (res) => {
        if (res.statusCode == 200 && res.data.code == 200) {
          this.globalData.userInfo = res.data.userInfo || {}
        }
      },
    })
  },
  onLaunch() {
    // 获取userInfo缓存
    const userInfo = wx.getStorageSync('userInfo') || {
      userFlag: 1
    }
    console.log(userInfo, 'uuu')
    if (userInfo.rowGuid) {
      // this.globalData.userInfo = userInfo
      this.getUserInfo(userInfo.rowGuid, this)
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取导航栏高度
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.statusBarHeight = res.statusBarHeight
      },
    })
  },
  globalData: {
    userInfo: {
      userFlag: 1,
    },
    statusBarHeight: 0,
  }
})