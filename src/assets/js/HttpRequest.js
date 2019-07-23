/**
 * @Author mileS.
 * @Date 2018/8/29.
 * @Description: .修改请求
 */

import { localStorageSyncServer, randomGenerator } from './common'
import Interceptor from './Interceptor'
import hex_md5 from './md5'
import VALUES from '../values/values'
import wepy from 'wepy'
class Http {
  constructor() {
        // 请求header添加自定项，返回header参数
    this.getHeader = (method, formId) => {
      let [ Nonce, Time, Token ] =
                [ randomGenerator(6), new Date().getTime(), localStorageSyncServer.get('Token') ]
      return {
        'content-type': method == 'FORM' ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8',
        'Token': Token,
        'XY-Agent': JSON.stringify({
          'app_version': VALUES.VERSION,
          'os': localStorageSyncServer.get('os'),
          'channel': 3
        }),
        'Nonce': Nonce,
        'Time': Time,
        'Sign': hex_md5(Token + '@' + Nonce + '@' + Time),
        'form_id': formId || ''
      }
    }
        // 根据method，反馈url以及参数
    this.getConfig = (method, url, data) => {
      if (method.toUpperCase() == 'GET') {
        let reg = /(.*):([^:]+)/g
        let param = url.replace(reg, '$2')
        if (data && data.hasOwnProperty(param)) {
          url = url.replace(reg, '$1' + data[param])
        }
        data = ''
      } else if (method.toUpperCase() == 'QUERY') {
        url = url + '?'
        Object.keys(data).map(key => {
          if (url.match(/&/g)) {
            url = url + '&' + key + '=' + data[key]
          } else {
            url = url + key + '=' + data[key]
          }
        })
        data = ''
      }
      if (method == 'FORM') {
        method = 'POST'
      } else if (method == 'QUERY') {
        method = 'GET'
      }
      return {
        u: url,
        d: data,
        m: method
      }
    }
        // 缓存request到wx中
    this.storeRequest = (request) => {
            // 默认最多存储五个
      let reqObj = wx.customHttpRecorder || {}
      let keys = Object.keys(reqObj)
      let keyNumber = keys.map(v => +v.substring(2))
      if (keys.length == 5) {
            //     获取最早的删除
        let min = Math.min(...keyNumber)
        delete reqObj['t-' + min]
      }
      reqObj['t-' + new Date().getTime()] = request
      wx.customHttpRecorder = reqObj
    }
        //  中断所有请求
    this.httpAbort = () => {
      let httpList = wx.customHttpRecorder
      Object.keys(httpList).map(v => {
        httpList[v].abort()
      })
    }
  }
  request(method, url, data) {
    if (data) {
      var formId = data.form_id || ''
      if (data.form_id) {
        delete data.form_id
      }
    }
    let header = this.getHeader(method, formId)
    let config = this.getConfig(method, url, data)
    let { u, d, m } = config
    u = Interceptor.request(u)
    if (!u) { return new Promise(() => {}) }
    return new Promise((resolve, reject) => {
      let request = wepy.request({
        url: u,
        method: m,
        data: d,
        header: header,
        success: (response) => {
          Interceptor.response(response).then((data) => {
            resolve(data, 'done')
          }, (error) => {
            reject(error)
          })
        },
        fail: (error) => {  // 失败
          Interceptor.responseError(error)
          reject(error)
        },
        complete: (result) => { // 完成
          Interceptor.complete(result)
        }
      })
      this.storeRequest(request)
    })
  }
}

class HttpRequest extends Http {
  constructor(url, data) {
    super(url, data)
  }
  save(url) {  // post 方法 {}
    return parameter => this.request('POST', url, parameter)
  }

  get(url) {   // get 方法 /{}
    return parameter => this.request('GET', url, parameter)
  }

  query(url) {  // get 方法  ? + &
    return parameter => this.request('QUERY', url, parameter)
  }

  form(url) {  // get 方法 form{}
    return parameter => this.request('FORM', url, parameter)
  }
}

export default new HttpRequest()
