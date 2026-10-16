<template>
	<view class="p-re">
		<view class="head_1 flexColumn" v-if="vuex_user.auth_status == '2'">
			<view class="">
				审核失败
			</view>
			<view class="">
				审核失败原因：{{info.result}}
			</view>
		</view>
		<view class="head flexColumn" v-if="['0',1,0].includes(vuex_user.auth_status)">
			<view class="" v-if="vuex_user.auth_status == 0">
				审核中
			</view>
			<view class="" v-if="vuex_user.auth_status == 1">
				认证成功
			</view>
			<view class="">
				店铺认证时通过核实店铺和身份证,来验证店铺的真实性和类型
			</view>
		</view>
		<view class="box">
			<view class="mt-28 title">
				个人信息
			</view>
			<view class="box_user ">
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="">
						姓名：
					</view>
					<input type="text" v-model="title" placeholder="请输入你的姓名" />
				</view>

				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="">
						身份证号：
					</view>
					<input type="text" v-model="id_number" placeholder="请输入你的身份证号" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="">
						联系号码:
					</view>
					<input type="digit" v-model="mobile" placeholder="请输入你的联系号码" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="">
						店铺名称：
					</view>
					<input type="text" v-model="store_name" placeholder="请输入你的店铺名称" />
				</view>

				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="">
						店铺别称：
					</view>
					<input type="text" v-model="alias_title" placeholder="请输入你的店铺别称" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb" @click="getAddress">
					<view class="">
						店铺地址：
					</view>
					<view class="d-flex a-center j-sb">
						<input style="width: 470rpx;" type="text" :disabled="true" v-model="store_address"
							placeholder="请输入你的店铺地址" />
						<u-icon name="arrow-right"></u-icon>
					</view>

				</view>
				<!-- @click="routerTo('/pagesC/businessHours/businessHours')" -->
				<!-- <view class="pt-24 pb-24 box_user_item ">
					<view class="">
						营业时间:
					</view>
					<view class="d-flex a-center j-sb mt-30">
						<view class="line_bom pb-20" style="width: 250rpx;text-align: center;"
							@click="dateshow=true,dateMark=1">
							<input disabled="true" v-model="start_times" style="width: 250rpx;" type="text"
								placeholder="请选择开始时间" />
						</view>
						<view class="line_bom pb-20" style="width: 250rpx;text-align: center;"
							@click="dateshow=true,dateMark=2">
							<input disabled="true" v-model="end_times" style="width: 250rpx;" type="text"
								placeholder="请选择结束时间" />
						</view>
					</view>
				</view> -->
			</view>
			<view class="mt-28 title pb-20 f-bold">
				店铺认证
			</view>
			<view class="">
				<u-upload width="700rpx" height="220rpx" :fileList="fileList1" @afterRead="afterRead"
					@delete="deletePic" name="1" multiple :maxCount="1"></u-upload>
			</view>
			<view class="pt-20 pb-20 f-size-28 txt-center">
				店铺照片
			</view>
			<view class="">
				<u-upload width="700rpx" height="220rpx" :fileList="fileList2" @afterRead="afterRead"
					@delete="deletePic" name="2" multiple :maxCount="1"></u-upload>
			</view>
			<view class="pt-20  f-size-28 txt-center">
				营业执照
			</view>
			<view class="mt-28 title pb-20 f-bold">
				身份证证件
			</view>
			<view class="a-center j-sb d-flex">
				<view class="">
					<u-upload width="336rpx" height="220rpx" :fileList="fileList3" @afterRead="afterRead"
						@delete="deletePic" name="3" multiple :maxCount="1"></u-upload>
					<view class="pt-20 pb-20 f-size-28 txt-center">
						身份证正面
					</view>
				</view>
				<view class="">
					<u-upload width="336rpx" height="220rpx" :fileList="fileList4" @afterRead="afterRead"
						@delete="deletePic" name="4" multiple :maxCount="1"></u-upload>
					<view class="pt-20 pb-20 f-size-28 txt-center">
						身份证反面
					</view>
				</view>
			</view>



			<view class="a-center j-sb d-flex">
				<view class="">
					<u-upload width="336rpx" height="220rpx" :fileList="fileList5" @afterRead="afterRead"
						@delete="deletePic" name="5" multiple :maxCount="1"></u-upload>
					<view class="pt-20 pb-20 f-size-28 txt-center">
						法人手持身份证照片
					</view>
				</view>
				<view class="">
					<u-upload width="336rpx" height="220rpx" :fileList="fileList6" @afterRead="afterRead"
						@delete="deletePic" name="6" multiple :maxCount="1"></u-upload>
					<view class="pt-20 pb-20 f-size-28 txt-center">
						法人自拍照
					</view>
				</view>
			</view>


			<view class="mt-28 title pb-20 f-bold">
				门脸图
			</view>
			<view class="">
				<u-upload width="324rpx" height="220rpx" :fileList="fileList7" @afterRead="afterRead"
					@delete="deletePic" name="7" multiple :maxCount="6"></u-upload>
			</view>


		</view>
		<view class="box">
			<view class="box_user ">
				<view class="pt-24 pb-24 box_user_item line_bom ">
					<view class="mb-20">
						店铺简介：
					</view>
					<u--textarea v-model="desc" confirmType="return" placeholder="请输入店铺简介"></u--textarea>
				</view>
			</view>
		</view>
		<u-datetime-picker @cancel='dateshow=false' :show="dateshow" @confirm='dateconfirm' v-model="datevalue"
			mode="time"></u-datetime-picker>

		<view class="btn_box" v-if="!storeAuthPassed">
			<view class="btns" @click="store_click">
				{{type=='edit'?'保存并提交审核':'提交认证'}}
			</view>
		</view>

	</view>
