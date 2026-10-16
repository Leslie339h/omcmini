<template>
	<view>
		<u-sticky>
			<view class="navbar">
				<view class="card_top">
					<!-- 	<view class="search_card d-flex j-sb">
						<view class="search">
							<u-search searchIconSize='30' shape="square" height='70rpx' placeholder="请输入订单号/手机号"
								:showAction="false" v-model="keyword">
							</u-search>
						</view>
						<view class="search_btn" @click="getlist">
							查询订单
						</view>
					</view> -->
					<view class="tabs">
						<u-tabs @click='tabclick' :current='current' lineColor="#036045" lineHeight='6rpx'
							lineWidth='60rpx' :list="list1"
							:activeStyle="{color: '#303133',fontWeight: '600',fontSize:'34rpx'}">
						</u-tabs>
					</view>
				</view>
			</view>
		</u-sticky>
		<view class="" v-if="list.length==0">
			<empty></empty>
		</view>
		<view class="pad" v-else>
			<view class="card_item" v-for="item in list" :key="item.id">

				<view class="title a-center d-flex j-sb">

					<view class="left d-flex  a-center">
						<!-- <view class="left_text">{{item.type_text}}类型</view> -->
					</view>

					<view class="right" :class="item.status==2?'rightOk':''">
						<text>{{item.status==1?'预约中':item.status==2?'已清洗':''}} </text>
					</view>

				</view>

				<view class="content">


					<view class="content_item">
						<text class="gray">用户：</text>{{item.contacts }}
					</view>

					<view class="content_item flex ac">
						<text class="gray flex ac">电话：</text>
						<text class=" flex ac" @click.stop="openTel(item.mobile)">{{item.mobile }}</text>
						<view class="" style="margin-left: 10rpx;">
							<image src="/static/phonec.png" style="width:50rpx;height:50rpx; margin-left: 10rpx;"
								@click.stop="openTel(item.mobile)"></image>
						</view>
					</view>

					<view class="content_item">
						<text class="gray">车牌号：</text>{{item.car_number }}
					</view>

					<view class="content_item">
						<text class="gray">洗车店铺：</text>{{item.store_name }}
					</view>
					
					<view class="content_item">
						<text class="gray">洗车时间：</text>{{item.subscribe_time_text }}
					</view>
					<!-- 
					<view class="content_item flex ac">
						<text class="gray">取车地址：</text>
						<text class="address">{{item.get_addr.get_addr }}</text>
						<image src="/static/dh.png" style="width:50rpx;height:50rpx; margin-left: 10rpx;"
							@click="gothat(item,1)"></image>
					</view>

					<view class="content_item flex ac">
						<text class="gray">还车地址：</text>
						<text class="address"> {{item.return_addr.return_addr }}</text>
						<image src="/static/dh.png" style="width:50rpx;height:50rpx; margin-left: 10rpx;"
							@click="gothat(item,2)"></image>
					</view> -->

					<view class="content_item">
						<text class="gray">下单时间：</text>{{item.createtime }}
					</view>

					<view class="content_item">
						<text class="gray">备注信息：</text>{{item.remark||'无' }}
					</view>
					
					<view class="content_item" v-if="item.pay_type">
						<text class="gray">支付方式：</text>{{item.pay_type }}
					</view>
					
					<view class="content_Bom a-center d-flex flex jsb ac">
						<!-- <view class="btm1" @click="getPrint(item.id)" v-if="item.status !=='1'">
							打印小票
						</view> -->
						<view class="btm2" @click="setexpressageOrde(item.id)" v-if="item.status==1">
							已完成
						</view>


						<view class="btm22" v-else>
							已清洗
						</view>

						<view class="btm2" @click="setexpressageOrdeB(item.id)" v-if="item.status==1">
							线下支付
						</view>


					</view>
				</view>


				<!-- <view class="content_item">
						<text class="gray">订单编号：</text>{{item.order_no}}
					</view>

					<view class="content_item d-flex j-sb a-center"
						@click="gopage(item.id,item.avatar,item.username,item.subscribe_tel,item.order_type)">
						<view class="">
							<text class="gray">订单金额：</text><text class="black">¥{{item.order_amount_total}}</text>
						</view>
						<view class="d-flex  a-center">
							订单详情<u-icon name="arrow-right" size="28rpx"></u-icon>
						</view>
					</view> -->




			</view>
		</view>
		<view class="" style="width: 100%;height: 100rpx;">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expressageshow: false,
				current: 0,
				poptext: "展开",
				pagesPath: '/pages/merchant/order/order',
				keyword: '',
				list1: [{
					name: '全部',
				}, {
					name: '预约中',
				}, {
					name: '已清洗',
				}],
				heg: '320rpx',
				status: 2,
				list: [],
				page: 1,
				last_page: '',
				mark: false,
				expressageOrder_id: '', //快递订单id
				jjShow: false,
				tk_item: '',
			};
		},
		onLoad(e) {
			this.getlist()
		},
		onShow() {

			this.getlist()
		},

		onReachBottom() {
			let that = this;
			if (that.mark) {
				this.showToast('没有更多了')
			} else {
				this.page++;
				this.getlist(1)
			}

			// if (this.page < this.last_page) {
			// 	this.page++
			// 	this.getlist(1)
			// } else {
			// 	this.showToast('已经到达最底部了')
			// 	// if (this.mark) {
			// 	// 	this.mark = false
			// 	// }
			// }
		},
		methods: {
			gothat(item, index) {
				console.log(item);
				if (index == 1) {
					uni.openLocation({
						latitude: Number(item.get_addr.get_addr_lat),
						longitude: Number(item.get_addr.get_addr_lng),
						name: item.get_addr.get_addr,
						success: function() {
							console.log('success');
						}
					});
				} else {
					uni.openLocation({
						latitude: Number(item.return_addr.return_addr_lat),
						longitude: Number(item.return_addr.return_addr_lng),
						name: item.return_addr.return_addr,
						success: function() {
							console.log('success');
						}
					});
				}

			},
			// 同意退款
			async refund(item) {
				let res = await this.refund_order({
					order_id: item.id,
				})
				if (res.code == 1) {
					this.getlist()
					this.showToast('退款成功')
				} else {
					this.getlist()
					this.showToast(res.msg)
				}
			},
			// 打印小票
			async getPrint(id) {
				let res = await print({
					id
				})
				if (res.code == 1) {
					this.showToast('打印成功')
				}
			},
			//线下支付
			setexpressageOrdeB(id) {
				let that = this;
				uni.showModal({
					title: "提示",
					content: '确认线下洗车完成？',
					success(res) {
						if (res.confirm) {
							that.confirmwashB({
								order_id: id
							}).then(res => {
								that.getlist()
							})
						}
					}
				})

			},
			//线上支付
			setexpressageOrde(id) {
				let that = this;
				uni.showModal({
					title: "提示",
					content: '确认洗车完成？',
					success(res) {
						if (res.confirm) {
							that.confirmwash({
								order_id: id
							}).then(res => {
								that.getlist()
							})
						}
					}
				})

			},
			// 发货
			async send_out(obj) {
				console.log('obj', obj);
				let res = await this.express({
					order_id: this.expressageOrder_id, //订单id
					express_id: obj.express_id, //快递公司id,
					express_no: obj.express_order, //快递单号
				})
				if (res.code == 1) {
					this.list.forEach(item => {
						if (item.id == this.expressageOrder_id) {
							item.status = 3
							item.status_text = '待收货'
						}
					})
					this.showToast('发货成功')
				}
				this.$forceUpdate()
			},
			// 打电话
			getphone(e) {
				this.openTel(e)
			},
			tabclick(e) {
				this.page = 1
				this.current = e.index
				this.keyword = '';
				this.getlist()
			},
			async getlist(e) {
				let that = this;
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.reservationlists({
					status: this.current,
					search: this.keyword,
					page: this.page
				})
				console.log(res, '数组');
				if (res.code == 1) {
					// res.data.data.forEach(item => {
					// 	item.heg = '280rpx'
					// })
					if (res.data.length == 0) {
						that.mark = true;
					}
					if (e == 1) {

						that.list = [...that.list, ...res.data]
					} else {
						that.list = res.data;
					}
					console.log(that.list, '数组');
					// that.last_page = res.data.last_page
				}

			},
			addheg(id) {
				this.list.forEach(item => {
					if (item.id == id) {
						item.heg = '280rpx'
					}
				})
			},
			setheg(id) {
				this.list.forEach(item => {
					if (item.id == id) {
						item.heg = ''
					}
				})
			},
			gopage(id, avatar, username, tel, order_type) {
				uni.navigateTo({
					url: `/pagesC/orderDetail/orderDetail?id=${id}`
				})

			},
			// 所有订单已读
			readOrder() {
				this.notice_read({
					store_id: this.vuex_user.store_id
				}).then(res => {

				})
			},
			// 拒绝退款
			jjtk(item) {
				// this.tk_item = item
				// this.jjShow = true
				uni.showModal({
					title: '提示',
					content: '是否拒绝该订单的退款申请？',
					success: (res) => {
						if (res.confirm) {
							this.resold_order({
								order_id: item.id
							}).then(res => {
								this.showToast(res.msg)
								if (res.code == 1) {
									this.getlist()
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		background: #FAFAFA;
		// padding: 20vh 0 0;
		box-sizing: border-box;
		background: #FAFAFA;
	}

	.navbar {
		background-color: #fff;
	}

	.address {
		max-width: 250px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.fixed {
		height: 10vh;
		text-align: center;
		line-height: 13vh;
		font-size: 26rpx;
	}

	.card_top {
		// height: 200rpx;
		background-color: #fff;
		padding: 0rpx 35rpx 10rpx;
		box-sizing: border-box;

		.search_card {
			margin-bottom: 10rpx;

			.search {
				width: 440rpx;
			}

			.search_btn {
				width: 209rpx;
				height: 70rpx;
				background: #036045;
				border-radius: 10rpx;
				text-align: center;
				line-height: 70rpx;
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}
	}

	.gothat {
		color: #036045;
		margin-left: 10rpx;
	}

	.pad {
		padding: 0rpx 26rpx;
		box-sizing: border-box;

		.card_item {
			width: 700rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 20rpx 0;
			position: relative;

			.title {
				width: 100%;
				// border-bottom: 1rpx solid #EBEBEB;
				padding: 14rpx 24rpx;
				box-sizing: border-box;
				position: absolute;

				.left {
					.left_num {
						padding: 4rpx 10rpx;
						box-sizing: border-box;
						background: #036045;
						border-radius: 10rpx;
						font-size: 40rpx;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
						line-height: 64rpx;
						margin-right: 20rpx;
					}

					.left_text {
						font-size: 36rpx;
						font-weight: 600;
						color: #333333;
						text-align: center;
						line-height: 64rpx;
					}
				}

				.right {
					font-size: 32rpx;
					color: #036045;
					line-height: 64rpx;
				}

				.rightOk {
					color: #999 !important;
				}
			}



			.content {
				padding: 24rpx;
				box-sizing: border-box;

				.content_Bom {
					margin: 20rpx 0 0;
					// justify-content: center;
					justify-content: space-between;

					.jdbtn {
						// margin: 6rpx auto 0;
						width: 305rpx;
						height: 76rpx;
						background: #036045;
						border-radius: 10rpx;
						text-align: center;
						line-height: 76rpx;
						font-size: 34rpx;
						color: #FFFFFF;
					}

					.btm1 {
						width: 305rpx;
						height: 76rpx;
						border-radius: 10rpx;
						border: 1rpx solid #FF9C2E;
						font-size: 34rpx;
						color: #FF9C2E;
						text-align: center;
						line-height: 76rpx;
					}

					.btm2 {
						width: 45%;
						height: 76rpx;
						background: #036045;
						border-radius: 10rpx;
						font-size: 34rpx;
						color: #FFFFFF;
						text-align: center;
						line-height: 76rpx;
						border: 1rpx solid #036045;
					}

					.btm22 {
						width: 100%;
						height: 76rpx;
						background: #036045;
						border-radius: 10rpx;
						font-size: 34rpx;
						color: #FFFFFF;
						text-align: center;
						line-height: 76rpx;
						border: 1rpx solid #036045;
						opacity: 0.6;
					}

					.btm3 {
						width: 305rpx;
						height: 76rpx;
						background: #FFFFFF;
						border-radius: 10rpx;
						border: 1rpx solid #BEBEBE;
						font-size: 34rpx;
						color: #333333;
						text-align: center;
						line-height: 76rpx;
					}
				}

				.content_item {
					font-size: 30rpx;
					font-weight: 400;
					color: #333333;
					margin: 20rpx 0;
				}

				.orange {
					font-size: 30rpx;
					color: #FF9C2E;
				}

				.gray {
					font-size: 30rpx;
					color: #777777;
				}

				.black {
					font-size: 36rpx;
					font-weight: 600;
					color: #333333;
				}

				.content_head {
					.left {
						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}

						font-size: 32rpx;
						font-weight: 600;
						color: #333333;
						line-height: 60rpx;
					}

					.rightimg {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}

				.setheg {
					padding: 10rpx 0 0;
					box-sizing: border-box;
					width: 690rpx;
					text-align: center;
					font-size: 24rpx;
					color: #777777;
					text-align: center;
					margin: 0 auto;
				}

				.shops {
					overflow: hidden;

					.shop {
						margin: 20rpx 0;

						image {
							width: 122rpx;
							height: 120rpx;
							border-radius: 10rpx;
							margin-right: 20rpx;
						}

						.shop_item {
							width: 500rpx;
							height: 120rpx;

							.one {
								font-size: 30rpx;
								color: #333333;
							}

							.two {
								font-size: 24rpx;
								color: #777777;
								margin: 6rpx 0;
							}

							.three {
								font-size: 24rpx;
								color: #777777;
							}
						}
					}
				}

			}


		}
	}
</style>