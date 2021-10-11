// pages/my/my.js
// 获取应用实例
import {
  request
} from '../../utils/request'
import {
  membershipObj,
  formatTime,
  getUserInfo
} from '../../utils/util'
import moment from 'moment'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExpire:true,
    levelName: "",
    userInfo: {},
    userFlag: app.globalData.userInfo.userFlag,
    showShare: false,
    options: [{
      name: '微信',
      icon: 'wechat',
      openType: 'share'
    }, ],
  },

  // 签到
  handleSignIn() {
    request('/SignController/SignAttend', {

    }, (data) => {
      if (data.code == 200) {
        if (!data.canSignIn) {
          return wx.showModal({
            title: '提示',
            content: '今日已签到,请明日再来!',
            showCancel: false,
          })
        } else {
          getUserInfo(this)
          wx.showModal({
            title: '提示',
            content: '签到成功,获得10积分',
            showCancel: false,
          })
        }
      } else {

      }
    })
  },

  // 立即开通
  handleOpen() {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },

  // 切换客户<=>工程师
  handleSwitch(e) {
    if (!this.data.userInfo.rowGuid) {
      return wx.showModal({
        cancelText: '取消',
        confirmText: '确定',
        content: '您还未登录,请先登录',
        showCancel: true,
        title: '提示',
        success: (result) => {
          if (result.confirm) {
            return wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        },
      })
    }
    this.switchUser()
  },

  switchUser(userInfo) {
    request('/peopleinfo/switchUser', {

    }, (data) => {
      if (data.code == 200) {
        const userInfo = data.userInfo || {}
        userInfo.expireTime && (userInfo.expireTime = formatTime(new Date(userInfo.expireTime)))
        wx.setStorage({
          key: "userInfo",
          data: userInfo
        })
        app.globalData.userInfo = userInfo
        if (data.hasDetailInfo) {
          this.setData({
            userInfo: userInfo,
            userFlag: userInfo.userFlag
          })
        } else {
          wx.navigateTo({
            url: '/pages/infoMaintenance/infoMaintenance',
          })
        }
      }
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

  // 分享
  handleShare() {
    this.setData({
      showShare: true
    });
  },

  onShareClose() {
    this.setData({
      showShare: false
    });
  },

  onShareSelect(event) {
    this.onShareClose();
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
    console.log(app.globalData, 'globalData')
    const userInfo = app.globalData.userInfo
    let isExpire = true
    if (userInfo.expireTime) {
      isExpire = moment(userInfo.expireTime).isAfter(moment())
    }
    userInfo.expireTime && (userInfo.expireTime = moment(userInfo.expireTime).format('YYYY-MM-DD'))
    this.setData({
      isExpire,
      userInfo,
      userFlag: userInfo.userFlag,
      levelName: membershipObj[userInfo.level || 0]
    })
  },

  // 跳转页面
  handleGo(event) {
    if (!this.data.userInfo.rowGuid) {
      return wx.showModal({
        cancelText: '取消',
        confirmText: '确定',
        content: '您还未登录,请先登录',
        showCancel: true,
        title: '提示',
        success: (result) => {
          if (result.confirm) {
            return wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        },
      })
    }
    wx.navigateTo({
      url: event.target.dataset.path,
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
  onShareAppMessage: function (options) {
    let {
      rowGuid
    } = this.data.userInfo
    let shareObj = {
      path: `/pages/login/login?parentId=${rowGuid}`,
    }
    return shareObj
  }
})