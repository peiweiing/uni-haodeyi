<template>
	<view id="entrusbuylist">
		<view class="" v-for="(v,i) in detail" v-if="debool==true">
			<buylist :imgUrl="v.g_pic" :code="v.g_code" :title="v.g_title" :price="v.ut_price" :num="v.stock_num" g_price="买入价" g_num="数量" button="买入" @click="showModal(v.g_id,v.ut_id)"></buylist>
		</view>
		<view class="FY FY-c FX-c" v-if="debool==false" style="font-size: 16px;height: calc(80vh);">
			<tui-icon name="nodata" size="60" color="#999"></tui-icon>
			暂无内容
		</view>
		
		<!--底部抽屉-->
		<tui-bottom-popup :show="bottomPopup" @close="hideModal">
			<view class="region-box">
				<tui-list-cell :hover="false" unlined>
				    <view class="tui-line-cell">
						<view class="tui-title">商品名称：</view>
						<text>{{details.g_title}}</text>
				    </view>
				   </tui-list-cell>
				   <tui-list-cell :hover="false">
				    <view class="tui-line-cell">
				     <view class="tui-title">商品编码：</view>
						<text>{{details.g_code}}</text>
				    </view>
				   </tui-list-cell>
				   <tui-list-cell :hover="false">
				    <view class="tui-line-cell">
				     <view class="tui-title">挂牌价格：</view>
						<text>{{details.ut_price}}元</text>
				    </view>
				   </tui-list-cell>
				   <tui-list-cell :hover="false">
				    <view class="tui-line-cell">
				     <view class="tui-title">挂牌数量：</view>
						<text>{{details.stock_num}}</text>
				    </view>
				   </tui-list-cell>
				   <tui-list-cell :hover="false">
				    <view class="tui-line-cell">
				     <view class="tui-title">买入数量：</view>
						<view class="valnum FX">
							<button class='F-xy' type="primary" @click="valnumes">-</button>
							<input class="t-center" type="text" v-model="valnums" @input="inputChanges"/>
							<button class='F-xy' type="primary" @click="valnumas">+</button>
						</view>
				    </view>
				   </tui-list-cell>
				   <tui-list-cell :hover="false">
				    <view class="tui-line-cell">
				     <view class="tui-title">合计：</view>
						<text>{{heji}}.00元</text>
				    </view>
				   </tui-list-cell>
				<view class="FX-sb w100" style="margin-top: 5%;">
					<tui-button type="green" width="280rpx" height="90rpx" :size="32" @click="cancel">取消</tui-button>
					<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm(details.g_id,details.ut_id)">确定</tui-button>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import App from "../../App.vue"
	import buylist from "../../components/buylist.vue"
	export default {
		components: {
			buylist
		},
		data() {
			return {
				regionArr: [
					'大佑生宝小分子','编码:16888802','挂牌价:¥598.00','挂牌数量:10份','买入数量：2份','合计:¥1196.00',
				],
				regionTxt: '粤',
				bottomPopup: false,
				debool:true,
				tabIndex: 26,
				detail:'',
				details:'',
				valnums:1,
				heji:'',
				imgurls:"../../static/img/s02.jpg",
				data: [
					{id: 1,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 2,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 3,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 4,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 5,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 6,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 7,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 8,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 9,imgUrl: "../../static/img/s01.jpg",title: " 丽醒海带精萃饮植物饮品",price: 68,num: 10,code: 123456789,button: "买入"}
				]
			}
		},
		onShow() {
			var that = this;
			
			this.sendRequest({
				url :App.getEntrusBuyList,
				method:'POST',
				success : function(res){
					console.log("getchannel success:" + JSON.stringify(res));
					if(res.data.length){
						that.debool=true;
					}else{
						that.debool=false;
					}
					that.detail=res.data;
				},
				fail:function(e){
					console.log("getchannel  fail:" + JSON.stringify(e));
					that.debool=false;
				}
			});
		},
		methods: {
			showModal: function(e,i) {
				console.log(e,i)
				var that = this;
				var datas ={"g_id":e,"ut_id":i};
				
				this.sendRequest({
					url :App.entrusBuyList,
					method:'POST',
					data:datas,
					success : function(res){
						console.log("getchannel success:" + JSON.stringify(res));
						that.details=res.data;
						that.heji=that.valnums*that.details.ut_price;
					},
					fail:function(e){
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
				this.bottomPopup = true;
				console.log("买入", Math.random())
			},
			hideModal: function() {
				this.bottomPopup = false;
			},
			cancel: function() {
				this.bottomPopup = false;
			},
			confirm: function(a,b) {
				console.log(a,b)
				var that = this;
				var datas ={"g_id":a,"ut_id":b,"entry_num":that.valnums};
				console.log(that.valnums)
				
				this.sendRequest({
					url :App.entrusBuy,
					method:'POST',
					data:datas,
					success : function(res){
						console.log("getchannel success:" + JSON.stringify(res));
						// that.details=res.data.data;
						this.bottomPopup = false;
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						setTimeout(function(){
							uni.redirectTo({
								url:'EntrusBuyList'
							})
						},1000)
					},
					fail:function(e){
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
				this.bottomPopup = false;
			},
			inputChanges(e){
				var that = this;
				that.valnums = e.detail.value
				console.log(e.detail.value)
			},
			valnumes(){
				var that = this;
				if(that.valnums>1){
					that.valnums--;
				}else{
					that.valnums=1
				}
				that.heji=that.valnums*that.details.ut_price;
			},
			valnumas(){
				var that = this;
				if(that.valnums<that.details.stock_num){
					that.valnums++;
				}else{
					that.valnums=that.details.stock_num
				}
				that.heji=that.valnums*that.details.ut_price;
			},
		},
		onPullDownRefresh() {
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width:100%;
		height:100%;
		background:rgba(238,238,238,1);
		padding: 30rpx;
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

.tui-line-cell {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
 }

 .tui-title {
  width: 240rpx;
  text-align: right;
  font-size: 32rpx;
  min-width: 120rpx;
  flex-shrink: 0;
 }

 .tui-input {
  font-size: 32rpx;
  color: #333;
  padding-left: 20rpx;
  flex: 1;
  overflow: visible;
 }
	.valnum{
		/* border:1px solid #999; */
	}
	.valnum button{
		width: 1.2rem;height: 1.2rem;font-size: 56rpx;
		color: #000;line-height: 1.2rem;
		border-radius: 0px;text-align: center;
		background-color: #fff;
		/* background-color: rgb(248,248,248); */
	}
	.valnum button:after{
		border-radius: 0px;border: none;
	}
	.valnum input{
		width: 2rem;
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
