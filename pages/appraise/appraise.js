// components/customOrder/index.js
import {
  request
} from '../../utils/request'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 5,
    productList: [], //项目列表
    tabActive: 0,
    tabs: [{
        text: '发布的项目',
        value: 0
      },
      {
        text: '进行中的项目',
        value: 1
      },
      {
        text: '取消的项目',
        value: 2
      },
    ],
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getProductList()
    },
    moved: function () {},
    detached: function () {

    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
      this.getProductList()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转详情页
    handleDetail(e) {
      console.log(e, 'ee')
      const {
        cUST_ID,
        pROJECT_NUM
      } = e.currentTarget.dataset.info
      wx.navigateTo({
        url: `/pages/projectDetail/projectDetail?custid=${cUST_ID}&fid=${pROJECT_NUM}&activeTab=2`,
      })
    },
    // 获取项目列表
    getProductList(flag = false) {
      flag && (this.setData({
        pageNum: this.data.pageNum + 1
      }))
      const userInfo = app.globalData.userInfo
      request('/ProjectController/GetProject', {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        keyword: "",
        sort: "00",
        major: "00",
        area: "全国",
        uid: userInfo.rowGuid,
        itemtype: "APPRAISE",
        status: this.data.tabActive
      }, (data) => {
        this.setData({
          productList: flag ? this.data.productList.concat(data.list) : data.list
        })
        console.log(this.data.productList, 'productList')
        wx.stopPullDownRefresh({
          success: (res) => {
            console.log('取消成功')
          },
        })
      })
    },
  }
})