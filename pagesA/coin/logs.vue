<template>
	<view class="page">
		<empty v-if="loaded && list.length === 0"></empty>
		<view class="card" v-for="item in list" :key="item.id" @click="openDetail(item)">
			<view class="row-top">
				<image class="thumb" :src="item.goods_image || '/static/logo.png'" mode="aspectFit" />
				<view class="info">
					<text class="title">{{ item.goods_title }}</text>
					<text class="sub">{{ item.coin_amount }} 驰友币 · {{ item.createtime_fmt }}</text>
					<view class="status-row">
						<text class="status" :class="'st-' + item.status">{{ item.status_text }}</text>
						<text class="dot" v-if="item.status === 'completed' && item.user_read === 0">新</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#ccc" size="14"></u-icon>
			</view>
		</view>

		<u-popup :show="detailShow" mode="center" round="16" @close="detailShow = false">
			<view class="popup" v-if="detail">
				<view class="popup-title">{{ detail.goods_title }}</view>
				<view class="popup-line">单号：{{ detail.exchange_no }}</view>
				<view class="popup-line">消耗：{{ detail.coin_amount }} 驰友币</view>
				<view class="popup-line">状态：{{ detail.status_text }}</view>
				<view class="secret-box" v-if="detail.has_card">
					<text class="secret-label">卡密信息</text>
					<text class="secret-text" selectable>{{ detail.card_secret }}</text>
				</view>
				<view class="secret-wait" v-else-if="detail.status === 'pending'">
					平台处理中，请稍后查看卡密
				</view>
				<view class="popup-btn" @click="detailShow = false">关闭</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				list: [],
				page: 1,
				lastPage: 1,
				detailShow: false,
				detail: null
			}
		},
		onLoad() {
			this.refresh()
		},
		onPullDownRefresh() {
			this.page = 1
			this.refresh().finally(() => uni.stopPullDownRefresh())
		},
		onReachBottom() {
			if (this.page >= this.lastPage) return
			this.page++
			this.refresh(true)
		},
		methods: {
			async refresh(append = false) {
				const res = await this.coinMyList({ page: this.page, limit: 15 })
				if (res.code === 1 && res.data) {
					const arr = res.data.list || []
					this.lastPage = res.data.pages || 1
					this.list = append ? [...this.list, ...arr] : arr
				}
				this.loaded = true
			},
			async openDetail(item) {
				const res = await this.coinDetail({ id: item.id })
				if (res.code === 1 && res.data) {
					this.detail = res.data
					this.detailShow = true
					const idx = this.list.findIndex((x) => x.id === item.id)
					if (idx >= 0 && res.data.user_read === 1) {
						this.$set(this.list[idx], 'user_read', 1)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f5f6fa;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
	}

	.row-top {
		display: flex;
		align-items: center;
	}

	.thumb {
		width: 120rpx;
		height: 120rpx;
		flex-shrink: 0;
		border-radius: 12rpx;
		background: #f8f8f8;
	}

	.info {
		flex: 1;
		margin: 0 16rpx;
		min-width: 0;
	}

	.title {
		display: block;
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 8rpx;
	}

	.sub {
		display: block;
		font-size: 24rpx;
		color: #999;
		margin-bottom: 8rpx;
	}

	.status-row {
		display: flex;
		align-items: center;
	}

	.status {
		font-size: 24rpx;
		color: #036045;
	}

	.st-pending {
		color: #e6a23c;
	}

	.st-cancelled {
		color: #999;
	}

	.dot {
		margin-left: 12rpx;
		font-size: 20rpx;
		color: #fff;
		background: #e54d42;
		padding: 2rpx 12rpx;
		border-radius: 20rpx;
	}

	.popup {
		width: 600rpx;
		padding: 40rpx 32rpx 32rpx;
		box-sizing: border-box;
	}

	.popup-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #333;
		margin-bottom: 24rpx;
	}

	.popup-line {
		font-size: 26rpx;
		color: #666;
		margin-bottom: 12rpx;
	}

	.secret-box {
		margin-top: 24rpx;
		padding: 20rpx;
		background: #f0faf6;
		border-radius: 12rpx;
	}

	.secret-label {
		display: block;
		font-size: 26rpx;
		color: #036045;
		font-weight: 600;
		margin-bottom: 12rpx;
	}

	.secret-text {
		font-size: 28rpx;
		color: #333;
		line-height: 1.6;
		word-break: break-all;
	}

	.secret-wait {
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #e6a23c;
	}

	.popup-btn {
		margin-top: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #036045;
		color: #fff;
		border-radius: 40rpx;
		font-size: 30rpx;
	}
</style>
