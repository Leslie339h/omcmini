<template>
	<view>

		<view style="margin-top: 250rpx;" v-if="list.length<=0">
			<empty></empty>
		</view>

		<view class="content" v-for="(item,index) in list" :key="item">
			<view class="content_right">
				<view class="content_right_top d-flex  j-sb">
					<view class="content_right_top_1">
						{{item.number}}
					</view>

					<view class="content_right_top_2 mr-20"
						@tap="routerTo(`/pagesE/carNumber/carNumber?id=${item.id}&num=${item.number}`)">
						<u-icon name="edit-pen" size="22"></u-icon>
					</view>
					<view class="content_right_top_2" @tap.stop="delCarNumberApi(item.id)">
						<u-icon name="minus-circle-fill" color="#FD494C" size="22"></u-icon>
					</view>
				</view>

			</view>
		</view>
		<view class="button">
			<view class="btn" @tap="routerTo('/pagesE/carNumber/carNumber')">
				新增车辆
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1
			};
		},
		onLoad(obj) {
			this.carListApi()
		},
		onShow() {
			this.carListApi()
		},
		onReachBottom() {
			this.page++
			this.carListApi()
		},
		methods: {
			async delCarNumberApi(id) {
				let res = await this.delCarNumber({
					id
				})
				if (res.code == 1) {
					this.list.forEach((item, index) => {
						if (item.id == id) {
							this.list.splice(index, 1)
						}
					})
					this.$forceUpdate()
				}
			},
			async carListApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.carnumList({
					page: this.page
				})
				if (res.code == 1) {
					if (e == 1) {
						this.list = [...this.list, ...res.data]
					} else {
						this.list = res.data
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.hade_title {
		height: 87rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		line-height: 87rpx;
		text-indent: 30rpx;
	}

	.button {
		width: 100%;
		height: 137rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		padding: 20rpx 20rpx 50rpx;

		.btn {
			width: 100%;
			height: 80rpx;
			background: #036045;
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;

		}
	}



	.content {
		background: #FFFFFF;

		margin-bottom: 20rpx;

		.content_right {
			// width: 600rpx;
			padding: 30rpx;
			box-sizing: border-box;

			.content_right_top {
				.content_right_top_1 {
					width: 80%;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
				}

				.content_right_top_2 {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.content_right_bottom {
				margin-top: 20rpx;

				text:nth-child(1) {
					width: 52rpx;
					border-radius: 5rpx;
					border: 1rpx solid #B4303D;
					font-size: 24rpx;
					font-weight: 400;
					color: #C84655;
					text-align: center;
					display: inline-block;
				}

				text:nth-child(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #696969;
					padding: 0 10rpx;
				}

				text:nth-child(3) {
					font-size: 24rpx;
					font-weight: 400;
					color: #696969;
					padding: 0 10rpx;
				}
			}

		}
	}
</style>