import App from './App'
import uView from '@/uni_modules/uview-ui'
import store from '@/store'
Vue.use(uView)
// 如此配置即可

import wxapi from '@/utils/wxApi.js'
console.log('wxapi', wxapi);
Object.keys(wxapi).forEach(key => {
	Vue.prototype[key] = wxapi[key]
})


import fnc from '@/utils/function.js'
Vue.prototype.$way = fnc


import uniapi from '@/api/index.js'
Object.keys(uniapi).forEach(key => {
	Vue.prototype[key] = uniapi[key]
})

console.log('uniapi', uniapi);

import * as filters from '@/utils/filter.js'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// 分享
const $x = {};
Vue.prototype.$x = $x;
let share = require('@/utils/share.js');
Vue.mixin(share);

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'




const app = new Vue({
	store,
	...App
})


app.$mount()
// #endif






// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif