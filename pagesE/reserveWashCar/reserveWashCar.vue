<template>
	<view>
		<view class="order-wrapper">


			<view class="shopchoose flex jsb ac">
				<view class="flex ac">
					<image src="/static/dyd.png" mode="aspectFit" class="shopchooseimg"></image>
					<text class="shopchooset1">当前门店：</text>
					<text class="shopchooset2">{{vuex_shop_info.title || ''}}</text>
				</view>
				<!-- <u-icon name="arrow-right" color="#232323" size="18"></u-icon> -->
			</view>


			<!-- <view class="order-hd flex">
				<view class="left">我的服务</view>
			</view>
			
			

			<view class="levelli flex jsb ac 	" :class="chooseinde==index?'levellic':''" v-for="(item,index) in tclist"
				:key="index" @click="chooseindex(index)">
				<view class="">
					<view class="big">
						{{item}}
					</view>
					<view class="little">
						<text v-if="index==2">标准洗车 + 内饰清洁、玻璃养护</text>
						<text v-else>外观清洗、轮胎清洁、车身打蜡</text>
					</view>
				</view>
				<view class="price">
					<text v-if="index==2">剩余{{(obj.careful_num*1)-(obj.careful_used*1)}} 次</text>
					<text v-else>免费</text>
				</view>
			</view> -->
		</view>

		<view class="order-wrapper-white">
			<view class="order-hd flex">
				<view class="left">预约时间</view>
			</view>
			<scroll-view class="datas" scroll-x="true">
				<view class="datali" v-for="(item,index) in timelist" :key="item.date"
					:class="timelistindex==index?'datalic':''" @click="funchoosetime(index)">
					<view class="week">
						{{item.week_zh}}
					</view>
					<view class="data">
						{{item.day}}
					</view>
				</view>
			</scroll-view>

			<view class="time flex flexwrap">
				<view class="timeli flex jc ac" v-for="(item,index) in timelist[timelistindex].time"
					:key="item.time_date_unix"
					:class="item.time_date==choosetime.time_date&&item.status!=1?'timelic':item.status==1?'timelihui':''"
					@click="funchoosetime_big(item)">
					{{item.time}}
				</view>
			</view>
		</view>

		<!-- 		<view class="order-wrapper-whiteb" :class="userInfo.svip_open?'':'height'">
			<view class="order-hd flex">
				<view class="left">取还车信息</view>
			</view>
			<view class="addressTake">
				取车地址
			</view>
			<view class="TakeAddressLi flex" @click="funtakeaddress">
				<u-icon name="map-fill" color="#6B7280" size="22"></u-icon>
				<text class="takeText"> {{get_addr||'请选择取车地址'}}</text>
			</view>

			<view class="flex jsb ac switchli">
				<view class="switchlitext">
					取还车地址相同
				</view>
				<view class="">
					<u-switch v-model="value" activeColor="#036045" @change="switchChange"></u-switch>
				</view>
			</view>

			<view class="" v-if="!value" @click="fungiveaddress">
				<view class="addressTake">
					还车地址
				</view>
				<view class="TakeAddressLi flex">
					<u-icon name="map-fill" color="#6B7280" size="22"></u-icon>
					<text class="takeText"> {{return_addr||'请选择还车地址'}}</text>
				</view>
			</view>
		</view> -->


		<view class="order-wrapper-whiteb">
			<view class="order-hd flex">
				<view class="left">联系人信息</view>
			</view>

			<view class="addressTake">
				姓名
			</view>
			<view class="TakeAddressLi flex">
				<input type="text" v-model="name" placeholder="请输入姓名" />
			</view>

			<view class="addressTake">
				手机号码
			</view>
			<view class="TakeAddressLi flex">
				<input type="number" v-model="phone" placeholder="请输入手机号码" />
			</view>

			<view class="addressTake">
				车牌号码
			</view>
			<view class="TakeAddressLi flex" @click="chooseCar">
				<input type="text" v-model="carnum" disabled="" placeholder="请选择车牌号" />
			</view>

		</view>


		<view class="order-wrapper-whiteb">
			<view class="order-hd flex">
				<view class="left">备注信息</view>
			</view>
			<view style="margin-top:30rpx">
				<u--textarea v-model="value1" placeholder="请输入内容"></u--textarea>
			</view>


		</view>

		<view style="width:100%;height:220rpx;">

		</view>

		<view class="buttonBack ">
			<view class="button flex jc ac" @click.stop="play">
				确认预约
			</view>
			<view class="agreementsss">
				<text class="agreements">
					预约即表示同意
				</text>
				<text class="agreement" @tap.stop="routerTo('/pagesD/agreement/agreement?name='+'预约服务协议')">
					《预约服务协议》
				</text>
			</view>
		</view>
		<u-picker :show="show" keyName="number" :columns="columns" @confirm="confirm" @cancel="cancel"></u-picker>
	</view>
