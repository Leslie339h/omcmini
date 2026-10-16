<template>
	<view>

		<view style="margin-top: 250rpx;" v-if="list.length<=0">
			<empty></empty>
		</view>

		<view class="content" v-for="(item,index) in list" :key="item"
			@click="routerTo('/pagesE/xiCheConsume/xiCheConsume?id='+item.store_id)">
			<view class="content_right">
				<view class="content_right_top d-flex a-center  j-sb">
					<view class="content_right_top_1 beyond">
						{{item.store_name || '--'}}
					</view>

					<view class="d-flex a-center j-end" style="width: 300rpx;">
						<view class="f-size-24 color-9">
							剩余次数：{{item.number || 0}}(次)
						</view>
						<view class="pt-6 pl-8">
							<u-icon name="arrow-right" size="14"></u-icon>
						</view>
					</view>

				</view>

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
			this.carListApi(1)
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
				let res = await this.store_package_list({
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
					width: 400rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
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