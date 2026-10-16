<template>
	<view>
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				content: ""
			};
		},
		onLoad(e) {
			this.name = e.name
			uni.setNavigationBarTitle({
				title: e.name
			})
			this.pactApi()
		},
		methods: {
			async pactApi() {
				let res = await this.pact({
					name: this.name
				})
				if (res.code == 1) {
					this.content = res.data.content
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}
</style>