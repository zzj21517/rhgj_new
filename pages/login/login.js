// pages/login/login.js
const app = getApp()
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
    parentId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      parentId
    } = options
    this.setData({
      parentId
    })
    this.getCode()
  },

  getCode() {
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
    const flag = this.data.userFlag
    let userFlag = 1,
      engineerType = 0;
    switch (flag) {
      case "1":
        userFlag = 1
        engineerType = 0
        break;
      case "2":
        userFlag = 0
        engineerType = 1
        break;
      case "3":
        userFlag = 0
        engineerType = 2
        break
      default:
        break;
    }
    this.reqLogin({
      'encryptedData': e.detail.encryptedData,
      'iv': e.detail.iv,
      code: this.data.code,
      userFlag,
      engineerType,
      parentId: this.data.parentId,
    })
  },

  reqLogin(loginInfo) {
    request('/register/wxlogin', loginInfo, (data) => {
      if (data.code != 200) {
        return this.getCode()
      }
      console.log(data, 'ddd')
      let userInfo = data.userInfo || {}
      wx.setStorage({
        key: "userInfo",
        data: userInfo
      })
      app.globalData.userInfo = userInfo
      if (!userInfo.nickName) {
        this.setData({
          userguid: userInfo.rowGuid,
          showDialog: true
        })
      } else {
        wx.switchTab({
          url: '/pages/my/my',
        })
      }
    }, '', () => {
      console.log('err')
      this.getCode()
    })
  },


  reqUpdateUserInfo(userInfo) {
    request('/peopleinfo/newUpdateUserInfo', {
      userguid: this.data.userguid,
      ...userInfo
    }, (data) => {
      if (data.code == 200) {
        wx.setStorage({
          key: "userInfo",
          data: data.userInfo
        })
        app.globalData.userInfo = data.userInfo
        wx.navigateTo({
          url: '/pages/infoMaintenance/infoMaintenance',
        })
      }
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