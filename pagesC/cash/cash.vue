<template>
	<view v-show="pageShow">
		<view class="rules-top" @click="rulesShow = true">
			<u-icon name="info-circle" color="#036045" size="20"></u-icon>
			<text>提现规则</text>
		</view>
		<view class="card d-flex a-center j-sb">
			<view class="">
				提现至
			</view>
			<view class="d-flex a-center " style="padding: 10rpx 0 0;box-sizing: border-box;" @click="setshow">
				<!-- <image src="../static/icon13.png" mode=""></image> -->
				<view class="" style="line-height: 30rpx;margin: 0 10rpx;" v-if='list.length!==0'>
					{{bank_name}}({{bank_code | lastfour}})
				</view>
				<view class="" style="line-height: 30rpx;margin: 0 10rpx;font-size: 26rpx;" v-else>
					请选择
				</view>
				<view class="">
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
		</view>
		<view class="card_one">
			<view class="top">
				提现金额
			</view>
			<view class="center d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="one">￥</text>
					<input class="two" v-model="type" type="number" placeholder="请输入金额">
				</view>
				<view class="thr" @click="settype">
					全部提现
				</view>
			</view>
			<view class="bom">
				可提现金额 ￥ {{info.balance}}
			</view>
		</view>
		<view class="qrBtn" @click="getdrawal">
			确认提现
		</view>
		<view class="content">
			<view class="rules-summary-title">提现规则摘要</view>
			<view>最低提现金额：1元；每日可免费提现1次</view>
			<view>申请时间：全天24小时（23:50—次日00:10提交的申请纳入次日处理）</view>
			<view>到账时间：工作日24小时内审核及打款，正常1—3小时到账</view>
			<view>提现手续费：免费</view>
			<view class="rules-detail-link" @click="rulesShow = true">查看完整提现规则 ></view>
		</view>
		<withdrawal-rules-popup :show.sync="rulesShow"></withdrawal-rules-popup>

		<u-popup :show="show" :round="20" @close="close">
			<view>
				<view class="popTitle d-flex a-center j-sb">
					<view class=""></view>
					<view class="">请选择提现账号</view>
					<view class="" @click="routerTo('/pagesC/addCard/addCard')">添加</view>
				</view>
				<scroll-view scroll-y="true" style="height: 650rpx;">
					<view class="" v-if="list.length!==0">
						<view class="popItem d-flex a-center j-sb" v-for="(item,i) in list" :key="i"
							@click="setaddIdx(i,item.id,item.type,item.bank_name,item.bank_code,item.wx_code,zfb_code)">
							<view class="left d-flex a-center">
								<image class='img' v-if="item.type==1" :src="item.bank_icon" mode="aspectFill"></image>
								<image :style="{backgroundColor:item.rgb}" class='img' v-if="item.type==2"
									src="../static/wx.svg" mode="aspectFill"></image>
								<image :style="{backgroundColor:item.rgb}" class='img' v-if="item.type==3"
									src="../static/zfb.svg" mode="aspectFill">
								</image>
								<view class="">
									<view class="name" v-if="item.type==2">
										微信({{item.wx_code | lastfour}})
									</view>
									<view class="name" v-if="item.type==3">
										支付宝({{item.zfb_code | lastfour}})
									</view>
									<view class="name" v-if="item.type==1">
										{{item.bank_name}}({{item.bank_code | lastfour}})
									</view>
								</view>
							</view>
							<view class="right">
								<!-- <image v-if='addIdx==i' src="../static/icon15.svg" mode=""></image> -->
								<!-- <image src="../static/icon16.svg" mode="" v-else></image> -->
							</view>
						</view>
					</view>
					<view class="" v-else>
						<empty></empty>
					</view>
				</scroll-view>

			</view>
		</u-popup>
	</view>
</template>

