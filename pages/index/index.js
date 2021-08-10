// index.js
// 获取应用实例
const app = getApp()
import {
  request
} from '../../utils/request'

Page({
  data: {
    pid: 0,
    cid: 0, //当前选项
    tabs: [],
    username: '',
    phone: '',
    sms: '',
    smsCodeStr: '发送验证码',
    initime: 100,
    timer: 'time', //定时器名字
    countDownNum: '发送验证码', //倒计时初始值
    countDownNum1: '发送验证码' //倒计时初始值
  },
  // 事件处理函数
  bindViewTap() {

  },
  onLoad() {
    console.log(app.globalData.statusBarHeight, '122')
    this.reqMenuList()
  },

  // 提交申请
  handleApply() {
    request('/peopleinfo/codeApply', {
      "phone": this.data.phone,
      userName: this.data.username,
      verifyCode: this.data.sms,
      pid: this.data.pid,
      cid: this.data.cid,
    }, (data) => {
      wx.showToast({
        title: data.msg,
        icon: 'none',
        duration: 1000
      });
    })
  },

  // 发送验证码
  sendSmsCode() {
    if (this.data.countDownNum == '发送验证码') {
      const reg = /^1\d{10}$/
      if (!reg.test(this.data.phone)) {
        wx.showModal({
          title: '提示',
          content: '手机号不正确请填写正确的手机号!',
          showCancel: false
        })
        return;
      }
      request('/register/getVerifyCode', {
        "phone": this.data.phone //主题
      }, (data) => {
        console.log('success')
        this.setData({
          // smsCodeStr: '已发送',
          countDownNum: '60',
          initime: 100
        })
        this.countDown();
      })
    }
  },

  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum; //获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum,
          countDownNum1: '(' + countDownNum + ')秒'
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          that.setData({
            countDownNum: '发送验证码',
            countDownNum1: '发送验证码'
          })
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  },
  // 获取菜单列表
  reqMenuList(userInfo) {
    request('/ProjectController/GetMenuList', {}, (data) => {
      let list = data.list || []
      let resObj = {}
      list.forEach(item => {
        item.title = item.label
        if (item.parentId == 0) {
          let tempItem = {
            ...item
          }
          tempItem.children = []
          resObj[item.menuId] = tempItem
        } else {
          if (resObj[item.parentId]) {
            resObj[item.parentId].children.push(item)
          }
        }
      })
      let resList = Object.values(resObj)
      if (Array.isArray(resList) && resList.length) {
        this.setData({
          tabs: resList,
          pid: resList[0].menuId,
          cid: Array.isArray(resList[0].children) && resList[0].children.length ? resList[0].children[0].menuId : 0
        })
      }
    })
  },
  handleSelectMenu(e) {
    console.log(e, 'eee')
    this.setData({
      curMenu: e.currentTarget.dataset.info.value
    })
  },
  // 拨打电话
  handleCall() {
    wx.makePhoneCall({
      phoneNumber: '18501513776'
    })
  },

  onTabCLick(e) {
    console.log(e, 'e1')
    const curIndex = e.detail.index
    const tabs = this.data.tabs
    tabs.forEach((tab, index) => {
      if (curIndex == index) {
        if (Array.isArray(tab.children) && tab.children.length) {
          this.setData({
            pid: tab.children[0].parentId,
            cid: tab.children[0].menuId
          })
        } else {
          this.setData({
            cid: 0
          })
        }
      }
    })
  },

  onTabChange(e) {
    console.log(e, 'e2')
  },

  onRadioChange(event) {
    this.setData({
      cid: event.detail,
    });
  },

  onRadioClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      cid: name,
    });
  },
})