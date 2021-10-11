// components/engineerPersonInfo/index.js
import {
  getUserInfo
} from '../../utils/util'
import {
  request,
  requestFile
} from '../../utils/request'
import {
  uuid
} from '../../utils/util'
import {
  areaList
} from "@vant/area-data"
console.log(areaList)
areaList.province_list[100000] = '全国'
areaList.city_list[100100] = '全国'
areaList.county_list[100101] = '全国'
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
    timeShowType: '',
    userDetailInfo: {}, //详情信息
    engineerName: '',
    memberNum: '',
    idCardCertFileList: [],
    businessCertFileList: [],
    tjNum: '',
    azNum: '',
    ylNum: '',
    jzxNum: '',
    szdlqlNum: '',
    dlNum: '',
    dtNum: '',
    tlNum: '',
    txNum: '',
    tjjsbNum: '',
    azjsbNum: '',
    yljsbNum: '',
    jzxjsbNum: '',
    szdlqljsbNum: '',
    dljsbNum: '',
    dtjsbNum: '',
    tljsbNum: '',
    txjsbNum: '',
    wyfwNum: '',
    bafwNum: '',
    bjfwNum: '',
    stcbfwNum: '',
    ljqyfwNum: '',
    wlysfwNum: '',
    spzzfwNum: '',
    gccgNum: '',
    hwcgNum: '',
    fwcgNum: '',
    zfcgNum: '',
    jzxcswjNum: '',
    jzNum: '',
    qzNum: '',
    jzSpaceTime: '',
    qzSpaceTime: '',
    lessThan3WorkYears: '',
    moreThan3WorkYears: '',
    moreThan5WorkYears: '',
    major: '',
    majorTypeList: [{
      label: '土建',
      value: '1',
    }, {
      label: '安装',
      value: '2'
    }, {
      label: '园林市政',
      value: '3'
    }, {
      label: '道路桥梁',
      value: '4',
    }, {
      label: '精装修',
      value: '5',
    }, {
      label: '铁路',
      value: '6',
    }, {
      label: '电力',
      value: '7',
    }, {
      label: '地铁',
      value: '8',
    }, {
      label: '通信',
      value: '9'
    }],
    majorCheckResult: [],
    showMajor: false,
    engineerCertFileList: [], //证书列表
    showArea: false,
    areaList,
    cityCode: '',
    selectedAreaList: [{}],
    curAreaIndex: 0, //当前筛选的地区
    partJob: "兼职", //兼职全职
    canUploadElecBidding: 0, //会不会上传电子标
    canStamp: 0,
    technologyLevel: "", //技术标水平
    workYears: '',
    showTechnologyLevel: false,
    technologyLevelActions: [{
      name: '1-3名'
    }, {
      name: '4-7名'
    }, {
      name: '8名以外'
    }],
    showWorkYears: false,
    workYearsActions: [{
        name: 1
      },
      {
        name: 2
      },
      {
        name: 3
      },
      {
        name: 4
      },
      {
        name: 5
      },
      {
        name: 6
      },
      {
        name: 7
      },
      {
        name: 8
      },
      {
        name: 9
      },
      {
        name: 10
      },
      {
        name: 11
      },
      {
        name: 12
      },
      {
        name: 13
      },
      {
        name: 14
      },
      {
        name: 15
      },
      {
        name: 16
      },
      {
        name: 17
      },
      {
        name: 18
      },
      {
        name: 19
      },
      {
        name: 20
      },
      {
        name: 21
      },
      {
        name: 22
      },
      {
        name: 23
      },
      {
        name: 24
      },
      {
        name: 25
      },
      {
        name: 26
      },
      {
        name: 27
      },
      {
        name: 28
      },
      {
        name: 29
      },
      {
        name: 30
      },
      {
        name: 31
      },
      {
        name: 32
      },
      {
        name: 33
      },
      {
        name: 34
      },
      {
        name: 35
      },
      {
        name: 36
      },
      {
        name: 37
      },
      {
        name: 38
      },
      {
        name: 39
      },
      {
        name: 40
      },
      {
        name: 41
      },
      {
        name: 42
      },
      {
        name: 43
      },
      {
        name: 44
      },
      {
        name: 45
      },
      {
        name: 46
      },
      {
        name: 47
      },
      {
        name: 48
      },
      {
        name: 49
      },
      {
        name: 50
      }
    ],
    spaceTime: '',
    showSpaceTime: false,
    spaceTimeActions: [{
      name: 1
    }, {
      name: 2
    }, {
      name: 3
    }, {
      name: 4
    }, {
      name: 5
    }, {
      name: 6
    }, {
      name: 7
    }, {
      name: 8
    }, {
      name: 9
    }, {
      name: 10
    }, {
      name: 11
    }, {
      name: 12
    }, {
      name: 13
    }, {
      name: 14
    }, {
      name: 15
    }, {
      name: 16
    }, {
      name: 17
    }, {
      name: 18
    }, {
      name: 19
    }, {
      name: 20
    }, {
      name: 21
    }, {
      name: 22
    }, {
      name: 23
    }, {
      name: 24
    }],

    companyType: '',
    showCompanyType: false,
    companyTypeActions: [{
      name: '甲方'
    }, {
      name: '咨询公司'
    }, {
      name: '施工单位'
    }, {
      name: '自由职业'
    }],
    canUseBim: 0,
    canLocalCheck: 0,
    canFieldCheck: 0,

    activeCollapse: ['1'],
    itemPricingList: ['广联达', '新点', '神机妙算', '晨曦', '海迈', '斯维尔', '擎州广达', '未来', '宏业', '博微', '金鲁班', '鹏业', '清单大师', '智多星', '博奥', '金石', '易投', '同型', '纵横', '品茗', '易达'],
    itemPricingCheckResult: [],
    otherItemPricing: '',

    calcuVolumeList: ['广联达', '斯维尔', '算王', 'E算量'],
    calcuVolumeCheckResult: [],
    otherCalcuVolume: '',

    projectTypeList: ['土建', '安装', '园林', '精装修', '市政道路桥梁', '电力', '地铁', '通信', '铁路'],
    projectTypeCheckResult: [],
    otherProjectType: '',

    serviceTypeList: ['物业服务', '保安服务', '保洁服务', '食堂承包服务', '垃圾清运服务', '物流运输服务', '商铺招租服务'],
    serviceTypeCheckResult: [],
    otherServiceType: '',

    purchaseTypeList: ['工程采购', '贸物采购', '服务采购', '政府采购', '竞争性磋商文件'],
    purchaseTypeCheckResult: [],
    otherPurchaseType: '',
  },

  properties: {
    userInfo: {
      type: Object,
      value: {}
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getUserDetailInfo()
    },
    moved: function () {},
    detached: function () {

    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理数据
    dealWithOther(data, dataList, listName, otherName) {
      if (data) {
        let result = []
        let otherList = []
        data.split(';').map(item => {
          if (dataList.includes(item)) {
            result.push(item)
          } else {
            otherList.push(item)
          }
        })
        console.log(data, otherList, otherList.join(';'), 'other')
        this.setData({
          [listName]: result,
          [otherName]: otherList.join(';')
        })
      }
    },
    // 获取信息
    getUserDetailInfo() {
      request('/peopleinfo/getUserDetailInfo', {}, (data) => {
        if (data.code == 200) {
          let {
            engineerName,
            memberNum,
            tjNum,
            azNum,
            ylNum,
            jzxNum,
            szdlqlNum,
            dlNum,
            dtNum,
            tlNum,
            txNum,
            tjjsbNum,
            azjsbNum,
            yljsbNum,
            jzxjsbNum,
            szdlqljsbNum,
            dljsbNum,
            dtjsbNum,
            tljsbNum,
            txjsbNum,
            wyfwNum,
            bafwNum,
            bjfwNum,
            stcbfwNum,
            ljqyfwNum,
            wlysfwNum,
            spzzfwNum,
            gccgNum,
            hwcgNum,
            fwcgNum,
            zfcgNum,
            jzxcswjNum,
            jzNum,
            qzNum,
            jzSpaceTime,
            qzSpaceTime,
            businessCertImgs,
            idCardCertImgs,
            engineerCertImgs,
            lessThan3WorkYears,
            moreThan3WorkYears,
            moreThan5WorkYears,
            canUseBim,
            canUploadElecBidding,
            canLocalCheck,
            canFieldCheck,
            technologyLevel,
            itemPricingSoftware,
            calcuVolumeSoftware,
            canDoArea,
          } = data.data
          const {
            itemPricingList,
            calcuVolumeList,
            technologyLevelActions
          } = this.data
          this.dealWithOther(itemPricingSoftware, itemPricingList, 'itemPricingCheckResult', 'otherItemPricing')
          this.dealWithOther(calcuVolumeSoftware, calcuVolumeList, 'calcuVolumeCheckResult', 'otherCalcuVolume')
          this.setData({
            engineerName,
            selectedAreaList: canDoArea ? canDoArea.split(';').map(item => ({
              areaNameStr: item.split(':')[0],
              areaCodeStr: item.split(':')[1]
            })) : [{}],
            businessCertFileList: businessCertImgs ? businessCertImgs.split(';').map(item => ({
              thumb: item,
              type: "image",
              url: item
            })) : [],
            idCardCertFileList: idCardCertImgs ? idCardCertImgs.split(';').map(item => ({
              thumb: item,
              type: "image",
              url: item
            })) : [],
            engineerCertFileList: engineerCertImgs ? engineerCertImgs.split(';').map(item => ({
              thumb: item,
              type: "image",
              url: item
            })) : [],
            technologyLevel: technologyLevelActions[technologyLevel - 1].name,
            memberNum,
            tjNum,
            azNum,
            ylNum,
            jzxNum,
            szdlqlNum,
            dlNum,
            dtNum,
            tlNum,
            txNum,
            tjjsbNum,
            azjsbNum,
            yljsbNum,
            jzxjsbNum,
            szdlqljsbNum,
            dljsbNum,
            dtjsbNum,
            tljsbNum,
            txjsbNum,
            wyfwNum,
            bafwNum,
            bjfwNum,
            stcbfwNum,
            ljqyfwNum,
            wlysfwNum,
            spzzfwNum,
            gccgNum,
            hwcgNum,
            fwcgNum,
            zfcgNum,
            jzxcswjNum,
            jzNum,
            qzNum,
            jzSpaceTime,
            qzSpaceTime,
            lessThan3WorkYears,
            moreThan3WorkYears,
            moreThan5WorkYears,
            canUseBim,
            canUploadElecBidding,
            canLocalCheck,
            canFieldCheck,
          })
          console.log(this.data)
        }
      })
    },
    // 提交
    handleApply() {
      const {
        engineerName,
        memberNum,
        tjNum,
        azNum,
        ylNum,
        jzxNum,
        szdlqlNum,
        dlNum,
        dtNum,
        tlNum,
        txNum,
        tjjsbNum,
        azjsbNum,
        yljsbNum,
        jzxjsbNum,
        szdlqljsbNum,
        dljsbNum,
        dtjsbNum,
        tljsbNum,
        txjsbNum,
        wyfwNum,
        bafwNum,
        bjfwNum,
        stcbfwNum,
        ljqyfwNum,
        wlysfwNum,
        spzzfwNum,
        gccgNum,
        hwcgNum,
        fwcgNum,
        zfcgNum,
        jzxcswjNum,
        jzNum,
        qzNum,
        jzSpaceTime,
        qzSpaceTime,
        businessCertFileList,
        idCardCertFileList,
        engineerCertFileList,
        lessThan3WorkYears,
        moreThan3WorkYears,
        moreThan5WorkYears,
        selectedAreaList,
        canUseBim,
        canUploadElecBidding,
        canLocalCheck,
        canFieldCheck,
        technologyLevel,
        itemPricingCheckResult,
        otherItemPricing,
        calcuVolumeCheckResult,
        otherCalcuVolume,
        technologyLevelActions,
      } = this.data
      if (!engineerName) {
        return wx.showToast({
          title: '请填写昵称',
          icon: 'none',
        })
      }
      if (!selectedAreaList.some(item => item.areaNameStr)) {
        return wx.showToast({
          title: '请至少选择一个能做的项目地区',
          icon: 'none',
        })
      }
      if (!technologyLevel && technologyLevel!=0) {
        return wx.showToast({
          title: '请选择技术标排名',
          icon: 'none',
        })
      }
      if (!itemPricingCheckResult.length && !otherItemPricing) {
        return wx.showToast({
          title: '请至少选择一项组价软件或自行填写',
          icon: 'none',
        })
      }
      if (!calcuVolumeCheckResult.length && !otherCalcuVolume) {
        return wx.showToast({
          title: '请至少选择一项算量软件或自行填写',
          icon: 'none',
        })
      }
      console.log(this.data)
      const params = {
        engineerName,
        memberNum: memberNum || 0,
        tjNum: tjNum || 0,
        azNum: azNum || 0,
        ylNum: ylNum || 0,
        jzxNum: jzxNum || 0,
        szdlqlNum: szdlqlNum || 0,
        dlNum: dlNum || 0,
        dtNum: dtNum || 0,
        tlNum: tlNum || 0,
        txNum: txNum || 0,
        tjjsbNum: tjjsbNum || 0,
        azjsbNum: azjsbNum || 0,
        yljsbNum: yljsbNum || 0,
        jzxjsbNum: jzxjsbNum || 0,
        szdlqljsbNum: szdlqljsbNum || 0,
        dljsbNum: dljsbNum || 0,
        dtjsbNum: dtjsbNum || 0,
        tljsbNum: tljsbNum || 0,
        txjsbNum: txjsbNum || 0,
        wyfwNum: wyfwNum || 0,
        bafwNum: bafwNum || 0,
        bjfwNum: bjfwNum || 0,
        stcbfwNum: stcbfwNum || 0,
        ljqyfwNum: ljqyfwNum || 0,
        wlysfwNum: wlysfwNum || 0,
        spzzfwNum: spzzfwNum || 0,
        gccgNum: gccgNum || 0,
        hwcgNum: hwcgNum || 0,
        fwcgNum: fwcgNum || 0,
        zfcgNum: zfcgNum || 0,
        jzxcswjNum: jzxcswjNum || 0,
        jzNum: jzNum || 0,
        qzNum:qzNum||0,
        jzSpaceTime: jzSpaceTime || 0,
        qzSpaceTime: qzSpaceTime || 0,
        lessThan3WorkYears:lessThan3WorkYears||0,
        moreThan3WorkYears:moreThan3WorkYears||0,
        moreThan5WorkYears:moreThan5WorkYears||0,
        canDoArea: selectedAreaList.filter(item => item.areaNameStr).map(item => (`${item.areaNameStr}:${item.areaCodeStr}`)).join(';'),
        businessCertImgs: businessCertFileList.map(item => item.url).join(';'),
        idCardCertImgs:idCardCertFileList.map(item=>item.url).join(';'),
        engineerCertImgs:engineerCertFileList.map(item=>item.url).join(';'),
        canUseBim,
        canUploadElecBidding,
        canLocalCheck,
        canFieldCheck,
        technologyLevel: technologyLevelActions.findIndex(item => item.name == technologyLevel) + 1,
        itemPricingSoftware: (otherItemPricing ? [...itemPricingCheckResult, otherItemPricing] : itemPricingCheckResult).join(';'),
        calcuVolumeSoftware: (otherCalcuVolume ? [...calcuVolumeCheckResult, otherCalcuVolume] : calcuVolumeCheckResult).join(';'),
      }
      console.log(params,'ppp')
      this.updateEngineerTeamInfo(params)
    },
    // 更新数据
    updateEngineerTeamInfo(params) {
      request('/peopleinfo/updateEngineerTeamInfo', params, (data) => {
        if (data.code == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            success() {
              wx.switchTab({
                url: '/pages/my/my',
              })
            }
          })
        }
      })
    },
    handleAddArea() {
      let selectedAreaList = this.data.selectedAreaList
      selectedAreaList = [...selectedAreaList, {}]
      this.setData({
        selectedAreaList
      })
    },
    handleMinusArea(e) {

      let selectedAreaList = this.data.selectedAreaList
      const index = e.currentTarget.dataset.index
      selectedAreaList.splice(index, 1)
      this.setData({
        selectedAreaList
      })
    },
    handleMajorSelect() {
      const {
        majorCheckResult
      } = this.data
      let major = ''
      majorCheckResult.map((item, index) => {
        if (index != majorCheckResult.length - 1) {
          major += item.split(':')[0] + '、'
        } else {
          major += item.split(':')[0]
        }
      })
      this.setData({
        major
      })
      this.onMajorClose()
    },
    showPopupMajor() {
      this.setData({
        showMajor: true
      })
    },
    onMajorClose() {
      this.setData({
        showMajor: false
      })
    },
    onMajorCheckChange(event) {
      console.log(event, 'eewe')
      this.setData({
        majorCheckResult: event.detail
      });
    },
    majorCheckToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.major-checkboxes-${index}`);
      checkbox.toggle();
    },
    checkNoop() {

    },

    showPopupArea(event) {
      const {
        index
      } = event.currentTarget.dataset;
      this.setData({
        showArea: true,
        curAreaIndex: index
      })
    },
    onAreaClose() {
      this.setData({
        showArea: false
      })
    },
    handleAreaConfirm(e) {
      console.log(e)
      const values = e.detail.values
      let codeStr = '',
        nameStr = '';
      values.map((item, index) => {
        if (index != values.length - 1) {
          codeStr += item.code + '-'
          nameStr += item.name + '-'
        } else {
          codeStr += item.code
          nameStr += item.name
        }
      })
      let selectedAreaList = [...this.data.selectedAreaList]
      selectedAreaList.forEach((item, index) => {
        if (index == this.data.curAreaIndex) {
          item.areaCodeStr = codeStr
          item.areaNameStr = nameStr
        }
      })
      this.setData({
        selectedAreaList
      })
      this.onAreaClose()
    },
    handleAreaCancel() {
      this.onAreaClose()
    },
    onPartJobChange(e) {
      this.setData({
        partJob: e.detail
      })
    },

    // 技术标排名

    onTechnologyLevelShow() {
      this.setData({
        showTechnologyLevel: true,
      })
    },

    onTechnologyLevelClose() {
      this.setData({
        showTechnologyLevel: false
      })
    },
    onTechnologyLevelSelect(event) {
      this.setData({
        technologyLevel: event.detail.name
      })
    },

    onWorkYearsShow() {
      this.setData({
        showWorkYears: true,
      })
    },

    onWorkYearsClose() {
      this.setData({
        showWorkYears: false
      })
    },
    onWorkYearsSelect(event) {
      this.setData({
        workYears: event.detail.name
      })
    },

    onSpaceTimeShow(e) {
      this.setData({
        timeShowType: e.currentTarget.dataset.type,
        showSpaceTime: true,
      })
    },

    onSpaceTimeClose() {
      this.setData({
        showSpaceTime: false
      })
    },
    onSpaceTimeSelect(event) {
      this.setData({
        [`${this.data.timeShowType}SpaceTime`]: event.detail.name
      })
    },

    onCompanyTypeShow() {
      this.setData({
        showCompanyType: true,
      })
    },

    onCompanyTypeClose() {
      this.setData({
        showCompanyType: false
      })
    },
    onCompanyTypeSelect(event) {
      this.setData({
        companyType: event.detail.name
      })
    },

    // itemPricing
    onCollapseChange(event) {
      this.setData({
        activeCollapse: event.detail,
      });
    },
    onItemPricingCheckChange(event) {
      this.setData({
        itemPricingCheckResult: event.detail
      });
    },
    itemPricingCheckToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.itemPricing-checkboxes-${index}`);
      console.log(checkbox, `.itemPricing-checkboxes-${index}`, index.length, event.currentTarget.dataset)
      checkbox.toggle();
    },

    // calcuVolume
    onCalcuVolumeCheckChange(event) {
      this.setData({
        calcuVolumeCheckResult: event.detail
      });
    },
    calcuVolumeCheckToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.calcuVolume-checkboxes-${index}`);
      checkbox.toggle();
    },

    // projectType
    onProjectTypeCheckChange(event) {
      this.setData({
        projectTypeCheckResult: event.detail
      });
    },
    projectTypeCheckToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.projectType-checkboxes-${index}`);
      checkbox.toggle();
    },

    // serviceType
    onServiceTypeCheckChange(event) {
      this.setData({
        serviceTypeCheckResult: event.detail
      });
    },
    serviceTypeCheckToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.serviceType-checkboxes-${index}`);
      checkbox.toggle();
    },

    // purchaseType
    onPurchaseTypeCheckChange(event) {
      this.setData({
        purchaseTypeCheckResult: event.detail
      });
    },
    purchaseTypeCheckToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.purchaseType-checkboxes-${index}`);
      checkbox.toggle();
    },

    // 上传cert
    afterCertRead(event) {
      const {
        openId
      } = this.data.userInfo
      const {
        type
      } = event.currentTarget.dataset;
      const {
        file
      } = event.detail
      requestFile('/upload/uploadPic', file.url, {
        clientguid: `${openId}_${type}`,
        attachguid: uuid()
      }, (data) => {
        console.log(data, 'ddd')
        const {
          engineerCertFileList,
          idCardCertFileList,
          businessCertFileList
        } = this.data;
        let certObj = {
          engineerCertFileList,
          idCardCertFileList,
          businessCertFileList
        }
        certObj[`${type}FileList`].push({
          ...file,
          url: data.url
        });
        this.setData({
          [`${type}FileList`]: certObj[`${type}FileList`]
        });
      })
    },

    // radio
    onRadioChange(e) {
      const {
        label
      } = e.currentTarget.dataset
      const {
        detail
      } = e
      this.setData({
        [label]: detail
      })
    }
  }
})