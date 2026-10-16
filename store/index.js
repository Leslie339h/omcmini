import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import uniApi from '@/api/index.js'

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = [
	'vuex_user',
	'vuex_token',
	'vuex_shop_info',
	"common"
];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}

const store = new Vuex.Store({
	// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
	// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
	state: {
		vuex_user: null,
		vuex_token: null,
		vuex_shop_info: null, //默认门店
		address_data: '', //地址id
		vuex_openid: null,
		vuex_common: null,
		cellphone: null //胶囊高度
	},
	actions: {
		async defaultShop(state, value) {
			// 默认门店
			let res = await uniApi.default_store();
			if (res.code == 1) {
				uni.setStorageSync('storeid', res.data.id);
				state.vuex_shop_info = res.data;
				console.log(state.vuex_shop_info, '设置默认门店');
			}
		}
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		},
		// 用户信息
		async userApi(state, payload) {
			let res = await uniApi.userInfo()
			if (res.code == 1) {
				state.vuex_user = res.data;
				uni.setStorageSync('user', res.data)
			}
		},
		// 默认门店
		async defaultApi(state, payload) {
			let res = await uniApi.default_store()
			if (res.code == 1) {
				uni.setStorageSync('storeid', res.data.id);
				state.vuex_shop_info = res.data
			}
		},
		// 清空购物车
		async caremptyApi() {
			let res = await uniApi.carempty()
			uni.hideToast()
		},
		getopenid(state, payload) {
			if (state.vuex_token) {
				console.log('state.vuex_token', state.vuex_token);
				if (state.vuex_user.openid) {
					state.vuex_openid = state.vuex_user.openid
				} else {
					uni.login({
						success: async (res) => {
							uniApi.get_openid({
								code: res.code
							}).then(res1 => {
								state.vuex_openid = res1.data
							})
						}
					})
				}

			}

		},
		// 获取胶囊高度
		cellphone(state) {
			let barHeight = 0
			let StatusBar = 0
			let barHightTop = ''
			let systemInfo = uni.getSystemInfoSync();
			let custom = uni.getMenuButtonBoundingClientRect();
			var statusBarHeight = systemInfo.statusBarHeight
			//手机状态栏的高度statusBarHeight
			let CustomBar = custom.bottom + custom.top - systemInfo.statusBarHeight;
			barHeight = CustomBar || 0
			StatusBar = statusBarHeight || 0
			//StatusBar + 'px' barHeight - StatusBar+ 'px'  barHeight + StatusBar+ 'px'
			barHightTop = StatusBar * 2

			state.cellphone = barHightTop
		}

	}
})



export default store