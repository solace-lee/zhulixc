<template lang="html">
	<div class="index">
		<div class="line"></div>

		<div class="head">
			<div class="site" @click='gomap' ><!--@click='gomap'-->
				<div>
					<!--<van-icon name="location" />-->
					<img src="../../img/indexImage/dingwei.png" width="20%"  />
					<p style="margin-left: 1rem;font-size: 1.4rem;text-align: center;">{{city}}<br/><span style="font-size: 1.4rem;">{{district}}</span></p>
				</div>
			</div>
			<div>
			</div>
			<div class="search">
				<van-icon name="search" />
				<input type="text" placeholder="发现更多好货" @click='goseek'>
			</div>
			<!--<div class="enter">
        <img src="../../img/indexImage/mall_btn_ruzhu.png" alt="" @click="ruzhuIndex">
      </div>-->
			<div class="dropdown" @click="toggle1">

				<button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" style="background-color: inherit; margin: auto 0;">
      <img src="../../img/more1.png" v-if="!toggle" width="100%" height="100%"/>
      <img src="../../img/more-2.png" v-if="toggle" width="100%" height="100%"/>
	</button>
				<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1" style="min-width: 110px;opacity: 0.8;background-color: #000000;">
					<li role="presentation" style="background-color: #000000;">
						<span class="glyphicon glyphicon-comment" style="color:#FFFFFF;margin: 8px;" @click="msg">&nbsp;消息中心</span>
					</li>
					<li role="presentation" style="background-color: #000000;" @click="car">
						<span class="glyphicon glyphicon-shopping-cart" style="color:#ffffff;margin: 8px;">&nbsp;购物车</span>
					</li>
					<!--		<li role="presentation" class="divider"></li>-->
					<li role="presentation" style="background-color: #000000;" @click="user2">
						<span class="glyphicon glyphicon-cog" style="color:#ffffff;margin: 8px;">&nbsp;设置</span>
					</li>
				</ul>
			</div>

		</div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">

			<div v-if='show'>
				<div class="swiper">
					<van-swipe :autoplay="3000">
						<van-swipe-item v-for="i in swiper">
							<img :src="i.img_url" @click="as(i.commodity_id)">
						</van-swipe-item>

					</van-swipe>

				</div>

				<!-- 专区 -->
				<div class="monopolyArea">
					<ul>
						<li @click='cunpin'>
							<img src="../../img/indexImage/yicunyiping3.png" alt="">
							<p>一村一品</p>
						</li>
						<!--<li @click='not'>
            <img src="../../img/indexImage/nongmao3.png" alt="">
            <p>农贸市场</p>
          </li>
           <li @click='citypir'>
            <img src="../../img/indexImage/ershou3.png" alt="">
            <p>二手市场</p>
          </li>-->
						<li @click='duihuan'>
							<img src="../../img/indexImage/jifen3.png" alt="">
							<p>积分商城</p>
						</li>

						<!--</ul>
        
      </div>
      <div class="monopolyArea">
        <ul>-->
						<li @click='member'>
							<img src="../../img/indexImage/huiyuan3.png" alt="">
							<p>会员专区</p>
						</li>
						<!--<li @click='citypir'>
            <img src="../../img/indexImage/cuxiao3.png" alt="">
            <p>促销专区</p>
          </li>
          <li @click='not'>
            <img src="../../img/indexImage/remai3.png" alt="">
            <p>热卖专区</p>-->
						<li @click='classify'>
							<img src="../../img/indexImage/fenlei3.png" alt="">
							<p>商品分类</p>
						</li>
					</ul>
				</div>

				<!--     <v-section1 :section1="datas.section1"></v-section1>-->
				<v-section4 :section4="datas.section4"></v-section4>
				<!--      <v-section6></v-section6>-->
				<v-section2 :section2="datas.section2"></v-section2>
				<!--      <v-section4 :section4="datas.section4"></v-section4>-->
				<v-section3></v-section3>
				<v-section5></v-section5>

				<v-baseline></v-baseline>

			</div>
		</van-pull-refresh>
		<v-footer :foot="foot"></v-footer>
	</div>
</template>

