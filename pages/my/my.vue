<template>
	<view>
		<image class="bg_img" src="@/static/me1.png" mode=""></image>
		<view class="head_img z-index d-flex a-center" v-if="vuex_token"
			@click="routerGo('/pagesB/personage/personage')">
			<image class="mr-22" :src="vuex_user.avatar" mode="aspectFill"></image>
			<view class="">
				{{vuex_user.username}}
			</view>
		</view>
		<view v-else class="head_img d-flex a-center" @click="routerGo('/pagesB/personage/personage')">
			<image class="mr-22" src="@/static/avatar.png" mode="aspectFill"></image>
			<view class="">
				请登录
			</view>
		</view>

		<view class="card_2">
			<!-- 		<view class="card_2_item d-flex a-center j-sb" @click="routerGo('/pagesF/companyIndex/companyIndex')">
				<image src="../../static/me9.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">公司端</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view> -->
			<!-- 	<view class="menu-item d-flex a-center j-sb" @click="go('/pagesA/referral/qrcode')">
				<view class="d-flex a-center">
					<u-icon name="scan" size="22" color="#00baff"></u-icon>
					<text class="tit">推广海报</text>CJ862
				</view>
				<u-icon name="arrow-right" color="#bdbdbd" size="14"></u-icon>
			</view> -->
			<!-- <view class="card_2_item d-flex a-center j-sb"  @click="go('/pagesA/referral/qrcode')">
				<image src="../../static/me10.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">推广海报</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view> -->
			<view class="card_2_item d-flex a-center j-sb" @click="go_sj" v-if="showMerchantCard">
				<image src="../../static/me10.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">{{ merchantMenuTitle }}</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="card_2_item d-flex a-center j-sb" @click="routerGo('/pages/order/order', 'switchTab')">
				<image src="../../static/me4.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">我的订单</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="card_2_item d-flex a-center j-sb" @click="routerGo('/pagesB/coupon/index')">
				<image src="../../static/me5.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">优惠券</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="card_2_item d-flex a-center j-sb" @click="goReferral('/pagesA/referral/index')" v-if="vuex_token">
				<image src="../../static/me4.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">驰友中心</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="card_2_item d-flex a-center j-sb" @click="routerGo('/pagesB/warrantyRegister/warrantyRegister')">
				<image src="../../static/me5.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">驰安心注册</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="card_2_item d-flex a-center j-sb" @click="routerGo('/pagesB/warrantyMyList/warrantyMyList')">
				<image src="../../static/me6.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">我的驰安心</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="card_2_item d-flex a-center j-sb" @click="routerGo('/pagesB/claimRegister/claimRegister')">
				<image src="../../static/me7.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">质保申请</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<button open-type="contact" class="card_2_item d-flex a-center j-sb">
				<image src="../../static/me12.png" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt" style="padding: 14rpx 0;">
					<span class="f-size-28 f-600">联系客服</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</button>


			<view class="card_2_item d-flex a-center j-sb" v-if="vuex_token" @click="logoutApi">
				<image src="../../static/me11.svg" mode="widthFix"></image>
				<view class="d-flex a-center j-sb card_2_item_ipt">
					<span class="f-size-28 f-600">退出登录</span>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
		</view>
		<view class="color-3d f-size-24 txt-center mt-30 pb-30">
			备案号： <span class="color-03"> {{vuex_common.mini_filings || 'xxx'}}</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			/** 预录待完善、已关联门店、审核中/通过/驳回 均展示；纯 C 端用户仅当开启入驻总开关时展示 */
			showMerchantCard() {
				const sjrzOn = this.vuex_common && String(this.vuex_common.sjrz) === '1'
				const u = this.vuex_user
				if (!this.vuex_token || !u) {
					return sjrzOn
				}
				if (u.need_complete_store == 1 || u.auth_status === -2 || u.auth_status === '-2') return true
				if (u.store_user == 1) return true
				if ([0, 1, 2].includes(Number(u.auth_status))) return true
				return sjrzOn
			},
			merchantMenuTitle() {
				if (!this.vuex_token || !this.vuex_user) {
					return '商家服务'
				}
				const u = this.vuex_user
				if (u.need_complete_store == 1 || u.auth_status === -2 || u.auth_status === '-2') {
					return '完善门店资料'
				}
				if (String(u.auth_status) === '1') {
					return '店铺中心'
				}
				if ([0, 2].indexOf(Number(u.auth_status)) !== -1) {
					return '门店认证'
				}
				return '入驻商家'
			}
		},
		onLoad() {
			console.log('===', this.vuex_user);
		},
		onShow() {
			if (this.vuex_token) {
				this.$store.commit('userApi')
				// 用户绑定手机号后，若存在预创建门店需完善，则强制跳转至店铺完善页
				setTimeout(() => {
					const u = this.vuex_user
					if (u && (u.need_complete_store == 1 || u.auth_status == -2 || u.auth_status === '-2')) {
						uni.redirectTo({
							url: '/pagesC/shopAuthentication/shopAuthentication'
						})
					}
				}, 500)
			}
		},
		methods: {
			logoutApi() {
				let that = this
				this.uniModel('温馨提示', '确定要退出吗？').then(res => {
					if (res == 'confirm') {
						that.logout().then(res1 => {
							if (res1.code == 1) {
								uni.removeStorageSync('token')
								that.$store.state.vuex_token = null
								that.$store.state.vuex_user = null
								that.$store.state.address_data = null //地址id
								that.$store.state.vuex_openid = null //地址id
							}
						})
					}
				})
			},
			goReferral(url) {
				if (!this.vuex_token) {
					this.routerGo('/pages/login/login')
					return
				}
				this.routerGo(url)
			},
			go_sj() {
				if (!this.vuex_token) {
					this.routerGo('/pages/login/login')
					return
				}
				const u = this.vuex_user
				if (!u) {
					this.routerGo('/pagesC/shopAuthentication/shopAuthentication')
					return
				}
				// 审核通过：进门店管理；其余（含预录待完善、审核中、驳回、新入驻）进资料页
				if (String(u.auth_status) === '1') {
					this.routerGo('/pagesC/shop/shop')
				} else {
					this.routerGo('/pagesC/shopAuthentication/shopAuthentication')
				}
			}
		}
	}
</script>

<style lang="scss">
	::v-deep button {
		background-color: transparent;
		padding: 0;
		margin: 0 !important;

	}

	.bg_img {
		width: 100vw;
		position: absolute;
		height: 500rpx;
		top: -200rpx;
	}

	.head_img {
		font-size: 34rpx;
		color: #333333;
		font-weight: 600;
		margin: 100rpx 0 30rpx 45rpx;

		image {
			width: 107rpx;
			height: 107rpx;
			border: 4rpx solid #FFFFFF;
			border-radius: 50%;
		}
	}

	.card_2 {

		.card_2_item {
			padding: 0rpx 28rpx;
			box-sizing: border-box;

			image {
				width: 30rpx;
				height: 34rpx;
			}
		}

		.card_2_item_ipt {
			width: 618rpx;
			padding: 34rpx 0rpx;
			border-bottom: 1rpx solid #F3F3F3;
		}
	}
</style>
