<template>
	<view>
		<view class="head">
			<image class="head_img" src="../static/cicon13.png" mode=""></image>
			<view class="rules-entry" @click="rulesShow = true">
				<u-icon name="info-circle" color="#FFFFFF" size="22"></u-icon>
				<text>提现规则</text>
			</view>
			<view class="user">
				<image :src="storeInfo.store_image" mode="aspectFill"></image>
				<view>{{storeInfo.title}}</view>
			</view>
		</view>
		<view class="box_2">
			<view class="box_2_top d-flex a-center j-sb box_2_top_two">
				<view class="box_2_item" @click="routerTo('/pagesC/merchantOrder/merchantOrder')">
					<view class=" box_2_item_text">
						{{int.todayOrderCount || 0}}
					</view>
					<view class="box_2_item_text_2">
						今日订单
					</view>
				</view>
				<view class="box_2_item" @click="routerTo('/pagesC/symx/symx')">
					<view class="box_2_item_text">
						{{int.todayConsumeBalance2 || 0}}
					</view>
					<view class="box_2_item_text_2">
						今日收益
					</view>
				</view>
			</view>
			<view class="box_2_bom mt-48 d-flex a-center j-sb">
				<view class="box_2_bom_left d-flex a-center" v-if="shop_store_info.trade_switch==1">
					<image class="mr-16" src="../static/cicon11.png" mode="widthFix"></image>
					<span>营业中</span>
				</view>
				<view class="box_2_bom_left d-flex a-center" v-else>
					<image class="mr-16" src="../static/cicon12.png" mode="widthFix"></image>
					<span>停业中</span>
				</view>
				<view class="">
					<u-switch activeColor="#036045" v-model="swicthValue" @change="switchchange"></u-switch>
				</view>
			</view>

			<view class="shop_btn" @click="scanOrderCode">
				订单核销
			</view>
			<view class="shop_btn shop_btn_secondary" @click="routerTo('/pagesC/cash/cash')">
				收益提现
			</view>
			<u-notify message="您有新订单啦~" ref="uNotify"></u-notify>
		</view>
		<u-modal :show="modalshow" :title="'温馨提示'" :content='content' @confirm='routerBack'></u-modal>
		<withdrawal-rules-popup :show.sync="rulesShow"></withdrawal-rules-popup>
		<view class="box_3 d-flex flex-wrap a-center j-sb">
			<view class="" v-for="(item,index) in menuList" :key="item.id">
				<view class="box_item  d-flex   j-sb" @click="routerTo(item.url)">
					<view class="box_3_item_left">
						<view class="f-size-28 mb-16 f-600 color-3d">
							{{item.title}}
						</view>
						<view class="color-6 f-size-24">
							{{item.f_title}}
						</view>
					</view>
					<image :src="item.image" mode=""></image>
					<u-badge v-if="index===1" :offset='[10,10]' max="99" absolute :value="newOrderNum"></u-badge>
				</view>
			</view>
		</view>
		<audio src="../static/preview.mp3"></audio>
	</view>
</template>

