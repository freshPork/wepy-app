/* ==========================    函数抽取 ================================ */
  /**
   * @Describe: 验证手机号
   */
var checkPhoneNumber = function(num) {
  var mobile = num
  var result = false
  var msg = ''
  var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
  if (mobile == '') {
    msg = '手机号不能为空!'
    wx.showToast({
      title: '手机号不能为空!',
      icon: 'none'
    })
  } else if (mobile.length != 11) {
    msg = '手机号长度有误！'
    wx.showToast({
      title: '手机号长度有误！',
      icon: 'none'
    })
  } else if (!phonetel.test(mobile)) {
    msg = '手机号有误！'
    wx.showToast({
      title: '手机号有误！',
      icon: 'none'
    })
  } else {
    result = true
  }
  if (!result) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }
  return result
}

 /**
  * @Describe: 修改请求post
    -D  mothod
  */
function httpRequest(url, data, method, successCall, errorCall, completeCall) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json;charset=UTF-8',
      'Token': localStorageSyncServer.get('token')
    },
    success: (res) => {
      if (res.data.code != 200) {
        // 提示错误信息
        if (res.data.msg) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        // token 失效返回登录页
        if (res.data.code == 10001) {
          localStorageSyncServer.remove('token')
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        return
      }
      if (successCall) {
        successCall(res.data.data)
      }
    },
    fail: (error) => {
      if (errorCall) {
        errorCall(res)
      }
      console.log(error)
    },
    complete: (result) => {
      if (completeCall) {
        completeCall(res)
      }
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh()      // 停止下拉刷新
    }
  })
}

 /**
  * @Describe: 修改请求Get
  */
function httpRequestGet(url, successCall, errorCall, completeCall) {
  wx.request({
    url: url,
    header: {
      'Token': localStorageSyncServer.get('token')
    },
    success: (res) => {
      if (res.data.code != 200) {
        // 提示错误信息
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        // token 失效返回登录页
        if (res.data.code == 10001) {
          localStorageSyncServer.remove('token')
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        return
      }
      if (successCall) {
        successCall(res.data.data)
      }
    },
    fail: (error) => {
      if (errorCall) {
        errorCall(res)
      }
      console.log(error)
    },
    complete: (result) => {
      if (completeCall) {
        completeCall(res)
      }
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh()      // 停止下拉刷新
    }
  })
}

/**
 * @Describe: 设置缓存异步
 */
var localStorageServer = {
  set: function (key, value, call) {
    wx.setStorage({
      key: key,
      data: value,
      success: function (res) {
        if (call) {
          call()
        }
      }
    })
  },
  get: function (key, call) {
    wx.getStorage({
      key: key,
      success: function (res) {
        return res
        if (call) {
          call()
        }
      }
    })
  }
}

/**
 * @Describe: 设置缓存同步
 *  get set remove clear
 */
var localStorageSyncServer = {
  set: function (key, value) {
    wx.setStorageSync(key, value)
  },
  get: function (key) {
    return wx.getStorageSync(key)
  },
  remove: function(key) {
    wx.removeStorageSync(key)
  },
  clear: function() {
    wx.clearStorageSync()
  }
}

/**
 * @Describe: 秒 转化为时间
 *
 */
function secondTransferTime(time) {
  if (time > 3600) {
    return [
      parseInt(time / 60 / 60),
      parseInt(time / 60 % 60),
      parseInt(time % 60)
    ]
      .join(':')
      .replace(/\b(\d)\b/g, '0$1')
  } else {
    return [
      parseInt(time / 60 % 60),
      parseInt(time % 60)
    ]
      .join(':')
      .replace(/\b(\d)\b/g, '0$1')
  }
}

export {
  checkPhoneNumber, httpRequest, localStorageServer, localStorageSyncServer, httpRequestGet, secondTransferTime
}
