<template>
	<view class="page">
		<view class="stat-card" :class="{ off: !stats.switch_on }">
			<view class="stat-head">驰友币概览</view>
			<view class="stat-row">
				<view class="stat-item">
					<text class="num">¥{{ stats.coin_available }}</text>
					<text class="lab">驰友币</text>
				</view>
				<view class="divider"></view>
				<view class="stat-item">
					<text class="num highlight">¥{{ stats.commission_pending_estimate }}</text>
					<text class="lab">待结算</text>
				</view>
				<view class="divider"></view>
				<view class="stat-item">
					<text class="num settle">¥{{ stats.commission_settled }}</text>
					<text class="lab">已结算</text>
				</view>
			</view>
			<text class="footnote" v-if="stats.switch_on">驰友币即账户余额（与「我的」页一致）；仅可兑换卡券，不可提现。</text>
			<text class="footnote off-tip" v-else>暂未开放分销功能，请联系管理员。</text>
		</view>

		<view class="leader-entry" @click="go('/pagesA/referral/leaderBenefits')">
			<image class="leader-entry-img" :src="leaderEntryUrl" mode="widthFix" />
		</view>

		<text class="section-title">功能入口</text>
		<view class="menu">
			<view class="menu-item d-flex a-center j-sb" @click="go('/pagesA/coin/exchange')">
				<view class="d-flex a-center">
					<u-icon name="gift-fill" size="22" color="#036045"></u-icon>
					<text class="tit">驰友币兑换</text>
				</view>
				<u-icon name="arrow-right" color="#bdbdbd" size="14"></u-icon>
			</view>
			<view class="menu-item d-flex a-center j-sb" @click="go('/pagesA/referral/team')">
				<view class="d-flex a-center">
					<u-icon name="account-fill" size="22" color="#00baff"></u-icon>
					<text class="tit">我的驰友</text>
				</view>
				<view class="d-flex a-center">
					<text class="badge" v-if="stats.switch_on && stats.subordinate_count > 0">{{ stats.subordinate_count }} 人</text>
					<u-icon name="arrow-right" color="#bdbdbd" size="14"></u-icon>
				</view>
			</view>
			<view class="menu-item d-flex a-center j-sb" @click="go('/pagesA/referral/commission')">
				<view class="d-flex a-center">
					<u-icon name="order" size="22" color="#00baff"></u-icon>
					<text class="tit">驰友币记录</text>
				</view>
				<u-icon name="arrow-right" color="#bdbdbd" size="14"></u-icon>
			</view>
		<!-- 	<view class="menu-item d-flex a-center j-sb" @click="go('/pagesA/referral/qrcode')">
				<view class="d-flex a-center">
					<u-icon name="scan" size="22" color="#00baff"></u-icon>
					<text class="tit">推广海报</text>
				</view>
				<u-icon name="arrow-right" color="#bdbdbd" size="14"></u-icon>
			</view> -->
		</view>
	</view>
</template>

<script>
	import config from '@/config.js'

	export default {
		data() {
			return {
				leaderEntryPath: '/uploads/20260603/a99aabc3a398ddd7842577206de4bda1.png',
				stats: {
					switch_on: false,
					subordinate_count: 0,
					commission_settled: '0.00',
					commission_pending_estimate: '0.00',
					coin_available: '0.00',
				}
			};
		},
		computed: {
			leaderEntryUrl() {
				return this.previewUrl(this.leaderEntryPath)
			}
		},
		onShow() {
			this.loadStats();
		},
		onPullDownRefresh() {
			this.loadStats().finally(() => uni.stopPullDownRefresh());
		},
		methods: {
			async loadStats() {
				const [stRes, coinRes] = await Promise.all([
					this.referralStatus({}),
					this.coinBalance({}).catch(() => ({ code: 0 }))
				]);
				if (stRes.code === 1 && stRes.data) {
					const d = stRes.data;
					this.stats = {
						switch_on: !!d.switch_on,
						subordinate_count: d.subordinate_count || 0,
						commission_settled: d.commission_settled || d.commission_sum || '0.00',
						commission_pending_estimate: d.commission_pending_estimate || '0.00',
						coin_available: '0.00',
					};
				}
				if (coinRes.code === 1 && coinRes.data) {
					this.stats.coin_available = coinRes.data.coin_available || '0.00';
				}
			},
			previewUrl(path) {
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				const base = config.serverIp.replace(/\/?$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return base + p
			},
			go(url) {
				uni.navigateTo({ url });
			}
		}
	};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #f5f6fa;
	padding: 24rpx;
	box-sizing: border-box;
}
.stat-card {
	background: linear-gradient(135deg, #036045 0%, #04825c 100%);
	border-radius: 24rpx;
	padding: 32rpx 28rpx 28rpx;
	color: #fff;
	box-shadow: 0 8rpx 32rpx rgba(3, 96, 69, 0.35);
	margin-bottom: 28rpx;
}
.stat-card.off {
	background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
}
.stat-head {
	font-size: 28rpx;
	opacity: 0.95;
	margin-bottom: 24rpx;
}
.stat-row {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}
.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 8rpx;
}
.stat-item .num {
	font-size: 36rpx;
	font-weight: 700;
	line-height: 1.25;
	word-break: break-all;
	text-align: center;
}
.stat-item .num.highlight {
	font-size: 34rpx;
	color: #fff9c4;
}
.stat-item .num.settle {
	font-size: 34rpx;
	opacity: 0.95;
}
.stat-item .lab {
	font-size: 22rpx;
	opacity: 0.82;
	margin-top: 12rpx;
	text-align: center;
}
.divider {
	width: 2rpx;
	height: 68rpx;
	background: rgba(255, 255, 255, 0.28);
	flex-shrink: 0;
	align-self: center;
}
.footnote {
	display: block;
	font-size: 22rpx;
	opacity: 0.82;
	line-height: 1.55;
	margin-top: 28rpx;
}
.off-tip {
	opacity: 0.92;
	margin-top: 20rpx;
}
.leader-entry {
	margin-bottom: 24rpx;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}
.leader-entry-img {
	display: block;
	width: 100%;
}
.section-title {
	font-size: 28rpx;
	color: #64748b;
	margin: 16rpx 8rpx 18rpx;
	font-weight: 600;
}
.menu {
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
}
.menu-item {
	padding: 32rpx 28rpx;
	border-bottom: 1rpx solid #f0f0f0;
	font-size: 30rpx;
	color: #333;
}
.menu-item:last-child {
	border-bottom: none;
}
.tit {
	font-weight: 600;
	margin-left: 20rpx;
}
.badge {
	font-size: 24rpx;
	color: #036045;
	margin-right: 8rpx;
}
.d-flex {
	display: flex;
}
.a-center {
	align-items: center;
}
.j-sb {
	justify-content: space-between;
}
</style>
