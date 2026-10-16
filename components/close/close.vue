<template>
	<!-- 悬浮结算 -->
	<view>
		<view class="box">
			<view class="box_content" @tap="show=true">
				<view class="box_img">
					<image src="../../static/icon5.png" mode=""></image>
					<text>{{shopping_trolley_list.count || 0}}</text>
				</view>
				<view class="box_price">
					<text>预计到手</text>
					<text style="font-size: 34rpx;">¥</text><text>{{shopping_trolley_list.after_total || 0.00}}</text>
				</view>
			</view>

			<view class="box_close" @tap="goback()">
				{{is_shop?'去核销':'去结算'}}
			</view>
		</view>
		<view class="closeMark" v-if="show" @click="show=false">
		</view>
		<u-popup :overlay='false' :show="show" :round="10" zIndex='10' mode="bottom" @close="show=false">
			<view class="upcart">
				<view class="upcart_top">
					<view class="upcart_top_left">
						已选商品
					</view>
					<view class="upcart_top_right" @tap="remove()">
						<u-icon name="trash" color="#676767 " size="30"></u-icon>
						<text>清空</text>
					</view>
				</view>
				<view class="upcart_order">
					<view v-if="!cartList.length">
						<empty></empty>
					</view>
					<scroll-view scroll-y="true" style="height: 500rpx;">
						<view class="upcart_order_content" v-for="(item,index) in cartList"
							:key="item.id || index">
							<view class="upcart_order_content_img">
								<image :src="item.image" mode="aspectFill"></image>
							</view>
							<view class="upcart_order_content_title">
								<view>{{item.title}}</view>
								<view>{{item.item_name}}</view>
								<view class="">
									<text>￥{{item.price}}</text>
									<view class="">
										<u-number-box v-model="value[index]">
											<view slot="minus" class="minus" @tap.stop="order_reduce(index,2)">
												<u-icon name="minus" labelSize='20px' color="#036045"
													size="12"></u-icon>
											</view>
											<text slot="input" style="width: 50px;text-align: center;"
												class="input">{{value[index]||item.count}}</text>
											<view slot="plus" class="plus" @tap.stop="order_reduce(index,1)">
												<u-icon name="plus" labelSize='20px' color="#FFFFFF" size="12"></u-icon>
											</view>
										</u-number-box>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "close",
		props: {
			shopping_trolley_list: {},
			seatShow: {
				type: Boolean
			},
			addAdish: {
				default: false
			},
			// 是否从商家页面收银台过来的
			is_shop: {
				default: false
			}
		},
		data() {
			return {
				show: false,
				value: [],
				trolley_list: {},
				capsule_button: 2
			};
		},
		computed: {
			cartList() {
				const list = (this.shopping_trolley_list && this.shopping_trolley_list.data) || []
				return Array.isArray(list) ? list : []
			}
		},
		watch: {
			shopping_trolley_list: {
				handler(newval) {
					this.trolley_list = newval || {}
					this.inputlenght()
				},
				immediate: true
			}
		},
		methods: {
			inputlenght() {
				this.value = []
				const list = this.cartList
				list.forEach((res) => {
					this.value.push(res.count)
				})
			},
			async order_reduce(index, type) {
				const item = this.cartList[index]
				if (!item) return
				let list = {
					cart_id: item.id,
					store_id: item.store_id,
					goods_id: item.goods_id,
					spu_id: item.item_id,
					count: 1,
					type
				}
				let res;
				if (this.is_shop) {
					res = await this.storereduce(list)
				} else {
					res = await this.orderReduce(list)

				}
				if (res.code == 1) {
					this.$emit('update')
				}
			},

			// 清空购物车
			async remove() {
				if (this.is_shop) {
					let res = await this.storeempty()
					if (res.code == 1) {
						this.$emit('update')
						this.show = false
					}
				} else {
					let res = await this.carempty()
					if (res.code == 1) {
						this.$emit('update')
						this.show = false
					}
				}
			},
			goback() {
				if (this.shopping_trolley_list.count > 0) {
					if (this.is_shop) {
						uni.navigateBack()
					} else {
						uni.navigateTo({
							url: '/pagesA/affirm_order/affirm_order'
						})
					}

				} else {
					this.showToast('请至少选择一个商品')
				}

			}
		}
	}
</script>

<style lang="scss">
	.closeMark {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}

	.box {
		width: 700rpx;
		height: 101rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 15rpx 0rpx rgba(191, 202, 211, 0.46);
		border-radius: 51rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 12;

		.box_content {
			display: flex;
			align-items: center;
		}

		.box_img {
			width: 108rpx;
			height: 108rpx;
			margin: 0 30rpx;
			position: relative;

			image {
				width: 108rpx;
				height: 108rpx;
			}

			text {
				width: 40rpx;
				height: 40rpx;
				background-color: #036045;
				border-radius: 50%;
				text-align: center;
				line-height: 40rpx;
				color: #fff;
				position: absolute;
				right: -20rpx;
				font-size: 24rpx;
			}
		}

		.box_price {
			text:nth-child(1) {
				width: 124rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #101010;
				line-height: 101rpx;
			}

			text:nth-child(2) {
				font-size: 32rpx;
				font-weight: 500;
				color: #E45F3A;
				line-height: 101rpx;
				margin-left: 10rpx;
			}

			text:nth-child(3) {
				font-size: 30rpx;
				font-weight: 500;
				color: #E45F3A;
				line-height: 101rpx;
				margin-left: 10rpx;
			}
		}

		.box_close {
			width: 173rpx;
			height: 100%;
			background: #036045;
			border-radius: 0rpx 89rpx 89rpx 0rpx;
			line-height: 101rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			color: #FDFEFF;
		}
	}

	.upcart {
		width: 100%;
		height: 700rpx;

		.upcart_top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 30rpx;

			.upcart_top_left {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}

			.upcart_top_right {
				font-size: 24rpx;
				font-weight: 400;
				color: #676767;
				display: flex;
				align-items: center;
			}
		}

		.upcart_order_content {
			display: flex;
			align-items: center;
			padding: 0rpx 20rpx;
			height: 135rpx;
			margin-bottom: 30rpx;

			.upcart_order_content_img {
				width: 136rpx;
				height: 135rpx;
				border-radius: 7rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.upcart_order_content_title {
				width: 540rpx;
				margin-left: 20rpx;

				view:nth-child(1) {
					font-size: 28rpx;
					font-weight: 400;
					color: #353535;
				}

				view:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #676767;
					padding: 15rpx 0;
				}

				view:nth-child(3) {
					height: 45rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #E45F3A;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
		}
	}

	.minus {
		width: 22px;
		height: 22px;
		border-width: 1px;
		border-color: #036045;
		border-style: solid;
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
		@include flex;
		justify-content: center;
		align-items: center;
	}

	.input {
		// padding: 0 10px;
	}

	.plus {
		width: 22px;
		height: 22px;
		background-color: #036045;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
</style>