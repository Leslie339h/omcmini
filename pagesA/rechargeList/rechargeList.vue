<template>
	<view>
		<view class="box">
			<empty v-if="list.length==0"></empty>
			<view class="box_item" v-for="(item,index) in list" :key="index">
				<view class="box_item_bom a-center j-sb ">
					<image src="../static/aicon13.png" mode=""></image>
					<view class="" style="width: 86%;">
						<view class="a-center j-sb mb-8">
							<span class="color-9 f-size-24 f-bold">{{item.recharge_type_text}}</span>
							<span class="color-9 f-size-24">{{item.createtime}}</span>
						</view>

						<view class="a-center j-sb">
							<span class="color-9 f-size-24">{{item.type_sign}}¥{{item.money_abs}}</span>
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
				type: null,
				list: [],
				page: 1,
				count: 0
			};
		},
		onLoad(e) {
			this.expenseGoldCoinRecord()
		},
		onReachBottom() {
			this.page++
			this.expenseGoldCoinRecord(1)
		},
		methods: {
			async expenseGoldCoinRecord(e) {
				let res = await this.rechargeList({
					page: this.page
				})
				if (res.code == 1) {
					if (e == 1) {
						this.list = [...this.list, ...res.data]
					} else {
						this.list = res.data
					}
				}
			},

		}
	}
</script>

<style lang="scss">
	.head {
		width: 749rpx;
		height: 142rpx;
		background: #DCE5FA;
		padding: 32rpx 34rpx;
		box-sizing: border-box;

		.text_1 {
			font-size: 24rpx;
			color: #7E7B7F;

			span {
				color: #FF1B1B;
			}
		}
	}

	.box {
		padding: 0 20px;
		box-sizing: border-box;

		.box_item {
			padding: 28rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #eee;

			.box_item_text {
				font-size: 24rpx;
				color: #939393;
			}

			.box_item_bom {
				image {
					width: 75rpx;
					height: 75rpx;
				}
			}
		}
	}
</style>