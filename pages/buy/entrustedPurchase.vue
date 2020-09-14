<template>
	<view class="content">
		<!-- <tui-loadmore
		:index="3"
		type="primary"
		v-if="!isSuccess"
		></tui-loadmore> -->
		<!-- <view class="error" v-if="isError">
			<tui-no-data
			imgUrl="/static/images/toast/img_nodata.png"
			>
				暂无数据
			</tui-no-data>
		</view> -->
		<view class="FY FY-c FX-c" v-if="isError" style="font-size: 16px;height: calc(100vh);">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			暂无内容
		</view>
		<view class="container">
			<view class="title_2" v-if="isSuccess">
				请选择商品
			</view>
			<tui-card
			class="tui-card"
			:image="bottomList.img ? bottomList.img[0].img : ''"
			:title="bottomList.img ? bottomList.img[0].title : ''"
			:tag="bottomList.img ? bottomList.img[0].tag : ''"
			@click="popup"
			>
				<template v-slot:footer>
					<view class="tui-default">
						<view class="">
							价格：￥{{bottomList.g_price}}
						</view>
						<view class="">
							交易量：{{(bottomList.g_salevol).toFixed(2)}}
						</view>
						<view class="">
							交易金额：￥{{(bottomList.totalpay).toFixed(2)}}
						</view>
					</view>
				</template>
			</tui-card>
			<view class="title_2" v-if="isSuccess">
				请填写购买信息
			</view>
			<view class="form_information" v-if="isSuccess">
				<form @submit="formSubmit">
					<tui-list-cell :hover="false" unlined>
						<view class="tui-line-cell">
							<view class="tui-title">价格区间：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled class="tui-input"
							:placeholder="priceRange(bottomList.g_minprice, bottomList.g_maxprice)"
							maxlength="50"
							type="digit"
							/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">买入价格：</view>
							<input
							v-model="price"
							placeholder-class="tui-phcolor"
							class="tui-input"
							name="amount"
							placeholder="请输入买入价格"
							maxlength="50"
							type="text"
							/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">买入数量：</view>
							<input
							v-model="num"
							placeholder-class="tui-phcolor"
							class="tui-input"
							name="amount2"
							placeholder="请输入买入数量"
							maxlength="50"
							type="text"
							/>
						</view>
					</tui-list-cell>
					<view class="confirm_box">
						<button
						class="tui-button-primary"
						hover-class="tui-button-hover"
						formType="submit"
						type="primary"
						@click="affirm(bottomList.g_id)"
						>
							确 认 委 托 买 入
						</button>
					</view>
				</form>
			</view>
			<!--底部分享弹窗-->
			<tui-bottom-popup :show="popupShow" @close="popup">
				<view class="tui-share">
					<radio-group @change="radioChange">
						<scroll-view scroll-y class="tui-share-content">
							<view
							class="share-content-list"
							v-for="(item, index) in bottomLists"
							:key="index"
							@click="clickBottomList(index)"
							>
								<tui-card
								class="tui-card-share"
								:image="item.img ? item.img[0].img : ''"
								:title="item.img ? item.img[0].title : ''"
								:tag="item.img ? item.img[0].tag : ''"
								@click="popup"
								>
									<template v-slot:footer>
										<view class="tui-default">
											<view class="">
												价格:￥{{item.g_price}}
											</view>
											<view class="">
												交易量:{{item.g_salevol}}
											</view>
											<view class="">
												交易金额:￥{{item.totalpay}}
											</view>
										</view>
									</template>
								</tui-card>
								<label class="tui-checkbox">
									<tui-icon
									name="circle"
									:size="30"
									:color="'#9E2036'"
									@click="popup"
									v-if="index !== current"
									></tui-icon>
									<tui-icon
									name="circle-fill"
									:size="30"
									:color="'#9E2036'"
									@click="popup"
									v-if="index === current"
									></tui-icon>
								</label>
							</view>
						</scroll-view>
					</radio-group>
					<view
					class="tui-btn-cancle"
					@tap="popup"
					>
						取消
					</view>
				</view>
			</tui-bottom-popup>
			<!--底部分享弹窗-->
		</view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				price:'',
				num:'',
				popupShow: false,
				bottomLists: [],
				bottomList: {},
				current: 0,
				isConfirm: false,
				isError: false,
				isSuccess: false
			}
		},
		onLoad() {
			var that =this;
					that.sendRequest({
						url: App.entrustlst,
						method: 'POST',
						success: (res) => {
							console.log(res)
							if (res.status === 200) {
								if (res.data.length !== 0) {
									that.bottomList = res.data[0];
									that.bottomLists = res.data;
									if (that.bottomLists.length === 0) {
										that.isError = true
										uni.showToast({
											title: "暂无数据",
											icon: "none"
										})
									} else {
										that .isSuccess = true
									}
								} else {
									that.isError = true
									uni.showToast({
										title: "暂无数据",
										icon: "none"
									})
								}
							} else {
								that.isError = true
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						},
						fail:function(e){
							console.log("getchannel  fail:" + JSON.stringify(e));
						}
					});
					// uni.request({
					// 	url: App.entrustlst,
					// 	method: 'POST',
					// 	header: {'Authorization':getres},
					// 	success: (res) => {
					// 		console.log(res)
					// 		if (res.data.status === 200) {
					// 			if (res.data.data.length !== 0) {
					// 				that.bottomList = res.data.data[0];
					// 				that.bottomLists = res.data.data;
					// 				if (that.bottomLists.length === 0) {
					// 					that.isError = true
					// 					uni.showToast({
					// 						title: "暂无数据",
					// 						icon: "none"
					// 					})
					// 				} else {
					// 					that .isSuccess = true
					// 				}
					// 			} else {
					// 				that.isError = true
					// 				uni.showToast({
					// 					title: "暂无数据",
					// 					icon: "none"
					// 				})
					// 			}
					// 		} else {
					// 			that.isError = true
					// 			uni.showToast({
					// 				title: res.data.msg,
					// 				icon: "none"
					// 			})
					// 		}
					// 	}
					// });
		},
		computed: {
			priceRange() {
				return function(min, max) {
					if (!min || !max) {
						return "00.00~00.00"
					} else {
						return min+"~"+max
					}
				}
			}
		},
		methods: {
			formSubmit: function(e) {
				// console.log(e)
				//表单规则
				let rules = [{
					name: "amount",
					rule: ["required", "isAmount"],
					msg: ["请输入买入价格!", "请输入正确的买入价格，允许保留两位小数!"]
				}, {
					name: "amount2",
					rule: ["required", "isAmount"],
					msg: ["请输入买入数量!", "请输入正确的买入数量!"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					if (Number(this.price) <= Number(this.bottomList.g_maxprice) && Number(this.price) >= Number(this.bottomList.g_minprice)) {
						this.isConfirm = true
					} else {
						this.isConfirm = false
						uni.showToast({
							title: "请输入正确的价格区间!",
							icon: "none"
						});
					}
				} else {
					this.isConfirm = false
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			affirm(e){
				if (this.isConfirm) {
					var that =this;
							var datas={'g_id':e,'num':that.num,'price':that.price,}
							that.sendRequest({
								url: App.entrustpurchase,
								method: 'POST',
								data:datas,
								success: (res) => {
									console.log("确认委托买入" ,res)
									that.productList = res;
									uni.showToast({
										title: that.productList.msg+'!',
										icon: "none"
									});
									that.price = ""
									that.num = ""
									this.isConfirm = false
								},
								fail:function(e){
									console.log("getchannel  fail:" + JSON.stringify(e));
								}
							});
							// uni.request({
							// 	url: App.entrustpurchase,
							// 	method: 'POST',
							// 	header: {'Authorization':getres},
							// 	data:datas,
							// 	success: (res) => {
							// 		console.log("确认委托买入" ,res.data)
							// 		that.productList = res.data;
							// 		uni.showToast({
							// 			title: that.productList.msg+'!',
							// 			icon: "none"
							// 		});
							// 		that.price = ""
							// 		that.num = ""
							// 		this.isConfirm = false
							// 	}
							// });
				}
			},
			popup: function() {
				this.popupShow = !this.popupShow
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.bottomList.length; i++) {
					if (this.bottomList[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			clickBottomList: function(index) {
				this.current = index
				this.bottomList = this.bottomLists[index]
			}
		},
		onPullDownRefresh: function(){
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}
	// /deep/ .tui-loadmore{
	// 	margin: 0;
	// 	height: 44rpx;
	// 	font-size: 30rpx;
	// 	color: #999;
	// 	position: fixed;
	// 	left: 50%;
	// 	top: 50%;
	// 	z-index: 1;
	// 	margin-top: -20rpx;
	// 	margin-left: -180rpx;
	// }
	// .error{
	// 	position: fixed;
	// 	top: 0;
	// 	bottom: 0;
	// 	left: 0;
	// 	right: 0;
	// 	z-index: 1;
	// 	background-color: #EEE;
	// }
	.container {
		padding: 30rpx;
	}
	.title_2{
		font-size: 32rpx;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
		font-weight: bold;
	}
	.tui-card{
		margin: 0 !important;
	}
	.tui-default {
		padding: 20rpx;
		color: #999;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-title {
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
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
	.form_information{
		border-radius: 10rpx;
		overflow: hidden;
	}
	.tui-share {
		background: #e8e8e8;
		position: relative;
		padding: 20rpx;
	}
	.tui-share-content{
		height: 800rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 100rpx;
		.share-content-list{
			display: flex;
			margin-top: 20rpx;
			align-items: center;
			background-color: #ffffff;
			border-radius: 6rpx;
			.tui-card-share{
				flex: 1;
			}
			.tui-checkbox{
				width: 16%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.tui-btn-cancle {
		height: 100rpx;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f6f6f6;
		font-size: 36rpx;
		color: #3e3e3e;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
