<template>
	<view class="env-popup" v-if="rendered" @touchmove.stop.prevent="noop">
		<view class="env-mask" :class="{ show: entered }" @click="close" />

		<view class="env-stage" :class="{ show: entered, pop: popped }">
			<view class="env-glow" />

			<view class="env-rise" :class="{ up: lidOpen }">
				<image class="env-photo" :src="image" mode="widthFix" :show-menu-by-longpress="true" />

				<!-- 信封盖：合拢时盖住卡片，点击 test 后绕上沿缓缓掀开 -->
				<view class="env-lid" :class="{ open: lidOpen }">
					<view class="env-lid-face">
						<view class="env-lid-chevron env-lid-chevron--l" />
						<view class="env-lid-chevron env-lid-chevron--r" />
					</view>
					<view class="env-lid-shadow" />
				</view>
			</view>

			<!-- 打开瞬间的扫光 -->
			<view class="env-shine" :class="{ run: shine }" />

			<view class="env-close" :class="{ show: btnShow }" @click="close">×</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'WarrantyEnvelopePopup',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			image: {
				type: String,
				default: '/static/warranty_envelope.png'
			}
		},
		data() {
			return {
				rendered: false, // 是否挂载节点
				entered: false, // 遮罩 + 信封入场
				lidOpen: false, // 信封盖掀开
				popped: false, // 打开后的轻微弹动
				shine: false, // 扫光
				btnShow: false, // 关闭按钮
				timers: []
			}
		},
		watch: {
			show(val) {
				if (val) {
					this.play()
				} else {
					this.reset(true)
				}
			}
		},
		beforeDestroy() {
			this.clearTimers()
		},
		methods: {
			noop() {},
			clearTimers() {
				this.timers.forEach((t) => clearTimeout(t))
				this.timers = []
			},
			after(ms, fn) {
				this.timers.push(setTimeout(fn, ms))
			},
			play() {
				this.clearTimers()
				this.rendered = true
				this.entered = false
				this.lidOpen = false
				this.popped = false
				this.shine = false
				this.btnShow = false
				// 先挂载，再触发过渡
				this.after(40, () => {
					this.entered = true
				})
				// 信封落定后掀盖
				this.after(560, () => {
					this.lidOpen = true
					this.vibrate()
				})
				// 盖子抬起过程中略微上浮 + 打开后弹动
				this.after(1120, () => {
					this.popped = true
				})
				// 卡片完全露出后扫光
				this.after(1420, () => {
					this.shine = true
				})
				this.after(1600, () => {
					this.btnShow = true
				})
			},
			vibrate() {
				try {
					uni.vibrateShort({ fail: () => {} })
				} catch (e) {}
			},
			reset(unmount) {
				this.clearTimers()
				this.entered = false
				this.lidOpen = false
				this.popped = false
				this.shine = false
				this.btnShow = false
				if (unmount) {
					this.after(260, () => {
						this.rendered = false
					})
				}
			},
			close() {
				this.$emit('update:show', false)
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.env-popup {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 10100;
	}

	.env-mask {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(4, 18, 12, 0.66);
		opacity: 0;
		transition: opacity 300ms ease;
	}

	.env-mask.show {
		opacity: 1;
	}

	.env-stage {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 620rpx;
		margin-left: -310rpx;
		transform: translateY(-50%) scale(0.74);
		opacity: 0;
		transition: transform 620ms cubic-bezier(0.22, 1.24, 0.36, 1), opacity 380ms ease;
	}

	.env-stage.show {
		transform: translateY(-50%) scale(1);
		opacity: 1;
	}

	/* 卡片露出后的轻微弹动 */
	.env-stage.pop {
		animation: env-pop 560ms cubic-bezier(0.34, 1.5, 0.5, 1) forwards;
	}

	@keyframes env-pop {
		0% {
			transform: translateY(-50%) scale(1);
		}
		45% {
			transform: translateY(-52%) scale(1.022);
		}
		100% {
			transform: translateY(-50%) scale(1);
		}
	}

	.env-glow {
		position: absolute;
		left: 50%;
		top: 46%;
		width: 700rpx;
		height: 700rpx;
		margin: -350rpx 0 0 -350rpx;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(214, 178, 112, 0.28) 0%, rgba(28, 142, 100, 0.18) 42%, rgba(0, 0, 0, 0) 70%);
		opacity: 0;
		transition: opacity 900ms ease;
	}

	.env-stage.show .env-glow {
		opacity: 1;
	}

	.env-rise {
		position: relative;
		transform: translateY(0);
		transition: transform 1000ms cubic-bezier(0.25, 0.9, 0.3, 1);
	}

	/* 掀盖的同时整体缓缓上浮，像卡片从信封里升起 */
	.env-rise.up {
		transform: translateY(-7px);
	}

	.env-photo {
		display: block;
		width: 100%;
	}

	/* ============ 信封盖 ============ */
	.env-lid {
		position: absolute;
		left: 14.2%;
		top: 12.6%;
		width: 72.2%;
		height: 50.4%;
		border-radius: 16rpx 16rpx 10rpx 10rpx;
		background: linear-gradient(178deg, #0e7c57 0%, #096446 44%, #04503a 74%, #023527 100%);
		box-shadow: inset 0 -3rpx 0 rgba(216, 180, 112, 0.5),
			inset 0 -30rpx 46rpx -22rpx rgba(0, 0, 0, 0.45),
			0 16rpx 34rpx rgba(0, 0, 0, 0.3);
		overflow: hidden;
		transform-origin: 50% 0;
		transform: perspective(700px) rotateX(0deg);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		will-change: transform, opacity;
	}

	.env-lid.open {
		animation: env-lid-open 1080ms cubic-bezier(0.38, 0.05, 0.26, 1) forwards;
	}

	@keyframes env-lid-open {
		0% {
			transform: perspective(700px) rotateX(0deg);
			opacity: 1;
		}
		46% {
			opacity: 1;
		}
		100% {
			transform: perspective(700px) rotateX(96deg) translateY(-3px);
			opacity: 0;
		}
	}

	.env-lid-face {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 24%),
			radial-gradient(120% 78% at 16% 4%, rgba(150, 238, 180, 0.5), rgba(150, 238, 180, 0) 62%);
	}

	.env-lid-chevron {
		position: absolute;
		top: 58%;
		width: 33%;
		height: 2rpx;
	}

	.env-lid-chevron--l {
		left: 9%;
		transform-origin: right center;
		transform: rotate(-10deg);
		background: linear-gradient(90deg, rgba(216, 180, 112, 0), rgba(216, 180, 112, 0.85));
	}

	.env-lid-chevron--r {
		right: 9%;
		transform-origin: left center;
		transform: rotate(10deg);
		background: linear-gradient(270deg, rgba(216, 180, 112, 0), rgba(216, 180, 112, 0.85));
	}

	/* 掀盖时卡片上的投影 */
	.env-lid-shadow {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2rpx;
		height: 60rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.28) 100%);
		opacity: 0.5;
	}

	/* ============ 扫光 ============ */
	.env-shine {
		position: absolute;
		left: -30%;
		top: 4%;
		width: 26%;
		height: 62%;
		background: linear-gradient(100deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 45%, rgba(255, 255, 255, 0) 100%);
		transform: rotate(14deg) translateX(0);
		opacity: 0;
		pointer-events: none;
	}

	.env-shine.run {
		animation: env-shine 1000ms cubic-bezier(0.4, 0, 0.3, 1) forwards;
	}

	@keyframes env-shine {
		0% {
			opacity: 0;
			transform: rotate(14deg) translateX(0);
		}
		22% {
			opacity: 0.9;
		}
		100% {
			opacity: 0;
			transform: rotate(14deg) translateX(380px);
		}
	}

	.env-close {
		position: absolute;
		right: 6rpx;
		top: 0;
		width: 64rpx;
		height: 64rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 40rpx;
		color: rgba(255, 255, 255, 0.85);
		background: rgba(255, 255, 255, 0.16);
		border: 2rpx solid rgba(255, 255, 255, 0.34);
		border-radius: 50%;
		box-sizing: border-box;
		opacity: 0;
		transition: opacity 320ms ease;
	}

	.env-close.show {
		opacity: 1;
	}
</style>
