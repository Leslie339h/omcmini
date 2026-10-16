<template>
	<view class="page">
		<view class="title">识别出的轮胎</view>

		<view class="code-box" v-if="code">
			<text class="code-label">识别编号</text>
			<text class="code-value" user-select>{{ code }}</text>
		</view>

		<view class="card" v-if="info">
			<view class="row">
				<text class="label">子口码</text>
				<text class="value">{{ info.bead_code }}</text>
			</view>
			<view class="row">
				<text class="label">花纹编号</text>
				<text class="value">{{ info.pattern_no }}</text>
			</view>
			<view class="row">
				<text class="label">轮胎规格</text>
				<text class="value">{{ info.tire_spec }}</text>
			</view>
			<view class="row">
				<text class="label">负荷速级</text>
				<text class="value">{{ info.load_speed }}</text>
			</view>
			<view class="row last">
				<text class="label">年周号</text>
				<text class="value">{{ info.year_week }}</text>
			</view>
		</view>
		<view class="empty" v-else-if="loaded">未在数据库中匹配到该子口码</view>
		<view class="empty" v-else>查询中...</view>
		<view class="btn-wrap">
			<view class="btn" @click="rescan">再次扫描</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				loaded: false,
				code: ''
			}
		},
		onLoad(e) {
			this.code = (e && e.code) ? decodeURIComponent(e.code) : ''
			if (this.code) {
				this.fetchInfo()
			} else {
				this.loaded = true
			}
		},
		methods: {
			async fetchInfo() {
				try {
					const res = await this.tirebeadQuery({ bead_code: this.code })
					if (res.code === 1 && res.data) {
						this.info = res.data
					} else {
						this.info = null
						uni.showToast({ title: (res && res.msg) || '未匹配到该子口码', icon: 'none' })
					}
				} catch (err) {
					this.info = null
					uni.showToast({ title: '查询失败', icon: 'none' })
				} finally {
					this.loaded = true
				}
			},
			rescan() {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['barCode', 'qrCode'],
					success: (res) => {
						const code = String(res.result || '').trim()
						if (!code) {
							uni.showToast({ title: '未识别到编码', icon: 'none' })
							return
						}
						this.code = code
						this.loaded = false
						this.info = null
						this.fetchInfo()
					},
					fail: (err) => {
						const msg = (err && (err.errMsg || err.message)) || ''
						if (/cancel/i.test(msg)) {
							return
						}
						uni.showToast({
							title: msg ? ('扫码失败：' + msg) : '扫码失败，请用真机重试',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f6f7;
	}

	.page {
		min-height: 100vh;
		padding: 40rpx 32rpx 60rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 40rpx;
		font-weight: 700;
		color: #1c1c1c;
		margin-bottom: 28rpx;
	}

	.code-box {
		background: #e8f5f0;
		border-radius: 16rpx;
		padding: 24rpx 28rpx;
		margin-bottom: 24rpx;
	}

	.code-label {
		display: block;
		font-size: 24rpx;
		color: #036045;
		margin-bottom: 10rpx;
	}

	.code-value {
		display: block;
		font-size: 36rpx;
		font-weight: 700;
		color: #036045;
		word-break: break-all;
		letter-spacing: 1rpx;
	}

	.card {
		background: #fff;
		border-radius: 20rpx;
		padding: 8rpx 28rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
	}

	.row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 28rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.row.last {
		border-bottom: none;
	}

	.label {
		flex-shrink: 0;
		width: 180rpx;
		font-size: 28rpx;
		color: #888;
	}

	.value {
		flex: 1;
		text-align: right;
		font-size: 28rpx;
		color: #222;
		font-weight: 600;
		word-break: break-all;
	}

	.empty {
		text-align: center;
		color: #999;
		font-size: 28rpx;
		padding: 60rpx 0;
	}

	.btn-wrap {
		margin-top: 48rpx;
	}

	.btn {
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #036045;
		color: #fff;
		border-radius: 44rpx;
		font-size: 30rpx;
		font-weight: 600;
	}
</style>
