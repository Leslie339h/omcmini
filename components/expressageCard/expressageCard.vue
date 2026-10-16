<template>
	<view>
		<u-popup :show="show" :round="10" closeable='true' @close="close" mode="center">
			<view class="pop_box">
				<view class="text-center f-size-34 f-blod">快递信息</view>
				<view class="d-flex a-center pt-30 pb-30 j-sb u-border-bottom">
					<view class="f-size-28 color-3d f-blod">
						快递公司
					</view>
					<view class="f-size-24 color-3d d-flex a-center" @click="pickerShow=true">
						<input disabled="true" v-model="express_name" type="text" placeholder="请选择快递公司" />
						<view class="pt-6">
							<u-icon name="arrow-right" size='12'></u-icon>
						</view>
					</view>
				</view>
				<view class=" pt-30 pb-30 d-flex a-center j-sb u-border-bottom">
					<view class="f-size-28 color-3d f-blod">
						快递单号
					</view>
					<view class="f-size-24 color-3d">
						<input v-model='express_order' type="text" placeholder="请填写快递单号" />
					</view>
				</view>


				<view class="btns d-flex a-center j-sb">
					<view class="btn_1">
						取消
					</view>
					<view class="btn_2" @click="qdconfirm">
						确定
					</view>
				</view>
			</view>
		</u-popup>


		<u-picker keyName='name' @confirm='confirm' :show="pickerShow" :columns="columns"
			@cancel='pickerShow=false'></u-picker>
	</view>
</template>

<script>
	export default {
		name: "expressageCard",
		props: ['show', 'order_id'],
		// order_id订单号
		data() {
			return {
				pickerShow: false,
				columns: [
					[],
				],
				express_id: '',
				express_name: "",
				express_order: ''
			};
		},
		mounted() {
			this.expressListApi()
		},
		methods: {
			close() {
				this.$emit('close')
			},
			async expressListApi() {
				let res = await this.expressList()
				if (res.code == 1) {
					this.columns[0] = res.data
				}
			},
			confirm(e) {
				console.log('eee', e);
				this.express_id = e.value[0].id
				this.express_name = e.value[0].name
				this.pickerShow = false
			},
			qdconfirm() {
				let obj = {
					express_id: this.express_id,
					express_order: this.express_order
				}
				this.$emit('confirm', obj)
				this.close()
			}
		}
	}
</script>

<style lang="scss">
	.pop_box {
		width: 550rpx;
		padding: 30rpx;
		box-sizing: border-box;

		input {
			text-align: right;
		}
	}

	.btns {
		margin-top: 30rpx;

		.btn_1 {
			text-align: center;
			width: 200rpx;
			height: 80rpx;
			font-size: 30rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
			color: #3d3d3d;
			line-height: 80rpx;
		}

		.btn_2 {
			width: 209rpx;
			height: 80rpx;
			background: #036045;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 30rpx;
			color: #FFFFFF;
		}
	}
</style>