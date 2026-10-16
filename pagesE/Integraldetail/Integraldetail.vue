<template>
	<view class="box">
		<view class="box_content">
			<view class="hade">
				<view class="hade_left">
					<text>{{content_list.point}}</text>
					<text>当前积分</text>
				</view>
				<view class="hade_right" @tap="open">
					<view>
						<image src="../static/eicon1.png" mode="widthFix"></image>
					</view>
					<view v-if="time.length>0">
						{{time[0]}}---{{time[time.length - 1]}}
					</view>
					<view class="" v-else>
						时间
					</view>
				</view>
			</view>
			<view class="record">
				<view class="record_title">
					积分记录
				</view>

				<view class="">
					<scroll-view scroll-y="true" style="height: 800rpx;" @scrolltolower='scrolltolower'>
						<empty v-if="content_list.rows.length==0"></empty>
						<view class="record_content" v-for="(item,index) in content_list.rows" :key="item">
							<view class="record_content_left">
								<view>{{item.memo}}</view>
								<view>{{item.createtime}}</view>
							</view>
							<view class="record_content_right">
								<text v-if="item.type=='add'">{{item.score}}</text>
								<text v-if="item.type=='reduce'">-{{item.score}}</text>
							</view>
						</view>
					</scroll-view>

				</view>

			</view>
		</view>

		<uni-calendar :endDate='endDate' :clearDate='false' ref="calendar" :range='true' :insert="false"
			@confirm="confirm" />
	</view>
</template>

<script>
	const d = new Date()
	const year = d.getFullYear()
	let month = d.getMonth() + 1
	month = month < 10 ? `0${month}` : month
	const date = d.getDate()
	export default {
		data() {
			return {
				show: false,
				mode: 'range',
				time: [],
				content_list: {
					rows: []
				},
				endDate: `${year}-${month}-${date}`,
				min: new Date(new Date().toLocaleDateString()).getTime() - 31 * 24 * 3600 * 1000,
				display: false,
				page: 1
			};
		},
		onLoad() {
			this.point_detailedApi()
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				this.time = []
				e.range.data.forEach(item => {
					this.time.push(item)
				})
				this.point_detailedApi()
			},
			scrolltolower() {
				this.page++
				this.point_detailedApi(1)
			},
			async point_detailedApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let data = await this.pointdetailed({
					start_time: this.time[0] || '',
					end_time: this.time[this.time.length - 1] || '',
					page: this.page
				})
				if (data.code == 1) {
					if (e == 1) {
						this.content_list = [...this.content_list, ...data.data]
					} else {
						this.content_list = data.data
					}
					this.display = true
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
	}

	.box_content {
		width: 702rpx;
		margin: 0 auto;

		.hade {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;

			.hade_left {
				text:nth-child(1) {
					font-size: 60rpx;
					font-weight: 600;
					color: #05B6F6;
				}

				text:nth-child(2) {
					font-size: 26rpx;
					font-weight: 400;
					color: #05B6F6;
				}
			}

			.hade_right {
				display: flex;
				align-items: center;

				image {
					width: 30rpx;
				}

				view:nth-child(1) {
					width: 29rpx;
					height: 32rpx;
				}

				view:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
				}
			}
		}

		.record {
			min-height: 900rpx;
			height: auto !important;
			height: 900rpx;
			background: #FFFFFF;
			padding: 30rpx 0;
			border-radius: 16rpx;

			.record_title {
				padding: 20rpx 30rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #000101;
			}

			.record_content {
				width: 90%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #EBEBEB;
				margin-bottom: 30rpx;

				.record_content_left {
					view:nth-child(1) {
						font-size: 24rpx;
						font-weight: 400;
						color: #000101;
					}

					view:nth-child(2) {
						font-size: 20rpx;
						font-weight: 400;
						color: #9A9A9A;
						margin-top: 10rpx;
					}
				}

				.record_content_right {
					font-size: 32rpx;
					font-weight: 500;
					color: #313131;
				}
			}
		}
	}
</style>