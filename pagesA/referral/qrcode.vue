<template>
	<view class="page">
		<view v-if="blocked" class="blocked-tip">{{ blockedMsg }}</view>
		<view v-else class="page-inner">
			<view class="poster-wrap">
				<image
					v-if="posterPath"
					class="poster-preview"
					:src="posterPath"
					mode="widthFix"
					show-menu-by-longpress
				/>
				<view v-else class="poster">
					<image class="poster-bg" :src="bgUrl" mode="aspectFill" />
					<view class="qr-wrap" v-if="qrUrl">
						<image class="qr-img" :src="qrUrl" mode="aspectFit" />
					</view>
					<view v-if="posterLoading" class="poster-loading">
						<text>海报生成中…</text>
					</view>
				</view>
			</view>
			<view class="action-bar safe-bottom" v-if="posterPath">
				<button class="action-btn" @tap="savePoster">保存图片</button>
				<button class="action-btn primary" open-type="share">发送给朋友</button>
			</view>
			<view class="action-tip" v-else-if="qrUrl && !posterLoading">海报准备中，请稍候</view>
		</view>
		<canvas
			canvas-id="referralPosterCanvas"
			id="referralPosterCanvas"
			class="poster-canvas"
			:style="{ width: canvasW + 'px', height: canvasH + 'px' }"
		></canvas>
	</view>
</template>

