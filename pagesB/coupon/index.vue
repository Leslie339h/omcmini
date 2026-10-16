<template>
	<view class="page">
		<u-sticky>
			<view class="tabs">
				<u-tabs
					:list="tablist"
					:current="tabIndex"
					@click="tabclick"
					lineColor="#036045"
					:activeStyle="tabActiveStyle"
					:inactiveStyle="tabInactiveStyle"
				></u-tabs>
			</view>
		</u-sticky>

		<!-- 可领取 -->
		<view v-show="tabIndex === 0" class="box">
			<empty v-if="claimList.length <= 0"></empty>
			<view class="card" v-for="item in claimList" :key="item.id">
				<view class="card_top d-flex a-center">
					<view class="card_top_left mr-36 text-center">
						<view class="f-size-44 color-ff3767 f-600">
							{{ item.used_amount }} <text class="f-size-24">元</text>
						</view>
						<view class="f-size-24 color-9">满{{ item.with_amount }}元可用</view>
					</view>
					<view class="card_top_right mt-6 flex-1">
						<view class="mb-14 f-700">{{ item.title }}</view>
						<view class="f-size-22 color-9 mt-6" v-if="item.use_time_text">使用时间：{{ item.use_time_text }}</view>
					</view>
				</view>
				<view class="card_bom flexc flexs">
					<view class="card_bom_left flexc">
						<text class="rule_toggle" :data-cid="item.id" @tap.stop="toggleClaimRule">使用规则</text>
						<image
							class="rule_toggle_img"
							:data-cid="item.id"
							@tap.stop="toggleClaimRule"
							v-if="!ruleOpenClaim[item.id]"
							src="../static/bicon12.png"
							mode=""
						></image>
						<image
							class="rule_toggle_img"
							:data-cid="item.id"
							@tap.stop="toggleClaimRule"
							v-else
							src="../static/bicon11.png"
							mode=""
						></image>
						<view class="rule_pop" v-if="ruleOpenClaim[item.id]">
							<view class="rule_line">适用商品：{{ item.fit_goods }}</view>
							<view class="rule_line" v-if="item.remarks">说明：{{ item.remarks }}</view>
						</view>
					</view>
					<view class="card_bom_btn" :data-cid="item.id" @tap.stop="drawCoupon">领取</view>
				</view>
			</view>
		</view>

		<!-- 我的券 -->
		<view v-show="tabIndex === 1" class="box">
			<empty v-if="mineList.length <= 0"></empty>
			<view class="card" v-for="item in mineList" :key="item.id">
				<view class="card_top d-flex a-center">
					<view class="card_top_left mr-36 text-center">
						<view class="f-size-44 color-ff3767 f-600">
							{{ item.used_amount }} <text class="f-size-24">元</text>
						</view>
						<view class="f-size-24 color-9">满{{ item.with_amount }}元可用</view>
					</view>
					<view class="card_top_right mt-6 flex-1">
						<view class="mb-14 f-700">{{ item.title }}</view>
						<view class="f-size-22 color-9" v-if="item.use_time_text">使用时间：{{ item.use_time_text }}</view>
					</view>
				</view>
				<view class="card_bom flexc flexs">
					<view class="card_bom_left flexc">
						<text class="rule_toggle" :data-cid="item.id" @tap.stop="toggleMineRule">使用规则</text>
						<image
							class="rule_toggle_img"
							:data-cid="item.id"
							@tap.stop="toggleMineRule"
							v-if="!ruleOpenMine[item.id]"
							src="../static/bicon12.png"
							mode=""
						></image>
						<image
							class="rule_toggle_img"
							:data-cid="item.id"
							@tap.stop="toggleMineRule"
							v-else
							src="../static/bicon11.png"
							mode=""
						></image>
						<view class="rule_pop" v-if="ruleOpenMine[item.id]">
							<view class="rule_line">适用商品：{{ item.fit_goods }}</view>
							<view class="rule_line" v-if="item.remarks">说明：{{ item.remarks }}</view>
						</view>
					</view>
					<view class="card_bom_btn" @tap.stop="goUseShop">去使用</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tablist: [{ name: '可领取' }, { name: '我的优惠券' }],
			tabIndex: 0,
			claimList: [],
			mineList: [],
			ruleOpenClaim: {},
			ruleOpenMine: {},
			tabActiveStyle: { color: '#036045', fontWeight: 600 },
			tabInactiveStyle: { color: '#64748b' }
		}
	},
	onShow() {
		this.reload()
	},
	onPullDownRefresh() {
		this.reload().finally(() => uni.stopPullDownRefresh())
	},
	methods: {
		tabclick(e) {
			if (e.index === 1 && !this.vuex_token) {
				uni.showToast({ title: '请先登录', icon: 'none' })
				this.routerGo('/pages/login/login')
				return
			}
			this.tabIndex = e.index
			if (e.index === 0) this.loadClaim()
			else this.loadMine()
		},
		async reload() {
			if (this.tabIndex === 0) await this.loadClaim()
			else await this.loadMine()
		},
		async loadClaim() {
			const res = await this.couponList({})
			if (res.code === 1 && res.data) {
				this.claimList = res.data.map((item) => ({ ...item, is_show: false }))
			} else {
				this.claimList = []
			}
		},
		async loadMine() {
			if (!this.vuex_token) return
			const res = await this.myCouponList({})
			if (res.code === 1 && res.data) {
				this.mineList = res.data
			} else {
				this.mineList = []
			}
		},
		couponIdFromEvent(e) {
			const v = e.currentTarget && e.currentTarget.dataset ? e.currentTarget.dataset.cid : undefined
			if (v === undefined || v === null || v === '') {
				return null
			}
			const n = Number(v)
			return Number.isNaN(n) ? v : n
		},
		toggleClaimRule(e) {
			const id = this.couponIdFromEvent(e)
			if (id === null) return
			const cur = !!this.ruleOpenClaim[id]
			this.$set(this.ruleOpenClaim, id, !cur)
		},
		toggleMineRule(e) {
			const id = this.couponIdFromEvent(e)
			if (id === null) return
			const cur = !!this.ruleOpenMine[id]
			this.$set(this.ruleOpenMine, id, !cur)
		},
		goUseShop() {
			this.routerTo('/pages/shop/shop', 'reLaunch')
		},
		async drawCoupon(e) {
			const id = this.couponIdFromEvent(e)
			if (id === null) return
			if (!this.vuex_token) {
				this.routerGo('/pages/login/login')
				return
			}
			const res = await this.draw({ id })
			if (res.code === 1) {
				uni.showToast({ title: res.msg || '领取成功', icon: 'none' })
				this.loadClaim()
				this.loadMine()
			} else if (res && res.msg) {
				uni.showToast({ title: res.msg, icon: 'none' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #f4f5f7;
}
.tabs {
	background: #fff;
	padding-bottom: 8rpx;
}
.box {
	padding: 24rpx 30rpx 40rpx;
}
.card {
	margin-top: 24rpx;
	background: #fff;
	border-radius: 18rpx;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	position: relative;
}
.card_top {
	padding: 10rpx 10rpx 24rpx;
	box-sizing: border-box;
	border-bottom: 1rpx solid #f6f6f6;
}
.flex-1 {
	flex: 1;
}
.card_bom {
	padding: 24rpx 0 0;
	box-sizing: border-box;
}
.card_bom_btn {
	color: #fff;
	text-align: center;
	line-height: 58rpx;
	width: 151rpx;
	height: 58rpx;
	background: #036045;
	border-radius: 29rpx;
	font-size: 26rpx;
}
.card_bom_left {
	padding-top: 10rpx;
	font-size: 22rpx;
	color: #343434;
	position: relative;
	.rule_toggle,
	.rule_toggle_img {
		display: inline-block;
		vertical-align: middle;
	}
	image {
		width: 33rpx;
		height: 33rpx;
		margin-left: 10rpx;
	}
}
.rule_pop {
	position: absolute;
	bottom: -120rpx;
	left: 0;
	z-index: 9;
	min-width: 420rpx;
	max-width: 560rpx;
	background: #fff;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.13);
	border-radius: 8rpx;
	padding: 10rpx 24rpx 18rpx;
}
.rule_line {
	font-size: 22rpx;
	color: #101010;
	margin: 14rpx 0;
	line-height: 1.45;
}
.d-flex {
	display: flex;
}
.a-center {
	align-items: center;
}
.flexc {
	display: flex;
	align-items: center;
}
.flexs {
	justify-content: space-between;
}
.mr-36 {
	margin-right: 36rpx;
}
.text-center {
	text-align: center;
}
.mt-6 {
	margin-top: 6rpx;
}
.mb-14 {
	margin-bottom: 14rpx;
}
.f-600 {
	font-weight: 600;
}
.f-700 {
	font-weight: 700;
}
.f-size-22 {
	font-size: 22rpx;
}
.f-size-24 {
	font-size: 24rpx;
}
.f-size-44 {
	font-size: 44rpx;
}
.color-9 {
	color: #999;
}
.color-ff3767 {
	color: #ff3767;
}
</style>
