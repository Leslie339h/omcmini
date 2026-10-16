<template>
	<!-- OrderInformation  -->
	<view>
		<view class="content">
			<view class="content_text">
				<view class="content_text_title">
					订单信息
				</view>
				<view class="content_text_time" @click="getopenLocation(content_list.lat,content_list.lon)">
					<text>下单门店</text>
					<view class="d-flex a-center">
						<view class="">
							<u-icon name="map" color="#999" size="14"></u-icon>
						</view>
						<text>{{content_list.store || '---'}}</text>
					</view>

				</view>

				<view class="content_text_location">
					<text>下单时间</text>
					<text>{{content_list.createtime | timerFormat}}</text>
				</view>
				<view class="content_text_location">
					<text>订单号</text>
					<text><text style="color: #282828;">{{content_list.order_no}}</text>
						<text @tap="setClipboardData(content_list.order_no)" style="color: #A2A2A2 ;">｜复制</text></text>
				</view>
				<view class="content_text_time">
					<text>订单状态</text>
					<text v-if="content_list.status==2 && content_list.order_type=='1'">{{'待自取' || '--'}}</text>
					<text v-else>{{content_list.status_text || '--'}}</text>
				</view>
				<view class="content_text_location">
					<text>备注信息</text>
					<text>{{content_list.remark || '--'}}</text>
				</view>
				<view class="content_text_location" v-if='content_list.status !==1'>
					<text>支付方式</text>
					<text>{{content_list.pay_type ==2?'余额':"微信"}}</text>
				</view>


			</view>
		</view>

		<height :hg="20"></height>
	</view>
</template>

<script>
	export default {
		name: "OrderInformation",
		props: {
			content_list: {

			}
		},
		data() {
			return {

			};
		},
		methods: {
			async take(order_id) {
				console.log(order_id);
				let data = await confirm({
					order_id
				})
				if (data.code == 1) {
					this.$emit('update')
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 18rpx;
		margin: 0rpx auto;
		margin-top: 20rpx;

		.content_text {
			padding: 20rpx 40rpx;

			.content_text_title {
				border-bottom: 1rpx solid #F7F7F7;
				font-size: 32rpx;
				font-weight: 600;
				color: #333333;
				padding-bottom: 20rpx;
			}

			.content_text_time {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 30rpx 0;

				text:nth-child(1) {
					font-size: 24rpx;
					font-weight: 400;
					color: #9D9D9D;
				}

				text:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #282828;
				}
			}

			.content_text_location {
				display: flex;
				justify-content: space-between;
				margin: 30rpx 0;

				text:nth-child(1) {
					font-size: 24rpx;
					font-weight: 400;
					color: #9D9D9D;
				}

				text:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #282828;
				}
			}

			.record_pay {
				display: flex;
				flex-direction: row-reverse;
				padding-top: 20rpx;
				border-top: 1rpx dashed #EFEFEF;

				view {
					width: 155rpx;
					height: 55rpx;
					background: #00C8FF;
					border-radius: 28rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #F9FDFF;
					line-height: 55rpx;
					text-align: center;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>