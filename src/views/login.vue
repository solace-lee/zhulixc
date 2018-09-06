<template>
	<div class="tmpl">
		<div class="box">
			<div class="head" style="border-bottom: 1px solid #D6D6D6;">
				<div class="site">
					<div @click="goIndex">
						<span style="width: 10px;"></span>
						<van-icon name="arrow-left" />
						
					</div>
				</div>
				<div class="title">
					<span>登录</span>
				</div>
			</div>
			<el-main>
					<el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
						<div class="bg"></div>
						</el-form-item>
					</el-form>
				</el-main>
			<div class="form">
				<form>
					<ul>
						<li>
							<label>
                                <img src="../../img/login_img/personal_login_bg_phonenumber.png" alt="">
                            </label>
							<input type="text" placeholder="请输入手机号" v-model="Account">
							<!-- <p>请输入真实的手机号码，否则无法找回密码</p> -->

						</li>
						<li>
							<label>
                                <img src="../../img/login_img/personal_login_bg_Password.png" alt="">
                            </label>
							<input type="password" placeholder="请输入密码" v-model="Pwd">
						</li>
					</ul>
					<div class="btn">
						<div @click="login">登录</div>
					</div>
					<div class="operation">
						<span @click="goRegister('忘记密码？')">忘记密码？</span><i>|</i>
						<span @click="goRegister('注册')">现在注册</span>

					</div>

				</form>
			</div>
		</div>

	</div>
</template>

<script>
	import Header from "@/common/_header.vue";
	import { Toast } from "vant";
	export default {
		components: {
			"v-header": Header
		},
		data() {
			return {
				Account: "",
				Pwd: ""
			};
		},
		mounted() {},
		methods: {
			addListen() {
				this.$imconn.listen({
					onOpened: function(message) {
						console.log("用户已上线");
					},
					onClosed: function(message) {
						console.log("用户已下线");
					},
					// onEmojiMessage: this.receiveEmojiMessage,
					// onPictureMessage: this.receivePictureMessage,
					onTextMessage: this.receiveTextMsg
				});
			},
			receiveTextMsg(message) {
				alert(message);
			},
			goRegister(name) {
				this.$router.push({
					path: "/register?name=" + name
				});
			},
			goIndex() {
				this.$router.push({
					path: "/"
				});
			},
			login() {
				console.log(3333);

				if(this.Account == "") {
					Toast("请输入手机号");
					return;
				}
				// else if(this.Pwd==''){
				//     Toast.fail('请输入密码');
				//     return;
				// }
				var obj = {};
				obj.Account = this.Account;
				obj.Pwd = this.Pwd;
				console.log(obj);
				this.$http
					.post(this.HOME + "/user/login", obj)
					.then(res => {
						if(res.data.Message == "账号不存在") {
							Toast(res.data.Message);
							return;
						}
						if(res.data.Status == 200) {
							localStorage.setItem("userMsg", JSON.stringify(obj));
							Toast(res.data.Message);
							var Token = res.data.Data.Token;
							localStorage.setItem("Token", Token);
							setTimeout(() => {
								this.$router.push({
									path: "/"
								});
							}, 1000)
							// this.$imoption.user =  this.Account;
							// this.$imoption.pwd = this.Pwd;
							// this.$imoption.appKey = "1176180515146684#vhapp";
							// this.$imoption.success = res => {
							//   this.accence_token = res.access_token;
							//   this.myNickName = res.user.nickname;
							//   this.addListen();
							// };
							// this.$imconn.open(this.$imoption);
						} else {
							Toast("手机号或密码错误");
						}
					})
					.catch(err => {
						// Toast('手机号或密码错误');
					});
			}
		}
	};
</script>
<style scoped lang="less">
	.tmpl {
		width: 100vw;
		height: 100vh;
	}
	
	.head {
		width: 100%;
		height: 4rem;
		background-color: #fff;
		display: flex;
		position: fixed;
		z-index: 100000;
		.site {
			width: 4rem;
			height: 100%;
			display: flex;
			position: absolute;
			color: #000;
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				.van-icon-location {
					vertical-align: middle;
				}
				span {
					font-size: 1rem;
				}
			}
		}
		.title {
			// flex: 1;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			span {
				color: #000;
				margin-right: 0.5rem;
			}
		}
	}
	
	ul {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	a {
		list-style: none;
	}
	
	* {
		box-sizing: border-box;
	}
	
	body {
		margin: 0;
		padding: 0;
	}
	
	.box {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	
	.box .bg {
		width: 100%;
		height: 22rem;
		background-image: url("../../img/login_img/login.jpg");
		background-size: 50% 30%;
		background-position: center center;
		background-repeat: no-repeat;
		display: block;
	}
	
	.box .form {
		width: 100%;
		margin-top: -4rem;
	}
	
	.box .form ul li {
		width: 100%;
		/* height: 3rem; */
		padding-left: 2.5rem;
		position: relative;
		line-height: 3rem;
	}
	
	.box .form ul li p {
		font-size: 0.2rem;
		color: #ccc;
		position: absolute;
		top: 0.9rem;
		left: 1.6rem;
	}
	
	.box .form ul li label img {
		max-width: 1rem;
		display: inline-block;
		vertical-align: middle;
	}
	
	.box .form ul li input {
		margin-left: 1rem;
		vertical-align: middle;
		color: #999999;
		border: none;
		padding: 0.2rem;
		font-size: 18px;
		/* width: 4rem; */
	}
	
	.box .form ul .hand img {
		max-width: 0.4rem;
	}
	
	.box .form ul .hand input {
		margin-left: 0rem;
	}
	
	.box .form ul .hand button {
		width: 1.8rem;
		height: 1rem;
		background-color: #0bb794;
		color: #fff;
		border: none;
	}
	
	.btn {
		width: 100%;
		text-align: center;
		margin-top: 2.5rem;
		padding: 0 3rem;
	}
	
	.btn div {
		width: 100%;
		height: 3rem;
		border-radius: 0.68rem;
		border: none;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 0.05rem;
		//   font-size: 0.28rem;
		background-color: #0bb794;
	}
	
	.operation {
		width: 100%;
		text-align: center;
		margin-top: 3rem;
		/*font-size: 6.8rem;*/
		span {
			font-size: 1.3rem;
		}
		i {
			padding: 0 0.5rem;
		}
	}
</style>