<template>
	<view>
		<view style="margin-top: 250rpx;" v-if="address_list.length<=0">
			<empty></empty>
		</view>
		<view class="content" v-for="(item,index) in address_list" :key="item" @tap="select_site(item)">
			<view class="content_right">
				<view class="content_right_top d-flex  j-sb">
					<view class="content_right_top_1">
						{{item.address}}-{{item.remark}}
					</view>

					<view class="content_right_top_2 mr-20" @tap.stop="alter(item.id,item)">
						<u-icon name="edit-pen" size="22"></u-icon>
					</view>
					<view class="content_right_top_2" @tap.stop="delete_address(item.id)">
						<u-icon name="minus-circle-fill" color="#FD494C" size="22"></u-icon>
					</view>
				</view>
				<view class="content_right_bottom">
					<text>{{item.tag}}</text>
					<text>{{item.title}} ({{item.suffix}})</text>
					<text>{{item.mobile}}</text>
				</view>
			</view>
		</view>
		<view class="button">
			<view class="btn" @tap="routerTo('/pagesB/write_site/write_site?state=0')">
				新增收货地址
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				select_index: '',
				address_list: [],
				show: 0,
				go_back: false,
				page: 1
			};
		},
		onLoad(obj) {
			if (obj.go_back) {
				this.go_back = true
			}
			this.address_listApi()
		},
		onShow() {
			this.address_listApi()
		},
		onReachBottom() {
			this.address_listApi(1)
		},
		methods: {
			select_site(item) {
				if (!this.go_back) {
					this.$store.state.address_data = item
					uni.navigateBack()
				}
			},
			alter(id, item) {
				uni.navigateTo({
					url: '/pagesB/write_site/write_site?state=' + 1 + "&order_id=" + id + "&item=" + JSON
						.stringify(item)
				})
			},
			async address_listApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let data = await this.addressList({
					page: this.page,
				})
				if (data.code == 1) {
					if (e == 1) {
						this.address_list = [...this.address_list, ...data.data.rows]
					} else {
						this.address_list = data.data.rows
					}

				}
			},
			delete_address_show() {
				if (this.show) {
					this.show = 0
				} else {
					this.show = 1
				}
			},
			async delete_address(id) {
				let res = await this.addressdel({
					address_id: id
				})
				if (res.code == 1) {
					this.address_listApi()
				} else {
					this.showToast(res.msg)
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