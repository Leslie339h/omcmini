<template>
	<view class="box">
		<view class="">
			<u-tabs itemStyle="padding-left: 40rpx; padding-right: 40rpx; height: 70rpx;" :current='current'
				:list="tablist" @click="click"></u-tabs>
		</view>

		<view class="card" v-if="current==0">
			<view class="card_item d-flex a-center ">
				<view class="left">
					卡号
				</view>
				<input class="right" v-model="list.bank_code" type="text" placeholder="请输入银行卡卡号">
			</view>
			<!-- <view class="card_item d-flex a-center j-sb">
				<view class="left">
					类型
				</view>
				<input @click="show=true" style="width: 470rpx;" class="right" disabled="true" type="text"
					v-model="list.bank_mobile" placeholder="请选择">
				<u-icon name="arrow-right" size="14"></u-icon>
			</view> -->
			<view class="card_item d-flex a-center ">
				<view class="left">
					手机号
				</view>
				<input class="right" maxlength="11" type="text" v-model="list.bank_mobile" placeholder="请输入银行预留手机号">
			</view>
			<view class="card_item d-flex a-center ">
				<view class="left">
					验证码
				</view>
				<input class="yzm" v-model="list.code" maxlength="4" type="number" placeholder="请输入验证码">
				<view class="btn" v-if="yzmshow" @click="sendApi">
					获取验证码
				</view>
				<view class="gray" v-else>
					{{time}}s后重新获取
				</view>
			</view>
		</view>



		<view class="card" v-if="current==1">
			<view class="card_item flexc">
				<view class="left" style="margin-top: 2rpx;">
					账号
				</view>
				<input class="right" v-model="list.wx_code" type="text" placeholder="请输入您的微信账号">
			</view>
			<view class="title">
				请上传您的微信收款码
			</view>
			<image class="addimg" :src="frontimg.fullurl" mode="" v-if="frontimg.fullurl" @click="upfront(1)"></image>
			<image class="addimg" src="../static/ac.png" mode="" @click="upfront(1)" v-else></image>
		</view>


		<view class="card" v-if="current==2">
			<view class="card_item flexc">
				<view class="left" style="margin-top: 2rpx;">
					账号
				</view>
				<input class="right" v-model="list.zfb_code" type="text" placeholder="请输入您的支付宝账号">
			</view>
			<view class="title">
				请上传您的支付宝收款码
			</view>
			<image class="addimg" :src="frontimg1.fullurl" mode="" v-if="frontimg1.fullurl" @click="upfront(2)"></image>
			<image class="addimg" src="../static/ac.png" mode="" @click="upfront(2)" v-else></image>
		</view>


		<u-picker @cancel='show=false' @confirm='confirm' :show="show" :columns="columns"></u-picker>
		<view class="qrbtn" @click="add">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				columns: [
					['储蓄卡', '借记卡']
				],
				show: false,
				current: 0,
				yzmshow: true,
				time: 60,
				timer: null,
				list: {
					type: 1,
					bank_code: '', //银行卡号码
					// bank_name: "",
					bank_mobile: "", //手机号
					zfb_code: "", //支付宝账号
					zfb_img: '', //支付宝收款码
					wx_code: '', //微信账号
					wx_img: '', //微信收款码
					code: '', //短信验证码
				},
				tablist: [{
					name: '添加银行卡',
				}, {
					name: '添加微信',
				}, {
					name: '添加支付宝'
				}],
				frontimg: null,
				frontimg1: null
			};
		},
		methods: {
			click(e) {
				console.log('eee', e);
				this.current = e.index
				this.list = {
					type: 1,
					bank_code: '', //银行卡号码
					// bank_name: "",
					bank_mobile: "", //手机号
					zfb_code: "", //支付宝账号
					zfb_img: '', //支付宝收款码
					wx_code: '', //微信账号
					wx_img: '', //微信收款码
					code: '', //短信验证码
				}
				this.frontimg = null
				this.frontimg1 = null
			},
			async add() {
				if (this.current == 0) {
					this.list.type = 1
					this.list.bank_code = this.list.bank_code.replace(/\s+/g, '')
					let bank = this.$way.isValidBankCard(this.list.bank_code)
					let mobile = this.$way.validatePhoneNumber(this.list.bank_mobile)
					if (!bank) return this.showToast('请输入正确卡号')
					if (!mobile) return this.showToast('请输入正确手机号')
				} else if (this.current == 1) {
					if (!this.list.wx_code) return this.showToast('请输入账号')
					if (!this.frontimg) return this.showToast('请上传收款码')
					this.list.wx_img = this.frontimg.url
					this.list.type = 2
				} else {
					if (!this.list.zfb_code) return this.showToast('请输入账号')
					if (!this.frontimg1) return this.showToast('请上传收款码')
					this.list.zfb_img = this.frontimg1.url
					this.list.type = 3
				}
				let res = await this.add_withdrawal_account(this.list)
				if (res.code == 1) {
					this.showToast('提交成功,请等待审核')
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}
			},
			setTimer() {
				if (this.yzmshow) {
					this.yzmshow = false
					this.timer = setInterval(() => {
						this.time--
						if (this.time < 0) {
							clearInterval(this.timer)
							this.yzmshow = true
							this.time = 60
						}
					}, 1000)
				}
			},
			// 发送验证码
			async sendApi() {
				let res = await this.send({
					mobile: this.list.bank_mobile
				})
				if (res.code == 1) {
					this.setTimer()
				}

			},
			// 上传图片
			upfront(e) {
				this.uploadImg().then(res => {
					if (e == 1) {
						this.frontimg = res.data
					} else {
						this.frontimg1 = res.data
					}
					console.log('res', res);
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F7FB;
	}

	.addimg {
		width: 200rpx;
		height: 200rpx;
		margin: 20rpx 0;
	}

	.box {
		box-sizing: border-box;
	}

	.gray {

		height: 50rpx;
		background: #FFFFFF;
		border-radius: 25rpx;
		border: 1rpx solid #ffffff;
		font-size: 24rpx;
		color: #777777;
		text-align: center;
		line-height: 50rpx;
		margin-top: -10rpx;
		margin-left: 20rpx;
	}

	page {
		padding: 0rpx 26rpx;
		box-sizing: border-box;
	}


	.title {
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
		margin: 16rpx 0 0;
	}

	.card {
		padding: 0 40rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
		margin: 40rpx 0 100rpx;

		.card_item {
			padding: 34rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #f5f5f5;

			.left {
				font-size: 28rpx;
				color: #333333;
				width: 140rpx;
			}

			.yzm {
				width: 300rpx;
			}

			.btn {
				width: 158rpx;
				height: 50rpx;
				background: #FFFFFF;
				border-radius: 25rpx;
				border: 2rpx solid #036045;
				font-size: 24rpx;
				color: #036045;
				text-align: center;
				line-height: 50rpx;
				margin-top: -10rpx;
				margin-left: 20rpx;
			}
		}
	}

	.qrbtn {
		width: 700rpx;
		height: 98rpx;
		background: #036045;
		border-radius: 14rpx;
		text-align: center;
		line-height: 98rpx;

		font-size: 32rpx;
		color: #FFFFFF;
	}
</style>