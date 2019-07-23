import VALUES from "../values/values";
import {empty, localStorageSyncServer} from "./common";

/**
 * @Author mileS.
 * @Date 2018/12/25.
 * @Description: gIo 小程序埋点.
 */
const gio = require("../utils/gio-minp").default;
// 操作系統
const os = {
    os : localStorageSyncServer.get("os")==1?"安卓":"ios"
};
const API = require("../config/config");
/**
 * @Description: 页面级变量名称.
 * 埋点项目：报告名称
 * 埋点类型：页面级变量（setPageVariable)
 * 标识符：reportName  关系匹配
 * value:  具体报告名（如：“个人深度解析报告”、“财运指南：赚钱禁忌”、“密码解读”、“关系匹配”）
 */

// 大报告
const deepReportList = [
    {id: "10", reportName: "个人深度解析报告"},
    {id: "11", reportName: "2019个人流年运势"},
    {id: "12", reportName: "2019个人财运解析"},
    {id: "13", reportName: "2019个人创业运势"},
    {id: "14", reportName: "2019个人工作运势"},
    {id: "rml001", reportName: "恋人相处指南"},
    {id: "rms001", reportName: "夫妻关系读心报告"}
];

// 小报告
var fortuneReportList =  localStorageSyncServer.get(VALUES.FORTUNE_REPORT_LIST_SAVE_KEY) || [];
//     [
//     {id: "20", reportName: "赚钱禁忌"},
//     {id: "21", reportName: "家庭旺财"},
//     {id: "22", reportName: "偏财运"},
//     {id: "23", reportName: "因何加薪"},
//     {id: "24", reportName: "跳槽风险"},
//     {id: "25", reportName: "提升财运"},
//     {id: "26", reportName: "赚钱窍门"},
//     {id: "27", reportName: "工作避坑"}
// ]

// 首页元素
const homeElements = [
    {id: "1",name :"密码解读报告" },
    {id: "2",name :"个人中心" },
    {id: "3",name :"密码解读" },
    {id: "4",name :"关系匹配" },
    {id: "5",name :"身份卡" },
    {id: "6",name :"已匹配好友" }
];

//进入小程序渠道
const channel = [
  {id:'1-1',name:'问问小程序'},
];

// 页面名称
const gioValues = {
    identityCard    : "身份卡",
    codeReading     : "密码解读",
    matchingReport  : "关系匹配",
    fortune         : "财运指南：",
    invitation      : "邀请好友"
};

// 分享触发类型
const shareTrigger = [
    {"from": "menu", "name": "右上角转发"},
    {"from": "button", "name": "分享链接"},
    {"from": "picture", "name": "分享图片"}
];

// 大小报告列表
class Constant{
    constructor() {
        this.deepReportList = deepReportList;
        this.fortuneReportList = fortuneReportList;
        this.list  =  [ this.deepReportList , this.fortuneReportList,gioValues.codeReading,gioValues.matchingReport ];
    }

    get(code,id){
        if(code == 0) {
            if(id){
                return this.deepReportList.filter(v=>v.id==id)[0].reportName;
            }
        }else if(code == 1){
            if(empty(this.fortuneReportList)){
                this.fortuneReportList = localStorageSyncServer.get(VALUES.FORTUNE_REPORT_LIST_SAVE_KEY) || [];
            }
            if(id && !empty(this.fortuneReportList)){
                return gioValues.fortune+this.fortuneReportList.filter(v=>v.id==id)[0].reportName;
            }
        }else{
            return this.list[code]
        }
    }
}
const constant = new Constant();

/**
 * @Description: gio初始化.
 * forceLogin   true | false	你的小程序是否强制要求用户登陆微信获取 openid，默认 false
 * debug	    true | false	是否开启调试模式，可以看到采集的数据，默认 false
 * version	   string	        你的小程序的版本号
 * followShare	true | false	详细跟踪分享数据，开启后可使用分享分析功能。默认 false
 * usePlugin	true | false	你的小程序中是否使用了第三方插件。默认 false
 */
function gioInit(){
    if(API.root.match(/com/)){
        gio('init',VALUES.GIO_ID, VALUES.APP_ID, {
            version: VALUES.VERSION,
            followShare: true,
            debug: false,
            getLocation : false,
            // forceLogin : true
        });
    }
}

