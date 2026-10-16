<template>
	<view>
		<u-popup
			:show="show"
			mode="bottom"
			:round="16"
			closeable
			:safeAreaInsetBottom="true"
			@close="close"
		>
			<view class="sku-panel" @touchmove.stop.prevent>
				<view class="sku-header">
					<image
						class="sku-cover"
						:src="selectedProduct.image || defaultImage"
						mode="aspectFill"
					/>
					<view class="sku-meta">
						<text class="sku-price">¥{{ selectedProduct.price || '0.00' }}</text>
						<text class="sku-stock" v-if="selectedProduct.stock !== undefined">库存 {{ selectedProduct.stock }}</text>
						<text class="sku-label">已选：{{ selectedLabel || '请选择规格' }}</text>
					</view>
				</view>

				<scroll-view scroll-y class="sku-body">
					<view
						class="spec-group"
						v-for="(spec, specIndex) in specs"
						:key="spec.id || specIndex"
					>
						<text class="spec-title">{{ spec.name }}</text>
						<view class="spec-list">
							<view
								v-for="(opt, optIndex) in (spec.item || [])"
								:key="opt.id || optIndex"
								class="spec-chip"
								:class="{ 'spec-chip--active': selectedMap[specIndex] == opt.id }"
								hover-class="spec-chip--hover"
								:data-spec-index="specIndex"
								:data-opt-index="optIndex"
								@tap="onPickSpec"
							>
								<image
									v-if="opt.image"
									class="spec-chip-img"
									:src="opt.image"
									mode="aspectFill"
								/>
								<text class="spec-chip-text">{{ opt.name }}</text>
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="sku-footer">
					<button class="sku-btn" hover-class="sku-btn--hover" @tap="addToCart">加入购物车</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'addShopCar',
		props: {
			show: { type: Boolean, default: false },
			order_id: { type: [String, Number], default: '' },
			store_id: { type: [String, Number], default: '' },
			is_shop: { type: Boolean, default: false }
		},
		data() {
			return {
				goodsId: '',
				defaultImage: '',
				specs: [],
				products: [],
				selectedMap: {},
				selectedProduct: {}
			}
		},
		computed: {
			selectedLabel() {
				const names = []
				this.specs.forEach((spec, index) => {
					const pickedId = this.selectedMap[index]
					const found = (spec.item || []).find((opt) => String(opt.id) === String(pickedId))
					if (found) {
						names.push(found.name)
					}
				})
				return names.join(' / ')
			},
			selectedKey() {
				const ids = []
				this.specs.forEach((spec, index) => {
					const pickedId = this.selectedMap[index]
					if (pickedId) {
						ids.push(String(pickedId))
					}
				})
				return ids.join('_')
			}
		},
		methods: {
			async specification(goodsId) {
				this.goodsId = String(goodsId || this.order_id || '')
				if (!this.goodsId) {
					return
				}

				const res = await this.storeitem({ goods_id: this.goodsId })
				if (res.code !== 1 || !res.data) {
					return
				}

				let payload = res.data
				let rawSpecs = []
				if (Array.isArray(payload)) {
					rawSpecs = payload
					this.products = []
				} else {
					rawSpecs = payload.specs || []
					this.products = payload.products || []
				}
				this.specs = this.normalizeSpecs(rawSpecs)

				this.selectedMap = {}
				this.specs.forEach((spec, index) => {
					const first = spec.item && spec.item[0]
					if (first) {
						this.$set(this.selectedMap, index, first.id)
					}
				})

				const firstImg = this.specs[0] && this.specs[0].item && this.specs[0].item[0]
				this.defaultImage = firstImg && firstImg.image ? firstImg.image : ''
				this.refreshSelectedProduct()
			},
			normalizeSpecs(list) {
				if (!Array.isArray(list)) {
					return []
				}
				return list.map((spec) => {
					let items = spec.item
					if (!Array.isArray(items)) {
						items = items ? Object.values(items) : []
					}
					return {
						...spec,
						item: items
					}
				})
			},
			onPickSpec(e) {
				const ds = (e && e.currentTarget && e.currentTarget.dataset) || {}
				const specIndex = parseInt(ds.specIndex, 10)
				const optIndex = parseInt(ds.optIndex, 10)
				if (isNaN(specIndex) || isNaN(optIndex)) {
					return
				}
				const spec = this.specs[specIndex]
				if (!spec || !Array.isArray(spec.item)) {
					return
				}
				const opt = spec.item[optIndex]
				if (!opt) {
					return
				}
				this.$set(this.selectedMap, specIndex, opt.id)
				if (opt.image) {
					this.defaultImage = opt.image
				}
				this.refreshSelectedProduct()
			},
			refreshSelectedProduct() {
				const key = this.selectedKey
				if (!key) {
					this.selectedProduct = {}
					return
				}

				let product = this.products.find((p) => String(p.key) === key)
				if (!product) {
					const sortedKey = key.split('_').sort().join('_')
					product = this.products.find((p) => {
						const pk = String(p.key).split('_').sort().join('_')
						return pk === sortedKey
					})
				}

				if (product) {
					this.selectedProduct = { ...product }
					return
				}

				this.selectedProduct = { price: '', image: this.defaultImage }
				this.fetchPriceFallback(key)
			},
			async fetchPriceFallback(key) {
				const res = await this.storeitemPrice({
					goods_id: this.goodsId,
					spu_id: key
				})
				if (res.code === 1 && res.data) {
					this.selectedProduct = {
						key,
						price: res.data.price,
						image: res.data.image || this.defaultImage,
						stock: res.data.stock
					}
				}
			},
			async addToCart() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({ url: '/pages/login/login' })
					return
				}

				const key = this.selectedKey
				if (!this.goodsId || !key) {
					this.showToast('请选择完整规格')
					return
				}

				const payload = {
					store_id: this.store_id,
					goods_id: this.goodsId,
					spu_id: key,
					count: 1
				}

				const res = this.is_shop
					? await this.storejoinCar(payload)
					: await this.joinCar(payload)

				if (res.code === 1) {
					setTimeout(() => this.$emit('order'), 300)
					this.close()
				}
				this.showToast(res.msg)
			},
			close() {
				this.goodsId = ''
				this.specs = []
				this.products = []
				this.selectedMap = {}
				this.selectedProduct = {}
				this.defaultImage = ''
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sku-panel {
		background: #fff;
		border-radius: 24rpx 24rpx 0 0;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.sku-header {
		display: flex;
		padding: 28rpx 28rpx 12rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.sku-cover {
		width: 160rpx;
		height: 160rpx;
		border-radius: 12rpx;
		background: #f5f5f5;
		flex-shrink: 0;
	}

	.sku-meta {
		flex: 1;
		margin-left: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.sku-price {
		font-size: 40rpx;
		font-weight: 700;
		color: #e54d42;
		line-height: 1.3;
	}

	.sku-stock {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #909399;
	}

	.sku-label {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #666;
		line-height: 1.5;
		word-break: break-all;
	}

	.sku-body {
		flex: 1;
		max-height: 52vh;
		padding: 8rpx 28rpx 20rpx;
		box-sizing: border-box;
	}

	.spec-group {
		margin-top: 24rpx;
	}

	.spec-title {
		display: block;
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 16rpx;
	}

	.spec-list {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
	}

	.spec-chip {
		min-height: 64rpx;
		padding: 12rpx 24rpx;
		border-radius: 12rpx;
		border: 2rpx solid #e8e8e8;
		background: #fafafa;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.spec-chip--hover {
		opacity: 0.85;
	}

	.spec-chip--active {
		border-color: #036045;
		background: #ecf7f5;
	}

	.spec-chip-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
		margin-bottom: 8rpx;
		background: #eee;
	}

	.spec-chip-text {
		font-size: 26rpx;
		color: #333;
		line-height: 1.4;
		text-align: center;
	}

	.spec-chip--active .spec-chip-text {
		color: #036045;
		font-weight: 600;
	}

	.sku-footer {
		padding: 20rpx 28rpx calc(20rpx + env(safe-area-inset-bottom));
		border-top: 1rpx solid #f0f0f0;
		background: #fff;
	}

	.sku-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		background: #036045;
		color: #fff;
		font-size: 32rpx;
		font-weight: 600;
		border: none;
		padding: 0;
		margin: 0;
	}

	.sku-btn::after {
		border: none;
	}

	.sku-btn--hover {
		opacity: 0.9;
	}
</style>
