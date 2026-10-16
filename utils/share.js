// 设置分享内容
module.exports = {
	// 某些业务页或微信运行状态会隐藏右上角分享入口，进入页面时统一恢复。
	onShow() {
		// #ifdef MP-WEIXIN
		if (typeof wx !== 'undefined' && wx.showShareMenu) {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		}
		// #endif
	},
	// 分享到好友
	onShareAppMessage(el) {
		let userinfo = uni.getStorageSync('user')
		const common = uni.getStorageSync('common') || {}
		let share_path;
		if (userinfo && userinfo.id) {
			share_path = '/pages/home/home?pid=' + userinfo.id
		} else {
			share_path = '/pages/home/home'
		}
		const shareImg = /cfe5aab4a3a8ca8b3686203bc2eaa076\.png/i.test(common.share_img || '') ? '' : (common.share_img || '')
		return {
			title: common.share_title || '驰友家',
			imageUrl: shareImg,
			path: share_path

		}
	},
	// 分享到朋友圈
	onShareTimeline() {
		let userinfo = uni.getStorageSync('user')
		const common = uni.getStorageSync('common') || {}
		let share_path;
		if (userinfo && userinfo.id) {
			share_path = 'pid=' + userinfo.id
		} else {
			share_path = ''
		}
		const shareImg = /cfe5aab4a3a8ca8b3686203bc2eaa076\.png/i.test(common.share_img || '') ? '' : (common.share_img || '')
		return {
			title: common.share_title || '驰友家',
			imageUrl: shareImg,
			query: share_path
		}
	}
}
// 2.在main.js中引入
// 全局分享
// const $x = {};
// Vue.prototype.$x = $x;
// let share = require('common/share.js');
// Vue.mixin(share);
