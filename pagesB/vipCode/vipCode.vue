<template>
	<view>
		<navbar :title="'会员码'" :titleStyle='titleStyle' :leftIconColor='leftIconColor'></navbar>
		<image class="bg_img" src="../static/bicon9.png" mode="aspectFill"></image>
		<view class="box">
			<view class="box_1 d-flex a-center">
				<image :src="vuex_user.avatar" mode="aspectFill"></image>
				<view class="ml-26">
					<view class="f-szie-32 color-3d mb-20 f-600">
						{{vuex_user.username}}
					</view>
					<view class="f-size-28 color-6">
						<span
							class="mr-20">余额剩余:{{vuex_user.money || 0}}</span><span>次数剩余:{{vuex_user.wash_number || 0}}</span>
					</view>
				</view>
			</view>
			<view class="text-center mt-48">
				<image class="code_img" :src="imgurl" mode="widthFix"></image>
			</view>

			<view class="d-flex a-center f-szie-24 color-9 text-center" style="width: 270rpx;margin: 0 auto;">
				<u-count-down @finish='finish' :time="timer" format="mm:ss"></u-count-down>
				<span class="">后刷新二维码</span>
			</view>

			<!-- 	<view class="btn_1">
				余额码
			</view>
			<view class="btn_2">
				次数码
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					color: ' #fff'
				},
				leftIconColor: '#fff',
				imgurl: '',
				timer: 120000
			};
		},
		onLoad() {
			this.$store.commit('userApi')
			this.usercodeApi()
		},
		methods: {
			finish() {
				this.$store.commit('userApi')
				this.usercodeApi()
				this.timer = 120000
			},
			async usercodeApi() {
				let res = await this.usercode()
				if (res.code == 1) {
					this.imgurl = res.data
				}
			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}

	.box {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 40rpx 40rpx;
		margin: 100rpx auto 0;
		padding-bottom: 50rpx;

		.box_1 {
			padding: 46rpx 52rpx 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #eee;

			image {
				width: 106rpx;
				height: 106rpx;
				border-radius: 50%;
			}
		}

		.code_img {
			width: 400rpx;
			text-align: center;
		}

		.btn_1 {
			width: 632rpx;
			height: 84rpx;
			background: #036045;
			border-radius: 566rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 84rpx;
			margin: 36rpx auto 0;
			text-align: center;
		}

		.btn_2 {
			margin: 36rpx auto 0;
			width: 632rpx;
			height: 84rpx;
			background: #232323;
			border-radius: 566rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>