<template>
	<view class="page">
		<view class="tip">以下为您的质保登记记录，可对任一记录发起理赔申请。</view>
		<view v-if="loading" class="empty">加载中…</view>
		<view v-else-if="list.length === 0" class="empty">
			<text>暂无质保记录</text>
			<view class="link" @click="goWarranty">去质保登记</view>
		</view>
		<view v-else class="list">
			<view class="card" v-for="item in list" :key="item.id">
				<view class="row">
					<text class="k">登记编号</text>
					<text class="v">#{{ item.id }}</text>
				</view>
				<view class="row" v-if="item.order_no">
					<text class="k">订单号</text>
					<text class="v">{{ item.order_no }}</text>
				</view>
				<view class="row">
					<text class="k">轮胎</text>
					<text class="v">{{ item.tire_name }} {{ item.tire_spec }}</text>
				</view>
				<view class="row">
					<text class="k">城市</text>
					<text class="v">{{ item.purchase_city || '—' }}</text>
				</view>
				<view class="row">
					<text class="k">登记时间</text>
					<text class="v">{{ item.createtime | timerFormat }}</text>
				</view>
				<view class="row" v-if="item.claim_count > 0">
					<text class="k">理赔状态</text>
					<text class="v status-text" :class="'status-' + item.latest_process_status">
						{{ item.latest_process_status_text }}（共{{ item.claim_count }}次）
					</text>
				</view>
				<view class="actions">
					<view
						v-if="!item.claim_count"
						class="btn-outline"
						@click="goClaim(item.id)"
					>申请理赔</view>
					<view
						v-else
						class="btn-outline"
						@click="goClaimRecords(item.id)"
					>申请记录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: true
			}
		},
		onShow() {
			this.fetchList()
		},
		methods: {
			async fetchList() {
				this.loading = true
				const res = await this.warrantyMyList({})
				this.loading = false
				if (res.code === 1 && res.data && res.data.list) {
					this.list = res.data.list
				} else {
					this.list = []
				}
			},
			goWarranty() {
				uni.navigateTo({ url: '/pagesB/warrantyRegister/warrantyRegister' })
			},
			goClaim(warrantyId) {
				uni.navigateTo({
					url: '/pagesB/claimRegister/claimRegister?warranty_id=' + warrantyId
				})
			},
			goClaimRecords(warrantyId) {
				uni.navigateTo({
					url: '/pagesB/claimMyList/claimMyList?warranty_id=' + warrantyId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f4f5f7;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.tip {
		font-size: 26rpx;
		color: #036045;
		background: #ecf7f5;
		padding: 20rpx 24rpx;
		border-radius: 12rpx;
		margin-bottom: 24rpx;
	}

	.empty {
		text-align: center;
		padding: 120rpx 24rpx;
		font-size: 28rpx;
		color: #909399;
	}

	.link {
		margin-top: 32rpx;
		color: #036045;
		font-weight: 600;
	}

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx;
		margin-bottom: 24rpx;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 16rpx;
		font-size: 28rpx;
	}

	.k {
		color: #909399;
		flex-shrink: 0;
		margin-right: 24rpx;
	}

	.v {
		color: #333;
		text-align: right;
		flex: 1;
		word-break: break-all;
	}

	.status-text {
		font-weight: 600;
	}

	.status-pending {
		color: #e6a23c;
	}

	.status-processing {
		color: #409eff;
	}

	.status-approved,
	.status-completed {
		color: #036045;
	}

	.status-rejected {
		color: #f56c6c;
	}

	.actions {
		margin-top: 24rpx;
		padding-top: 24rpx;
		border-top: 1rpx solid #f3f3f3;
	}

	.btn-outline {
		text-align: center;
		padding: 20rpx;
		border-radius: 40rpx;
		border: 2rpx solid #036045;
		color: #036045;
		font-size: 28rpx;
		font-weight: 600;
	}
</style>
