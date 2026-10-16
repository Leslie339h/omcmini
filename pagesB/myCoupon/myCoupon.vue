<template>
	<view>
		<empty v-if="list.length<=0"></empty>
		<view class="box_1">
			<view class="box_1_item" v-for="(item,index) in list" :key="index">
				<view class="box_1_item_top d-flex a-center ">
					<view class="box_1_item_top_left mr-36 text-center">
						<view class=" f-size-44 color-ff3767 f-600">
							{{item.used_amount}} <span class="f-size-24">元</span>
						</view>
						<view class="f-size-24 color-9">
							满{{item.with_amount}}元可用
						</view>
					</view>
					<view class="box_1_item_top_right mt-6">
						<view class="mb-14 f-700">
							{{item.title}}
						</view>
						<view class="f-size-22 color-9" v-if="item.use_time_text">
							使用时间：{{item.use_time_text}}
						</view>
					</view>

				</view>
				<view class="box_1_item_bom flexc flexs">
					<view class="box_1_item_bom_left flexc">
						<span @click="setshow(item.id)">使用规则</span>
						<image @click="setshow(item.id)" v-if="!item.is_show" src="../static/bicon12.png" mode="">
						</image>
						<image @click="setshow(item.id)" v-else src="../static/bicon11.png" mode=""></image>
						<view class="box_1_item_bom_card" v-if="item.is_show">
							<view class="box_1_item_bom_card_item" v-if="item.remarks">
								说明：{{item.remarks}}
							</view>
							<view class="box_1_item_bom_card_item">
								适用商品：{{item.fit_goods}}
							</view>
							<view class="box_1_item_bom_card_item" v-if="item.use_time_text">
								使用时间：{{item.use_time_text}}
							</view>
						</view>
					</view>
					<view class="box_1_item_bom_btn" @click="routerTo('/pages/shop/shop','reLaunch')">
						去使用
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
				is_show: true,
				list: [],
				page: 1
			};
		},
		onLoad() {
			this.myCouponListApi()
		},
		onReachBottom() {
			this.page++
			this.myCouponListApi()
		},
		methods: {
			setshow(id) {
				this.list.forEach(item => {
					if (item.id == id) {
						item.is_show = !item.is_show
					}
				})
				this.$forceUpdate()
			},
			async myCouponListApi(e) {
				let res = await this.myCouponList()
				if (res.code == 1 && res.data) {
					const rows = res.data.map((item) => ({ ...item, is_show: false }))
					if (e == 1) {
						this.list = [...this.list, ...rows]
					} else {
						this.list = rows
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F4F5F7;
	}

	.bg_img {
		height: 682rpx;
		width: 100vw;
	}

	.box_1 {
		padding: 30rpx;
		box-sizing: border-box;
		background: #F4F5F7;
		border-radius: 30rpx;
		margin-top: -50rpx;
		position: relative;
		z-index: 9;
		padding: 30rpx;
		box-sizing: border-box;

		.box_1_item {
			margin-top: 30rpx;
			background: #FFFFFF;
			border-radius: 18rpx;
			padding: 24rpx 30rpx;
			box-sizing: border-box;
			position: relative;

			.box_1_item_top {
				padding: 10rpx 20rpx 30rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #F6F6F6;
			}

			.box_1_item_bom {
				padding: 30rpx 0 0;
				box-sizing: border-box;

				.box_1_item_bom_btn {
					color: #fff;
					text-align: center;
					line-height: 58rpx;
					width: 151rpx;
					height: 58rpx;
					background: #036045;
					border-radius: 29rpx;
				}

				.box_1_item_bom_left {
					padding-top: 10rpx;
					box-sizing: border-box;
					font-weight: 400;
					font-size: 22rpx;
					color: #343434;

					image {
						width: 33rpx;
						height: 33rpx;
						margin-left: 10rpx;
					}

					.box_1_item_bom_card {
						position: absolute;
						bottom: -160rpx;
						left: 0;
						z-index: 9;
						width: 299rpx;
						background: #FFFFFF;
						box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.1331);
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						padding: 0rpx 24rpx;
						box-sizing: border-box;

						.box_1_item_bom_card_item {
							font-size: 22rpx;
							color: #101010;
							margin: 18rpx 0;
						}
					}
				}
			}
		}
	}

	.arrowLeft {
		position: absolute;
		left: 30rpx;
		top: 100rpx;
		z-index: 9;
	}
</style>