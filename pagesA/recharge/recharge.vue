<template>
	<view>
		<image src="../static/aicon10.png" class="bg_1" mode=""></image>
		<u-navbar placeholder='true' title="次数购买" @rightClick="rightClick" :bgColor="bgColor" :autoBack="true">
		</u-navbar>
		<view class="box">
			<view class="">
				<view class="color-f f-size-28">
					洗车次数
				</view>
				<view class="color-f f-size-50 f-bold mt-16">
					{{xc_num || 0}}
				</view>
				<view class="color-f f-size-24 mt-10">
					当前店铺： {{vuex_shop_info.title}}
				</view>

			</view>
			<image class="bg_2" src="../static/aicon11.png" mode=""></image>
		</view>
		<view class="title a-center j-sb mt-38">
			<view class="f-size-36 f-bold color-3d">
				次数购买
			</view>
			<view class="a-center" @click="routerTo('/pagesA/payHistory/payHistory?type=2')">
				<span class="f-size-28 color-3d">充值明细</span>
				<view class="">
					<u-icon name='arrow-right' size='12' color='#3D3D3D'></u-icon>
				</view>
			</view>
		</view>

		<view class="box-1 mt-30 ">
			<view class="box_1_item" :class="current==index?'active':''" @click="current=index"
				v-for="(item,index) in list" :key="index">
				<view class="f-size-32 color-3d">
					{{item.number}}次
				</view>
				<view class="f-size-32 f-bold mt-30">
					¥ {{item.price}}
				</view>
			</view>
		</view>

		<payPop :pageurl='""' :isToast="'充值成功'" :package_id='package_id' :popShow='popShow' @close='popShow=false'
			:navidx='2'>
		</payPop>

		<view class="btn" @click="buy">
			购买
		</view>
		<view class="f-size-24 mt-30 color-03">
			温馨提示：洗车套餐已购买，不支持退款，如果需要退款，自行联系门店处理。
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: "transparent",
				current: 0,
				list: [],
				post_num: 0,
				package_id: null,
				orderNo: '',
				popShow: false,
				paybtnshow: true,
				xc_num: 0
			};
		},
		onLoad() {
			this.$store.commit('userApi')
			this.postPositionPackage()
		},
		methods: {
			async buy() {
				let that = this
				this.package_id = this.list[this.current].id
				that.popShow = true
			},
			async postPositionPackage() {
				let res = await this.washList({
					store_id: this.vuex_shop_info.id
				})
				if (res.code == 1) {
					this.list = res.data.data
					this.xc_num = res.data.number
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.bg_1 {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: 358rpx;
	}

	.box {
		width: 690rpx;
		height: 230rpx;
		background: #3E75FE;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin: 30rpx auto 0;
		padding: 36rpx 46rpx 52rpx;
		box-sizing: border-box;
		position: relative;

		.bg_2 {
			position: absolute;
			right: 0;
			top: 0;
			width: 240rpx;
			height: 240rpx;
		}
	}

	.box-1 {
		display: grid;
		grid-template-columns: repeat(3, 32%);
		row-gap: 20rpx;
		justify-content: space-between;

		.active {
			background: #E6F2FF !important;
			border: 5rpx solid #2966FF !important;
		}

		.box_1_item {
			padding: 34rpx 26rpx 0;
			box-sizing: border-box;
			width: 208rpx;
			height: 192rpx;
			background: #F5F7F9;
			border-radius: 31rpx 31rpx 31rpx 31rpx;
			border: 5rpx solid #E8EBEA;
		}
	}

	.btn {
		width: 701rpx;
		height: 101rpx;
		background: #2966FF;
		border-radius: 51rpx 51rpx 51rpx 51rpx;
		font-weight: 400;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 101rpx;
		text-align: center;
		margin-top: 50rpx;
	}
</style>