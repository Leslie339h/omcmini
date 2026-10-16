<template>
	<view v-show='pageShow'>
		<view class="order_status_head flexs flexc" v-if="pageShow">
			<view class="order_status_head_left f-bold f-size-36">
			商城订单状态
			</view>
			<view class="order_status_head_right f-size-28 color-03">
				{{ int.status_text || '--' }}
			</view>
		</view>

		<view class="install_tip_detail" v-if="installFlowDetailTip">
			{{ installFlowDetailTip }}
		</view>

		<view class="box_2">
			<view class="store">
				<view class="">
					<storelocation :addShow='true' :content_list='int'></storelocation>
				</view>
				<view v-for="(item,index) in int.detail" :key="index" class="content_detail">
					<view class="content_left">
						<view class="content_left_img">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="content_left_title d-flex flex-column j-sb">
							<view class="content_left_title_1 beyond f-500">
								{{item.title || ''}}
							</view>
							<view class="content_left_title_2">
								{{item.item_name || ''}}
							</view>
						</view>
					</view>
					<view class="content_right">
						<view class="content_right_price">
							¥{{item.price || 0}}
						</view>
						<view class="content_right_count">
							x{{item.count || 0}}
						</view>
					</view>
				</view>
				<view class="store_down" style="margin-right: 0rpx;">
					<view class="">

					</view>
					<view>
						合计：<span class="f-size-32 f-600">¥{{int.order_amount_total}}</span>
					</view>
				</view>
			</view>

			<view class="box_3" v-if="int.order_type==1 && int.status=='2'">
				<view class="box_1_top">
					<u-divider text="待使用"></u-divider>
				</view>
				<view class="box_1_title">
					出示「自取码」核销
				</view>
				<view class="box_code d-flex a-center">
					<view class="box_code_left">
						自<br />取<br />码<br />
					</view>
					<view class="box_code_right">
						<image :src="int.code" mode="widthFix"></image>
						<view class="text_1">
							请向工作人员出示该二维码
						</view>
						<view class="box_code_right_btn" @click="orderDetailApi">
							手动刷新
						</view>
					</view>
				</view>
			</view>

			<view class="box_3" v-if="showInstallVisitQr">
				<view class="box_1_top">
					<u-divider text="到店安装核销"></u-divider>
				</view>
				<view class="box_1_title">
					请向本店工作人员出示以下二维码，由店员扫码确认您已到店
				</view>
				<view class="box_code d-flex a-center">
					<view class="box_code_left">
						到<br />店<br />码<br />
					</view>
					<view class="box_code_right">
						<image :src="int.install_visit_qr" mode="widthFix"></image>
						<view class="text_1">
							请勿将二维码发给非本店人员；若无法识别可点刷新
						</view>
						<view class="box_code_right_btn" @click="orderDetailApi">
							刷新
						</view>
					</view>
				</view>
			</view>


			<view>
				<orderInfo :content_list='int'></orderInfo>
			</view>

			<view class="install_gallery" v-if="String(int.status)==='13' && int.install_finish_image_list && int.install_finish_image_list.length">
				<view class="box_3">
					<view class="box_1_top">
						<u-divider text="安装实拍"></u-divider>
					</view>
					<view class="gal_row">
						<image v-for="(img,ix) in int.install_finish_image_list" :key="'ig'+ix" :src="img" mode="aspectFill" class="gal_img" @click="previewInstallImg(ix)"></image>
					</view>
				</view>
			</view>

			<view class="store_down mb-10">
				<view v-if="int.status==1" class="store_down_right" @click="orderCancelApi(int.id)">
					取消订单
				</view>
				<view v-if="int.status==1" class="store_down_right" style="margin-left: 20rpx;"
					@click="openpay(int.order_no)">
					立即支付
				</view>
				<view v-if="showConfirmReceiveDetail" class="store_down_right" style="margin-left: 20rpx;"
					@click="confirmReceiveDetail">
					确认收货
				</view>
				<view v-if="showConfirmInstallDetail" class="store_down_right" style="margin-left: 20rpx;"
					@click="confirmInstallDetail">
					确认安装完成
				</view>

				<view v-if="showRefundDetail" class="store_down_right" style="margin-left: 20rpx;"
					@click="refundShow=true,order_id=int.id">
					申请退款
				</view>
			</view>
		</view>

		<payPop :orderNo='orderNo' :popShow='popShow' @close='popShow=false'></payPop>
		<refundPop @comfirm='refundApi' @close='refundShow=false' :show='refundShow'></refundPop>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				int: {},
				id: "",
				pageShow: false,
				refundShow: false, //退款弹窗
				popShow: false, //支付弹窗
				orderNo: '', //订单号
				order_id: '', //退款id
			};
		},
		computed: {
			isInstallStoreOrder() {
				const o = this.int
				if (!o || !o.id) return false
				const sid = parseInt(o.order_bind_store_id != null ? o.order_bind_store_id : o.store_id || 0, 10)
				return String(o.order_type) === '2' && String(o.type != null ? o.type : '1') === '1' && sid > 0
			},
			showConfirmReceiveDetail() {
				return String(this.int.status) === '3' && !this.isInstallStoreOrder
			},
			showConfirmInstallDetail() {
				return this.isInstallStoreOrder && String(this.int.status) === '13'
			},
			showRefundDetail() {
				const s = String(this.int.status)
				if (!['2', '3', '8'].includes(s)) return false
				if (['11', '12', '13'].includes(s)) return false
				return true
			},
			showInstallVisitQr() {
				return this.isInstallStoreOrder && String(this.int.status) === '12' && !!this.int.install_visit_qr
			},
			installFlowDetailTip() {
				if (!this.int || !this.int.id || !this.isInstallStoreOrder) return ''
				const s = String(this.int.status)
				if (s === '11') {
					return '说明：商品正发往您选择的安装门店，由门店确认收货，您无需操作「确认收货」。'
				}
				if (s === '12') {
					return '说明：门店已收货。请您到店后出示下方「到店安装核销」二维码，由店员扫码确认到店；确认后您即可在订单中「确认安装完成」。'
				}
				if (s === '13') {
					let t = '说明：请查看下方门店上传的安装实拍，确认无误后点击「确认安装完成」；逾期未确认将按系统设置自动完成。'
					if (this.int.install_confirm_deadline_text) {
						t += ' 截止时间：' + this.int.install_confirm_deadline_text + '。'
					}
					return t
				}
				return ''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.orderDetailApi()
		},
		methods: {
			openpay(orderNo) {
				this.orderNo = orderNo
				this.popShow = true
			},
			// 取消订单
			async orderCancelApi(id) {
				let res = await this.orderCancel({
					order_id: id
				})
				if (res.code == 1) {
					this.orderDetailApi()
				}
			},
			// 退款
			async refundApi(e) {
				let res = await this.refund({
					order_id: this.order_id,
					apply: e
				})
				if (res.code == 1) {
					this.orderDetailApi()
				}
			},
			confirmReceiveDetail() {
				uni.showModal({
					title: '提示',
					content: '确认已收到商品？',
					success: (r) => {
						if (r.confirm) {
							this.affirm({ order_id: this.int.id }).then(res => {
								if (res.code == 1) this.orderDetailApi()
							})
						}
					}
				})
			},
			confirmInstallDetail() {
				uni.showModal({
					title: '提示',
					content: '请确认已在门店完成安装，确认后订单将标记为已完成。',
					success: (r) => {
						if (r.confirm) {
							this.confirmInstallFinish({ order_id: this.int.id }).then(res => {
								if (res.code == 1) this.orderDetailApi()
							})
						}
					}
				})
			},
			async orderDetailApi() {
				let res = await this.orderDetail({
					order_id: this.id
				})
				if (res.code == 1) {
					this.int = res.data
					this.pageShow = true
				}
			},
			previewInstallImg(ix) {
				const urls = this.int.install_finish_image_list || []
				if (!urls.length) return
				uni.previewImage({
					urls,
					current: urls[ix]
				})
			},
		}

	}
