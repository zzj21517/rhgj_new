// components/customInfo/index.js
import {
  request
} from '../../utils/request'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
   * 组件的初始数据
   */
  data: {
    activeCollapse: ['1'],
    customTypeList: ["施工企业", "咨询公司", "设计院", "工作室"],
    checkResult: ["施工企业"],
    other: '',
    customFundAge: '',
    customMemberNum: '',
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
            customTypes,
            customFundAge,
            customMemberNum
          } = data.data
          const {
            customTypeList,
          } = this.data
          this.dealWithOther(customTypes, customTypeList, 'checkResult', 'other')
          this.setData({
            customFundAge: customFundAge || '',
            customMemberNum: customMemberNum || '',
          })
        }
      })
    },
    // 提交
    handleApply() {
      const {
        checkResult,
        other,
        customFundAge,
        customMemberNum
      } = this.data
      if (!checkResult.length && !other) {
        return wx.showToast({
          title: '请至少选择一项客户类型或自行填写',
          icon: 'none',
        })
      }
      if (!customFundAge) {
        return wx.showToast({
          title: '请填写成立年限',
          icon: 'none',
        })
      }
      if (!customMemberNum) {
        return wx.showToast({
          title: '请填写成员人数',
          icon: 'none',
        })
      }
      console.log(this.data)
      const params = {
        customTypes: (other ? [...checkResult, other] : checkResult).join(';'),
        ...customFundAge && {
          customFundAge
        },
        ...customMemberNum && {
          customMemberNum
        }
      }
      this.updateCustomInfo(params)
    },
    // 更新数据
    updateCustomInfo(params) {
      request('/peopleinfo/updateCustomInfo', params, (data) => {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          success() {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        })
      })
    },
    onCollapseChange(event) {
      this.setData({
        activeCollapse: event.detail,
      });
    },
    onCheckChange(event) {
      this.setData({
        checkResult: event.detail
      });
    },
    checkToggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      console.log(checkbox, `.checkboxes-${index}`, index.length, event.currentTarget.dataset)
      checkbox.toggle();
    },
    checkNoop() {

    }
  }
})