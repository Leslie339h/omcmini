<template>
	<view>
		<!-- @close="close" -->
		<view class="popBox">
			<view class=" popBox_title text-center f-bold">
				收银台
			</view>
			<view class=" text-center color-ff3767 f-bold mb-20">
				<span class="f-size-22">¥</span><span class="f-size-36">{{after_total}}</span>
			</view>
			<u-count-down :time="time" format="mm:ss" @change="onChange" autoStart millisecond='true'>
				<view class="time text-center f-size-24 color-9">
					<text class="time__item">剩余支付时间</text>
					<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
					<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
				</view>
			</u-count-down>

			<view class=" f-size-28 mb-20 mt-20  f-bold">
				请选择支付方式
			</view>
			<view class="popBox_content">
				<radio-group>
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in pay_type" :key="item">
						<view class="popBox_content_item" v-if="item=='wechat'" @click="current=index">
							<view class="d-flex j-sb a-center " style="width: 90%;">
								<view>微信支付</view>
								<radio :value="index" :checked="index === current" />
							</view>
						</view>
						<view class="popBox_content_item" v-if="item=='yue'" @click="current=index">
							<view class="d-flex j-sb a-center " style="width: 90%;">
								<view>余额支付</view>
								<view class="">
									<span v-if="vuex_token && type==2"
										class="mr-20 f-size-28 color-6">剩余余额:{{vuex_user.money || 0.00}}</span>
									<radio :value="index" :checked="index === current" />
								</view>
							</view>
						</view>
					</label>
				</radio-group>
			</view>
			<view class="payBtn" v-if="wx_show" @click="payorder">
				确认支付
			</view>
			<view class="payBtn" v-else @click="createApi">
				确认支付
			</view>

		</view>

		<u-popup :show="codeshow" :closeable='true' :round="10" mode="center" @close="codeshow=false">
			<view class="p-30">
				<image style="width: 400rpx;" :src="code_img" mode="widthFix"></image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pay_type: ['wechat', 'yue', 'chiShu'],
				current: 0,
				after_total: 0.00,
				storeId: '',
				orderNo: '',
				timer: 0,
				code_img: '', //二维码
				codeshow: false, //二维码
				openid: '',
				order_id: '', //订单id
				timeData: {},
				time: 0,
				type: 2, //2是扫码进来的 1是核销跳转
				wx_show: false, //true微信扫码进来的  false跳转进来的

				detailTimer: null,

			};
		},
		onUnload() {
			if (this.detailTimer) {
				clearInterval(this.detailTimer)
			}
		},
		onLoad(e) {
			console.log(e, '扫码订单信息')
			this.getopenid() //获取openid
			// 跳转进来的
			if (e.orderNo) {
				this.orderNo = e.orderNo
				this.after_total = e.after_total
				this.time = e.timer * 1000
			}
			if (e.order_id) {
				this.detail_id = e.order_id
			}

			if (e.type) {
				this.type = e.type
			}
			// 扫码进来的
			if (e.id) {
				this.wx_show = true
				this.order_id = e.id
				this.payOrderInfoApi()
			}
			if (e.q) {
				const q = decodeURIComponent(e.q)
				let arr = q.split('?')
				console.log(arr)
				let id = arr[1].split('=')
				this.wx_show = true
				this.order_id = id[1]
				this.payOrderInfoApi()
			}
		},
		methods: {
			// 查询订单
			async get_order_detail(id) {
				let res = await this.storeOrderdetail({
					order_id: id
				})
				if (res.code == 1) {
					if (res.data.status == 2 || res.data.status == 4) {
						// 清除定时器
						clearInterval(this.detailTimer)
						this.codeshow = false
						this.showToast('订单已支付')
						setTimeout(() => {
							uni.redirectTo({
								url: `/pagesC/orderDetail/orderDetail?id=${id}`
							})
						}, 1000)
					}
				}
			},
			// 获取倒计时
			setTimer() {
				let newtime = +new Date()

				let oldtime = this.timer * 1000
				let timer = oldtime - newtime
				if (timer >= 0) {
					this.time = oldtime - newtime
				} else {
					this.time = 0
				}
			},
			onChange(e) {
				this.timeData = e
			},
			// 订单详情
			async payOrderInfoApi() {
				let res = await this.payOrderInfo({
					order_id: this.order_id
				})
				if (res.code == 1) {
					this.orderNo = res.data.order_no
					this.after_total = res.data.order_amount_total
					this.timer = res.data.end_time
					this.setTimer()
					this.bind_orderApi()
				}
			},
			// 订单绑定
			async bind_orderApi() {
				if (this.openid) {
					let res = await this.bind_order({
						order_no: this.orderNo,
						openid: this.openid
					})
					if (res.code == 1) {
						this.payorder()
					}
				} else {
					uni.login({
						success: (log) => {
							console.log(log)
							this.get_openid({ code: log.code }).then(res1 => {
								if (res1.code == 1) {
									this.bind_order({
										order_no: this.orderNo,
										openid: res1.data
									}).then(res => {
										if (res.code == 1) {
											this.payorder()
										}
									})
								} else {
									this.showToast(res1.msg)
								}
							})
						}
					})


				}

			},

			async getopenid() {
				this.openid = this.vuex_openid
			},
			async createApi() {
				if (this.current == 0) {
					let res = await this.scan_pay({
						order_no: this.orderNo
					})
					if (res.code == 1) {
						this.code_img = res.data
						this.codeshow = true

						this.detailTimer = setInterval(() => {
							this.get_order_detail(this.detail_id)
						}, 3000)
					}
				} else {
					uni.scanCode({
						success: async (res) => {
							let result = JSON.parse(res.result)
							let res_1 = await this.pay_code({
								user_id: result.user_id,
								order_no: this.orderNo
							})
							if (res_1.code == 1) {
								this.showToast('支付成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						}
					});
				}
			},
			// 支付
			async payorder() {
				if (this.time <= 0) return this.showToast('订单已过期')
				let arr = []
				let common = uni.getStorageSync('common')
				if (common.message) {
					common.message.forEach(item => {
						if (item.message_type == 1) {
							arr.push(item.masterplate)
						}
					})
				}
				if (this.current == 0) {
					let data_seed = await this.orderPay({
						orderNo: this.orderNo,
						payType: 1
					})
					if (data_seed.code == 1) {
						this.paysubscription(arr, data_seed.data, '/pages/shop/shop')
					} else {
						this.showToast(data_seed.msg)
					}
				} else {
					let data_seed = await this.orderPay({
						orderNo: this.orderNo,
						payType: 2
					})
					if (data_seed.code == 1) {
						this.subscription(arr, '/pages/shop/shop')
					} else {
						uni.redirectTo({
							url: '/pages/wallet/wallet'
						})
					}
				}
				if (this.vuex_token) {
					this.$store.commit('userApi')
				}
			}


		}

	}
</script>

<style lang="less">
	page {
		background-color: #f3f3f3;
	}

	.popBox {
		// height: 500rpx;
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;
		width: 100%;
		background-color: #fff;

		.popBox_title {
			font-size: 32rpx;
			color: #000;
			width: 100%;
			margin-bottom: 36rpx;
		}

		.popBox_content {
			font-size: 32rpx;

			.popBox_content_item {
				height: 80rpx;
				width: 750rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 18rpx;
				}
			}
		}
	}

	.payBtn {
		width: 658rpx;
		height: 84rpx;
		background: #036045;
		border-radius: 16rpx 16rpx 16rpx 16rpx;

		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 84rpx;
		text-align: center;
	}
</style>