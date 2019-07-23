'use strict'
/**
 * @Author mileS.
 * @Date 2018/10/30.
 * @Description: 小程序配置文件.
 */
import { freezeConstant } from '../js/common'
const version = '1.0'

let hostIp = 'https://mimapi.xuanyiai.com' // 生产环境

let root = `${hostIp}/api/pi`

var config = {
  root: '',
  login: `/public/user/${version}/small_program/login`,      // 登陆
  getUserInfo: `/user/${version}/info`,                            // 获取用户信息
  thirdBindInfo: `public/user/${version}/third/party/exists`,        // 判断第三方账号绑定情况
}

// 增加root
Object.keys(config).forEach(key => {
  config[key] = root + config[key]
})
module.exports = freezeConstant(config)
