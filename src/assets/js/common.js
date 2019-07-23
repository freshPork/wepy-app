/* ==========================    函数抽取 ================================*/

/**
 * @Describe: 验证手机号
 */
var  checkPhoneNumber= function(num) {
    var mobile = num;
    var result = false ;
    var msg = "" ;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (mobile == '') {
        msg = "手机号不能为空!" ;
        wx.showToast({
            title: '手机号不能为空!',
            icon: "none"
        })
    } else if (mobile.length != 11) {
        msg = "手机号长度有误！";
        wx.showToast({
            title: '手机号长度有误！',
            icon: 'none',
        })
    } else if (!phonetel.test(mobile)) {
        msg = "手机号有误！";
        wx.showToast({
            title: '手机号有误！',
            icon: 'none',
        })
    }else{
        result = true ;
    }
    if(!result){
        wx.showToast({
            title: msg,
            icon: "none"
        })
    }
    return result ;
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
    remove : function(key){
        wx.removeStorageSync(key)
    },
    clear : function(){
        wx.clearStorageSync()
    }
}

/**
 * @Describe: 秒 转化为时间
 */
function secondTransferTime(time) {
    if (time > 3600) {
        return [
            parseInt(time / 60 / 60),
            parseInt(time / 60 % 60),
            parseInt(time % 60)
        ]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
    } else {
        return [
            parseInt(time / 60 % 60),
            parseInt(time % 60)
        ]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
    }
}

/**
 * @Author : 孟飞
 * @Create : 2018/3/19
 * @Describe : 去除对象属性
 * @param   {Object,Array} material
 * @param   {Array,String} option
 * 增加递归属性recursion
 * */
function removeProperties(material,option){
    this.run = function (aim) {
        if(option.constructor == Array){
            for(var i = 0 ; i < option.length ; i++ ){
                var aimParam = option[i];
                if(aim.aimParam){
                    delete aim.aimParam
                }
            }
        }else if(option.constructor == String){
            if(aim[option]){
                delete aim[option]
            }
        }
    };
    // 判断是否为material类型
    if(material.constructor != Object && material.constructor != Array){
        return ;
    }
    if(material.constructor==Array){
        for(var j = 0 ; j < material.length; j++ ){
            this.run(material[j])
        }
    }else{
        this.run(material)
    }
}

/**
 * @Author : mileS
 * @Create : 2018/11/13
 * @Describe : 对象冻结
 * @param   {Object} material
 * */
function freezeConstant(obj){
    if(typeof obj !== 'object' ){return obj}
    Object.freeze(obj);
    Object.keys(obj).forEach( key => {
        if ( typeof obj[key] === 'object' ) {
            freezeConstant(obj[key])
        }
    });
    return obj;
}

/**
 * @Author : mileS
 * @Create : 2018/11/13
 * @Describe : 随机数
 * @param n
 * @param type  0 混合  1 数字 2 字母
 * */
function randomGenerator(n,type=0){
    var char1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var char2 =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    var result = "",chars = char1.concat(char2);
    var range = 35;
    if(type==1){
        range = 9;chars = char1
    }else if(type==2){
        range = 25;chars = char2
    }
    for(var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * range);
        result += chars[id];
    }
    return result;
}

/**
 * @Author : mileS
 * @Create : 2018/11/14
 * @Describe : 驼峰格式转换
 * @param parameter ， separator 分隔符
 * */
function camelCase( parameter, separator="_"){
    if(typeof parameter === "object"){
        Object.keys(parameter).forEach( key => {
            let value = parameter[key];
            delete parameter[key];
            let convertKey = convert(key);
            parameter[convertKey] = value;
            if(typeof value === "object"){
                parameter[convertKey] = camelCase(value);
            }
        });
    }else if(typeof parameter === "string"){
        parameter = convert(parameter)
    }
    function convert(str){
        let  reg =new RegExp(separator+"([a-z0-9])","gim");
        return str.replace(reg, function( all, letter ) {
            return letter.toUpperCase();
        });
    }
    return parameter
}

/**
 * @Author : mileS
 * @Create : 2018/11/26
 * @Describe : 查看字符串字符长度
 * @param str
 * */
function bytesNumber(str){
   if(typeof str === "string"){
       return str.replace(/[^\x00-\xff]/g,"zf").length
   }else{
       return str
   }
}

/**
 * @Author : mileS
 * @Create : 2018/12/17
 * @Describe : 截取字符串
 * @param str 原字符串
 * @param max  最大字符限制
 * @param type  分割字符串 1 字节  2 长度
 * @return  分割后的字符串
 * */
function cutStringByBytes(str,max,type=1){
    let sep = type==1?bytesNumber:str=>str.length;
    for (let i = 1; i < str.length+1; i++) {
        if (sep(str.substring(0, i)) > max) {
            str = str.substring(0, i - 1)
        }
    }
    return str;
}

/**
 * @Author : mileS
 * @Create : 2018/12/10
 * @Describe : 小程序版本更新
 * */
function updateMiniProgram(force=false){
    if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {// 请求完新版本信息的回调
                updateManager.onUpdateReady(function () {
                    if(force){
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，点击确定重启应用？',
                            showCancel : false,
                            success: function (res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    }else{
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    }
                });
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    wx.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                    })
                })
            }
        })
    } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
    }
}

/**
 * @Author : mileS
 * @Create : 2018/12/19
 * @Describe : 掉字符串前后空格
 * */
function trim(val){
    return typeof val === "string" ? val.replace(/(^\s*)|(\s*$)/g, "") : val;
}

/**
 * @Author : mileS
 * @Create : 2018/12/19
 * @Describe : 检测为空方法
 * */
function empty(val){
    if ( val == null || trim(val) == "" || val == undefined || val == [] || val == {} ) {
        return true;
    }
    return false;
}



export {
    checkPhoneNumber, localStorageSyncServer,
    secondTransferTime , removeProperties , freezeConstant , randomGenerator,
    camelCase , bytesNumber ,updateMiniProgram ,cutStringByBytes,trim,
    empty
}
