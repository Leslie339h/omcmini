<template>
	<view>
		<view class="box">
			<view class="box_item line d-flex a-center j-sb">
				<span>名称</span>
				<view class=" d-flex a-center j-sb">
					<input type="text" placeholder="请输入" v-model="name" />
					<u-icon name="arrow-right" size="12" color="#fff"></u-icon>
				</view>
			</view>
			<view class="box_item line d-flex a-center j-sb">
				<span>价格</span>
				<view class=" d-flex a-center j-sb">
					<input type="digit" placeholder="请输入" v-model="price" />
					<u-icon name="arrow-right" size="12" color="#fff"></u-icon>
				</view>
			</view>
			<view class="box_item line d-flex a-center j-sb">
				<span>次数</span>
				<view class=" d-flex a-center j-sb">
					<input type="digit" placeholder="请输入" v-model="number" />
					<u-icon name="arrow-right" size="12" color="#fff"></u-icon>
				</view>
			</view>

		</view>

		<view class="btn" @click="execwash_carApi">
			确认
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				price: '',
				number: '',
				name: ''
			};
		},
		onLoad(e) {
			if (e.item) {
				let obj = JSON.parse(e.item)
				this.id = obj.id
				this.price = obj.price
				this.number = obj.number
				this.name = obj.name
			}
		},
		methods: {
			async execwash_carApi() {
				let res = await this.execwash_car({
					id: this.id,
					price: this.price,
					number: this.number,
					name: this.name
				})
				if (res.code == 1) {
					this.showToast(res.msg)
					setTimeout(() => {
						this.routerBack()
					}, 1200)
				}
			}
		}


	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	::v-deep .u-textarea {
		padding: 0 0 20rpx 0 !important;
	}

	.line {
		border-bottom: 1rpx solid #eee;
	}

	.btn {
		width: 667rpx;
		height: 85rpx;
		background: #036045;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin: 40rpx auto;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 85rpx;
		text-align: center;
	}

	.title {
		padding: 24rpx 38rpx;
		box-sizing: border-box;
		font-weight: 400;
		font-size: 24rpx;
		color: #91949E;
		line-height: 34rpx;
	}

	.box {
		width: 100%;
		background: #FFFFFF;
		padding: 0 38rpx 38rpx;
		box-sizing: border-box;

		.box_item {
			font-weight: 400;
			font-size: 32rpx;
			color: #3D3D3D;
			padding: 24rpx 0;
			box-sizing: border-box;

			input {
				width: 500rpx;
				font-size: 28rpx;
			}
		}
	}

	.guige_box {
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;

		.plus-circle {
			position: absolute;
			top: 34rpx;
			left: 34rpx;
		}

		.gg_box {
			white-space: nowrap;
			overflow-x: scroll;

			.gg_item {
				display: inline-block;
				padding: 20rpx 30rpx;
				background: rgba(153, 153, 153, 0.1);
				border-radius: 18rpx 18rpx 18rpx 18rpx;
				border: 2rpx solid #999999;
				margin-right: 20rpx;
			}
		}

		.guiGe_item_box {
			margin: 10rpx 0 30rpx;
			height: 600rpx;
			width: 700rpx;

			.guiGe_item_box_item {
				padding: 20rpx;
				width: 200rpx;
				height: 80rpx;
				margin-right: 30rpx;
				// display: inline-block;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				box-sizing: border-box;
				overflow: hidden;
			}

			.ipt_box {
				width: 200rpx;
				height: 78rpx;
				margin-right: 30rpx;
				display: inline-block;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 10rpx 0 0;
				box-sizing: border-box;
			}
		}

		.btns {
			width: 667rpx;
			height: 85rpx;
			background: #036045;
			border-radius: 16rpx 16rpx 16rpx 16rpx;

			font-weight: 400;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 85rpx;
			text-align: center;
		}
	}

	.tabbal_box {
		input {
			text-align: center;
		}
	}

	.active {
		background: #F4FCFF !important;
		border: 1rpx solid #036045 !important;
		color: #036045 !important;
	}

	.tag_item {
		margin-top: 50rpx;
		width: 200rpx;
		font-size: 28rpx;
		font-weight: 700;
		margin-right: 30rpx;
		text-align: center;

	}

	.pop_box {
		width: 750rpx;
		height: 544rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.ipt_btn {
			width: 690rpx;
			height: 102rpx;
			background: #036045;
			border-radius: 1246rpx 1246rpx 1246rpx 1246rpx;
			text-align: center;
			line-height: 102rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}

	.ipt_box {

		background: #F8F9FC;
		margin: 60rpx 0 100rpx;
	}
</style>