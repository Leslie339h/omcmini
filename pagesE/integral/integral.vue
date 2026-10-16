<template>
	<view>
		<view class="hade">
			<view class="" :style="{height:cellphone+'rpx'}"></view>
			<view class="nav-tab">
				<view class="nav-tab_left" @tap="routerBack">
					<u-icon name="arrow-left" color="#FFFFFF" size="24"></u-icon>
				</view>
				<view class="nav-tab_content">
					积分商城
				</view>
				<view class="">
				</view>
			</view>
			<view class="integral_count">
				<text>{{vuex_user.score}}</text>
			</view>
			<view class="screen">
				<view class="screen_content" @tap="routerTo('/pagesE/Integraldetail/Integraldetail')">
					<text>积分明细</text><text>|</text>
				</view>
				<view class="screen_content" @tap="routerTo('/pagesD/agreement/agreement?name=积分规则')">
					<text>积分规则</text><text>|</text>
				</view>
				<view class="screen_content" @tap="routerTo('/pagesE/convert/convert')">
					<text>兑换记录</text>
				</view>
			</view>
		</view>
		<view class="">
			<u-tabs :list="list1" lineColor='#036045' :lineWidth='30' :lineHeight="5" :activeStyle="{
			        color: '#036045',
			    }"></u-tabs>
			<empty v-if="order_list.length==0"></empty>
			<view class="content_order">
				<view class="content_order_box" v-for="(item,index) in order_list" :key="item"
					@tap="routerTo('/pagesE/integralcommodity/integralcommodity?id='+item.id)">
					<view class="content_order_box_img">
						<image :src="item.thumbnail" mode="aspectFill"></image>
					</view>
					<view class="content_order_box_bottom">
						<text class="content_order_box_bottom_1">{{item.title}}</text>
						<view class="content_order_box_bottom_2">
							<text>{{item.price | quling}}积分</text>
							<text>剩余{{item.stock}}</text>
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
				list1: [],
				order_list: [],
				page: 1,
			};
		},
		onLoad() {
			this.$store.commit('cellphone')
			this.point_typeApi()
			this.$store.commit('userApi')
		},
		onReachBottom() {
			this.page++
			this.point_listApi_down(1)
		},
		onShow() {
			this.$store.commit('userApi')
		},
		methods: {
			click(item) {
				console.log('item', item);
				this.point_listApi(item.id)
			},
			async point_typeApi() {
				let res = await this.pointType()
				if (res.code == 1) {
					this.list1 = res.data
					this.point_listApi()
				}
			},
			async point_listApi(type, e) {
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.pointList({
					type: type || this.list1[0].id,
					page: this.page,
				})
				if (res.code == 1) {
					if (e == 1) {
						this.order_list = [...this.order_list, ...res.data.rows]
					} else {
						this.order_list = res.data.rows
					}
				}
			},

		},

	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
	}

	.hade {
		width: 100%;
		// height: 380rpx;
		padding: 0 0 36rpx;
		box-sizing: border-box;
		position: relative;
		background-color: #036045;

		.hade_img {
			position: absolute;
			top: 0;
		}

		.nav-tab {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.nav-tab_left {
				padding: 40rpx;
			}

			.nav-tab_content {
				font-size: 34rpx;
				font-weight: 500;
				color: #FFFFFF;
				z-index: 2;
				padding-right: 100rpx;
			}
		}

		.integral_count {
			font-size: 80rpx;
			font-weight: 600;
			color: #FFFFFF;
			display: flex;
			z-index: 9;

			text {
				width: 100%;
				text-align: center;
				z-index: 2;
			}
		}

		.screen {
			width: 500rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.screen_content {
				display: flex;
				align-items: center;
				justify-content: space-between;
				z-index: 2;

				text:nth-child(1) {
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
				}

				text:nth-child(2) {
					font-size: 15rpx;
					color: #FFFFFF;
					padding: 0 20rpx;
				}
			}
		}

	}

	.content_order {
		width: 95%;
		margin: 0 auto;
		margin-top: 40rpx;
		display: flex;
		align-content: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.content_order_box {
			width: 340rpx;
			border-radius: 14rpx;
			overflow: hidden;
			margin-bottom: 20rpx;

			.content_order_box_img {
				width: 340rpx;
				height: 250rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.content_order_box_bottom {
				height: 140rpx;
				background: #FFFFFF;
				padding: 0 20rpx;

				.content_order_box_bottom_1 {
					font-size: 26rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #383838;
					display: inline-block;
					margin: 20rpx 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.content_order_box_bottom_2 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					text:nth-child(1) {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #05B6F6;
					}

					text:nth-child(2) {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #9F9F9F;
					}
				}
			}

		}
	}
</style>