<template>
	<div class="tmpl">
		<v-header></v-header>
		<div class="head">
		</div>
		<div class="">
			<div style="height: 120pt;width: 100%;">
				<!--				<img src='../../../img/userImg/huiyuan.png' width="100%" height="100%"/>-->
				<mt-swipe :auto="4000">
					<mt-swipe-item>
						<router-link :to="{  path:'/detail?&id=1154'}"><img src='../../../img/userImg/banner2.png' width="100%" height="100%" /></router-link>
					</mt-swipe-item>
					<mt-swipe-item>
						<router-link :to="{  path:'/detail?&id=1153'}"><img src='../../../img/userImg/banner1.png' width="100%" height="100%" /></router-link>

					</mt-swipe-item>
				</mt-swipe>
			</div>

			<mt-navbar v-model="selected">
				<mt-tab-item id="1">
            <div @click="" style="font-size: 1.56rem;">最热</div>
				</mt-tab-item>
				<mt-tab-item id="2">
					<div @click="" style="font-size: 1.56rem;">最新</div>
				</mt-tab-item>

				<mt-tab-item id="3">
					<div @click="" style="font-size: 1.56rem;">有货</div>
				</mt-tab-item>
				<mt-tab-item id="4">
					<div @click="" style="font-size: 1.56rem;">包邮</div>
				</mt-tab-item>
			</mt-navbar>

		</div>

		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="content">

					<ul>
						<li v-for='(item,index) in list' :key="index">
							<router-link :to="{path:'/detail?id='+item.commodity_id}">
								<div>
									<img :src="item.img_url">
									<div class='describe'>
										<h1 style="text-overflow:ellipsis">{{item.name}}</h1>
										<!-- <p>{{item.commodity_details}}</p> -->

									</div>
								</div>
							</router-link>
						</li>

					</ul>

				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div class="content">
					<ul>
						<li v-for='(item,index) in grous' :key="index">
							<router-link :to="{path:'/detail?id='+item.commodity_id}">
								<div>
									<img :src="item.img_url">
									<div class='describe'>
										<h1>{{item.name}}</h1>
										<!-- <p>{{item.commodity_details}}</p> -->

									</div>
								</div>
							</router-link>
						</li>

					</ul>

				</div>
			</mt-tab-container-item>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<div class="content">
					<ul>
						<li v-for='(item,index) in list' :key="index">
							<router-link :to="{path:'/detail?id='+item.commodity_id}">
								<div>
									<img :src="item.img_url">
									<div class='describe'>
										<h1>{{item.name}}</h1>
										<!-- <p>{{item.commodity_details}}</p> -->

									</div>
								</div>
							</router-link>
						</li>

					</ul>

				</div>
			</mt-tab-container-item>
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<div class="content">
					<ul>
						<li v-for='(item,index) in grous' :key="index">
							<router-link :to="{path:'/detail?id='+item.commodity_id}">
								<div>
									<img :src="item.img_url">
									<div class='describe'>
										<h1>{{item.name}}</h1>
										 <!--<p>{{item.commodity_details}}</p> -->

									</div>
								</div>
							</router-link>
						</li>

					</ul>

				</div>
			</mt-tab-container-item>
		</mt-tab-container>

		<v-baseline v-if="nomore"></v-baseline>
		<!--		<v-footer></v-footer>-->
	</div>
</template>

<script>
	import Header from "@/common/_header.vue";
	import Baseline from "@/common/_baseline.vue";
	import Footer from "@/common/_footer.vue";
	export default {
		components: {
			"v-header": Header,
			"v-baseline": Baseline,
			"v-footer": Footer,
		},
		data() {
			return {
				selected: "2",
				list: [],
				grous: [],
				page: 1,
				nomore: false,
				finished: false,
				loading: true,
			};
		},
		created() {
			this.getcommodity();
			this.getlist();
		},
		methods: {
			getlist() {
				this.$http.get(this.HOME + "/Product/area?area=2&page=" + this.page).then(res => {
					console.log(res);
					var arr = res.data.Data.List;
					if(arr.length == 10) {
						this.page++;
						console.log('加载');
					} else {
						this.nomore = true;
						this.finished = true;
						console.log('已加载全部');
					}
					var strArr = [];
					arr.forEach(val => {
						var str = val.server;
						strArr = str.split(",");
						for(let i = 0; i < strArr.length; i++) {
							console.log(strArr);
							val.server = strArr;
						}
						this.list.push(val);
					});
					this.loading = false;
				});
			},
			// 获取列表
			getcommodity() {
				this.$http
					.get(this.HOME + "/home/getdata")
					.then(res => {
						this.grous = res.data.Data.cha;
						console.log(this.commodity);
					})
					.catch(err => {
						console.log(err.header);
					});

			},
			onLoad() {
				console.log(!this.loading)
				if(!this.loading) {
					console.log("111111111111111")
					return
				}
				this.loading = true;
				console.log(this.page)
				this.getlist()
			},
			tocommodityinfo(id) {
				console.log(123);
				//  this.$router.push({ path: "/category?name=" + "分类" });
				this.$router.push({
					path: "/detail?name=商品详情" + '&id=' + id
				});
			}
		}
	};
