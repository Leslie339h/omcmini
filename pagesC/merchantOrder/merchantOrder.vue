<template>
	<view>
		<u-sticky>
			<view class="navbar">
				<view class="card_top">
					<view class="search_card d-flex j-sb">
						<view class="search">
							<u-search searchIconSize='30' shape="square" height='70rpx' placeholder="请输入订单号/手机号"
								:showAction="false" v-model="keyword">
							</u-search>
						</view>
						<view class="search_btn" @click="getlist">
							查询订单
						</view>
					</view>
					<view class="tabs">
						<u-tabs @click='tabclick' :current='current' lineHeight='6rpx' lineWidth='60rpx' :list="list1"
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
						<view class="left_num" v-if="item.code">
							{{item.code}}
						</view>
						<view class="left_text">{{item.order_type_text}}订单</view>
					</view>
					<view class="right">
						<text v-if="item.status==2 && item.order_type == 1">待自取 </text>
						<text v-else>{{item.status_text}} </text>
					</view>
				</view>

				<view class="content">
					<view class="content_head d-flex j-sb" v-if="item.user">
						<view class="left d-flex a-center">
							<image :src="item.user.avatar" mode="aspectFill"></image>
							<view class="">
								{{item.user.nickname}}
							</view>
						</view>
						<image class='rightimg' @click="openTel(item.user.mobile)" src="../static/cicon16.png" mode="">
						</image>
					</view>


					<view class="shops" :style="{'max-height': item.heg}">
						<view class="shop d-flex a-center" v-for="item1 in item.detail" :key="item1.goods_id">
							<image :src="item1.image" mode="aspectFill"></image>
							<view class="shop_item">
								<view class="d-flex j-sb one">
									<view class="">{{item1.title}}</view>
									<view class=""> ×{{item1.count}}</view>
								</view>
								<view class="two">
									{{item1.item_name}}
								</view>

							</view>
						</view>
					</view>
					<view class="d-flex a-center j-center setheg " v-if="item.detail.length>2">
						<view class="" @click="setheg(item.id)" v-if="item.heg=='280rpx'">
							展开(共{{item.detail.length}}件)
						</view>
						<view class="" @click="addheg(item.id)" v-else>
							收起(共{{item.detail.length}}件)
						</view>
						<view class="">
							<u-icon name="arrow-down" v-if="poptext=='展开'" size="28rpx"></u-icon>
							<u-icon name="arrow-up" v-else size="28rpx"></u-icon>
						</view>
					</view>
					<view class="content_item">
						<text class="gray">下单时间：</text>{{item.createtime }}<!-- 2023-07-28 16:58 -->
					</view>
					<view class="content_item">
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
					</view>
					<view class="content_item" v-if="[6,7,8].includes(item.status)">
						<text class="gray">退款原因：</text><text class="orange">{{item.apply || '无'}}</text>
					</view>

					<view class="content_Bom j-sb" v-if="item.status==6">
						<view class="jdbtn" @click="jjtk(item)">
							拒绝退款
						</view>
						<view class="jdbtn" @click="refund(item)">
							同意退款
						</view>
					</view>
				</view>
			</view>
		</view>

		<jjtk @comfirm='jjApi' @close='jjShow=false' :show='jjShow'></jjtk>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				poptext: "展开",
				pagesPath: '/pages/merchant/order/order',
				keyword: '',
				list1: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '待发货',
				}, {
					name: '待门店收货',
				}, {
					name: '待到店安装',
				}, {
					name: '待上传安装照',
				}, {
					name: '待用户确认',
				}, {
					name: '已完成',
				}, {
					name: '已取消',
				}, {
					name: '退款申请中',
				}, {
					name: '已退款',
				}, {
					name: '退款拒绝',
				}],
				/** 与 list1 下标对应，传给门店订单列表 status；全部不传 */
				tabStatus: [null, '1', '2', '11', '12', '14', '13', '4', '5', '6', '7', '8'],

				heg: '320rpx',
				status: 2,
				list: [],
				page: 1,
				last_page: '',
				mark: false,
				jjShow: false,
				tk_item: '',
			};
		},
		onLoad(e) {
			this.readOrder()
			this.getlist()
		},
		onShow() {

			this.getlist()
		},

		onReachBottom() {
			if (this.page < this.last_page) {
				this.page++
				this.getlist(1)
			} else {
				if (this.mark) {
					this.mark = false
					this.showToast('已经到达最底部了')
				}
			}
		},
		methods: {

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
			// 打电话
			getphone(e) {
				this.openTel(e)
			},
			tabclick(e) {
				this.page = 1
				this.current = e.index
				this.keyword = ''
				this.getlist()
			},
			async getlist(e) {
				if (e !== 1) {
					this.page = 1
				}
				const payload = {
					search: this.keyword,
					page: this.page,
				}
				const st = this.tabStatus[this.current]
				if (st !== null && st !== undefined && st !== '') {
					payload.status = st
				}
				let res = await this.storeOrderList(payload)
				if (res.code == 1) {
					res.data.data.forEach(item => {
						item.heg = '280rpx'
					})
					if (e == 1) {
						this.list = [...this.list, ...res.data.data]
					} else {
						this.list = res.data.data
					}
					this.last_page = res.data.last_page
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
				this.notice_read({ store_id: this.vuex_user.store_id }).then(res => {

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

	.pad {
		padding: 0rpx 26rpx;
		box-sizing: border-box;

		.card_item {
			width: 700rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 20rpx 0;

			.title {
				border-bottom: 1rpx solid #EBEBEB;
				padding: 14rpx 24rpx;
				box-sizing: border-box;

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
			}

			.content {
				padding: 24rpx;
				box-sizing: border-box;

				.content_Bom {
					margin: 20rpx 0 0;

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
						width: 305rpx;
						height: 76rpx;
						background: #036045;
						border-radius: 10rpx;
						font-size: 34rpx;
						color: #FFFFFF;
						text-align: center;
						line-height: 76rpx;
						border: 1rpx solid #036045;
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