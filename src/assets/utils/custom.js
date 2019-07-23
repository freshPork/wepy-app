import Toast from "../js/Toast";

/**
 * @Author mileS.
 * @Date 2018/11/26.
 * @Description: 简化微信内置方法.
 */

wx.showCustomToast = Toast.toast;

wx.customNavigateTo = url=>{
    url && wx.navigateTo({
        url:url
    })
};

wx.customRedirectTo = url=>{
    url && wx.redirectTo({
        url: url
    })
};

wx.customReLaunch = url=>{
    url && wx.reLaunch({
        url: url
    })
};

wx.customNavigateBack = history =>{
    wx.navigateBack({
        delta:history||1
    })
};

wx.showCustomLoading = title=>{
    wx.showLoading({
        title: title || ''
    })
};

wx.customSetNavigationBarTitle = title=>{
    wx.setNavigationBarTitle({
        title: title
    })
};

wx.imgResource = "https://img.xuanyiai.com";

