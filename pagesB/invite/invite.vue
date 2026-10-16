<template>
	<view v-show="pageShow">
		<u-navbar title="邀请好友" @rightClick="rightClick" :autoBack="true" :bgColor="bgColor" :placeholder='true'>
		</u-navbar>
		<view class="bg_img"></view>
		<view class="d-flex a-center user">
			<image :src="int.avatar" mode=""></image>
			<span class="f-size-32 f-600 color-3d ml-16">{{int.username}}</span>
		</view>
		<!-- 累计佣金 -->
		<view class="card_1 d-flex a-center ">
			<view class="card_1_item" @click="routerTo('/pagesB/withdraw/withdraw')">
				<view class="d-flex a-center">
					<span class="f-size-28 color-3d">累计佣金(元)</span>
					<u-icon name="arrow-right" color="#BBB8B9" size="16"></u-icon>
				</view>
				<view class="f-size-36 mt-14">
					{{int.commissionAll}}
				</view>
			</view>

			<view class="card_1_item" @tap="routerTo('/pagesB/team/team')">
				<view class="d-flex a-center">
					<span class="f-size-28 color-3d">邀请总数</span>
					<u-icon name="arrow-right" color="#BBB8B9" size="16"></u-icon>
				</view>
				<view class="f-size-36 mt-14">
					{{int.peopleCount}}
				</view>
			</view>
		</view>
		<!-- 提现金额 -->
		<view class="card_2 ">
			<!-- 	<view class="card_2_top  d-flex  j-sb">
				<view class="" @click="routerTo('/pagesB/withdraw/withdraw')">
					<view class="d-flex a-center">
						<span class="f-size-28 color-3d">可提现(元)</span>
						<u-icon name="arrow-right" color="#BBB8B9" size="16"></u-icon>
					</view>
					<view class="f-size-36 mt-14">
						{{int.commission}}
					</view>
				</view>
				<view class="" @click="routerTo('/pagesB/withdraw/withdraw')">
					<view class="d-flex a-center">
						<span class="f-size-24 color-9">提现记录</span>
						<u-icon name="arrow-right" color="#BBB8B9" size="16"></u-icon>
					</view>
				</view>
			</view> -->

			<view class=" d-flex  j-sb ">
				<view class="">
					<view class="d-flex a-center">
						<span class="f-size-28 color-3d">可提现(元)</span>
					</view>
					<view class="f-size-36 mt-14">
						{{int.commission}}
					</view>
				</view>
				<view class="">
					<view class="d-flex a-center">
						<span class="f-size-28 color-3d">提现中(元)</span>
					</view>
					<view class="f-size-36 mt-14">
						{{int.commissioning}}
					</view>
				</view>
				<view class="">
					<view class="d-flex a-center">
						<span class="f-size-28 color-3d">已提现(元)</span>
					</view>
					<view class="f-size-36 mt-14">
						{{int.commissionOver}}
					</view>
				</view>
			</view>

			<view class="card_btn" @click="routerTo('/pagesB/withdraw/withdraw')">
				立即提现
			</view>

		</view>
		<!--常用工具 -->

		<view class="tool">
			常用工具
		</view>
		<view class="tool_class">
			<view style="height: 30rpx;">
			</view>
			<view class="tool_class_box">
				<view class="tool_class_box_conten" @tap="routerTo('/pagesB/team/team')">
					<image style="width: 70rpx;height: 70rpx;" src="../static/bicon1.png" mode="" />
					<view class="tool_class_box_conten_right">
						<view class="tool_class_box_conten_right_top">
							我的邀请
						</view>
						<view class="tool_class_box_conten_right_bottom">
							{{int.peopleCount || 0}}人
						</view>
					</view>
				</view>
				<view class="tool_class_box_conten" @tap="routerTo('/pagesD/Commission_order/Commission_order')">
					<image style="width: 70rpx;height: 70rpx;" src="../static/bicon2.png" mode="" />
					<view class="tool_class_box_conten_right">
						<view class="tool_class_box_conten_right_top">
							佣金订单
						</view>
						<view class="tool_class_box_conten_right_bottom">
							详细佣金情况
						</view>
					</view>
				</view>
				<view class="tool_class_box_conten" @tap="routerTo('/pagesD/Promotional_poster/Promotional_poster')">
					<image style="width: 70rpx;height: 70rpx;" src="../static/bicon3.png" mode="" />
					<view class="tool_class_box_conten_right">
						<view class="tool_class_box_conten_right_top">
							推广海报
						</view>
						<view class="tool_class_box_conten_right_bottom">
							查看海报
						</view>
					</view>
				</view>
				<view class="tool_class_box_conten" @tap="routerTo('/pagesD/agreement/agreement?name=规则说明')">
					<image style="width: 70rpx;height: 70rpx;" src="../static/bicon4.png" mode="" />
					<view class="tool_class_box_conten_right">
						<view class="tool_class_box_conten_right_top">
							规则说明
						</view>
						<view class="tool_class_box_conten_right_bottom">
							规则玩法
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
				bgColor: 'transparent',
				int: {},
				pageShow: false
			};
		},
		onLoad() {
			this.distributionIndexApi()
		},
		onShow() {
			this.distributionIndexApi()
		},
		methods: {
			async distributionIndexApi() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.distributionIndex()
				if (res.code == 1) {
					this.int = res.data
					this.pageShow = true
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFF1F3;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.bg_img {
		width: 100vw;
		height: 1010rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
		background: linear-gradient(to top, #EFF1F3, #49A187, #66CDAF);
	}

	.user {
		image {
			width: 60rpx;
			height: 60rpx;
			background: #D8D8D8;
			border-radius: 50%;
			border: 2rpx solid #FFFFFF;

		}
	}

	.card_1 {
		width: 690rpx;
		height: 156rpx;
		background: #FFFFFF;
		border-radius: 14rpx 14rpx 14rpx 14rpx;
		margin: 20rpx auto;
		padding: 34rpx;
		box-sizing: border-box;

		.card_1_item {
			width: 50%;
		}
	}

	.card_2 {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		padding: 34rpx;
		box-sizing: border-box;

		.card_btn {
			width: 636rpx;
			height: 102rpx;
			background: linear-gradient(90deg, #036045 0%, #66CDAF 100%);
			border-radius: 1246rpx 1246rpx 1246rpx 1246rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			text-align: center;
			line-height: 102rpx;
			margin-top: 44rpx;
		}
	}


	.tool {
		margin: 76rpx auto 26rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: #000002;
	}

	.tool_class {
		background: #FFFFFF;
		border-radius: 14rpx;
		padding-top: 20rpx;
		padding-bottom: 10rpx;
	}

	.tool_class_box {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.tool_class_box_conten {
		display: flex;
		align-items: center;
		width: 50%;
		height: 70rpx;
		margin-bottom: 50rpx;
	}

	.tool_class_box_conten_right {
		margin-left: 20rpx;
	}

	.tool_class_box_conten_right_top {
		font-size: 26rpx;
		font-weight: 400;
		color: #000002;
	}

	.tool_class_box_conten_right_bottom {
		font-size: 24rpx;
		font-weight: 400;
		color: #95959E;
		line-height: 33rpx;
	}
</style>