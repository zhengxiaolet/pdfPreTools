// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vodal from 'vodal'
import store from './store'
import 'mint-ui/lib/style.css'
import {Loadmore } from 'mint-ui';
require ('./js/resize.js');	//移动端页面适配
require ('./js/resetAlert.js');	//测试弹框去除域名
require ('./js/showError.js');	//错误机制

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.component(Loadmore.name, Loadmore);
Vue.config.productionTip = false
Vue.component(Vodal.name, Vodal);
Vue.use(preview)
/* eslint-disable no-new */
new Vue({
    el: '#app',
	router,
  store,
    template: '<App/>',
    components: {App}
})
