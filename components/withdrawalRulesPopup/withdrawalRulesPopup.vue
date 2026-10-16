<template>
	<u-popup :show="show" mode="center" :round="16" :closeOnClickOverlay="true" @close="close">
		<view class="rules-box">
			<view class="rules-header">
				<view class="rules-title">{{ rules.title }}</view>
				<view class="rules-close" @click="close"><u-icon name="close" size="20"></u-icon></view>
			</view>
			<scroll-view class="rules-scroll" scroll-y>
				<view class="rules-content">
					<view class="rules-intro">{{ rules.intro }}</view>
					<view v-for="(section, index) in rules.sections" :key="index" class="rules-section">
						<view class="section-title">{{ section.title }}</view>
						<view v-for="(item, itemIndex) in section.items" :key="itemIndex" class="section-item">{{ item }}</view>
					</view>
				</view>
			</scroll-view>
			<view class="rules-btn" @click="close">我已知晓</view>
		</view>
	</u-popup>
</template>

<script>
	import rules from '@/common/policy/withdrawalRulesContent.js'
	export default {
		name: 'WithdrawalRulesPopup',
		props: { show: { type: Boolean, default: false } },
		data() { return { rules } },
		methods: {
			close() {
				this.$emit('update:show', false)
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rules-box { width: 650rpx; max-width: 92vw; background: #fff; border-radius: 24rpx; padding: 32rpx 26rpx 26rpx; box-sizing: border-box; }
	.rules-header { position: relative; padding: 0 48rpx 24rpx; }
	.rules-title { text-align: center; font-size: 32rpx; line-height: 44rpx; font-weight: 700; color: #222; }
	.rules-close { position: absolute; right: 0; top: 0; padding: 4rpx; }
	.rules-scroll { height: 62vh; max-height: 780rpx; background: #f7f9f8; border-radius: 14rpx; }
	.rules-content { padding: 24rpx 22rpx 36rpx; }
	.rules-intro, .section-item { font-size: 25rpx; line-height: 1.75; color: #444; text-align: justify; margin-bottom: 12rpx; }
	.rules-section { margin-top: 24rpx; }
	.section-title { font-size: 28rpx; line-height: 42rpx; font-weight: 700; color: #036045; margin-bottom: 10rpx; }
	.rules-btn { height: 80rpx; line-height: 80rpx; margin-top: 22rpx; text-align: center; color: #fff; background: #036045; border-radius: 40rpx; font-size: 29rpx; }
</style>
