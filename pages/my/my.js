// pages/my/my.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userFlag: app.globalData.userInfo.userFlag
  },

  // 切换客户<=>工程师
  handleSwitch(e) {
    let userInfo = app.globalData.userInfo
    userInfo.userFlag = userInfo.userFlag ? 0 : 1
    app.globalData.userInfo = {
      ...userInfo
    }
    this.setData({
      userFlag: userInfo.userFlag
    }, () => {
      console.log(this.data.userFlag, 'ee')
    })
  },

  // 跳转登录
  switchLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 打开客服
  handleCustomerServer() {
    wx.makePhoneCall({
      phoneNumber: '18501513776'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData)
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})