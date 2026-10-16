<template>
	<view class="page">
		<u-sticky zIndex="9">
			<view class="search-bar">
				<u-search
					v-model="keyword"
					:showAction="false"
					placeholder="请输入搜索商品"
					@search="goodsSearchApi"
					@clear="onSearchClear"
				></u-search>
			</view>
		</u-sticky>

		<view class="header-bg">
			<image class="bg-img" :src="categoryBgUrl" mode="widthFix"></image>
			<view class="category-nav">
				<view class="category-grid">
					<view class="category-item"
						:class="{active: leftCur==index, 'is-all': item.id === 0}"
						@click="setright(index)"
						v-for="(item,index) in list"
						:key="item.id">
						<image
							class="category-img"
							:src="categoryImg(item)"
							mode="aspectFill"
						/>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-list">
			<empty v-if="rightList.length<=0 && !goodsLoading"></empty>
			<view v-else class="goods-grid">
				<view v-for="item in rightList" :key='item.id' class="goods-item"
					@click="routerTo('/pagesA/shopDetail/shopDetail?id='+item.id)">
					<image class="goods-img" :src="item.image" mode="aspectFill"></image>
					<view class="goods-info">
						<view class="goods-title">{{item.title}}</view>
						<view class="goods-erp" v-if="item.bianma || item.guige">
							{{[item.bianma, item.guige].filter(Boolean).join(' / ')}}
						</view>
						<view class="goods-price">￥{{item.minprice}}</view>
					</view>
					<view class="add-btn" @click.stop="storeitemApi(item.id,item.type)">
						<u-icon name="plus-circle-fill" color="#036045" size="44"></u-icon>
					</view>
				</view>
			</view>
			<view class="load-tip" style="padding: 24rpx 0;" v-if="goodsLoading">加载中...</view>
			<view class="load-tip" style="padding: 24rpx 0;" v-else-if="!goodsHasMore && rightList.length">没有更多了</view>
		</view>

		<close :shopping_trolley_list='shopping_trolley_list' @update='order_carListApi' @register='register'
			:addAdish='addAdish' :seatShow='seatShow'>
		</close>

		<addShopCar ref='addShopCar' @order='order_carListApi' :list='storeList' :type='2' :store_id="''"
			:order_id='order_id' @close='addshow=false' :show='addshow'></addShopCar>
	</view>
</template>

