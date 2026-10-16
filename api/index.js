import request from '@/utils/request.js'

export default {
	// 公共参数
	parameter(data) {
		return request({
			url: 'addons/fzxcxt/index/parameter',
			method: "POST",
			data
		})
	},
	// 获取openid
	get_openid(data) {
		return request({
			url: 'addons/fzxcxt/user/get_openid',
			method: "POST",
			data
		})
	},

	// ------------------登录---------------------
	login(data) {
		return request({
			url: 'addons/fzxcxt/user/login',
			method: "POST",
			data
		})
	},
	// 发送验证码
	send(data) {
		return request({
			url: 'addons/fzxcxt/sms/send',
			method: "POST",
			data
		})
	},
	// 校验验证码
	check(data) {
		return request({
			url: 'addons/fzxcxt/sms/check',
			method: "POST",
			data
		})
	},

	// 获取轮播图
	indexbanner(data) {
		return request({
			url: 'addons/fzxcxt/index/banner',
			method: "POST",
			data
		})
	},

	// 协议
	pact(data) {
		return request({
			url: 'addons/fzxcxt/user/pact',
			method: "POST",
			data
		})
	},
	agreeWarrantyPolicy(data) {
		return request({
			url: 'addons/fzxcxt/user/agree_warranty_policy',
			method: "POST",
			data
		})
	},

	// 退出登录
	logout(data) {
		return request({
			url: 'addons/fzxcxt/user/logout',
			method: "POST",
			data
		})
	},


	// ------------------用户---------------------
	// 获取用户信息
	userInfo(data) {
		return request({
			url: 'addons/fzxcxt/user/userInfo',
			method: "POST",
			data
		})
	},

	// 修改用户信息
	profile(data) {
		return request({
			url: 'addons/fzxcxt/user/profile',
			method: "POST",
			data
		})
	},

	// 质保 / 理赔（小程序）
	warrantyOptions(data) {
		return request({
			url: 'addons/fzxcxt/warranty/options',
			method: "POST",
			data
		})
	},
	warrantySubmit(data) {
		return request({
			url: 'addons/fzxcxt/warranty/submit',
			method: "POST",
			data
		})
	},
	warrantyMyList(data) {
		return request({
			url: 'addons/fzxcxt/warranty/myList',
			method: "POST",
			data
		})
	},
	/** 质保登记：根据订单号拉取本人订单商品并返回表单预填建议 */
	warrantyOrderGoods(data) {
		return request({
			url: 'addons/fzxcxt/warranty/orderGoods',
			method: "POST",
			data
		})
	},
	/** 校验子口码是否已被其他质保注册占用 */
	warrantyCheckBead(data) {
		return request({
			url: 'addons/fzxcxt/warranty/checkBead',
			method: "POST",
			data
		})
	},
	/** 扫描子口码查询轮胎信息 */
	tirebeadQuery(data) {
		return request({
			url: 'addons/fzxcxt/tirebead/query',
			method: "POST",
			data
		})
	},
	claimOptions(data) {
		return request({
			url: 'addons/fzxcxt/claim/options',
			method: "POST",
			data
		})
	},
	claimSubmit(data) {
		return request({
			url: 'addons/fzxcxt/claim/submit',
			method: "POST",
			data
		})
	},
	claimMyList(data) {
		return request({
			url: 'addons/fzxcxt/claim/myList',
			method: "POST",
			data
		})
	},

	// 会员码
	usercode(data) {
		return request({
			url: 'addons/fzxcxt/user/code',
			method: "POST",
			data
		})
	},


	// 充值优惠列表
	recharge(data) {
		return request({
			url: 'addons/fzxcxt/order/recharge',
			method: "POST",
			data
		})
	},

	// ------------------门店---------------------
	// 默认门店
	default_store(data) {
		return request({
			url: 'addons/fzxcxt/store/default_store',
			method: "POST",
			data
		})
	},
	// 门店列表
	storeList(data) {
		return request({
			url: 'addons/fzxcxt/store/list',
			method: "POST",
			data
		})
	},
	// 我的常点
	multiple_purchase(data) {
		return request({
			url: 'addons/fzxcxt/store/multiple_purchase',
			method: "POST",
			data
		})
	},


	//  门店商品（仅分类，不含商品列表）
	storeinfo(data) {
		return request({
			url: 'addons/fzxcxt/store/info',
			method: "POST",
			data
		})
	},

	// 商城商品分页 type_id=0 为全部
	storeGoodsPage(data) {
		return request({
			url: 'addons/fzxcxt/store/goodsPage',
			method: "POST",
			data
		})
	},


	// 商品详情
	goodsDetail(data) {
		return request({
			url: 'addons/fzxcxt/store/goodsDetail',
			method: "POST",
			data
		})
	},



	// 商品规格
	storeitem(data) {
		return request({
			url: 'addons/fzxcxt/store/item',
			method: "POST",
			data
		})
	},

	// 多规格价格
	storeitemPrice(data) {
		return request({
			url: 'addons/fzxcxt/store/itemPrice',
			method: "POST",
			data
		})
	},

	// 加入购物车
	joinCar(data) {
		return request({
			url: 'addons/fzxcxt/order/joinCar',
			method: "POST",
			data
		})
	},

	// 购物车列表
	carList(data) {
		return request({
			url: 'addons/fzxcxt/order/carList',
			method: "POST",
			data
		})
	},


	// 清空购物车
	carempty(data) {
		return request({
			url: 'addons/fzxcxt/order/empty',
			method: "POST",
			data
		})
	},

	// 购物车：增加减少数量
	orderReduce(data) {
		return request({
			url: 'addons/fzxcxt/order/reduce',
			method: "POST",
			data
		})
	},

	// 预创建订单
	orderPrecreate(data) {
		return request({
			url: 'addons/fzxcxt/order/precreate',
			method: "POST",
			data
		})
	},

	// 可用优惠券
	couponUsable(data) {
		return request({
			url: 'addons/fzxcxt/coupon/usable',
			method: "POST",
			data
		})
	},

	// 创建订单
	couponCreate(data) {
		return request({
			url: 'addons/fzxcxt/order/create',
			method: "POST",
			data
		})
	},

	// 支付订单
	orderPay(data) {
		return request({
			url: 'addons/fzxcxt/order/pay',
			method: "POST",
			data
		})
	},

	// 商品搜索
	goodsSearch(data) {
		return request({
			url: 'addons/fzxcxt/store/goodsSearch',
			method: "POST",
			data
		})
	},



	// ------------------我的---------------------
	// 优惠券
	couponList(data) {
		return request({
			url: 'addons/fzxcxt/coupon/couponList',
			method: "POST",
			data
		})
	},

	// 领取优惠券
	draw(data) {
		return request({
			url: 'addons/fzxcxt/coupon/draw',
			method: "POST",
			data
		})
	},
	// 我的优惠券
	myCouponList(data) {
		return request({
			url: 'addons/fzxcxt/coupon/list',
			method: "POST",
			data
		})
	},
	// 收货地址
	addressList(data) {
		return request({
			url: 'addons/fzxcxt/address/list',
			method: "POST",
			data
		})
	},


	// 添加收货地址
	addressadd(data) {
		return request({
			url: 'addons/fzxcxt/address/add',
			method: "POST",
			data
		})
	},

	// 修改收货地址
	addressexec(data) {
		return request({
			url: 'addons/fzxcxt/address/exec',
			method: "POST",
			data
		})
	},
	// 删除收货地址
	addressdel(data) {
		return request({
			url: 'addons/fzxcxt/address/del',
			method: "POST",
			data
		})
	},

	// 消费记录
	recharges(data) {
		return request({
			url: 'addons/fzxcxt/order/recharges',
			method: "POST",
			data
		})
	},
	// 次数消费记录
	wash_record(data) {
		return request({
			url: 'addons/fzxcxt/order/wash_record',
			method: "POST",
			data
		})
	},

	// 充值余额记录
	rechargeList(data) {
		return request({
			url: 'addons/fzxcxt/order/rechargeList',
			method: "POST",
			data
		})
	},

	/** 分销：我的下级 */
	referralTeamList(data) {
		return request({
			url: 'addons/fzxcxt/referral/team_list',
			method: "POST",
			data
		})
	},
	/** 分销：佣金入账记录 */
	referralCommissionLog(data) {
		return request({
			url: 'addons/fzxcxt/referral/commission_log',
			method: "POST",
			data
		})
	},
	/** 分销：推广 SunCode URL */
	referralInviteQr(data) {
		return request({
			url: 'addons/fzxcxt/referral/invite_qrcode',
			method: "POST",
			data
		})
	},
	/** 分销：状态汇总 */
	referralStatus(data) {
		return request({
			url: 'addons/fzxcxt/referral/referral_status',
			method: "POST",
			data
		})
	},
	/** 分销：团长权益长图 */
	referralLeaderBenefits(data) {
		return request({
			url: 'addons/fzxcxt/referral/leader_benefits',
			method: "POST",
			data
		})
	},

	// 驰友币兑换
	coinBalance(data) {
		return request({
			url: 'addons/fzxcxt/coin/balance',
			method: "POST",
			data
		})
	},
	coinGoodsList(data) {
		return request({
			url: 'addons/fzxcxt/coin/goods_list',
			method: "POST",
			data
		})
	},
	coinExchange(data) {
		return request({
			url: 'addons/fzxcxt/coin/exchange',
			method: "POST",
			data
		})
	},
	coinMyList(data) {
		return request({
			url: 'addons/fzxcxt/coin/my_list',
			method: "POST",
			data
		})
	},
	coinDetail(data) {
		return request({
			url: 'addons/fzxcxt/coin/detail',
			method: "POST",
			data
		})
	},
	coinUnreadCount(data) {
		return request({
			url: 'addons/fzxcxt/coin/unread_count',
			method: "POST",
			data
		})
	},
	messageList(data) {
		return request({
			url: 'addons/fzxcxt/message/list',
			method: "POST",
			data
		})
	},
	messageDetail(data) {
		return request({
			url: 'addons/fzxcxt/message/detail',
			method: "POST",
			data
		})
	},
	messageUnreadCount(data) {
		return request({
			url: 'addons/fzxcxt/message/unread_count',
			method: "POST",
			data
		})
	},
	messageRead(data) {
		return request({
			url: 'addons/fzxcxt/message/read',
			method: "POST",
			data
		})
	},
	messageReadAll(data) {
		return request({
			url: 'addons/fzxcxt/message/read_all',
			method: "POST",
			data
		})
	},



	// -----------------------订单------------------
	// 订单列表
	orderList(data) {
		return request({
			url: 'addons/fzxcxt/order/list',
			method: "POST",
			data
		})
	},

	// 取消订单
	orderCancel(data) {
		return request({
			url: 'addons/fzxcxt/order/cancel',
			method: "POST",
			data
		})
	},

	// 申请退款
	refund(data) {
		return request({
			url: 'addons/fzxcxt/business/refund',
			method: "POST",
			data
		})
	},
	// 订单详情
	orderDetail(data) {
		return request({
			url: 'addons/fzxcxt/order/detail',
			method: "POST",
			data
		})
	},

	//----------------------------商家-------------------------------

	// 店铺中心数据
	storeIndex(data) {
		return request({
			url: 'addons/fzxcxt/store.index/index',
			method: "POST",
			data
		})
	},
	// 修改店铺营业状态
	switchStore(data) {
		return request({
			url: 'addons/fzxcxt/store.index/switchStore',
			method: "POST",
			data
		})
	},

	// 店铺认证
	store_authentication(data) {
		return request({
			url: 'addons/fzxcxt/business/store_authentication',
			method: "POST",
			data
		})
	},

	// 商品分类列表
	categoryList(data) {
		return request({
			url: 'addons/fzxcxt/store.type/categoryList',
			method: "POST",
			data
		})
	},

	// 新增分类列表
	execCategory(data) {
		return request({
			url: 'addons/fzxcxt/store.type/execCategory',
			method: "POST",
			data
		})
	},

	// 删除分类
	delCategory(data) {
		return request({
			url: 'addons/fzxcxt/store.type/delCategory',
			method: "POST",
			data
		})
	},


	// 商品列表
	goodsList(data) {
		return request({
			url: 'addons/fzxcxt/store.goods/goodsList',
			method: "POST",
			data
		})
	},


	// 商品上下架
	goodsStatusSwitch(data) {
		return request({
			url: 'addons/fzxcxt/store.goods/goodsStatusSwitch',
			method: "POST",
			data
		})
	},

	// 添加商品
	addGoods(data) {
		return request({
			url: 'addons/fzxcxt/store.goods/addGoods',
			method: "POST",
			data
		})
	},
	// 修改商品
	editGoods(data) {
		return request({
			url: 'addons/fzxcxt/store.goods/editGoods',
			method: "POST",
			data
		})
	},
	// 商品详情
	storegoodsDetail(data) {
		return request({
			url: 'addons/fzxcxt/store.goods/goodsDetail',
			method: "POST",
			data
		})
	},



	// 规格列表
	specList(data) {
		return request({
			url: 'addons/fzxcxt/store.goods_spec/specList',
			method: "POST",
			data
		})
	},
	// 添加编辑规格列表
	execSpec(data) {
		return request({
			url: 'addons/fzxcxt/store.goods_spec/execSpec',
			method: "POST",
			data
		})
	},
	// 删除规格项
	delSpec(data) {
		return request({
			url: 'addons/fzxcxt/store.goods_spec/delSpec',
			method: "POST",
			data
		})
	},

	// 添加/编辑规格参数
	execSpecItem(data) {
		return request({
			url: 'addons/fzxcxt/store.goods_spec/execSpecItem',
			method: "POST",
			data
		})
	},


	// 删除规格参数
	delSpecItem(data) {
		return request({
			url: 'addons/fzxcxt/store.goods_spec/delSpecItem',
			method: "POST",
			data
		})
	},



	// 收银台订单详情
	payOrderInfo(data) {
		return request({
			url: 'addons/fzxcxt/order/payOrderInfo',
			method: "POST",
			data
		})
	},
	// 订单绑定
	bind_order(data) {
		return request({
			url: 'addons/fzxcxt/order/bind_order',
			method: "POST",
			data
		})
	},





	// 我的钱包
	wallet(data) {
		return request({
			url: 'addons/fzxcxt/store.wallet/index',
			method: "POST",
			data
		})
	},

	// 提现
	withdrawal(data) {
		return request({
			url: 'addons/fzxcxt/business/withdrawal',
			method: "POST",
			data
		})
	},

	// 商家提现记录
	withdrawal_detail(data) {
		return request({
			url: 'addons/fzxcxt/business/withdrawal_detail',
			method: "POST",
			data
		})
	},



	// 添加银行卡
	add_withdrawal_account(data) {
		return request({
			url: 'addons/fzxcxt/business/add_withdrawal_account',
			method: "POST",
			data
		})
	},


	// 银行卡列表
	withdrawal_account_list(data) {
		return request({
			url: 'addons/fzxcxt/business/withdrawal_account_list',
			method: "POST",
			data
		})
	},


	// 商家中心我的订单
	storeOrderList(data) {
		return request({
			url: 'addons/fzxcxt/store.order/list',
			method: "POST",
			data
		})
	},

	// 商家中心我的订单详情
	storeOrderdetail(data) {
		return request({
			url: 'addons/fzxcxt/store.order/detail',
			method: "POST",
			data
		})
	},




	// 商家中心我的订单发货
	express(data) {
		return request({
			url: 'addons/fzxcxt/store.order/express',
			method: "POST",
			data
		})
	},
	// 门店确认收到货（安装订单等）
	storeReceiveGoods(data) {
		return request({
			url: 'addons/fzxcxt/store.order/receive_goods',
			method: "POST",
			data
		})
	},
	// 门店确认用户到店/可安装
	storeConfirmUserArrived(data) {
		return request({
			url: 'addons/fzxcxt/store.order/confirm_user_arrived',
			method: "POST",
			data
		})
	},
	saveInstallFinishImages(data) {
		return request({
			url: 'addons/fzxcxt/store.order/save_install_finish_images',
			method: "POST",
			data
		})
	},




	// 快递公司
	expressList(data) {
		return request({
			url: 'addons/fzxcxt/store.order/expressList',
			method: "POST",
			data
		})
	},

	// 拒绝退款
	resold_order(data) {
		return request({
			url: 'addons/fzxcxt/business/resold_order',
			method: "POST",
			data
		})
	},

	// 同意退款
	refund_order(data) {
		return request({
			url: 'addons/fzxcxt/business/refund_order',
			method: "POST",
			data
		})
	},

	// 数据统计
	statistics(data) {
		return request({
			url: 'addons/fzxcxt/store.index/statistics',
			method: "POST",
			data
		})
	},


	// 收银台列表
	storecarList(data) {
		return request({
			url: 'addons/fzxcxt/store.Checkstand/carList',
			method: "POST",
			data
		})
	},

	// 加入收银台
	storejoinCar(data) {
		return request({
			url: 'addons/fzxcxt/store.Checkstand/joinCar',
			method: "POST",
			data
		})
	},

	// 清空收银台
	storeempty(data) {
		return request({
			url: 'addons/fzxcxt/store.Checkstand/empty',
			method: "POST",
			data
		})
	},

	// 增加减少数量
	storereduce(data) {
		return request({
			url: 'addons/fzxcxt/store.Checkstand/reduce',
			method: "POST",
			data
		})
	},

	// 二维码支付
	scan_pay(data) {
		return request({
			url: 'addons/fzxcxt/order/scan_pay',
			method: "POST",
			data
		})
	},

	// 扫码支付
	pay_code(data) {
		return request({
			url: 'addons/fzxcxt/order/pay_code',
			method: "POST",
			data
		})
	},

	// 订单核销
	check_order(data) {
		return request({
			url: 'addons/fzxcxt/order/check_order',
			method: "POST",
			data
		})
	},

	// 洗车核销
	wash_code(data) {
		return request({
			url: 'addons/fzxcxt/order/wash_code',
			method: "POST",
			data
		})
	},




	// -------------------------洗车--------------------------

	// 洗车套餐列表
	washList(data) {
		return request({
			url: 'addons/fzxcxt/wash/list',
			method: "POST",
			data
		})
	},
	// 购买洗车套餐
	buyPackage(data) {
		return request({
			url: 'addons/fzxcxt/wash/buyPackage',
			method: "POST",
			data
		})
	},

	// 洗车套餐购买记录
	buyPackageList(data) {
		return request({
			url: 'addons/fzxcxt/wash/buyPackageList',
			method: "POST",
			data
		})
	},

	// 洗车套餐列表
	wash_carList(data) {
		return request({
			url: 'addons/fzxcxt/store.wash_car/list',
			method: "POST",
			data
		})
	},

	//删除 洗车套餐
	delwash_car(data) {
		return request({
			url: 'addons/fzxcxt/store.wash_car/del',
			method: "POST",
			data
		})
	},
	//添加 洗车套餐
	execwash_car(data) {
		return request({
			url: 'addons/fzxcxt/store.wash_car/exec',
			method: "POST",
			data
		})
	},

	//门店套餐记录
	store_package_list(data) {
		return request({
			url: 'addons/fzxcxt/user/store_package_list',
			method: "POST",
			data
		})
	},

	//门店套餐消费记录
	store_package_record(data) {
		return request({
			url: 'addons/fzxcxt/user/store_package_record',
			method: "POST",
			data
		})
	},

	// --------------分销-------------------
	// 代理中心
	distributionIndex(data) {
		return request({
			url: 'addons/fzxcxt/distribution/index',
			method: "POST",
			data
		})
	},
	// 提现记录
	drawLog(data) {
		return request({
			url: 'addons/fzxcxt/distribution/drawLog',
			method: "POST",
			data
		})
	},
	// 发起提现
	distributionDraw(data) {
		return request({
			url: 'addons/fzxcxt/distribution/draw',
			method: "POST",
			data
		})
	},


	// 我的团队列表
	teamlist(data) {
		return request({
			url: 'addons/fzxcxt/distribution/teamlist',
			method: "POST",
			data
		})
	},

	// 我的团队
	distributionTeam(data) {
		return request({
			url: 'addons/fzxcxt/distribution/team',
			method: "POST",
			data
		})
	},

	// 推广海报
	distlist(data) {
		return request({
			url: 'addons/fzxcxt/distribution/distlist',
			method: "POST",
			data
		})
	},

	// 佣金明细
	detailed(data) {
		return request({
			url: 'addons/fzxcxt/distribution/detailed',
			method: "POST",
			data
		})
	},


	// -------------绑定车牌号--------------------

	// 绑定车牌号
	execCarNumber(data) {
		return request({
			url: 'addons/fzxcxt/car/execCarNumber',
			method: "POST",
			data
		})
	},
	// 车牌号列表
	carnumList(data) {
		return request({
			url: 'addons/fzxcxt/car/carList',
			method: "POST",
			data
		})
	},

	// 删除车牌号
	delCarNumber(data) {
		return request({
			url: 'addons/fzxcxt/car/delCarNumber',
			method: "POST",
			data
		})
	},

	// -------------------积分-------------------
	// 商品列表
	pointList(data) {
		return request({
			url: 'addons/fzxcxt/point/list',
			method: "POST",
			data
		})
	},
	// 商品分类
	pointType(data) {
		return request({
			url: 'addons/fzxcxt/point/type',
			method: "POST",
			data
		})
	},

	// 商品明细
	pointdetailed(data) {
		return request({
			url: 'addons/fzxcxt/point/detailed',
			method: "POST",
			data
		})
	},

	// 商品兑换记录
	pointdeTake(data) {
		return request({
			url: 'addons/fzxcxt/point/take',
			method: "POST",
			data
		})
	},

	// 商品详情
	pointdeDetail(data) {
		return request({
			url: 'addons/fzxcxt/point/detail',
			method: "POST",
			data
		})
	},

	// 兑换商品
	exchange(data) {
		return request({
			url: 'addons/fzxcxt/point/exchange',
			method: "POST",
			data
		})
	},
	// 兑换商品
	take_detail(data) {
		return request({
			url: 'addons/fzxcxt/point/take_detail',
			method: "POST",
			data
		})
	},
	// 确认收货
	affirm(data) {
		return request({
			url: 'addons/fzxcxt/order/confirm',
			method: "POST",
			data
		})
	},
	// 用户确认安装完成（门店安装订单 status=13 → 已完成）
	confirmInstallFinish(data) {
		return request({
			url: 'addons/fzxcxt/order/confirm_install_finish',
			method: "POST",
			data
		})
	},
	// 新订单
	notice_order(data) {
		return request({
			url: 'addons/fzxcxt/order/notice_order',
			method: "POST",
			data
		})
	},
	// 订单已读
	notice_read(data) {
		return request({
			url: 'addons/fzxcxt/order/notice_read',
			method: "POST",
			data
		})
	},
	// 收益明细
	revenue(data) {
		return request({
			url: 'addons/fzxcxt/business/revenue',
			method: "POST",
			data
		})
	},
	// 店铺配置
	store_config(data) {
		return request({
			url: 'addons/fzxcxt/business/store_config',
			method: "POST",
			data
		})
	},
	
	//预约时间
	maketime(data) {
		return request({
			url: 'addons/fzxcxt/reserve_order/times',
			method: "POST",
			data
		})
	},
	
	
	//预约洗车
	reserveCarWash(data) {
		return request({
			url: 'addons/fzxcxt/reserve_order/reserve',
			method: "POST",
			data
		})
	},
	
	
	// 订单已读
	notice_read(data) {
		return request({
			url: 'addons/fzxcxt/order/notice_read',
			method: "POST",
			data
		})
	},
	
	//预约列表
	userorferlists(data) {
		return request({
			url: 'addons/fzxcxt/reserve_order/list',
			method: "POST",
			data
		})
	},
	
	//门店预约记录
	reservationlists(data) {
		return request({
			url: 'addons/fzxcxt/store.reserve_order/list',
			method: "POST",
			data
		})
	},
	//确认洗车完成
	confirmwash(data) {
		return request({
			url: 'addons/fzxcxt/store.reserve_order/cleaned',
			method: "POST",
			data
		})
	},
	
	
	//线下确认洗车完成
	confirmwashB(data) {
		return request({
			url: 'addons/fzxcxt/store.reserve_order/offline',
			method: "POST",
			data
		})
	},
	
}