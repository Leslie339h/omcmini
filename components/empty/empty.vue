<template>
	<view>
		<view :style="{'padding':mag}">
			<u-empty mode="data" :textSize='14' text='暂无数据'></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		name: "emptyPage",
		props: {
			mag: {
				type: String,
				default: '20% 0 10%'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>