<template>
	<div class="tmpl">
		<v-header></v-header>
		<div class="head"></div>
		<div v-if='name=="我的钱包"'>
			<div class="all" style="background-color: #00AD88;border-bottom: 1px solid #cecccc4a;">
				
				<p style="color: white;padding-top: 25px;" @click="gojifen('账户明细')">账户余额</p>
				<div><span @click="gojifen('账户明细')">￥</span>
					<span @click="gojifen('账户明细')">{{balance}}</span>
					<!--<hr style="background: white;opacity: 0.5;width: 95%;" />
					<div class="name"  @click="gojifen('我的积分')" style="border-right: 1px solid #cecccc4a;">
						<p style="color: white;padding-top: 5px;">我的积分</p>
						<div>
							<span>{{balance2}}</span>
						</div>
					</div>
					<div class="name" @click="gobank('我的银行卡')">
						<p style="color: white;padding-top: 5px;">我的银行卡</p>
						
						<div style="color: white;padding-top: 5px;">
							<van-icon name="debit-pay" info="" color="#ffffff"/>
						</div>
					</div>-->
				</div>
                <div style="margin-top: 25px;">
				<ul>
					<li>
					<div class="name"  @click="gojifen('我的积分')" style="border-right: 1px solid #cecccc4a;height: 50px;">
						<p style="color: white;padding-top: 5px;">我的积分</p>
						<div>
							<span style="font-size: 18px;">{{balance2}}</span>
						</div>
					</div>
					
					</li>
					<li>
						<div class="name" @click="gobank('我的银行卡')" style="height: 50px;">
						<p style="color: white;padding-top: 5px;">我的银行卡</p>
						
						<div style="color: white;padding-top: 5px;">
							<van-icon name="debit-pay" info="" color="#ffffff"/>
						</div>
					</div>
					</li>
				</ul>
			</div>
				<!--				<span class="carry" @click='getCarry(balance)'>提现</span>-->
			</div>
			      <div class='wallet' style="margin-top: 5px;">
      	
        <ul>
          <li>
            <router-link :to="{path:'/UserPerformance?&name=我的业绩'}">
              <div style="margin-top: 15px;">
              	<span><img src='../../img/个人中心/yeji.png'width="40%"/></span>
              <!--  <span style="margin-top: 20px;"><van-icon name="contact" info="" color='#D58512'/></span>-->
                <span style="font-size: 1.6rem;font-weight: 600;margin-top: 6px;">我的业绩</span>
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/wallet1?name=创业基金'}">
              <div style="margin-top: 15px;">
              	<span><img src='../../img/个人中心/jijing.png'width="40%"/></span>
               <!-- <span style="margin-top: 20px;"><van-icon name="debit-pay" info="" color='00a0e9'/></span>-->
                <span style="font-size: 1.6rem;font-weight: 600;margin-top: 6px;">创业基金</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
			<!--<div class="detail">
				<div class="title">账户明细</div>
				<van-list v-model="loading" :finished="finished" @load="onLoad">
					<div class="detail_" v-for="(item,index) in detail" :key="index">
						<div>
							<div class="left">
								<span class="red" v-if="item.wallet_type==1">{{item.Type}}</span>
								<span class="green" v-if="item.wallet_type==2">{{item.Type}}</span>
								<span>
                                    <i v-if="item.wallet_type==1">+</i>
                                    <i v-if="item.wallet_type==2">-</i>{{item.detail_amount}}元</span>

							</div>
						</div>
						<div class="right">
							<p>{{item.createddate|formatDate}}</p>
						</div>

					</div>
				</van-list>
				<v-baseline v-if="nomore"></v-baseline>
			</div>
		</div>-->
		<!-- <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
            <van-field v-model="amount" label="用户名" placeholder="请输入用户名" />
        </van-dialog> -->

		<!--<router-link class="my-indent2" :to="{ path:'/UserPerformance?&name=我的业绩'}">
			<span class="my-indent-left">
          <div style="margin-top: 25px;">
          <img src="../../img/userImg/personal_bg_achievement.png" alt="">
            <span>我的业绩</span>
	</div>
	<i class="icon-go"></i>
	</span>
	</router-link>-->
	<!--<div>
		<div class="all">
			<p>您当前积分</p>
			<div>
				<span>{{balance2}}</span>
			</div>
		</div>
		<div class="detail">
			<div class="title">积分明细</div>
			<van-list v-model="loading2" :finished="finished2" @load="onLoad2">
				<div class="detail_" v-for="(i,index) in jifenlist" :key="index">
					<div>
						<div class="left jifen">
							<span>获得积分</span>
							<p>{{i.createddate|formatDate}}</p>
						</div>
					</div>
					<div class="right">
						<span>+20</span>
					</div>

				</div>
			</van-list>
			<v-baseline v-if="nomore2"></v-baseline>
		</div>-->
	</div>
	<div>
		<button class="carry" @click='getCarry(balance)'>提现</button>
	</div>
	</div>
</template>

