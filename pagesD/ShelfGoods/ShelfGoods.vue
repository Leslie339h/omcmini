<template>
	<view>
		<view class="title">
			基本信息
		</view>
		<view class="box">
			<view class="box_item line ">
				<span>规格</span>
				<view class="mt-24">
					<u-radio-group v-model="radiovalue2" placement="row" @change="removeskus()">
						<u-radio :customStyle="{margin: '0rpx 20rpx 0 0'}" v-for="(item, index) in radiolist2"
							:key="index" :label="item.name" :name="item.id">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="box_item line   ">
				<span>门店专卖</span>
				<view class="mt-24">
					<u-radio-group v-model="radiovalue1" placement="row">
						<u-radio :customStyle="{margin: '0rpx 20rpx 0 0'}" v-for="(item, index) in radiolist1"
							:key="index" :label="item.name" :name="item.id">
						</u-radio>
					</u-radio-group>
				</view>
			</view>

			<view class="box_item line d-flex a-center j-sb">
				<span>名称</span>
				<view class=" d-flex a-center j-sb">
					<input type="text" placeholder="请输入" v-model="shoptitle" />
					<u-icon name="arrow-right" size="12" color="#fff"></u-icon>
				</view>
			</view>
			<view class="box_item line d-flex a-center j-sb">
				<span>分类</span>
				<view class=" d-flex a-center j-sb" @click="openShow">
					<input disabled="true" v-model="type.name" type="text" placeholder="请选择分类" />
					<u-icon name="arrow-right" size="12"></u-icon>
				</view>
			</view>
			<view class="box_item line d-flex a-center j-sb" @click="guiGeShow=true" v-if="radiovalue2==2">
				<span>规格</span>
				<view class=" d-flex a-center j-sb">
					<input disabled=" true" v-model="guiGeTitle" type="text" placeholder="请选择规格" />
					<u-icon name="arrow-right" size="12"></u-icon>
				</view>
			</view>


			<view class="box_item line d-flex a-center j-sb">
				<span>标签</span>
				<view class=" d-flex a-center j-sb" @click="tagshow=true">
					<view class="d-flex a-center " style="width: 500rpx;" v-if="tags.length>0">
						<span v-for="(item,index) in tags" :key="index" class="mr-10">{{item}}</span>
					</view>
					<input v-else disabled="true" type="text" placeholder="请输入标签" />
					<u-icon name="arrow-right" size="12"></u-icon>
				</view>
			</view>
			<view class="box_item line d-flex a-center j-sb" v-if="radiovalue2==1">
				<span>价格</span>
				<view class=" d-flex a-center j-sb">
					<input v-model="price" type='digit' placeholder="请输入价格" />
					<u-icon name="arrow-right" size="12" color="#fff"></u-icon>
				</view>
			</view>





			<view class="box_item d-flex a-center j-sb">
				<span>展示图</span>
			</view>
			<view class="">
				<u-upload width="660rpx" height="150" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple :maxCount="1"></u-upload>
			</view>

			<view class="box_item d-flex a-center j-sb">
				<span>详情展示图</span>
			</view>
			<view class="">
				<u-upload :fileList="fileList2" @afterRead="afterRead" @delete="deletePic" name="2" multiple
					:maxCount="6"></u-upload>
			</view>
			<view class="box_item d-flex a-center j-sb">
				<span>图片需要突出商品的样子,不能模糊</span>
			</view>


			<view class="box_item d-flex a-center j-sb">
				<span>详细描述:</span>
			</view>
			<view class="">
				<u--textarea confirmType="return" v-model="json" placeholder="请输入内容"></u--textarea>
			</view>

		</view>

		<view class="btn" v-if="editid" @click="editGoodsApi">
			修改
		</view>

		<view class="btn" v-else @click="addGoodsApi">
			上架
		</view>


		<u-picker @confirm='confirm' @cancel='show=false' keyName='name' :show="show" :columns="columns"></u-picker>

		<u-popup :show="guiGeShow" @close="guiGeShow=false" :closeable='true' :round="20">
			<view class="guige_box">
				<view class="plus-circle" @click="addsku ">
					<u-icon name="plus-circle" size="22"></u-icon>
				</view>
				<view class="text-center mb-30 color-3d f-size-34 f-bold">
					规格
				</view>


				<view class="gg_box mb-30">
					<view class="gg_item" :class="item.is_show?'active':''" @click="settable(item)"
						v-for="(item,index) in gglist" :key="item.id">
						{{item.name}}
					</view>
				</view>

				<view class="mb-30">
					<scroll-view scroll-y="true" class="tabbal_box" style="height: 500rpx;">
						<uni-table border stripe emptyText="暂无更多数据" v-if="activeggList.length>0">
							<!-- 表头行 -->
							<uni-tr>
								<uni-th align="center" v-for="(item,index) in tableList" :key="index"
									class="d-flex a-center"><span class="mr-10">{{item.name}}</span>
									<image @click="setmodal(item.name)" v-if="['原价','现价','库存'].includes(item.name)"
										style="width: 24rpx;" src="../static/dicon3.png" mode="widthFix"></image>
								</uni-th>
							</uni-tr>
							<!-- 表格数据行 -->
							<uni-tr v-for="(item_1,index_1) in skus">
								<uni-td align="center" v-for="item_2 in item_1.attr">{{item_2}}</uni-td>
								<uni-td class="">
									<input v-model='item_1.market_price' style="width: 220rpx;margin: 0 auto;"
										type="text" placeholder="请输入原价" />

								</uni-td>
								<uni-td><input v-model='item_1.price' style="width: 220rpx;margin: 0 auto;" type="text"
										placeholder="请输入现价" /></uni-td>
								<uni-td><input v-model="item_1.stock" style="width: 220rpx;margin: 0 auto;" type="text"
										placeholder="请输入库存" /></uni-td>
								<uni-td><input v-model="item_1.sn" style="width: 220rpx;margin: 0 auto;" type="text"
										placeholder="请输入编码" /></uni-td>
								<uni-td><u-switch v-model="item_1.status"></u-switch></uni-td>
							</uni-tr>
						</uni-table>
						<empty v-else></empty>
					</scroll-view>
				</view>


				<view class="btns" @click="skus_btn">
					确定
				</view>

			</view>
		</u-popup>

		<u-modal :show="modalshow" :title="title" :showCancelButton='true' @confirm='modalConfirm'
			@cancel='modalshow=false'>
			<view class="slot-content">
				<u--input type='digit' :placeholder="placeholder" border="surround" v-model="modalvalue"></u--input>
			</view>
		</u-modal>

		<!-- 标签 -->
		<u-popup :show="tagshow" @close="tagshow=false" :round="10" :closeable='true'>
			<view class="pop_box">
				<view class="txt-center f-size-30 f-600">
					规格
				</view>
				<view class="ipt_box">
					<u--input type='text' maxlength="5" placeholder="请输入标签名称" border="surround"
						v-model="tagName"></u--input>
				</view>
				<view class="ipt_btn" @click="exectag">
					添加
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import config from '@/config.js'
	export default {
		data() {
			return {
				tagshow: false, //标签
				tagName: '', //标签弹窗里面的input value


				modalshow: false,
				title: '温馨提示',
				modalvalue: '', //统一价格
				placeholder: "请输入统一价格",
				radiolist1: [{
						id: 0,
						name: '用户可下单',
						disabled: false
					},
					{
						id: 1,
						name: '只可门店',
						disabled: false
					}
				],
				radiovalue1: 0,


				radiolist2: [{
						id: 2,
						name: '多规格',
						disabled: false
					},
					{
						id: 1,
						name: '单规格',
						disabled: false
					}
				],
				radiovalue2: 2,

				price: "", //价格
				json: "", //详情
				fileList1: [], //展示图
				fileList2: [], //详情展示图
				show: false, //分类弹窗
				guiGeShow: false, //规格弹窗
				columns: [
					[]
				], //分类
				gglist: [],
				tableList: [], //表格th
				activeggList: [], //选中的规格
				skus: [], //上传的规格
				guiGeTitle: '',
				type: '', //分裂
				shoptitle: "", //商品名称
				tags: [], //标签
				editid: '', //修改的id
			};
		},
		onLoad(e) {
			this.specListApi()
			if (e.id) {
				this.editid = e.id
				this.goodsDetailApi()
			}
		},
		onShow() {
			this.specListApi()
			this.categoryListApi()

		},
		methods: {
			addsku() {
				this.showToast('规格请在后台或联系管理员维护')
				this.removeskus()
			},

			removeskus() {
				this.tableList = []
				this.skus = []
				this.activeggList = []
			},

			async goodsDetailApi() {
				let res = await this.storegoodsDetail({
					id: this.editid
				})
				if (res.code == 1) {
					this.type = {
						id: res.data.type_id,
						name: res.data.type_name
					}
					this.shoptitle = res.data.title
					let tagArr = res.data.tags.split(',')
					this.tags = tagArr
					this.fileList1.push({
						url: res.data.image
					})
					res.data.images.forEach(item => {
						this.fileList2.push({
							url: item
						})
					})
					// images: images,
					this.json = res.data.json
					this.price = res.data.price
					this.skus = res.data.skus

					this.radiovalue1 = Number(res.data.store_goods)
					this.radiovalue2 = Number(res.data.type)
					this.gglist.forEach(item => {
						res.data.groups.forEach(item_1 => {
							if (item.name == item_1) {
								item.is_show = true
								this.activeggList.push(item)
							}
						})
					})
					this.guiGeTitle = '已上传'

					let tablearr = [{
						name: "原价",
					}, {
						name: "现价",
					}, {
						name: "库存",
					}, {
						name: "编码",
					}, {
						name: "状态",
					}]
					this.tableList = [...this.activeggList, ...tablearr]

					console.log('res', res);
				}
			},
			exectag() {
				console.log('this.tagName', this.tagName);
				if (this.tagName.length > 0) {
					if (this.tags.length < 3) {
						this.tags.push(this.tagName)
						this.tagName = ''
						this.tagshow = false
					} else {
						this.showToast('最多输入3个标签')
					}
				} else {
					this.showToast('请输入标签内容')
				}
			},
			// 修改商品
			async editGoodsApi() {
				if (!this.shoptitle) return this.showToast('请输入名称')
				if (!this.type) return this.showToast('请选择分类')
				if (this.radiovalue2 == 2) {
					if (this.skus.length <= 0) return this.showToast('请上传规格')
					if (this.activeggList <= 0) return this.showToast('请上传规格')
				} else {
					if (!this.price) return this.showToast('请输入价格')
				}
				if (this.tags.length <= 0) return this.showToast('请输入标签')
				if (!this.json) return this.showToast('请输入详细描述')
				if (this.fileList1.length <= 0) return this.showToast('请上传展示图')
				if (this.fileList2.length <= 0) return this.showToast('请上传详情展示图')
				let images = ''
				this.fileList2.forEach((item, index) => {
					if (index == this.fileList2.length - 1) {
						if (item.url.url) {
							images += item.url.url
						} else {
							images += item.url
						}
					} else {
						if (item.url.url) {
							images += item.url.url + ','
						} else {
							images += item.url + ','
						}
					}
				})
				let groups = []
				let items = []
				this.activeggList.forEach(item => {
					groups.push(item.name)
					let arr = []
					item.item.forEach(item_1 => {
						arr.push(item_1.name)
					})
					items.push(arr)
				})
				let tags_1 = ''
				this.tags.forEach((item, index) => {
					if (index == this.tags.length - 1) {
						tags_1 += item
					} else {
						tags_1 += item + ','
					}
				})

				let res = await this.editGoods({
					id: this.editid,
					type_id: this.type.id,
					title: this.shoptitle,
					tags: tags_1,
					image: this.fileList1[0].url.url ? this.fileList1[0].url.url : this.fileList1[0].url,
					images: images,
					json: this.json,
					price: this.price,
					state: 1,
					skus: this.skus,
					groups: groups,
					items: items,
					store_goods: this.radiovalue1,
					type: this.radiovalue2
				})
				if (res.code == 1) {
					this.showToast('修改成功，请等待审核')
					uni.navigateBack()
				}
			},




			// 上架
			async addGoodsApi() {
				if (!this.shoptitle) return this.showToast('请输入名称')
				if (!this.type) return this.showToast('请选择分类')
				if (this.radiovalue2 == 2) {
					if (this.skus.length <= 0) return this.showToast('请上传规格')
					if (this.activeggList <= 0) return this.showToast('请上传规格')
				} else {
					if (!this.price) return this.showToast('请输入价格')
				}


				if (this.tags.length <= 0) return this.showToast('请输入标签')
				if (!this.json) return this.showToast('请输入详细描述')
				if (this.fileList1.length <= 0) return this.showToast('请上传展示图')
				if (this.fileList2.length <= 0) return this.showToast('请上传详情展示图')
				let images = ''
				this.fileList2.forEach((item, index) => {
					if (index == this.fileList2.length - 1) {
						if (item.url.url) {
							images += item.url.url
						} else {
							images += item.url
						}
					} else {
						if (item.url.url) {
							images += item.url.url + ','
						} else {
							images += item.url + ','
						}
					}
				})
				let groups = []
				let items = []
				this.activeggList.forEach(item => {
					groups.push(item.name)
					let arr = []
					item.item.forEach(item_1 => {
						arr.push(item_1.name)
					})
					items.push(arr)
				})
				let tags_1 = ''
				this.tags.forEach((item, index) => {
					if (index == this.tags.length - 1) {
						tags_1 += item
					} else {
						tags_1 += item + ','
					}
				})

				let res = await this.addGoods({
					type_id: this.type.id,
					title: this.shoptitle,
					tags: tags_1,
					image: this.fileList1[0].url.url ? this.fileList1[0].url.url : this.fileList1[0].url,
					images: images,
					json: this.json,
					price: this.price,
					state: 1,
					skus: this.skus,
					groups: groups,
					items: items,
					store_goods: this.radiovalue1,
					type: this.radiovalue2
				})
				if (res.code == 1) {
					this.showToast('添加成功，请等待审核')
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}
			},


			// 同意价格确定
			modalConfirm() {
				if (this.modalvalue) {
					this.skus.forEach(item => {
						if (this.modalname == '原价') {
							item.market_price = this.modalvalue
						} else if (this.modalname == '现价') {
							item.price = this.modalvalue
						} else if (this.modalname == '库存') {
							item.stock = this.modalvalue
						}
					})
					this.modalshow = false
				} else {
					this.showToast('不能为空')
				}
				this.$forceUpdate()
			},
			// 显示统一价格
			setmodal(name) {
				console.log(name)
				this.modalvalue = ''
				this.placeholder = `请输入统一${name}`
				this.modalname = name
				this.modalshow = true
			},

			// 上传规格
			skus_btn() {
				if (this.skus.length > 0) {
					this.guiGeShow = false
					this.guiGeTitle = '已上传'
				} else {
					this.showToast('请选择规格')
				}
			},


			// 选中取消规格
			removeTable(res) {

				this.skus = []
				let actarr = []
				this.activeggList[0].item.forEach(item => {
					let arr = {
						attr: [],
						market_price: "9.90",
						price: "9.90",
						stock: 10,
						sn: "",
						image: "",
						status: true
					}
					arr.attr.push(item.name)
					actarr.push(arr)
				})
				this.skus = actarr
				this.activeggList.forEach((item_1, index_1) => {
					if (index_1 !== 0) {
						this.setskus(item_1)
					}
				})
				uni.hideLoading()
				this.$forceUpdate()
			},

			setskus(res) {
				let arr = []
				this.skus.forEach(item => {
					res.item.forEach(item_1 => {
						arr.push({
							attr: [...item.attr, item_1.name],
							market_price: "9.90",
							price: "9.90",
							stock: 0,
							sn: "",
							image: "",
							status: true
						})
					})
				})
				this.skus = arr
			},
			// 选择规格
			settable(res) {
				this.gglist.forEach(item => {
					if (item.id == res.id) {
						if (item.is_show) {
							if (this.activeggList.length == 0) return this.showToast('至少选择一个规格')
							item.is_show = false
							this.activeggList.forEach((item_1, idx_1) => {
								if (item_1.id == res.id) {
									this.activeggList.splice(idx_1, 1)
								}
							})
						} else {
							item.is_show = true
							this.activeggList.push(res)
						}
					}
				})
				this.removeTable(res)
				let tablearr = [{
					name: "原价",
				}, {
					name: "现价",
				}, {
					name: "库存",
				}, {
					name: "编码",
				}, {
					name: "状态",
				}]
				this.tableList = [...this.activeggList, ...tablearr]

			},
			confirm(e) {
				console.log('e', e);
				this.show = false
				this.type = e.value[0]
			},
			// 分类列表
			async categoryListApi(e) {
				let res = await this.categoryList({
					page: 1,
					limit: 1000
				})
				if (res.code == 1) {
					this.columns[0] = res.data.rows
				}
			},
			// 规格列表
			async specListApi(e) {
				let res = await this.specList({
					page: 1,
					limit: 1000
				})
				if (res.code == 1) {
					this.gglist = res.data.rows
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
						url: config.serverIp + '/api/common/upload',
						// 仅为示例，非真实的接口地址
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

			// 打开分类选择框
			openShow() {
				if (this.columns[0].length == 0) {
					uni.showModal({
						title: '提示',
						content: '当前还未设置商品分类，请在后台或联系管理员维护。',
						showCancel: false
					})
				} else {
					this.show = true
				}
			},
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}


	.line {
		border-bottom: 1rpx solid #eee;
	}

	.btn {
		width: 667rpx;
		height: 85rpx;
		background: #036045;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin: 40rpx auto;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 85rpx;
		text-align: center;
	}

	.title {
		padding: 24rpx 38rpx;
		box-sizing: border-box;
		font-weight: 400;
		font-size: 24rpx;
		color: #91949E;
		line-height: 34rpx;
	}

	.box {
		width: 100%;
		background: #FFFFFF;
		padding: 0 38rpx 38rpx;
		box-sizing: border-box;

		.box_item {
			font-weight: 400;
			font-size: 32rpx;
			color: #3D3D3D;
			padding: 24rpx 0;
			box-sizing: border-box;

			input {
				width: 500rpx;
				font-size: 28rpx;
			}
		}
	}

	.guige_box {
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;

		.plus-circle {
			position: absolute;
			top: 34rpx;
			left: 34rpx;
		}

		.gg_box {
			white-space: nowrap;
			overflow-x: scroll;

			.gg_item {
				display: inline-block;
				padding: 20rpx 30rpx;
				background: rgba(153, 153, 153, 0.1);
				border-radius: 18rpx 18rpx 18rpx 18rpx;
				border: 2rpx solid #999999;
				margin-right: 20rpx;
			}
		}

		.guiGe_item_box {
			margin: 10rpx 0 30rpx;
			height: 600rpx;
			width: 700rpx;

			.guiGe_item_box_item {
				padding: 20rpx;
				width: 200rpx;
				height: 80rpx;
				margin-right: 30rpx;
				// display: inline-block;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				box-sizing: border-box;
				overflow: hidden;
			}

			.ipt_box {
				width: 200rpx;
				height: 78rpx;
				margin-right: 30rpx;
				display: inline-block;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 10rpx 0 0;
				box-sizing: border-box;
			}
		}

		.btns {
			width: 667rpx;
			height: 85rpx;
			background: #036045;
			border-radius: 16rpx 16rpx 16rpx 16rpx;

			font-weight: 400;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 85rpx;
			text-align: center;
		}
	}

	.tabbal_box {
		input {
			text-align: center;
		}
	}

	.active {
		background: #F4FCFF !important;
		border: 1rpx solid #036045 !important;
		color: #036045 !important;
	}

	.tag_item {
		margin-top: 50rpx;
		width: 200rpx;
		font-size: 28rpx;
		font-weight: 700;
		margin-right: 30rpx;
		text-align: center;

	}

	.pop_box {
		width: 750rpx;
		height: 544rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.ipt_btn {
			width: 690rpx;
			height: 102rpx;
			background: #036045;
			border-radius: 1246rpx 1246rpx 1246rpx 1246rpx;
			text-align: center;
			line-height: 102rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}

	.ipt_box {

		background: #F8F9FC;
		margin: 60rpx 0 100rpx;
	}
</style>