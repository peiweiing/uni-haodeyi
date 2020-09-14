<template>
	<view class="pickupProgress">
		<tui-tabs 
		class="pickuplist_tabs"
		:tabs="navbar"
		:currentTab="currentTab>1?0:currentTab"
		@change="changeTab"
		itemWidth="50%"
		></tui-tabs>
		<view class="" v-if="currentTab==0">
			<view class="entrusbuylist" v-for="item in dataList1" v-if="isShow1">
				<view class="entrusbuylist_left">
					<view class="entrusbuylist_left_img">
						<image :src="item.g_pic"></image>
					</view>
					<view class="entrusbuylist_left_text">
						{{item.g_code}}
					</view>
				</view>
				<view class="entrusbuylist_center" style="flex: 1;">
					<view class="entrusbuylist_right_title">{{item.g_title}}</view>
					<view class="entrusbuylist_right_price">
						<text>委托价:￥{{item.ut_price > 999999 ? "999999.00+" : item.ut_price}}</text>
						<text>数量:{{item.ut_num > 999 ? '999+' : item.ut_num}}份</text>
					</view>
				</view>
				<view class="entrusbuylist_right">
					<view class="tui-btn-box">
						<tui-button class="ntrusbuylist_right_button" type="bronze" plain @click="clickButton(item.ut_id)">
							撤销
						</tui-button>
					</view>
				</view>
			</view>
			
			<view class="FY FY-c FX-c" v-if="isShow1==false" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
		</view>
		<view class="" v-if="currentTab==1">
			<view class="entrusbuylist" v-for="item in dataList2" v-if="isShow2">
				<view class="entrusbuylist_left">
					<view class="entrusbuylist_left_img">
						<image :src="item.g_pic"></image>
					</view>
					<view class="entrusbuylist_left_text">
						{{item.g_code}}
					</view>
				</view>
				<view class="entrusbuylist_center" style="flex: 1;">
					<view class="entrusbuylist_right_title">{{item.g_title}}</view>
					<view class="entrusbuylist_right_price">
						<text>委托价:￥{{item.ut_price > 999999 ? "999999.00+" : item.ut_price}}</text>
						<text>数量:{{item.ut_num > 999 ? '999+' : item.ut_num}}份</text>
					</view>
				</view>
				<view class="entrusbuylist_right">
					<view class="tui-btn-box">
						<tui-button class="ntrusbuylist_right_button" type="bronze" plain @click="clickButtons(item.ut_id)">
							撤销
						</tui-button>
					</view>
				</view>
			</view>
			
			<view class="FY FY-c FX-c" v-if="isShow2==false" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
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
				navbar: [
					{name: "委托买入"},
					{name: "委托卖出"}
				],
				isShow1:true,
				isShow2:true,
				currentTab: 0,
				dataList:'',
				dataList1: [
					// {id: 1,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 16888801,button: "撤销"},
					// {id: 2,imgUrl: "../../static/img/s01.jpg",title: "丽醒海带精萃饮植物饮品",price: 68,num: 100,code: 16888802,button: "撤销"}
				],
				dataList2: [
					// {id: 2,imgUrl: "../../static/img/s01.jpg",title: "丽醒海带精萃饮植物饮品",price: 68,num: 100,code: 16888802,button: "撤销"}
				]
			}
		},
		onShow() {
			var that =this;
			
			this.sendRequest({
				url :App.mygetEntrusList,
				method:'POST',
				data:{'type':1},
				success : function(res){
					if(res.data.length){
						that.isShow1 = true;
					}else{
						that.isShow1 = false;
					}
					console.log("getchannel success:" + JSON.stringify(res));
					that.dataList1=res.data.data;
				},
				fail:function(e){
					that.isShow1=false;
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
			this.sendRequest({
				url :App.mygetEntrusList,
				method:'POST',
				data:{'type':2},
				success : function(res){
					if(res.data.length){
						that.isShow2 = true;
					}else{
						that.isShow2 = false;
					}
					console.log("getchannel success:" + JSON.stringify(res));
					that.dataList2=res.data.data;
				},
				fail:function(e){
					that.isShow2=false;
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
		},
		methods: {
			getList(type){	
				var that =this;
				this.sendRequest({
					url :App.mygetEntrusList,
					method:'POST',
					data:{'type':type},
					success : function(res){
						if(res.data.length){
							type==1? that.isShow1 = true: that.isShow2 = true;
						}else{
							type==1? that.isShow1 = true: that.isShow2 = true;
						}
						console.log(res.data);
						type==1? that.dataList1=res.data : that.dataList2=res.data;
					},
					fail:function(e){
						type==1? that.isShow1 = true: that.isShow2 = true;
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
			},
			changeTab(e) {
				this.currentTab = e.index
			},
			clickButton(e) {
				var that = this;
				this.sendRequest({
					url :App.revokePurchase,
					method:'POST',
					data:{'ut_id':e},
					success : function(res){
						if(res.data.length){
							that.isShow1 = true;
						}else{
							that.isShow1 = false;
						}
						console.log("getchannel success:" + JSON.stringify(res));
						that.dataList1=res.data.data;
						that.getList(1);
					},
					fail:function(e){
						that.isShow1=false;
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
				
				console.log(Math.random())
			},
			clickButtons(e) {
				var that = this;
				this.sendRequest({
					url :App.revokePurchase,
					method:'POST',
					data:{'ut_id':e},
					success : function(res){
						if(res.data.length){
							that.isShow2 = true;
						}else{
							that.isShow2 = false;
						}
						console.log("getchannel success:" + JSON.stringify(res));
						that.dataList2=res.data.data;
						that.getList(2);
					},
					fail:function(e){
						that.isShow2=false;
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
				
				
				console.log(Math.random())
			}
		},
		onPullDownRefresh() {
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width:100%;
		height:100%;
		background:rgba(238,238,238,1);
	}
	.entrusbuylist{
		padding: 18rpx 20rpx;
		height: 151rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		margin: 10rpx;
		.entrusbuylist_left{
			width:120rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.entrusbuylist_left_img{
				flex: 1;
				width:100%;
				height:100%;
				background:rgba(253,87,87,1);
				border-radius:6rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.entrusbuylist_left_text{
				font-size:20rpx;
				padding-top: 6rpx;
				color:rgba(102,102,102,1);
				transform: scale(0.8);
			}
		}
		.entrusbuylist_center{
			width: 100%;
			padding: 20rpx;
			padding-bottom: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.entrusbuylist_right_title{
				font-size: 26rpx;
				color:rgba(51,51,51,1);
			}
			.entrusbuylist_right_price{
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color:rgba(153,153,153,1);
			}
		}
		.entrusbuylist_right{
			display: flex;
			align-items: center;
			.ntrusbuylist_right_button{
				width: 160rpx !important;
				height:80rpx !important;
				font-size:22rpx !important;
				line-height:80rpx !important;
			}
		}
	}
</style>
