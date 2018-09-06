<template>
	<div class="tmpl">
		<div class="box">
			<v-header></v-header>
			<div class='head'></div>

			<div class="form" v-if="name=='注册'">
				<el-main>
					<el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
						<div class="bg"></div>
						<div style="white-space:nowrap;margin-bottom: 10px;margin-top: 20px;height:30px;">
							<img src="../../img/login_img/personal_login_bg_phonenumber.png" alt="" width="4%">
							<input type="text" v-model.number="ReginForm.tel" placeholder="请输入手机号"/>
						</div>
						<div style="white-space:nowrap;margin-bottom: 10px;height:30px;">
							<img src="../../img/login_img/personal_login_bg_Password.png" alt="" width="4%">
							<input type="password" v-model="ReginForm.password" placeholder="请输入密码"/>
						</div>
						<div style="white-space:nowrap;margin-bottom: 10px;height:30px;" class="code">
							<img src="../../img/login_img/personal_login_bg_verificationCode.png" alt="" width="6%">
							<input class="auth_input" type="text" v-model="verification" placeholder="请输入短信验证码" />
							<button v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</button>
							<span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">剩余{{auth_time}} </span> 秒</span>
						</div>
						<div style="white-space:nowrap;margin-bottom: 30px;height:30px;">
							<img src="../../img/login_img/personal_login_bg_recommendationcode.png" width="4%">
							<input type="text" placeholder="请输入推荐码(选填)" v-model="referral_code">
						</div>
						<el-form-item>
							<el-button type="success" class="submitBtn" round @click.native.prevent="submit" :loading="logining">
								注册
							</el-button>
						</el-form-item>
					</el-form>
				</el-main>
			</div>
			<div class="form" v-if="name=='忘记密码？'">
				<el-main>
					<el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
						<div class="bg"></div>
						<div style="white-space:nowrap;margin-bottom: 10px;margin-top: 20px;height:30px;">
							<img src="../../img/login_img/personal_login_bg_phonenumber.png" alt="" width="4%">
							<input type="text" v-model.number="ReginForm.tel" placeholder="请输入手机号"/>
						</div>
						<div style="white-space:nowrap;margin-bottom: 10px;height:30px;">
							<img src="../../img/login_img/personal_login_bg_Password.png" alt="" width="4%">
							<input type="password" v-model="ReginForm.password" placeholder="新密码"/>
						</div>
						<div style="white-space:nowrap;margin-bottom: 10px;height:30px;">
							<img src="../../img/login_img/personal_login_bg_Password.png" alt="" width="4%">
							<input type="password" v-model="ReginForm.password" placeholder="确认密码"/>
						</div>
						<div style="white-space:nowrap;margin-bottom: 30px;height:30px;" class="code">
							<img src="../../img/login_img/personal_login_bg_verificationCode.png" alt="" width="6%">
							<input class="auth_input" type="text" v-model="verification" placeholder="请输入短信验证码" />
							<button v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</button>
							<span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">剩余{{auth_time}} </span> 秒</span>
						</div>
						<el-form-item>
							<el-button type="success" class="submitBtn" round @click.native.prevent="submit" :loading="logining">
								确定
							</el-button>
						</el-form-item>
					</el-form>
				</el-main>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	import Header from "@/common/_header.vue";
	export default {
		components: {
			"v-header": Header
		},
		data() {
			let confirmpasswordCheck = (rule, value, callback) => {
				if(value === '') {
					return callback(new Error('密码是必须的'))
				} else {
					return callback()
				}
			}
			let telCheck = (rule, value, callback) => {
				if(value === '') {
					return callback(new Error('电话号码是必须的'))
				} else if(!Number.isInteger(value)) {
					return callback(new Error('电话号码必须是数字'))
				} else if(value.toString().length !== 11) {
					return callback(new Error('电话号码必须是11位数字'))
				} else {
					callback()
				}
			}
			return {
				name: this.$route.query.name,
				ReginForm: {
					password: '',
					tel: '',
				},
				referral_code:"",
				logining: false,
				sendAuthCode: true,
				/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
				auth_time: 0,
				/*倒计时 计数器*/
				verification: "", //绑定输入验证码框框
				rule: {
					password: [{
						required: true,
						message: '密码是必须的！',
						trigger: 'blur'
					}],
					tel: [{
						required: true,
						validator: telCheck,
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			//  验证
			getAuthCode: function() {
				const verification = this.ReginForm.tel;
				const url = this.HOME+"/user/getsmscode/"+this.ReginForm.tel;
				console.log("url", url);
				this.$http.get(url).then(function(response) {
					console.log("请求成功", response)
				}, function(error) {
					console.log("请求失败", error);
				})
				this.sendAuthCode = false;
				//设置倒计时秒
				this.auth_time = 60;
				var auth_timetimer = setInterval(() => {
					this.auth_time--;
					if(this.auth_time <= 0) {
						this.sendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
			},
			// 封装注册发送请求方法
			thisAjax() {
				var obj = {};
				obj.user_pwd = this.ReginForm.password;
				obj.user_account = this.ReginForm.tel;
				obj.mCodeData = this.verification;
				obj.referral_code = this.referral_code
				//  手机注册
				//emulateJSON:true设置后post可跨域
				const url = this.HOME+"/user/register/"+this.verification;
				this.$http.post(url, obj)
				.then(function(response) {
					//登录后跳转的页面
					this.$router.push({path:"/login?name=登录"})
//					this.$router.push('/');
				}, function(error) {
					alert("请求失败", error);
				})
			},
			// ...
			submit() {
				this.$refs.ReginForm.validate(valid => {
					if(valid) {
						this.logining = true
						this.thisAjax();
						console.log('开始写入后台数据！')
					} else {
						console.log('submit err')
					}
				})
			},
			reset() {
				this.$refs.ReginForm.resetFields()
			},
			tologin() {
				//已经注册过跳转到登入界面
				this.$router.push('/login')
			}
		}
	}
</script>
<style scoped lang="less">
button{
	background-color: #FFFFFF;
	border:1px solid #0BB794;
	border-radius: 5px;
}
.head{
	border-bottom: 1px solid #F2F2F2;
}
	.bg {
		width: 100%;
		height: 12rem;
		background-image: url("../../img/login_img/login.jpg");
		background-size: 55% 55%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	
	.regform {
        height: 780px;
		margin-top: 30px;
		background: #fff;
		padding: 30px 30px 0 30px;
		border-radius: 0px;
	}
	
	.submitBtn {
		display: block;
		margin:0 auto;
		border-radius: 10px;
		width: 100%;
		background-color: #0BB794;
	}
	
	.to {
		color: #FA5555;
		cursor: pointer;
	}
	input{
		width: 100%;
		
	}
	.code {
		width: 60%;

	}
	
	.login-text {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.el-main {
		display: block;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		-ms-flex-preferred-size: auto;
		flex-basis: auto;
		box-sizing: border-box;
		padding: 0px;
		padding-top: 20px;
	}
*{  
	background-color: #FFFFFF;
}
</style>