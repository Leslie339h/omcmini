<template>
	<view class="box">
		<view class="content">
			<view class="user_class">
				<view class="user_class_1">
					<view class="user_class_1_left">
						头像
					</view>
					<button class="content_img" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<view class="user_class_1_right">
							<view class="user_class_1_right_text" v-if="!imgall">
								请上传头像
							</view>
							<image class="user_class_1_right_1" :src="imgall || '../../static/avatar.png'" v-if="imgall"
								mode="" />
							<u-icon name='arrow-right' size="14"></u-icon>
						</view>
					</button>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						手机号绑定
					</view>
					<view class="user_class_1_right">
						<input type="nickname" @change="userblur" class="user_class_1_right_text" maxlength="15"
							v-model="user_name" placeholder="请输入昵称" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						银行卡号
					</view>
					<view class="user_class_1_right">
						<input style="width: 300rpx;" class="user_class_1_right_text" type="text"
							placeholder="请填写银行卡号" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						支付宝
					</view>
					<view class="user_class_1_right">
						<input style="width: 300rpx;" class="user_class_1_right_text" type="text"
							placeholder="请绑定支付宝" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						微信
					</view>
					<view class="user_class_1_right">
						<input style="width: 300rpx;" class="user_class_1_right_text" type="text" placeholder="请绑定微信" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>


				<view class="user_class_1">
					<view class="user_class_1_left">
						实名认证
					</view>
					<view class="user_class_1_right">
						<input style="width: 300rpx;" class="user_class_1_right_text" type="text" placeholder="未认证" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						店铺认证
					</view>
					<view class="user_class_1_right">
						<input style="width: 300rpx;" class="user_class_1_right_text" type="text" placeholder="未认证" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						店铺资料
					</view>
					<view class="user_class_1_right">
						<input style="width: 300rpx;" class="user_class_1_right_text" type="text" placeholder="已上传" />
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>



				<view class="user_class_1">
					<view class="user_class_1_left">
						服务协议
					</view>
					<view class="user_class_1_right">
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>

				<view class="user_class_1">
					<view class="user_class_1_left">
						联系我们
					</view>
					<view class="user_class_1_right">
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>
				<view class="user_class_1">
					<view class="user_class_1_left">
						平台信息管理规范
					</view>
					<view class="user_class_1_right">
						<u-icon name='arrow-right' size="14"></u-icon>
					</view>
				</view>
			</view>



		</view>

		<view class="logout">
			退出登录
		</view>
	</view>

</template>

<script>
	import config from '@/config.js'
	export default {
		data() {
			return {
				// 初始化信息
				int: {},
				// 用户上传的头像
				imgall: '',
				// 名字
				user_name: '',
				// 邮箱
				mailbox: '',
				// 手机号
				cell: '',
				loginInfo: {
					code: '',
					iv: '',
					encryptedData: ''
				},
				avatarimg: '',
				mobile: ''

			};
		},
		onLoad(options) {

		},
		methods: {
			userblur(e) {
				this.user_name = e.detail.value;
			},
			blur() {
				this.mobile = this.cell
			},
		}
	}
</script>


<style lang="scss" scoped>
	page {
		background: #F6F6F6;
	}

	button {
		padding: 0;
		margin: 0;
		background-color: #FFFFFF;
	}

	.logout {
		margin-top: 20rpx;
		width: 762rpx;
		height: 91rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 33rpx;
		color: #3D3D3D;
	}

	.box {
		height: 102vh;
		background: #F6F6F6;
	}

	.content_1 {
		font-size: 26rpx;
		font-weight: 500;
		color: #171717;
		line-height: 37rpx;
		letter-spacing: 1px;
		text-indent: .8em;
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}



	.user_class_1 {
		width: 100%;
		height: 98rpx;
		margin: 0 auto;
		padding: 10rpx 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F5F5F5;
		background-color: #fff;
	}

	.user_class_1_left {
		font-weight: 500;
		font-size: 33rpx;
		color: #3D3D3D;
	}

	.user_class_1_right {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user_class_1_right_1 {
		width: 69rpx;
		height: 69rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user_class_1_right_text {
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
		letter-spacing: 1px;
	}

	.content_1_save {
		padding-right: 23rpx;
		height: 59rpx;
		background: #1194FB;
		border-radius: 30rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 59rpx;
		margin-right: 20rpx;
	}

	.user_class_1_right_2 {
		width: 15rpx;
		height: 27rpx;
	}

	.user_class_1_right_text {
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
		letter-spacing: 1px;
		margin-right: 20rpx;
		text-align: right;
	}

	.binding {
		height: 100rpx;
		background: #FFFFFF;
	}

	.binding_box {
		width: 95%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.binding_box_left {
		display: flex;
		align-items: center;
	}

	.binding_box_left_text {
		font-size: 28rpx;
		font-weight: 400;
		color: #171717;
		letter-spacing: 1px;
		margin-left: 12rpx;
	}

	.binding_box_right {
		display: flex;
		align-items: center;
	}

	.binding_box_right_name {
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
		letter-spacing: 1px;
		margin-right: 15rpx;
	}

	.binding_box_right_actve {
		width: 95rpx;
		height: 58rpx;
		background: #FEF2F2;
		border-radius: 18rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #B6333C;
		line-height: 58rpx;
		letter-spacing: 1px;
		text-align: center;
	}

	.binding_box_left_img {
		width: 32rpx;
		height: 32rpx;
		margin-top: 5rpx;
	}

	.binding_box_right_img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 15rpx;
	}

	.buttom {
		width: 708rpx;
		height: 79rpx;
		margin: 0 auto;
		border-radius: 40rpx;
		border: 2rpx solid #D15963;
		text-align: center;
		line-height: 79rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #E84442;
		letter-spacing: 1px;
		margin-top: 40rpx;
	}
</style>