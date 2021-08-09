// app.js
App({
  onLaunch() {
    // 获取userInfo缓存
    const userInfo = wx.getStorageSync('userInfo') || {
      userFlag: 1
    }
    console.log(userInfo, 'uuu')
    if (userInfo.rowGuid) {
      this.globalData.userInfo = userInfo
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