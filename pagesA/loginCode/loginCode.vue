<template>
	<view>
		<view class="text_1">
			输入短信验证码
		</view>
		<view class="text_2">
			短信验证码至 <span>{{cell}}</span>
		</view>
		<view class="ipt_box_1">
			<view class="ipt_box">
				<u-code-input maxlength='4' @finish='finish' v-model="value"></u-code-input>
			</view>
		</view>

		<view class="text_3" v-if="timerShow" @click="send">
			重新发送
		</view>
		<view class="text_3" v-else>
			{{timer}}秒后重新发送
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: 60,
				value: '',
				cell: "",
				timerShow: false
			};
		},
		onLoad(e) {
			this.cell = e.cell
			this.setTime()
		},
		methods: {
			async send() {
				let data = await this.send({
					mobile: this.cell
				})
				if (data.code == 1) {
					this.setTime()
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
			},
			setTime() {
				let int = null
				int = setInterval(() => {
					this.timer--
					if (this.timer <= 0) {
						this.timerShow = true
						this.timer = 60
						clearInterval(int)
					}
				}, 1000)
			},
			async finish() {
				let res = await this.check({
					mobile: this.cell,
					captcha: this.value
				})
				if (res.code == 1) {
					uni.setStorageSync('token', res.data.userinfo.token)
					this.$store.state.vuex_token = res.data.userinfo.token
					setTimeout(() => {
						this.$store.commit('getopenid')
					}, 2000)
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
				}
			}
		}
	}
</script>

<style lang="scss">
	.text_1 {
		margin-top: 116rpx;
		font-weight: 600;
		font-size: 42rpx;
		color: #202020;
		text-align: center;
	}

	.text_2 {
		margin-top: 14rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: #858585;
		text-align: center;
	}

	.ipt_box_1 {
		position: relative;
		width: 100vw;
		height: 20vh;
	}

	.ipt_box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.text_3 {
		font-size: 24rpx;
		color: #858585;
		text-align: center;
	}
</style>