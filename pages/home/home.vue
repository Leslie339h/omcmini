<template>
	<view class="page">
		<view class="header">
			<view class="header-row">
				<view class="header-text">
					<view class="header-title">欢迎您加入<text class="highlight">驰友家</text></view>
					<view class="header-sub">专注轮胎保障 分享创造价值</view>
				</view>
				<view class="scan-entry" @click="goScanBead">
					<!-- <image class="scan-entry-icon" src="/static/sssscan.png" mode="aspectFit" /> -->
				</view>
			</view>
		</view>

		<view class="swiper-wrap" v-if="bannerList.length">
			<u-swiper
				:list="bannerList"
				keyName="image"
				height="320rpx"
				circular
				indicator
				indicatorMode="dot"
				indicatorActiveColor="#00b38a"
				indicatorInactiveColor="#dddddd"
				radius="20"
				imgMode="aspectFill"
				@click="onBannerTap"
			/>
		</view>
		<view class="swiper-placeholder" v-else-if="bannerLoaded"></view>

		<view class="quick-grid">
			<view class="q-item" @click="go('/pagesB/warrantyRegister/warrantyRegister')">
				<image class="q-icon-img" :src="previewUrl(homeIcons[0])" mode="aspectFit" />
				<text class="q-t">驰安心注册</text>
				<text class="q-sub">扫码登记质保</text>
			</view>
			<view class="q-item" @click="go('/pagesB/warrantyMyList/warrantyMyList')">
				<image class="q-icon-img" :src="previewUrl(homeIcons[1])" mode="aspectFit" />
				<text class="q-t">我的驰安心</text>
				<text class="q-sub">查看已注册质保</text>
			</view>
			<view class="q-item" @click="go('/pagesB/claimRegister/claimRegister')">
				<image class="q-icon-img" :src="previewUrl(homeIcons[2])" mode="aspectFit" />
				<text class="q-t">质保申请</text>
				<text class="q-sub">申请质量售后</text>
			</view>
		</view>

		<view class="quick-row">
			<view class="q-half" @click="goOrder">
				<view class="q-half-inner">
					<text class="q-half-title">驰友家商城订单</text>
					<text class="q-half-sub">查看物流与进度</text>
				</view>
				<image class="q-half-img" :src="previewUrl(homeIcons[3])" mode="aspectFit" />
			</view>
			<view class="q-divider"></view>
			<view class="q-half" @click="go('/pagesA/referral/index')">
				<view class="q-half-inner">
					<text class="q-half-title">我的驰友订单</text>
					<text class="q-half-sub">分销与推广中心</text>
				</view>
				<image class="q-half-img" :src="previewUrl(homeIcons[4])" mode="aspectFit" />
			</view>
		</view>

		<view
			class="rec-section"
			v-for="sec in recommendSections"
			:key="sec.type"
		>
			<image
				class="rec-banner"
				:src="previewUrl(sec.banner)"
				mode="widthFix"
			/>
			<view class="rec-goods-grid" v-if="sec.list.length">
				<view
					class="rec-goods-item"
					v-for="item in sec.list"
					:key="item.id"
					@click="openGoods(item.id)"
				>
					<image class="rec-goods-img" :src="item.image" mode="aspectFill" />
				</view>
			</view>
			<view class="rec-empty" v-else-if="recommendLoaded">暂无商品</view>
		</view>
		<view class="load-tip" v-if="recommendLoading">加载中...</view>
		<view class="safe-bot" />
	</view>
</template>

