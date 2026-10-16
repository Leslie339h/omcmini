<script>
	export default {
		onLaunch: function(options) {
			console.log('App Launch')
			// 一级分销扫码：SunCode scene 形如 i推广员UID，需在登录前写入 storage，便于请求头带 pid
			try {
				const q = (options && options.query) ? options.query : {};
				let invitePid = '';
				if (q.scene) {
					const s = decodeURIComponent(String(q.scene));
					const m = s.match(/^i(\d+)$/);
					if (m) {
						invitePid = m[1];
					} else if (/^\d+$/.test(s)) {
						invitePid = s;
					}
				}
				if (q.pid != null && String(q.pid) !== '') invitePid = String(q.pid);
				if (invitePid) uni.setStorageSync('pid', invitePid);
			} catch (e) {
				console.warn('invite scene parse', e);
			}

			let token = uni.getStorageSync('token')
			if (token) {
				this.$u.vuex('vuex_token', token);
				this.$u.vuex('vuex_user', uni.getStorageSync('user'));
			}
			this.parameter().then(res => {
				if (res.code == 1) {
					uni.setStorageSync('common', res.data)
					this.$store.state.vuex_common = res.data
				}
			})
			this.$store.commit('defaultApi')
			this.$store.commit('getopenid')

			// this.getLocation().then(res => {
			// 	console.log('地址res', res);
			// })
			uni.getLocation({
				success(res) {
					uni.setStorageSync('address', res)
				},
				fail(res) {
					console.log('res', res);
				}
			})

			// 从图标等默认入口打开时落在首页 Tab（分享/扫码带 path 时不覆盖）
			if (!options || !options.path) {
				setTimeout(() => {
					uni.switchTab({ url: '/pages/home/home' })
				}, 0)
			}

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/style/index.scss';

	// #ifdef MP-WEIXIN
	page {
		background: #F3F8F6;
	}

	// #endif
	// #ifdef H5
	page {
		background: #F3F8F6;
		max-width: 480px !important;
		margin: 0 auto;
	}

	// #endif
</style>