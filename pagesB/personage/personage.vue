<template>
	<view>
		<view class="hade_vip">
			完善资料特权
		</view>
		<view class="content_box">
			<view class="content">
				<view>
					<button class="content_img" open-type="chooseAvatar" @chooseavatar="chooseavatar">
						<image :src="img.fullurl" mode="aspectFill"></image>
					</button>
				</view>
				<height :hg="80"></height>
				<view class="content_input">
					<view>
						昵称
					</view>
					<view>
						<input @change='change' type="nickname" v-model="name" placeholder="请填写">
					</view>
				</view>
				<view class="content_input">
					<view>
						手机号
					</view>
					<view>
						<input style="color: #000000;" type="text" v-model="cell" placeholder="请填写手机号">
					</view>
				</view>
				<view class="content_input">
					<view>
						性别
					</view>
					<view>
						<u-radio-group v-model="radiovalue1" :iconSize='20' :labelSize='50' :size='15' placement="row">
							<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1"
								:key="index" :label="item.name" :name="item.name" @change="radioChange">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<!-- 		<view class="content_input" style="border-bottom: none;" @tap="show=true">
					<view>
						生日
					</view>
					<view style="display: flex; align-items: center;">
						<view class="">
							{{birthday||'请选择生日'}}
						</view>
						<view class="">
							<u-icon name="arrow-right" color="#303030" size="14"></u-icon>
						</view>
					</view>
				</view> -->

			</view>
		</view>

		<view class="save" @tap="sub">
			保存
		</view>
		<u-datetime-picker :show="show" minDate="" :maxDate="Number(new Date())" @cancel="show=false"
			@close='show=false' @confirm='time' v-model="value1" mode="date"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				int: {},
				name: '', //用户名
				cell: '', //电话号
				radiolist1: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '男',
				// 生日
				show: false,
				value1: Number(new Date()),
				birthday: '请选择',
				img: '', //头像
				logincode: ''
			};
		},
		onLoad() {
			this.getuser()
		},
		onShow() {

		},
		computed: {
			count() {
				if (this.value1) {
					// return toDate(this.value1, 2)
				} else {
					return '请选择'
				}
			}
		},
		methods: {
			change(e) {
				this.name = e.detail.value
			},
			async getuser() {
				let res = await this.userInfo()
				if (res.code == 1) {
					this.$store.state.vuex_user = res.data
					uni.setStorageSync('user', res.data)
					this.img = {
						fullurl: res.data.avatar,
						url: res.data.avatar
					}
					this.name = res.data.username
					this.cell = res.data.mobile
					this.radiovalue1 = res.data.gender == 1 ? '男' : '女'
				}

			},
			radioChange(n) {
				this.radiovalue1 = n
			},
			time(time) {
				this.birthday = toDate(time.value, 2)
				this.show = false
			},
			async chooseavatar(e) {
				let res = await this.uploadImg(e.detail.avatarUrl)
				if (res.code == 1) {
					this.img = res.data
				}
			},
			async sub() {
				let data = await this.profile({
					username: this.name,
					mobile: this.cell,
					birthday: this.birthday,
					gender: this.radiovalue1 == '女' ? 0 : 1,
					file: this.img.url
				})
				if (data.code == 1) {
					this.showToast('修改成功')
					this.getuser()
				}
			},


		}
	}
</script>

<style lang="scss">
	.u-radio {
		margin-right: 20rpx;
		margin-bottom: 0 !important;
	}

	.u-radio text {
		font-size: 30rpx !important;
	}

	.hade_vip {
		height: 73rpx;
		background: #ECF7F5;
		font-size: 26rpx;
		font-weight: 400;
		color: #036045;
		line-height: 73rpx;
		text-indent: 2em;
	}

	page {
		background-color: #F4F5F7;
	}

	.content_box {
		width: 705rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 auto;
		margin-top: 100rpx;

		.content {
			width: 90%;
			margin: 0 auto;
			position: relative;

			.content_img {
				padding: 0 !important;
				position: absolute;
				left: 50%;
				top: -80rpx;
				transform: translateX(-50%);
				width: 138rpx;
				height: 138rpx;
				border-radius: 50%;

				image {
					width: 138rpx;
					height: 138rpx;
					border-radius: 50%;
				}
			}

			.content_input {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #eaeaea42;


				view:nth-child(1) {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}

				view:nth-child(2) {
					input {
						font-size: 28rpx;
						font-weight: 400;
						color: #979797;
						text-align: right;
					}
				}
			}
		}
	}

	.account {
		width: 705rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 auto;
		margin-top: 10rpx;

		.content_input {
			width: 90%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #EAEAEA;

			view:nth-child(1) {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}

			view:nth-child(2) {
				input {
					font-size: 28rpx;
					font-weight: 400;
					color: #979797;
					text-align: right;
				}
			}
		}
	}

	.save {
		width: 704rpx;
		height: 102rpx;
		margin: 0 auto;
		background: #036045;
		border-radius: 9rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #fff;
		line-height: 102rpx;
		text-align: center;
		margin-top: 80rpx;
	}
</style>