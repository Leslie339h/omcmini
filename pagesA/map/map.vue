<template>
	<view>
		<u-sticky bgColor='#fff'>
			<map :markers="markers" style="width: 100%; height: 480rpx;" :latitude="latitude" :longitude="longitude"
				:show-location='true'>
			</map>
			<view class="search_box d-flex a-center j-sb">
				<view class="" style="width: 470rpx;">
					<u--input placeholder="输入门店名称或者地址搜索" border="none" v-model="keyword"
						@confirm='storeListApi(),cur=0'></u--input>
				</view>
			</view>
		</u-sticky>
		<empty :mag="'100rpx 0 0'" v-if="list.length==0"></empty>

		<view class="box_1" @click="setcur(index,item.lat,item.lon)" v-for="(item,index) in list" :key="index"
			:class="cur==index?'active':''">
			<view class="box_1_top d-flex a-center j-sb">
				<view class="box_1_top_left d-flex a-center ">
					<view class="beyond" style="max-width:350rpx ;">
						{{item.title}}
					</view>
					<view class="tag" v-if="cur==index">
						<span>当前选择</span>
					</view>
				</view>
				<view class="box_1_top_right">
					<image class="mr-40" @click="openTel(item.tel)" src="../static/aicon8.png" mode=""></image>
					<image @click="getopenLocation(item.lat,item.lon)" src="../static/aicon7.png" mode=""></image>
				</view>
			</view>
			<view class="box_1_bom d-flex a-center mt-20 mb-10">
				<image class="mr-10" src="../static/aicon4.png" mode="widthFix"></image>
				<view class="f-size-22 a-center">
					<view class="beyond f-size-22" style="max-width: 300rpx;">{{item.address || '--'}}</view>
					<span>| 距离{{item.distance}}</span>
				</view>
			</view>
			<view class="box_1_bom d-flex a-center mb-10">
				<image class="mr-10 img_1" src="../static/aicon6.png" mode="widthFix"></image>
				<view class="f-size-22">
					{{item.start_times}}-{{item.end_times}}
				</view>
			</view>

			<view class="box_1_bom d-flex a-center">
				<image class="mr-10 img_1" src="../static/aicon6.png" mode="widthFix"></image>
				<view class="f-size-22">
					{{item.is_business==1?'营业中':'歇业中'}}
				</view>
			</view>
		</view>
		<view class="" style="height: 150rpx;">

		</view>

		<view class="fixed">
			<view class="fixed_btn" @click="setshopInfo">
				选择当前门店
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: uni.getStorageSync('address').latitude,
				longitude: uni.getStorageSync('address').longitude,
				cur: null,
				list: [],
				keyword: '',
				page: 1,
				markers: [{
					id: 0,
					latitude: '',
					longitude: '',
					title: "",
					width: 30,
					height: 30,
					callout: {
						content: "111",
						color: '#fff',
						fontSize: 12,
						borderRadius: 10,
						borderColor: '#036045',
						bgColor: '#036045',
						padding: 10,
						display: "ALWAYS",
						textAlign: 'center'
					}

				}]
			}
		},
		onLoad() {
			this.storeListApi()
		},
		onReachBottom() {
			this.page++
			this.storeListApi(1)
		},
		methods: {
			setcur(index, lat, lon) {
				this.cur = index
				this.latitude = Number(lat)
				this.longitude = Number(lon)
				let obj = this.list[this.cur]
				this.markers[0] = {
					id: Number(obj.id),
					latitude: obj.lat,
					longitude: obj.lon,
					title: "",
					width: 30,
					height: 30,
					callout: {
						content: obj.title,
						color: '#fff',
						fontSize: 12,
						borderRadius: 10,
						borderColor: '#036045',
						bgColor: '#036045',
						padding: 10,
						display: "ALWAYS",
						textAlign: 'center'
					}
				}
				this.$forceUpdate()
			},

			setshopInfo() {
				if (this.cur || this.cur == 0) {
					let obj = this.list[this.cur]
					if (obj.is_business == 1) {
						uni.setStorageSync('storeid', this.list[this.cur].id)
						this.$store.state.vuex_shop_info = this.list[this.cur]
						this.$store.commit('caremptyApi')
						uni.hideToast()
						uni.navigateBack()
						// uni.reLaunch({
						// 	url: '/pages/shop/shop'
						// })
					} else {
						this.showToast('该店铺已歇业,请选择其他店铺')
					}

				} else {
					this.showToast('请选择店铺')
				}
			},
			async storeListApi(e) {
				if (e !== 1) {
					this.page = 1
				}
				let res = await this.storeList({
					search: this.keyword,
					page: this.page
				})
				if (res.code == 1) {
					if (e == 1) {
						this.list = [...this.list, ...res.data.rows]
					} else {
						this.list = res.data.rows
					}

					if (this.list.length > 0) {
						this.list.forEach((item, index) => {
							if (item.id == this.vuex_shop_info.id) {
								this.cur = index
								this.latitude = Number(item.lat)
								this.longitude = Number(item.lon)
								this.markers[0] = {
									id: 0,
									latitude: item.lat,
									longitude: item.lon,
									title: "",
									width: 30,
									height: 30,
									callout: {
										content: item.title,
										color: '#fff',
										fontSize: 12,
										borderRadius: 10,
										borderColor: '#036045',
										bgColor: '#036045',
										padding: 10,
										display: "ALWAYS",
										textAlign: 'center'
									}
								}

							}
						})



					}

				}
			}

		}
	}
</script>

<style lang="scss">
	.active {
		background: rgba(3, 96, 69, 0.1) !important;
	}

	.box_1 {
		padding: 30rpx;
		box-sizing: border-box;

		.box_1_top {
			font-weight: 600;
			font-size: 30rpx;
			color: #060606;


			.box_1_top_left {
				.tag {
					width: 108rpx;
					height: 40rpx;
					background: url('../static/aicon5.png') no-repeat;
					background-size: 100% 100%;
					font-weight: 400;
					font-size: 20rpx;
					color: #FFFFFF;
					line-height: 40rpx;
					text-align: center;
					margin-left: 10rpx;
				}
			}

			.box_1_top_right {
				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}

		.box_1_bom {
			font-weight: 400;
			color: #676767;

			image {
				width: 19rpx;
				height: 22rpx;
			}

			.img_1 {
				width: 19rpx;
			}
		}
	}

	.search_box {
		width: 690rpx;
		height: 76rpx;
		background: #F6F7FB;
		border-radius: 152rpx 152rpx 152rpx 152rpx;
		margin: 20rpx auto;
		padding: 0 36rpx;
		box-sizing: border-box;

		.search_box_left {
			padding-right: 30rpx;
			border-right: 2rpx solid #666666;

			image {
				width: 18rpx;
				height: 10rpx;
				margin-left: 10rpx;
			}

		}

		.search_box_right {
			margin-left: 20rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 14rpx;
			}

			input {
				width: 400rpx;
			}
		}
	}

	.fixed {
		padding: 28rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1rpx solid #eee;
		z-index: 9;
		background-color: #fff;

		.fixed_btn {
			width: 672rpx;
			height: 78rpx;
			background: #036045;
			border-radius: 772rpx 772rpx 772rpx 772rpx;
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			line-height: 78rpx;
		}
	}
</style>