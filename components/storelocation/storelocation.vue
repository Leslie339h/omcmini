<template>
	<view>
		<!-- 店家位置信息 -->
		<view class="content" :class="addShow?'line':'pad1'">
			<view class="content_left">
				<view class="content_left_1">
					{{content_list.store || ''}}
				</view>
				<view class="content_left_2 mt-10">
					{{content_list.createtime | timerFormat}}
				</view>
			</view>
			<view class="content_right">
				<view @tap="openTel(content_list.tel)">
					<image class="content_right_1" src="../../static/icon6.png" mode=""></image>
				</view>
				<view @tap="getopenLocation(content_list.lat,content_list.lon)">
					<image class="content_right_2" src="../../static/icon7.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "storelocation",
		props: {
			content_list: {},
			addShow: {
				default: false
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.pad1 {
		padding: 20rpx 20rpx;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.content_left {

			.content_left_1 {
				font-size: 32rpx;
				font-weight: 400;
				color: #393939;
			}

			.content_left_2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #979797;
			}
		}

		.content_right {
			width: 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.content_right_1 {
				width: 66rpx;
				height: 66rpx;
			}

			.content_right_2 {
				width: 66rpx;
				height: 66rpx;
			}
		}

	}

	.line {
		padding: 0rpx 0 8rpx;
		box-sizing: border-box;
		margin-bottom: 12rpx;
		border-bottom: 1rpx solid #eee;
	}

	.label {
		width: 66rpx;
		height: 38rpx;
		border-radius: 2rpx;
		border: 1rpx solid #036045;
		font-size: 24rpx;
		font-weight: 500;
		color: #036045;
		line-height: 38rpx;
		text-align: center;

	}

	.magleft {
		margin-left: 20rpx;
	}
</style>