<script>
	import config from '@/config.js'

	export default {
		data() {
			return {
				blocked: false,
				blockedMsg: '',
				bgPath: '/uploads/20260601/bd1f8e84f268625371c973252fd6f77f.jpg',
				qrUrl: '',
				posterPath: '',
				posterLoading: false,
				canvasW: 750,
				canvasH: 1334,
				sharePage: 'pages/shop/shop'
			}
		},
		computed: {
			bgUrl() {
				return this.previewUrl(this.bgPath)
			}
		},
		onShow() {
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			// #endif
			this.loadQr()
		},
		onShareAppMessage() {
			const user = uni.getStorageSync('user') || {}
			let path = '/' + this.sharePage
			if (user.id) {
				path += '?pid=' + user.id
			}
			const com = uni.getStorageSync('common') || {}
			return {
				title: com.share_title || '邀请您加入驰友家',
				path,
				imageUrl: this.posterPath || com.share_img || ''
			}
		},
		onShareTimeline() {
			const user = uni.getStorageSync('user') || {}
			let query = ''
			if (user.id) {
				query = 'pid=' + user.id
			}
			const com = uni.getStorageSync('common') || {}
			return {
				title: com.share_title || '邀请您加入驰友家',
				query,
				imageUrl: this.posterPath || com.share_img || ''
			}
		},
		methods: {
			previewUrl(path) {
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				const base = config.serverIp.replace(/\/?$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return base + p
			},
			loadImageInfo(url) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: url,
						success: resolve,
						fail: reject
					})
				})
			},
			async buildPoster() {
				if (!this.bgUrl || !this.qrUrl || this.posterLoading) return
				this.posterLoading = true
				this.posterPath = ''
				try {
					const [bgInfo, qrInfo] = await Promise.all([
						this.loadImageInfo(this.bgUrl),
						this.loadImageInfo(this.qrUrl)
					])
					const sys = uni.getSystemInfoSync()
					const W = this.canvasW
					const H = Math.round((W * sys.windowHeight) / sys.windowWidth)
					this.canvasH = H
					await this.$nextTick()
					const ctx = uni.createCanvasContext('referralPosterCanvas', this)
					const bgScale = Math.max(W / bgInfo.width, H / bgInfo.height)
					const bgDw = bgInfo.width * bgScale
					const bgDh = bgInfo.height * bgScale
					ctx.drawImage(
						bgInfo.path,
						(W - bgDw) / 2,
						(H - bgDh) / 2,
						bgDw,
						bgDh
					)
					const qrSize = 260
					const marginR = 24
					const safeBottom = (sys.safeAreaInsets && sys.safeAreaInsets.bottom) || 0
					const marginB = 120 + (safeBottom * 750) / sys.windowWidth
					const qrX = W - marginR - qrSize
					const qrY = H - marginB - qrSize
					const cx = qrX + qrSize / 2
					const cy = qrY + qrSize / 2
					ctx.save()
					ctx.beginPath()
					ctx.arc(cx, cy, qrSize / 2, 0, 2 * Math.PI)
					ctx.clip()
					const qrScale = Math.min(qrSize / qrInfo.width, qrSize / qrInfo.height)
					const qdw = qrInfo.width * qrScale
					const qdh = qrInfo.height * qrScale
					ctx.drawImage(
						qrInfo.path,
						qrX + (qrSize - qdw) / 2,
						qrY + (qrSize - qdh) / 2,
						qdw,
						qdh
					)
					ctx.restore()
					ctx.draw(false, () => {
						setTimeout(() => {
							uni.canvasToTempFilePath(
								{
									canvasId: 'referralPosterCanvas',
									width: W,
									height: H,
									destWidth: W,
									destHeight: H,
									fileType: 'jpg',
									quality: 0.92,
									success: (res) => {
										this.posterPath = res.tempFilePath
										this.posterLoading = false
									},
									fail: () => {
										this.posterLoading = false
										uni.showToast({ title: '海报生成失败', icon: 'none' })
									}
								},
								this
							)
						}, 320)
					})
				} catch (e) {
					this.posterLoading = false
					uni.showToast({ title: '海报资源加载失败', icon: 'none' })
				}
			},
			savePoster() {
				if (!this.posterPath) {
					uni.showToast({ title: '海报未就绪', icon: 'none' })
					return
				}
				uni.saveImageToPhotosAlbum({
					filePath: this.posterPath,
					success: () => {
						uni.showToast({ title: '已保存到相册', icon: 'success' })
					},
					fail: (err) => {
						if (err.errMsg && err.errMsg.indexOf('auth deny') !== -1) {
							uni.showModal({
								title: '提示',
								content: '需要您授权保存到相册',
								success: (m) => {
									if (m.confirm) {
										uni.openSetting({})
									}
								}
							})
							return
						}
						uni.showToast({ title: '保存失败', icon: 'none' })
					}
				})
			},
			async loadQr() {
				this.blocked = false
				this.qrUrl = ''
				this.posterPath = ''
				const st = await this.referralStatus({})
				if (st.code !== 1) return
				if (!st.data.switch_on) {
					this.blocked = true
					this.blockedMsg = '暂未开放分销功能'
					return
				}
				const res = await this.referralInviteQr({
					page: this.sharePage
				})
				if (res.code === 1 && res.data) {
					this.qrUrl = res.data.url || ''
					if (this.qrUrl) {
						this.$nextTick(() => this.buildPoster())
					}
				} else if (res && res.msg) {
					uni.showToast({ title: res.msg, icon: 'none', duration: 3000 })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #000;
	}

	.blocked-tip {
		text-align: center;
		color: #888;
		font-size: 28rpx;
		padding: 120rpx 40rpx;
	}

	.page-inner {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.poster-wrap {
		flex: 1;
		width: 100%;
	}

	.poster-preview {
		display: block;
		width: 100%;
	}

	.poster {
		position: relative;
		width: 100%;
		min-height: calc(100vh - 160rpx);
	}

	.poster-bg {
		display: block;
		width: 100%;
		height: calc(100vh - 160rpx);
	}

	.qr-wrap {
		position: absolute;
		right: 24rpx;
		bottom: 24rpx;
		width: 260rpx;
		height: 260rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.qr-img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.poster-loading {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		color: rgba(255, 255, 255, 0.85);
		font-size: 28rpx;
	}

	.poster-canvas {
		position: fixed;
		left: -9999px;
		top: 0;
		pointer-events: none;
	}

	.action-bar {
		display: flex;
		gap: 24rpx;
		padding: 24rpx 32rpx;
		background: rgba(0, 0, 0, 0.92);
	}

	.safe-bottom {
		padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	}

	.action-btn {
		flex: 1;
		height: 88rpx;
		line-height: 88rpx;
		margin: 0;
		padding: 0;
		font-size: 30rpx;
		color: #fff;
		background: #333;
		border-radius: 44rpx;
		border: none;

		&::after {
			border: none;
		}

		&.primary {
			background: #036045;
		}
	}

	.action-tip {
		text-align: center;
		color: #888;
		font-size: 26rpx;
		padding: 24rpx;
	}
</style>
