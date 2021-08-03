// pages/my/my.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType:app.globalData.userInfo.userType
  },

  // 切换客户<=>工程师
  handleSwitch(e){
    let userInfo=app.globalData.userInfo
    userInfo.userType=userInfo.userType?0:1
    app.globalData.userInfo={...userInfo}
    this.setData({
      userType:userInfo.userType
    },()=>{
      console.log(this.data.userType,'ee')
    })
  },

  // 跳转登录
  switchLogin(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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