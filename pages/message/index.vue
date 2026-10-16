<template>
	<view class="page">
		<view class="toolbar" v-if="list.length">
			<text class="read-all" @click="markAllRead">全部已读</text>
		</view>
		<empty v-if="loaded && list.length === 0"></empty>
		<view
			class="msg-card"
			v-for="item in list"
			:key="item.id"
			:class="{ unread: item.is_read === 0 }"
			@click="onItemTap(item)"
		>
			<view class="msg-row">
				<view class="msg-body">
					<text class="msg-title" v-if="item.title">{{ item.title }}</text>
					<text class="msg-content">{{ item.content }}</text>
					<text
						class="msg-link"
						v-if="item.link_type && item.link_type !== 'none'"
						@click.stop="goLink(item)"
					>{{ linkLabel(item) }}</text>
				</view>
				<text class="msg-time">{{ item.createtime_fmt }}</text>
			</view>
		</view>
		<view class="load-tip" v-if="loading">加载中...</view>
		<view class="load-tip" v-else-if="loaded && !hasMore && list.length">没有更多了</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				loading: false,
				list: [],
				page: 1,
				lastPage: 1,
				hasMore: true
			}
		},
		onLoad() {},
		onShow() {
			this.reload()
		},
		onPullDownRefresh() {
			this.reload().finally(() => uni.stopPullDownRefresh())
		},
		onReachBottom() {
			if (this.hasMore && !this.loading) {
				this.loadList()
			}
		},
		methods: {
			linkLabel(item) {
				if (item.link_text) return item.link_text
				if (item.link_type === 'exchange_logs') return '兑换中心'
				if (item.link_type === 'referral_center') return '驰友中心'
				return '查看'
			},
			linkUrl(item) {
				if (item.link_type === 'exchange_logs') {
					return '/pagesA/coin/logs'
				}
				if (item.link_type === 'referral_center') {
					return '/pagesA/referral/index'
				}
				return ''
			},
			async reload() {
				this.page = 1
				this.lastPage = 1
				this.hasMore = true
				this.list = []
				this.loaded = false
				await this.loadList(true)
			},
			async loadList(reset) {
				if (this.loading) return
				this.loading = true
				try {
					const res = await this.messageList({ page: this.page, limit: 20 })
					if (res.code === 1 && res.data) {
						const rows = res.data.list || []
						this.list = reset ? rows : this.list.concat(rows)
						this.lastPage = res.data.pages || 1
						this.hasMore = !!res.data.has_more
						if (this.hasMore) {
							this.page += 1
						}
					}
				} finally {
					this.loading = false
					this.loaded = true
				}
			},
			async onItemTap(item) {
				await this.markOneRead(item.id)
				if (item.link_type && item.link_type !== 'none') {
					this.goLink(item)
				}
			},
			goLink(item) {
				const url = this.linkUrl(item)
				if (url) {
					uni.navigateTo({ url })
				}
			},
			async markOneRead(id) {
				try {
					await this.messageRead({ id })
					const row = this.list.find((x) => x.id === id)
					if (row) row.is_read = 1
				} catch (e) {}
			},
			async markAllRead() {
				try {
					const res = await this.messageReadAll({})
					if (res.code === 1) {
						this.list.forEach((x) => { x.is_read = 1 })
						uni.showToast({ title: '已全部标为已读', icon: 'none' })
					}
				} catch (e) {}
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
		padding: 20rpx 24rpx 40rpx;
		box-sizing: border-box;
	}

	.toolbar {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 16rpx;
	}

	.read-all {
		font-size: 26rpx;
		color: #036045;
	}

	.msg-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx 24rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
	}

	.msg-card.unread {
		background: #f8fffc;
	}

	.msg-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16rpx;
	}

	.msg-body {
		flex: 1;
		min-width: 0;
	}

	.msg-title {
		display: block;
		font-size: 28rpx;
		font-weight: 700;
		color: #222;
		margin-bottom: 10rpx;
	}

	.msg-content {
		display: block;
		font-size: 26rpx;
		color: #444;
		line-height: 1.55;
	}

	.msg-link {
		display: inline-block;
		margin-top: 14rpx;
		font-size: 26rpx;
		color: #036045;
		font-weight: 600;
	}

	.msg-time {
		flex-shrink: 0;
		font-size: 22rpx;
		color: #999;
		line-height: 1.4;
		text-align: right;
		white-space: nowrap;
		padding-top: 4rpx;
	}

	.load-tip {
		text-align: center;
		padding: 24rpx 0;
		font-size: 24rpx;
		color: #999;
	}
</style>