<script>
	import Section1 from "@/components/index/section1.vue";
	import Section2 from "@/components/index/section2.vue";
	import Section3 from "@/components/index/section3.vue";
	import Section4 from "@/components/index/section4.vue";
	import Section5 from "@/components/index/section5.vue";
	import Section6 from "@/components/index/section6.vue";
	import Baseline from "@/common/_baseline.vue";
	import Footer from "@/common/_footer.vue";
	// import AMap from 'AMap';
	// import Bus from '../bus.js';

	export default {
		props: ["aaa"],
		components: {
			// 'v-swiper': Swiper,

			"v-section1": Section1,
			"v-section2": Section2,
			"v-section3": Section3,
			"v-section4": Section4,
			"v-section5": Section5,
			"v-section6": Section6,
			"v-baseline": Baseline,
			"v-footer": Footer
		},
		data() {
			return {
				datas: "",
				toggle: false,
				loading: true,
				isLoading: false,
				swiper: [],
				shop_id: "",
				show: true,
				type: "tab",
				district: "",
				city:"",
				address_detail: null,
				// center: { lng: 116.40387397, lat: 39.91488908 }
				content: "",
				token: "",
				user_id: "",
				foot: '',
			};
		},

		created() {
			this.foot = 0;
			this.getData();
			this.getdata();
			this.getGetAgencyInfo();
		},
		watch: {
			$route: function(to, from) {
				window.scrollTop = 0;
			}
		},
		mounted() {
			this.getdistrict();
		},
		methods: {
			toggle1() {
				this.toggle = !this.toggle
			},
			onRefresh() {
				setTimeout(() => {
					// this.$toast('刷新成功');
					this.isLoading = false;
				}, 500);
			},
			// 获取代理商信息
			getGetAgencyInfo() {
				console.log("000000000000000000000000000000000000");
				this.token = localStorage.getItem("Token");
				this.$http.get(this.HOME + "/agency/GetAgencyInfo?token=" + this.token).then(res => {
					console.log(res);
					this.user_id = res.data.Data.Info.user_id;
				});
			},
			showCityInfo() {},
			getdistrict() {
				var that = this;
				var mapObj = new AMap.Map("iCenter");
				console.log(mapObj);

				mapObj.plugin("AMap.Geolocation", function() {
					var geolocation = new AMap.Geolocation({
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 10000, //超过10秒后停止定位，默认：无穷大
						maximumAge: 0, //定位结果缓存0毫秒，默认：0
						convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true, //显示定位按钮，默认：true
						buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
						buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					});
					mapObj.addControl(geolocation);
					geolocation.getCurrentPosition();
					AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
					AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
					function onComplete(data) {
						console.log(data);

						if(sessionStorage.getItem("district")) {
							that.district = sessionStorage.getItem("district");
							that.city = sessionStorage.getItem("city");
						} else {
							that.district = data.addressComponent.district;
							that.city = data.addressComponent.city;
						}
					}

					function onError(data) {
						console.log(data);
					}
				});
			},
			gomap() {
				// this.show = false;
				this.$router.push({
					path: "/map?name=选择地区"
				});
			},
			loadmap() {
				const map = new AMap.Map("container", {
					zoom: 9
				});
			},
			duihuan() {
				this.$router.push({
					path: "/duihuan?name=" + "积分兑换"
				});
			},
			member() {
				this.$router.push({
					path: "/member?name=" + "会员专区"
				});
			},
			not() {
				this.$router.push({
					path: "/hot?name=" + "热卖专区"
				});
			},
			citypir() {
				this.$router.push({
					path: "/citypir?name=" + "市价专区"
				});
			},
			cunpin() {
				this.$router.push({
					path: "/cunpin?name=" + "一村一品"
				});
			},
			classify() {
				this.$router.push({
					path: "/category?name=" + "分类专区"
				});
			},

			// 跳转到商品详情页
			as(commodity_id) {
				console.log(commodity_id);
				if(commodity_id == 0) {
					return;
				}
				this.$router.push({
					path: "/detail?id=" + commodity_id
				});
			},
			getdata() {
				var token = localStorage.getItem("Token");
				console.log(token);
				this.$http.get(this.HOME + "/shop/getshopinfo?token=" + token).then(res => {
					console.log(res);
					this.shop_id = res.data.Data.Info.shop_id;
				});
			},
			getData() {
				this.$http
					.get(this.HOME + "/home/getdata")
					.then(res => {
						this.swiper = res.data.Data.img;
						console.log(this.swiper);
					})
					.catch(err => {
						console.log(err.header);
					});
			},

			ruzhuIndex() {
				var Token = localStorage.getItem("Token");

				if(Token == null) {
					this.$router.push({
						path: "/login?name=登录"
					});
				} else if(this.shop_id != "") {
					this.$router.push({
						path: "/ruzhu3?name=商家入驻审核情况"
					});
				} else if(this.user_id != 0) {
					this.$router.push({
						path: "/ruzhu3Agent?name=代理商入驻审核情况"
					});
				} else {
					this.$router.push({
						path: "/ruzhuIndex?name=入驻"
					});
				}
			},
			goseek() {
				this.$router.push({
					path: "/Category2"
				});
			},
			car() {
				this.$router.push({
					path: "/car?name=" + "购物车"
				});
			},
			msg() {
				this.$router.push({
					path: "/Msg?name=" + "消息"
				});
			},
			user2() {
				this.$router.push({
					path: "/User2?name=" + "设置"
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	@import "../assets/fz.less";
	@import "../assets/index/style.css";
	.service {
		height: 6.5rem;
		width: 100%;
		background-color: #fff;
		ul {
			display: -webkit-flex;
			display: -ms-flex;
			display: flex;
			height: 100%;
			width: 100%;
			li {
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				span {
					font-size: 0.8rem;
					width: 100%;
					display: inline-block;
					text-align: center;
				}
				i {
					display: flex;
					align-items: flex-end;
					justify-content: center;
					width: 100%;
					height: 4rem;
					padding-bottom: 0.6rem;
					line-height: 6rem;
					text-align: center;
					>img {
						display: block;
						width: 60%;
					}
				}
			}
		}
	}
	
	.dropup,
	.dropdown {
		position: relative;
		margin: auto 0;
	}
	
	.site {
		font-size: 1px;
	}
	
	.swiper {
		margin-top: 4rem;
		width: 100%;
		.van-swipe {
			width: 100%;
			height: 50vw;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.head {
		width: 100%;
		height: 4rem;
		background-color: #FFFFFF;
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10000;
		.site {
			width: 9rem;
			height: 4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			/*      color: #fff;*/
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				.van-icon-location {
					vertical-align: middle;
					color: green;
				}
				span {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 8;
				}
			}
		}
		/*搜索框*/
		.search {
			flex: 1;
			position: relative;
			display: flex;
			align-items: center;
			vertical-align: middle;
			.van-icon-search {
				position: absolute;
				top: 1.4rem;
				margin: auto 0;
				left: 2rem;
				align-items: center;
			}
			input {
				align-items: center;
				width: 90%;
				padding: 0.7rem 0.4rem 0.7rem 3rem;
				border: none;
				font-size: 1.333rem;
				border-radius: 3rem;
				/*background: linear-gradient(to right,#C9F597 , #92EB93);*/
				background-color: #EBEBEB;
			}
		}
		/*入驻*/
		.enter {
			width: 2rem;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 1.2rem;
			}
		}
	}
	/*专区*/
	
	.monopolyArea {
		width: 100%;
		height: 100%;
		ul {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			li {
				margin-bottom: 10px;
				margin-top: 10px;
				width: 25%;
				text-align: center;
				img {
					
					width: 50%;
					height: 50%;
				}
				p {
					margin-top: 8px;
					font-size: 1.6rem;
					color: #847e7e;
				}
			}
		}
	}
	
	.mint-header {
		width: 100%;
		height: 53px;
		padding: 4.8vw; // border: 1px solid #000;
		background: #d9d9d9;
	}
	
	.mint-search[data-v-20bfb24f] {
		height: 8vh;
		width: 167vh;
		position: absolute;
		left: 0px;
		width: 100%;
		top: 0;
	}
	
	.mint-searchbar-inner .mintui-search {
		font-size: 28px;
		color: #d9d9d9;
	}
	
	.mint-search[data-v-20bfb24f][data-v-20bfb24f] {
		height: 10vh;
	}
	
	.bba {
		width: 50px;
		height: 50px;
		background-color: red;
	}
	
	.index {
		width: 100%;
		padding-bottom: 14vw;
		background-color: #F2F2F2;
	}
</style>

// WEBPACK FOOTER // // src/views/Index.vue