</template>

<script>
	import config from '@/config.js'
	export default {
		computed: {
			storeAuthPassed() {
				const a = this.vuex_user && this.vuex_user.auth_status
				return a === 1 || a === '1'
			}
		},
		data() {
			return {
				dateshow: false, //时间选择
				datevalue: '', //
				fileList1: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
				fileList5: [],
				fileList6: [],
				fileList7: [],
				type: 'apply',
				title: '',
				id_number: '',
				mobile: '',
				store_image: '',
				store_name: '',
				info: '',
				desc: "", //简介
				store_address: '', //店铺地址
				lon: '', //店铺经纬度
				lat: "", //店铺经纬度
				alias_title: '', //店铺别称
				images: [], //门帘图
				dateMark: 1, //营业还是结束时间
				start_times: '', //开始时间
				end_times: "", //结束时间
			};
		},
		onLoad() {
			if (this.vuex_user.auth_status !== -1) {
				this.viewinfo()
			}
		},
		methods: {
			dateconfirm(e) {
				if (this.dateMark == 1) {
					this.start_times = e.value
				} else {
					this.end_times = e.value
				}
				this.dateshow = false
				console.log('eee', e);
			},
			// 店铺地址
			getAddress() {
				let that = this
				console.log('1111');
				uni.chooseLocation({
					success(res) {
						console.log('res', res);
						that.store_address = res.address
						that.lat = res.latitude
						that.lon = res.longitude
					},
					fail(err) {
						console.log('err', err);
					}
				})
			},
			async viewinfo() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.store_authentication({
					type: "view"
				})
				if (res.code == 1) {
					this.info = res.data
					this.type = 'edit'
					this.title = res.data.title
					this.id_number = res.data.id_number
					this.mobile = res.data.mobile
					this.store_name = res.data.title
					this.alias_title = res.data.alias_title
					this.store_address = res.data.address
					this.lat = res.data.lat
					this.lon = res.data.lon
					// this.start_times = res.data.start_times
					// this.end_times = res.data.end_times
					this.desc = res.data.desc

					this.fileList1[0] = {
						url: res.data.store_image
					}
					this.fileList2[0] = {
						url: res.data.yy_image
					}
					this.fileList3[0] = {
						url: res.data.font_image
					}
					this.fileList4[0] = {
						url: res.data.back_image
					}
					this.fileList5[0] = {
						url: res.data.hard_image
					}
					this.fileList6[0] = {
						url: res.data.self_image
					}

					res.data.images.forEach(item => {
						this.fileList7.push({
							url: item
						})
					})
					uni.hideLoading()
				}
			},
			store_click() {
				this.uniModel('温馨提示', '确定信息填写完整了么').then(modelres => {
					if (modelres == 'confirm') {
						this.store_authenticationApi()
					}
				})
			},
			// 认证
			async store_authenticationApi() {
				if (!this.title) return this.showToast('请输入你的姓名')
				if (!this.id_number) return this.showToast('请输入你的身份证号')
				if (!this.mobile) return this.showToast('请输入你的联系电话')
				if (!this.store_name) return this.showToast('请输入你的店铺名称')
				if (!this.alias_title) return this.showToast('请输入你的店铺别称')
				if (!this.store_address) return this.showToast('请上传店铺地址')
				// if (!this.start_times) return this.showToast('请上传开始营业时间')
				// if (!this.end_times) return this.showToast('请上传营业结束时间')
				if (this.fileList1.length <= 0) return this.showToast('请上传店铺图片')
				if (this.fileList2.length <= 0) return this.showToast('请上传营业执照')
				if (this.fileList3.length <= 0) return this.showToast('请上传身份证正面')
				if (this.fileList4.length <= 0) return this.showToast('请上传身份证反面')
				if (this.fileList5.length <= 0) return this.showToast('请上传手持身份证')
				if (this.fileList6.length <= 0) return this.showToast('请上传个人自拍照')
				if (this.fileList7.length <= 0) return this.showToast('请上传门脸图')
				let images = ''
				this.fileList7.forEach(item => {
					if (item.url.url) {
						images += item.url.url + ','
					} else {
						images += item.url + ','
					}
				})
				images = images.substring(0, images.length - 1)

				let res = await this.store_authentication({
					type: this.type,
					contacts: this.title,
					id_number: this.id_number,
					mobile: this.mobile,
					title: this.store_name,
					store_image: this.fileList1[0].url.url ? this.fileList1[0].url.url : this.fileList1[0].url,
					yy_image: this.fileList2[0].url.url ? this.fileList2[0].url.url : this.fileList2[0].url,
					font_image: this.fileList3[0].url.url ? this.fileList3[0].url.url : this.fileList3[0].url,
					back_image: this.fileList4[0].url.url ? this.fileList4[0].url.url : this.fileList4[0].url,
					hard_image: this.fileList5[0].url.url ? this.fileList5[0].url.url : this.fileList5[0].url,
					self_image: this.fileList6[0].url.url ? this.fileList6[0].url.url : this.fileList6[0].url,
					lon: this.lon,
					lat: this.lat,
					desc: this.desc,
					address: this.store_address,
					alias_title: this.alias_title,
					images: images,
					// start_times: this.start_times,
					// end_times: this.end_times
				})
				if (res.code == 1) {
					this.showToast(res.msg || '提交成功，请等待审核')
					const u = await this.userInfo()
					if (u.code == 1) {
						this.$u.vuex('vuex_user', u.data)
						uni.setStorageSync('user', u.data)
					}
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/my/my'
						})
					}, 1500)
				} else {
					uni.showToast({
						title: res.msg || '提交失败，请稍后重试',
						icon: 'none',
						duration: 2500
					})
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: config.serverIp +
							'/api/common/upload', // 仅为示例，非真实的接口地址addons/fzxcxt/common/upload
						filePath: url,
						name: 'file',
						formData: {
							token: uni.getStorageSync('token') || ''
						},
						success: (res) => {
							let imgres = JSON.parse(res.data)
							console.log('imgres', imgres);
							setTimeout(() => {
								resolve(imgres.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 150rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 32rpx;
		color: #3D3D3D;
	}

	.head {
		width: 760rpx;
		height: 138rpx;
		background: #E1FFF6;
		padding: 24rpx 48rpx;
		box-sizing: border-box;

		view:nth-child(1) {
			font-size: 32rpx;
			color: #036045;
		}

		view:nth-child(2) {
			font-weight: 400;
			font-size: 24rpx;
			color: #3D3D3D;
		}
	}

	.head_1 {
		width: 760rpx;
		background: rgb(247, 31, 16);
		padding: 24rpx 48rpx;
		box-sizing: border-box;

		view:nth-child(1) {
			font-size: 32rpx;
			color: #3d3d3d;
		}

		view:nth-child(2) {
			font-weight: 400;
			font-size: 24rpx;
			color: #3d3d3d;
		}
	}

	.box {
		padding: 0 30rpx;
		box-sizing: border-box;

		input {
			width: 500rpx;
		}
	}

	.btn_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 10;
		padding: 20rpx 30rpx 40rpx;
		border-top: 1rpx solid #eee;
	}

	.btns {
		height: 85rpx;
		background: #036045;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 85rpx;
		text-align: center;
	}
</style>