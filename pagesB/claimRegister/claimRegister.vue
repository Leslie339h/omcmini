<template>
	<view class="page">
		<view class="tip">请如实填写理赔信息，带 <text class="star">*</text> 为必填。同一质保登记最多可理赔「注册时绑定的子口码」个数。</view>

		<view class="card">
			<view v-if="warrantyList.length > 0" class="row arrow" @click="warrantyShow = true">
				<text class="label">关联质保记录 <text class="star">*</text></text>
				<text class="ipt placeholder" v-if="!warranty_id">请选择</text>
				<text class="ipt" v-else>{{ warrantyDisplay }}</text>
			</view>
			<view v-else class="row col">
				<text class="label">关联质保</text>
				<text class="ipt sub">暂无质保记录，提交时系统将不关联质保单；建议先 <text class="link" @click.stop="goWarranty">质保登记</text></text>
			</view>
			<view v-if="selectedWarranty" class="claim-quota">
				已理赔 {{ selectedWarranty.claim_count || 0 }}/{{ selectedWarranty.bead_count || 0 }}，还可理赔 {{ selectedWarranty.claim_remain || 0 }} 次
			</view>
		</view>

		<view class="card mt-24">
			<view class="section-title">理赔收货信息</view>
			<view class="row">
				<text class="label">收货人 <text class="star">*</text></text>
				<input class="ipt" v-model="receiver_name" placeholder="请输入收货人" />
			</view>
			<view class="row">
				<text class="label">联系电话 <text class="star">*</text></text>
				<input class="ipt" type="number" maxlength="11" v-model="receiver_mobile" placeholder="11位手机号" />
			</view>
			<view class="row arrow row-last" @click="pickReceiveAddress">
				<text class="label">收货地址 <text class="star">*</text></text>
				<text class="ipt placeholder addr-ipt" v-if="!receive_address">点击选择地址（定位当前位置）</text>
				<text class="ipt addr-ipt" v-else>{{ receive_address }}</text>
			</view>
		</view>

		<!-- 扫描子口码（损伤类型之前） -->
		<view class="card mt-24">
			<view class="section-title">扫描子口码 <text class="star">*</text></view>
			<view class="scan-entry" @click="scanBead">
				<image class="scan-icon" src="/static/sssscan02.png" mode="aspectFit" />
				<text class="scan-text">扫描子口码</text>
				<text class="scan-sub">调用相机识别并自动带出轮胎信息</text>
			</view>
			<view class="bead-card" v-if="beadInfo.bead_code">
				<view class="bead-summary">{{ beadSummary }}</view>
				<view class="bead-row">
					<text class="bead-label">子口码</text>
					<text class="bead-value">{{ beadInfo.bead_code }}</text>
				</view>
				<view class="bead-row">
					<text class="bead-label">花纹编号</text>
					<text class="bead-value">{{ beadInfo.pattern_no }}</text>
				</view>
				<view class="bead-row">
					<text class="bead-label">轮胎规格</text>
					<text class="bead-value">{{ beadInfo.tire_spec }}</text>
				</view>
				<view class="bead-row last">
					<text class="bead-label">负荷速级</text>
					<text class="bead-value">{{ beadInfo.load_speed }}</text>
				</view>
			</view>
			<view class="bead-empty" v-else>请先扫描子口码</view>
		</view>

		<view class="card mt-24">
			<view class="row arrow row-last" @click="damageShow = true">
				<text class="label">损伤类型 <text class="star">*</text></text>
				<text class="ipt placeholder" v-if="!damage_type">请选择</text>
				<text class="ipt" v-else>{{ damage_type }}</text>
			</view>
		</view>

		<view class="card mt-24">
			<view class="section-title">理赔照片</view>

			<view class="img-block">
				<view class="img-label">损伤/鼓包局部图 <text class="star">*</text></view>
				<text class="field-hint">请在轮胎充气状态下拍摄，照片需清晰显示轮胎损伤</text>
				<view class="img-box" @click="pickImage('damage_image')">
					<image v-if="formImg.damage_image" class="thumb" :src="previewUrl(formImg.damage_image)" mode="aspectFill" />
					<text v-else class="img-ph">点击上传</text>
				</view>
			</view>

			<view class="img-block">
				<view class="img-label">轮胎整体图 <text class="star">*</text></view>
				<text class="field-hint">拍摄前需在胎侧用粉笔书写申请日期，照片需露出花纹及损伤部位</text>
				<view class="img-box" @click="pickImage('tire_full_image')">
					<image v-if="formImg.tire_full_image" class="thumb" :src="previewUrl(formImg.tire_full_image)" mode="aspectFill" />
					<text v-else class="img-ph">点击上传</text>
				</view>
			</view>

			<view class="img-block img-block-last">
				<view class="img-label">胎侧 DOT 图 <text class="star">*</text></view>
				<text class="field-hint">照片需清晰显示轮胎生产年周</text>
				<view class="sample-block">
					<text class="sample-label">DOT 拍摄示例（供参考）</text>
					<image
						class="sample-img"
						:src="previewUrl(dotExamplePath)"
						mode="widthFix"
						@click="previewSample(dotExamplePath)"
					/>
					<text class="sample-hint">点击图片可放大查看</text>
				</view>
				<view class="img-box" @click="pickImage('sidewall_dot_image')">
					<image v-if="formImg.sidewall_dot_image" class="thumb" :src="previewUrl(formImg.sidewall_dot_image)" mode="aspectFill" />
					<text v-else class="img-ph">点击上传</text>
				</view>
			</view>
		</view>

		<view class="btn-wrap">
			<view class="btn" :class="{ disabled: submitting }" @click="submit">{{ submitting ? '提交中…' : '提交理赔登记' }}</view>
		</view>

		<u-picker
			:show="warrantyShow"
			title="选择质保记录"
			:columns="warrantyPickerColumns"
			@cancel="warrantyShow = false"
			@confirm="onWarrantyConfirm"
		/>
		<u-picker
			:show="damageShow"
			title="损伤类型"
			:columns="damageColumns"
			@cancel="damageShow = false"
			@confirm="onDamageConfirm"
		/>
	</view>