/**
 * @Description: 设置用户身份.
 * @para: openId.
 * @para: unionId.
 */
function setIdentify(openId,unionId){
    gio('identify', openId, unionId);
}

/**
 * @Description: 设置用户唯一标识.
 * @para: userId. 用戶Id
 */
function setUserId(userId){
    gio('setUserId',userId);
}

/**
 * @Description: 收集访问者信息.
 * @para: info. 访问者信息
 */
function setVisitor(info){
    gio('setVisitor', info);
}

/**
 * @Description: 首页各元素点击事件.
 * @para: code.类型
 * @para: id. 小报告索引
 */
function homeElementClick(code){
    gio('track', 'homeElementClick',Object.assign({
        'homeElement' : homeElements.filter(v=>v.id==code)[0].name
    },os));
}

/**
 * @Description: 报告列表点击事件.
 * @para: code.类型
 * @para: id. 小报告索引
 */
function reportClick(code,id){
    gio('track', 'reportClick',Object.assign({
        'reportName' : constant.get(code,id),
    },os));
}

/**
 * @Description: 报告购买成功.
 * @para: code.类型
 * @para: id. 小报告索引
 * @para: reportPrice 报告价格.
 */
function reportBuySuccess(code,id,reportPrice){
    gio('track', 'reportBuySuccess',Object.assign({
        'reportName' : constant.get(code,id),
        'reportPrice' : reportPrice.toString()
    },os));
}

/**
 * @Description: 优惠券购买小报告成功.
 * @para: code.类型
 * @para: id. 小报告索引
 * @para: reportPrice 报告价格.
 */
function reportBuyByTicketSuccess(code,id,reportPrice){
    gio('track', 'reportBuyByTicketSuccess',Object.assign({
        'reportName' : constant.get(code,id),
        'reportPrice' : reportPrice.toString()
    },os));
}

/**
 * @Description: 报告的切换他人点击事件.
 * @para: code.类型
 * @para: id. 小报告索引
 */
function reportChangeOtherClick(code,id){
    gio('track', 'reportChangeOtherClick',Object.assign({
        'reportName' : constant.get(code,id)
    },os));
}

/**
 * @Description: 采集报告底部banner轮播点击事件.
 * @para: code.类型
 * @para: id. 小报告索引
 */
function reportBannerClick(code,id){
    gio('track', 'reportBannerClick',Object.assign({
        'reportName' : constant.get(code,id)
    },os));
}

/**
 * @Description: 完善信息成功事件.
 */
function registerSuccess(){
    gio('track', 'registerSuccess',os);
}

/**
 * @Description: 分享事件.
 * @para: title. 页面标题
 * @para: from. 触发类型（button link picture）
 */
function onShareAppClick(title,from){
    if(!title){
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 1];
        let url = prevPage.route;
        if(url == "pages/fortune_report/fortune_report"){
            let reportId = prevPage.data.reportId;
            if(empty(constant.fortuneReportList)){
                return ;
            }
            title = gioValues.fortune + constant.fortuneReportList.filter(v=>v.id==reportId)[0].reportName;
        }else if(url == "pages/identity_card/identity_card"){
            title = gioValues.identityCard;
        }else if(url == "pages/matching_report/matching_report"){
            title = gioValues.matchingReport;
        }else if(url == "pages/code_reading/code_reading"){
            title = gioValues.codeReading;
        }
    }
    gio('track', 'onShareAppClick',Object.assign({
        'sharePageTitle': title,
        'shareTarget'   : shareTrigger.filter(v=>v.from==from)[0].name
    },os))
}

/**
 * @Description: 进入密码派小程序的渠道.
 * @para: code 渠道
 */
function formChannel(code){
  gio('track', 'formChannel', Object.assign({
    'channel': channel.filter(v => v.id == code)[0].name
  }, os));
}

export {
    gioInit , setIdentify ,setUserId ,setVisitor,
    homeElementClick , reportClick , reportBuyByTicketSuccess ,reportBuySuccess ,
    reportChangeOtherClick , registerSuccess,reportBannerClick ,
    onShareAppClick, gioValues, formChannel
}
