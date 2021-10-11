import {
  BASEURL
} from './host'
const app = getApp();

function request(url, data, callback, errorText, failback, loading) {
  console.log(app,'aaa')
  //创建header 
  const header = {
    'content-type': 'application/json',
    openId: app.globalData.userInfo.openId,
  };
  (loading || true) && wx.showLoading({
    title: '加载中',
  });
  //进行请求,一般外层都有一个封装,然后放在公共类里边
  wx.request({
    url: `${BASEURL}${url}`,
    method: 'POST',
    header: header, //传在请求的header里
    data: {
      "param": {
        userGuid: app.globalData.userInfo.rowGuid,
        userFlag:app.globalData.userInfo.userFlag,
        ...data,
      }
    },
    success(res) {
      console.log(res, 'res');
      //请求成功的处理
      (loading || true) && wx.hideLoading();
      if (res.statusCode == 200) {
        callback(res.data);
      } else {
        callback(res.data)
        console.log('errorText' + (errorText || '请求异常'))
        wx.showToast({
          title: errorText || res.data.error || '请求异常',
          icon: 'none',
          duration: 2000
        });
      }
    },
    fail: function (res) {
      (loading || true) && wx.hideLoading();
      wx.showToast({
        title: JSON.stringify(res),
        icon: 'none',
        duration: 2000
      });
      failback && failback(res)
    }

  })
}

function requestFile(url, filePath, data, callback, errorText, failback) {
  console.log(JSON.stringify({
    ...data
  }))
  wx.uploadFile({
    url: `${BASEURL}${url}`,
    filePath: filePath,
    name: 'file',
    formData: {
      "param": JSON.stringify({
        ...data
      })
    },
    header: {
      'Content-Type': 'multipart/form-data'
    },
    success: function (res) {
      const data = JSON.parse(res.data);
      //请求成功的处理
      // (loading || true) && wx.hideLoading();
      if (data.code == 200) {
        callback(data);
      } else {
        console.log('errorText' + (errorText || '请求异常'))
        wx.showToast({
          title: errorText || '请求异常',
          icon: 'none',
          duration: 2000
        });
      }
    },
    fail: function (res) {
      console.log('httpPostFile:fail:' + res)
      // (loading || true) && wx.hideLoading();
      wx.showToast({
        title: JSON.stringify(res),
        icon: 'none',
        duration: 2000
      });
      failback && failback(res)
    }
  })
}

export {
  request,
  requestFile
}