</template>

<script>
	import config from '@/config.js'

	export default {
		data() {
			return {
				prefillWarrantyId: '',
				warrantyList: [],
				warranty_id: 0,
				warrantyDisplay: '',
				warrantyShow: false,
				receiver_name: '',
				receiver_mobile: '',
				receive_address: '',
				damage_type: '',
				damageShow: false,
				damageColumns: [[
					'胎侧鼓包',
					'胎面变形',
					'胎面扎钉漏气（限自修复胎）',
					'其他质量问题'
				]],
				beadInfo: {
					bead_code: '',
					pattern_no: '',
					tire_spec: '',
					load_speed: ''
				},
				formImg: {
					damage_image: '',
					tire_full_image: '',
					sidewall_dot_image: ''
				},
				submitting: false,
				dotExamplePath: '/uploads/20260531/f91b4574089f87fb77c6042f891062b4.png'
			}
		},
		computed: {
			warrantyPickerColumns() {
				const col = this.warrantyList.map((w) => {
					const t = `${w.tire_name || ''}`.trim()
					const remain = w.claim_remain != null ? w.claim_remain : 0
					const total = w.bead_count != null ? w.bead_count : 0
					return `质保#${w.id}${t ? ' ' + t : ''}（可理赔${remain}/${total}）`
				})
				return [col]
			},
			selectedWarranty() {
				if (!this.warranty_id) return null
				return this.warrantyList.find((w) => Number(w.id) === Number(this.warranty_id)) || null
			},
			beadSummary() {
				const b = this.beadInfo
				if (!b.bead_code) return ''
				return [b.bead_code, b.pattern_no, b.tire_spec, b.load_speed].filter(Boolean).join('  ')
			}
		},
		onLoad(options) {
			if (options && options.warranty_id) {
				this.prefillWarrantyId = String(options.warranty_id)
			}
			this.loadClaimOptions()
			if (this.vuex_user && this.vuex_user.mobile) {
				this.receiver_mobile = String(this.vuex_user.mobile)
			}
			this.loadWarranties()
			this.initLocationForAddress()
		},
		methods: {
			initLocationForAddress() {
				uni.getLocation({
					type: 'gcj02',
					success: (loc) => {
						uni.setStorageSync('address', {
							latitude: loc.latitude,
							longitude: loc.longitude
						})
					},
					fail: () => {}
				})
			},
			pickReceiveAddress() {
				uni.chooseLocation({
					success: (res) => {
						const parts = [res.address, res.name].filter((s) => s && String(s).trim())
						this.receive_address = parts.join(' ')
					}
				})
			},
			goWarranty() {
				uni.navigateTo({ url: '/pagesB/warrantyRegister/warrantyRegister' })
			},
			async loadClaimOptions() {
				const res = await this.claimOptions({})
				if (res.code === 1 && res.data && res.data.damage_types && res.data.damage_types.length) {
					this.damageColumns = [res.data.damage_types]
				}
			},
			async loadWarranties() {
				const res = await this.warrantyMyList({})
				if (res.code === 1 && res.data && res.data.list) {
					this.warrantyList = res.data.list
					this.$nextTick(() => this.applyPrefillWarranty())
				}
			},
			applyPrefillWarranty() {
				if (!this.prefillWarrantyId || this.warrantyList.length === 0) return
				const id = Number(this.prefillWarrantyId)
				const idx = this.warrantyList.findIndex((w) => Number(w.id) === id)
				if (idx >= 0) {
					this.warranty_id = id
					const col = this.warrantyPickerColumns[0]
					this.warrantyDisplay = col[idx] || ''
				}
			},
			onWarrantyConfirm(e) {
				const idx = e.indexs[0]
				const w = this.warrantyList[idx]
				if (w) {
					this.warranty_id = Number(w.id)
					this.warrantyDisplay = e.value && e.value[0] ? e.value[0] : ''
					// 切换质保后清空已扫子口码，避免串单
					this.resetBead()
				}
				this.warrantyShow = false
			},
			resetBead() {
				this.beadInfo = {
					bead_code: '',
					pattern_no: '',
					tire_spec: '',
					load_speed: ''
				}
			},
			onDamageConfirm(e) {
				const v = e.value && e.value[0]
				this.damage_type = v || ''
				this.damageShow = false
			},
			scanBead() {
				if (this.warrantyList.length > 0 && !this.warranty_id) {
					return this.showToast('请先选择关联质保记录')
				}
				const w = this.selectedWarranty
				if (w && (w.claim_remain || 0) <= 0) {
					return this.showToast('该质保登记理赔次数已达上限')
				}
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['barCode', 'qrCode'],
					success: async (res) => {
						const code = String(res.result || '').trim()
						if (!code) {
							return this.showToast('未识别到编码')
						}
						if (w) {
							if (!Array.isArray(w.beads) || !w.beads.length) {
								return this.showToast('该质保登记未绑定子口码，无法理赔')
							}
							if (w.beads.indexOf(code) < 0) {
								return this.showToast('该子口码不在所选质保的注册信息中，无法添加')
							}
						}
						if (w && Array.isArray(w.claimed_beads) && w.claimed_beads.indexOf(code) >= 0) {
							return this.showToast('该子口码已提交过理赔')
						}
						uni.showLoading({ title: '查询中' })
						try {
							const q = await this.tirebeadQuery({ bead_code: code })
							uni.hideLoading()
							if (q.code !== 1 || !q.data) {
								return this.showToast((q && q.msg) || '未匹配到该子口码')
							}
							this.beadInfo = {
								bead_code: String(q.data.bead_code || code),
								pattern_no: String(q.data.pattern_no || ''),
								tire_spec: String(q.data.tire_spec || ''),
								load_speed: String(q.data.load_speed || '')
							}
							this.showToast('识别成功')
						} catch (e) {
							uni.hideLoading()
							this.showToast('查询失败')
						}
					},
					fail: (err) => {
						const msg = (err && (err.errMsg || err.message)) || ''
						if (/cancel/i.test(msg)) return
						this.showToast(msg ? ('扫码失败：' + msg) : '扫码失败，请用真机重试')
					}
				})
			},
			previewSample(path) {
				const u = this.previewUrl(path)
				if (!u) return
				uni.previewImage({ urls: [u], current: u })
			},
			previewUrl(path) {
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				const base = config.serverIp.replace(/\/?$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return base + p
			},
			async pickImage(key) {
				let ch
				try {
					ch = await this.chooseImage(1)
				} catch (e) {
					const msg = (e && (e.errMsg || e.message)) || ''
					if (!/cancel/i.test(msg)) {
						this.showToast(msg || '无法打开相册，请检查微信照片权限')
					}
					return
				}
				const tempPath = ch && ch.tempFilePaths && ch.tempFilePaths[0]
				if (!tempPath) {
					this.showToast('未获取到图片，请重新选择')
					return
				}
				uni.showLoading({ title: '上传中', mask: true })
				try {
					const res = await this.uploadImg(tempPath)
					if (res.code === 1 && res.data) {
						const imageUrl = typeof res.data === 'string' ? res.data : (res.data.url || '')
						if (imageUrl) {
							this.$set(this.formImg, key, imageUrl)
							return
						}
					}
					if (Number(res && res.code) === 401) {
						this.showToast('登录已失效，请重新登录')
						return
					}
					this.showToast((res && res.msg) || '图片上传失败')
				} catch (e) {
					const msg = (e && (e.errMsg || e.message)) || ''
					this.showToast(msg || '图片上传失败，请检查网络后重试')
				} finally {
					uni.hideLoading()
				}
			},
			async submit() {
				if (this.submitting) return
				if (this.warrantyList.length > 0 && !this.warranty_id) {
					return this.showToast('请选择关联质保记录')
				}
				if (!this.beadInfo.bead_code) {
					return this.showToast('请扫描子口码')
				}
				if (!this.receiver_name.trim()) {
					return this.showToast('请填写收货人')
				}
				if (!/^1\d{10}$/.test(this.receiver_mobile)) {
					return this.showToast('请填写正确联系电话')
				}
				if (!this.receive_address.trim()) {
					return this.showToast('请选择收货地址')
				}
				if (!this.damage_type) {
					return this.showToast('请选择损伤类型')
				}
				if (!this.formImg.damage_image) {
					return this.showToast('请上传损伤/鼓包局部图')
				}
				if (!this.formImg.tire_full_image) {
					return this.showToast('请上传轮胎整体图')
				}
				if (!this.formImg.sidewall_dot_image) {
					return this.showToast('请上传胎侧 DOT 图')
				}

				this.submitting = true
				const payload = {
					warranty_id: this.warranty_id || 0,
					bead_code: this.beadInfo.bead_code,
					pattern_no: this.beadInfo.pattern_no,
					tire_spec: this.beadInfo.tire_spec,
					load_speed: this.beadInfo.load_speed,
					receiver_name: this.receiver_name.trim(),
					receiver_mobile: this.receiver_mobile.trim(),
					receive_address: this.receive_address.trim(),
					damage_type: this.damage_type,
					damage_image: this.formImg.damage_image,
					tire_full_image: this.formImg.tire_full_image,
					sidewall_dot_image: this.formImg.sidewall_dot_image
				}
				try {
					const res = await this.claimSubmit(payload)
					if (res.code === 1) {
						this.showToast('提交成功')
						setTimeout(() => {
							if (this.warranty_id) {
								uni.redirectTo({
									url: '/pagesB/claimMyList/claimMyList?warranty_id=' + this.warranty_id
								})
								return
							}
							uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/my/my' }) })
						}, 600)
					}
				} finally {
					this.submitting = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f4f5f7;
		padding: 24rpx 24rpx 80rpx;
		box-sizing: border-box;
	}

	.tip {
		font-size: 26rpx;
		color: #036045;
		background: #ecf7f5;
		padding: 20rpx 24rpx;
		border-radius: 12rpx;
		margin-bottom: 24rpx;
		line-height: 1.5;
	}

	.star {
		color: #e54d42;
	}

	.card {
		background: #fff;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.mt-24 {
		margin-top: 24rpx;
	}

	.claim-quota {
		padding: 0 28rpx 24rpx;
		font-size: 24rpx;
		color: #036045;
	}

	.row {
		display: flex;
		align-items: center;
		padding: 28rpx;
		border-bottom: 1rpx solid #f3f3f3;
	}

	.row.col {
		align-items: flex-start;
		flex-direction: column;
	}

	.row.col .label {
		margin-bottom: 12rpx;
	}

	.row-last {
		border-bottom: none;
	}

	.row.arrow {
		justify-content: space-between;
	}

	.sub {
		text-align: left !important;
		line-height: 1.5;
	}

	.link {
		color: #036045;
		font-weight: 600;
	}

	.label {
		width: 220rpx;
		flex-shrink: 0;
		font-size: 28rpx;
		color: #333;
	}

	.ipt {
		flex: 1;
		font-size: 28rpx;
		text-align: right;
		color: #111;
	}

	.addr-ipt {
		text-align: right;
		word-break: break-all;
	}

	.placeholder {
		color: #c0c4cc;
	}

	.section-title {
		font-size: 30rpx;
		font-weight: 600;
		padding: 28rpx 28rpx 12rpx;
		color: #333;
	}

	.scan-entry {
		margin: 12rpx 28rpx 28rpx;
		padding: 36rpx 24rpx;
		background: #f7f8fa;
		border-radius: 16rpx;
		border: 2rpx dashed #cfd8d4;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.scan-icon {
		width: 96rpx;
		height: 96rpx;
		margin-bottom: 16rpx;
	}

	.scan-text {
		font-size: 30rpx;
		font-weight: 600;
		color: #036045;
	}

	.scan-sub {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #909399;
	}

	.bead-card {
		margin: 0 28rpx 28rpx;
		padding: 8rpx 24rpx;
		background: #e8f5f0;
		border-radius: 16rpx;
	}

	.bead-summary {
		padding: 20rpx 0 12rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #036045;
		word-break: break-all;
		border-bottom: 1rpx solid rgba(3, 96, 69, 0.15);
	}

	.bead-row {
		display: flex;
		justify-content: space-between;
		padding: 18rpx 0;
		border-bottom: 1rpx solid rgba(3, 96, 69, 0.1);
	}

	.bead-row.last {
		border-bottom: none;
	}

	.bead-label {
		font-size: 26rpx;
		color: #666;
		flex-shrink: 0;
		width: 160rpx;
	}

	.bead-value {
		flex: 1;
		text-align: right;
		font-size: 26rpx;
		color: #222;
		font-weight: 600;
		word-break: break-all;
	}

	.bead-empty {
		padding: 0 28rpx 32rpx;
		font-size: 26rpx;
		color: #909399;
		text-align: center;
	}

	.img-block {
		padding: 24rpx 28rpx;
		border-bottom: 1rpx solid #f3f3f3;
	}

	.img-block-last {
		border-bottom: none;
	}

	.img-label {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 12rpx;
	}

	.field-hint {
		display: block;
		font-size: 24rpx;
		color: #909399;
		line-height: 1.45;
		margin-bottom: 16rpx;
	}

	.sample-block {
		margin-bottom: 20rpx;
	}

	.sample-label {
		display: block;
		font-size: 26rpx;
		color: #666;
		margin-bottom: 16rpx;
	}

	.sample-img {
		width: 100%;
		max-height: 360rpx;
		border-radius: 12rpx;
		background: #f8f8f8;
		display: block;
	}

	.sample-hint {
		display: block;
		font-size: 22rpx;
		color: #909399;
		margin-top: 12rpx;
		margin-bottom: 16rpx;
	}

	.img-box {
		width: 220rpx;
		height: 220rpx;
		background: #f8f8f8;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.thumb {
		width: 100%;
		height: 100%;
	}

	.img-ph {
		font-size: 26rpx;
		color: #909399;
	}

	.btn-wrap {
		margin-top: 48rpx;
		padding: 0 8rpx;
	}

	.btn {
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		background: linear-gradient(90deg, #036045, #04825c);
		color: #fff;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 46rpx;
	}

	.btn.disabled {
		opacity: 0.6;
	}
</style>
