// pages/rewardInvest/rewardInvest.js
const app = getApp()
import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    amount: '',
    memberComboList: [],
    canUse: true, //提交二次防御
    tradeInfo: {
      tradeNum: "RHJGT1000010300"
    },
  },

  // 充值
  handleInvest() {
    const amountStr = String(this.data.amount || '');
    const reg = /^([1-9]\d{0,7}|0)(\.\d{1,2})?$/
    if (!reg.test(amountStr)) {
      return wx.showToast({
        icon: "none",
        title: '最多支持8位整数，4位小数',
      })
    }
    this.invest()
  },

  // 立即开通
  invest() {
    if (!this.data.canUse) {
      return
    }
    //调用微信支付
    //获取金额进行保证金充值
    const uid = app.globalData.userInfo.rowGuid
    const amt = this.data.amount
    if (!uid) {
      return wx.showModal({
        title: '提示',
        content: '您目前没有登录，不能进行保证金充值',
        showCancel: false
      });
    }
    this.setData({
      canUse: false
    })
    //请求支付页面
    wx.login({
      success: (res) => {
        request('/WxPayController/PreOrder', {
            money: amt,
            content: "项目酬劳充值",
            contentEn: "project reward invest",
            uid: uid,
            pid: uid,
            code: res.code,
            item: '07'
          },
          (data) => {
            console.log(data, 'dd')
            var payargs = data
            this.setData({
              tradeInfo: data
            })
            const params = {
              timeStamp: String(payargs.timeStamp),
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign,
            }
            console.log(params, 'ppp')
            wx.requestPayment({
              ...params,
              success: (res) => {
                this.paySuccess()
              },
              fail: (res) => {
                console.log(res, 'rrr')
                this.setData({
                  canUse: true
                })
                wx.showModal({
                  title: '提示',
                  content: "支付失败，请重新支付。",
                  showCancel: false,
                  success: function (res) {}
                })
              }
            })
          }
        )
      }
    });
  },

  // 请求成功
  paySuccess() {
    request('/WxPayController/paySuccess', {
      tradeNum: this.data.tradeInfo.tradeNum,
    }, (data) => {
      app.globalData.userInfo = data.userInfo
      wx.setStorage({
        key: "userInfo",
        data: data.userInfo
      })
      this.setData({
        canUse: true
      })
      //支付成功
      wx.showModal({
        title: '提示',
        content: '项目酬劳充值成功',
        showCancel: false,
        success: (res) => {
          wx.switchTab({
            url: "/pages/my/my",
          })
        }
      });
    }, '', () => {
      this.setData({
        canUse: true
      })
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
    const userInfo = app.globalData.userInfo
    this.setData({
      userInfo
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