</template>

<script>
	import {
		forIn,
		keys
	} from 'lodash';
	export default {
		data() {
			return {
				value: true,
				name: '',
				phone: '',
				carnum: '',
				get_addr: '', //取车地址
				get_addr_lng: '', //取车
				get_addr_lat: '',
				return_addr: '', //还车地址
				return_addr_lng: '',
				return_addr_lat: '',
				tclist: [],
				chooseinde: null,
				obj: {}, //权益对象
				timelist: [],
				timelistindex: 0,
				choosetime: {},
				carlist: [],
				chooseCarobj: {},
				show: false,
				columns: [
					[]
				],
				value1: '',
				timer: null
			};
		},
		computed: {
			chooseCarobjs() {
				return JSON.stringify(this.chooseCarobj);
			}
		},
		onLoad() {
			this.gettc()
		},
		onShow() {
			this.CarWashLists()
		},
		methods: {
			confirm(e) {
				console.log(e);
				this.carnum = e.value[0].number;
				this.show = false;
			},
			cancel() {
				console.log('触发了');
				this.show = false;
			},
			chooseCar() {
				let that = this;
				console.log(that.carlist);
				let length = that.carlist.length;
				if (length == 0) {
					uni.showModal({
						confirmText: '去添加',
						content: '暂无绑定车辆~',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pagesE/addCarNum/addCarNum'
								})
							}
						}
					})
				} else {
					that.show = true;
				}
			},
			CarWashLists() {
				let that = this;
				this.carnumList().then(res => {
					let arr = res.data;
					that.carlist = arr;
					that.columns[0] = arr;
				})
			},
			funchoosetime_big(item) {
				if (item.status == 1) {
					uni.showToast({
						title: "当前时间已预约~",
						icon: "none"
					})
					return
				}
				console.log(item)
				this.choosetime = item;
			},
			funchoosetime(index) {
				this.timelistindex = index;
			},
			chooseindex(index) {
				this.chooseinde = index;
			},
			gettc() {
				let that = this;

				// this.common().then(res => {
				// 	that.tclist = res.data.wash_type;
				// 	let arr = keys(that.tclist);
				// 	that.chooseinde = (arr[0] * 1);
				// })

				this.maketime({
					store_id: uni.getStorageSync('storeid')
				}).then(res => {
					that.timelist = res.data.day;
					// that.choosetime = that.timelist[that.timelistindex].time;
					console.log(res);
				})
				// that.$store.state.vuex_shop_info.id

				// this.myqy({
				// 	store_id: uni.getStorageSync('storeid')
				// }).then(res => {
				// 	that.obj = res.data;
				// 	console.log(res);
				// })
			},
			switchChange(e) {

			},
			funtakeaddress() {
				let that = this;
				console.log('触发了');
				uni.chooseLocation({
					success(res) {
						that.get_addr = res.address;
						that.get_addr_lng = res.longitude;
						that.get_addr_lat = res.latitude;
						console.log(res);
					}
				})
			},
			fungiveaddress() {
				let that = this;
				uni.chooseLocation({
					success(res) {
						that.return_addr = res.address;
						that.return_addr_lng = res.longitude;
						that.return_addr_lat = res.latitude;
						console.log(res);
					}
				})
			},
			play() {
				let that = this;
				//防抖
				if (that.timer) {
					console.log('触发弹出');
					return
				} else {
					that.timer = setTimeout(() => {
						that.timer = null;
						clearTimeout(that.timer);
					}, 500)
				}
				if (JSON.stringify(that.choosetime) == '{}') {
					uni.showToast({
						title: "请选择时间~",
						icon: "none"
					})
					return
				}
				if (!(that.name && that.phone)) {
					uni.showToast({
						title: "请将信息填写完整~",
						icon: "none"
					})
					return
				}
				if (that.carnum == '') {
					uni.showToast({
						title: "请选择车牌号~",
						icon: "none"
					})
					return
				}
				// if (that.value) {
				// 	if (!(that.get_addr && that.get_addr_lng && that.get_addr_lat)) {
				// 		uni.showToast({
				// 			title: "请选择地址~",
				// 			icon: "none"
				// 		})
				// 		return
				// 	}
				// 	that.return_addr = that.get_addr;
				// 	that.return_addr_lng = that.get_addr_lng;
				// 	that.return_addr_lat = that.get_addr_lat;
				// } else {
				// 	if (!(that.return_addr && that.return_addr_lng && that.return_addr_lat)) {
				// 		uni.showToast({
				// 			title: "请选择地址~",
				// 			icon: "none"
				// 		})
				// 		return
				// 	}
				// }
				uni.showModal({
					title: "提示",
					content: '确认预约？',
					success(res) {
						if (res.confirm) {
							that.reserveCarWash({
								store_id: uni.getStorageSync('storeid'),
								// type: that.chooseinde,
								subscribe_time: that.choosetime.time_date,
								contacts: that.name,
								mobile: that.phone,
								car_number: that.carnum,
								remark: that.value1,
								// get_addr: that.get_addr,
								// get_addr_lng: that.get_addr_lng,
								// get_addr_lat: that.get_addr_lat,
								// return_addr: that.return_addr,
								// return_addr_lng: that.return_addr_lng,
								// return_addr_lat: that.return_addr_lat,
							}).then(res => {
								console.log(res);
								if (res.code == 1) {
									uni.showToast({
										title: res.msg,
										icon: "none"
									})
									uni.redirectTo({
										url: "/pagesE/reservationList/reservationList"
									})
									// uni.navigateBack()
								} else {
									uni.hideToast()
									uni.showModal({
										title: '提示',
										content: res.msg,
										success(res) {
											if (res.confirm) {
												uni.redirectTo({
													url: "/pagesE/reservationList/reservationList"
												})
											} else {
												uni.navigateBack()
											}

										}
									})

								}
							})
						}
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
	}

	.jc {
		justify-content: center;
	}

	.jsb {
		justify-content: space-between;
	}

	.ac {
		align-items: center;
	}

	.flexwrap {
		flex-wrap: wrap;
	}

	.shopchoose {
		width: 690rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		background: #fff;
		margin: auto;
		margin-top: 30rpx;

		.shopchooseimg {
			width: 40rpx;
			height: 40rpx;
		}

		.shopchooset1 {
			margin-left: 15rpx;
		}

		.shopchooset2 {
			color: #036045;
			margin-left: 15rpx;
			font-weight: bold;
		}
	}

	.buttonBack {
		width: 750rpx;
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		position: fixed;
		bottom: 0;
		z-index: 999;

		.button {
			width: 694rpx;
			height: 91rpx;
			background: #036045;
			box-shadow: 0rpx -4rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin: auto;

		}

		.agreementsss {
			margin: auto;
			margin-top: 30rpx;
			text-align: center;
		}

		.agreements {
			font-size: 21rpx;
		}

		.agreement {
			font-size: 21rpx;
			color: #2563EB;
		}
	}

	.order-wrapper {
		// background: #fff;
		margin: 0 30rpx;
		border-radius: 8rpx;
		// margin-top: 26rpx;

		.order-hd {
			justify-content: space-between;
			padding: 30rpx 0rpx 10rpx 10rpx;
			// margin-top: 25rpx;
			font-size: 32rpx;
			color: #282828;


			.left {
				font-weight: bold;
			}


		}

		.levellic {
			border: 2rpx solid #036045 !important;
		}

		.levelli {
			padding: 30rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 14rpx 14rpx 14rpx 14rpx;
			border: 2rpx solid #E5E7EB;
			margin-top: 20rpx;

			.big {
				font-weight: bold;
				font-size: 28rpx;
				color: #000000;
			}

			.little {
				font-size: 25rpx;
				color: #6B7280;
				margin-top: 10rpx;
			}

			.price {
				font-weight: bold;
				font-size: 28rpx;
				color: #036045;
			}
		}


	}


	.order-wrapper-whiteb {
		margin-top: 20rpx;
		background: #fff;
		padding: 30rpx 35rpx 30rpx 35rpx;
		box-sizing: border-box;
		border-radius: 8rpx;

		/deep/.u-textarea {
			border: 0 !important;
			background: #F3F4F6 !important;
			border-radius: 14rpx 14rpx 14rpx 14rpx !important;
		}

		.order-hd {
			justify-content: space-between;
			font-size: 32rpx;
			color: #282828;


			.left {
				font-weight: bold;
			}


		}
	}

	.addressTake {
		font-size: 25rpx;
		color: #4B5563;
		margin-top: 30rpx;
	}

	.TakeAddressLi {
		margin-top: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background: #F3F4F6;
		border-radius: 14rpx 14rpx 14rpx 14rpx;

		.takeText {
			font-size: 28rpx;
			color: #6B7280;
			margin-left: 30rpx;
		}
	}

	.switchli {
		margin-top: 30rpx;

		.switchlitext {
			font-size: 25rpx;
			color: #000000;
		}
	}


	.order-wrapper-white {
		margin-top: 20rpx;
		background: #fff;
		padding: 30rpx 35rpx 10rpx 35rpx;
		box-sizing: border-box;
		border-radius: 8rpx;

		.order-hd {
			justify-content: space-between;
			font-size: 32rpx;
			color: #282828;


			.left {
				font-weight: bold;
			}


		}

		.datas {
			width: 100%;
			margin-top: 20rpx;
			white-space: nowrap;

			.datali {
				width: 15%;
				padding: 15rpx;
				box-sizing: border-box;
				display: inline-block;
				background: #f5f5f5;
				border-radius: 8rpx;
				margin-right: 10rpx;
			}

			.datalic {
				background: rgba(3, 96, 69, 0.1) !important;
			}

			.week {
				font-size: 25rpx;
				color: #000000;
				text-align: center;
			}

			.data {
				font-size: 21rpx;
				color: #6B7280;
				text-align: center;
				margin-top: 0rpx;
			}

		}

		.time {
			width: 100%;
			margin-top: 20rpx;
			flex-wrap: wrap;
		}

		.timeli {
			width: 32%;
			margin-right: 2%;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 2rpx solid #E5E7EB;
			height: 67rpx;
			margin-bottom: 20rpx;
		}

		.timelic {
			color: #036045;
			border: 2rpx solid #036045;
		}

		.timelihui {
			color: #999;
			background: #f5f5f5;
			border: 2rpx solid #f5f5f5;
		}

		.timeli:nth-child(3n+3) {
			margin-right: 0% !important;
		}



	}
</style>