<script>
	import WithdrawalRulesPopup from '@/components/withdrawalRulesPopup/withdrawalRulesPopup.vue'
	export default {
		components: { WithdrawalRulesPopup },
		data() {
			return {
				show: false,
				addIdx: 0,
				type: '',
				bank_id: '',
				list: [],
				bank_name: '',
				bank_code: "",
				info: {},
				pageShow: false,
				rulesShow: false
			};
		},
		onLoad(e) {
			this.getList()
			this.walletApi()
		},
		onShow() {
			this.getList()
		},
		methods: {
			// 提现信息
			async walletApi() {
				let res = await this.wallet()
				if (res.code == 1) {
					this.info = res.data
					this.pageShow = true
				}
			},
			gopage(url) {
				this.show = false
				uni.navigateTo({
					url
				})
			},
			// 提现
			async getdrawal() {
				if (this.info.balance <= 0.00) return this.showToast('没有可提现金额')
				let res = await this.withdrawal({
					money: this.type,
					bank_id: this.bank_id
				})
				if (res.code == 1) {
					this.showToast('提交成功，请等待审核')
					setTimeout(() => {
						this.routerBack()
					}, 1000)
				}
			},
			settype() {
				this.type = this.info.balance
			},
			async getList() {
				let res = await this.withdrawal_account_list()
				if (res.code == 1) {
					this.list = res.data
					if (res.data.length == 0) return
					if (this.list[this.addIdx].type == 1) {
						this.bank_name = this.list[this.addIdx].bank_name
						this.bank_code = this.list[this.addIdx].bank_code
						this.bank_id = this.list[this.addIdx].id
					} else if (this.list[this.addIdx].type == 2) {
						this.bank_name = '微信'
						this.bank_code = this.list[this.addIdx].wx_code
						this.bank_id = this.list[this.addIdx].id
					} else {
						this.bank_name = '支付宝'
						this.bank_code = this.list[this.addIdx].zfb_code
						this.bank_id = this.list[this.addIdx].id
					}

				}
			},


			setaddIdx(i, id, type, name, code, wxcode, zfbcode) {
				this.addIdx = i //单选
				this.bank_id = id //账户id
				this.show = false
				if (type == 2) {
					this.bank_name = '微信'
					this.bank_code = wxcode
				} else if (type == 3) {
					this.bank_name = '支付宝'
					this.bank_code = zfbcode
				} else {
					this.bank_name = name
					this.bank_code = code
				}
			},
			close() {
				this.show = false
			},
			setshow() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	.add {
		padding: 34rpx 40rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		border-top: 1rpx solid #E4E4E4;

		.left {
			line-height: 90rpx;

			image {
				width: 90rpx;
				height: 90rpx;
			}
		}
	}

	.popItem {
		padding: 24rpx 40rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		border-top: 1rpx solid #f3f3f3;

		.head {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			margin-right: 14rpx;
		}

		.left {
			.name {
				font-size: 32rpx;
				color: #333333;
				margin: 0 0 10rpx 20rpx;
				line-height: 80rpx;
			}

			.img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background-color: #f5f5f5;
				text-align: center;
				line-height: 80rpx;
			}

			.phone {
				font-size: 28rpx;
				color: #777777;
			}
		}

		.right {
			line-height: 100rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.popTitle {
		text-align: center;
		margin: 40rpx 0;
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	page {
		background: #FAFAFA;
	}

	.qrBtn {
		width: 700rpx;
		height: 98rpx;
		background: #036045;
		border-radius: 14rpx;
		text-align: center;
		line-height: 98rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		margin: 60rpx auto 40rpx;
	}

	.content {
		width: 700rpx;
		box-sizing: border-box;
		padding: 24rpx 26rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		font-size: 24rpx;
		color: #777777;
		line-height: 42rpx;
		margin: 0 auto;
	}

	.rules-summary-title { font-size: 28rpx; font-weight: 600; color: #333333; margin-bottom: 8rpx; }
	.rules-detail-link { color: #036045; text-align: right; margin-top: 8rpx; }
	.rules-top { display: flex; justify-content: flex-end; align-items: center; gap: 8rpx; width: 700rpx; margin: 20rpx auto 0; color: #036045; font-size: 26rpx; }

	.navbar {
		padding: 122rpx 50rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.card {
		width: 700rpx;
		height: 122rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: 20rpx auto;
		padding: 40rpx 24rpx;
		box-sizing: border-box;

		image {
			width: 30rpx;
			height: 30rpx;
		}

	}

	.card_one {
		width: 700rpx;
		height: 296rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: 0 auto;
		padding: 32rpx 25rpx;
		box-sizing: border-box;

		.top {
			font-size: 28rpx;
			color: #2F3337;
		}

		.center {
			border-bottom: 1rpx solid #EBEBEB;
			padding: 22rpx 0;
			box-sizing: border-box;
			margin: 30rpx 0;

			.one {
				font-size: 40rpx;
				color: #2F3337;
				margin-right: 16rpx;
			}

			.two {
				width: 300rpx;
				height: 50rpx;
				font-size: 48rpx;
				color: #2F3337;
			}

			.thr {
				font-size: 26rpx;
				color: #036045;
				margin-top: 10rpx;
			}
		}

		.bom {
			font-size: 24rpx;
			color: #777777;
		}
	}
</style>