<script>
	import config from '@/config.js'
	import WithdrawalRulesPopup from '@/components/withdrawalRulesPopup/withdrawalRulesPopup.vue'
	export default {
		components: { WithdrawalRulesPopup },
		data() {
			return {
				modalshow: false,
				rulesShow: false,
				content: "您的店铺已被禁用，如有问题请咨询客服",
				storeInfo: {},
				int: {},
				menuList: [{
					image: '../static/cicon1.png',
					title: '店铺认证',
					f_title: '门店资质与资料',
					url: '/pagesC/shopAuthentication/shopAuthentication',
					id: '1'
				}, {
					image: '../static/cicon3.png',
					title: '门店订单',
					f_title: '发货、到店与安装流转',
					url: '/pagesC/merchantOrder/merchantOrder',
					id: '2'
				}, {
					image: '../static/cicon10.png',
					title: '营业时间',
					f_title: '营业时段设置',
					url: '/pagesC/cssz/cssz',
					id: '3'
				}, {
					image: '../static/cicon9.png',
					title: '我的钱包',
					f_title: '余额、提现明细与收款账户',
					url: '/pagesC/wallet/wallet',
					id: '4'
				}],
				shop_store_info: {},
				swicthValue: false,
				innerAudioContext: null,
				orderTimer: null,
				newOrderNum: 0,
			};
		},
		onLoad() {
			if (this.vuex_user.store_status !== '1') {
				this.modalshow = true
			}
			this.store_authenticationApi()
			this.audioInit()
		},
		onShow() {
			this.storeIndexApi()
			this.getNewOrder()
			this.orderTimer = setInterval(() => {
				this.getNewOrder()
			}, 3000)
		},
		onHide() {
			clearInterval(this.orderTimer)
		},
		onUnload() {
			clearInterval(this.orderTimer)
		},
		methods: {
			scanOrderCode() {
				uni.scanCode({
					scanType: ['qrCode', 'barCode'],
					success: async (scan) => {
						const raw = String(scan.result || '').trim()
						if (!raw) {
							uni.showModal({
								title: '提示',
								content: '未识别到二维码内容，请重试',
								showCancel: false
							})
							return
						}
						// 与订单详情一致：安装门店单「到店核销」走门店接口，禁止再走旧 check_order（会直接变已完成导致订单从列表消失）
						const res = await this.storeConfirmUserArrived({
							scan_raw: raw
						})
						uni.showModal({
							title: res.code === 1 ? '成功' : '提示',
							content: res.msg || (res.code === 1 ? '已确认用户到店' : '操作失败'),
							showCancel: false
						})
					},
					fail() {
						uni.showModal({
							title: '提示',
							content: '扫码失败，请重试',
							showCancel: false
						})
					}
				})
			},
			async switchchange(e) {
				let res = await this.switchStore({
					status: e ? 1 : 0
				})
				this.defaultApi()
			},
			async defaultApi() {
				let res = await this.default_store({
					store_id: this.storeInfo.id
				})
				if (res.code == 1) {
					this.shop_store_info = res.data
					if (this.shop_store_info.trade_switch == 1) {
						this.swicthValue = true
					} else {
						this.swicthValue = false
					}
				}
			},
			async storeIndexApi() {
				let res = await this.storeIndex()
				if (res.code == 1) {
					this.int = res.data
				}
			},
			async store_authenticationApi() {
				let res = await this.store_authentication({
					type: 'view'
				})
				if (res.code == 1) {
					this.storeInfo = res.data
					this.defaultApi()
				}
			},
			audioInit() {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.src = `${config.serverIp}/assets/addons/fzxcxt/music/sound.mp3`
			},
			getNewOrder() {
				this.notice_order({
					store_id: this.vuex_user.store_id
				}).then(res => {
					this.newOrderNum = res.data
					if (res.code == 1 && res.data > 0) {
						this.$refs.uNotify.show({
							type: 'primary',
							message: '您有新订单来啦~',
							duration: 0,
						})
						if (this.innerAudioContext.paused) {
							this.innerAudioContext.play()
						} else {
							setTimeout(() => {
								this.innerAudioContext.play()
							}, 3000)
						}
					} else {
						this.$refs.uNotify.close()
						this.innerAudioContext.stop()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F7FB;
	}

	.head {
		position: relative;
		height: 410rpx;

		.head_img {
			width: 100%;
			height: 410rpx;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		overflow: hidden;

		.rules-entry {
			position: absolute;
			top: 34rpx;
			right: 28rpx;
			z-index: 6;
			display: flex;
			align-items: center;
			gap: 8rpx;
			padding: 12rpx 16rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			background: rgba(0, 0, 0, 0.18);
			border-radius: 30rpx;
		}

		.user {
			position: relative;
			z-index: 4;
			font-weight: 400;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			margin-top: 100rpx;

			image {
				border-radius: 50%;
				width: 118rpx;
				height: 118rpx;
				border: 4rpx solid #FFFFFF;
			}
		}
	}

	.box_2 {
		width: 699rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		padding: 34rpx 44rpx;
		box-sizing: border-box;
		margin: -70rpx auto 0;
		position: relative;
		z-index: 4;

		.box_2_bom_left {
			font-weight: 400;
			font-size: 28rpx;
			color: #3D3D3D;

			image {

				width: 32rpx;
				height: 32rpx;
			}
		}

		.box_2_top_two {
			justify-content: space-around;
		}

		.box_2_top {
			.box_2_item {
				flex: 1;
				.box_2_item_text {
					font-weight: 600;
					font-size: 41rpx;
					color: #036045;
					text-align: center;
				}

				.box_2_item_text_2 {
					font-weight: 400;
					font-size: 28rpx;
					color: #3D3D3D;
					text-align: center;
					margin-top: 20rpx;
				}

			}
		}
	}

	.box_3 {
		margin: 20rpx auto;
		padding: 0 30rpx;
		box-sizing: border-box;

		.box_item {
			padding: 32rpx 26rpx 14rpx;
			box-sizing: border-box;
			width: 330rpx;
			height: 174rpx;
			background: #FFFFFF;
			border-radius: 12rpx 12rpx 12rpx 12rpx;
			margin-bottom: 24rpx;
			position: relative;

			image {
				width: 95rpx;
				height: 95rpx;
			}

			.box_3_item_left {
				width: 170rpx;
			}
		}
	}

	.shop_btn {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #036045;
		color: #FFFFFF;
		border-radius: 10rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.shop_btn_secondary {
		background-color: #FFFFFF;
		color: #036045;
		border: 2rpx solid #036045;
		box-sizing: border-box;
		line-height: 76rpx;
	}
</style>
