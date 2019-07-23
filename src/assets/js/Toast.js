/**
 * @Author mileS.
 * @Date 2018/11/13.
 * @Description: 提示框.
 */
class Toast{
    constructor(){

    }
    toast( msg , icon = false , opts = {}){
        if(!msg){ return ;}
        let option = Object.assign({
            title: msg ,
            icon : icon || "none",
            duration : 2000
        },opts);
        wx.showToast(option)
    }
}
export default new Toast();
