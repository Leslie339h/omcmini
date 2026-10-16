<template>
	<view>
		<u-navbar :title="title" :autoBack="true" :bgColor="bgColor" :leftIconColor='leftIconColor' :placeholder='true'
			:titleStyle='titleStyle'>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: ['title', 'titleStyle', 'leftIconColor'],
		data() {
			return {
				bgColor: 'transparent'
			};
		}
	}
</script>

<style lang="scss">

</style>