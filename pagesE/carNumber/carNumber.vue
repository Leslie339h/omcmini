  <template>
  	<view class="page-carnumber-test">
  		<view class="color-3d f-size-32 f-bold pl-30 mt-30">
  			请输入车牌号
  		</view>
  		<view class="number-wrap">
  			<car-number :value='carNumber' ref='carnum' v-model="carNumber"></car-number>
  		</view>
  		<view class="btn" @click="execCarNumberApi">
  			确认绑定
  		</view>
  	</view>
  </template>

  <script>
  	import CarNumber from '@/components/codecook-carnumber/codecook-carnumber.vue';

  	export default {
  		components: {
  			CarNumber
  		},
  		data() {
  			return {
  				carNumber: '',
  				id: ''
  			}
  		},
  		watch: {
  			carNumber(num) {
  				console.log(num);
  			},
  		},
  		onLoad(e) {
  			if (e.id) {
  				this.id = e.id
  				this.$nextTick(() => {
  					setTimeout(() => {
  						this.$refs.carnum.setkey(e.num)
  					}, 500)
  				})
  			}
  		},
  		methods: {
  			async execCarNumberApi() {
  				let res = await this.execCarNumber({
  					car_number: this.carNumber,
  					id: this.id
  				})
  				if (res.code == 1) {
  					this.showToast('成功')
  					setTimeout(() => {
  						this.routerBack()
  					}, 1200)
  				}
  			}

  		},
  		beforeMount() {},
  	}
  </script>

  <style scoped lang="less">
  	.number-wrap {
  		box-sizing: border-box;
  		padding: 0 30rpx;
  	}

  	.btn {
  		width: 400rpx;
  		height: 80rpx;
  		text-align: center;
  		line-height: 80rpx;
  		color: #fff;
  		font-size: 24rpx;
  		background-color: #036045;
  		border-radius: 50rpx;
  		margin: 30rpx auto;
  	}
  </style>