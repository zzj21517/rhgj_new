// pages/integral/integral.js
const app = getApp()
import {
  request
} from '../../utils/request'
import {
  getUserInfo
} from '../../utils/util'
import {
  accDiv
} from '../../utils/math'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    convertNum: 1,
    userInfo: {},
  },

  handleConvert() {
    const {
      userFlag,
      customIntegralAmount,
      engineerIntegralAmount,
    } = this.data.userInfo
    const {
      convertNum
    } = this.data
    let canConvert = false
    if (userFlag) {
      canConvert = (customIntegralAmount / 100 >= convertNum)
    } else {
      canConvert = (engineerIntegralAmount / 100 >= convertNum)
    }
    if (!canConvert) {
      return wx.showModal({
        title: '提示',
        content: "积分不足",
        showCancel: false,
        success: function (res) {}
      })
    } else {
      request('/SignController/IntegralConvert', {
        convertNum
      }, (data) => {
        getUserInfo(this)
        if (data.code == 200) {
          wx.showModal({
            title: '提示',
            content: "兑换成功!",
            showCancel: false,
            success: function (res) {}
          })
        } else {
          wx.showModal({
            title: '提示',
            content: "兑换失败!",
            showCancel: false,
            success: function (res) {}
          })
        }
      })
    }
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
    getUserInfo(this)
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