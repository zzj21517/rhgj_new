// pages/set/set.js
import {
  membershipObj
} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelName:"",
    userInfo: {},
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
    const userInfo = app.globalData.userInfo
    this.setData({
      userInfo,
      levelName: membershipObj[userInfo.level || 0]
    })
  },

  // 退出
  handleQuit() {
    wx.removeStorage({
      key: 'userInfo',
    })
    app.globalData.userInfo = {
      userFlag: 1
    }
    wx.switchTab({
      url: '/pages/my/my',
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