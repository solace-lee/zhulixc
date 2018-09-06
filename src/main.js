import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from "axios"
import router from './router'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import store from '@/vuex/store.js'   //vuex
import api from '@/http/api.js'       //http请求
import less from 'less'
import Mint from 'mint-ui'    //移动端UI
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
  ;
import jquery from 'jquery';
Vue.use(jquery)
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
//引入vant
//------------------------------------------------------
import { Picker } from 'vant';
Vue.use(Picker);

import { Switch } from 'vant';
Vue.use(Switch);
import { SubmitBar } from "vant";
Vue.use(SubmitBar);

//require('./assets/js/webim.config.js')
//let WebIM = require('easemob-websdk')
//Vue.prototype.$webim = WebIM
//
//const conn = new WebIM.connection({
//isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
//https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
//url: WebIM.config.xmppURL,
//heartBeatWait: WebIM.config.heartBeatWait,
//autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
//autoReconnectInterval: WebIM.config.autoReconnectInterval,
//apiUrl: WebIM.config.apiURL,
//isAutoLogin: true
//})
//
//const options = {
//apiUrl: WebIM.config.apiURL,
//user: '1',
//pwd: 'xiuxiutrip123456',
//appKey: WebIM.config.appkey,
//success: function (re) {
//  console.log('链接服务器正常')
//},
//error: function (err) {
//  alert(err)
//}
//}
//Vue.prototype.$imconn = conn
//Vue.prototype.$imoption = options
//
import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);
import { AddressList } from 'vant';
Vue.use(AddressList);
import { Icon } from 'vant';
Vue.use(Icon);
import { Uploader } from 'vant';
Vue.use(Uploader);
import { Area } from 'vant';
Vue.use(Area);
import { Collapse, CollapseItem } from 'vant';
Vue.use(Collapse).use(CollapseItem);
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//
import { Stepper } from 'vant';
Vue.use(Stepper);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import { Field } from 'vant';
Vue.use(Field);
//
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
import { Step, Steps } from 'vant';
Vue.use(Step).use(Steps);
import { Swipe, SwipeItem } from 'vant';
import { Sku } from 'vant';
Vue.use(Sku);
import { Popup } from 'vant';
Vue.use(Popup);
import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);
//
import { Rate } from 'vant';
Vue.use(Rate);
import { Badge, BadgeGroup } from 'vant';
Vue.use(Badge);
Vue.use(BadgeGroup);

import { List } from 'vant';
Vue.use(List);
import { Dialog } from 'vant';

import { PullRefresh } from 'vant';
Vue.use(PullRefresh);
//--------------------------------------------------------
import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
// import data from '../mock/sku';
// import { LIMIT_TYPE } from '../../../packages/sku/constants';

Vue.use(Swipe).use(SwipeItem);
// Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(Mint);

import { Search } from 'vant';
Vue.use(Search);

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

import 'vant/lib/vant-css/icon-local.css';
Vue.prototype.$http = axios
Vue.prototype.$axios = axios
import qs from 'qs';
Vue.prototype.$qs = qs;
//axios.defaults.baseURL = "http://api.zhulixc.com"
//axios.defaults.withCredentials=true; //跨域请求设置这个
Vue.prototype.HOME='https://api.zhulixc.com'
//Vue.prototype.HOME='http://frp.zhulixc.com'
Vue.config.productionTip=false
// if(!localStorage.getItem("Token")){
//       window.location.href = "http://localhost:8080/#/?token=bd2aa5f8-40d5-49a0-b37e-43589e549b2f"
// }else{

// }

// axios.defaults.timeout = 6000; //6000的超时验证
// // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// //创建一个axios实例
// const instance = axios.create();
// // instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.interceptors.request.use = instance.interceptors.request.use;
// //request拦截器
// instance.interceptors.request.use(
//   config => {
//     //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
//     // if(store.state.token){
//     //   config.headers.Authorization = `token ${store.state.token}`;
//     // }
//     if(localStorage.getItem("Token")){

//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
// //respone拦截器
// instance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => { //默认除了2XX之外的都是错误的，就会走这里
//     if(error.response){
//       switch(error.response.status){
//         case 401:
//           store.dispatch('UserLogout'); //可能是token过期，清除它
//           router.replace({ //跳转到登录页面
//             path: 'login',
//             query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           });
//       }
//     }
//     return Promise.reject(error.response);
//   }
// );
// export default instance;

// 跨域post实例，用到了qs组件来避开ajax信使请求，并兼容Android。
// import axios from 'axios';
// import qs from 'qs';
// axios.post('http://www.xyz.com/request', qs.stringify(params))
// .then(response => {
//   console.log(response);
// })
// .catch(err => {
//   console.log(err);
// });

Vue.config.productionTip = false
Vue.prototype.$api = api;

import MyFilter from './filter'
Vue.use(MyFilter);

import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'deff2dcf2e3baae4659fa43854600c62',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder']

});

 Vue.use(VueRouter);
 Vue.use(VueResource);
// 用钩子函数beforeEach()对路由进行判断

// 不用检测登陆权限的页面路径
 let noLoginCheckPage = [
   'index',
 ];

// //路由守卫
// router.beforeEach((to, from, next) => {

//   if(!to.path != '/author'){
//     // 第一次进入项目

//     document.cookie='beforeLoginUrl;'+ to.fullPath // 保存用户进入的url

//     if(!holdno.cookie.get('user')){
//       let ua = window.navigator.userAgent.toLowerCase()
//       if(ua.match(/MicroMessenger/i) == 'micromessenger'){
//         // 跳转到微信授权页面
//         console.log(123123123131231231231231231231);
//         window.location.href = 'http://dayue.mrants.net/DaYueCity/login/userLogin'
//       }
//     }else{
//       // 如果有token 但是vuex中没有用户登录信息则做登录操作
//       this.login()
//     }
//     return false
//   }
//   next()
// })
//router.beforeEach((to, from, next) => {
// var toPageName = to.name;
// 请求接口判断用户有没有登陆
//   if(noLoginCheckPage.some(v => v == toPageName)) {
//     return next();
// }
// 请求接口判断用户有没有登陆
//请求接口
//    let isLogin = 'http://dayue.mrants.net/DaYueCity/login/userLogin';
//   axios.get(isLogin).then(res => {
//     let isLogin = false;
//     if(res.data != null) {
//         isLogin = true;
//     }
//     // 用户访问登陆页面, 如果已登陆, 那么自动转到首页
//     if(toPageName == 'login' && isLogin) {
//         next('/');
//     }
//     // 用户访问会员页面, 但是他没有登陆, 那么自动转到登陆页
//     else if(toPageName != 'login' && !isLogin){
//         // 跳转到登陆时, 把当前页面通过url参数记录下来
//         next({ name: '登录页', query: { nextPage: to.fullPath } });
//     }
//     else {
//         next();
//     }
// });
//
//});


//     if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
//       if (store.state.login.token) {  // 通过vuex state获取当前的token是否存在
//         next();
//       }
//       else {    //如果没有权限,重定向到登录页,进行登录
//         next({
//           path: '/login',
//            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//       }
//     }
//     else { //不需要权限 直接跳转
//       next();
//     }



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
