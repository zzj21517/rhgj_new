// components/publicPage/index.js
const app = getApp()
import {
  areaList
} from "@vant/area-data"
console.log(areaList)
areaList.province_list[100000] = '全国'
areaList.city_list[100100] = '全国'
areaList.county_list[100101] = '全国'
import {
  request
} from '../../utils/request'
const userInfo = app.globalData.userInfo
let city = userInfo.city || ''
if (city && !city.endsWith('市' && city !== '全国')) {
  city = `${city}市`
}
let cityCode = ''
for (let key in areaList.city_list) {
  if (areaList.city_list[key] === city) {
    cityCode = key
  }
}
// components/publicPage/publicPage.js
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
    pageNum: 1, //当前页
    pageSize: 5, //每页条数
    keyword: "", //关键字
    productList: [], //项目列表
    cityCode,
    areaList,
    title1: city || '全国',
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
    curArea: [],
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

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {},
    resize: function () {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转详情页
    handleDetail(e){
      console.log(e,'ee')
      const {cUST_ID,pROJECT_NUM}=e.currentTarget.dataset.info
      wx.navigateTo({
        url: `/pages/projectDetail/projectDetail?custid=${cUST_ID}&fid=${pROJECT_NUM}`,
      })
    },
    handleChange(e) {
      console.log(e, 'e')
      this.setData({
        value: e.detail,
        pageNum: 1,
      })
      this.getProductList()
    },
    handleConfirm(e) {
      console.log(e, 'ee')
      let values = e.detail.values
      this.setData({
        pageNum: 1,
        curArea: values,
        title1: values[1].name,
      })
      this.selectComponent('#item').toggle();
      this.getProductList()
    },
    // 获取项目列表
    getProductList(flag = false) {
      flag && (this.setData({
        pageNum: this.data.pageNum + 1
      }))
      request('/ProjectController/GetProject', {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        keyword: this.data.keyword,
        sort: "00",
        major: this.data.value,
        area: this.data.title1,
        uid: "ALL",
        itemtype: "ALL",
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