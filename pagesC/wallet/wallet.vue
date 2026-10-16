<template>
	<view class="wallet_box" v-show='page_Show'>
		<view class="card" ref="myElement">
			<image class="wellet" src="../static/cicon15.png" mode=""></image>
			<view class="head d-flex a-center ">
				<image :src="vuex_user.avatar" mode="aspectFill"></image>
				<view class="">
					{{vuex_user.username}}
				</view>
			</view>
			<view class="money">
				￥{{info.balance}}
			</view>
			<view class="text">
				可提现余额 <text style="margin: 0 6rpx;">{{info.balance}}</text>(元)
			</view>
			<view class="tix d-flex a-center j-center" @click="routerTo('/pagesC/cash/cash')">
				去提现
				<u-icon name="arrow-right" color="#036045" size="14"></u-icon>
			</view>

			<view class="d-flex a-center  j-sb shouyi">
				<view class="d-flex a-center  yield">
					<view class="one">
						今日收益
					</view>
					<view class="two">
						¥{{info.todayConsumeBalance || 0}}
					</view>
				</view>
				<view class="d-flex a-center  yield">
					<view class="one">
						昨日收益
					</view>
					<view class="two">
						¥{{info.yesterdayConsumeBalance || 0}}
					</view>
				</view>
			</view>
		</view>
		<view class="detail">
			<view class="title d-flex a-center j-sb">
				<view class="">
					提现明细
				</view>
				<view class="btn" @click="show = true">
					{{timeText}}
				</view>
			</view>
			<scroll-view scroll-y="true" style="height: calc(100% - 146rpx);" @scrolltolower='scrolltolower'>
				<view class="content" v-if="list.length!==0">
					<view class="item d-flex a-center  j-sb" v-for="(item,i) in list" :key="i">
						<view class="item_left d-flex a-center ">
							<view class="">
								<view class="top">{{item.type_text}}提现</view>
								<view class="bom mt-10">{{item.createtime}}</view>
							</view>
						</view>
						<view class="">
							<view class="right"> +{{item.amount}}</view>
							<view class="right  mt-10">{{item.status_text}}</view>
						</view>

					</view>
				</view>
				<view class="" v-else>
					<empty></empty>
				</view>
			</scroll-view>

		</view>
		<u-datetime-picker closeOnClickOverlay='true' :show="show" @cancel='cancel' @confirm='confirm' v-model="value1"
			mode="year-month">
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value1: Number(new Date()),
				user: uni.getStorageSync('shopuser'),
				list: [],
				date: Number(new Date()),
				mag: '100rpx 0rpx',
				timeText: '日期选择',
				page: 1,
				height: '100rpx',
				info: {},
				page_Show: false
			};
		},
		onLoad() {
			this.walletApi()
			this.revenue()
		},
		onShow() {
			this.walletApi()
			this.revenue()
		},
		methods: {
			async walletApi() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.wallet()
				if (res.code == 1) {
					this.info = res.data
					this.page_Show = true
					uni.hideLoading()
				}
			},
			async scrolltolower() {
				this.page++
				let res = await this.withdrawal_detail({
					month: this.Format(this.date),
					page: this.page
				})
				if (res.code == 1) {
					this.list = [...this.list, ...res.data]
				}
			},
			cancel() {
				this.show = false
			},
			confirm(e) {
				this.show = false
				this.date = this.$way.timerFormat(e.value)
				this.timeText = this.Format(e.value)
				this.revenue()
			},
			Format(num) {
				console.log('num', num);
				//过滤器 用于格式化时间
				let date = new Date(num); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let year = date.getFullYear();
				let month = ("0" + (date.getMonth() + 1)).slice(-2);
				let sdate = ("0" + date.getDate()).slice(-2);
				let hour = ("0" + date.getHours()).slice(-2);
				let minute = ("0" + date.getMinutes()).slice(-2);
				let second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				let result = year + "-" + month
				// 返回
				return result;
			},
			async revenue() {
				let res = await this.withdrawal_detail({
					month: this.Format(this.date),
					page: 1
				})
				if (res.code == 1) {
					this.list = res.data
				}
			},
			gopage() {
				uni.navigateTo({
					url: '/pages/merchant/cash/cash'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FAFAFA;
	}

	.wallet_box {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.card {
			background: #fff;
			padding: 0rpx 0 20rpx;
			box-sizing: border-box;
			width: 700rpx;
			margin: 30rpx auto 0;
			border-radius: 0rpx 0rpx 30rpx 30rpx;

			.tix {
				width: 184rpx;
				height: 70rpx;
				border-radius: 30rpx 0 0 30rpx;
				position: absolute;
				top: 250rpx;
				right: 20rpx;
				background-color: #fff;
				font-size: 28rpx;
				color: #036045;
				text-align: center;
				line-height: 70rpx;
			}

			.head {
				position: absolute;
				top: 60rpx;
				left: 80rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				color: #fff;
				font-size: 34rpx;
				line-height: 60rpx;

			}

			.text {
				font-size: 28rpx;
				color: #fff;
				position: absolute;
				top: 260rpx;
				left: 80rpx;
			}

			.money {
				font-size: 50rpx;
				color: #fff;
				position: absolute;
				top: 168rpx;
				left: 80rpx;
			}

			.wellet {
				width: 700rpx;
				height: 350rpx;
			}

			.shouyi {
				padding: 20rpx 60rpx 0;
				box-sizing: border-box;
			}

			.yield {
				.one {
					font-size: 24rpx;
					color: #777777;
					margin-right: 20rpx;
				}

				.two {
					font-size: 24rpx;
					color: #036045;
				}
			}
		}

		.detail {
			width: 699rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin: 40rpx auto;

			.title {
				font-size: 36rpx;
				color: #333333;
				font-weight: 600;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
			}

			.btn {
				width: 169rpx;
				background: #F1F2F2;
				border-radius: 34rpx;
				font-size: 24rpx;
				color: #777777;
				text-align: center;
				line-height: 60rpx;
			}

			.content {
				padding: 0 40rpx 40rpx;
				box-sizing: border-box;

				.item {
					padding: 24rpx 0;
					border-bottom: 1rpx solid #EBEBEB;

					.right {
						font-size: 30rpx;
						color: #036045;
						text-align: right;
					}

					.item_left {

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}

						.top {
							font-size: 32rpx;
							color: #333333;
						}

						.bom {
							font-size: 24rpx;
							color: #777777;
						}


					}
				}
			}
		}


	}
</style>