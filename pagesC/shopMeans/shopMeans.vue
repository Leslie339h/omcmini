<template>
	<view>
		<view class="head flexColumn">
			<view class="">
				未认证
			</view>
			<view class="">
				准确填写联系电话,便于上线经营时顾客联系使用
			</view>
		</view>
		<view class="box">
			<view class="box_user ">
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="f-size-32 f-bold">
						联系人：
					</view>
					<input type="text" placeholder="请输入你的联系人" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="f-size-32 f-bold">
						联系号码：
					</view>
					<input type="text" placeholder="请输入你的联系号码" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="f-size-32 f-bold">
						店铺名称:
					</view>
					<input type="text" placeholder="请输入你的店铺名称" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="f-size-32 f-bold">
						店铺别名:
					</view>
					<input type="text" placeholder="请输入你的店铺名称" />
				</view>
				<view class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
					<view class="f-size-32 f-bold">
						店铺地址:
					</view>
					<input @click="getAddress" disabled="true" style="width: 420rpx;" type="text"
						placeholder="请输入你的店铺地址" />
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="mt-28 title pb-20 f-bold">
				门脸图
			</view>
			<view class="">
				<u-upload width="700rpx" height="300rpx" :fileList="fileList1" @afterRead="afterRead"
					@delete="deletePic" name="1" multiple :maxCount="1"></u-upload>
			</view>
			<view @click="routerTo('/pagesC/businessHours/businessHours')"
				class="pt-24 pb-24 box_user_item line_bom d-flex a-center j-sb">
				<view class="f-size-32 f-bold">
					营业时间:
				</view>
				<input disabled="true" style="width: 420rpx;" type="text" placeholder="请选择营业时间" />
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="btns">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
			};
		},
		methods: {
			getAddress() {
				uni.chooseLocation({
					success(res) {
						console.log('res', res);
					},
					fail(err) {
						console.log('err', err);
					}
				})
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
						url: '', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
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
		padding-bottom: 30rpx;
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

	.box {
		padding: 0 30rpx;
		box-sizing: border-box;

		input {
			width: 500rpx;
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
		margin: 20rpx auto;
	}
</style>