<script>
	// import Footer from "@/common/_footer.vue";
	import Header from "@/common/_header.vue";
	import Baseline from "@/common/_baseline.vue";
	import { formatDate } from "../assets/js/data.js";
	import { Toast } from 'vant';
	export default {
		components: {
			"v-header": Header,
			"v-baseline": Baseline
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, "yyyy-MM-dd hh:mm");
			}
		},
		data() {
			return {
				nomore: false,
				finished: false,
				loading: true,
				nomore2: false,
				finished2: false,
				loading2: true,
				// 提现弹框
				show: false,
				// 提现金额
				amount: "",
				name: "",
				token: "",
				page: 1,
				detail: [],
				balance: "",
				jifenlist: [],
				balance2: ""
			};
		},
		created() {
			this.getname();
			setTimeout(() => {
				this.getWallet();
				this.getjifen();
			}, 1000);
		},
		methods: {
			getname() {
				this.name = this.$route.query.name;
				this.token = localStorage.getItem("Token");
			},
			// 获取钱包信息
			getWallet() {
				this.$http
					.get(this.HOME + "/user/GetUserCashInfo?token=" + this.token + "&page=" + this.page)
					.then(res => {
						console.log(res);
						this.balance = res.data.Data.balance;
						var arr = res.data.Data.detail;
						console.log(arr.length);
						if(arr.length == 10) {
							this.page++;
						} else {
							this.nomore = true;
							this.finished = true;
							console.log("已加载全部");
						}
						arr.forEach(val => {
							console.log(val.createddate);
							var str = "";
							str = val.createddate;
							var num = parseInt(str.replace(/[^0-9]/gi, ""));
							val.createddate = num;
							this.detail.push(val);
						});
						this.loading = false;
					});
			},
			// 获取积分
			getjifen() {
				this.$http
					.get(
						this.HOME + "/user/GetUserIntegralInfo?token=" + this.token + "&page=" + this.page
					)
					.then(res => {
						console.log(res);
						this.balance2 = res.data.Data.balance;
						var arr = res.data.Data.detail;
						if(arr.length == 10) {
							this.page++;
						} else {
							this.nomore2 = true;
							this.finished2 = true;
							console.log("已加载全部");
						}
						arr.forEach(el => {
							var str = "";
							str = val.createddate;
							var num = parseInt(str.replace(/[^0-9]/gi, ""));
							val.createddate = num;
							this.jifenlist.push(val);
						});
						this.loading2 = false;
					});
			},
			gojifen(name){
				this.$router.push({
					path: "/wallet1?name=" + name
				});
			},
			gobank(name) {
				this.$router.push({
					path: "/bank?name=" + name
				});
			},
			// 提现
			getCarry(balance) {
				this.$router.push({
					path: "/walletCarry?name=提现" + '&balance=' + balance
				});
			},
			onLoad() {
				console.log(!this.loading);
				if(!this.loading) {
					return;
				}
				this.loading = true;
				console.log(this.page);
				this.getWallet();
			},
			onLoad2() {
				console.log(!this.loading2);
				if(!this.loading2) {
					return;
				}
				this.loading2 = true;
				console.log(this.page);
				this.getjifen();
			}
		}
	};
</script>
<style scoped lang='less'>
	.head {
		width: 100%;
		height: 4rem;
	}
	
	.name {

		background-color: #00ad8a;
		float: left;
		width: 50% !important;
	}
	
	.carry {
		background-color: #00ad8a;
		color: #fff;
		border-radius: 0.6rem;
		font-size: 1.2rem;
		height: 30px;
		width: 80%;
		margin-top: 20px;
		margin-left: 10%;
	}
	
	.all {
		margin-top: 2px;
		height: 84pt;
		width: 100%;
		text-align: center;
		background-color: #fff;
		padding-top: 1rem;
		position: relative;
		font-size: 1.6rem;
		div {
			width: 100%;
			position: relative;
/*			padding-top: 1rem;*/
			span:nth-child(1) {
				font-size: 2rem;
				color: #ffffff;
			}
			span:nth-child(2) {
				margin-left: 0rem;
				font-size: 2rem;
				color: #FFFFFF;
			}
			span:nth-child(3) {
				background-color: #00ad8a;
				color: #fff;
				padding: 0.2rem 0.6rem;
				border-radius: 2.5rem;
				position: absolute;
				font-size: 0.6rem; // right: 4rem;
			}
		}
	}
	      .wallet {
        width: 100%;
        height: 14rem;
        ul {
          width: 100%;
          height: 100%;
          li {
            width: 50%;
            height: 100%;
            text-align: center;
            float: left;
            padding: 0.8rem 0;
            div {
              border-right: 1px solid #eee;
              span {
              	
                display: block;
                padding-bottom: 0.4rem;
                font-size: 5.6rem;
              }
              span:lath-child {
                color: #1bc6a3;
              }
            }
          }
        }
      }
	.my-indent-left {
		display: flex;
		justify-content: space-between;
		width: 100%;
		div {
			img {
				margin-top: 0px;
				width: 1rem;
				margin-right: 0.3rem;
				vertical-align: middle;
			}
			span {
				vertical-align: middle;
				font-size: 1.3rem;
				color: #666;
			}
		}
		i {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
	.my-indent2 {
		width: 100%;
		display: block;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #333;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0 0.6rem;
		height: 6rem;
		line-height: 2rem;
		background-color: #fff; // border-top-right-radius: 8px;
		// border-top-left-radius: 8px;
		border-top: 1px solid #dadada; // margin-top: 10px;
	}
	
	.detail {
		width: 100%;
		background-color: #fff;
		.title {
			width: 100%;
			height: 2rem;
			padding-left: 0.6rem;
			line-height: 2rem;
			font-size: 0.8rem;
		}
		.detail_ {
			width: 100%;
			height: 2rem;
			padding: 0.4rem 0;
			border-top: 0.03rem solid #ccc;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 0.6rem;
			.left {
				.red {
					display: inline-block;
					width: 3rem;
					text-align: center;
					color: #cb2221;
				}
				.green {
					display: inline-block;
					width: 3rem;
					text-align: center;
					color: #00b7ee;
				}
				p {
					font-size: 0.6rem;
					color: #999999;
					padding-left: 3rem;
				}
			}
			.jifen {
				padding-left: 2rem;
				color: #666666;
				p {
					padding: 0.3rem 0 0 0;
				}
			}
			.right {
				padding-right: 1rem;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
</style>