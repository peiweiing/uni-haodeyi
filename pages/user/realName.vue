<template>
	<view class="realName">
		<form
		@submit="formSubmit"
		@reset="formReset"
		>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">
						姓<text style="opacity: 0;">一</text>名
					</view>
					<input
					:focus="isInputFocus_1"
					placeholder-class="tui-phcolor"
					class="tui-input"
					name="name"
					:disabled="isRealName"
					:placeholder="isRealName ? u_info.u_name : '请输入姓名'"
					maxlength="50"
					type="text"
					v-model="realname"
					/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">身份证</view>
					<input
					:focus="isInputFocus_2"
					placeholder-class="tui-phcolor"
					class="tui-input"
					name="idcard"
					:disabled="isRealName"
					:placeholder="isRealName ? u_info.u_idcard.toString() : '请输入身份证号码'"
					maxlength="50"
					type="text"
					v-model="idcard"
					/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号</view>
					<input
					:focus="isInputFocus_3"
					placeholder-class="tui-phcolor"
					class="tui-input"
					name="mobile"
					disabled
					:value="u_info.u_acc"
					maxlength="50"
					type="text"
					/>
				</view>
			</tui-list-cell>
			<view class="tui-box-upload">
				<tui-upload
				class="upload-button"
				:value="value"
				:serverUrl="serverUrl"
				@complete="result"
				@remove="remove"
				></tui-upload>
				<view v-if="isRealName" class="tui-box-upload_img1">
					<image :src="u_info.idcard_front_url"></image>
				</view>
				<view v-if="isRealName" class="tui-box-upload_img2">
					<image :src="u_info.idcard_back_url"></image>
				</view>
				<view class="tui-box-upload_text1">
					身份证人像面
				</view>
				<view class="tui-box-upload_text2">
					身份证国徽面
				</view>
			</view>
			<view class="tui-btn-box">
				<button
				class="confirm-btn"
				hover-class="tui-button-hover"
				formType="submit"
				type="primary"
				:disabled="isRealName"
				>
				{{isRealName ? "您已经实名认证过了" : "开始验证"}}
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				realname: "",
				idcard: "",
				mobile: "",
				isInputFocus_1: false,
				isInputFocus_2: false,
				isInputFocus_3: false,
				imageData: [],
				serverUrl: App.uploadEditor, //上传地址
				value:[], //初始化图片
				token: "",
				isRealName: false,
				u_info: {}
			}
		},
		onLoad: function() {
			var that =this;
			uni.getStorage({
				key: 'token',
				success: function (res) {
					var getres = res.data;
					that.sendRequest({
						method: "POST",
						url: App.Idrealuserinfo,
						header: {
							"Authorization": getres
						},
						success: res => {
							console.log("实名认证信息:", res.data[0].u_auth)
							that.u_info = res.data[0]
							if (res.data[0].u_auth === 1) {
								that.isRealName = true
								uni.showToast({
									title: "您已经实名认证过了!",
									icon: "none"
								});
							}
						},
						fail:function(e){
							console.log("getchannel  fail:" + JSON.stringify(e));
						}
					});
					// uni.request({
					// 	method: "POST",
					// 	url: App.Idrealuserinfo,
					// 	header: {
					// 		"Authorization": getres
					// 	},
					// 	success: res => {
					// 		console.log("实名认证信息:", res.data.data[0].u_auth)
					// 		that.u_info = res.data.data[0]
					// 		if (res.data.data[0].u_auth === 1) {
					// 			that.isRealName = true
					// 			uni.showToast({
					// 				title: "您已经实名认证过了!",
					// 				icon: "none"
					// 			});
					// 		}
					// 	}
					// })
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				if (e.detail.value.name === "") {
					this.isInputFocus_1 = true
				} else if (e.detail.value.idcard === "") {
					this.isInputFocus_2 = true
				} else if (e.detail.value.mobile === "") {
					this.isInputFocus_3 = true
				}
				//表单规则
				let rules = [
					{
						name: "name",
						rule: ["required", "isChinese", "minLength:2", "maxLength:4"], //可使用区间，此处主要测试功能
						msg: ["请输入姓名!", "姓名必须全部为中文!", "姓名必须2个或以上字符!", "姓名不能超过4个字符!"]
					},{
						name: "idcard",
						rule: ["required", "isIdCard"],
						msg: ["请输入身份证号码!", "请输入正确的身份证号码!"]
					},{
						name: "mobile",
						rule: ["required", "isMobile"],
						msg: ["请输入手机号!", "请输入正确的手机号!"]
					}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					if (this.imageData.length !== 2) {
						uni.showToast({
							title: "请上传身份证件照片!",
							icon: "none"
						});
					} else {
						if (this.imageData[0].indexOf("blob:") === -1 && this.imageData[1].indexOf("blob:") === -1) {
							var that =this;
							uni.getStorage({
								key: 'token',
								success: function (res) {
									var getres = res.data;
									that.sendRequest({
										method: "POST",
										url: App.Idcardreal,
										data: {
											realname: that.realname,
											idcard: that.idcard,
											mobile: that.mobile,
											idcardf: that.imageData[0],
											idcardb: that.imageData[1]
										},
										header: {
											"Authorization": getres
										},
										success: (res) => {
											console.log(res);
											if(res.status!==200){
												uni.showToast({
													title: res.msg,
													icon: "none"
												});
											}else{
												uni.showToast({
													title: res.msg,
													icon: "none"
												});
												setTimeout(function() {
													uni.navigateBack()
												}, 1000)
											}
										},
										fail:function(e){
											console.log("getchannel  fail:" + JSON.stringify(e));
										}
									});
									// uni.request({
									// 	method: "POST",
									// 	url: App.Idcardreal,
									// 	data: {
									// 		realname: that.realname,
									// 		idcard: that.idcard,
									// 		mobile: that.mobile,
									// 		idcardf: that.imageData[0],
									// 		idcardb: that.imageData[1]
									// 	},
									// 	header: {
									// 		"Authorization": getres
									// 	},
									// 	success: (res) => {
									// 		console.log(res);
									// 		if(res.data.status!==200){
									// 			uni.showToast({
									// 				title: res.data.msg,
									// 				icon: "none"
									// 			});
									// 		}else{
									// 			uni.showToast({
									// 				title: res.data.msg,
									// 				icon: "none"
									// 			});
									// 			setTimeout(function() {
									// 				uni.navigateBack()
									// 			}, 1000)
									// 		}
									// 	}
									// });
								}
							})
						} else {
							uni.showToast({
								title: "请重新上传照片!",
								icon: "none"
							});
						}
					}
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			result: function(e) {
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.realName {
		padding: 40rpx;
	}
	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 32rpx;
	}
	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}
	.tui-title {
		font-size: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}
	.tui-box-upload {
		width: 100%;
		height: 732rpx;
		overflow: hidden;
		display: flex;
		position: relative;
		justify-content: center;
		.tui-box-upload_img1, .tui-box-upload_img2{
			width: 544rpx;
			height: 306rpx;
			position: absolute;
			top: 40rpx;
			border-radius: 20rpx;
			background-color: #CDCDCD;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tui-box-upload_img2{
			top: 386rpx;
		}
		.tui-box-upload_text1{
			z-index: 999;
			position: absolute;
			bottom: 408rpx;
			left: 212rpx;
			font-size: 40rpx;
			color: #FFF;
		}
		.tui-box-upload_text2{
			z-index: 999;
			position: absolute;
			bottom: 62rpx;
			left: 212rpx;
			font-size: 40rpx;
			color: #FFF;
		}
	}
	.tui-btn-box {
		position: fixed;
		bottom: 40rpx;
		left: 40rpx;
		right: 40rpx;
		.confirm-btn{
			background-color: #9E2036;
		}
	}
	.tui-box-upload /deep/ .tui-upload-add{
		width: 544rpx;
		height: 306rpx;
		margin: 40rpx auto 0;
		border-radius: 20rpx;
		background-color: #EEE;
	}
	.tui-box-upload /deep/ .tui-image-item{
		width: 544rpx;
		height: 306rpx;
		margin: 40rpx auto 0;
		border-radius: 20rpx;
		background-color: #F7F7F7;
	}
</style>
