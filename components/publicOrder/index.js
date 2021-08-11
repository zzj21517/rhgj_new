// components/publicPage/index.js
import {
  areaList
} from "@vant/area-data"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    title1: '地区',
    value: '01',
    option2: [{
      'value': '00',
      'text': '专业'
    }, {
      'value': '01',
      'text': '土建'
    }, {
      'value': '02',
      'text': '安装'
    }, {
      'value': '03',
      'text': '水利'
    }, {
      'value': '04',
      'text': '电力'
    }, {
      'value': '05',
      'text': '市政园林'
    }, {
      'value': '06',
      'text': '技术标'
    }, {
      'value': '07',
      'text': '仿古'
    }, {
      'value': '08',
      'text': '公路桥梁'
    }, {
      'value': '12',
      'text': '其他'
    }, {
      'value': '13',
      'text': '钢结构'
    }, {
      'value': '14',
      'text': '装修'
    }],
    curArea:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleConfirm(e){
    console.log(e,'ee')
    let values=e.detail.values
    this.setData({
      curArea:values,
      title1:values[2].name,
    })
    this.selectComponent('#item').toggle();
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