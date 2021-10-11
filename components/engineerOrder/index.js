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
        text: '中标项目',
        value: 0
      },
      {
        text: '已投项目',
        value: 1
      },
      {
        text: '完成项目',
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
      // this.getProductList()
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
        url: `/pages/projectDetail/projectDetail?custid=${cUST_ID}&fid=${pROJECT_NUM}`,
      })
    },
    onTabChange(e) {
      this.setData({
        pageNum: 1,
        tabActive: e.detail.index
      })
      this.getProductList()
      console.log(e, this.data.tabActive)
    },
    // 获取项目列表
    getProductList(flag = false) {
      flag && (this.setData({
        pageNum: this.data.pageNum + 1
      }))
      const userInfo = app.globalData.userInfo
      const status = this.data.tabActive
      let itemType = 'ZHONG'
      let status1 = 0
      switch (status) {
        case 0:
          itemType = 'ZHONG'
          break;
        case 1:
          itemType = 'TOU'
          break;
        case 2:
          status1 = 3
          break;
        default:
          break;
      }
      request('/ProjectController/GetProject', {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        keyword: "",
        sort: "00",
        major: "00",
        area: "全国",
        uid: userInfo.rowGuid,
        itemtype: itemType,
        status: status1
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