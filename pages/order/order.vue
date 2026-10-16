<template>
	<view>
		<u-sticky>
			<view class="head">
				<u-tabs :list="list1" @click="tabclick" :current="tabIndex" :activeStyle="{
			    color: '#036045',
			    fontWeight: 'bold',
			    transform: 'scale(1.05)'
			}" :inactiveStyle="{
			    color: '#6A6A6A',
			    transform: 'scale(1)'
			}" itemStyle="width:25%;height:80rpx" lineWidth="30" lineHeight="2" lineColor="#036045"></u-tabs>
			</view>
		</u-sticky>

		<view class="box_2">
			<empty v-if="list.length<=0"></empty>
			<view class="store" v-for="(item,index) in list" :key="index">
				<view class="">
					<view class="content line">
						<view class="content_left">
							<view class="content_left_1">
								{{item.store && item.store.title ? item.store.title : '安装门店'}}
							</view>
							<view class="content_left_2 mt-10">
								{{item.createtime | timerFormat}}
							</view>
						</view>
						<view class="content_right" v-if="item.store && (item.store.tel || item.subscribe_tel)">
							<view @tap="openTel(item.subscribe_tel)">
								<image class="content_right_1" src="../../static/icon6.png" mode=""></image>
							</view>
							<view @tap="getopenLocation(item.store.lat,item.store.lon)" v-if="item.store.lat && item.store.lon">
								<image class="content_right_2" src="../../static/icon7.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="a-center j-sb">
						<view class="label">
							商城订单
						</view>
						<view class="f-size-26 color-03">
							{{ item.status_text || '--' }}
						</view>
					</view>
					<view class="install_tip" v-if="installFlowTip(item)">
						{{ installFlowTip(item) }}
					</view>
				</view>
				<view v-for="(item1,index1) in item.detail" :key="index1" class="content_detail"
					@click="routerTo('/pagesA/orderDetail/orderDetail?id='+item.id)">
					<view class="content_left">
						<view class="content_left_img">
							<image :src="item1.image" mode="aspectFill"></image>
						</view>
						<view class="content_left_title d-flex flex-column j-sb">
							<view class="content_left_title_1 beyond f-700">
								{{item1.title || ''}}
							</view>
							<view class="content_left_title_2">
								{{item1.item_name || ''}}
							</view>
						</view>
					</view>
					<view class="content_right">
						<view class="content_right_price">
							¥{{item1.price || 0}}
						</view>
						<view class="content_right_count">
							x{{item1.count || 0}}
						</view>
					</view>
				</view>
				<view class="f-size-28 color-3d u-border-top mt-14 text-right pt-10 mb-16">
					实付款： <span class="color-03">{{item.order_amount_total}}</span>
				</view>

				<view class="store_down mb-10">
					<view v-if="isUnpaid(item)" class="store_down_right" @click="orderCancelApi(item.id)">
						取消订单
					</view>
					<view v-if="isUnpaid(item)" class="store_down_right" style="margin-left: 20rpx;"
						@click="openpay(item.order_no)">
						立即支付
					</view>

					<!-- 普通快递：待收货时用户确认收货 -->
					<view v-if="showConfirmReceive(item)" class="store_down_right" style="margin-left: 20rpx;"
						@click="confirmReceive(item.id)">
						确认收货
					</view>

					<!-- 安装门店订单：待确认安装完成 -->
					<view v-if="showConfirmInstall(item)" class="store_down_right" style="margin-left: 20rpx;"
						@click="confirmInstallDone(item.id)">
						确认安装完成
					</view>

					<view v-if="showRefund(item)" class="store_down_right"
						style="margin-left: 20rpx;" @click="refundShow=true,order_id=item.id">
						申请退款
					</view>
				</view>
			</view>
		</view>
		<payPop :pageurl='2' :orderNo='orderNo' :popShow='popShow' @close='popShow=false'></payPop>

		<refundPop @comfirm='refundApi' @close='refundShow=false' :show='refundShow'></refundPop>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				refundShow: false,
				popShow: false,
				tabIndex: 0,
				list1: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '进行中',
				}, {
					name: '已完成',
				}],
				list: [],
				orderNo: '',
				page: 1,
				order_id: '',
				queryStatus: '',
				queryStatusIn: ''
			};
		},
		onLoad() {
			this.orderListApi()
		},
		onShow() {
			if (this.vuex_token) {
				this.orderListApi()
			}
		},
		onReachBottom() {
			this.page++
			this.orderListApi(1)
		},
		methods: {
			st(item) {
				return String(item.status)
			},
			isInstallStoreOrder(item) {
				const ot = String(item.order_type || '')
				const t = String(item.type != null ? item.type : '1')
				const sid = parseInt(item.order_bind_store_id || 0, 10)
				return ot === '2' && t === '1' && sid > 0
			},
			isUnpaid(item) {
				return this.st(item) === '1'
			},
			showConfirmReceive(item) {
				if (this.st(item) !== '3') return false
				if (this.isInstallStoreOrder(item)) return false
				return true
			},
			showConfirmInstall(item) {
				return this.isInstallStoreOrder(item) && this.st(item) === '13'
			},
			showRefund(item) {
				const s = this.st(item)
				if (!['2', '3', '8'].includes(s)) return false
				if (['11', '12', '13'].includes(s)) return false
				return true
			},
			/** 安装门店订单：说明用户无需确认「收到货」 */
			installFlowTip(item) {
				if (!this.isInstallStoreOrder(item)) return ''
				const s = this.st(item)
				if (s === '11') {
					return '说明：商品正发往您选择的门店，由门店签收；无需您确认收货。'
				}
				if (s === '12') {
					return '说明：门店已收货。到店后请在订单详情出示「到店核销码」，由店员扫码确认。'
				}
				return ''
			},
			async refundApi(e) {
				let res = await this.refund({
					order_id: this.order_id,
					apply: e
				})
				if (res.code == 1) {
					this.list.forEach(item => {
						if (item.id == this.order_id) {
							item.status = '6'
							item.status_text = '退款申请中'
						}
					})
					this.$forceUpdate()
				}
			},
			tabclick(e) {
				this.tabIndex = e.index
				if (e.index === 0) {
					this.queryStatus = ''
					this.queryStatusIn = ''
				} else if (e.index === 1) {
					this.queryStatus = '1'
					this.queryStatusIn = ''
				} else if (e.index === 2) {
					this.queryStatus = ''
					this.queryStatusIn = '2,3,6,8,11,12,13'
				} else {
					this.queryStatus = ''
					this.queryStatusIn = '4,5,7,9'
				}
				this.orderListApi()
			},
			async orderCancelApi(id) {
				let res = await this.orderCancel({
					order_id: id
				})
				if (res.code == 1) {
					this.list.forEach(item => {
						if (item.id == id) {
							item.status = '5'
							item.status_text = '已取消'
						}
					})
					this.$forceUpdate()
				}
			},
			openpay(orderNo) {
				this.orderNo = orderNo
				this.popShow = true
			},
			async orderListApi(append) {
				if (append !== 1) {
					this.page = 1
				}
				const data = {
					page: this.page,
					types: 1
				}
				if (this.queryStatus) {
					data.status = this.queryStatus
				}
				if (this.queryStatusIn) {
					data.status_in = this.queryStatusIn
				}
				let res = await this.orderList(data)
				if (res.code == 1) {
					if (append == 1) {
						this.list = [...this.list, ...res.data.data]
					} else {
						this.list = res.data.data
					}
				}
			},
			confirmReceive(order_id) {
				uni.showModal({
					title: "提示",
					content: "确认已收到商品？",
					success: (res) => {
						if (res.confirm) {
							this.affirm({
								order_id
							}).then(res => {
								if (res.code == 1) {
									this.orderListApi()
								}
							})
						}
					}
				})
			},
			confirmInstallDone(order_id) {
				uni.showModal({
					title: "提示",
					content: "请确认已在门店完成安装，确认后订单将标记为已完成。",
					success: (res) => {
						if (res.confirm) {
							this.confirmInstallFinish({
								order_id
							}).then(res => {
								if (res.code == 1) {
									uni.showToast({
										title: res.msg || '操作成功',
										icon: 'none'
									})
									this.orderListApi()
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F5F7;
	}

	.label {
		min-width: 120rpx;
		height: 38rpx;
		padding: 0 8rpx;
		border-radius: 2rpx;
		border: 1rpx solid #036045;
		font-size: 24rpx;
		font-weight: 500;
		color: #036045;
		line-height: 38rpx;
		text-align: center;

	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.content_left {

			.content_left_1 {
				font-size: 32rpx;
				font-weight: 400;
				color: #393939;
			}

			.content_left_2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #979797;
			}
		}

		.content_right {
			width: 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.content_right_1 {
				width: 66rpx;
				height: 66rpx;
			}

			.content_right_2 {
				width: 66rpx;
				height: 66rpx;
			}
		}

	}

	.line {
		padding: 0rpx 0 8rpx;
		box-sizing: border-box;
		margin-bottom: 12rpx;
		border-bottom: 1rpx solid #eee;
	}

	.head {
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		padding: 0rpx 10rpx 10rpx;
		box-sizing: border-box;
	}


	.install_tip {
		margin-top: 12rpx;
		padding: 12rpx 16rpx;
		background: #f0f7f4;
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #5a6b66;
		line-height: 1.45;
	}

	.box_2 {
		.store {
			width: 660rpx;
			background: #FFFFFF;
			border-radius: 18rpx;
			margin: 20rpx auto;
			padding: 22rpx 20rpx 10rpx;

		}

		.store_down {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			flex-wrap: wrap;
			box-sizing: border-box;
			margin-top: 20rpx;

			.store_down_right {
				min-width: 180rpx;
				height: 82rpx;
				padding: 0 16rpx;
				background: #036045;
				border-radius: 41rpx;
				color: #FFFFFF;
				line-height: 82rpx;
				text-align: center;
				font-size: 26rpx;
			}
		}

		.content_detail {
			display: flex;
			justify-content: space-between;
			padding: 25rpx 0 0;

			.content_left {
				display: flex;

				.content_left_img {
					width: 106rpx;
					height: 106rpx;
					margin-right: 16rpx;
					border: 1rpx solid #eee;
					border-radius: 10rpx;

					image {
						width: 106rpx;
						height: 106rpx;
						border-radius: 10rpx;
					}
				}

				.content_left_title {
					margin-left: 10rpx;
					width: 300rpx;

					.content_left_title_1 {
						font-size: 28rpx;
						font-weight: 400;
						color: #353535;
					}

					.content_left_title_2 {
						font-size: 24rpx;
						font-weight: 400;
						color: #989898;
						margin: 4rpx 0;
					}
				}
			}

			.content_right {
				text-align: right;

				.content_right_price {
					font-size: 32rpx;
					font-weight: 400;
					color: #353535;
				}

				.content_right_count {
					font-size: 24rpx;
					font-weight: 400;
					color: #989898;
					margin-top: 10rpx;
				}
			}
		}

	}
</style>
