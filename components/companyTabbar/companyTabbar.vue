<template>
	<view>
		<u-tabbar zIndex='20' :fixed="true" inactiveColor='#979797 ' activeColor="#036045" :value="value1"
			:placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home-fill" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="人员" icon="man-add-fill" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account-fill" @click="click1"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name: "companyTabbar",
		props: ['idx'],
		data() {
			return {
				value1: 0,
			};
		},
		mounted() {
			this.value1 = this.idx
		},
		methods: {
			click1(e) {
				this.value1 = e
				if (e == 0) {
					uni.reLaunch({
						url: '/pagesF/companyIndex/companyIndex'
					})
				} else if (e == 1) {
					uni.reLaunch({
						url: '/pagesF/companyRen/companyRen'
					})
				} else if (e == 2) {
					uni.reLaunch({
						url: '/pagesF/my/my'
					})
				}
				console.log('click1', e);
			}
		}
	}
</script>

<style lang="scss">

</style>