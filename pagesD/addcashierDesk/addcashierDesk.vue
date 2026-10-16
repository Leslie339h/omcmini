<template>
	<view>
		<u-sticky>
			<view class="head">
				<view class="head_top d-flex a-center j-sb">
					<view class="head_top_left">
						<view class="f-size-32 f-600 d-flex a-center">
							<span class="mr-14">{{storeInfo.title}}</span>
						</view>
						<view class="f-size-22 mt-4">
							欢迎光临，很高兴为您服务
						</view>
					</view>
				</view>
			</view>
		</u-sticky>

		<view class="scroll_box d-flex  j-sb">
			<view class="scroll_box_left">
				<scroll-view scroll-y="true"
					style="height:calc(100vh - 120rpx);padding-bottom: 150rpx;box-sizing: border-box;">
					<view @click="setright(index)" v-for="(item,index) in list" class="scroll_box_left_item"
						:key="index">
						<view class="scroll_box_left_item_tag" v-if="leftCur==index"></view>
						<view class="scroll_box_left_item_tag_text" :class="leftCur==index?'active':''">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="scroll_box_right" style="height:calc(100vh - 300rpx);">
				<empty v-if="rightList.length<=0 && !goodsLoading"></empty>
				<scroll-view scroll-y="true" style="height:calc(100vh - 310rpx);" v-else lower-threshold="80"
					@scrolltolower="onGoodsScrolltolower">
					<view v-for="item in rightList" :key='item.id' class="scroll_box_right_item d-flex a-center j-sb"
						@click="routerTo('/pagesA/shopDetail/shopDetail?id='+item.id)">
						<image class="shop_img" :src="item.image" mode="aspectFill"></image>
						<view class="scroll_box_right_item_center">
							<view class="beyond-two f-size-24 f-bold mb-10">
								{{item.title}}
							</view>
							<view class="tags_box d-flex a-center  mb-10">
								<view class="tags_box_item mr-6" v-for="(item1,index1) in item.tags">
									{{item1}}
								</view>
							</view>
							<view class="f-size-32 f-bold">
								￥{{item.minprice}}
							</view>
						</view>
						<view class="" @click.stop="storeitemApi(item.id)">
							<u-icon name="plus-circle-fill" color="#036045" size="30"></u-icon>
						</view>
					</view>
					<view class="f-size-22 color-9 txt-center" style="padding: 24rpx 0;" v-if="goodsLoading">加载中...</view>
					<view class="f-size-22 color-9 txt-center" style="padding: 24rpx 0;" v-else-if="!goodsHasMore && rightList.length">没有更多了</view>
					<view class="" style="height: 100rpx;">

					</view>
				</scroll-view>
			</view>
		</view>


		<close :is_shop='true' :shopping_trolley_list='shopping_trolley_list' @update='order_carListApi'
			@register='register' :addAdish='addAdish' :seatShow='seatShow'>
		</close>

		<addShopCar :is_shop='true' ref='addShopCar' @order='order_carListApi' :list='storeList' :type='2'
			:store_id='storeInfo.id' :order_id='order_id' @close='addshow=false' :show='addshow'></addShopCar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopping_trolley_list: {}, //购物车列表
				activate_data: 2,
				order_id: '',
				current: 0,
				tablist: [{
					name: '经典菜单',
				}, {
					name: '我的常点',
				}],
				list: [],
				leftCur: 0,
				addshow: false,
				rightList: [],
				storeList: [], //规格列表
				pointList: [], //常点
				storeInfo: {},
				currentTypeId: 0,
				goodsPageNum: 1,
				goodsHasMore: true,
				goodsLoading: false,
				goodsLimit: 20
			};
		},
		onLoad() {
			this.store_authenticationApi()
		},

		methods: {
			async default_storeApi(id) {
				let res = await this.default_store({
					store_id: id
				})
				if (res.code == 1) {
					this.storeinfo({
						store_id: id
					}).then(res => {
						if (res.code != 1) return
						const rawList = res.data || []
						this.list = [{
							name: '全部',
							id: 0,
							goods: []
						}, ...rawList.map(c => ({
							...c,
							goods: []
						}))]
						this.leftCur = 0
						this.currentTypeId = 0
						this.goodsPageNum = 1
						this.goodsHasMore = true
						this.loadGoodsPage(false)
					})
					this.order_carListApi()
				}

			},
			// 购物车列表
			async order_carListApi() {
				let res = await this.storecarList()
				if (res.code == 1) {
					this.shopping_trolley_list = res.data
				}
			},
			// 店铺数据
			async store_authenticationApi() {
				let res = await this.store_authentication({
					type: 'view'
				})
				if (res.code == 1) {
					this.storeInfo = res.data
					this.default_storeApi(res.data.id)
				}
			},
			// 添加购物车
			async add_joinCar(item) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				let str = ''
				// 多规格
				item.tags.forEach((res, index) => {
					if (index == (item.tags - 1)) {
						str += res.id
					} else {
						str += res.id + '_'
					}
				})
				let data = await this.joinCar({
					store_id: this.vuex_shop_info.id,
					goods_id: item.id,
					spu_id: str,
					count: 1,
				})
				if (data.code == 1) {
					this.order_carListApi()
				}
				this.showToast(data.msg)
			},



			async storeitemApi(goods_id) {
				console.log('goods_id', goods_id);
				this.order_id = goods_id
				this.$refs.addShopCar.specification(goods_id)
				this.addshow = true
			},
			setright(index) {
				this.leftCur = index
				this.currentTypeId = this.list[index].id
				this.goodsPageNum = 1
				this.goodsHasMore = true
				this.loadGoodsPage(false)
			},

			onGoodsScrolltolower() {
				if (this.goodsLoading || !this.goodsHasMore) return
				this.loadGoodsPage(true)
			},

			async loadGoodsPage(append) {
				if (this.goodsLoading) return
				this.goodsLoading = true
				const nextPage = append ? this.goodsPageNum + 1 : 1
				try {
					const res = await this.storeGoodsPage({
						type_id: this.currentTypeId,
						page: nextPage,
						limit: this.goodsLimit
					})
					if (res.code == 1 && res.data) {
						const d = res.data
						const arr = d.list || []
						if (append) {
							this.rightList = [...this.rightList, ...arr]
						} else {
							this.rightList = arr
						}
						this.goodsPageNum = d.current_page || nextPage
						this.goodsHasMore = (d.current_page || 1) < (d.last_page || 1)
					}
				} finally {
					this.goodsLoading = false
				}
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}

	.head {
		width: 750rpx;
		height: 120rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 0rpx;

		.head_top {
			padding: 20rpx 30rpx 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F4F4F4;

			.head_top_left {}

			image {
				width: 62rpx;
				height: 62rpx;
			}
		}
	}

	.scroll_box {
		.scroll_box_left {
			width: 188rpx;
			height: calc(100vh - 324rpx);

			.active {
				background: #E5E5E5 !important;
				color: #232323 !important;
				font-weight: 600;
				border-radius: 0rpx 40rpx 40rpx 0rpx;
			}

			.scroll_box_left_item {
				width: 152rpx;
				height: 70rpx;
				margin-top: 48rpx;
				text-align: center;
				position: relative;

				.scroll_box_left_item_tag_text {
					line-height: 74rpx;
					color: #424242;
					font-size: 24rpx;
				}

				.scroll_box_left_item_tag {
					width: 14rpx;
					height: 24rpx;
					background: #036045;
					border-radius: 0rpx 40rpx 40rpx 0rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.scroll_box_right {
			width: 532rpx;
			height: calc(100vh - 400rpx);
			background: #FFFFFF;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			margin-right: 20rpx;
			margin-top: 28rpx;
			padding: 0rpx 24rpx 0 12rpx;
			box-sizing: border-box;

			.scroll_box_right_item {
				margin-top: 48rpx;

				.shop_img {
					width: 126rpx;
					height: 126rpx;
					border-radius: 10rpx;
				}

				.scroll_box_right_item_center {
					width: 262rpx;

					.tags_box_item {
						font-weight: 400;
						font-size: 20rpx;
						color: #036045;
						padding: 4rpx 16rpx;
						box-sizing: border-box;
						background: #ECF3FF;
						border-radius: 6rpx 6rpx 6rpx 6rpx;
					}
				}
			}

		}
	}



	.often_box {
		padding: 36rpx 30rpx;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(2, 336rpx);
		row-gap: 20rpx;
		column-gap: 10rpx;
		justify-content: space-between;

		.often_item {
			width: 336rpx;
			background: #FFFFFF;
			border-radius: 12rpx 12rpx 12rpx 12rpx;
			position: relative;
			padding: 0 20rpx 20rpx;

			.tags_box_item {
				font-weight: 400;
				font-size: 20rpx;
				color: #036045;
				padding: 4rpx 16rpx;
				box-sizing: border-box;
				background: #ECF3FF;
				border-radius: 6rpx 6rpx 6rpx 6rpx;
			}

			.often_item_bg {
				width: 336rpx;
				height: 94rpx;
				background: linear-gradient(0deg, rgba(49, 232, 179, 0) 0%, rgba(74, 255, 203, 0.24) 99%);
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}

			.often_item_title {
				font-weight: 400;
				font-size: 24rpx;
				color: #3D3D3D;
			}

			.often_item_price {
				font-weight: 600;
				font-size: 32rpx;
				color: #E22626;
			}

			.often_item_btn {
				width: 290rpx;
				height: 48rpx;
				background: #036045;
				border-radius: 518rpx 518rpx 518rpx 518rpx;
				font-weight: 600;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 48rpx;
				text-align: center;
				margin: 0 auto;
			}

			image {
				border-radius: 50%;
				width: 126rpx;
				height: 126rpx;
				border: 2rpx solid #FFFFFF;
				margin: -30rpx auto 0;
			}
		}
	}
</style>