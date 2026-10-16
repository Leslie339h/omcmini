<template>
	<view class="page">
		<view class="tip">亲爱的驰友，为保障你的质保权益，请如实填写购买信息，带 <text class="star">*</text>
			为必填项。您可复制电商平台订单号一键加载订单信息。同一注册最少绑定1个子口码，最多5个。</view>

		<view class="card">
			<!-- <view class="section-title section-title--inline">关联购买平台订单号（选填）</view> -->
			<!-- <view class="order-load-row"> -->
			<!-- <input class="order-no-input" v-model="order_no_input" placeholder="请粘贴购买轮胎的电商平台订单号" /> -->
			<!-- <view class="order-load-btn" :class="{ disabled: orderLookupLoading }" @click="loadOrderGoods">{{ orderLookupLoading ? '加载中…' : '加载订单' }}</view> -->
			<!-- </view> -->
			<!-- <view class="order-meta" v-if="linked_order_no">
				<text>已关联订单 {{ linked_order_no }}</text>
				<text class="order-meta-pay">实付¥{{ linked_amount_pay }}</text>
			</view>
			<view class="goods-preview" v-if="order_goods_list.length">
				<view class="goods-preview-title">订单商品</view>
				<view class="goods-line" v-for="(g, gi) in order_goods_list" :key="'g-' + gi">
					<image class="goods-thumb" :src="g.image || '/static/logo.png'" mode="aspectFill" />
					<view class="goods-info">
						<view class="goods-title">{{ g.title }}</view>
						<view class="goods-sub">{{ g.item_name }} × {{ g.count }}</view>
					</view>
				</view>
			</view> -->
		</view>

		<view class="card mt-24">
			<view class="row">
				<text class="label">称谓 <text class="star">*</text></text>
				<input class="ipt" v-model="salutation" placeholder="请输入您的称谓" />
			</view>
			<view class="row">
				<text class="label">手机号码 <text class="star">*</text></text>
				<input class="ipt" type="number" maxlength="11" v-model="mobile" placeholder="11位手机号" />
			</view>
			<view class="row arrow" @click="channelShow = true">
				<text class="label">购买渠道 <text class="star">*</text></text>
				<text class="ipt placeholder" v-if="!purchase_channel">请选择</text>
				<text class="ipt" v-else>{{ purchase_channel }}</text>
			</view>
			<view class="row" v-if="purchase_channel!=''&&purchase_channel!='线下门店'">
				<text class="label">订单号 </text>
				<input class="ipt" v-model="order_no_input" placeholder="请输入电商平台订单号" />
			</view>
			<view class="row">
				<text class="label">购买城市 <text class="star">*</text></text>
				<input class="ipt" v-model="purchase_city" placeholder="请输入城市" />
			</view>
			<view class="row arrow" @click="pickDeliveryAddress">
				<text class="label">收货地址</text>
				<text class="ipt placeholder addr-ipt" v-if="!delivery_address">点击选择地址（定位当前位置）</text>
				<text class="ipt addr-ipt" v-else>{{ delivery_address }}</text>
			</view>
			<view class="row vehicle-type-row">
				<text class="label">汽车类型 <text class="star">*</text></text>
				<radio-group class="vehicle-type-options" @change="onVehicleTypeChange">
					<label class="vehicle-type-option" v-for="item in vehicleTypeOptions" :key="item">
						<radio :value="item" :checked="vehicle_type === item" color="#036045" />
						<text>{{ item }}</text>
					</label>
				</radio-group>
			</view>
			<view class="row arrow" @click="tireTypeShow = true">
				<text class="label">轮胎类型 <text class="star">*</text></text>
				<text class="ipt placeholder" v-if="!tire_type">请选择</text>
				<text class="ipt" v-else>{{ tire_type }}</text>
			</view>
			<view class="row arrow row-last" @click="tireShow = true">
				<text class="label">花纹编号 <text class="star">*</text></text>
				<text class="ipt placeholder" v-if="!tire_name">可以通过扫描子口码获得</text>
				<text class="ipt" v-else>{{ tire_name }}</text>
			</view>
		</view>

		<!-- 扫描子口码 -->
		<view class="card mt-24">
			<view class="section-title">扫描子口码注册轮胎</view>
			<view class="sample-block">
				<text class="sample-label">请拍摄轮胎胎侧的子口码（参考下图）</text>
				<image class="sample-img" :src="previewUrl(barcodeExamplePath)" mode="widthFix"
					@click="previewSample(barcodeExamplePath)" />
				<text class="sample-hint">点击图片可放大查看</text>
			</view>

			<view class="scan-entry" @click="scanAddBead">
				<image class="scan-icon" src="/static/sssscan02.png" mode="aspectFit" />
				<text class="scan-text">扫描子口码添加</text>
				<text class="scan-sub">已添加 {{ tireTabs.length }}/5</text>
			</view>
			<!-- <button open-type="contact" class="scan-help">如扫不到轮胎信息，请联系客服</button> -->

			<view class="tab-row" v-if="tireTabs.length">
				<view class="tab-item" v-for="(tab, idx) in tireTabs" :key="'tab-' + idx"
					:class="{ active: activeTab === idx }" @click="activeTab = idx">轮胎{{ idx + 1 }}</view>
			</view>

			<view class="bead-form" v-if="tireTabs.length && currentTab">
				<view class="row">
					<text class="label">子口码 <text class="star">*</text></text>
					<input class="ipt" v-model="currentTab.bead_code" placeholder="请输入子口码" />
				</view>
				<!-- <view class="row">
					<text class="label">花纹编号 <text class="star">*</text></text>
					<input class="ipt" v-model="currentTab.pattern_no" placeholder="扫码自动填入" />
				</view>
				<view class="row">
					<text class="label">轮胎规格 <text class="star">*</text></text>
					<input class="ipt" v-model="currentTab.tire_spec" placeholder="扫码自动填入" />
				</view>
				<view class="row">
					<text class="label">负荷速级 <text class="star">*</text></text>
					<input class="ipt" v-model="currentTab.load_speed" placeholder="扫码自动填入" />
				</view>
				<view class="row row-last">
					<text class="label">年周号 <text class="star">*</text></text>
					<input class="ipt" v-model="currentTab.year_week" placeholder="扫码自动填入" />
				</view> -->
				<view class="bead-actions">
					<view class="bead-del" v-if="tireTabs.length > 1" @click="removeActiveTab">删除当前轮胎</view>
				</view>
			</view>
			<view class="bead-empty" v-else>请点击上方「扫描子口码添加」，至少绑定 1 个</view>
		</view>

		<view class="card mt-24">
			<view class="section-title">装车照片</view>
			<view class="sample-block">
				<text class="sample-label">轮胎装车拍摄示例（供参考）</text>
				<image class="sample-img" :src="previewUrl(vehicleExamplePath)" mode="widthFix"
					@click="previewSample(vehicleExamplePath)" />
				<text class="sample-hint">点击图片可放大查看</text>
			</view>
			<view class="img-row" @click="pickImage('vehicle_install_image')">
				<view class="img-label">轮胎装车图 <text class="star">*</text></view>
				<view class="img-box">
					<image v-if="formImg.vehicle_install_image" class="thumb"
						:src="previewUrl(formImg.vehicle_install_image)" mode="aspectFill" />
					<text v-else class="img-ph">点击上传</text>
				</view>
			</view>
		</view>
		<!-- <view class="btn" @click="openEnvelope">test</view> -->
		<view class="btn-wrap">
			<view class="btn" :class="{ disabled: submitting }" @click="submit">{{ submitting ? '提交中…' : '提交登记' }}
			</view>
		</view>

		<u-picker :show="channelShow" title="购买渠道" :columns="channelColumns" @cancel="channelShow = false"
			@confirm="onChannelConfirm" />
		<u-picker :show="tireTypeShow" title="轮胎类型" :columns="tireTypeColumns" @cancel="tireTypeShow = false"
			@confirm="onTireTypeConfirm" />
		<u-picker :show="tireShow" title="花纹编号" :columns="tireColumns" @cancel="tireShow = false"
			@confirm="onTireConfirm" />

		<warranty-policy-popup :show.sync="showWarrantyPolicy" @confirmed="onWarrantyPolicyConfirmed"/>
		<!-- 质保注册成功的信封开启动画 -->
		<warranty-envelope-popup :show.sync="showEnvelope" @close="toHome()" />
	</view>
