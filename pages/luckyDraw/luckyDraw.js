//index.js
//获取应用实例
const app = getApp()
import moment from 'moment'
import {
  getUserInfo
} from '../../utils/util.js'
import {
  request
} from '../../utils/request'
//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;


Page({
  data: {
    radio: "1",
    userInfo: {},
    awardList: ['10', '15', '20', '25', '谢谢惠顾', '30', '35', '50'],
    probalityList: [0.2, 0.4, 0.5, 0.6, 0.8, 0.9, 0.95, 1],
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    //9张奖品图片
    images: ['/static/images/item1.png', '/static/images/item1.png', '/static/images/item1.png', '/static/images/item1.png', '/static/images/item.png', '/static/images/item1.png', '/static/images/item1.png', '/static/images/item1.png', '/static/images/item1.png'],
    btnconfirm: '/static/images/dianjichoujiang.png',
    clickLuck: 'clickLuck',
    luckPosition: 0,
    luckyNum: 1,
  },

  getLuckyNum(radio) {
    const {
      engineerShareNewUserCouponCount,
      customShareNewUserCouponCount,
      customAddProjectCouponCount,
      engineerIntegralConvertAmount,
      customIntegralConvertAmount,
      shareCouponCount
    } = this.data.userInfo
    let luckyNum = 0
    switch (radio) {
      case "1":
        luckyNum = engineerShareNewUserCouponCount
        break;
      case "2":
        luckyNum = customShareNewUserCouponCount
        break;
      case "3":
        luckyNum = customAddProjectCouponCount
        break;
      case "4":
        luckyNum = shareCouponCount
        break;
      case "5":
        luckyNum = engineerIntegralConvertAmount
        break;
      case "6":
        luckyNum = customIntegralConvertAmount
        break;
      default:
        break;
    }
    return luckyNum
  },

  addCoupon() {
    const e = this
    const {
      luckPosition,
      awardList,
      radio,
      userInfo
    } = this.data
    let params = {}
    if (luckPosition == 4) {
      params = {
        couponType: radio
      }
    } else {
      let couponFrom = ''
      let expire = 3
      let expireType = 'days'
      switch (radio) {
        case "1":
          couponFrom = '工程师拉新人注册'
          break;
        case "2":
          couponFrom = '客户拉新人注册'
          expire = 3
          expireType = 'months'
          break;
        case "3":
          couponFrom = "客户发布项目"
          expire = 1
          expireType = 'months'
          break;
        case "4":
          couponFrom = "邀请好友第一次完成项目"
          expire = 2
          expireType = 'months'
          break;
        case "5":
          couponFrom = "工程师积分兑换抽奖"
          break;
        case "6":
          couponFrom = "客户积分兑换抽奖"
          break;
        default:
          break;
      }
      params = {
        couponAmount: awardList[luckPosition],
        couponName: `${awardList[luckPosition]}元优惠券`,
        createTime: moment().format('YYYY-MM:DD HH:mm:ss'),
        expireTime: moment().add(expire, expireType).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        userGuid: userInfo.rowGuid,
        userFlag: userInfo.userFlag,
        couponFrom,
        couponStatus: 0,
        couponType: radio,
      }
    }
    request('/ProjectController/AddCoupon', params, (data) => {
      if (data.code == 200) {
        getUserInfo(this, true, (userInfo) => {
          this.setData({
            userInfo: userInfo,
            radio: userInfo.userFlag == 0 ? '1' : '2',
          })
          this.setData({
            luckyNum: this.getLuckyNum(userInfo.userFlag == 0 ? '1' : '2')
          })
        })
      }
      if (data.code == 200 && data.isWin) {
        //中奖
        wx.showModal({
          title: '提示',
          content: `恭喜中奖${awardList[luckPosition]}优惠券`,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //设置按钮可以点击
              e.setData({
                btnconfirm: '/static/images/dianjichoujiang.png',
                clickLuck: 'clickLuck',
              })
              e.loadAnimation();
            }
          }
        })
      } else if (data.code == 200 && !data.isWin) {
        //中奖
        wx.showModal({
          title: '提示',
          content: '很遗憾未中奖',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //设置按钮可以点击
              e.setData({
                btnconfirm: '/static/images/dianjichoujiang.png',
                clickLuck: 'clickLuck',
              })
              e.loadAnimation();
            }
          }
        })
      } else {
        wx.showToast({
          title: '接口异常',
          icon: 'none'
        })
      }
    })
  },

  onRadioChange(event) {
    this.setData({
      radio: event.detail,
      luckyNum: this.getLuckyNum(event.detail)
    });
  },

  onRadioClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
      luckyNum: this.getLuckyNum(name)
    });
  },

  onLoad: function () {
    this.loadAnimation();
  },

  onShow: function () {
    getUserInfo(this, true, (userInfo) => {
      this.setData({
        userInfo: userInfo,
        radio: userInfo.userFlag == 0 ? '1' : '2',
      })
      this.setData({
        luckyNum: this.getLuckyNum(userInfo.userFlag == 0 ? '1' : '2')
      })
    })
  },

  input: function (e) {
    var data = e.detail.value;
    this.setData({
      luckPosition: data
    })
  },


  randomAward() {
    const {
      probalityList,
    } = this.data
    let random = Math.random()
    let awardIndex = 0
    for (let index = 0; index < probalityList.length; index++) {
      if (random < probalityList[index]) {
        awardIndex = index
        break
      }
    }
    return awardIndex
  },


  //点击抽奖按钮
  clickLuck: function () {
    if (!this.data.luckyNum) {
      wx.showModal({
        title: '提示',
        content: '抽奖次数不足',
        showCancel: false,
      })
      return;
    }
    this.setData({
      luckPosition: this.randomAward()
    })
    var e = this;

    //判断中奖位置格式
    if (e.data.luckPosition == null || isNaN(e.data.luckPosition) || e.data.luckPosition > 7) {
      wx.showModal({
        title: '提示',
        content: '请填写正确数值',
        showCancel: false,
      })
      return;
    }



    //设置按钮不可点击
    e.setData({
      btnconfirm: '/static/images/dianjichoujiangd.png',
      clickLuck: '',
    })
    //清空计时器
    clearInterval(interval);
    var index = 0;
    console.log(e.data.color[0]);
    //循环设置每一项的透明度
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, intime);

    //模拟网络请求时间  设为两秒
    var stoptime = 2000;
    setTimeout(function () {
      e.stop(e.data.luckPosition);
    }, stoptime)

  },

  //也可以写成点击按钮停止抽奖
  // clickStop:function(){
  //   var stoptime = 2000;
  //   setTimeout(function () {
  //     e.stop(1);
  //   }, stoptime)
  // },

  stop: function (which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    e.stopLuck(which, index, intime, 10);
  },


  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function (which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function () {
          const {
            awardList,
            luckPosition
          } = e.data
          e.setData({
            luckyNum: 0
          })
          if (which != 4) {
            e.addCoupon()
          } else {
            e.addCoupon()
          }
        }, 1000);
      }
    }, time);
    console.log(time);
  },
  //进入页面时缓慢切换
  loadAnimation: function () {
    var e = this;
    var index = 0;
    // if (interval == null){
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, 1000);
    // }  
  }
})