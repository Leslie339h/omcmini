<template>
	<view class="">
		<!-- colors: 设置主题色 stepData:步骤数据 -->
		<cc-defineStep :colors="colors" :stepData="stepData"></cc-defineStep>
		<empty v-if="stepData.length==0"></empty>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				int: {},
				colors: "#fa436a",
				//模拟后台返回的数据
				stepData: []
			}
		},
		onLoad(e) {
			// 步骤数组数据反序
			this.stepData.reverse()
			this.orderDetailApi(e.id)
		},
		methods: {
			async orderDetailApi(id) {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.orderDetail({
					order_id: id
				})
				if (res.code == 1) {
					this.int = res.data
					this.int.express_data.forEach(item => {
						this.stepData.push({
							name: item.ftime,
							isNow: 0,
							desc: item.context
						})
					})
					// this.pageShow = true
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>