</template>

<script>
	import config from '@/config.js'
	import WarrantyPolicyPopup from '@/components/warrantyPolicyPopup/warrantyPolicyPopup.vue'
	import WarrantyEnvelopePopup from '@/components/warrantyEnvelopePopup/warrantyEnvelopePopup.vue'

	function emptyBead() {
		return {
			bead_code: '',
			pattern_no: '',
			tire_spec: '',
			load_speed: '',
			year_week: ''
		}
	}

	export default {
		components: {
			WarrantyPolicyPopup,
			WarrantyEnvelopePopup
		},
		data() {
			return {
				showWarrantyPolicy: false,
				showEnvelope: false,
				salutation: '',
				mobile: '',
				purchase_channel: '',
				purchase_city: '',
				delivery_address: '',
				vehicle_type: '',
				vehicleTypeOptions: ['新能源车', '燃油车'],
				tire_type: '',
				tire_name: '',
				formImg: {
					vehicle_install_image: ''
				},
				tireTabs: [],
				activeTab: 0,
				channelShow: false,
				tireTypeShow: false,
				tireShow: false,
				channelColumns: [
					['线下门店', '抖音', '京东', '天猫', '微信视频号']
				],
				tireTypeColumns: [
					['自修复轮胎', '普通轮胎']
				],
				tireColumns: [
					[
						'Quest-X / 悦驰UHP',
						'Journey-X PRO / 悦旅',
						'Quest-X SUV / 悦驰SUV',
						'Rough Master XT / 静野 XT',
						'Rough Master-RT',
						'Winter Master D1'
					]
				],
				submitting: false,
				barcodeExamplePath: '/uploads/20260531/6a8231e89d6d3439c2b13cfdecfcce85.png',
				vehicleExamplePath: '/uploads/20260504/7fa536878d1809e400ecd258bf61cf79.jpg',
				order_no_input: '',
				linked_order_no: '',
				linked_order_id: 0,
				linked_amount_pay: '',
				order_goods_list: [],
				orderLookupLoading: false
			}
		},
		computed: {
			currentTab() {
				if (!this.tireTabs.length) return null
				const i = Math.min(this.activeTab, this.tireTabs.length - 1)
				return this.tireTabs[i]
			}
		},
		onLoad() {
			if (!this.ensureLoggedIn()) return
			this.loadOptions()
			if (this.vuex_user) {
				if (this.vuex_user.mobile) this.mobile = String(this.vuex_user.mobile)
			}
			this.initLocationForAddress()
		},
		onShow() {
			if (!this.ensureLoggedIn()) return
			this.checkWarrantyPolicy()
		},
		methods: {
			toHome() {
				uni.navigateBack({
					fail: () => uni.switchTab({
						url: '/pages/my/my'
					})
				})
			},
			onVehicleTypeChange(e) {
				this.vehicle_type = e.detail.value
			},
			ensureLoggedIn() {
				if (uni.getStorageSync('token')) return true
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return false
			},
			async checkWarrantyPolicy() {
				const token = uni.getStorageSync('token')
				if (!token) {
					this.showWarrantyPolicy = false
					return
				}
				try {
					const res = await this.userInfo({})
					if (res.code === 1 && res.data && parseInt(res.data.need_warranty_policy, 10) === 1) {
						this.showWarrantyPolicy = true
					}
				} catch (e) {}
			},
			onWarrantyPolicyConfirmed() {
				this.showWarrantyPolicy = false
				const user = uni.getStorageSync('user') || {}
				user.need_warranty_policy = 0
				uni.setStorageSync('user', user)
			},
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
			pickDeliveryAddress() {
				uni.chooseLocation({
					success: (res) => {
						const parts = [res.address, res.name].filter((s) => s && String(s).trim())
						this.delivery_address = parts.join(' ')
					}
				})
			},
			previewSample(path) {
				const u = this.previewUrl(path)
				if (!u) return
				uni.previewImage({
					urls: [u],
					current: u
				})
			},
			previewUrl(path) {
				if (!path) return ''
				if (path.indexOf('http') === 0) return path
				const base = config.serverIp.replace(/\/?$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return base + p
			},
			async loadOptions() {
				const res = await this.warrantyOptions({})
				if (res.code === 1 && res.data) {
					if (res.data.purchase_channels && res.data.purchase_channels.length) {
						this.channelColumns = [res.data.purchase_channels]
					}
					if (res.data.tire_types && res.data.tire_types.length) {
						this.tireTypeColumns = [res.data.tire_types]
					}
					if (res.data.tire_names && res.data.tire_names.length) {
						this.tireColumns = [res.data.tire_names]
					}
				}
			},
			applyPrefill(p) {
				if (!p || typeof p !== 'object') return
				if (p.salutation && !this.salutation.trim()) this.salutation = String(p.salutation)
				if (p.mobile && /^1\d{10}$/.test(String(p.mobile)) && !/^1\d{10}$/.test(this.mobile)) {
					this.mobile = String(p.mobile)
				}
				if (p.purchase_city && !this.purchase_city.trim()) this.purchase_city = String(p.purchase_city)
				if (p.delivery_address && !this.delivery_address.trim()) this.delivery_address = String(p.delivery_address)
				if (p.purchase_channel && this.channelColumns[0] && this.channelColumns[0].indexOf(p.purchase_channel) >=
					0) {
					if (!this.purchase_channel) this.purchase_channel = String(p.purchase_channel)
				}
				if (p.tire_type && this.tireTypeColumns[0] && this.tireTypeColumns[0].indexOf(p.tire_type) >= 0) {
					if (!this.tire_type) this.tire_type = String(p.tire_type)
				}
				if (p.tire_name && this.tireColumns[0] && this.tireColumns[0].indexOf(p.tire_name) >= 0) {
					if (!this.tire_name) this.tire_name = String(p.tire_name)
				}
			},
			async loadOrderGoods() {
				const no = String(this.order_no_input || '').trim()
				if (!no) {
					return this.showToast('请先输入订单号')
				}
				if (this.orderLookupLoading) return
				this.orderLookupLoading = true
				try {
					const res = await this.warrantyOrderGoods({
						order_no: no
					})
					if (res.code !== 1 || !res.data) {
						return
					}
					this.linked_order_no = res.data.order_no || ''
					this.linked_order_id = res.data.order_id || 0
					this.linked_amount_pay = res.data.amount_pay != null ? String(res.data.amount_pay) : ''
					this.order_goods_list = Array.isArray(res.data.goods_list) ? res.data.goods_list : []
					this.applyPrefill(res.data.prefill)
					this.showToast('已载入订单商品')
				} finally {
					this.orderLookupLoading = false
				}
			},
			onChannelConfirm(e) {
				const v = e.value && e.value[0]
				this.purchase_channel = v || ''
				this.channelShow = false
			},
			onTireTypeConfirm(e) {
				const v = e.value && e.value[0]
				this.tire_type = v || ''
				this.tireTypeShow = false
			},
			onTireConfirm(e) {
				const v = e.value && e.value[0]
				this.tire_name = v || ''
				this.tireShow = false
			},
			scanAddBead() {
				if (this.tireTabs.length >= 5) {
					return this.showToast('最多绑定5个子口码')
				}
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['barCode', 'qrCode'],
					success: async (res) => {
						const code = String(res.result || '').trim()
						if (!code) {
							return this.showToast('未识别到编码')
						}
						const exists = this.tireTabs.some((t) => String(t.bead_code) === code)
						if (exists) {
							return this.showToast('该子口码已添加')
						}
						uni.showLoading({
							title: '查询中'
						})
						try {
							const used = await this.warrantyCheckBead({
								bead_code: code
							})
							if (used.code === 1 && used.data && used.data.used) {
								uni.hideLoading()
								return this.showToast('该子口码已绑定其他注册，不能重复添加')
							}
							const q = await this.tirebeadQuery({
								bead_code: code
							})
							uni.hideLoading()
							if (q.code !== 1 || !q.data) {
								// return this.showToast((q && q.msg) || '未匹配到该子口码')
							}
							const row = emptyBead()
							row.bead_code = String(q.data.bead_code || code)
							row.pattern_no = String(q.data.pattern_no || '')
							row.tire_spec = String(q.data.tire_spec || '')
							row.load_speed = String(q.data.load_speed || '')
							row.year_week = String(q.data.year_week || '')
							this.tireTabs.push(row)
							this.activeTab = this.tireTabs.length - 1
							if (!this.tire_name && row.pattern_no) {
								this.tryMatchTireName(row.pattern_no)
							}
							this.showToast('已添加轮胎' + this.tireTabs.length)
						} catch (e) {
							uni.hideLoading()
							console.log(e)
							this.showToast('如果没有新轮胎显示，请重试！')
						}
					},
					fail: (err) => {
						const msg = (err && (err.errMsg || err.message)) || ''
						if (/cancel/i.test(msg)) return
						// this.showToast(msg ? ('扫码失败：' + msg) : '扫码失败，请用真机重试')
						this.showToast('如果没有新轮胎显示，请重试！')
					}
				})
			},
			tryMatchTireName(patternNo) {
				const list = (this.tireColumns && this.tireColumns[0]) || []
				const p = String(patternNo || '')
				for (let i = 0; i < list.length; i++) {
					const name = list[i]
					if (!name) continue
					if (name === p || name.indexOf(p) >= 0 || p.indexOf(name) >= 0) {
						this.tire_name = name
						return
					}
					// Quest-X / 悦驰UHP  <->  悦驰UHP/Quest-X
					const parts = name.split(/\s*\/\s*/)
					if (parts.some((x) => x && p.indexOf(x) >= 0)) {
						this.tire_name = name
						return
					}
				}
			},
			removeActiveTab() {
				if (this.tireTabs.length <= 1) return
				this.tireTabs.splice(this.activeTab, 1)
				if (this.activeTab >= this.tireTabs.length) {
					this.activeTab = this.tireTabs.length - 1
				}
			},
			async pickImage(key) {
				if (!this.ensureLoggedIn()) return
				let ch
				try {
					ch = await this.chooseImage(1)
				} catch (e) {
					const msg = (e && (e.errMsg || e.message)) || ''
					if (!/cancel/i.test(msg)) this.showToast(msg || '无法打开相册，请检查微信照片权限')
					return
				}
				const tempPath = ch && ch.tempFilePaths && ch.tempFilePaths[0]
				if (!tempPath) {
					this.showToast('未获取到图片，请重新选择')
					return
				}
				uni.showLoading({
					title: '上传中',
					mask: true
				})
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
						uni.removeStorageSync('token')
						this.showToast('登录已失效，请重新登录')
						setTimeout(() => uni.reLaunch({
							url: '/pages/login/login'
						}), 800)
						return
					}
					this.showToast((res && res.msg) || '图片上传失败')
				} catch (e) {
					this.showToast('图片上传失败，请检查网络后重试')
				} finally {
					uni.hideLoading()
				}
			},
			// test：弹出信封开启动画
			openEnvelope() {
				this.showEnvelope = true
			},
			async submit() {
				if (this.submitting) return
				if (!this.salutation.trim()) {
					return this.showToast('请填写称谓')
				}
				if (!/^1\d{10}$/.test(this.mobile)) {
					return this.showToast('请填写正确手机号')
				}
				if (!this.purchase_channel) {
					return this.showToast('请选择购买渠道')
				}
				if (!this.purchase_city.trim()) {
					return this.showToast('请填写购买城市')
				}
				if (!this.vehicle_type) {
					return this.showToast('请选择汽车类型')
				}
				if (!this.tire_type) {
					return this.showToast('请选择轮胎类型')
				}
				if (!this.tire_name) {
					return this.showToast('请选择花纹编号')
				}
				if (!this.tireTabs.length) {
					return this.showToast('请至少扫描绑定1个子口码')
				}
				if (this.tireTabs.length > 5) {
					return this.showToast('最多绑定5个子口码')
				}
				// for (let i = 0; i < this.tireTabs.length; i++) {
				// 	const t = this.tireTabs[i]
				// 	if (!String(t.bead_code || '').trim()) {
				// 		return this.showToast('请完善轮胎' + (i + 1) + '的子口码')
				// 	}
				// 	if (!String(t.pattern_no || '').trim()) {
				// 		return this.showToast('请完善轮胎' + (i + 1) + '的花纹编号')
				// 	}
				// 	if (!String(t.tire_spec || '').trim()) {
				// 		return this.showToast('请完善轮胎' + (i + 1) + '的轮胎规格')
				// 	}
				// 	if (!String(t.load_speed || '').trim()) {
				// 		return this.showToast('请完善轮胎' + (i + 1) + '的负荷速级')
				// 	}
				// 	if (!String(t.year_week || '').trim()) {
				// 		return this.showToast('请完善轮胎' + (i + 1) + '的年周号')
				// 	}
				// }
				const codes = this.tireTabs.map((t) => String(t.bead_code).trim())
				const uniq = Array.from(new Set(codes))
				if (uniq.length !== codes.length) {
					return this.showToast('存在重复的子口码')
				}
				if (!this.formImg.vehicle_install_image) {
					return this.showToast('请上传轮胎装车图')
				}

				this.submitting = true
				const payload = {
					order_no: String(this.linked_order_no || this.order_no_input || '').trim(),
					salutation: this.salutation.trim(),
					mobile: this.mobile.trim(),
					purchase_channel: this.purchase_channel,
					purchase_city: this.purchase_city.trim(),
					delivery_address: this.delivery_address.trim(),
					vehicle_type: this.vehicle_type,
					tire_type: this.tire_type,
					tire_name: this.tire_name,
					purchase_quantity: this.tireTabs.length,
					vehicle_install_image: this.formImg.vehicle_install_image,
					beads: this.tireTabs.map((t) => ({
						bead_code: String(t.bead_code).trim(),
						pattern_no: String(t.pattern_no).trim(),
						tire_spec: String(t.tire_spec).trim(),
						load_speed: String(t.load_speed).trim(),
						year_week: String(t.year_week).trim()
					}))
				}
				try {
					const res = await this.warrantySubmit(payload)
					if (res.code === 1) {
						this.showToast('提交成功')
						this.openEnvelope()
						setTimeout(() => {
							uni.navigateBack({
								fail: () => uni.switchTab({
									url: '/pagesA/referral/index'
								})
							})
						}, 10000)
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

	.section-title--inline {
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #f3f3f3;
		margin-bottom: 20rpx;
	}

	.order-load-row {
		display: flex;
		align-items: center;
		padding: 0 28rpx 24rpx;
		gap: 16rpx;
	}

	.order-no-input {
		flex: 1;
		height: 72rpx;
		line-height: 72rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		background: #f8f8f8;
		border-radius: 12rpx;
		box-sizing: border-box;
	}

	.order-load-btn {
		flex-shrink: 0;
		padding: 0 28rpx;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 26rpx;
		color: #fff;
		background: #036045;
		border-radius: 12rpx;
		font-weight: 600;
	}

	.order-load-btn.disabled {
		opacity: 0.55;
	}

	.order-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 28rpx 20rpx;
		font-size: 26rpx;
		color: #666;
	}

	.order-meta-pay {
		color: #036045;
		font-weight: 600;
	}

	.goods-preview {
		padding: 0 28rpx 28rpx;
		border-top: 1rpx solid #f3f3f3;
	}

	.goods-preview-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		padding: 20rpx 0 12rpx;
	}

	.goods-line {
		display: flex;
		align-items: center;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f6f6f6;
	}

	.goods-line:last-child {
		border-bottom: none;
	}

	.goods-thumb {
		width: 112rpx;
		height: 112rpx;
		border-radius: 12rpx;
		flex-shrink: 0;
		background: #f0f0f0;
	}

	.goods-info {
		flex: 1;
		margin-left: 20rpx;
		min-width: 0;
	}

	.goods-title {
		font-size: 28rpx;
		color: #333;
		word-break: break-all;
	}

	.goods-sub {
		font-size: 24rpx;
		color: #909399;
		margin-top: 8rpx;
	}

	.section-title {
		font-size: 30rpx;
		font-weight: 600;
		padding: 28rpx 28rpx 12rpx;
		color: #333;
	}

	.sample-block {
		padding: 0 28rpx 24rpx;
		border-bottom: 1rpx solid #f3f3f3;
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
	}

	.scan-entry {
		margin: 28rpx;
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

	.scan-help {
		display: block;
		margin: 0 28rpx 20rpx;
		padding: 0;
		background: transparent;
		border: none;
		font-size: 24rpx;
		color: #036045;
		text-align: center;
		text-decoration: underline;
		line-height: 1.5;
	}

	.scan-help::after {
		border: none;
	}

	.tab-row {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		padding: 8rpx 28rpx 20rpx;
	}

	.tab-item {
		min-width: 110rpx;
		padding: 12rpx 20rpx;
		text-align: center;
		font-size: 26rpx;
		color: #036045;
		border: 2rpx solid #036045;
		border-radius: 12rpx;
		background: #fff;
		box-sizing: border-box;
	}

	.tab-item.active {
		background: #036045;
		color: #fff;
	}

	.bead-form {
		border-top: 1rpx solid #f3f3f3;
	}

	.bead-empty {
		padding: 32rpx 28rpx 40rpx;
		font-size: 26rpx;
		color: #909399;
		text-align: center;
	}

	.bead-actions {
		padding: 8rpx 28rpx 28rpx;
		display: flex;
		justify-content: flex-end;
	}

	.bead-del {
		font-size: 26rpx;
		color: #e54d42;
		padding: 8rpx 0;
	}

	.row {
		display: flex;
		align-items: center;
		padding: 28rpx;
		border-bottom: 1rpx solid #f3f3f3;
	}

	.row-last {
		border-bottom: none;
	}

	.row.arrow {
		justify-content: space-between;
	}

	.label {
		width: 200rpx;
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

	.vehicle-type-row {
		align-items: center;
	}

	.vehicle-type-options {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.vehicle-type-option {
		display: flex;
		align-items: center;
		margin-left: 28rpx;
		font-size: 28rpx;
		color: #333;
	}

	.vehicle-type-option radio {
		transform: scale(0.82);
		margin-right: 4rpx;
	}

	.placeholder {
		color: #c0c4cc;
	}

	.img-row {
		padding: 24rpx 28rpx;
		border-bottom: none;
	}

	.img-label {
		font-size: 28rpx;
		color: #333;
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