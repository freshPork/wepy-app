/**
 * @Author mileS.
 * @Date 2018/9/4.
 * @Description: http 注入拦截.
 */
import { localStorageSyncServer } from "./common"
import VALUES from "../values/values";

class Interceptor {
    constructor() {

    }
    request(config){
        if(localStorageSyncServer.get("networkStatus")!="none"){
            return config;
        }else{
            wx.showCustomToast(VALUES.OFFLINE_TIP);
        }
    }
    // Token_Error(10001, "登录过期，请您重新登录"),
    response(response) {
        return new Promise((resolve,reject)=>{
            if(response.data.code<1e4){
                if(response.data.code == 200){
                    resolve(response.data,"done")
                }
                if (response.data.code == 500){
                  reject(response.data, "done")
                }
            }else{
                if (response.data.msg){
                    // 登录过期提醒  --- D
                    if (response.data.code != 10001 ){
                      console.log(response.data.msg)
                        wx.showCustomToast(response.data.msg)
                    }
                }
                if (response.data.code == 10001){
                    localStorageSyncServer.remove("Token");
                }
                reject(response.data,"done")
            }
        })
           // 取消请求任务
    }

    responseError(error) {
        if(error.status == 401){
            wx.showCustomToast(error.data.msg)
        }
    }

    complete(result){
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh()       //停止下拉刷新
    }
};
export default new Interceptor();
