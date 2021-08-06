import {
  BASEURL
} from './host'
const app = getApp();

function request(url, data, callback, errorText, failback, loading) {
  //创建header 
  const header = {
    'content-type': 'application/json',
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
        ...data
      }
    },
    success(res) {
      //请求成功的处理
      (loading || true) && wx.hideLoading();
      if (res.data.code == 200) {
        callback(res.data);
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

export {
  request
}