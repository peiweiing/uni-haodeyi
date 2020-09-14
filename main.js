import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/httpRequest'
Vue.config.productionTip = false
// #ifdef H5
window.QQmap = null;
// #endif
// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
	uni.onNetworkStatusChange(function(res) {
		//console.log(res.networkType);
		store.commit("networkChange", {
			isConnected: res.isConnected
		})
	});
}, 100)
// #endif
const setCache = (key, value, seconds) => {
	try {
		if (key && value) {
			console.log(value);
			uni.setStorage(key, value);
		}
		if (seconds) {
			let expire = new Date().getTime() + parseInt(seconds);
			uni.setStorage(key + 'expire', expire);
		}
		console.log('设置缓存成功：'+key);
	} catch (e) {
		console.log('设置缓存失败:' + e.message);
	}
};
const getCache = (key) => {
	try {
		const expireTime = uni.getStorage(key + 'expire');
		const nowTime = new Date().getTime();
		if (expireTime < nowTime) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.log('判断缓存是否过期出错:' + e.message);
	}
};
Vue.prototype.$setStorage = {setCache};
Vue.prototype.$getStorage = {getCache};
Vue.prototype.tui = tui;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
Vue.prototype.$store = store;
App.mpType = 'app'


Vue.prototype.sendRequest= function(param){
    var _self = this, 
        url = param.url,
        data = param.data || {};
        //header = param.header,
        //token = param.token;
        
    //拼接完整请求地址
    var requestUrl = url;
  
    var timestamp = Date.parse(new Date());//时间戳
    data["timestamp"] = timestamp;
     
    //GET或POST
    if(param.method){
        param.method = param.method.toUpperCase();//小写改为大写
    }
    uni.showLoading({
      title: "加载中...",
      mask: true,
      icon: "none"
     });
	
	const token = uni.getStorageSync('token');
	const user = uni.getStorageSync('user');
	
			//网络请求
			uni.request({
			    url: requestUrl,
			    method: param.method || "GET",
			    header:{'Authorization':token},
			    data: data,
			    success: res => {
			        console.log("网络请求success:" , res);
			        if (res.statusCode && res.statusCode != 200) {//api错误
			            uni.showModal({
			                content:"" + res.msg
			            });
			            return;
			        }
					var result = res.data;
					console.log(result,"result");
			        //if (result.status) {//返回结果码code判断:0成功,1错误,-1未登录
			            if (result.status == "401") {
			                uni.showModal({
			                	title: '提示',
			                	content: '登录已过期，请重新登录',
								showCancel:false,
								confirmText: '好的',
			                	success: function (succ) {
									uni.reLaunch({
										url: '../login/login',
									})
			                		console.log('用户点击确定');
			                	}
			                });
			                return;
			            }else if (result.status == "200") {
			               
			            }
						else{
								uni.showModal({
								    showCancel:false,
								    content:"" + result.msg
								});
								return;
						}
			        typeof param.success == "function" && param.success(result);
			    },
			    fail: (e) => {
			        console.log("网络请求fail:" + JSON.stringify(e));
			        uni.showModal({
			            content:"" + e
			        });
			        
			        typeof param.fail == "function" && param.fail(e.data);
			    },
			    complete: (e) => {
			        console.log("网络请求complete");
			        uni.hideLoading();
			        
			        typeof param.complete == "function" && param.complete(e.data);
			        return;
			    }
			});
	  
}

const app = new Vue({
	store,
	...App
})
app.$mount()