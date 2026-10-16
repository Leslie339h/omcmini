<template>
	<view>
		<u-popup :safeAreaInsetBottom='false' :show="show" mode="center" closeable='true' :round="10" @close="close">
			<view class="box">
				<view class="f-size-32 f-bold text-center color-3d">
					拒绝退款
				</view>
				<view class="ipt_box">
					<u--input placeholder="请输入拒绝原因" border="surround" v-model="value"></u--input>
				</view>
				<view class="btns a-center j-sb">
					<view class="btn_1" @click="close">
						取消
					</view>
					<view class="btn_2" @click="comfirm">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "refundPop",
		props: ['show'],
		data() {
			return {
				value: ''
			};
		},
		methods: {
			close() {
				this.$emit('close')
			},
			comfirm() {
				if (this.value) {
					this.$emit('comfirm', this.value)
					this.$emit('close')
				} else {
					this.showToast('请输入拒绝原因')
				}

			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 500rpx;
		padding: 30rpx 0rpx 0;
		box-sizing: border-box;
	}

	.ipt_box {
		margin: 30rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.btns {
		border-top: 1rpx solid #eee;

		.btn_1 {
			width: 50%;
			text-align: center;
			line-height: 80rpx;
			border-right: 1rpx solid #eee;
		}

		.btn_2 {
			width: 50%;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>