<script>
	import config from '@/config.js'

	export default {
		data() {
			return {
				categoryBgPath: '/uploads/20260603/bc8921bffdcdb06f39b04667a279b5a1.png',
				allCategoryImage: '/uploads/20260603/5ef66cafc92d8c904cd52241f93c143d.png',
				shopping_trolley_list: {},
				order_id: '',
				list: [],
				leftCur: -1,
				addshow: false,
				rightList: [],
				storeList: [],
				keyword: "",
				currentTypeId: 0,
				goodsPageNum: 1,
				goodsHasMore: true,
				goodsLoading: false,
				searchMode: false,
				goodsLimit: 20
			};
		},
		computed: {
			categoryBgUrl() {
				return this.previewUrl(this.categoryBgPath)
			}
		},
		onLoad(e) {
			if (e.pid) {
				uni.setStorageSync('pid', e.pid)
			}
			if (e.scene) {
				uni.setStorageSync('pid', e.scene)
			}
			this.loadCategoriesAndGoods()
			if (this.vuex_token) {
				this.order_carListApi()
			}
		},
		onShow() {
			if (this.vuex_token) {
				this.order_carListApi()
			}
		},
		onShareAppMessage(el) {
			let userinfo = uni.getStorageSync('user')
			const common = uni.getStorageSync('common') || {}
			const shareImg = /cfe5aab4a3a8ca8b3686203bc2eaa076\.png/i.test(common.share_img || '') ? '' : (common.share_img || '')
			let share_path;
			if (userinfo && userinfo.id) {
				share_path = '/pages/home/home?pid=' + userinfo.id
			} else {
				share_path = '/pages/home/home'
			}
			return {
				title: (common.share_title || '驰友家') + '商城',
				imageUrl: shareImg,
				path: share_path
			}
		},
			onShareTimeline() {
			let userinfo = uni.getStorageSync('user')
			const common = uni.getStorageSync('common') || {}
			const shareImg = /cfe5aab4a3a8ca8b3686203bc2eaa076\.png/i.test(common.share_img || '') ? '' : (common.share_img || '')
			let share_path;
			if (userinfo && userinfo.id) {
				share_path = 'pid=' + userinfo.id
			} else {
				share_path = ''
			}
			return {
				title: (common.share_title || '驰友家') + '商城',
				imageUrl: shareImg,
				query: share_path
			}
		},
		methods: {
			previewUrl(path) {
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				const base = config.serverIp.replace(/\/?$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return base + p
			},
			categoryImg(item) {
				if (!item) return ''
				const path = item.image || ''
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				return this.previewUrl(path)
			},
			onSearchClear() {
				this.keyword = ''
				this.searchMode = false
				this.leftCur = 0
				this.currentTypeId = 0
				this.goodsPageNum = 1
				this.goodsHasMore = true
				this.loadGoodsPage(false)
			},
			async goodsSearchApi() {
				if (!this.keyword.trim()) {
					this.onSearchClear()
					return
				}
				let res = await this.goodsSearch({
					search: this.keyword
				})
				if (res.code == 1) {
					this.searchMode = true
					this.goodsHasMore = false
					this.leftCur = null
					this.rightList = res.data || []
				}
			},
			async add_joinCar() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				let data = await this.joinCar({
					store_id: '',
					goods_id: this.order_id,
					count: 1,
				})
				if (data.code == 1) {
					this.order_carListApi()
				}
			},
			async order_carListApi() {
				let res = await this.carList()
				if (res.code == 1) {
					this.shopping_trolley_list = res.data
				}
			},
			async storeitemApi(goods_id, type) {
				console.log('goods_id', goods_id);
				this.order_id = goods_id
				if (type == '2') {
					this.$refs.addShopCar.specification(goods_id)
					this.addshow = true
				} else {
					this.add_joinCar()
				}
			},
			setright(index) {
				this.searchMode = false
				this.leftCur = index
				this.currentTypeId = this.list[index].id
				this.goodsPageNum = 1
				this.goodsHasMore = true
				this.loadGoodsPage(false)
			},

			onReachBottom() {
				if (this.searchMode || this.goodsLoading || !this.goodsHasMore) {
					return
				}
				this.loadGoodsPage(true)
			},

			async loadCategoriesAndGoods() {
				const res = await this.storeinfo({})
				if (res.code != 1) {
					return
				}
				const rawList = res.data || []
				this.list = [
					{
						id: 0,
						name: '全部',
						image: this.previewUrl(this.allCategoryImage),
						goods: []
					},
					...rawList.map(c => ({
						...c,
						goods: []
					}))
				]
				this.leftCur = 0
				this.currentTypeId = 0
				this.goodsPageNum = 1
				this.goodsHasMore = true
				await this.loadGoodsPage(false)
			},

			async loadGoodsPage(append) {
				if (this.goodsLoading) {
					return
				}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F3F8F6;
	}

	.page {
		min-height: 100vh;
	}

	.search-bar {
		padding: 16rpx 24rpx 20rpx;
		background: #fff;
		box-sizing: border-box;
	}

	.header-bg {
		position: relative;
		width: 100%;
		line-height: 0;
	}

	.bg-img {
		width: 100%;
		display: block;
	}

	.category-nav {
		position: absolute;
		left: 20rpx;
		right: 20rpx;
		bottom: 52rpx;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 6rpx;
		row-gap: 0;
	}

	/* 分类图统一 203×137 比例，各按钮显示尺寸一致 */
	.category-item {
		width: 100%;
		height: 0;
		padding-bottom: 67.4877%;
		position: relative;
		overflow: hidden;
		line-height: 0;
		font-size: 0;
	}

	/* 仅第一排与第二排之间收紧行距 */
	.category-item:nth-child(-n+5) {
		margin-bottom: -14rpx;
	}

	.category-img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	/* 「全部」图上下留白多，放大裁切后与寸数按钮视觉一致 */
	.category-item.is-all .category-img {
		width: 106%;
		height: 77%;
		left: -3%;
		top: 6%;
	}

	.category-item.active .category-img {
		opacity: 0.88;
	}

	.goods-list {
		padding: 0 24rpx 24rpx;
	}

	.goods-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goods-item {
		width: 342rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.goods-img {
		width: 100%;
		height: 280rpx;
		background: #f0f0f0;
	}

	.goods-info {
		padding: 16rpx 16rpx 20rpx;
	}

	.goods-title {
		font-size: 26rpx;
		color: #333;
		font-weight: 600;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.goods-erp {
		font-size: 20rpx;
		color: #999;
		margin-top: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.goods-price {
		font-size: 30rpx;
		color: #036045;
		font-weight: 700;
		margin-top: 12rpx;
	}

	.add-btn {
		position: absolute;
		bottom: 16rpx;
		right: 16rpx;
	}

	.load-tip {
		text-align: center;
		font-size: 24rpx;
		color: #999;
	}
</style>
