// pages/member/member.js
const app = getApp()
import {
  request
} from '../../utils/request'
import {
  accSub,
  accMul
} from '../../utils/math'
import {
  getUserInfo
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    memberComboList: [],
    canUse: true, //提交二次防御
    tradeInfo: {
      tradeNum: "RHJGT1000010305"
    },
    coupon: {},
    total: 0,
    userInfo: {},
  },

  // 计算合计金额
  countTotal() {
    const {
      memberComboList,
      active,
      coupon
    } = this.data
    let memberAmount = memberComboList[active].price
    let couponAmount = coupon.couponAmount || 0
    let total = accMul(accSub(memberAmount, couponAmount), 100)
    this.setData({
      total
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqMemberCombo()
  },

  // 立即开通
  handleOpen() {
    if (!this.data.canUse) {
      return
    }
    //调用微信支付
    //获取金额进行保证金充值
    const uid = app.globalData.userInfo.rowGuid
    const amt = accMul(this.data.total, 0.01)
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
            content: "VIP会员开通",
            contentEn: "open the membership",
            uid: uid,
            pid: uid,
            code: res.code,
            item: '09',
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
      level: this.data.memberComboList[this.data.active].level,
      tradeNum: this.data.tradeInfo.tradeNum,
      couponId: this.data.coupon.rowGuid || '',
    }, (data) => {
      getUserInfo(this)
      this.setData({
        canUse: true
      })
      //支付成功
      wx.showModal({
        title: '提示',
        content: 'VIP会员开通成功',
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

  //获取会员套餐列表
  reqMemberCombo() {
    request('/ProjectController/GetMemberList', {}, (data) => {
      this.setData({
        memberComboList: data.list
      })
      this.countTotal()
    })
  },

  //选择套餐
  choosePackage(e) {
    const index = e.currentTarget.dataset.index
    if (index) {
      this.setData({
        active: index,
      });
      this.countTotal()
    }
  },

  // 获取用户信息
  getUserInfo() {
    request('/register/getUserInfo', {}, (data) => {
      app.globalData.userInfo = data.userInfo
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