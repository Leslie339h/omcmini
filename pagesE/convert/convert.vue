<template>
	<view>
		<view class="hade_tab">
			<u-tabs :list="list1" @click="click"></u-tabs>
		</view>

		<empty v-if="content_list.length==0"></empty>

		<view class="content_box mt-24" v-for="(item,index) in content_list" :key="item">
			<view class="content">
				<view class="content_1" @tap="routerTo('/pagesE/orderDetails/orderDetails?id='+item.id)">
					<view class="">
						{{item.goods_name}}
					</view>
					<view class="">
						<text v-if="item.status==1">待发货</text>
						<text v-if="item.status==2">待收货</text>
						<text v-if="item.status==3">已完成</text>
						<u-icon name="arrow-right" color="#808080" size="14"></u-icon>
					</view>
				</view>
				<view class="content_2">
					下单时间：{{ item.pay_time | timerFormat}}
				</view>
				<view class="content_3"
					@tap="routerTo('/pagesE/integralcommodity/integralcommodity?id='+item.goods_id)">
					<view class="content_3_left">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="content_3_right">
						<view class="">
							{{item.order_amount_total}}积分
						</view>
						<view class="">
							x{{item.goods_count}}
						</view>
					</view>
				</view>
				<view class="content_4"
					@tap="routerTo('/pagesE/integralcommodity/integralcommodity?id='+item.goods_id)">
					<view class="content_4_text">
						再来一单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
				}, {
					name: '待发货',
				}, {
					name: '待收货'
				}, {
					name: '已完成'
				}],
				list1_index: 0,
				content_list: [],
				page: 1,
				show: false,
				min: new Date(new Date().toLocaleDateString()).getTime() - 31 * 24 * 3600 * 1000,
				time: []
			};
		},
		onLoad() {
			this.point_take()
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			click(item) {
				console.log('item', item);
				this.list1_index = item.index
				this.page = 1
				this.point_take()
			},
			async point_take(e) {
				if (e !== 1) {
					this.page = 1
				}
				let data = await this.pointdeTake({
					status: this.list1_index,
					page: this.page,
					time: this.time[0],
				})
				if (data.code == 1) {
					if (e == 1) {
						this.content_list = [...this.content_list, ...data.data.rows]
					} else {
						this.content_list = data.data.rows
					}
				}
			},
			goback(id) {
				uni.reLaunch({
					url: '/pages/me_all/integralcommodity/integralcommodity?id=' + id
				})
			},
			confirm(e) {
				this.time = []
				this.time.push(e.fulldate)
				this.point_take()
			},
		},
		onReachBottom() {
			this.page++
			this.point_take(1)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
	}

	.hade_tab {
		background-color: #fff;
	}

	.box_content {
		width: 702rpx;
		margin: 0 auto;

		.hadea {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 20rpx;

			.hade_left {
				display: flex;
				align-items: center;

				view:nth-child(1) {
					width: 29rpx;
					height: 32rpx;
				}

				view:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
				}
			}

			.hade_right {
				display: flex;
				align-items: center;

				.hade_right_left {
					display: flex;
					align-items: center;
					margin-right: 30rpx;

					view:nth-child(1) {
						width: 29rpx;
						height: 32rpx;
						padding: 0 7rpx;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
					}
				}

				.hade_right_right {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
					}

					view:nth-child(1) {
						width: 29rpx;
						height: 32rpx;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
					}
				}
			}
		}

		.record {
			min-height: 900rpx;
			height: auto !important;
			height: 900rpx;
			background: #FFFFFF;
			padding: 30rpx 0;
			border-radius: 16rpx;

			.record_title {

				padding: 20rpx 30rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #000101;
				margin-bottom: 30rpx;

			}

			.record_content {
				width: 90%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #dfdfdf40;
				margin-bottom: 30rpx;

				.record_content_left {
					view:nth-child(1) {
						font-size: 24rpx;
						font-weight: 400;
						color: #000101;
					}

					view:nth-child(2) {
						font-size: 20rpx;
						font-weight: 400;
						color: #9A9A9A;
						margin-top: 10rpx;
					}
				}

				.record_content_right {
					font-size: 32rpx;
					font-weight: 500;
					color: #313131;
				}
			}
		}
	}

	.content_box {
		width: 706rpx;
		height: 340rpx;
		margin: 20rpx auto 0;
		background: #FFFFFF;
		border-radius: 20rpx;

		.content {
			width: 95%;
			margin: 0 auto;

			.content_1 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;

				view:nth-child(1) {
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
				}

				view:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #3C3C3C;
					display: flex;
					align-items: center;
				}
			}

			.content_2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #717171;
			}

			.content_3 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;

				.content_3_left {
					width: 97rpx;
					height: 94rpx;
					border-radius: 4rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%
					}
				}

				.content_3_right {
					text-align: right;

					view:nth-child(1) {
						font-size: 32rpx;
						font-weight: 500;
						color: #3C3C3C;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 400;
						color: #9F9F9F;
					}
				}
			}

			.content_4 {
				border-top: 1rpx solid #dfdfdf40;
				padding: 20rpx 0;
				position: relative;

				.content_4_text {
					width: 155rpx;
					height: 55rpx;
					background: #00C8FF;
					border-radius: 28rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #F9FDFF;
					text-align: center;
					line-height: 55rpx;
					position: absolute;
					right: 20rpx;
				}
			}

		}
	}
</style>