</script>
<style scoped lang="less">
	// 清除浮动
	.cleafix:after {
		content: ".";
		clear: both;
		display: block;
		height: 0;
		overflow: hidden;
		visibility: hidden;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		text-decoration: none;
		border-bottom: 3px solid #26a2ff;
		color: #26a2ff;
		margin-bottom: -3px;
	}
	
	.head {
		margin-bottom: 2px;
		width: 100%;
		height: 4rem;
		background-color: #FFFFFF;
		z-index: 10000;
	}
	
	.list {
		padding: 0 10px;
	}
	
	.content {
		ul {
			width: 100%;
			// display: flex;
			li {
				border-radius: 8px;
				margin: 2%;
				width: 46%;
				float: left;
				div {
					padding: 0.5rem;
					img {
						border-radius: 8px;
						width: 96%;
						margin: 2%;
						height: 10rem;
					}
					.describe {
						width: 100%;
						h1 {
							width: 100%;
							height: 34px;
							color: #666666;
							margin-top: 6px;
							font-size: 1.6rem;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
						p {
							width: 100%;
							font-size: 0.8rem;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						p {
							padding: 0.3rem 0;
							position: relative;
							span {
								color: #D42732;
							}
							span:nth-child(2) {
								font-size: 1.5rem;
							}
							span:nth-child(3) {
								display: inline-block;
								border: 1px solid #cb2221;
								border-radius: 0.4rem;
								text-align: center;
								color: #cb2221;
								width: 2.5rem;
								height: 1.2rem;
								position: absolute;
								right: 0.8rem;
								top: 0.5rem;
							}
						}
					}
				}
			}
		}
	}
	
	.group {
		width: 100%;
		height: 120px;
		display: flex;
		margin-top: 8px;
		background-color: #fff;
		.group-left {
			width: 30vw;
			height: 30vw;
			text-align: center;
			>img {
				padding-top: 2.5%;
				width: 95%;
				height: 95%;
			}
		}
		.group-right {
			position: relative;
			padding-left: 8px;
			width: 65%;
			/* height: 100%; */
			font-size: 14px;
			line-height: 20px;
			/* display: flex;
        justify-content: center;
        flex-direction: column; */
			.goodsname {
				color: #666;
				font-weight: 600;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-break: break-all;
				span {
					font-size: 0.6rem;
					border: 1px solid #fc5753;
					color: #fc5753;
					padding: 0 0.2rem;
				}
			}
			.serve {
				position: absolute;
				left: 5px;
				height: 30%; // display: flex;
				// align-items: center;
				>span {
					background-color: #00ad8a;
					color: #fff;
					border-radius: 0.3rem;
					display: inline-block;
					padding: 2px 4px;
					font-size: 14px;
					line-height: 14px;
					text-align: center;
					margin: 2px;
					font-size: 12px;
				}
			}
			.serve2 {
				position: absolute;
				top: 4rem;
				left: 10px;
				display: flex;
				align-items: center;
				height: 30%;
				color: #ff8400;
				>span:nth-of-type(1) {
					font-size: 0.8rem;
				}
				>span:nth-of-type(2) {
					font-size: 1.2rem;
					left: 10px;
				}
				>span:nth-of-type(3) {
					margin-left: 1rem;
					width: 3rem;
					height: 1rem;
					display: flex;
					align-items: center;
					color: #fc5753;
					border: 1px solid #fc5753;
					border-radius: 0.3rem;
				}
			}
			.store {
				position: absolute;
				left: 10px;
				bottom: 0.5rem;
				font-size: 12px;
				span:nth-child(2) {
					color: #666666;
					margin-left: 0.4rem;
					font-size: 0.6rem;
				}
			}
		}
	}
</style>