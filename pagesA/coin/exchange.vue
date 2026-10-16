<template>
	<view class="page">
		<view class="balance-card">
			<view class="balance-top">
				<view>
					<text class="balance-label">驰友币余额</text>
					<text class="balance-num">¥{{ balance.coin_available }}</text>
				</view>
				<view class="log-btn" @click="goLogs">兑换记录</view>
			</view>
			<text class="balance-hint">与「我的」页余额一致，仅可用于兑换卡券，不可提现</text>
		</view>

		<view class="goods-grid" v-if="goodsList.length">
			<view class="goods-item" v-for="g in goodsList" :key="g.id">
				<image class="goods-img" :src="g.image || '/static/logo.png'" mode="aspectFit" />
				<text class="goods-title">{{ g.title }}</text>
				<view class="exchange-btn" @click="doExchange(g)">
					<text class="btn-left">{{ formatCoin(g.coin_price) }}驰友币</text>
					<text class="btn-split">|</text>
					<text class="btn-right">兑换</text>
				</view>
			</view>
		</view>
		<view class="empty" v-else-if="loaded">暂无可兑换商品</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				balance: {
					coin_available: '0.00',
					coin_settled: '0.00',
					coin_used: '0.00'
				},
				goodsList: [],
				submitting: false
			}
		},
		onShow() {
			this.loadAll()
		},
		onPullDownRefresh() {
			this.loadAll().finally(() => uni.stopPullDownRefresh())
		},
		methods: {
			formatCoin(v) {
				const n = parseFloat(v)
				if (isNaN(n)) return '0'
				return n % 1 === 0 ? String(n) : n.toFixed(2)
			},
			goLogs() {
				uni.navigateTo({ url: '/pagesA/coin/logs' })
			},
			async loadAll() {
				await Promise.all([this.loadBalance(), this.loadGoods()])
				this.loaded = true
			},
			async loadBalance() {
				const res = await this.coinBalance({})
				if (res.code === 1 && res.data) {
					this.balance = {
						coin_available: res.data.coin_available || '0.00',
						coin_settled: res.data.coin_settled || '0.00',
						coin_used: res.data.coin_used || '0.00'
					}
				}
			},
			async loadGoods() {
				const res = await this.coinGoodsList({})
				if (res.code === 1 && res.data && res.data.list) {
					this.goodsList = res.data.list
				}
			},
			doExchange(g) {
				if (this.submitting) return
				const price = parseFloat(g.coin_price)
				const avail = parseFloat(this.balance.coin_available)
				if (isNaN(price) || price <= 0) {
					return this.showToast('商品价格异常')
				}
				if (avail < price) {
					return this.showToast('驰友币不足')
				}
				uni.showModal({
					title: '确认兑换',
					content: `确定使用 ${this.formatCoin(g.coin_price)} 驰友币兑换「${g.title}」？`,
					success: async (r) => {
						if (!r.confirm) return
						this.submitting = true
						try {
							const res = await this.coinExchange({ goods_id: g.id })
							if (res.code === 1) {
								this.showToast('兑换成功')
								await this.loadAll()
								setTimeout(() => this.goLogs(), 500)
							}
						} finally {
							this.submitting = false
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: linear-gradient(180deg, #e8f5f0 0%, #f4f6f8 280rpx);
		padding: 24rpx;
		box-sizing: border-box;
	}

	.balance-card {
		background: linear-gradient(135deg, #d4efe6 0%, #e8f7f2 50%, #f0faf7 100%);
		border-radius: 24rpx;
		padding: 32rpx 28rpx;
		margin-bottom: 28rpx;
		box-shadow: 0 8rpx 24rpx rgba(3, 96, 69, 0.08);
	}

	.balance-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.balance-label {
		display: block;
		font-size: 28rpx;
		color: #036045;
		margin-bottom: 12rpx;
	}

	.balance-num {
		display: block;
		font-size: 56rpx;
		font-weight: 700;
		color: #036045;
		line-height: 1.2;
	}

	.log-btn {
		padding: 12rpx 28rpx;
		border: 2rpx solid #036045;
		border-radius: 40rpx;
		font-size: 26rpx;
		color: #036045;
		font-weight: 600;
	}

	.balance-hint {
		display: block;
		font-size: 22rpx;
		color: #5a8f7a;
		margin-top: 20rpx;
		line-height: 1.5;
	}

	.goods-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20rpx 0;
	}

	.goods-item {
		width: calc(50% - 10rpx);
		background: #fff;
		border-radius: 20rpx;
		padding: 24rpx 20rpx 20rpx;
		box-sizing: border-box;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
	}

	.goods-img {
		width: 100%;
		height: 200rpx;
		display: block;
		margin-bottom: 16rpx;
	}

	.goods-title {
		display: block;
		font-size: 28rpx;
		color: #333;
		font-weight: 600;
		text-align: center;
		margin-bottom: 20rpx;
		min-height: 40rpx;
	}

	.exchange-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid #036045;
		border-radius: 40rpx;
		height: 64rpx;
		font-size: 26rpx;
		color: #036045;
		font-weight: 600;
	}

	.btn-left {
		padding-right: 12rpx;
	}

	.btn-split {
		opacity: 0.35;
		padding: 0 12rpx;
	}

	.btn-right {
		padding-left: 4rpx;
	}

	.empty {
		text-align: center;
		color: #999;
		font-size: 28rpx;
		padding: 80rpx 0;
	}
</style>
