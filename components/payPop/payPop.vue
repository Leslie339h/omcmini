<template>
	<view>
		<!-- @close="close" -->
		<u-popup :show="popShow" :round='10'>
			<view class="popBox">
				<view class="d-flex a-center j-sb  popBox_title">
					<view class=""></view>
					<view class="">
						请选择支付方式
					</view>
					<view class="" @click="close1">
						<u-icon name="close" size="32rpx"></u-icon>
					</view>
				</view>
				<view class="popBox_content">
					<radio-group>
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in pay_type" :key="item">

							<!-- 		<view class="popBox_content_item" v-if="item=='chiShu'" @click="current=index">
								<view class="d-flex j-sb a-center " style="width: 90%;">
									<view>次数支付</view>
									<view class="">
										<span class="f-size-28 color-6 mr-20">剩余次数:5</span>
										<radio :value="index" :checked="index === current" />
									</view>
								</view>
							</view> -->
							<view class="popBox_content_item" v-if="item=='wechat'" @click="current=index">
								<view class="d-flex j-sb a-center " style="width: 90%;">
									<view>微信支付</view>
									<radio :value="index" :checked="index === current" />
								</view>
							</view>
							<view class="popBox_content_item" v-if="item=='yue'" @click="current=index">
								<view class="d-flex j-sb a-center " style="width: 90%;">
									<view>余额支付</view>
									<view class="" v-if="vuex_user.money!=='0.00'">
										<span class="mr-20 f-size-28 color-6">剩余余额:{{vuex_user.money || 0.00}}</span>
										<radio :value="index" :checked="index === current" />
									</view>
									<view class="f-size-24 color-9 flexc" v-else
										@click.stop="routerTo('/pagesA/balance/balance')">
										<span>去充值</span>
										<u-icon name='arrow-right' size="12" color="#999"></u-icon>
									</view>
								</view>
							</view>
						</label>
					</radio-group>
				</view>

				<view class="payBtn" @click="confirm">
					确认支付
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		// createObj 创建订单需要的参数
		// package_id洗车套餐的id有这个id说明是洗车
		props: ['popShow', 'package_id', 'curpage', 'orderNo', 'pageurl', 'navidx', 'order', 'sign', 'createObj',
			'isToast'
		],
		name: "paypopup",
		data() {
			return {
				pay_type: ['wechat', 'yue', 'chiShu'],
				current: 0,
				common: uni.getStorageSync('public'),
				paybtnshow: true
			};
		},
		watch: {
			order(val) {
				if (val) {
					this.payorder(this.orderNo)
				}
			}
		},
		methods: {
			close1() {
				this.$emit('close')
			},
			close() {
				if (this.navidx == 1) {

				} else if (this.navidx == 2) {

				} else {
					uni.reLaunch({
						url: this.pageurl
					})
				}
				this.$emit('close')
			},
			confirm() {
				if (this.paybtnshow) {
					this.paybtnshow = false
					setTimeout(() => {
						this.paybtnshow = true
					}, 1000)
					if (this.sign) {
						this.$emit('confirm')
					} else {
						if (this.orderNo) {
							this.payorder(this.orderNo)
						} else {
							if (this.package_id) {
								this.buyPackageApi()
							} else {
								this.createOrder()
							}
						}
					}
				} else {
					this.showToast('请勿重复支付')
				}


			},
			// 创建洗车订单
			async buyPackageApi() {
				let that = this
				that.buyPackage({
					package_id: this.package_id
				}).then(res => {
					console.log('res', res);
					if (res.code == 1) {
						that.payorder(res.data.orderNo)
					}
				})
			},


			// 创建订单
			async createOrder() {
				let res = await this.couponCreate(this.createObj)
				if (res.code == 1) {
					this.payorder(res.data.orderNo)
				}
			},
			// 支付
			async payorder(orderNo) {
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
						orderNo: orderNo,
						payType: 1
					})
					if (data_seed.code == 1) {
						this.paysubscription(arr, data_seed.data, this.pageurl, this.navidx, this.isToast)
					} else {
						this.showToast(data_seed.msg)
					}
				} else {
					let data_seed = await this.orderPay({
						orderNo: orderNo,
						payType: 2
					})
					if (data_seed.code == 1) {
						if (this.package_id) {
							this.showToast('支付成功')
						}

						this.subscription(arr, this.pageurl, this.navidx)
					}
				}
				this.$store.commit('userApi')
				this.$emit('close')
			}

		}
	}
</script>

<style lang="less">
	.popBox {
		// height: 500rpx;
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;
		width: 100%;

		.popBox_title {
			font-size: 32rpx;
			color: #000;
			width: 100%;
			margin-bottom: 36rpx;
		}

		.popBox_content {
			font-size: 32rpx;

			.popBox_content_item {
				height: 100rpx;
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