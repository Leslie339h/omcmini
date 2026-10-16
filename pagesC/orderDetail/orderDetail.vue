<template>
	<view style="padding-bottom: 120rpx;" v-show='pageShow'>
		<view class="card" v-if="detail.user">
			<view class="user flexc flexs">
				<view class="left flexc">
					<image :src="detail.user.avatar" mode="aspectFill"></image>
					<view class="" style="line-height: 64rpx;">
						{{detail.user.nickname}}
					</view>
				</view>
				<view class="right">
					<image @click="openTel(detail.user.mobile)" src="../static/cicon16.png" mode=""></image>
				</view>
			</view>
			<view class="mt-30 f-size-28" v-if="[6,7,8].includes(detail.status)">
				退款原因: {{detail.refund.apply}}
			</view>

		</view>
		<view class="order_details">
			<view class="card_one flexs flexc">
				<view class="f-bold f-size-36">
					{{detail.order_type_text}}订单
				</view>
				<view class="right">
					<text>{{detail.status_text}} </text>
				</view>
			</view>
			<view class="card_two flexs flexc">
				<view class="left">配送方式：</view>
				<view class="right">{{detail.order_type_text}}</view>
			</view>
			<view class="card_three">
				<view class="item flexs flexc" style="border-bottom: 1rpx solid #EBEBEB;">
					<view class="left">
						下单时间：
					</view>
					<view class="right">
						{{detail.createtime}}
					</view>
				</view>
				<view class="item flexs flexc" style="border-bottom: 1rpx solid #EBEBEB;">
					<view class="left">
						订单编号：
					</view>
					<view class="right">
						{{detail.order_no}}
					</view>
				</view>
				<view class="item flexs flexc" v-if="detail.pay_time">
					<view class="left">
						支付时间：
					</view>
					<view class="right">
						{{detail.pay_time}}
					</view>
				</view>
				<view class="item flexs flexc" style="border-bottom: 1rpx solid #EBEBEB;" v-if="detail.subscribe_time_text">
					<view class="left">
						预约时间：
					</view>
					<view class="right">
						{{detail.subscribe_time_text}}
					</view>
				</view>
				<view class="item flexs flexc" style="border-bottom: 1rpx solid #EBEBEB;" v-if="detail.dd_time_text">
					<view class="left">
						到店/安装时间：
					</view>
					<view class="right">
						{{detail.dd_time_text}}
					</view>
				</view>
				<view class="item flexs flexc" style="border-bottom: 1rpx solid #EBEBEB;" v-if="detail.store_receive_time_text">
					<view class="left">
						门店确认收货：
					</view>
					<view class="right">
						{{detail.store_receive_time_text}}
					</view>
				</view>
				<view class="item flexs flexc" style="border-bottom: 1rpx solid #EBEBEB;" v-if="detail.store_confirm_user_time_text">
					<view class="left">
						确认到店/可安装：
					</view>
					<view class="right">
						{{detail.store_confirm_user_time_text}}
					</view>
				</view>
				<view class="item flexs flexc" v-if="detail.user_install_finish_time_text">
					<view class="left">
						用户确认完成：
					</view>
					<view class="right">
						{{detail.user_install_finish_time_text}}
					</view>
				</view>

			</view>


			<view class="" style="background-color: #fff;border-radius: 20rpx;padding-bottom: 20rpx;">
				<view class="card_four">
					<view class="title">
						商品明细
					</view>
					<!-- :style="{'max-height': heg1}" style="overflow: hidden;" -->
					<view class="">
						<view class="shop flexc" v-for="item in detail.detail" :key="item">
							<image :src="item.image" mode="aspectFill"></image>
							<view class="shop_item">
								<view class="flexs one">
									<view class="me-text-beyond">{{item.title}}</view>
									<view class="">¥{{item.price}}</view>
								</view>
								<view class="two">
									{{item.item_name}}
								</view>
								<view class="three">
									×{{item.count}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>



			<view class=" card_five">
				<view class="left f-size-32 f-bold">备注：</view>
				<view class="right mt-10">{{detail.remark || '--'}}</view>
			</view>

			<view class="card_three">
				<view class="item1 flexs flexc">
					<view class="one">
						共计：
					</view>
					<view class="right">
						<text class="thr">￥{{detail.order_amount_total}}</text>
					</view>
				</view>
			</view>
			<view class="card_two flexs flexc">
				<view class="left f-blod">
					支付方式:
				</view>
				<view class="right">
					{{detail.status=='1'?'--' : (detail.pay_type_text || '--')}}
				</view>
			</view>

			<view class="card_four" v-if="['14','13'].includes(String(detail.status))">
				<view class="title">安装完成拍照</view>
				<view class="f-size-24 color-9 mt-10 mb-20">至少1张、最多9张；保存后用户在订单中可查看</view>
				<view class="install_photo_grid">
					<view v-for="(p,i) in installPhotoPreview" :key="'p'+i" class="install_ph_wrap">
						<image :src="p" mode="aspectFill" class="install_ph" @click="removeInstallPhoto(i)"></image>
						<view class="install_ph_del_hint">点击删除</view>
					</view>
					<view class="install_ph_add" @click="chooseInstallPhoto" v-if="installPhotoPaths.length < 9">+</view>
				</view>
				<view class="content_Bom a-center j-center d-flex" v-if="installPhotoPaths.length > 0">
					<view class="btm2" @click="saveInstallPhotos">{{ savingPhotos ? '提交中…' : '保存照片' }}</view>
				</view>
			</view>

			<view class="content_Bom a-center d-flex j-sb">
				<!-- <view class="btm1" @click="getPrint(detail.id)" v-if="detail.status !=='1'">
					打印小票
				</view> -->
				<view class="btm2" @click="storeReceiveGoodsClick" v-if="String(detail.status)==='11'">
					确认收到货
				</view>
				<view class="btm2" @click="storeConfirmUserArrivedScan" v-if="String(detail.status)==='12'">
					扫码确认到店
				</view>
			</view>
			<view class="content_Bom  a-center d-flex j-sb" v-if="['6'].includes(detail.status)">
				<view class="btm2" @click="resold_orderApi()">
					拒绝退款
				</view>
				<view class="btm1" @click="refund_orderApi()">
					同意退款
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import srvConfig from '@/config.js'
	export default {
		data() {
			return {
				id: "",
				detail: {},
				pageShow: false,
				installPhotoPaths: [],
				installPhotoPreview: [],
				savingPhotos: false
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
		},
		methods: {
			// 同意退款
			async refund_orderApi() {
				let res = await this.refund_order({
					order_id: this.id
				})
				if (res.code == 1) {
					this.getDetail()
				}
			},
			// 拒绝退款
			async resold_orderApi() {
				let res = await this.resold_order({
					order_id: this.id
				})
				if (res.code == 1) {
					this.getDetail()
				}
			},
			async getPrint() {
				// let res = await print({
				// 	id: this.id
				// })
				// if (res.code == 1) {
				// 	this.showToast('打印成功')
				// }
			},

			// 接单
			async setorders() {
				let res = await receiving_orders({
					id: this.detail.id
				})
				this.showToast(res.msg)
			},
			async getDetail(options = {}) {
				const silent = options.silent === true
				if (!silent) {
					uni.showLoading({
						title: '加载中'
					})
				}
				try {
					let res = await this.storeOrderdetail({
						order_id: this.id
					})
					if (res.code == 1) {
						this.detail = res.data
						this.syncInstallPhotosFromDetail(res.data)
						this.pageShow = true
					} else {
						uni.showToast({ title: res.msg || '加载失败', icon: 'none' })
					}
				} finally {
					if (!silent) {
						uni.hideLoading()
					}
				}

			},
			syncInstallPhotosFromDetail(d) {
				const paths = Array.isArray(d.install_finish_image_paths) ? d.install_finish_image_paths.slice() : []
				this.installPhotoPaths = paths
				if (Array.isArray(d.install_finish_image_list) && d.install_finish_image_list.length) {
					this.installPhotoPreview = d.install_finish_image_list.slice()
				} else if (paths.length) {
					const base = (srvConfig.serverIp || '').replace(/\/$/, '')
					this.installPhotoPreview = paths.map((rel) => base + (rel.startsWith('/') ? rel : '/' + rel))
				} else {
					this.installPhotoPreview = []
				}
			},
			removeInstallPhoto(i) {
				this.installPhotoPaths.splice(i, 1)
				this.installPhotoPreview.splice(i, 1)
			},
			chooseInstallPhoto() {
				const n = 9 - this.installPhotoPaths.length
				if (n <= 0) return
				uni.chooseImage({
					count: n,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (r) => {
						const files = r.tempFilePaths || []
						files.forEach((p) => this.uploadInstallPhoto(p))
					}
				})
			},
			uploadInstallPhoto(filePath) {
				uni.showLoading({ title: '上传中', mask: true })
				const base = (srvConfig.serverIp || '').replace(/\/$/, '')
				const token = uni.getStorageSync('token') || ''
				uni.uploadFile({
					url: base + '/api/common/upload',
					fileType: 'image',
					filePath,
					name: 'file',
					formData: {
						token
					},
					header: {
						token
					},
					success: (res) => {
						try {
							const body = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
							if (body.code === 1 && body.data && body.data.url) {
								this.installPhotoPaths.push(body.data.url)
								const fu = body.data.fullurl || ((srvConfig.serverIp || '').replace(/\/$/, '') + body.data
									.url)
								this.installPhotoPreview.push(fu)
							} else {
								uni.showToast({ title: body.msg || '上传失败', icon: 'none' })
							}
						} catch (e) {
							uni.showToast({ title: '上传解析失败', icon: 'none' })
						}
					},
					fail: () => {
						uni.showToast({ title: '上传失败', icon: 'none' })
					},
					complete: () => uni.hideLoading()
				})
			},
			async saveInstallPhotos() {
				if (this.savingPhotos) return
				if (this.installPhotoPaths.length < 1) {
					uni.showToast({ title: '请先添加照片', icon: 'none' })
					return
				}
				this.savingPhotos = true
				try {
					const res = await this.saveInstallFinishImages({
						order_id: this.id,
						images: JSON.stringify(this.installPhotoPaths)
					})
					const ok = res && (Number(res.code) === 1)
					if (ok) {
						// 先刷新详情，避免紧接着 showLoading 盖掉成功提示
						await this.getDetail({ silent: true })
						uni.showToast({
							title: res.msg || '上传成功',
							icon: 'success',
							duration: 2000
						})
						this.$forceUpdate()
					} else {
						uni.showToast({
							title: (res && res.msg) || '保存失败',
							icon: 'none'
						})
					}
				} finally {
					this.savingPhotos = false
				}
			},
			async storeReceiveGoodsClick() {
				let res = await this.storeReceiveGoods({
					order_id: this.id
				})
				if (res.code == 1) {
					this.showToast(res.msg || '操作成功')
					this.getDetail()
				} else {
					uni.showToast({
						title: res.msg || '操作失败',
						icon: 'none'
					})
				}
			},
			storeConfirmUserArrivedScan() {
				uni.scanCode({
					scanType: ['qrCode', 'barCode'],
					success: async (scan) => {
						const raw = String(scan.result || '').trim()
						const res = await this.storeConfirmUserArrived({
							scan_raw: raw
						})
						if (res.code == 1) {
							this.showToast(res.msg || '操作成功')
							this.getDetail()
						} else {
							uni.showToast({
								title: res.msg || '操作失败',
								icon: 'none'
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: '未扫码',
							icon: 'none'
						})
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FAFAFA;
	}

	.minus {
		border: 1rpx solid #036045;
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}

	.input {
		padding: 0 10px;
	}

	.plus {
		width: 34rpx;
		height: 34rpx;
		background-color: #036045;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}

	.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;

		.btn {
			width: 750rpx;
			height: 120rpx;
			background: #036045;
			text-align: center;
			line-height: 120rpx;
			color: #fff;
			font-size: 28rpx;
		}

		.btn1 {
			width: 375rpx;
			height: 120rpx;
			background: #FFFFFF;
			font-size: 34rpx;
			color: #777777;
			text-align: center;
			line-height: 120rpx;
		}

		.btn2 {
			width: 375rpx;
			height: 120rpx;
			background: #036045;
			font-size: 34rpx;
			color: #ffffff;
			text-align: center;
			line-height: 120rpx;
		}
	}

	.card {
		width: 100vw;
		background-color: #fff;
		padding: 25rpx 34rpx;
		box-sizing: border-box;

		.black {
			font-size: 32rpx;
			color: #333333;
		}

		.orange {
			width: 520rpx;
			font-size: 30rpx;
			color: #FF9C2E;
		}

		.user {

			.left {
				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				font-size: 32rpx;
				color: #333333;
			}

			.right {
				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}


		}
	}

	.order_details {
		padding: 25rpx 25rpx;

		.card_one {
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;

			.left {
				font-size: 40rpx;
				color: #333333;
			}

			.right {
				font-size: 34rpx;
				color: #FF9C2E;
				line-height: 50rpx;
			}
		}

		.card_two {
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
			margin: 20rpx 0;

			.left {
				font-size: 32rpx;
				color: #333333;
			}

			.right {
				font-size: 32rpx;
				color: #333333;
			}
		}

		.card_three {
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 14rpx 30rpx;
			margin: 20rpx 0;

			.item1 {
				padding: 20rpx 0;
				box-sizing: border-box;
				text-align: center;

				.quna {
					width: 35rpx;
					height: 35rpx;
					margin-right: 12rpx;
				}

				.left {
					font-size: 24rpx;
					color: #333333;
				}

				.right {
					font-size: 34rpx;
					color: #FB2A57;
				}

				.one {
					font-size: 30rpx;
					color: #333333;
				}

				.two {
					font-size: 24rpx;
					color: #777777;
				}

				.thr {
					font-size: 32rpx;
					color: #333333;
					margin-left: 16rpx;
				}
			}

			.item {
				height: 80rpx;
				line-height: 80rpx;

				.left {
					font-size: 30rpx;
					color: #333333;
				}

				.right {
					font-size: 32rpx;
					color: #333333;
				}
			}

		}

		.card_four {
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 24rpx 30rpx 0;
			margin: 20rpx 0;

			.title {
				font-size: 32rpx;
				border-bottom: 1rpx solid #F2F2F2;
				color: #232323;
				padding: 0 0 12rpx;
				box-sizing: border-box;

				.title_right {
					padding-top: 6rpx;
					box-sizing: border-box;

					image {
						width: 38rpx;
						height: 38rpx;
						border-radius: 50%;
					}
				}
			}

			.setheg {
				width: 180rpx;
				font-size: 20rpx;
				color: #777777;
				text-align: center;
				margin: 34rpx auto 0;
			}

			.shop {
				margin: 20rpx 0;

				image {
					width: 122rpx;
					height: 120rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}

				.shop_item {
					width: 500rpx;

					.one {
						font-size: 28rpx;
						color: #333333;
					}

					.two {
						font-size: 24rpx;
						color: #777777;
						margin: 6rpx 0;
					}

					.three {
						font-size: 24rpx;
						color: #777777;
					}
				}
			}
		}

		.card_five {
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 32rpx;
			margin: 20rpx 0;
			font-size: 32rpx;
			color: #333333;

			.right {
				width: 530rpx;
			}

		}

	}

	.userPop {
		padding: 33rpx 40rpx 170rpx;
		box-sizing: border-box;

		.userPop_title {}

		.userPop_ipts {
			margin-top: 38rpx;
			font-size: 32rpx;
		}

		.userPop_ipt {
			border-bottom: 1rpx solid #EBEBEB;
			padding-bottom: 6rpx;

			input {
				width: 221rpx;
			}
		}
	}

	.delPop {
		padding: 70rpx 98rpx;
		box-sizing: border-box;

		.delPop_title {
			font-size: 40rpx;
			color: #232323;
			font-weight: 700;
		}

		.delpop_btns {
			margin-top: 76rpx;

			.delpop_qx_btn {
				width: 183rpx;
				height: 64rpx;
				background: #D8D8D8;
				border-radius: 8rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 64rpx;
			}

			.delpop_qd_btn {
				width: 183rpx;
				height: 64rpx;
				background: #036045;
				border-radius: 8rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 64rpx;
			}

		}
	}

	.content_Bom {
		margin: 20rpx 0 0;

		.jdbtn {
			margin: 6rpx auto 0;
			// width: 572rpx;
			height: 76rpx;
			background: #036045;
			border-radius: 10rpx;
			text-align: center;
			line-height: 76rpx;
			font-size: 34rpx;
			color: #FFFFFF;
		}

		.btm1 {
			width: 305rpx;
			height: 76rpx;
			border-radius: 10rpx;
			border: 1rpx solid #FF9C2E;
			font-size: 34rpx;
			color: #FF9C2E;
			text-align: center;
			line-height: 76rpx;
		}

		.btm2 {
			width: 305rpx;
			height: 76rpx;
			background: #036045;
			border-radius: 10rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 76rpx;
			border: 1rpx solid #036045;
		}

		.btm3 {
			width: 305rpx;
			height: 76rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			border: 1rpx solid #BEBEBE;
			font-size: 34rpx;
			color: #333333;
			text-align: center;
			line-height: 76rpx;
		}
	}

	.install_photo_grid {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20rpx;

		.install_ph_wrap {
			width: 200rpx;
			margin-right: 16rpx;
			margin-bottom: 16rpx;
			position: relative;
		}

		.install_ph {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
			background: #f2f2f2;
		}

		.install_ph_del_hint {
			font-size: 20rpx;
			color: #999;
			text-align: center;
			margin-top: 6rpx;
		}

		.install_ph_add {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
			border: 2rpx dashed #ccc;
			font-size: 72rpx;
			color: #999;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fafafa;
		}
	}
</style>