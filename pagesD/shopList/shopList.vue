<template>
	<view>
		<u-sticky>
			<view class="head d-flex a-center j-sb ">
				<view class="head_left color-3d f-size-28">
					商品菜单
				</view>
				<view class="head_right" @click="routerTo('/pagesD/ShelfGoods/ShelfGoods')">
					增加商品 +
				</view>
			</view>
		</u-sticky>


		<view class="box">
			<view class="box_item" v-for="item in 10" :key="item">
				<image class="img_1" src="../../static/logo.png" mode=""></image>
				<view class="box_item_bom">
					<view class="f-size-28 color-3d beyond mb-14">
						三素菜
					</view>
					<view class="d-flex a-center j-sb">
						<view class="f-size22 color-6 beyond" style="width: 80%;">
							多杀几点回家啊的
						</view>
						<view class="img_box">
							<image v-if="item.is_show" src="../static/dicon2.png" mode=""></image>
							<image v-else src="../static/dicon1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>

		</view>


		<view class="fixed">
			<view class="fixed_btn d-flex a-center j-sb">
				<view class="fixed_btn_left ml-30">
					6.66 <span class="f-size-22 ml-16">元</span>
				</view>
				<view class="fixed_btn_right" @click="popShow=true">
					核销
				</view>
			</view>
		</view>


		<writePop :popShow='popShow' @close='popShow=false'></writePop>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				popShow: false
			};
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0 30rpx 180rpx;
		background-color: #F4F5F7;
		box-sizing: border-box;
	}


	.box {
		display: grid;
		grid-template-columns: repeat(2, 336rpx);
		row-gap: 20rpx;
		justify-content: space-between;

		.box_item {
			width: 336rpx;
			height: 280rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;

			.box_item_bom {
				padding: 10rpx 22rpx;
				box-sizing: border-box;
			}

			.img_1 {
				width: 336rpx;
				height: 162rpx;
				border-radius: 20rpx 20rpx 0rpx 0rpx;
			}

			.img_box {
				image {
					width: 24rpx;
					height: 24rpx;
				}

			}
		}
	}

	.head {
		background-color: #F4F5F7;
		padding: 30rpx 0 20rpx;
		box-sizing: border-box;

		.head_right {
			width: 166rpx;
			height: 50rpx;
			background: #036045;
			border-radius: 10rpx;
			font-size: 26rpx;
			color: #FFFFFF;
			line-height: 50rpx;
			text-align: center;
		}
	}


	.fixed {
		padding: 22rpx 38rpx 38rpx;
		box-sizing: border-box;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		color: #fff;

		.fixed_btn {
			height: 90rpx;
			background: #232323;
			border-radius: 1246rpx 1246rpx 1246rpx 1246rpx;

			.fixed_btn_left {
				font-weight: 400;
				font-size: 40rpx;
				color: #FFFFFF;
			}

			.fixed_btn_right {
				width: 300rpx;
				height: 90rpx;
				background: #036045;
				border-radius: 1246rpx 1246rpx 1246rpx 1246rpx;
				font-weight: 400;
				font-size: 30rpx;
				color: #FFFFFF;
				line-height: 90rpx;
				text-align: center;
			}
		}
	}
</style>