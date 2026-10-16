<template>
	<view>
		<view class="box_1">
			<view class="box_1_top">
				<u-divider text="待使用"></u-divider>
			</view>
			<view class="box_1_title">
				凭「就餐码」直接入园
			</view>
			<view class="box_code d-flex a-center">
				<view class="box_code_left">
					就<br />餐<br />码<br />
				</view>
				<view class="box_code_right">
					<image src="../../static/logo.png" mode=""></image>
					<view class="text_1">
						请向工作人员出示本页面
					</view>
					<view class="box_code_right_btn">
						手动刷新
					</view>
				</view>
			</view>
		</view>

		<view>
			<orderInfo></orderInfo>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #F8F8F8;
	}

	.box_1 {
		width: 686rpx;
		background: #FFFFFF;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		margin: 28rpx auto;
		padding: 10rpx 30rpx 30rpx;
		box-sizing: border-box;

		.box_code {
			width: 622rpx;
			height: 468rpx;
			background: #F4F5F7;
			border-radius: 18rpx 18rpx 18rpx 18rpx;
			margin-top: 28rpx;

			.box_code_left {
				width: 68rpx;
				height: 468rpx;
				background: #232323;
				border-radius: 18rpx 18rpx 18rpx 18rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
				padding-top: 180rpx;
				text-align: center;
			}

			.box_code_right_btn {
				width: 136rpx;
				height: 46rpx;
				background: #F9FCFE;
				border-radius: 19rpx 19rpx 19rpx 19rpx;
				font-size: 22rpx;
				color: #036045;
				line-height: 46rpx;
				text-align: center;
				margin: 0 auto;
			}

			.box_code_right {
				text-align: center;
				width: calc(100% - 68rpx);

				image {
					width: 280rpx;
					height: 278rpx;
					background: #D8D8D8;
				}

				.text_1 {
					font-weight: 400;
					font-size: 22rpx;
					color: #0A0A0A;
					text-align: center;
					margin: 20rpx 0;
				}

			}
		}

		.box_1_top {
			margin: 0 auto;
			width: 300rpx;
		}

		.box_1_title {
			font-weight: 600;
			font-size: 28rpx;
			color: #3D3D3D;
		}
	}
</style>