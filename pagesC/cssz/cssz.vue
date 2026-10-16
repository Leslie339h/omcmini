<template>
	<view class="p-re">
		<view class="box">
			<view class="mt-28 title">
				营业时间
			</view>
			<view class="box_user ">
				<view class="pt-24 pb-24 box_user_item ">
					<view class="">
						营业时段：
					</view>
					<view class="d-flex a-center j-sb mt-30">
						<view class="line_bom pb-20" style="width: 250rpx;text-align: center;"
							@click="dateshow=true,dateMark=1">
							<input disabled="true" v-model="start_times" style="width: 250rpx;" type="text"
								placeholder="开始时间" />
						</view>
						<view class="line_bom pb-20" style="width: 250rpx;text-align: center;"
							@click="dateshow=true,dateMark=2">
							<input disabled="true" v-model="end_times" style="width: 250rpx;" type="text"
								placeholder="结束时间" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-datetime-picker @cancel='dateshow=false' :show="dateshow" @confirm='dateconfirm' v-model="datevalue"
			mode="time"></u-datetime-picker>

		<view class="btn_box">
			<view class="btns" @click="store_click">
				保存
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateshow: false,
				datevalue: '',
				dateMark: 1,
				start_times: '',
				end_times: '',
			};
		},
		onLoad() {
			if (this.vuex_user.auth_status !== -1) {
				this.viewinfo()
			}
		},
		methods: {
			dateconfirm(e) {
				if (this.dateMark == 1) {
					this.start_times = e.value
				} else {
					this.end_times = e.value
				}
				this.dateshow = false
			},
			async viewinfo() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.store_authentication({
					type: "view"
				})
				if (res.code == 1 && res.data) {
					this.start_times = res.data.start_times || ''
					this.end_times = res.data.end_times || ''
				}
				uni.hideLoading()
			},
			store_click() {
				this.uniModel('温馨提示', '确定保存营业时间？').then(modelres => {
					if (modelres == 'confirm') {
						this.store_authenticationApi()
					}
				})
			},
			async store_authenticationApi() {
				if (!this.start_times) return this.showToast('请选择开始时间')
				if (!this.end_times) return this.showToast('请选择结束时间')
				let res = await this.store_config({
					start_times: this.start_times,
					end_times: this.end_times,
					store_id: this.vuex_user.store_id
				})
				if (res.code == 1) {
					this.showToast('保存成功')
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				} else {
					uni.showToast({
						title: res.msg || '保存失败',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 150rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 32rpx;
		color: #3D3D3D;
	}

	.box {
		padding: 0 30rpx;
		box-sizing: border-box;

		input {
			width: 500rpx;
		}
	}

	.line_bom {
		border-bottom: 1rpx solid #eee;
	}

	.btn_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 10;
		padding: 20rpx 30rpx 40rpx;
		border-top: 1rpx solid #eee;
	}

	.btns {
		height: 85rpx;
		background: #036045;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 85rpx;
		text-align: center;
	}
</style>
