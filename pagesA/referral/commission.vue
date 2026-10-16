<template>
	<view class="page">
		<empty v-if="list.length===0"></empty>
		<view class="card" v-for="(item,idx) in list" :key="idx">
			<view class="row j-sb a-center">
				<text class="order">{{ item.order_no || '—' }}</text>
				<text class="amt">+{{ item.commission }} 驰友币</text>
			</view>
			<view class="muted">基数 ¥{{ item.base_amount }} × {{ item.rate_percent }}%</view>
			<view class="muted">{{ item.createtime_fmt }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return { list: [], page: 1, lastPage: 1 }
	},
	onLoad() {
		this.refresh()
	},
	onReachBottom() {
		if (this.page >= this.lastPage) return
		this.page++
		this.refresh(true)
	},
	methods: {
		async refresh(append = false) {
			const res = await this.referralCommissionLog({ page: this.page, limit: 15 })
			if (res.code === 1) {
				const d = res.data || {}
				const arr = d.list || []
				this.lastPage = d.pages || 1
				this.list = append ? [...this.list, ...arr] : arr
			}
		}
	}
}
</script>

<style lang="scss">
.page { padding: 24rpx; }
.card {
	background:#fff;border-radius:16rpx;padding:24rpx;margin-bottom:20rpx;
	box-shadow:0 2rpx 12rpx rgba(0,0,0,.04);
}
.row { font-size: 28rpx; margin-bottom: 8rpx; }
.order { font-weight: 600; }
.amt { color: #07c160; }
.muted { font-size: 24rpx; color:#999; margin-top: 6rpx; }
.j-sb { display:flex; justify-content: space-between;}
.a-center { align-items:center;}
</style>
