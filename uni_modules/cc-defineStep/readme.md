# cc-defineStep 

##uniapp专属精品组件页面模板（由前端组件开发出品）精品组件页面模板

###●组件模板规划：
由前端组件开发出品的精品组件页面模板，将陆续发布，预计高达约几百种供您使用，是快速快发项目、创业的必备精品。

合集地址： uni-app模板合集地址：(https://ext.dcloud.net.cn/publisher?id=274945) 如查看全部页面模板，请前往上述uniapp插件市场合集地址；

###●组件模板效果图：
可下载项目后预览，效果图见右侧图片；

###●组件模板费用：
学习：免费下载，进行学习，无费用；

使用/商用：本页面地址赞赏10元后，可终身商用；

###●组件模板使用版权/商用：
本组件模板免费下载可供学习，如需使用及商用，请在本组件页面模板进行赞赏10元

（仅需10元获取精品页面模板代码-物有所值，1个组件页面市场价100元 ）

赞赏10后（当前项目产生赞赏订单可追溯）即可终身商用当前本地址下载的页面模版代码，不同下载地址需进行不同的赞赏。（不赞赏就进行商用使用者，面临侵权！保留追究知识产权法律责任！后果自负！）


 
### 我的技术微信公众号

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)


#### 使用方法 
```使用方法
<!-- colors: 设置主题色 stepData:步骤数据 -->
<cc-defineStep :colors="colors" :stepData="stepData"></cc-defineStep>

	<!-- 数据设置 -->
	colors:"#fa436a",
	//模拟后台返回的数据
	stepData: [ 
		{
			name: '提交申请',
			time: '2023-06-09 20:01:49',
			isNow: 0,
			type: 1,
			desc: '不想要了'
		},
		{
			name: '等待审核',
			time: '2023-06-09 20:01:49',
			isNow: 0,
			type: 1,
			desc: '您的服务单已申请成功，待售后审核中'
		},
		{
			name: '审核意见',
			time: '2023-06-09 20:13:49',
			isNow: 0,
			type: 1,
			desc: '您的售后单已收到，会在24小时与您联系。'
		},
		{
			name: '审核上门取件',
			time: '2023-06-09 20:13:49',
			isNow: 0,
			type: 1,
			desc: '您的服务单已预约时间2023-06-10(周日) 15:00-20:00'
		},
		{
			name: '取件成功',
			time: '2023-06-10 18:54:55',
			isNow: 0,
			type: 1,
			desc: '您的商品已取件成功'
		},
		{
			name: '商家售后已收到',
			time: '2023-06-12 09:01:49',
			isNow: 0,
			type: 1,
			desc: '您的服务单商品已收到'
		},
		{
			name: '返修换新订单生产',
			time: '2023-06-12 13:19:49',
			isNow: 0,
			type: 1,
			desc: '您的服务订单已生成新的订单'
		},
		{
			name: '返修换新完成',
			time: '2023-06-13 12:12:49',
			isNow: 1,
			type: 1,
			desc: '您的服务单已完成，如有疑问请反馈，谢谢~，欢迎再次光临'
		},
	]	
					


```

#### HTML代码实现部分
```html
<template>
	
	<!-- colors: 设置主题色 stepData:步骤数据 -->
	<cc-defineStep :colors="colors" :stepData="stepData"></cc-defineStep>
	
</template>

<script>
	export default {

		data() {
			return {
				
				colors:"#fa436a",
				//模拟后台返回的数据
				stepData: [ 
					{
						name: '提交申请',
						time: '2023-06-09 20:01:49',
						isNow: 0,
						type: 1,
						desc: '不想要了'
					},
					{
						name: '等待审核',
						time: '2023-06-09 20:01:49',
						isNow: 0,
						type: 1,
						desc: '您的服务单已申请成功，待售后审核中'
					},
					{
						name: '审核意见',
						time: '2023-06-09 20:13:49',
						isNow: 0,
						type: 1,
						desc: '您的售后单已收到，会在24小时与您联系。'
					},
					{
						name: '审核上门取件',
						time: '2023-06-09 20:13:49',
						isNow: 0,
						type: 1,
						desc: '您的服务单已预约时间2023-06-10(周日) 15:00-20:00'
					},
					{
						name: '取件成功',
						time: '2023-06-10 18:54:55',
						isNow: 0,
						type: 1,
						desc: '您的商品已取件成功'
					},
					{
						name: '商家售后已收到',
						time: '2023-06-12 09:01:49',
						isNow: 0,
						type: 1,
						desc: '您的服务单商品已收到'
					},
					{
						name: '返修换新订单生产',
						time: '2023-06-12 13:19:49',
						isNow: 0,
						type: 1,
						desc: '您的服务订单已生成新的订单'
					},
					{
						name: '返修换新完成',
						time: '2023-06-13 12:12:49',
						isNow: 1,
						type: 1,
						desc: '您的服务单已完成，如有疑问请反馈，谢谢~，欢迎再次光临'
					},
				]
			}
		},
		onLoad() {
			// 步骤数组数据反序
			this.stepData.reverse()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>



```