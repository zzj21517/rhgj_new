// pages/coupon/coupon.js
const app = getApp()
import {
  request
} from '../../utils/request'
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    type: '',
    couponList: [],
  },

  // 去使用
  handleToUse(e) {
    const {
      info
    } = e.target.dataset
    if (!info.userFlag) {
      wx.navigateTo({
        url: '/pages/member/member',
      })
    }
  },

  // 选择优惠券
  handleChoose() {
    const {
      radio,
      couponList
    } = this.data
    if (!radio) {
      return wx.showModal({
        title: '提示',
        content: "请选择优惠券",
        showCancel: false,
        success: function (res) {}
      })
    }
    let coupon = couponList.filter(item => item.rowGuid == radio)[0]
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      coupon
    })
    prevPage.countTotal()
    wx.navigateBack({
      delta: 0,
    })
  },

  onRadioChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onRadioClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },

  // 获取优惠券列表
  getCouponList() {
    request('/ProjectController/GetCouponList', {}, (data) => {
      if (data.code == 200) {
        let tempList = (data.list || []).map(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD')
          item.expireTime = moment(item.expireTime).format('YYYY-MM-DD')
          let expireStamp = moment(item.expireTime).endOf('day').valueOf()
          let currentStamp = moment().valueOf()
          if (expireStamp > currentStamp) {
            item.timeLimit = true
          } else {
            item.timeLimit = false
          }
          return item
        })
        this.setData({
          couponList: tempList
        })
      } else {
        this.setData({
          couponList: []
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
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
    this.getCouponList()
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