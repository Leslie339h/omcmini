<template>
	<view>
		<view class="p-re">
			<image class="head_img" src="../../static/login.png" mode="aspectFill"></image>
			<view class="close">
				<u-icon name="close" @click="routerBack" size="36rpx" color="#fff"></u-icon>
			</view>
			<view class="text_box">
				<view class="color-f f-size-60 f-blod">
					HELLO,
				</view>
				<view class="d-flex a-center color-f f-blod f-size-60">
					<span class="pb-6">欢迎使用</span>
					<view class="text_box_btn ml-10 ">
						{{common.share_title}}
					</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="box_title">
				登录账号 精彩永相随
			</view>

			<view class="base base_quick">
				<view class="base_img">
					<button open-type="getPhoneNumber" @getphonenumber="getphonenumber">
						<image :src="common.login_img || '../../static/phone.png'" mode=""></image>
					</button>
				</view>
				<view class="base_tip">手机快捷登录</view>

				<view class="d-flex a-start base_agree">
					<view class="xz_box mr-14" @tap="rad">
						<view class="" v-if="r1">
							<image class="bg_1" src="../../static/xz.png" mode="widthFix"></image>
						</view>
						<view v-else class="xzquan"></view>
					</view>
					<view class="radio" @tap="rad">
						<text>登录即代表同意</text>
						<text @tap.stop="routerTo('/pagesD/agreement/agreement?name='+'用户协议')">《用户协议》,</text>
						<text @tap.stop="routerTo('/pagesD/agreement/agreement?name='+'隐私政策')">《隐私政策》</text>
						<text>及</text>
						<text
							@tap.stop="routerTo('/pagesD/agreement/agreement?name='+'第三方SDK类服务商说明')">《第三方SDK类服务商说明》</text>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="center" :round='16' @close="show=false">
			<view class="box_up">
				<view class="box_up_title">
					温馨提示
				</view>
				<view class="box_up_radio">
					<text>为了向您提供更好的服务, 请阅读并同意 </text>
					<text class="color-03"
						@tap.stop="routerTo('/pagesD/agreement/agreement?name='+'用户协议')">《用户协议》、</text>
					<text class="color-03"
						@tap.stop="routerTo('/pagesD/agreement/agreement?name='+'隐私协议')">《隐私协议》,</text>
					<text>点击同意后才能使用相关功能 </text>
				</view>
				<view class="d-flex j-sb">
					<view class="box_up_btn_1" @tap="noconsent">
						不同意
					</view>
					<view class="box_up_btn_2" @tap="consent">
						同意并继续
					</view>

				</view>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				r1: false,
				show: false,
				codeall: '',
				common: uni.getStorageSync('common')
			};
		},

		onLoad() {
			this.getLoginCode().then(res => {
				this.codeall = res
			})
		},

		methods: {
			async afterLoginNav() {
				const u = await this.userInfo()
				if (u.code == 1) {
					this.$u.vuex('vuex_user', u.data)
					uni.setStorageSync('user', u.data)
					if (u.data.need_complete_store == 1 || u.data.auth_status == -2 || u.data.auth_status === '-2') {
						uni.reLaunch({
							url: '/pagesC/shopAuthentication/shopAuthentication'
						})
						return
					}
				}
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			getpage() {
				let res = getCurrentPages()
				if (res.length <= 1) {
					uni.switchTab({
						url: '/pages/home/home'
					})
				} else {
					uni.navigateBack()
				}
			},
			goback() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			rad() {
				if (this.r1) {
					this.r1 = false
				} else {
					this.show = true
				}
			},
			consent() {
				this.r1 = true
				this.show = false
			},
			noconsent() {
				this.r1 = false
				this.show = false
			},

			getphonenumber(e) {
				//#ifdef MP-WEIXIN
				if (e.detail.errMsg == "getPhoneNumber:ok") {} else {
					return
				}
				// #endif

				if (!this.r1) {
					uni.showToast({
						title: '请勾选用户协议',
						icon: 'none'
					})
					return
				}
				uni.checkSession({
					success(res) {},
					fail(res) {
						this.onShow()
					}
				})
				let list = {
					code: this.codeall,
					iv: encodeURIComponent(e.detail.iv),
					encryptedData: encodeURIComponent(e.detail.encryptedData)
				}
				this.user_loginApi(list)
			},
			async user_loginApi(list) {
				let res = await this.login(list)
				if (res.code == 1) {
					uni.setStorageSync('token', res.data.userinfo.token)
					this.$u.vuex('vuex_token', res.data.userinfo.token)
					setTimeout(() => {
						this.$store.commit('getopenid')
					}, 1000)
					await this.afterLoginNav()
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		background-color: #FFFFFF;
	}

	::v-deep button {
		width: 96rpx;
		height: 96rpx;
		background-color: transparent;
		padding: 0;

		image {
			width: 96rpx;
			height: 96rpx;
		}
	}

	.xz_box {
		.bg_1 {
			width: 50rpx;
		}

		.xzquan {
			width: 50rpx;
			height: 50rpx;
			border: 3rpx solid #999;
			border-radius: 50%;
			box-sizing: border-box;
			background-color: #fff;
		}
	}

	.box {
		margin: -40rpx 0 0;
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
		border-radius: 60rpx 60rpx 0rpx 0rpx;
		padding: 94rpx 60rpx 0;
		box-sizing: border-box;

		.box_title {
			font-weight: 600;
			font-size: 42rpx;
			color: #1C1C1C;
			text-align: center;
		}

		.base_quick {
			margin-top: 48rpx;
		}

		.base_tip {
			text-align: center;
			font-size: 26rpx;
			color: #9A9A9A;
			margin-bottom: 48rpx;
		}

		.base_agree {
			padding-bottom: 60rpx;
		}

		.base_img {
			width: 100rpx;
			height: 100rpx;
			margin: 0 auto 20rpx;
		}

		.radio {
			width: 523+20rpx;

			text:nth-child(1) {
				font-size: 24rpx;
				font-weight: 400;
				color: #9A9A9A;
			}

			text:nth-child(2) {
				font-size: 24rpx;
				font-weight: 400;
				color: #4A94FF;
			}

			text:nth-child(3) {
				font-size: 24rpx;
				font-weight: 400;
				color: #4A94FF;
			}

			text:nth-child(4) {
				font-size: 24rpx;
				font-weight: 400;
				color: #9A9A9A;
			}

			text:nth-child(5) {
				font-size: 24rpx;
				font-weight: 400;
				color: #4A94FF;
			}
		}
	}

	.box_up {
		width: 578rpx;
		height: 398rpx;
		padding: 36rpx 28rpx 0;
		box-sizing: border-box;

		.box_up_title {
			font-weight: 400;
			font-size: 32rpx;
			color: #3D3D3D;
			text-align: center;
		}

		.box_up_radio {
			width: 522rpx;
			margin: 26rpx auto 78rpx;
			font-size: 28rpx;
			color: #999999;

		}

		.box_up_btn_1 {
			width: 196rpx;
			height: 66rpx;
			border-radius: 972rpx 972rpx 972rpx 972rpx;
			border: 2rpx solid #999999;
			font-weight: 400;
			font-size: 28rpx;
			color: #999999;
			line-height: 66rpx;
			text-align: center;
		}

		.box_up_btn_2 {
			width: 196rpx;
			height: 66rpx;
			border-radius: 972rpx 972rpx 972rpx 972rpx;
			border: 2rpx solid #999999;
			background: #214B3D;
			font-weight: 400;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 66rpx;
			text-align: center;
		}
	}

	.head_img {
		width: 100%;
		height: 430rpx;


	}

	.text_box {
		font-size: 60rpx;
		position: absolute;
		bottom: 6vh;
		left: 38rpx;

		.text_box_btn {
			padding: 0 20rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 20rpx 40rpx 40rpx 4rpx;
			font-weight: 900;
			font-size: 36rpx;
			color: #22A779;
			line-height: 62rpx;
			text-align: center;
		}
	}

	.close {
		position: absolute;
		top: 6vh;
		left: 38rpx;
	}
</style>
