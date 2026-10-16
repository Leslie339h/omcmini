<template>
	<view>
		<u-sticky>
			<view class="tabs">
				<u-tabs :list="tablist" @click="tabclick" lineColor='#036045'></u-tabs>
			</view>
		</u-sticky>


		<view class="box">
			<empty v-if="list.length==0"></empty>
			<view class="box_item mb-28" v-for="item in list" :key="item.id">
				<view class="box_item_top d-flex a-center j-sb pb-16">
					<view class="color-3d f-size-24">
						{{item.pay_type_text || ''}}消费
					</view>
					<view class="f-size-24 color-9">
						{{item.createtime}}
					</view>
				</view>
				<view class="box_item_center d-flex a-center j-sb">
					<view class="">
						<view class="color-3d f-size-32 f-600">
							用{{item.pay_type_text || ''}}消费了{{item.order_amount_total || 0}}元
						</view>
					</view>

					<view class="f-size-24 color-9 d-flex a-center"
						@click="routerTo('/pagesA/orderDetail/orderDetail?id='+item.id)">
						<span class="mr-6">订单详情</span>
						<u-icon name='arrow-right' color="#999" size="14"></u-icon>
					</view>
				</view>
				<view class="color-6 f-size-24" v-if="item.store">
					消费店铺：{{ item.store.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tablist: [{
					name: '微信消费',
				}, {
					name: '余额消费'
				}],
				list: [],
				pay_type: 0,
				page: 1
			}
		},
		onLoad() {
			this.rechargesApi()
		},
		onReachBottom() {
			this.page++
			this.rechargesApi(1)
		},
		methods: {
			tabclick(e) {
				this.page = 1
				this.pay_type = e.index
				this.rechargesApi()
			},
			async rechargesApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.recharges({
					pay_type: this.pay_type + 1,
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
		background: #F6F7FB;
	}

	.tabs {
		background-color: #fff;
	}

	.box {
		padding: 30rpx;
		box-sizing: border-box;

		.box_item {
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			background-color: #fff;
			padding: 24rpx 28rpx;
			box-sizing: border-box;

			.box_item_center {
				border-top: 1rpx solid #eee;
				padding: 26rpx 0 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
