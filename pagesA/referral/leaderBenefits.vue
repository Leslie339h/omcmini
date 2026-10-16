<template>
	<view class="page">
		<view v-if="loading" class="state-tip">加载中…</view>
		<view v-else-if="!imageUrl" class="state-tip">暂无团长权益内容，请联系管理员配置</view>
		<scroll-view v-else scroll-y class="scroll">
			<image class="benefit-img" :src="imageUrl" mode="widthFix" show-menu-by-longpress />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				imageUrl: ''
			}
		},
		onLoad() {
			this.loadImage()
		},
		onPullDownRefresh() {
			this.loadImage().finally(() => uni.stopPullDownRefresh())
		},
		methods: {
			async loadImage() {
				this.loading = true
				try {
					const res = await this.referralLeaderBenefits({})
					if (res.code === 1 && res.data && res.data.image) {
						this.imageUrl = res.data.image
					} else {
						this.imageUrl = ''
					}
				} catch (e) {
					this.imageUrl = ''
				} finally {
					this.loading = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #f5f6fa;
}
.scroll {
	height: 100vh;
}
.benefit-img {
	display: block;
	width: 100%;
}
.state-tip {
	padding: 120rpx 40rpx;
	text-align: center;
	font-size: 28rpx;
	color: #888;
}
</style>
