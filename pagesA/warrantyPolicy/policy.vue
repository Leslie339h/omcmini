<template>
	<view class="page">
		<scroll-view
			id="policy-scroll"
			class="policy-scroll"
			scroll-y
			:show-scrollbar="true"
			@scroll="onScroll"
			@scrolltolower="onReachBottom"
		>
			<view id="policy-inner" class="policy-inner">
				<text class="doc-title">{{ policyData.title }}</text>
				<block v-for="(item, idx) in policyData.paragraphs" :key="idx">
					<text v-if="item.type === 'h2'" class="policy-h2">{{ item.text }}</text>
					<text v-else-if="item.type === 'h3'" class="policy-h3">{{ item.text }}</text>
					<text v-else class="policy-p">{{ item.text }}</text>
				</block>
			</view>
		</scroll-view>
		<view class="footer" v-if="needConfirm">
			<view class="policy-hint" v-if="!canConfirm">请滑动阅读至底部后点击「已知晓」</view>
			<view class="policy-btn" :class="{ disabled: !canConfirm }" @click="onConfirm">已知晓</view>
		</view>
	</view>
</template>

<script>
	import policyData from '@/common/policy/warrantyPolicyContent.js'

	export default {
		data() {
			return {
				policyData,
				scrolledBottom: false,
				needConfirm: false
			}
		},
		computed: {
			canConfirm() {
				return this.scrolledBottom
			}
		},
		onLoad(options) {
			this.needConfirm = options.confirm === '1'
		},
		onReady() {
			setTimeout(() => this.measureScroll(), 400)
		},
		methods: {
			measureScroll() {
				const q = uni.createSelectorQuery().in(this)
				q.select('#policy-scroll').boundingClientRect()
				q.select('#policy-inner').boundingClientRect()
				q.exec((res) => {
					if (!res || !res[0] || !res[1]) return
					if (res[1].height <= res[0].height + 8) {
						this.scrolledBottom = true
					}
				})
			},
			onScroll(e) {
				const { scrollTop, scrollHeight } = e.detail || {}
				const q = uni.createSelectorQuery().in(this)
				q.select('#policy-scroll').boundingClientRect()
				q.exec((res) => {
					if (!res || !res[0]) return
					const viewH = res[0].height
					if (scrollHeight - scrollTop - viewH <= 24) {
						this.scrolledBottom = true
					}
				})
			},
			onReachBottom() {
				this.scrolledBottom = true
			},
			async onConfirm() {
				if (!this.canConfirm) {
					uni.showToast({ title: '请先滑动阅读至底部', icon: 'none' })
					return
				}
				const res = await this.agreeWarrantyPolicy({})
				if (res.code === 1) {
					uni.showToast({ title: '已确认', icon: 'success' })
					setTimeout(() => {
						const pages = getCurrentPages()
						if (pages.length > 1) {
							uni.navigateBack()
						} else {
							uni.switchTab({ url: '/pages/home/home' })
						}
					}, 500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #f5f6f7;
	}

	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.policy-scroll {
		flex: 1;
		height: 0;
	}

	.policy-inner {
		padding: 28rpx 32rpx 48rpx;
	}

	.doc-title {
		display: block;
		font-size: 36rpx;
		font-weight: 800;
		color: #036045;
		text-align: center;
		margin-bottom: 32rpx;
	}

	.policy-h2 {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #036045;
		margin: 28rpx 0 12rpx;
		line-height: 1.5;
	}

	.policy-h3 {
		display: block;
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin: 20rpx 0 10rpx;
		line-height: 1.5;
	}

	.policy-p {
		display: block;
		font-size: 26rpx;
		color: #444;
		line-height: 1.7;
		margin-bottom: 12rpx;
		text-align: justify;
	}

	.footer {
		flex-shrink: 0;
		padding: 16rpx 32rpx calc(16rpx + env(safe-area-inset-bottom));
		background: #fff;
		border-top: 1rpx solid #eee;
		box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.04);
	}

	.policy-hint {
		font-size: 22rpx;
		color: #e54d42;
		text-align: center;
		margin-bottom: 12rpx;
	}

	.policy-btn {
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #036045;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
		border-radius: 44rpx;
	}

	.policy-btn.disabled {
		background: #c8d6d0;
	}
</style>
