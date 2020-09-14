<template>
	<view class="container">
		<view class="product-list">
			<!--商品列表-->
			<view class="pro-item" @tap="detail(item.g_id)" v-for="(item,index) in productList" :key="index" v-if="isShow">
				<image :src="item.g_pic" class="pro-img" mode="widthFix" />
				<view class="pro-content">
					<view class="pro-tit">{{item.g_title}}</view>
					<view class="pro-price">
						<text class="sale-price">￥{{item.g_price}}</text>
						<!-- <text class="factory-price">￥{{item.factory}}</text> -->
					</view>
					<!-- <view class="btn-box FX-fe">
						<tui-button type="tomato" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="showModal">买入</tui-button>
					</view> -->
					<!-- <view class="btn-box">
						<tui-button shape="circle" shadow @click="showModal">从底部弹出</tui-button>
					</view> -->
				</view>
			</view>
			<!--商品列表-->
			
			<view class="FY FY-c FX-c" v-if="isShow==false" style="font-size: 16px;width: 100%;height: calc(80vh);">
				<tui-icon name="nodata" size="60" color="#999"></tui-icon>
				暂无内容
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
		
		<!--底部抽屉-->
		<!-- <tui-bottom-popup :show="bottomPopup" @close="hideModal">
			<view class="region-box">
				<view
					class="region-txt"
					:class="[index == regionArr.length - 3 || index == regionArr.length - 2 || index == regionArr.length - 1 ? 'grow' : '', tabIndex == index ? 'active' : '']"
					v-for="(item, index) in regionArr"
					:key="index"
					:data-index="index"
				>
					<text class="w40">{{ item }}</text>
				</view>
				<view class="FX-sb w100">
					<tui-button type="green" width="280rpx" height="90rpx" :size="32" @click="cancel">取消</tui-button>
					<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm">确定</tui-button>
				</view>
			</view>
		</tui-bottom-popup> -->
		
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				pageIndex: 1,
				isShow:true,
				bottomPopup: false,
				productList: [
					// {url:"../list/distGoodsDetails",img: "../../static/img/s02.jpg",name: '大佑生宝小分子海参饮品',sale: 598.00,factory: 899,payNum: 2342},
					// {url:"../list/distGoodsDetail",img: "../../static/img/01.jpg",name: ' 丽醒海带精萃饮植物饮品',sale: 68.00,factory: 98,payNum: 999},
				],
				regionArr: [
					'大佑生宝小分子','编码:16888802','批发价:¥598.00','批发资格:2份','买入数量：2份','合计:¥260.00',
				],
				regionTxt: '粤',
				tabIndex: 26,
				loadding: false,
				pullUpOn: true
			}
		},
		onShow() {
			var that =this;
			
			this.sendRequest({
				url :App.list,
				method:'POST',
				success : function(res){
					console.log("getchannel success:" + JSON.stringify(res));
					if(res.data.length){
						that.isShow = true;
					}else{
						that.isShow = false;
					}
				   that.productList=res.data;
				},
				fail:function(e){
					console.log("getchannel  fail:" + JSON.stringify(e));
					that.isShow=false;
				}
			});
		},
		methods: {
			detail(e) {
				uni.navigateTo({
					url: '../list/distGoodsDetail?id='+e
				})
			},
			showModal: function() {
				this.bottomPopup = true;
			},
			hideModal: function() {
				this.bottomPopup = false;
			},
			cancel: function() {
				this.bottomPopup = false;
			},
			// getRegion: function(e) {
			// 	const index = e.currentTarget.dataset.index;
			// 	this.regionTxt = this.regionArr[index];
			// 	this.tabIndex = index;
			// 	this.bottomPopup = false;
			// 	this.tui.toast('您选择了：' + this.regionArr[index]);
			// },
		},
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.productList = this.loadData;
				this.pageIndex = 1;
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				this.tui.toast("刷新成功")
			}, 200)
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 3) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				this.productList = this.productList.concat(this.loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.product-list {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 30rpx 30rpx 0 30rpx;
		background: #fff;
	}

	.pro-item {
		background: #fff;
		box-sizing: border-box;
		width: 49%;
		position: relative;
		margin-bottom: 2%;
	}

	.pro-item::after {
		content: '';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1rpx solid #eaeef1;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
	}

	.pro-img {
		width: 100%;
		display: block;
	}

	.pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
		/* height: 230rpx; */
	}

	.pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.pro-price {
		padding-top: 18rpx;
	}

	.sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #ea1500;
	}

	.factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
	.btn-box {
		position: relative;
		z-index: 9;
	}

	.btn-box:first-child {
		margin-top: 50rpx;
	}

	.d-container {
		width: 400rpx;
		padding: 80rpx 30rpx;
	}

/*底部抽屉样式 start*/

.region-box {
	width: 100%;
	padding: 10%;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
}

.region-txt {
	width: 45%;
	height: 82rpx;
	line-height: 82rpx;
	border-radius: 6rpx;
	font-size: 30rpx;
	color: #333;
	text-align: center;
	margin-bottom: 24rpx;
	/* flex-grow: 1; */
}

.region-txt:nth-of-type(6n) {
	margin-right: 0;
}

.grow {
	flex-grow: 0;
}


/*底部抽屉样式 end*/
</style>
