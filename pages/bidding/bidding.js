// pages/bidding/bidding.js
import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    linkMan: '',
    linkTel: '',
    yijia: '',
    projectAmount: '',
    bidAmount: '',
    bidName: '',
  },

  // 打开客服
  handleCustomerServer() {
    wx.makePhoneCall({
      phoneNumber: '18501513776'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      code,
      linkMan,
      linkTel,
      amount,
      yijia
    } = options
    this.setData({
      code,
      linkMan,
      linkTel,
      projectAmount: amount,
      bidAmount: amount,
      yijia
    })
  },

  // 确认投标
  handleConfirmBid() {
    const {
      code,
      linkMan,
      linkTel,
      bidAmount,
      bidName
    } = this.data
    if (!bidName) {
      return wx.showToast({
        title: '投标人员不能为空',
        icon: 'none'
      })
    }
    if (!bidAmount) {
      return wx.showToast({
        title: '投标金额不能为空',
        icon: 'none'
      })
    }

    request('/ProjectController/AddProjectUser', {
      code,
      linkMan,
      linkTel,
      bidAmount,
      bidName
    }, (data) => {
      if(data.code==200){
        wx.showModal({
          title: '提示',
          content: '投标成功',
          showCancel:false,
          success:function(){
            wx.navigateBack({
              delta: 1,
            })
          }	
      });
      }
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