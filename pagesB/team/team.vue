<template>
	<view v-show="pageShow">
		<view class="box_1 d-flex j-sb">
			<view class="box_1_left">
				<image src="../static/bicon5.png" mode=""></image>
				<view class="f-size-32 color-f mb-10">
					总人数
				</view>
				<view class="f-size-50 color-f f-bold">
					{{int.peopleCount}}
				</view>
			</view>
			<view class="box_1_right">
				<view class="box_1_right_top">
					<view class="f-size-32 color-f mb-10">
						本月
					</view>
					<view class="f-size-32 color-f f-bold">
						{{int.moonCount}}
					</view>
					<image src="../static/bicon6.png" mode=""></image>
				</view>
				<view class=" mt-16 box_1_right_bom d-flex a-center j-sb">
					<view class="box_1_right_bom_1 ">
						<view class="f-size-32 color-f mb-10">
							今日
						</view>
						<view class="f-size-32 color-f f-bold">
							+ {{int.todayCount}}
						</view>
					</view>
					<view class="box_1_right_bom_2">
						<view class="f-size-32 color-f mb-10">
							昨日
						</view>
						<view class="f-size-32 color-f f-bold">
							{{int.ydayCount}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 每月数据信息 -->
		<view class="box_2 mt-34">
			<view class="box_2_title f-size-32 f-600">每月数据信息</view>
			<view class="box_2_ipts d-flex a-center mt-26 mb-40">
				<view class="box_2_ipts_item d-flex a-center " @click="peopleShow=true">
					<span>{{people_name}}</span>
					<image src="../static/bicon7.png" mode=""></image>
				</view>
				<view class="box_2_ipts_item" @click="timeshow=true">
					<span>{{timer_name}}</span>
					<image src="../static/bicon7.png" mode=""></image>
				</view>
			</view>
			<view class="charts">
				<columnCharts ref='columnCharts'></columnCharts>
			</view>
		</view>

		<!-- 成员列表 -->
		<view class="box_3 mt-34">
			<view class="box_1_head d-flex a-center">
				<view class="mr-50 d-flex" @tap="rank">
					加入时间
					<view class="finally_1_2_img">
						<image v-if="rankall===0" src="../static/triangle_2.png" mode="aspectFill"></image>
						<image v-if="rankall===0" src="../static/triangle_6.png" mode="aspectFill"></image>
						<image v-if="rankall===1" src="../static/triangle_1.png" mode="aspectFill"></image>
						<image v-if="rankall===1" src="../static/triangle_4.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="d-flex" @tap="rankuser">
					邀请人数
					<view class="finally_1_2_img">
						<image v-if="rankalluser===0" src="../static/triangle_2.png" mode="aspectFill"></image>
						<image v-if="rankalluser===0" src="../static/triangle_6.png" mode="aspectFill"></image>
						<image v-if="rankalluser===1" src="../static/triangle_1.png" mode="aspectFill"></image>
						<image v-if="rankalluser===1" src="../static/triangle_4.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<empty v-if="list.length==0"></empty>
			<view class="box_1_item d-flex j-sb a-center" v-for="item in list" :key="item">
				<view class="box_1_item_left d-flex">
					<image class="box_1_item_left_user" :src="item.avatar" mode="aspectFill"></image>
					<view class="">
						<view class="box_1_item_left_text mb-6 d-flex a-center">
							<view class="mr-10">{{item.username }}</view>
						</view>
						<view class="box_1_item_left_text_1">
							{{item.createtime | timerFormat}}
						</view>
					</view>
				</view>
				<view class="box_1_item_right" @click="openTel(item.mobile)">
					联系Ta
				</view>
			</view>
		</view>
		<u-picker :show="peopleShow" @confirm='confirm' @cancel='peopleShow=false' :columns="columns"></u-picker>

		<u-datetime-picker @cancel='timeshow=false' :maxDate='value1' :show="timeshow" v-model="value1"
			mode="year-month" @confirm='dateconfirm'></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 加入时间
				rankall: 0,
				// 邀请人数
				rankalluser: 0,
				value1: Number(new Date()),
				peopleShow: false,
				timeshow: false,
				columns: [
					['一级成员', '二级成员']
				],
				timeOrder: 'asc',
				peopleOrder: 'asc',
				type: 1,
				search: '',
				list: [],
				people_name: "一级成员",
				int: {},
				timer_name: '',
				pageShow: false,
				page: 1
			};
		},
		onLoad() {
			this.timer_name = this.setTime(Number(new Date()), 'YY-MM')
			this.distributionTeamApi()
			this.teamlistApi()
		},
		onReachBottom() {
			this.page++
			this.teamlistApi(1)
		},
		methods: {
			dateconfirm(e) {
				console.log('eee', e);
				this.timer_name = this.setTime(e.value, 'YY-MM')
				this.timeshow = false
				this.distributionTeamApi()
				this.teamlistApi()
			},
			confirm(e) {
				console.log('eee', e);
				if (e.indexs[0] == 0) {
					this.type = 1
					this.people_name = '一级人员'
				} else {
					this.type = 2
					this.people_name = '二级成员'
				}
				this.peopleShow = false
				this.teamlistApi()
				this.distributionTeamApi()
			},
			async distributionTeamApi() {
				let res = await this.distributionTeam({
					level: this.type,
					mouth: this.timer_name
				})
				if (res.code == 1) {
					this.int = res.data
					let obj = {
						categories: [],
						series: [{
							name: "",
							data: []
						}]
					};
					res.data.statistics.forEach(item => {
						let date = item.date.substring(5, item.date.length)
						obj.categories.push(date)
						obj.series[0].data.push(item.count)
					})
					this.$refs.columnCharts.chartData = obj
					this.pageShow = true



				}
			},
			// 我的团队列表
			async teamlistApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.teamlist({
					type: this.type,
					search: this.search,
					timeOrder: this.timeOrder,
					peopleOrder: this.peopleOrder,
					mouth: this.timer_name,
					page: this.page
				})
				if (res.code == 1) {
					if (e == 1) {
						this.list = [...this.list, ...res.data.data]
					} else {
						this.list = res.data.data
					}
				}
			},
			rank() {
				if (this.rankall == 0) {
					this.timeOrder = 'desc'
					this.rankall = 1
				} else {
					this.timeOrder = 'esc'
					this.rankall = 0
				}
				this.teamlistApi()
			},
			rankuser() {
				if (this.rankalluser == 0) {
					this.peopleOrder = 'desc'
					this.rankalluser = 1
				} else {
					this.peopleOrder = 'esc'
					this.rankalluser = 0
				}
				this.teamlistApi()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F7FB;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.box_1 {
		.box_1_left {
			padding: 32rpx 34rpx;
			box-sizing: border-box;
			width: 280rpx;
			height: 272rpx;
			background: #739AFF;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			position: relative;

			image {
				width: 146rpx;
				height: 146rpx;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}

		.box_1_right {
			.box_1_right_bom {


				.box_1_right_bom_1 {
					padding: 18rpx 24rpx;
					box-sizing: border-box;
					background: #32D3EB;
					width: 174rpx;
					height: 128rpx;
					border-radius: 16rpx 16rpx 16rpx 16rpx;
				}

				.box_1_right_bom_2 {
					padding: 18rpx 24rpx;
					box-sizing: border-box;
					background: #C5B9EC;
					width: 174rpx;
					height: 128rpx;
					border-radius: 16rpx 16rpx 16rpx 16rpx;
				}
			}

			.box_1_right_top {
				width: 372rpx;
				height: 128rpx;
				background: #65D4C8;
				border-radius: 16rpx 16rpx 16rpx 16rpx;
				position: relative;
				padding: 20rpx 24rpx;
				box-sizing: border-box;

				image {
					width: 124rpx;
					height: 108rpx;
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}
		}
	}

	.box_2 {
		width: 690rpx;
		background: #FFFFFF;
		padding: 30rpx 22rpx;
		border-radius: 16rpx 16rpx 16rpx 16rpx;

		.box_2_ipts {
			.box_2_ipts_item {
				padding: 10rpx 20rpx;
				border-radius: 14rpx 14rpx 14rpx 14rpx;
				border: 1rpx solid #999999;
				font-size: 24rpx;
				color: #3D3D3D;
				margin-right: 20rpx;

				image {
					width: 16rpx;
					height: 12rpx;
					margin-left: 10rpx;
				}
			}

		}
	}

	.box_3 {
		background: #fff;
		border-radius: 40rpx;
		box-sizing: border-box;
		padding: 28rpx 22rpx;

		.box_1_item {
			box-sizing: border-box;
			margin-bottom: 24rpx;

			.box_1_item_left {
				.box_1_item_left_user {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					margin-right: 12rpx;
				}

				.box_1_item_left_text {
					font-size: 28rpx;
					font-weight: 600;
					color: #232323;

				}

				.box_1_item_left_text_1 {
					font-size: 24rpx;
					color: #666666;
				}
			}

			.box_1_item_right {
				width: 142rpx;
				height: 52rpx;
				border-radius: 1314rpx 1314rpx 1314rpx 1314rpx;
				border: 2rpx solid #036045;
				font-size: 24rpx;
				color: #036045;
				line-height: 52rpx;
				text-align: center;
			}
		}
	}

	.box_1_head {
		background: #FEFEFE;
		font-weight: 400;
		font-size: 32rpx;
		color: #3D3D3D;
		margin-bottom: 30rpx;

		.finally_1_2_img {
			height: 35rpx;
			display: flex;
			flex-direction: column;
			margin-left: 10rpx;

			image {
				width: 20rpx;
				height: 30rpx;
			}

		}
	}
</style>