<script>
	import config from '@/config.js'

	export default {
		data() {
			return {
				homeIcons: [
					'/uploads/20260527/08e31dcd92a80977f9f68bc37e4ffe0f.png',
					'/uploads/20260527/87c574a8b03ded5e064fb66f13b55f21.png',
					'/uploads/20260527/98e61ae72b1bc6a55811cbd80833e820.png',
					'/uploads/20260527/1d1bac28baa04f86e25fdd48d613149c.png',
					'/uploads/20260527/1ed07964a6548ea36cfd08d95a6e253c.png'
				],
				bannerList: [],
				bannerLoaded: false,
				recommendSections: [
					{
						type: 1,
						banner: '/uploads/20260531/427a7341e0714ce116c89859c64c88fd.png',
						list: []
					},
					{
						type: 2,
						banner: '/uploads/20260531/ff4f7c54d30df6433e196b9710c03633.png',
						list: []
					},
					{
						type: 3,
						banner: '/uploads/20260531/404c8fe90b7a0dfd187b914d383f104c.png',
						list: []
					}
				],
				recommendLoading: false,
				recommendLoaded: false,
				recommendLimit: 6
			};
		},
		computed: {
			greetText() {
				return '您好尊敬的欧迈驰用户';
			}
		},
		onShareAppMessage() {
			let userinfo = uni.getStorageSync('user');
			let path = '/pages/home/home';
			if (userinfo && userinfo.id) {
				path += '?pid=' + userinfo.id;
			}
			const com = uni.getStorageSync('common') || {};
			const configuredImg = /cfe5aab4a3a8ca8b3686203bc2eaa076\.png/i.test(com.share_img || '') ? '' : (com.share_img || '');
			return {
				title: (com.share_title || '') + '',
				imageUrl: (this.bannerList[0] && this.bannerList[0].image) || configuredImg,
				path
			};
		},
		onShareTimeline() {
			let userinfo = uni.getStorageSync('user');
			let q = '';
			if (userinfo && userinfo.id) {
				q = 'pid=' + userinfo.id;
			}
			const com = uni.getStorageSync('common') || {};
			const configuredImg = /cfe5aab4a3a8ca8b3686203bc2eaa076\.png/i.test(com.share_img || '') ? '' : (com.share_img || '');
			return {
				title: com.share_title || '',
				imageUrl: (this.bannerList[0] && this.bannerList[0].image) || configuredImg,
				query: q
			};
		},
		onLoad(e) {
			if (e && e.pid) {
				uni.setStorageSync('pid', e.pid);
			}
			if (e && e.scene) {
				uni.setStorageSync('pid', e.scene);
			}
			this.loadBanner();
			this.loadRecommendSections();
		},
		onShow() {
			// #ifdef MP-WEIXIN
			if (typeof wx !== 'undefined' && wx.showShareMenu) {
				wx.showShareMenu({
					withShareTicket: true,
					menus: ['shareAppMessage', 'shareTimeline']
				});
			}
			// #endif
		},
		methods: {
			previewUrl(path) {
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				const base = config.serverIp.replace(/\/?$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return base + p
			},
			onBannerTap(index) {
				const item = this.bannerList[Number(index)] || {}
				let url = String(item.url || '').trim()
				if (!url) return
				url = url.replace(/^#/, '')
				if (url.charAt(0) !== '/') url = '/' + url
				if (!/^\/(pages|pagesA|pagesB|pagesC)\//.test(url)) {
					uni.showToast({ title: '跳转地址格式不正确', icon: 'none' })
					return
				}
				const route = url.split('?')[0]
				const tabPages = ['/pages/home/home', '/pages/shop/shop', '/pages/order/order', '/pages/my/my']
				if (tabPages.indexOf(route) !== -1) {
					uni.switchTab({ url: route })
				} else {
					uni.navigateTo({ url })
				}
			},
			openGoods(id) {
				uni.navigateTo({ url: '/pagesA/shopDetail/shopDetail?id=' + id });
			},
			go(url) {
				uni.navigateTo({ url });
			},
			goScanBead() {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['barCode', 'qrCode'],
					success: (res) => {
						const code = String(res.result || '').trim();
						if (!code) {
							uni.showToast({ title: '未识别到编码', icon: 'none' });
							return;
						}
						uni.navigateTo({
							url: '/pagesB/tireBead/result?code=' + encodeURIComponent(code)
						});
					},
					fail: (err) => {
						const msg = (err && (err.errMsg || err.message)) || '';
						// 用户主动关闭扫码界面，不提示
						if (/cancel/i.test(msg)) {
							return;
						}
						uni.showToast({
							title: msg ? ('扫码失败：' + msg) : '扫码失败，请用真机重试',
							icon: 'none',
							duration: 2500
						});
					}
				});
			},
			goOrder() {
				uni.switchTab({ url: '/pages/order/order' });
			},
			async loadBanner() {
				try {
					const res = await this.indexbanner({
						count: 10
					});
					if (res.code === 1 && res.data && res.data.length) {
						const arr = [];
						res.data.forEach(function (row) {
							const img = row.image || '';
							if (img) {
								arr.push({ image: img, url: row.url || '' });
							}
						});
						this.bannerList = arr;
					}
				} finally {
					this.bannerLoaded = true;
				}
			},
			async loadRecommendSections() {
				if (this.recommendLoading) {
					return;
				}
				this.recommendLoading = true;
				try {
					const configRes = await this.parameter();
					if (configRes.code === 1 && configRes.data) {
						this.recommendSections = this.recommendSections.map((sec, index) => ({
							...sec,
							banner: configRes.data['home_recommend_image_' + (index + 1)] || sec.banner
						}));
					}
					const tasks = this.recommendSections.map(async (sec) => {
						const res = await this.storeGoodsPage({
							type_id: 0,
							is_recommended: 1,
							recommend_type: sec.type,
							page: 1,
							limit: this.recommendLimit
						});
						if (res.code === 1 && res.data) {
							return (res.data.list || []).slice();
						}
						return [];
					});
					const lists = await Promise.all(tasks);
					this.recommendSections = this.recommendSections.map((sec, index) => ({
						...sec,
						list: lists[index] || []
					}));
				} finally {
					this.recommendLoading = false;
					this.recommendLoaded = true;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #ffffff;
	}

	.page {
		min-height: 100vh;
		padding: 16rpx 28rpx 24rpx;
		box-sizing: border-box;
	}

	.header {
		margin-bottom: 28rpx;
		padding: 8rpx 0 0;
	}

	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-text {
		flex: 1;
		min-width: 0;
	}

	.scan-entry {
		flex-shrink: 0;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.scan-entry-icon {
		width: 72rpx;
		height: 72rpx;
		display: block;
	}

	.header-title {
		font-size: 48rpx;
		font-weight: 800;
		color: #222;
		line-height: 1.35;
		margin-bottom: 10rpx;
	}

	.highlight {
		color: #00b38a;
		font-style: italic;
		font-weight: 800;
	}

	.header-sub {
		font-size: 26rpx;
		color: #999;
		font-weight: 400;
	}

	.swiper-wrap {
		margin-bottom: 28rpx;
		overflow: hidden;
		border-radius: 20rpx;
		box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.06);
	}

	.swiper-placeholder {
		height: 320rpx;
		background: #f0f2f1;
		border-radius: 20rpx;
		margin-bottom: 28rpx;
	}

	.quick-grid {
		display: flex;
		justify-content: space-between;
		gap: 14rpx;
		margin-bottom: 24rpx;
	}

	.q-item {
		flex: 1;
		background: #fff;
		border-radius: 20rpx;
		padding: 28rpx 10rpx 24rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.q-icon-img {
		width: 96rpx;
		height: 96rpx;
		margin-bottom: 14rpx;
	}

	.q-t {
		font-size: 26rpx;
		color: #222;
		font-weight: 700;
		margin-bottom: 4rpx;
		text-align: center;
		line-height: 1.3;
	}

	.q-sub {
		font-size: 20rpx;
		color: #999;
		text-align: center;
		line-height: 1.3;
	}

	.quick-row {
		display: flex;
		align-items: stretch;
		margin-bottom: 32rpx;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.q-half {
		flex: 1;
		padding: 32rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 0;
	}

	.q-divider {
		width: 1rpx;
		align-self: center;
		height: 72rpx;
		background: #eeeeee;
		flex-shrink: 0;
	}

	.q-half-inner {
		flex: 1;
		min-width: 0;
	}

	.q-half-title {
		display: block;
		font-size: 26rpx;
		font-weight: 700;
		color: #222;
		line-height: 1.3;
	}

	.q-half-sub {
		display: block;
		font-size: 20rpx;
		color: #999;
		margin-top: 6rpx;
		line-height: 1.3;
	}

	.q-half-img {
		width: 72rpx;
		height: 72rpx;
		flex-shrink: 0;
		margin-left: 10rpx;
	}

	.rec-section {
		margin-bottom: 32rpx;
	}

	.rec-banner {
		width: 100%;
		display: block;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.rec-goods-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.rec-goods-item {
		width: 336rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
	}

	.rec-goods-img {
		width: 100%;
		height: 280rpx;
		background: #f5f5f5;
		display: block;
	}

	.rec-empty {
		text-align: center;
		padding: 16rpx 0 8rpx;
		font-size: 24rpx;
		color: #bbb;
	}

	.load-tip {
		text-align: center;
		padding: 20rpx 0 48rpx;
		font-size: 24rpx;
		color: #999;
	}

	.safe-bot {
		height: 24rpx;
	}
</style>
