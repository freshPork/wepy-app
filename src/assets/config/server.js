/**
 * @Author mileS.
 * @Date 2018/8/29.
 * @Description: .server层 提供接口调用
 */
const API = require("./config");
import $WxResource from "../js/HttpRequest";
class InterServer {
    constructor(){
        this.login                             = $WxResource.save(API.login)  ;                       // 登陆
        this.getUserInfo                       = $WxResource.save(API.getUserInfo)  ;                 // 获取用户信息
        this.getPhoneRecord                    = $WxResource.save(API.getPhoneRecord)  ;              // 获取手机号信息
        this.getMergeUserInfo                  = $WxResource.save(API.getMergeUserInfo)  ;            // 获取两段信息
        this.getPhoneVerifyCode                = $WxResource.save(API.getPhoneVerifyCode)  ;          // 发送验证码
        this.completeBaseInfo                  = $WxResource.form(API.completeBaseInfo)  ;            // 完善基础信息
        this.bindPhone                         = $WxResource.save(API.bindPhone)  ;                   // 完善基础信息
        this.addPiFriend                       = $WxResource.form(API.addPiFriend)  ;                 // 添加pi友
        this.deletePiFriend                    = $WxResource.save(API.deletePiFriend)  ;              // 删除pi友
        this.updatePiFriend                    = $WxResource.form(API.updatePiFriend)  ;              // 编辑pi友
        this.getPiFriendList                   = $WxResource.save(API.getPiFriendList)  ;             // 好友列表
        this.getCommonConfig                   = $WxResource.save(API.getCommonConfig)  ;             // 获取公有配置对照表
        this.getPersonBaseReport               = $WxResource.query(API.getPersonBaseReport)  ;        // 获取公有配置对照表
        this.getPersonShareBaseReport          = $WxResource.save(API.getPersonShareBaseReport)  ;    // 获取公有配置对照表
        this.userFeedbackImg                   = API.userFeedbackImg  ;                               // 用户反馈
        this.userFeedback                      = $WxResource.save(API.userFeedback)  ;                // 用户反馈
        this.getIndexBanner                    = $WxResource.save(API.getIndexBanner)  ;              // 首页banner
      // 首页列表
      this.getIndexReport = $WxResource.save(API.getIndexReport);
      // 已购报告
      this.getBoughtReport = $WxResource.get(API.getBoughtReport);
      // 小报告列表
      this.getForunteList = $WxResource.save(API.getForunteList);
      // 小报告详情
      this.getForunteDetail = $WxResource.save(API.getForunteDetail);
      // 小报告详情-分享
      this.getShareForunteDetail = $WxResource.save(API.getShareForunteDetail);
      // 关联报告
      this.getLinkReport = $WxResource.get(API.getLinkReport);
      // 身份卡
      this.getIdentityCard = $WxResource.get(API.getIdentityCard);
      // 身份卡-他人
      this.getIdentityCardOth = $WxResource.save(API.getIdentityCardOth);

      // 关系匹配报告
      this.getMatchReport = $WxResource.save(API.getMatchReport);
      // 关系匹配报告-分享
      this.getShareMatchReport = $WxResource.save(API.getShareMatchReport);
      // 关系匹配报告-历史
      this.getMatchReportHistory = $WxResource.save(API.getMatchReportHistory);
      // 关系匹配记录
      this.getMatchHistory = $WxResource.save(API.getMatchHistory);

      // 活动-优惠券
      this.getActivity = $WxResource.save(API.getActivity);
      // 活动-初始数据
      this.getActivityInit = $WxResource.save(API.getActivityInit);
      // 领取-优惠券
      this.getCoupon = $WxResource.save(API.getCoupon);

      // 购买报告
      this.payReport = $WxResource.save(API.payReport);

      // 购买报告，价格详情
      this.priceDetail = $WxResource.save(API.priceDetail);

      // 获取分享二维码
      this.getQr = $WxResource.save(API.getQr);

      //获取深度报告数据
      this.getDeepReportData = $WxResource.save(API.getDeepReportData);

      // 发送formId
      this.sendFormId = $WxResource.get(API.sendFormId);

      //修改引导状态
      this.changeGuideStatus = $WxResource.save(API.changeGuideStatus);
      //获取夫妻、情侣报告引导语
      this.getGuideLanguage = $WxResource.get(API.getGuideLanguage);
      //获取夫妻、情侣报告
      this.getPartnerReport = $WxResource.save(API.getPartnerReport);
      //购买夫妻、情侣报告
      this.getPayPartnerReport = $WxResource.save(API.getPayPartnerReport);
    }
}

export default  new InterServer();
