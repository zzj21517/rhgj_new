// pages/projectDetail/projectDetail.js
const app = getApp()
import {
  request,
  requestFile
} from '../../utils/request'
import {
  membershipObj,
  getUserInfo
} from '../../utils/util'
import {
  accMul,
  accSub
} from '../../utils/math'
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payAmount: 0,
    coupon: {},
    rateObj: {
      completeRate: 0,
      qualityRate: 0,
      serviceAttiduteRate: 0,
      cooperationRate: 0,
      timelyRate: 0,
      uploadRate: 0,
    },
    processList: [], //证书列表
    hasBidding: false, //是否已经投标
    countDown: 0,
    uploadCountDown: 0,
    tradeInfo: {
      tradeNum: 'RHJGT1000010313'
    },
    canUse: true,
    userInfo: {},
    radio: "2",
    showAction: false,
    fid: '',
    custid: '',
    membershipObj,
    activeCollapse: [], //'1','2'
    activeCollapse1: ["1"],
    projectDetail: {},
    biddingList: [],
    biddingRecord: {}, //中标记录
    activeStep: 0,
    activeTab: 1,
    steps: [{
        text: '招标中',
      },
      {
        text: '选择中标人',
      },
      {
        text: '待发布人托管佣金',
      },
      {
        text: '服务中',
      },
      {
        text: '托管保证金',
      },
      {
        text: '确认评价',
      },
    ],
  },

  // 计算合计金额
  countTotal() {
    console.log('counttotal')
    const {
      payAmount,
      coupon
    } = this.data
    let couponAmount = coupon.couponAmount || 0
    console.log(couponAmount, 'ccc')
    let total = accSub(payAmount, couponAmount)
    console.log(total, 'ttt')
    this.setData({
      payAmount: total
    })
  },

  onRateChange(event) {
    let rateObj = {
      ...this.data.rateObj
    }
    rateObj[event.currentTarget.dataset.name] = event.detail
    this.setData({
      rateObj
    });
  },

  // 获取评价数据
  getAppraiseRate(projectNum) {
    request('/ProjectController/GetRate', {
        projectNum
      },
      (data) => {
        if (data.code == 200) {
          this.setData({
            rateObj: data.appraiseRate
          })
        }
      })
  },

  // 评价
  handleAppraise() {
    const {
      rateObj,
      projectDetail,
      biddingRecord
    } = this.data
    request('/ProjectController/AddRate', {
        projectNum: projectDetail.pROJECT_NUM,
        ...rateObj,
        ratedGuid: biddingRecord.rowguid
      },
      (data) => {
        if (data.code == 200) {
          wx.showModal({
            title: '提示',
            content: "评价成功",
            confirmText: '确定',
          })
          const {
            fid,
            custid
          } = this.data
          this.getProjectDetail(fid, custid)
        }
      })
  },

  // 上传进度
  uploadProcess(event) {
    const {
      pROJECT_NUM
    } = this.data.projectDetail
    const {
      file
    } = event.detail
    requestFile('/upload/uploadPic', file.url, {
      clientguid: `${pROJECT_NUM}_process`
    }, (data) => {
      console.log(data, 'ddd')
      const {
        processList
      } = this.data;
      processList.push({
        ...file,
        url: data.url
      });
      console.log(processList)
      this.setData({
        processList
      });
    })
  },

  // 倒计时结束回调
  handleFinish() {
    this.setData({
      countDown: 0
    })
  },

  // 查看详情
  findDetail(e) {
    const {
      info
    } = e.target.dataset
    console.log(info)
    wx.navigateTo({
      url: `/pages/engineerInfo/engineerInfo?uid=${info.rowguid}`,
    })
  },

  // 补足保证金
  handleAddDeposit() {
    const {
      userInfo,
      biddingRecord
    } = this.data
    let deposit = userInfo.deposit
    console.log(deposit, 'deposit')
    let needDeposit = accMul(biddingRecord.pROJECT_AMT, 0.1)
    let requiredDeposit = accSub(needDeposit, deposit)
    console.log(needDeposit, requiredDeposit)
    wx.showModal({
      title: '提示',
      content: `您需要补充保证金${requiredDeposit}元`,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: `/pages/deposit/deposit?amt=${requiredDeposit}`,
          })
        }
      }
    })
  },

  // 支付
  handlePay() {
    const {
      radio,
      userInfo,
      projectDetail,
      payAmount,
      coupon
    } = this.data
    const {
      pROJECT_NUM,
      pROJECT_AMT,
      pAY_STATUS_VALUE
    } = projectDetail
    let amt = payAmount
    if (pAY_STATUS_VALUE == '0') {
      amt = payAmount
    } else if (pAY_STATUS_VALUE == '1') {
      amt = parseInt(payAmount / 2)
    }
    // 余额支付
    if (radio == 1) {
      if (amt > userInfo.remainingSum) {
        return wx.showModal({
          title: '提示',
          content: "余额不足",
          confirmText: '确定',
        })
      }
      this.handleRemainingPay(amt, pROJECT_NUM)
    } else {
      this.handleWxPay(amt, pROJECT_NUM)
    }
  },

  handleRemainingPay(amt, projectNum) {
    console.log('余额支付')
    this.setData({
      canUse: false
    })
    const {
      coupon
    } = this.data
    const uid = app.globalData.userInfo.rowGuid
    //请求支付页面
    request('/WxPayController/RemainingSumPay', {
        money: amt,
        uid: uid,
        pid: uid,
        item: '00',
        projectNum,
        couponId: coupon.rowGuid || ''
      },
      (data) => {
        if (data.code == 200) {
          wx.showModal({
            title: '提示',
            content: "余额支付成功",
            confirmText: '确定',
          })
          const {
            fid,
            custid
          } = this.data
          this.getProjectDetail(fid, custid)
          getUserInfo(this)
          this.setData({
            canUse: true,
            showAction: false,
          })
        }
      }
    )
  },

  handleWxPay(amt, projectNum) {
    if (!this.data.canUse) {
      return
    }
    //调用微信支付
    //获取金额进行保证金充值
    const uid = app.globalData.userInfo.rowGuid
    if (!uid) {
      return wx.showModal({
        title: '提示',
        content: '您目前没有登录，不能进行保证金充值',
        showCancel: false,
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
            content: "项目托管金",
            contentEn: "project keep money",
            uid: uid,
            pid: uid,
            code: res.code,
            item: '02',
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
                this.paySuccess(projectNum)
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
  paySuccess(projectNum = 'CCX100760') {
    const {
      coupon
    } = this.data
    request('/WxPayController/paySuccess', {
      projectNum,
      tradeNum: this.data.tradeInfo.tradeNum,
      couponId: coupon.rowGuid || ''

    }, (data) => {
      if (data.code == 200) {
        this.setData({
          canUse: true
        })
        //支付成功
        wx.showModal({
          title: '提示',
          content: '酬劳托管成功',
          showCancel: false,
          success: (res) => {
            this.setData({
              showAction: false
            })
            const {
              fid,
              custid
            } = this.data
            this.getProjectDetail(fid, custid)
          }
        });
      }
    }, '', () => {
      this.setData({
        canUse: true
      })
    })
  },

  handleToggleAction() {
    const {
      showAction
    } = this.data
    this.setData({
      showAction: !showAction
    })
  },

  onRadioChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onRadioClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.activeTab) {
      this.setData({
        activeTab: Number(options.activeTab)
      })
    }
    this.setData({
      fid: options.fid,
      custid: options.custid
    })
    const userInfo = app.globalData.userInfo
    this.setData({
      userInfo,
    })
    const {
      fid,
      custid
    } = this.data
    this.getProjectDetail(fid, custid)
    this.getProcessList(fid)
    this.getAppraiseRate(fid)
  },

  onTabChange(event) {

  },

  onCollapseChange(event) {
    this.setData({
      activeCollapse: event.detail,
    });
  },

  onCollapse1Change(event) {
    this.setData({
      activeCollapse1: event.detail,
    });
  },

  // 获取项目详情
  getProjectDetail(fid, custid) {
    request('/ProjectController/GetProjectDetail', {
      fid,
      custid
    }, (data) => {
      if (data.code == 200) {
        const projectDetail = data.results[0] || {}
        const biddingRecord = (data.bidding || []).filter(item => item.sTATUS == '06')[0] || {}
        const countDown = moment(projectDetail.fINISH_DATE).valueOf() - moment().valueOf()
        // 是否已经投标
        const hasBidding = (data.bidding || []).some(item => item.rowguid == app.globalData.userInfo.rowGuid)
        this.setData({
          hasBidding,
          projectDetail,
          biddingList: data.bidding || [],
          biddingRecord,
          activeStep: Number(projectDetail.sTATUS_VALUE || 0),
          countDown,
          payAmount: projectDetail.pROJECT_AMT
        })
      } else {
        this.setData({
          projectDetail: {},
          biddingList: [],
          biddingRecord: {},
          activeStep: 0,
        })
      }
    })
  },

  // 选择中标人
  handleWin(e) {
    wx.showModal({
      title: '提示',
      content: "您确认选择此人中标？",
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          console.log(res, 'res')
          const {
            pROJECT_NUM
          } = this.data.projectDetail
          const {
            info
          } = e.target.dataset
          const winBiddingTime = moment().format('YYYY-MM-DD HH:mm:ss')
          const nextUploadProcessTime = moment().add(3, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
          request('/ProjectController/ChooseUser', {
            fid: info.rowguid,
            projectNum: pROJECT_NUM,
            winBiddingTime,
            nextUploadProcessTime
          }, (data) => {
            if (data.code == 200) {
              wx.showModal({
                title: '提示',
                content: '投标人员已经选择完毕，请支付托管酬劳',
                showCancel: false,
                success: (e) => {
                  if (e.confirm) {
                    const {
                      fid,
                      custid
                    } = this.data
                    this.getProjectDetail(fid, custid)
                    this.handleToggleAction()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '投标失败',
              })
            }
          })
        }
      }
    })
  },

  // 投标
  handleBid() {
    const {
      yIJIA,
      sTATUS_VALUE,
      pROJECT_NUM,
      lINK_MAN,
      lINK_TEL,
      pROJECT_AMT,
      eNGINEER_AMT
    } = this.data.projectDetail

    if (sTATUS_VALUE != '00') {
      return wx.showModal({
        title: '提示',
        content: '该项目不在投标环节,您无法进行投标操作。',
        showCancel: false
      });
    }
    wx.navigateTo({
      url: `/pages/bidding/bidding?code=${pROJECT_NUM}&linkMan=${lINK_MAN}&linkTel=${lINK_TEL}&amount=${eNGINEER_AMT}&yijia=${yIJIA}`
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

  // 获取进度列表
  getProcessList(pROJECT_NUM) {
    request('/upload/getImgList', {
      clientGuid: `${pROJECT_NUM}_process`
    }, (data) => {
      if (data.code == 200) {
        let imgList = data.imgList.map(item => ({
          thumb: item.filepath,
          type: "image",
          url: item.filepath
        }))
        this.setData({
          processList: imgList
        });
      }
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