<template>
	<view v-show="pageShow && int">
		<view class="option">
			<view class="store_block">
				<view class="store_title">选择安装门店</view>
				<view class="f-size-22 color-9 mb-20">已按与您当前位置的距离从近到远排序；可不选，下单后由后台指派</view>
				<view class="defer_store_row" :class="{ active: deferStore }" @tap="setDeferStore">
					<text>暂不选择，由客服后台指派安装门店</text>
					<text class="store_tag" v-if="deferStore">已选</text>
				</view>
				<view v-if="storeLoading" class="f-size-26 color-9">门店加载中…</view>
				<view v-else-if="!storeRows.length" class="f-size-26 color-9">暂无可用门店，请稍后再试或使用「后台指派」</view>
				<scroll-view v-else scroll-y class="store_scroll">
					<view v-for="s in storeRows" :key="s.id" class="store_row" :class="{ active: !deferStore && selectedStoreId === s.id }"
						@tap="pickStore(s.id)">
						<view class="d-flex j-sb a-center">
							<text class="f-size-30 f-600">{{ s.title }}</text>
							<view class="store_tag" v-if="!deferStore && selectedStoreId === s.id">已选</view>
						</view>
						<view class="f-size-22 color-9 mt-8">{{ s.address || '' }}</view>
						<view class="f-size-22 color-6 mt-6" v-if="s.distance">距离约 {{ s.distance }}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="card_2">
			<view class="card_2_box d-flex j-sb mb-20" v-for="item in int.data" :key="item.id">
				<image class="card_2_box_img" :src="item.image" mode="aspectFill"></image>
				<view class="card_2_box_center d-flex flex-column j-sb">
					<view class="f-size-28 color-3d beyond-two">
						{{ item.title }}
					</view>
					<view class="color-9 f-size-22">
						{{ item.item_name }}
					</view>
				</view>
				<view class="">
					<view class="f-size-28 color-3d f-600 mt-6 text-right">
						¥{{ item.price }}
					</view>
					<view class="color-9 f-size-22 mt-10 text-right">
						x{{ item.count }}
					</view>
				</view>
			</view>
			<view class="card_2_price d-flex j-sb">
				<view class=""> </view>
				<view class=""><span>合计￥</span><span>{{ int.after_total }}</span></view>
			</view>
			<view v-if="coupon_id > 0 && couponDeduction > 0" class="f-size-22 color-9 text-right mt-10">
				商品￥{{ int.total }}，优惠券已减￥{{ couponDeduction }}
			</view>
		</view>

		<view class="card_3 d-flex a-center j-sb coupon_row" @tap="openCouponPicker">
			<view class="card_3_left f-size-26">
				优惠券
			</view>
			<view class="d-flex a-center">
				<text class="f-size-26 color-9 mr-10">{{ couponSummary }}</text>
				<text class="color-9 f-size-28">›</text>
			</view>
		</view>

		<view class="card_3 d-flex a-center j-sb">
			<view class="card_3_left f-size-26">
				备注
			</view>
			<view class="d-flex a-center ">
				<input style="text-align: right;" type="text" placeholder="请输入您的备注要求" v-model="remark" />
			</view>
		</view>
		<view class="fiexed d-flex a-center j-sb">
			<view class="f-size-24"><span>合计</span><span class="f-size-28 color-ff3767">￥{{ int.after_total }}</span>
			</view>
			<view class="fiexed_btn" @click="openpay"> 立即支付</view>
		</view>
		<u-popup :show="couponPickerShow" mode="bottom" :round="20" :safeAreaInsetBottom="true" @close="couponPickerShow = false">
			<view class="coupon_popup">
				<view class="coupon_popup_title">选择优惠券</view>
				<scroll-view scroll-y class="coupon_popup_scroll">
					<view class="coupon_popup_row d-flex j-sb a-center" :class="{ active: coupon_id === 0 }" @tap="applyCoupon(0)">
						<text class="f-size-28">不使用优惠券</text>
						<text v-if="coupon_id === 0" class="coupon_check">✓</text>
					</view>
					<view
						v-for="c in usableCoupons"
						:key="c.id"
						class="coupon_popup_row d-flex j-sb a-start"
						:class="{ active: coupon_id === Number(c.id) }"
						@tap="applyCoupon(Number(c.id))"
					>
						<view class="flex-1">
							<text class="f-size-28 f-600 color-ff3767">减¥{{ c.used_amount }}</text>
							<text class="f-size-22 color-9 ml-12">满{{ c.with_amount }}可用</text>
							<view class="f-size-26 mt-8">{{ c.title }}</view>
						</view>
						<text v-if="coupon_id === Number(c.id)" class="coupon_check mt-4">✓</text>
					</view>
					<view v-if="usableCoupons.length === 0" class="coupon_popup_empty f-size-26 color-9">暂无可用优惠券</view>
				</scroll-view>
			</view>
		</u-popup>

		<payPop :pageurl="pageurl" :createObj="createObj" :popShow="popShow" @close="popShow = false"></payPop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popShow: false,
				int: null,
				remark: '',
				createObj: {},
				pageurl: '/pages/order/order',
				pageShow: false,
				storeRows: [],
				storeLoading: true,
				selectedStoreId: null,
				deferStore: false,
				coupon_id: 0,
				usableCoupons: [],
				couponPickerShow: false
			};
		},
		computed: {
			couponSummary() {
				if (!this.int) return '';
				if (this.coupon_id > 0) {
					const c = this.usableCoupons.find((x) => Number(x.id) === this.coupon_id);
					if (c) return `减¥${c.used_amount} · ${c.title}`;
					return '已选优惠券';
				}
				const n = this.usableCoupons.length;
				if (n > 0) return `${n}张可用`;
				return '暂无可用';
			},
			couponDeduction() {
				if (!this.int || !this.coupon_id) return 0;
				const t = parseFloat(this.int.total);
				const a = parseFloat(this.int.after_total);
				if (isNaN(t) || isNaN(a)) return 0;
				const d = (t - a).toFixed(2);
				return parseFloat(d) > 0 ? d : 0;
			}
		},
		onLoad() {
			this.order_carListApi()
			this.loadStoresNear()
		},

		methods: {
			openpay() {
				const sid = this.deferStore ? 0 : this.selectedStoreId
				if (!this.deferStore && !sid) {
					return this.showToast('请选择安装门店，或勾选由后台指派')
				}
				this.createObj = {
					dc_type: 1,
					orderType: 2,
					storeId: sid,
					addressId: 0,
					remark: this.remark,
					coupon_id: this.coupon_id || 0
				}
				this.popShow = true
			},
			setDeferStore() {
				this.deferStore = true
				this.selectedStoreId = null
			},
			pickStore(id) {
				this.deferStore = false
				this.selectedStoreId = id
			},
			loadStoresNear() {
				this.storeLoading = true
				uni.getLocation({
					type: 'gcj02',
					success: (loc) => {
						uni.setStorageSync('address', {
							latitude: loc.latitude,
							longitude: loc.longitude
						})
						this.fetchStoreList()
					},
					fail: () => {
						this.fetchStoreList()
					}
				})
			},
			async fetchStoreList() {
				try {
					const res = await this.storeList({
						page: 1,
						limit: 80
					})
					if (res.code == 1 && res.data) {
						const rows = res.data.rows || []
						this.storeRows = rows
						if (rows.length && this.selectedStoreId == null && !this.deferStore) {
							this.selectedStoreId = rows[0].id
						}
					}
				} finally {
					this.storeLoading = false
				}
			},
			async order_carListApi() {
				const res = await this.carList({ coupon_id: this.coupon_id || 0 });
				if (res.code == 1) {
					this.int = res.data;
					this.pageShow = true;
					await this.fetchUsableCoupons();
				}
			},
			openCouponPicker() {
				if (!this.int) return;
				this.couponPickerShow = true;
			},
			async fetchUsableCoupons() {
				if (!this.int || this.int.total === undefined || this.int.total === '') {
					this.usableCoupons = [];
					return;
				}
				const res = await this.couponUsable({ price: this.int.total });
				if (res.code != 1) {
					this.usableCoupons = [];
					return;
				}
				const list = res.data;
				this.usableCoupons = Array.isArray(list) ? list : [];
				if (this.coupon_id > 0 && !this.usableCoupons.some((c) => Number(c.id) === this.coupon_id)) {
					this.coupon_id = 0;
					const res2 = await this.carList({ coupon_id: 0 });
					if (res2.code == 1) this.int = res2.data;
				}
			},
			async applyCoupon(id) {
				const nextId = id || 0;
				if (nextId === this.coupon_id) {
					this.couponPickerShow = false;
					return;
				}
				const prev = this.coupon_id;
				this.coupon_id = nextId;
				const res = await this.carList({ coupon_id: nextId });
				if (res.code == 1) {
					const payTotal = parseFloat(res.data.total);
					const payAfter = parseFloat(res.data.after_total);
					if (
						nextId > 0 &&
						!isNaN(payTotal) &&
						!isNaN(payAfter) &&
						payAfter >= payTotal - 0.0001
					) {
						this.coupon_id = prev;
						this.showToast('优惠券不可用');
						const roll = await this.carList({ coupon_id: prev });
						if (roll.code == 1) this.int = roll.data;
						return;
					}
					this.int = res.data;
					this.couponPickerShow = false;
				} else {
					this.coupon_id = prev;
					this.showToast(res.msg || '优惠券不可用');
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F8F8F8;
		padding: 24rpx;
		box-sizing: border-box;
		padding-bottom: 160rpx;
	}

	.store_block {
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 28rpx 24rpx;
		box-sizing: border-box;
	}

	.store_title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 12rpx;
	}

	.store_scroll {
		max-height: 520rpx;
	}

	.store_row {
		padding: 22rpx 20rpx;
		border: 2rpx solid #eee;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		background: #fafafa;

		&.active {
			border-color: #036045;
			background: #f0faf6;
		}
	}

	.defer_store_row {
		padding: 22rpx 20rpx;
		border: 2rpx dashed #ccc;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #333;

		&.active {
			border-color: #036045;
			background: #f0faf6;
		}
	}

	.store_tag {
		font-size: 22rpx;
		color: #036045;
		border: 1rpx solid #036045;
		padding: 4rpx 16rpx;
		border-radius: 8rpx;
	}

	.card_3 {
		font-weight: 400;
		font-size: 26rpx;
		color: #313131;
		line-height: 36rpx;
		padding: 26rpx 22rpx;
		box-sizing: border-box;
		background-color: #fff;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;

		&.coupon_row {
			margin-bottom: 24rpx;
		}
	}

	.coupon_popup {
		padding: 28rpx 24rpx 32rpx;
		box-sizing: border-box;

		.coupon_popup_title {
			font-size: 32rpx;
			font-weight: 600;
			text-align: center;
			margin-bottom: 24rpx;
			color: #333;
		}

		.coupon_popup_scroll {
			max-height: 60vh;
		}

		.coupon_popup_row {
			padding: 24rpx 20rpx;
			border: 2rpx solid #eee;
			border-radius: 16rpx;
			margin-bottom: 16rpx;
			background: #fafafa;

			&.active {
				border-color: #036045;
				background: #f0faf6;
			}
		}

		.coupon_check {
			font-size: 32rpx;
			color: #036045;
			flex-shrink: 0;
		}

		.coupon_popup_empty {
			text-align: center;
			padding: 40rpx 0;
		}
	}

	.option {
		background: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 24rpx;
	}

	.card_2 {
		margin: 28rpx 0;
		padding: 20rpx;
		box-sizing: border-box;
		width: 703rpx;
		background: #FFFFFF;
		border-radius: 18rpx 18rpx 18rpx 18rpx;

		.card_2_box {
			.card_2_box_img {
				border-radius: 10rpx;
				border: 1rpx solid #eee;
				width: 103rpx;
				height: 106rpx;
			}

			.card_2_box_center {
				width: 450rpx;
			}
		}

		.card_2_price {
			padding-top: 16rpx;
			margin-top: 16rpx;
			border-top: 1rpx solid #eee;
			font-weight: 600;
		}
	}

	.fiexed {
		background-color: #fff;
		width: 750rpx;
		height: 127rpx;
		background: #FFFFFF;
		border-radius: 8rpx 8rpx 0rpx 0rpx;
		padding: 22rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		.fiexed_btn {
			width: 207rpx;
			height: 82rpx;
			background: #036045;
			border-radius: 41rpx;
			font-size: 28rpx;
			color: #F6FCFF;
			line-height: 82rpx;
			text-align: center;
		}
	}
</style>
