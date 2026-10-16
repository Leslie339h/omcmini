<template>
	<view>
		<u-navbar :placeholder='true' :title="title" @rightClick="rightClick" :bgColor="bgColor" :autoBack="true">
		</u-navbar>
		<view class="group_1">
			现金红包
		</view>
		<view class="group_2">
			<span>{{int.commission}}</span><span class="f-size-24">元</span>
		</view>
		<view class="group_3" @click="modalShow=true">
			提现到微信
		</view>
		<view class="group_4">
			<view class="group_4_title">
				提现记录
			</view>
			<view class="mt-20">
				<scroll-view scroll-y="true" class="scroll_box">
					<empty v-if="list.length==0"></empty>
					<view class="scroll_box_item d-flex a-center j-sb" v-for="item in list"
						@scrolltolower='scrolltolower'>
						<image class="scroll_box_item_img" src="../static/bicon8.png" mode="aspectFill"></image>
						<view class="scroll_box_item_right flexColumn">
							<view class="d-flex a-center j-sb">
								<span class="f-size-28 color-3d f-600">{{item.username}}</span>
								<span class="color-036045 f-size-28 f-600">-{{item.amount}}</span>
							</view>
							<view class="d-flex a-center j-sb">
								<view class="color-9 f-size-28">
									{{item.createtime | monthFormat}}
								</view>
								<view class="color-9 f-size-24">
									剩余金额：{{item.residue_amount}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<u-modal :show="modalShow" @cancel='modalShow=false' @confirm='modalConfirm' :title="modalTitle"
			:showCancelButton='true'>
			<view class="slot-content">
				<view class="">
					<u--input placeholder="请输入提现金额" border="surround" v-model="value"></u--input>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: 'transparent',
				title: '',
				list: [],
				page: 1,
				modalTitle: '提现',
				value: '',
				modalShow: false,
				int: {}
			};
		},
		onLoad() {
			this.drawLogApi()
			this.distributionIndexApi()
		},
		methods: {
			async distributionIndexApi() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.distributionIndex()
				if (res.code == 1) {
					this.int = res.data
					uni.hideLoading()
				}
			},
			async modalConfirm() {
				let res = await this.distributionDraw({
					withdraw_money: this.value
				})
				if (res.code == 1) {
					this.modalShow = false
					this.showToast('提现成功,请等待审核')
				}
			},
			scrolltolower() {
				this.page++
				this.drawLogApi(1)
			},
			async drawLogApi(e) {
				let res = await this.drawLog({
					status: 3,
					page: this.page
				})
				if (res.code == 1) {
					if (e == 1) {
						this.list = [...this.list, ...res.data.data]
					} else {
						this.list = res.data.data
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(145deg, #0CB080 0%, #66CDAF 56%, #ECF7F5 97%);
	}

	.group_1 {
		font-weight: 400;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.group_2 {
		font-weight: 900;
		font-size: 120rpx;
		color: #FFFFFF;
		text-align: center;
		margin: 0rpx 0 20rpx;
	}

	.group_3 {
		width: 352rpx;
		height: 88rpx;
		background: #fff;
		opacity: 0.8;
		border-radius: 334rpx;
		font-weight: 400;
		font-size: 40rpx;
		color: #3D3D3D;
		line-height: 88rpx;
		text-align: center;
		margin: 0 auto;
	}

	.group_4 {
		width: 690rpx;
		height: 60vh;
		background: linear-gradient(180deg, #FFEDD8 0%, #FFFFFF 100%);
		border-radius: 34rpx 34rpx 34rpx 34rpx;
		margin: 40rpx auto 0;
		padding: 50rpx;
		box-sizing: border-box;

		.group_4_title {
			font-size: 36rpx;
			color: #3D3D3D;
			font-weight: 600;
		}
	}

	.scroll_box {
		height: calc(60vh - 150rpx);

		.scroll_box_item {
			margin-bottom: 20rpx;

			.scroll_box_item_img {
				width: 90rpx;
				height: 108rpx;
			}

			.scroll_box_item_right {
				padding: 8rpx 0;
				box-sizing: border-box;
				width: calc(100% - 120rpx);
				height: 108rpx;
			}
		}
	}
</style>