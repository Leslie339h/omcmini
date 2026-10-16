<template>
	<view></view>
</template>

<script>
	// 消息页已迁至主包 tabBar：/pages/message/index（分包页无法作为 tabBar）
	export default {
		onLoad() {
			uni.switchTab({
				url: '/pages/message/index'
			})
		}
	}
</script>
