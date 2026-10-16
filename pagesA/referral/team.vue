<template>
	<view class="page">
		<empty v-if="list.length===0"></empty>
		<view class="card" v-for="(item,idx) in list" :key="idx">
			<view class="row"><text class="label">昵称</text><text class="val">{{ item.nickname || '会员#'+ item.user_id }}</text></view>
			<view class="row" v-if="item.mobile"><text class="label">手机</text><text class="val">{{ item.mobile }}</text></view>
			<view class="row"><text class="label">绑定时间</text><text class="val">{{ item.bind_time_fmt }}</text></view>
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
			const res = await this.referralTeamList({ page: this.page, limit: 15 })
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
	background: #fff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0,0,0,.04);
}
.row { display:flex; justify-content: space-between; font-size: 28rpx; margin-bottom: 12rpx; }
.label { color: #939393; }
.val { color: #333; }
</style>
