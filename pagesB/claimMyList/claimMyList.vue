<template>
	<view class="page">
		<view class="tip" v-if="warrantyInfo">
			质保登记 #{{ warrantyInfo.id }} · {{ warrantyInfo.tire_name }} {{ warrantyInfo.tire_spec }}
		</view>
		<view v-if="loading" class="empty">加载中…</view>
		<view v-else-if="list.length === 0" class="empty">
			<text>暂无理赔申请记录</text>
		</view>
		<view v-else class="list">
			<view class="card" v-for="item in list" :key="item.id">
				<view class="card-head">
					<text class="claim-no">理赔 #{{ item.id }}</text>
					<text class="status-tag" :class="'status-' + item.process_status">{{ item.process_status_text }}</text>
				</view>
				<view class="row">
					<text class="k">损伤类型</text>
					<text class="v">{{ item.damage_type || '—' }}</text>
				</view>
				<view class="row">
					<text class="k">申请时间</text>
					<text class="v">{{ item.createtime | timerFormat }}</text>
				</view>
				<view class="row" v-if="item.admin_note">
					<text class="k">处理备注</text>
					<text class="v">{{ item.admin_note }}</text>
				</view>
			</view>
		</view>

		<view class="footer" v-if="warrantyId">
			<view class="btn-primary" @click="goClaim">再次申请理赔</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				warrantyId: '',
				warrantyInfo: null,
				list: [],
				loading: true
			}
		},
		onLoad(options) {
			if (options && options.warranty_id) {
				this.warrantyId = String(options.warranty_id)
			}
		},
		onShow() {
			this.fetchList()
		},
		methods: {
			async fetchList() {
				this.loading = true
				const payload = {}
				if (this.warrantyId) {
					payload.warranty_id = this.warrantyId
				}
				const res = await this.claimMyList(payload)
				this.loading = false
				if (res.code === 1 && res.data) {
					this.list = res.data.list || []
				} else {
					this.list = []
				}
				if (this.warrantyId) {
					this.loadWarrantyInfo()
				}
			},
			async loadWarrantyInfo() {
				const res = await this.warrantyMyList({})
				if (res.code === 1 && res.data && res.data.list) {
					const found = res.data.list.find((w) => String(w.id) === String(this.warrantyId))
					this.warrantyInfo = found || null
				}
			},
			goClaim() {
				uni.navigateTo({
					url: '/pagesB/claimRegister/claimRegister?warranty_id=' + this.warrantyId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f4f5f7;
		padding: 24rpx 24rpx 160rpx;
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

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx;
		margin-bottom: 24rpx;
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f3f3f3;
	}

	.claim-no {
		font-size: 30rpx;
		font-weight: 700;
		color: #333;
	}

	.status-tag {
		font-size: 24rpx;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		font-weight: 600;
	}

	.status-pending {
		color: #e6a23c;
		background: #fdf6ec;
	}

	.status-processing {
		color: #409eff;
		background: #ecf5ff;
	}

	.status-approved,
	.status-completed {
		color: #036045;
		background: #ecf7f5;
	}

	.status-rejected {
		color: #f56c6c;
		background: #fef0f0;
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

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 24rpx 28rpx calc(24rpx + env(safe-area-inset-bottom));
		background: #fff;
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.06);
	}

	.btn-primary {
		text-align: center;
		padding: 24rpx;
		border-radius: 40rpx;
		background: #036045;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
	}
</style>
