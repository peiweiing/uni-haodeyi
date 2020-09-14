<template>
	<view class="container">
		<view class="bgcImg">
			
		</view>
		<!--banner-->
		<view class="tui-banner-box">
			<swiper
				:indicator-dots="true"
				:autoplay="true"
				:interval="5000"
				:duration="150"
				class="tui-banner-swiper"
				:circular="true"
				previous-margin="60rpx"
				next-margin="60rpx"
			>
				<swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-item">
					<!-- <image
						:src="'https://thorui.cn/images/mall/banner/' + item"
						class="tui-slide-image"
						:class="[current != index ? 'tui-banner-scale' : '']"
						mode="scaleToFill"
						lazy-load
						@tap="swiper"
					/> -->
					<image
						:src="item"
						class="tui-slide-image"
						:class="[current != index ? 'tui-banner-scale' : '']"
						mode="scaleToFill"
						lazy-load
						@tap="swiper"
					/>
				</swiper-item>
			</swiper>
		</view>
		<!--banner-->
		
		<view class="tui-rolling-news">
			<tui-icon name="news-fill" :size='28' color='#5677fc'></tui-icon>
			<swiper vertical autoplay circular interval="3000" class="tui-swiper">
				<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item">
					<view class="tui-news-item" @tap='newdetail'>{{item.ch_content}}</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="tui-product-box">
			<view class="tui-block__box tui-mtop__20">
				<view class="tui-group-name" @tap="more">
					<view>
						<text>排行榜</text>
						<text class="tui-sub__desc">大家都在买</text>
					</view>
				<!-- 	<view class="tui-more__box">
						<text>更多</text>
						<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
					</view> -->
				</view>
				<view class="tui-new-box">
					<view class="tui-new-item" :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']" v-for="(item, index) in newProduct"
					 :key="index" @tap="detail(item.g_id)" v-if="isShow">
						<image :src="'/static/images/mall/new/' + (item.type == 1 ? 'new' : 'new') + '.png'" class="tui-new-label"></image>
						<view class="tui-title-box">
							<view class="tui-new-title">{{ item.g_title }}</view>
							<view class="tui-new-price FY-c">
								<text class="tui-new-present">￥{{ item.g_price }}</text>
								<!-- <text class="tui-new-original">￥{{ item.original }}</text> -->
							</view>
						</view>
						<!-- <image :src="'/static/images/mall/new/' + item.pic" class="tui-new-img"></image> -->
						<image :src="item.g_pic" class="tui-new-img"></image>
					</view>
				</view>
				<view class="FY FY-c FX-c" v-if="isShow==false" style="font-size: 16px;width: 100%;min-height: calc(10vh);">
					<tui-icon name="nodata" size="60" color="#999"></tui-icon>
					暂无内容
				</view>
			</view>
		</view>
		
		<view class="tui-product-box">
			<view class="tui-title__img">
				<image src="../../static/img/goodslist.png" mode="widthFix"></image>
			</view>
			<view class="tui-product-list" v-if="isShows">
				<view class="tui-product-container">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.g_id)">
							<image :src="item.g_pic" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.g_title }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.g_price }}</text>
										<!-- <text class="tui-factory-price">￥{{ item.g_price }}</text> -->
									</view>
									<!-- <view class="tui-pro-pay FX-sa">
										<tui-button type="green" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">买入</tui-button>
										<tui-button type="tomato" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">卖出</tui-button>
									</view> -->
								</view>
							</view>
						</view>
						<!--商品列表-->
						<!-- <template is="productItem" data="{{item,index:index}}" /> -->
					</block>
				</view>
				<view class="tui-product-container">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 == 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.g_id)">
							<image :src="item.g_pic" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.g_title }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.g_price }}</text>
										<!-- <text class="tui-factory-price">￥{{ item.g_price }}</text> -->
									</view>
									<!-- <view class="tui-pro-pay FX-sa">
										<tui-button type="green" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">买入</tui-button>
										<tui-button type="tomato" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">卖出</tui-button>
									</view> -->
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
			</view>
			<view class="FY FY-c FX-c" v-if="isShows==false" style="font-size: 16px;width: 100%;min-height: calc(40vh);background-color: #fff;border-radius: 20rpx;">
				<tui-icon name="nodata" size="60" color="#999"></tui-icon>
				暂无内容
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import App from '../../App.vue'

	export default {
		data() {
			return {
				isShow:true,
				isShows:true,
				current: 0,
				// banner: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
				banner: ['../../static/img/swiper01.jpg', '../../static/img/swiper02.jpg'],
				newsList: [
					"致力发展负责任的人工智能 中国发布八大治理原则",
					"格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气",
					"阿里计划将每股普通股拆为8股，增加筹资灵活性"
				],
				newProduct: [
					// {url:'../list/distGoodsDetail',name: '丽醒海带精萃饮植物饮品',present: 68.00,original: 98,pic: '1.jpg',type: 1,isLabel: true,img:'../../static/img/s001.png'},
					// {url:'../list/distGoodsDetails',name: '大佑生宝小分子海参饮品',present: 598.00,original: 899,pic: '2.jpg',type: 2,isLabel: true,img:'../../static/img/s002.png'}
				],
				productList: [
					// {img: "../../static/img/s02.jpg",name: '大佑生宝小分子海参饮品',sale: 598.00,factory: 899,payNum: 2342},
					// {img: "../../static/img/01.jpg",name: ' 丽醒海带精萃饮植物饮品',sale: 68.00,factory: 98,payNum: 999},
				],
			}
		},
		onShow() {
			var that =this;
		
			this.sendRequest({
				url :App.getchannel,
				data:{'type':2},
				method:'POST',
				success : function(res){
					console.log("getchannel success:" + JSON.stringify(res));
				   that.newsList=res.data;
				},
				fail:function(e){
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
			this.sendRequest({
				url :App.sortgoods,					
				method:'POST',
				success : function(res){
					console.log("getchannel success:" + JSON.stringify(res));
				   that.newProduct=res.data;
				},
				fail:function(e){
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
			this.sendRequest({
				url :App.list,
				method:'POST',
				success : function(res){
					console.log("getchannel success:" + JSON.stringify(res));
				   that.productList=res.data;
				},
				fail:function(e){
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
			
			// uni.getStorage({
			// 	key: 'token',
			// 	success: function (res) {
			// 		console.log(res)
			// 		var getres = res.data;
			// 		uni.request({
			// 			url: 
			// 			method: 'POST',
			// 			header: {'Authorization':getres},
			// 			data:,
			// 			success: (res) => {
			// 				console.log(res.data);
			// 				that.newsList=res.data.data;
			// 			}
			// 		});
			// 		uni.request({
			// 			url: App.sortgoods,
			// 			method: 'POST',
			// 			header: {'Authorization':getres},
			// 			success: (res) => {
			// 				if(res.data.data.length){
			// 					that.isShow = true;
			// 				}else{
			// 					that.isShow = false;
			// 				}
			// 				console.log(res.data);
			// 				that.newProduct=res.data.data;
			// 			},
			// 			fail:(err)=>{
			// 				that.isShow=false;
			// 			}
			// 		});
			// 		uni.request({
			// 			url: App.list,
			// 			method: 'POST',
			// 			header: {'Authorization':getres},
			// 			success: (res) => {
			// 				if(res.data.data.length){
			// 					that.isShows = true;
			// 				}else{
			// 					that.isShows = false;
			// 				}
			// 				console.log(res.data);
			// 				that.productList=res.data.data;
			// 				if(res.data.status==401){
			// 					uni.showModal({
			// 						title: '提示',
			// 						content: '登录已过期，请重新登录',
			// 						success: function (res) {
			// 							if (res.confirm) {
			// 								uni.reLaunch({
			// 									url: 'pages/login/login',
			// 								})
			// 								console.log('用户点击确定');
			// 							} else if (res.cancel) {
			// 								uni.showToast({
			// 									title: '10秒后自动跳转至登录页面',
			// 									duration: 2000
			// 								});
			// 								setTimeout(function(){
			// 									uni.reLaunch({
			// 										url: 'pages/login/login',
			// 									})
			// 								},10000)
			// 								console.log('用户点击取消');
			// 							}
			// 						}
			// 					});
			// 				}
			// 			},
			// 			fail:(err)=>{
			// 				that.isShows=false;
			// 			}
			// 		});
			// 	},
			// 	fail:(err)=>{
			// 		console.log(err)
			// 		uni.reLaunch({
			// 			url: '../login/login',
			// 		})
			// 	}
			// })
		},
		methods: {	
			// change: function(e) {
			// 	this.current = e.detail.current;
			// },
			swiper(e){
				console.log(e)
			},
			detail: function(e) {
				uni.navigateTo({
					url: '/pages/list/distGoodsDetail?id='+e,
				});
			},
			newdetail(e) {
				this.tui.toast('详情功能尚未完善~')
			},
			more: function(e) {
				let key = e.currentTarget.dataset.key || '';
				uni.navigateTo({
					url: '../productList/productList?searchKey=' + key
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.container {
	min-height: calc(100vh);
	padding-bottom: 100rpx;
	box-sizing: border-box;
	background-color: #EDEDED;
	.bgcImg{
		height: 200rpx;
	}
	.divcs{
		background-color: #fff;
		margin: 5%;
		border-radius: 20rpx;
		.tui-grids{
			border-radius: 20rpx;
		}
	}
}

/*banner*/

.tui-banner-box {
	width: 100%;
	margin-top: -25%;
	box-sizing: border-box;
	/* background: #fff; */
}

.tui-banner-swiper {
	width: 100%;
	height: 240rpx;
}

.tui-banner-item {
	padding: 0 16rpx;
	box-sizing: border-box;
}

.tui-slide-image {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 12rpx;
	/* transition: all 0.1s linear; */
}

.tui-banner-scale {
	transform: scaleY(0.9);
	transform-origin: center center;
}

/* #ifdef MP-WEIXIN */
.tui-banner-swiper .wx-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

.tui-banner-swiper .wx-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

.tui-banner-swiper .wx-swiper-dot-active::before {
	background: #fff;
}

.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
	width: 16rpx;
}

/* #endif */

/* #ifndef MP-WEIXIN */
>>> .tui-banner-swiper .uni-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

>>> .tui-banner-swiper .uni-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

>>> .tui-banner-swiper .uni-swiper-dot-active::before {
	background: #fff;
}

>>> .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
	width: 16rpx;
}

/* #endif */
/*banner*/


	.tui-rolling-news {
		width: 100%;
		margin: 6% 0;
		padding: 4% 2%;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.tui-swiper {
		font-size: 28rpx;
		height: 50rpx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}



	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
	}
	.tui-title__img {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		justify-content: center;
	}
	.tui-title__img image {
		width: 352rpx;
		height: 32rpx;
	}
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
	}
	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}
	.tui-product-container:last-child {
		margin-right: 0;
	}
	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}
	.tui-pro-img {
		width: 100%;
		display: block;
	}
	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}
	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.tui-pro-price {
		padding-top: 18rpx;
	}
	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}
	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}
	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
	.tui-block__box {
		width: 100%;
		padding: 0 25rpx 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.tui-mtop__20 {
		margin-top: 20rpx;
	}
	.tui-group-name {
		width: 100%;
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}

	.tui-sub__desc {
		color: #34c7a9;
		font-size: 28rpx;
		font-weight: 400;
		padding-left: 25rpx;
	}
	.tui-more__box {
		display: flex;
		align-items: center;
		font-weight: 400;
		color: #999;
	}
	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.tui-new-item {
		width: 49%;
		height: 180rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #f5f2f9;
		position: relative;
		border-radius: 12rpx;
	}
	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	.tui-new-mtop {
		margin-top: 2%;
	}
	.tui-title-box {
		font-size: 24rpx;
	}
	.tui-new-title {
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.tui-new-price {
		padding-top: 18rpx;
	}
	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}
	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
		transform: scale(0.8);
		transform-origin: center center;
	}
	.tui-new-img {
		width: 148rpx;
		height: 148rpx;
		display: block;
		flex-shrink: 0;
	}
</style>
