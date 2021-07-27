// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    menuList:[
      {
        name:'造价预算',
        value:1,
      },
      {
        name:'商务标书',
        value:2,
      },
      {
        name:'技术标书',
        value:3,
      },
      {
        name:'结算服务',
        value:4,
      },
      {
        name:'对审服务',
        value:5,
      },
      {
        name:'工程资料',
        value:6,
      },
      {
        name:'盖章服务',
        value:7,
      },
      {
        name:'画图',
        value:8,
      },
      {
        name:'招标信息',
        value:9
      }
    ],
    curMenu:1,
  },
  // 事件处理函数
  bindViewTap() {
  
  },
  onLoad() {
    console.log(app.globalData.statusBarHeight,'122')
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
  },
  handleSelectMenu(e){
    console.log(e,'eee')
    this.setData({
      curMenu:e.currentTarget.dataset.info.value
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
