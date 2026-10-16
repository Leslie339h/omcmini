<template>
	<view class="box" v-if="display">
		<view class="swp">
			<u-swiper :list="list1" height='500rpx'></u-swiper>
		</view>
		<view class="title">
			<view class="title_top">
				{{order_detalis.title}}
			</view>
			<view class="title_bottom">
				<text>{{order_detalis.price | quling}}积分</text>
				<text>剩余{{order_detalis.stock}}</text>
			</view>
		</view>
		<view class="content_text">
			<u-parse :content="order_detalis.content"></u-parse>
		</view>
		<view class="btn" @tap="routerTo('/pagesE/confirm/confirm?id='+order_detalis.id)">
			<view class="btn_text">
				立即兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [],
				order_detalis: {},
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
					console.log(data);
					this.list1 = data.data.images
					this.order_detalis = data.data
					uni.setNavigationBarTitle({
						title: this.order_detalis.title //这是修改后的导航栏文字
					})
					this.display = true
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
		padding-bottom: 100rpx;
	}

	.title {
		width: 701rpx;
		height: 160rpx;
		background: #FFFFFF;
		border-radius: 22rpx;
		margin: -20rpx auto 0;
		position: relative;
		z-index: 10;

		.title_top {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			text-indent: 1em;
			padding: 20rpx 0;
		}

		.title_bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			text:nth-child(1) {
				font-size: 32rpx;
				font-weight: 600;
				color: #05B6F6;
				line-height: 50rpx;

			}

			text:nth-child(2) {
				font-size: 24rpx;
				font-weight: 400;
				color: #9F9F9F;
			}
		}
	}

	.content_text {
		width: 701rpx;
		margin: 30rpx auto;
		background: #FFFFFF;
		border-radius: 22rpx;
		padding: 30rpx;
		box-sizing: border-box;

	}

	.btn {
		width: 100%;
		height: 143rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;

		.btn_text {
			width: 701rpx;
			height: 88rpx;
			background: #05B6F6;
			border-radius: 44rpx;
			margin: 20rpx auto;
			font-size: 26rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 88rpx;
			text-align: center;
		}
	}
</style>