<template>
	<view>
		<u-sticky>
			<view class="head d-flex a-center j-sb ">
				<view class="head_left color-3d f-size-28">
					商品列表
				</view>
				<view class="head_right" @click="routerTo('/pagesD/addcashierDesk/addcashierDesk')">
					添加商品 +
				</view>
			</view>
		</u-sticky>


		<empty v-if="list.length==0"></empty>
		<view class="box">
			<view class="box_item d-flex a-start j-sb" v-for="item in list" :key="item.id">
				<image class="img_1" :src="item.image" mode="aspectFill"></image>
				<view class="box_item_bom">
					<view class="f-size-24  f-600color-3d beyond mb-6">
						{{item.title}}
					</view>
					<view class="">
						<view class="f-size-22 color-6 beyond mb-10">
							￥{{item.price}}
						</view>
						<view class="">
							<u-number-box>
								<view slot="minus" class="minus" @tap="order_reduce(item,index,2)">
									<u-icon name="minus" size="12"></u-icon>
								</view>
								<text slot="input" style="width: 50rpx;text-align: center;"
									class="input">{{item.count}}</text>
								<view slot="plus" class="plus" @tap="order_reduce(item,index,1)">
									<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
								</view>
							</u-number-box>
						</view>

					</view>
				</view>
			</view>
		</view>

		<view class="fixed">
			<view class="fixed_btn d-flex a-center j-sb">
				<view class="fixed_btn_left ml-30">
					{{after_total}} <span class="f-size-22 ml-16">元</span>
				</view>
				<view class="fixed_btn_right" @click="list.length>0?createApi():showToast('至少添加一个商品')">
					核销
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				page: 1,
				list: [],
				price: 0,
				after_total: 0
			};
		},
		onLoad() {
			this.order_carListApi()
			this.store_authenticationApi()
		},
		onShow() {
			this.order_carListApi()
		},
		methods: {
			async createApi() {
				let price = this.after_total
				let res = await this.couponCreate({
					dc_type: 2,
					orderType: 1,
					storeId: this.storeId
				})
				if (res.code == 1) {
					this.routerTo(
						`/pagesD/cashierHeXiao/cashierHeXiao?orderNo=${res.data.orderNo}&after_total=${price}&timer=${res.data.end_time}&type=1&order_id=${res.data.order_id}`
					)

				}
			},
			// 店铺数据
			async store_authenticationApi() {
				let res = await this.store_authentication({
					type: 'view'
				})
				if (res.code == 1) {
					this.storeId = res.data.id
				}
			},
			async order_reduce(item, index, type) {
				let res = await this.storereduce({
					cart_id: item.id,
					store_id: item.store_id,
					goods_id: item.goods_id,
					spu_id: item.item_id,
					count: 1,
					type
				})
				if (res.code == 1) {
					this.order_carListApi()
				}
			},

			// 购物车列表
			async order_carListApi() {
				let res = await this.storecarList()
				if (res.code == 1) {
					this.shopping_trolley_list = res.data
					this.after_total = res.data.after_total
					this.list = res.data.data
				}
			},
			setis_show(id) {
				this.list.forEach(item => {
					if (item.id == id) {
						if (item.is_show) {
							item.is_show = false
							this.price = this.price - Number(item.id)
						} else {
							item.is_show = true
							this.price = this.price + Number(item.id)
						}
					}
				})
				this.$forceUpdate()
			},
			async categoryListApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.categoryList({
					page: this.page
				})
				if (res.code == 1) {
					if (e == 1) {
						this.list = [...this.list, ...res.data.rows]
					} else {
						this.list = res.data.rows
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.minus {
		width: 40rpx;
		height: 40rpx;
		border-width: 1px;
		border-color: #E6E6E6;
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
		padding: 0 10px;
	}

	.plus {
		width: 40rpx;
		height: 40rpx;
		background-color: #036045;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
</style>
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
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;

			.box_item_bom {
				padding: 10rpx 20rpx 10rpx 0;
				box-sizing: border-box;
				width: calc(100% - 160rpx);
			}

			.img_1 {
				width: 140rpx;
				height: 140rpx;
				border-radius: 20rpx 0rpx 0rpx 20rpx;
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