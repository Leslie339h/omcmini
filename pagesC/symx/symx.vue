<template>
	<view class="symx">
		<view class="detail">
			<view class="title d-flex a-center j-sb">
				<view class="">
					收益明细
				</view>
				<view class="btn" @click="show = true">
					{{timeText}}
				</view>
			</view>
			<view class="content" v-if="list.length!==0">
				<view class="item d-flex a-center  j-sb" v-for="(item,i) in list" :key="item.id != null ? 'r-' + item.id : 'i-' + i">
					<view class="item_left d-flex a-center ">
						<view class="">
							<view class="top">用户{{item.username}}{{item.desc}}</view>
							<view class="bom mt-10">{{item.createtime}}</view>
							<view class="bom mt-6 hint" v-if="item.type==1 && Number(item.percent_money) > 0">
								基数¥{{item.total_money}} · 平台扣¥{{item.percent_money}}
							</view>
						</view>
					</view>
					<view class="">
						<view class="right"> {{item.type==1?'+':'-'}}{{item.amount}}</view>
						<view class="right_hint">入账门店余额</view>
					</view>

				</view>
			</view>
			<view class="" v-else>
				<empty></empty>
			</view>
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
				date: Number(new Date()),
				timeText: '日期选择',
				list: [],
				query_data: {
					page: 1,
					limit: 10,
					month: ''
				},
				loading: false,
				noMore: false
			}
		},
		onLoad() {
			// this.query_data.month = this.Format(Number(new Date()))
			this.getRevenue()
		},
		onReachBottom() {
			this.getRevenue()
		},
		methods: {
			cancel() {
				this.show = false
			},
			confirm(e) {
				this.show = false
				this.date = this.$way.timerFormat(e.value)
				this.timeText = this.Format(e.value)
				this.query_data.month = this.Format(e.value)
				this.query_data.page = 1
				this.list = []
				this.noMore = false
				this.getRevenue()
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
			// 获取收益明细（分页；勿重复请求第一页）
			getRevenue() {
				if (this.loading || this.noMore) {
					return
				}
				this.loading = true
				this.revenue(this.query_data).then(res => {
					this.loading = false
					if (res.code !== 1 || !res.data) {
						return
					}
					const rows = res.data.data || []
					if (rows.length === 0) {
						this.noMore = true
						return
					}
					this.list = [...this.list, ...rows]
					this.query_data.page += 1
					if (rows.length < this.query_data.limit) {
						this.noMore = true
					}
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #FAFAFA;
	}

	.symx {
		min-height: 100vh;
		box-sizing: border-box;
		background: #FAFAFA;
		padding-top: 30rpx;
	}

	.detail {
		width: 699rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin: 40rpx auto;
		margin-top: 0rpx;

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

				.right_hint {
					font-size: 22rpx;
					color: #999999;
					text-align: right;
					margin-top: 8rpx;
				}

				.item_left {

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.top {
						font-size: 28rpx;
						color: #333333;
					}

				.bom {
					font-size: 24rpx;
					color: #777777;
				}

				.bom.hint {
					font-size: 22rpx;
					color: #999999;
				}


				}
			}
		}
	}
</style>