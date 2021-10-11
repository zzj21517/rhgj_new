// pages/order/order.js
import {
  request
} from '../../utils/request'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
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
    // if (!userInfo.rowGuid) {
    //   return wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
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


  getChildComponent: function () {
    const child = this.selectComponent('#custom_order');
    return child
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    const publicProjectCom = this.getChildComponent()
    if (publicProjectCom) {
      publicProjectCom.setData({
        pageNum: 1
      })
      publicProjectCom.getProductList()
    }
    return true
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const publicProjectCom = this.getChildComponent()
    if (publicProjectCom) {
      publicProjectCom.getProductList(true)
    }
  },
})