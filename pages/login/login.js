// pages/login/login.js
const app=getApp()
import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userguid: '', //用户id
    showDialog: false,
    userFlag: "1",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      timeout: 2000,
      success: (res) => {
        this.setData({
          code: res.code
        })
      }
    })
  },

  getPhoneNumber(e) {
    this.reqLogin({
      'encryptedData': e.detail.encryptedData,
      'iv': e.detail.iv,
      code: this.data.code,
      userFlag: Number(this.data.userFlag),
    })
  },

  reqLogin(loginInfo) {
    request('/register/wxlogin', loginInfo, (data) => {
      console.log(data, 'ddd')
      this.setData({
        userguid: data.userguid,
        showDialog: true
      })
      app.globalData.userInfo=data
    })
  },


  reqUpdateUserInfo(userInfo) {
    request('/peopleinfo/newUpdateUserInfo', {
      userguid: this.data.userguid,
      ...userInfo
    }, (data) => {
      app.globalData.userInfo=data
      wx.switchTab({
        url: '/pages/my/my',
      })
    })
  },

  getUserInfo(event) {
    console.log(event.detail);
    const userInfo = event.detail.userInfo
    const {
      nickName,
      avatarUrl,
      gender,
      country,
      province,
      city
    } = userInfo
    this.reqUpdateUserInfo({
      nickName,
      avatarUrl,
      gender,
      country,
      province,
      city
    })
  },

  onClose() {
    this.setData({
      showDialog: false
    });
  },


  onFlagChange(event) {
    this.setData({
      userFlag: event.detail,
    });
  },

  onFlagClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      userFlag: name,
    });
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