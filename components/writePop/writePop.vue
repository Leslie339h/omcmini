<template>
	<view>
		<!-- @close="close" -->
		<u-popup :show="popShow" :round='10'>
			<view class="popBox">
				<view class="d-flex a-center j-sb  popBox_title">
					<view class=""></view>
					<view class="">
						请选择核销方式
					</view>
					<view class="" @click="close1">
						<u-icon name="close" size="32rpx"></u-icon>
					</view>
				</view>
				<view class="popBox_content">
					<radio-group>
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in pay_type" :key="item">
							<view class="popBox_content_item" v-if="item=='yue'" @click="current=index">
								<view class="d-flex j-sb a-center " style="width: 90%;">
									<view>用户扫码二维码核销</view>
									<view class="">
										<radio :value="index" :checked="index === current" />
									</view>
								</view>
							</view>

							<view class="popBox_content_item" v-if="item=='wechat'" @click="current=index">
								<view class="d-flex j-sb a-center " style="width: 90%;">
									<view>扫描用户会员码核销</view>
									<radio :value="index" :checked="index === current" />
								</view>
							</view>
						</label>
					</radio-group>
				</view>

				<view class="payBtn" @click="confirm">
					确认
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: ['popShow', 'curpage', 'orderNo', 'pageurl', 'navidx', 'order', 'sign'],
		name: "paypopup",
		data() {
			return {
				pay_type: ['yue', 'chiShu', 'wechat'],
				current: 0,
				userinfo: uni.getStorageSync('user'),
				common: uni.getStorageSync('public'),
				isqb: uni.getStorageSync('public').isqb
			};
		},
		watch: {
			order(val) {
				if (val) {
					this.payorder()
				}
			}
		},
		methods: {
			async getUser() {
				let user = await userInfo()
				if (user.code == 1) {
					uni.setStorageSync('user', user.data)
					this.userinfo = user.data
				}
			},
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
				if (this.sign) {
					this.$emit('confirm')
				} else {
					this.payorder()
				}

			},
			async payorder() {
				if (this.current == 0) {
					let data_seed = await order_pay({
						orderNo: this.orderNo
					})
					if (data_seed.code == 1) {
						let orderInfo = data_seed.data
						this.wxparApi(data_seed.data, this.pageurl, uni.getStorageSync(
							'public').message, this.curpage, this.navidx)
					} else {
						uni.showToast({
							title: data_seed.msg,
							icon: 'none'
						})
					}
				} else {
					let data_seed = await order_pay({
						orderNo: this.orderNo,
						payType: 2
					})
					console.log(data_seed, "data_seed")
					if (data_seed.code == 1) {
						uni.showToast({
							title: '支付成功',
							icon: "none",
							duration: 2000,
						})
						this.subscription(uni.getStorageSync('public').message, this.pageurl, this.navidx, this
							.curpage)
					} else {
						uni.redirectTo({
							url: '/pages/wallet/wallet'
						})
					}

				}
				this.getUser()
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