<template>
	<u-popup
		:show="show"
		mode="center"
		:round="16"
		:closeOnClickOverlay="false"
		:safeAreaInsetBottom="true"
	>
		<view class="policy-box">
			<view class="policy-title">{{ policyData.title }}</view>
			<scroll-view
				id="policy-scroll"
				class="policy-scroll"
				scroll-y
				:show-scrollbar="true"
				@scroll="onScroll"
				@scrolltolower="onReachBottom"
			>
				<view id="policy-inner" class="policy-inner">
					<block v-for="(item, idx) in policyData.paragraphs" :key="idx">
						<text v-if="item.type === 'h2'" class="policy-h2">{{ item.text }}</text>
						<text v-else-if="item.type === 'h3'" class="policy-h3">{{ item.text }}</text>
						<text v-else class="policy-p">{{ item.text }}</text>
					</block>
				</view>
			</scroll-view>
			<view class="policy-hint" v-if="!canConfirm">
				请滑动阅读至底部后点击「已知晓」
			</view>
			<view
				class="policy-btn"
				:class="{ disabled: !canConfirm }"
				@click="onConfirm"
			>已知晓</view>
		</view>
	</u-popup>
</template>

<script>
	import policyData from '@/common/policy/warrantyPolicyContent.js'

	export default {
		name: 'WarrantyPolicyPopup',
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				policyData,
				scrolledBottom: false
			}
		},
		computed: {
			canConfirm() {
				return this.scrolledBottom
			}
		},
		watch: {
			show(val) {
				if (val) {
					this.scrolledBottom = false
					this.$nextTick(() => {
						setTimeout(() => this.measureScroll(), 400)
					})
				}
			}
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
				try {
					const res = await this.agreeWarrantyPolicy({})
					if (res.code === 1) {
						this.$emit('confirmed')
						this.$emit('update:show', false)
					}
				} catch (e) {
					uni.showToast({ title: '提交失败，请重试', icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.policy-box {
		width: 640rpx;
		max-width: 92vw;
		background: #fff;
		border-radius: 24rpx;
		padding: 36rpx 28rpx 28rpx;
		box-sizing: border-box;
	}

	.policy-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #222;
		text-align: center;
		margin-bottom: 24rpx;
	}

	.policy-scroll {
		height: 56vh;
		max-height: 720rpx;
		background: #f8f9fa;
		border-radius: 12rpx;
	}

	.policy-inner {
		padding: 24rpx 20rpx 32rpx;
	}

	.policy-h2 {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #036045;
		margin: 28rpx 0 12rpx;
		line-height: 1.5;
	}

	.policy-h2:first-child {
		margin-top: 0;
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

	.policy-hint {
		margin-top: 16rpx;
		font-size: 22rpx;
		color: #e54d42;
		text-align: center;
	}

	.policy-btn {
		margin-top: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #036045;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
		border-radius: 40rpx;
	}

	.policy-btn.disabled {
		background: #c8d6d0;
	}
</style>
