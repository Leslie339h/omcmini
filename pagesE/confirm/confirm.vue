<template>
	<view v-show='display'>
		<!-- 购买积分商品的确认订单 -->
		<view class="">
			<view class="main">
				<view class="option_invite_top" @tap="routerTo('/pagesB/myAddress/myAddress')">
					<view class="" v-if="address_data.address">
						<view class="option_invite_top_left mb-10">
							{{address_data.address}}-{{address_data.remark}}
						</view>
						<view class="f-size-24 color-9">
							{{address_data.title}}({{address_data.suffix}})-{{address_data.mobile}}
						</view>
					</view>
					<view class="option_invite_top_left" v-else>
						请选择收货地址
					</view>
					<view class="option_invite_top_right">
						<u-icon name="arrow-right" color="#444444" size="32rpx"></u-icon>
					</view>
				</view>

				<view class="content_2 mt-30">
					<view class="content_2_box">
						<view class="content_2_1">
							积分商城
						</view>
						<view class="content_2_2">
							<view style="display: flex;">
								<view class="content_2_2_left">
									<image :src="content.images[0]" mode=""></image>
								</view>
								<view class="content_2_2_title">
									{{content.title}}
								</view>
							</view>
							<view class="content_2_2_price">
								<view class="">
									{{content.price | quling}}积分
								</view>
								<view class="">
									x1
								</view>
							</view>
						</view>
						<view class="content_2_3">
							<view>
								积分抵扣
							</view>
							<view>
								{{content.price | quling}}
							</view>
						</view>
						<view class="content_2_4">
							<view class="content_2_4_box">
								<text> 合计</text>
								<text>￥{{content.price | quling}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bnt">
			<view class="bnt_box">
				<view class="bnt_box_left">
					<text>合计:</text>
					<text>¥{{content.price | quling}}积分</text>
				</view>
				<view class="bnt_box_right" @tap="sub">
					立即兑换
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: {},
				display: false
			};
		},
		onLoad(obj) {
			this.point_detailApi(obj.id)
		},

		methods: {
			async point_detailApi(id) {
				let data = await this.pointdeDetail({
					id: id
				})
				if (data.code == 1) {
					this.content = data.data
					this.display = true
				}
			},
			async sub() {
				let data = await this.exchange({
					id: this.content.id,
					address_id: this.address_data.id
				})
				if (data.code == 1) {
					uni.showToast({
						title: data.msg,
						icon: "none",
						success() {
							setTimeout(res => {
								uni.navigateBack()
							}, 2000)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
	}

	.main {
		width: 692rpx;
		margin: 0 auto;

		.content_2 {
			width: 692rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.content_2_box {
				width: 90%;
				margin: 0 auto;

				.content_2_1 {
					padding: 30rpx 0;
					font-size: 26rpx;
					font-weight: 500;
					color: #313131;
				}

				.content_2_2 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 0;
					border-top: 1rpx solid #dfdfdf40;
					border-bottom: 1rpx solid #dfdfdf40;

					.content_2_2_left {
						width: 98rpx;
						height: 96rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 4rpx;
						}
					}

					.content_2_2_title {
						font-size: 24rpx;
						font-weight: 500;
						color: #313131;
						margin-left: 20rpx;
					}

					.content_2_2_price {
						text-align: right;

						view:nth-child(1) {
							font-size: 26rpx;
							font-weight: 400;
							color: #313131;
						}

						view:nth-child(2) {
							font-size: 26rpx;
							font-weight: 400;
							color: #9C9C9C;
							margin-top: 10rpx;
						}
					}
				}

				.content_2_3 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 25rpx 0;
					border-bottom: 1rpx solid #dfdfdf40;

					view:nth-child(1) {
						font-size: 24rpx;
						font-weight: 400;
						color: #3B3B3B;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 600;
						color: #3B3B3B;
					}
				}

				.content_2_4 {
					text-align: right;
					padding: 20rpx 0;

					.content_2_4_box {
						font-size: 26rpx;
						color: #666666;

						text:nth-child(1) {
							color: #666666;
							margin-right: 10rpx;
						}

						text:nth-child(2) {
							font-weight: 600;
						}

					}

				}
			}

		}
	}

	.bnt {
		width: 100%;
		height: 127rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;

		.bnt_box {
			width: 90%;
			margin: 20rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.bnt_box_left {
				text:nth-child(1) {
					font-size: 26rpx;
					font-weight: 400;
					color: #313131;
				}

				text:nth-child(2) {
					font-size: 30rpx;
					font-weight: 500;
					color: #F65329;
					margin-left: 10rpx;
				}
			}

			.bnt_box_right {
				width: 207rpx;
				height: 82rpx;
				background: #02B6FD;
				border-radius: 41rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #F6FCFF;
				line-height: 82rpx;
				text-align: center;
			}
		}
	}

	.option_invite_top {
		padding: 30rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;

		background-color: #fff;
		border-radius: 20rpx;

		.option_invite_top_left {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}
	}

	.option_invite_down {
		padding: 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.option_invite_down_left {
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			line-height: 37rpx;
		}

		.option_invite_down_right {
			font-size: 26rpx;
			font-weight: 400;
			color: #02B6FD;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>