</script>

<style lang="scss">
	page {
		background: #F4F5F7;
		padding: 0 0 50rpx;
	}

	.install_tip_detail {
		margin: 16rpx 24rpx 0;
		padding: 16rpx 20rpx;
		background: #f0f7f4;
		border-radius: 12rpx;
		font-size: 26rpx;
		color: #5a6b66;
		line-height: 1.5;
	}

	.store_down {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		margin: 30rpx 30rpx 0 0;

		.store_down_left {
			width: 207rpx;
			height: 82rpx;
			background: #232323;
			border-radius: 41rpx;
			color: #FFFFFF;
			line-height: 82rpx;
			text-align: center;
			margin-right: 24rpx;
		}

		.store_down_right {
			width: 207rpx;
			height: 82rpx;
			background: #036045;
			border-radius: 41rpx;
			color: #FFFFFF;
			line-height: 82rpx;
			text-align: center;
		}
	}

	.order_status_head {
		width: 703rpx;
		background: #FFFFFF;
		border-radius: 18rpx;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
		margin: 20rpx auto 0;
		align-items: center;
		justify-content: space-between;
	}

	.order_status_head_left {
		color: #333333;
	}

	.order_status_head_right {
		font-weight: 500;
		text-align: right;
		max-width: 420rpx;
	}

	.color-03 {
		color: #036045;
	}

	.box_1 {
		width: 703rpx;
		background: #FFFFFF;
		border-radius: 18rpx 18rpx 18rpx 18rpx;
		padding: 22rpx 42rpx;
		box-sizing: border-box;
		margin: 20rpx auto 0;
	}

	.box_2 {
		.store {
			width: 702rpx;
			background: #FFFFFF;
			border-radius: 18rpx;
			margin: 20rpx auto;
			padding: 32rpx 20rpx;

		}

		.addBtn {
			width: 100%;
			height: 31rpx;
			font-weight: 400;
			font-size: 24rpx;
			color: #999999;
			text-align: center;
		}


		.content_detail {
			display: flex;
			justify-content: space-between;
			padding: 25rpx 0 0;

			.content_left {
				display: flex;

				.content_left_img {
					width: 103rpx;
					height: 106rpx;
					margin-right: 16rpx;

					image {
						width: 103rpx;
						height: 106rpx;
						border-radius: 8rpx;
					}
				}

				.content_left_title {
					margin-left: 10rpx;

					.content_left_title_1 {
						width: 400rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #353535;
					}

					.content_left_title_2 {
						width: 400rpx;
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


	.box_3 {
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		margin: 28rpx auto;
		padding: 10rpx 30rpx 30rpx;
		box-sizing: border-box;

		.box_code {
			width: 622rpx;
			height: 468rpx;
			background: #F4F5F7;
			border-radius: 18rpx 18rpx 18rpx 18rpx;
			margin-top: 28rpx;

			.box_code_left {
				width: 68rpx;
				height: 468rpx;
				background: #232323;
				border-radius: 18rpx 18rpx 18rpx 18rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
				padding-top: 180rpx;
				text-align: center;
			}

			.box_code_right_btn {
				width: 136rpx;
				height: 46rpx;
				background: #F9FCFE;
				border-radius: 19rpx 19rpx 19rpx 19rpx;
				font-size: 22rpx;
				color: #036045;
				line-height: 46rpx;
				text-align: center;
				margin: 0 auto;
			}

			.box_code_right {
				text-align: center;
				width: calc(100% - 68rpx);

				image {
					width: 280rpx;
					height: 278rpx;
					background: #D8D8D8;
				}

				.text_1 {
					font-weight: 400;
					font-size: 22rpx;
					color: #0A0A0A;
					text-align: center;
					margin: 20rpx 0;
				}

			}
		}

		.box_1_top {
			margin: 0 auto;
			width: 300rpx;
		}

		.box_1_title {
			font-weight: 600;
			font-size: 28rpx;
			color: #3D3D3D;
		}
	}

	.gal_row {
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx 0 0;
		gap: 16rpx;
	}

	.gal_row .gal_img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 12rpx;
		background: #f2f2f2;
	}

</style>