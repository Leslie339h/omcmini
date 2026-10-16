// vue protptype方法
import config from '@/config.js'
import request from '@/utils/request.js'

// import {
// 	getopenid
// } from '@/api/index.js'

export default {

	// 修改标题
	setTime(num, type) {
		let a;
		const timestampStr = num.toString();
		const length = timestampStr.length;
		if (length == 10) {
			a = num * 1000
		} else {
			a = num
		}
		//过滤器 用于格式化时间
		let date = new Date(a); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let year = date.getFullYear();
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let sdate = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);
		let second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		let result
		if (type == 'YY-MM-SS HH:MM:SS') {
			result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second
		} else if (type == 'YY-MM-SS HH:MM') {
			result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute
		} else if (type == 'YY-MM-SS') {
			result = year + '-' + month + '-' + sdate
		} else if (type == 'YY-MM') {
			result = year + '-' + month
		} else if (type == 'MM-SS') {
			result = month + '-' + sdate
		} else {
			result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute
		}

		// 返回
		return result;
	},
	openidApi() {
		return new Promise((reslove, reject) => {
			uni.login({
				provider: 'weixin', //使用微信登录
				success: (loginRes) => {
					getopenid({
						code: loginRes.code
					}).then(res => {
						if (res.code == 1) {
							reslove(res.data)
						}
					})
				}
			});
		})
	},

	// 修改标题
	setNavTitle(title) {
		uni.setNavigationBarTitle({
			title
		})
	},

	// 路由调转
	routerTo(url, type = 'navigateTo') {
		uni[type]({
			url
		})
	},

	// 路由返回
	routerBack(delta = 1) {
		let page = getCurrentPages()
		if (page.length > 1) {
			uni.navigateBack({
				delta
			})
		} else {
			uni.switchTab({
				url: '/pages/home/home'
			})
		}

	},
	routerGo(url, type = 'navigateTo') {
		let token = uni.getStorageSync('token')
		if (token) {
			uni[type]({
				url
			})
		} else {
			this.loginModel()
		}
	},
	// 转发朋友
	shareFile(url) {
		uni.downloadFile({
			url,
			success: (resx) => {
				uni.shareFileMessage({
					filePath: resx.tempFilePath,
					fileName: res.data.name + "." + res.data.extension,
					success: () => {
						console.log('转发文档成功');
					},
					fail: (err) => {
						console.log('转发文档err', err);
					}
				})
			}
		})
	},

	// 打开文件
	openloadFile(url) {
		let token = uni.getStorageSync('token')
		if (!token) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			uni.downloadFile({
				url: url, //文件的下载路径
				success(res) {
					//保存到本地
					uni.saveFile({
						tempFilePath: res.tempFilePath, //文件的临时路径
						success: function(res) {
							const savedFilePath = res.savedFilePath;
							// 打开文件
							uni.openDocument({
								filePath: savedFilePath,
								success: function(res) {
									uni.hideLoading()
								},
								fail: function(res) {},
								complete: function(res) {
									setTimeout(() => {
										uni.hideLoading()
									}, 4000)
								},
							});
						},
						fail: function(err) {}
					});
				},
				fail(res) {}
			})

		}
	},


	// 下载文件
	downloadFile(url, name) {
		let token = uni.getStorageSync('token')
		if (!token) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			uni.showLoading({
				title: '正在下载'
			})
			uni.downloadFile({
				url: url, //文件的下载路径
				success(res) {
					//保存到本地
					uni.saveFile({
						tempFilePath: res.tempFilePath, //文件的临时路径
						success: function(res) {
							uni.showToast({
								title: '保存成功'
							})
						},
						fail: function(err) {
							uni.showToast({
								title: '保存失败'
							})
						},
						complete() {
							uni.hideLoading()
						}
					});
				},
				fail(res) {

				}
			})

		}
	},
	/**
	 * @米转换为公里
	 */
	mkm(x) {
		let nub = Math.round((x / 100) / 10);
		return nub.toFixed(2)
	},
	/**
	 * @数字精度
	 */
	BumberPrecision(x) {
		return Number(x).toFixed(2)
	},
	// 保存图片到相册
	saveImage(filePath) {
		console.log('filePath', filePath);
		return new Promise((reslove, reject) => {
			uni.downloadFile({
				url: filePath, //图片的地址
				success: function(res) {
					const tempFilePath = res.tempFilePath //通过res中的tempFilePath 得到需要下载的图片地址
					uni.saveImageToPhotosAlbum({
						filePath: tempFilePath, //设置下载图片的地址
						success: function() {
							uni.showToast({
								title: "保存成功",
								duration: 2000,
								success() {
									reslove(true)
								}
							})
						},
						fail: (err) => {
							uni.showToast({
								title: "保存失败",
								duration: 2000,
								icon: 'none',
								success() {
									reject(false)
								}
							})
							if (err.errMsg !== 'saveImageToPhotosAlbum:fail auth deny')
								return
							uni.showModal({
								title: '提示',
								content: '需要您授权保存相册',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										uni.openSetting({
											success(settingdata) {
												if (settingdata
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showModal({
														title: '提示',
														content: '获取权限成功,再次保存图片即可成功',
														showCancel: false,
													})
												} else {
													uni.showModal({
														title: '提示',
														content: '获取权限失败，无法保存到相册',
														showCancel: false
													})
												}
											}
										})
									}
								}
							})

						}

					})
				},
				fail(err) {
					console.log('eeeee', err);
				}
			})
		})
	},

	/**
	 * @设置系统剪贴板的内容
	 * @String 参数
	 */
	setClipboardData(data) {
		uni.setClipboardData({
			data: data,
			showToast: true,
			success: function() {
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				})
			},
			fail() {
				uni.showToast({
					title: '复制失败',
					icon: 'none'
				})
			}
		});
	},
	// 弹窗提示
	uniModel(title, content) {
		return new Promise((reslove, reject) => {
			uni.showModal({
				title,
				content,
				success: function(res) {
					if (res.confirm) {
						//未登录
						reslove('confirm')
					} else if (res.cancel) {
						reslove('cancel')
					}
				}
			});
		})
	},
	loginModel() {
		uni.showModal({
			title: '提示',
			content: '请前去登录~',
			success: function(res) {
				if (res.confirm) {
					//未登录
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	},
	// toast弹框
	showToast(title) {
		uni.showToast({
			title,
			icon: 'none'
		})
	},

	// 获取用户信息
	getWxUserInfo() {
		return new Promise((reslove, reject) => {
			uni.getUserInfo({
				success(data) {
					reslove(data)
				},
				fail(err) {
					reject(err)
				}
			})

		})
	},

	// 获取login code
	getLoginCode() {
		return new Promise((reslove, reject) => {
			uni.login({
				success({
					code
				}) {
					reslove(code)
				},
				fail(err) {
					reject(err)
				}
			})

		})
	},

	// 选择图片或拍照
		chooseImage(count = 1) {
			return new Promise((reslove, reject) => {
				uni.chooseImage({
					count,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(data) {
					reslove(data)
				},
				fail(err) {
					reject(err)
				}
			})

		})
	},

	// 上传文件
	uploadfile(tempFilePaths) {
		let that = this
		return new Promise(async (relove, reject) => {
			// 开始上传
			uni.uploadFile({
				url: config.serverIp + '/api/common/upload',
				filePath: tempFilePaths,
				name: 'file',
				header: {
					token: uni.getStorageSync('token') || ''
				},
				success: res => {
					let result = JSON.parse(res.data)
					relove(result)
				},
				fail(err) {
					reject(err)
				}
			})

		})
	},

	// 上传图片
		uploadImg(url) {
			let that = this
			return new Promise(async (relove, reject) => {
				let tempFilePaths // 储存图片信息
				const token = uni.getStorageSync('token') || ''

			// 是否传入图片地址
			if (!url) {
				await that.chooseImage().then(d => {
					tempFilePaths = d.tempFilePaths[0]
				}).catch(err => {
					tempFilePaths = err
				})
			} else {
				tempFilePaths = url
			}

			// 开始上传
				uni.uploadFile({
					url: config.serverIp.replace(/\/?$/, '') + '/api/common/upload',
					fileType: 'image',
					filePath: tempFilePaths,
					name: 'file',
					header: {
						token
					},
					formData: {
						token
					},
					success: res => {
						try {
							const result = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
							relove(result)
						} catch (err) {
							reject(err)
						}
				},
				fail(err) {
					reject(err)
				}
			})

		})
	},

	// 扫码
	scanCode() {
		return new Promise((reslove, reject) => {
			uni.scanCode({
				success: (data) => {
					reslove(data)
					// this.rou
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},

	// 打电话
	openTel(phoneNumber) {
		uni.makePhoneCall({
			phoneNumber
		});
	},

	// 对象转get参数
	getParams: obj => {

		let str = '?'
		for (let s in obj) {
			str += `${s}=${obj[s]}&`
		}
		return str.substr(0, str.length - 1)
	},

	// url 截取
	getUrlRelativePath: url => {
		if (!url) return '';
		var url =
			'https://pl-1254950508.cos-website.ap-guangzhou.myqcloud.com/shaxi/feedback/89shba16qu4z2kowqt7w8t3yms71kl0vm.jpg'
		var arrUrl = url.split("//");
		var start = arrUrl[1].indexOf("/");
		var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
		if (relUrl.indexOf("?") != -1) {
			relUrl = relUrl.split("?")[0];
		}
		return relUrl.substr(1);
	},

	// 展示图片
	viewImage(e, urls) {
		urls = urls.map(obj => {
			return obj = uni.getStorageSync('loginInfo').imgUrl + '/' + obj
		})
		console.log(urls)
		uni.previewImage({
			urls,
			current: e.currentTarget.dataset.url
		});
	},

	// 获取登录数据
	getLoginInfo() {
		let that = this
		return new Promise(function(relove, reject) {
			that.getLoginCode().then(code => {
				authentication({
					code
				}).then(d => {
					uni.setStorageSync('loginInfo', d.data)
					relove(d)
				}).catch(reject)
			})
		})
	},

	// 获取两个经纬度的距离
	getDistance(lat1, lng1, lat2, lng2) {
		var radLat1 = lat1 * Math.PI / 180.0;
		var radLat2 = lat2 * Math.PI / 180.0;
		var a = radLat1 - radLat2;
		var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * 6378.137; // EARTH_RADIUS;
		s = Math.round(s * 10000) / 10;
		return s; // m
	},

	// 配置授权
	getLocation() {
		return new Promise((relove, reject) => {
			// 授权
			uni.getLocation({
				success: data => {
					relove(data)
				},
				fail(err) {
					uni.getSetting({
						success: (res) => {
							console.log('fail', res);
							var statu = res.authSetting;
							if (!statu['scope.userLocation']) {
								uni.showModal({
									title: '是否授权当前位置',
									content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
									success(tip) {
										if (tip.confirm) {
											uni.openSetting({
												success: data => {
													console.log('授权成功')
													if (data
														.authSetting[
															"scope.userLocation"
														] === true
													) {
														uni.showToast({
															title: '授权成功',
															icon: 'success',
															duration: 1000
														})
														//授权成功之后，再调用chooseLocation选择地方
														setTimeout(
															function() {
																uni.getLocation({
																	success: data => {
																		relove
																			(
																				data
																			)
																	},
																	fail(
																		err
																	) {
																		reject
																			(
																				err
																			)
																	}
																})

															}, 1000)
													} else {
														reject()
													}
												},
												fail() {
													console.log(
														'openSetting fail'
													)
												}
											})
										} else {
											uni.showToast({
												title: '授权失败',
												icon: 'none',
												duration: 1000
											})
											reject()
										}
									}
								})

							} else {
								uni.getLocation({
									success: data => {
										relove(data)
									},
									fail(err) {
										if (err.errCode == 2) {
											uni.showModel({
												title: '温馨提示',
												content: '需要获取您的地理位置，否则小程序功能将无法使用，请确认打开手机定位后重新进入',
												success: (tip) => {
													this.getLocation()
												}
											})
										}

										reject(err)
									}
								})
							}
						}
					})
				}
			})
		})
	},
	TimerFilter(num) {
		//过滤器 用于格式化时间
		let date = new Date(num); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let year = date.getFullYear();
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let sdate = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);
		let second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		let result = year + '-' + month
		// 返回
		return result;
	},
	// uni方式拿到位置
	uniGetLocation() {
		return new Promise((relove, reject) => {
			uni.getLocation({
				success: d => {
					relove(d)
				},
				fail: d => {
					reject(d)
				}
			})

		})


	},

	/**
	 * @微信小程序模糊定位位置
	 */
	wxgetFuzzyLocation() {
		return new Promise((relove, reject) => {
			uni.getFuzzyLocation({
				type: 'wgs84',
				success: d => {
					relove(d)
				},
				fail: d => {
					uni.showToast({
						title: '未授权位置请在小程序设置开启',
						icon: 'none'
					})
					reject(d)
				}
			})
		})
	},

	/**
	 * @打开地图手动选择位置
	 */
	getchooseLocation() {
		return new Promise((relove, reject) => {
			uni.chooseLocation({
				success: function(d) {
					relove(d)
				},
				fail: function(d) {
					reject(d)
				}
			});
		})
	},
	/**
	 * @使用应用内置地图查看位置
	 */
	getopenLocation(latitude, longitude) {
		return new Promise((relove, reject) => {
			uni.openLocation({
				latitude: Number(latitude),
				longitude: Number(longitude),
				success: function(d) {
					relove(d)
				},
				fail: function(d) {
					reject(d)
				}
			});
		})
	},

	// 获取url参数
	get_url(url, name) {

		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var trueUrl1 = url.split('?')[2];
		var trueUrl2 = trueUrl1.match(/(\S*)#/)[1];
		//console.log(trueUrl2)
		var r = trueUrl2.match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	},

	loadApi() {
		const pages = getCurrentPages()
		// 声明一个pages使用getCurrentPages方法
		const curPage = pages[pages.length - 1]
		// 声明一个当前页面
		curPage.onLoad(curPage.options) // 传入参数
		curPage.onShow()
		curPage.onReady()
	},

	// 获取缓存数据
	getStorage(key) {
		return uni.getStorageSync(key) || ''
	},
	/**
	 * @微信消息订阅 tmp为数组,url为支订阅完成跳转的页面
	 */
	subscription(tmp, url, navidx, rest) {
		let that = this
		uni.getSetting({
			withSubscriptions: true,
			success(res) {
				var itemSettings = res.subscriptionsSetting.itemSettings;
				if (itemSettings) {
					if (itemSettings[tmp[0]] || itemSettings[tmp[1]] || itemSettings[tmp[2]] == 'accept') {
						uni.showToast({
							title: '支付成功',
							icon: 'none',
							duration: 2000,
							success(rse) {
								if (navidx == 1) {
									uni.navigateBack()
								} else if (navidx == 2) {
									that.getcurPage()
								} else if (navidx == 3) {
									uni.redirectTo({
										url
									})
								} else {
									uni.reLaunch({
										url
									})
								}
							}
						})
					}
				} else {
					uni.getSetting({
						withSubscriptions: true,
						success(res) {
							uni.requestSubscribeMessage({
								tmplIds: tmp,
								success(res) {

									uni.showToast({
										title: '订阅成功',
										icon: 'none',
										duration: 2000,
										success(res) {
											if (navidx == 1) {
												uni.navigateBack()
											} else if (navidx ==
												2) {
												that.getcurPage()
											} else if (navidx == 3) {
												uni.redirectTo({
													url
												})
											} else {
												uni.reLaunch({
													url
												})
											}

										}
									})
								},
								fail(res) {
									if (navidx == 1) {
										uni.navigateBack()
									} else if (navidx == 2) {
										that.getcurPage()
									} else if (navidx == 3) {
										uni.redirectTo({
											url
										})
									} else {
										uni.reLaunch({
											url
										})
									}
								},
							})

						}
					})

				}
			}

		})

	},

	/**
	 * @微信消息订阅 tmp为数组,url为支订阅完成跳转的页面,navidx//跳转方式
	 */
	paysubscription(tmp, orderInfo, url, navidx) {
		let that = this
		uni.getSetting({
			withSubscriptions: true,
			success(res) {
				var itemSettings = res.subscriptionsSetting.itemSettings;
				if (itemSettings) {
					if (itemSettings[tmp[0]] || itemSettings[tmp[1]] || itemSettings[tmp[2]] == 'accept') {
						that.wxparApi(orderInfo, url,
							navidx)
					}
				} else {
					uni.getSetting({
						withSubscriptions: true,
						success(res) {
							uni.requestSubscribeMessage({
								tmplIds: tmp,
								success: (res) => {
									uni.showToast({
										title: '订阅成功',
										icon: 'none',
										duration: 2000,
										success: (res) => {
											that.wxparApi(orderInfo, url,
												navidx)
										}
									})
								},
								fail(res) {
									that.wxparApi(orderInfo, url,
										navidx)

								},
							})

						}
					})

				}
			}

		})

	},

	// 页面重载
	getcurPage() {
		// 页面重载
		const pages = getCurrentPages()
		// 声明一个pages使用getCurrentPages方法
		const curPage = pages[pages.length - 1]
		// 声明一个当前页面
		curPage.onLoad(curPage.options) // 传入参数
		curPage.onShow()
		curPage.onReady()
	},
	/**
	 * @微信支付
	 * @orderInfo 参数对象格式
	 * @支付成功跳转页面url
	 */
	wxparApi(orderInfo, url, navidx) {
		let that = this
		uni.requestPayment({
			timeStamp: orderInfo.timeStamp,
			nonceStr: orderInfo.nonceStr,
			package: orderInfo.package,
			signType: orderInfo.signType,
			paySign: orderInfo.paySign,
			success(res) {
				uni.showToast({
					title: '支付成功',
					icon: 'none',
					duration: 2000,
					success() {
						if (navidx == 1) {
							uni.navigateBack()
						} else if (navidx == 2) {
							that.getcurPage()
						} else {
							uni.reLaunch({
								url: url
							})
						}


					}
				})
			},
			fail(res) {
				uni.showToast({
					title: '支付失败',
					icon: 'none',
					duration: 2000,
					success() {
						if (navidx == 1) {
							uni.navigateBack()
						} else if (navidx == 2) {
							that.getcurPage()
						} else {
							uni.reLaunch({
								url: url
							})
						}

					}
				})
			}
		})
	},

}
