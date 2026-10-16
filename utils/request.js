import config from '@/config.js'

import {
	get
} from 'lodash'
const request = function(obj) {
	return new Promise(function(resolve, reject) {
		let opt = {
			url: config.serverIp + obj.url + getParams(obj.params),
			method: obj.method,
			timeout: obj.timeout || 10000 * 3,
			header: {
				'Content-type': 'application/json' || 'application/x-www-form-urlencoded',
			},
			data: obj.data,
			success: res => {
				if (res.statusCode === 200) {
					if (res.data.code !== 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					// lodash 截取
					resolve(get(res, 'data', {}))
				} else {
					reject({
						code: -1,
						msg: '接口报错啦' + obj.url
					})
					if (res.data.code == 401) {
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '您还未登录是否去登录？',
							success: function(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/login/login'
									})
								} else if (res.cancel) {

								}
							}
						});
					} else if (res.data.code == 402) {
						uni.showToast({
							title: '网络开小差了，请重新支付！',
							icon: 'none'
						})
					}


				}
			},
			fail: (errMsg) => {
				if (errMsg === 'request:fail timeout') {
					uni.showToast({
						title: '服务忙,稍等会再试吧',
						icon: 'none'
					})
				}
				reject({
					code: -1,
					msg: '接口报错了'
				})
			}
		}

		let address = uni.getStorageSync('address')
		if (address) {
			opt.header.lat = address.latitude
			opt.header.lon = address.longitude
		}
		uni.getStorageSync('pid') ? opt.header.pid = uni.getStorageSync('pid') : ' '
		uni.getStorageSync('token') ? opt.header.token = uni.getStorageSync('token') : ' '
		uni.getStorageSync('storeid') ? opt.header.storeid = uni.getStorageSync('storeid') : ' '
		uni.request(opt)
	})
}
const getParams = obj => {
	let str = '?'
	for (let s in obj) {
		str += `${s}=${obj[s]}&`
	}
	return str.substr(0, str.length - 1)
}

export default request