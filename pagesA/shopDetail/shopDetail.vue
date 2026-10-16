<template>
	<view>
		<view class="detail-gallery">
			<swiper
				v-if="list1.length"
				class="detail-swiper"
				:indicator-dots="list1.length > 1"
				indicator-color="rgba(0,0,0,0.25)"
				indicator-active-color="#036045"
				circular
			>
				<swiper-item v-for="(img, idx) in list1" :key="idx">
					<image class="detail-swiper-img" :src="img" mode="aspectFit" />
				</swiper-item>
			</swiper>
			<image v-else class="detail-cover" :src="contentlist.image" mode="aspectFit"></image>
		</view>
		<view class="content">
			<view class="content_1">
				<text class="content_1_title">{{contentlist.title || ''}}</text>
				<view class="content_1_erp" v-if="contentlist.bianma || contentlist.guige || contentlist.unit_name">
					<text>{{[contentlist.bianma, contentlist.guige, contentlist.unit_name].filter(Boolean).join(' / ')}}</text>
				</view>
				<view class="content_1_label">
					<text v-for="(item,idx) in (contentlist.tags || [])" :key="idx">{{item}}</text>
				</view>
				<view class="content_1_sales">
					月售{{contentlist.count || 0 }}+
				</view>
				<view class="content_1_price">
					<view class="">
						¥{{contentlist.minprice || 0.00}}
					</view>
					<view class="" @tap="storeitemApi">
						{{contentlist.type == '2' ? '选规格' : '加入购物车'}}
					</view>
				</view>
			</view>
			<view class="content_2">
				<view class="content_2_title">
					详情
				</view>
				<view class="content_2_text">
					<u-parse :content="contentlist.json || ''"></u-parse>
				</view>
				<height :hg='80'></height>
			</view>
		</view>
		<view class="settle">
			<close :shopping_trolley_list='shopping_trolley_list' @update='order_carListApi' :seatShow='seatShow'>
			</close>
		</view>

		<addShopCar ref='addShopCar' @order='order_carListApi' :list='storeList' :type='2' :store_id="''"
			:order_id='id' @close='addshow=false' :show='addshow'></addShopCar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				addshow: false,
				list1: [],
				contentlist: {}, //页面数据
				order_id: '', //当前规格商品id
				shopping_trolley_list: {}, //购物车列表
				display: false,
				seatShow: true,
				id: ''
			};
		},
		onLoad(obj) {
			if (obj.pid) {
				uni.setStorageSync('pid', obj.pid)
			}
			if (obj.scene) {
				uni.setStorageSync('pid', obj.scene)
			}
			this.id = obj.id
			this.store_goodsDetailApi(obj.id)
			this.order_carListApi()
		},
		// 分享到好友
		onShareAppMessage(el) {
			let userinfo = uni.getStorageSync('user')
			const common = uni.getStorageSync('common') || {}
			let share_path;
			if (userinfo && userinfo.id) {
				share_path = '/pagesA/shopDetail/shopDetail?pid=' + userinfo.id + '&id=' + this.id
			} else {
				share_path = '/pagesA/shopDetail/shopDetail?id=' + this.id
			}
			return {
				title: this.contentlist.title || common.share_title || '驰友家商品',
				imageUrl: this.list1.length ? this.list1[0] : (common.share_img || ''),
				path: share_path
			}
		},
		// 分享到朋友圈
		onShareTimeline() {
			let userinfo = uni.getStorageSync('user')
			const common = uni.getStorageSync('common') || {}
			let share_query = 'id=' + this.id;
			if (userinfo && userinfo.id) share_query = 'pid=' + userinfo.id + '&id=' + this.id
			return {
				title: this.contentlist.title || common.share_title || '驰友家商品',
				imageUrl: this.list1.length ? this.list1[0] : (common.share_img || ''),
				query: share_query
			}
		},
		methods: {
			async storeitemApi() {
				if (this.contentlist.type == '2') {
					this.addshow = true
					this.$refs.addShopCar.specification(this.id)
				} else {
					this.add_joinCar()
				}

			},
			// 添加购物车
			async add_joinCar() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				let data = await this.joinCar({
					store_id: '',
					goods_id: this.id,
					count: 1,
				})
				if (data.code == 1) {
					this.order_carListApi()
				}
			},

			async store_goodsDetailApi(id) {
				let data = await this.goodsDetail({
					goods_id: id
				})
				if (data.code == 1) {
					const d = data.data
					// 轮播图：images 数组，空时用主图 image
					const imgs = (d.images || []).filter(Boolean)
					this.list1 = imgs.length ? imgs : (d.image ? [d.image] : [])
					this.contentlist = { ...d, tags: Array.isArray(d.tags) ? d.tags : (d.tags ? String(d.tags).split(',') : []) }
					this.display = true
					this.$refs.addShopCar.specification(id)
					uni.setNavigationBarTitle({
						title: this.contentlist.title //这是修改后的导航栏文字
					})
				}

			},

			// 购物车列表
			async order_carListApi() {
				let res = await this.carList()
				if (res.code == 1) {
					this.shopping_trolley_list = res.data || { count: 0, after_total: '0.00', data: [] }
				}
			},


		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
	}
	.detail-gallery {
		width: 100%;
		height: 750rpx;
		background: #fff;
	}
	.detail-swiper {
		width: 100%;
		height: 750rpx;
	}
	.detail-swiper-img,
	.detail-cover {
		width: 100%;
		height: 750rpx;
		display: block;
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	.content_1 {
		background-color: #FFFFFF;
		padding: 30rpx;

		.content_1_title {
			font-size: 32rpx;
			font-weight: 500;
			color: #353535;
		}

		.content_1_erp {
			margin-top: 16rpx;
			font-size: 24rpx;
			color: #8A8A8A;

			text {
				display: block;
				margin-bottom: 6rpx;
			}
		}

		.content_1_label {
			margin-top: 20rpx;

			text {
				background-color: #F5F5F5;
				font-size: 24rpx;
				font-weight: 400;
				color: #353535;
				padding: 5rpx 10rpx;
				margin-right: 10rpx;
			}
		}

		.content_1_sales {
			font-size: 24rpx;
			font-weight: 400;
			color: #8A8A8A;
			margin-top: 20rpx;
		}

		.content_1_price {
			display: flex;
			align-items: center;
			justify-content: space-between;

			view:nth-child(1) {
				font-size: 34rpx;
				font-weight: 600;
				color: #FC4F46;
			}

			view:nth-child(2) {
				width: 209rpx;
				height: 61rpx;
				background: #036045;
				border-radius: 13rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 61rpx;
				text-align: center;
				margin-top: 20rpx;
			}
		}
	}

	.content_2 {
		background: #FFFFFF;
		margin-top: 30rpx;
		padding: 30rpx 0;

		.content_2_title {
			font-size: 32rpx;
			font-weight: 600;
			color: #353535;
			padding: 0 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #ECECEC;
		}

		.content_2_text {
			padding: 20rpx 20rpx;
			box-sizing: border-box;
		}
	}

	.settle {
		position: fixed;
		bottom: 50rpx;
	}

	.specification {
		width: 688rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		position: relative;
		z-index: 10074;

		.specification_title {
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			color: #353535;
			margin: 0 auto;
		}

		.specification_title_1 {
			width: 95%;
			height: 504rpx;
			margin: 0 auto;

			.specification_title_1_title {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #676767;
				display: inline-block;
				padding: 20rpx 0;

			}

			.specification_title_1_content {
				display: flex;
				align-items: center;
				overflow-x: auto;
				display: -webkit-box;

				.specification_title_1_content_flex_activate {
					background: #F4FCFF !important;
					border: 1rpx solid #00B8FB !important;
					color: #00B8FB !important;
				}

				.font_sizi_1 {
					color: #00B8FB;
				}

				.font_sizi_2 {
					border-left: 1rpx solid #00B8FB;
				}

				.specification_title_1_content_flex {
					height: 63rpx;
					background: #FFFFFF;
					border-radius: 14rpx;
					border: 1rpx solid #F1F1F1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-right: 20rpx;

					view:nth-child(1) {
						font-size: 24rpx;
						font-weight: 400;
						color: #343434;
						line-height: 63rpx;
						text-align: center;
						padding: 0 10rpx;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 600;
						color: #F65329;
						line-height: 63rpx;
						border-left: 1rpx solid #F5F5F5;
						text-align: center;
						padding: 0 10rpx;
					}
				}
			}
		}

		.close {
			position: absolute;
			bottom: -150rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.selected {
		width: 688rpx;
		padding: 20rpx 0;
		background: #F5F5F5;
		margin-top: 60rpx;

		text {
			font-size: 24rpx;
			font-weight: 400;
			color: #363636;
		}

		text:nth-child(1) {
			font-size: 24rpx;
			font-weight: 400;
			color: #676767;
			padding: 0 20rpx;
			margin-left: 10rpx;
		}
	}

	.sublist {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 40rpx;

		.sublist_left {
			text:nth-child(1) {
				font-size: 28rpx;
				font-weight: 600;
				color: #363636;
			}

			text:nth-child(2) {
				font-size: 28rpx;
				font-weight: 600;
				color: #FF4000;

				text:nth-child(1) {
					font-size: 28rpx;
					font-weight: 600;
					color: #FF4000;
					font-size: 24rpx;
				}
			}
		}

		.sublist_right {
			width: 234rpx;
			height: 62rpx;
			background: #02B6FD;
			border-radius: 12rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #F3FCFF;
			line-height: 62rpx;
			text-align: center;
		}
	}

	.coupn {
		position: absolute;
		bottom: 150rpx;
		right: 0;
		z-index: 999;

		.coupn_icon {
			width: 24rpx;
			height: 24rpx;
			margin-left: 100rpx;
			margin-bottom: 10rpx;
			opacity: 0.5;
		}

		.coupn_img {
			width: 130rpx;
			height: 121rpx;
		}

		.coupn_title {
			padding: 5rpx 10rpx;
			background: #FEDD5B;
			border-radius: 18rpx;
			display: flex;
			align-items: center;
			position: relative;
			bottom: 30rpx;

			.coupn_title_text {
				font-size: 22rpx;
				font-weight: 400;
				color: #631407;
				margin-left: 10rpx;
			}
		}
	}
</style>
