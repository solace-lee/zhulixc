<template lang="html">
	<section class="section5">

		<div class="guess">
			<div class="title">
				<!--<img src="../../../img/indexImage/mall_bg_meirixinpin.png" alt="">-->
				<img src="../../../img/indexImage/mall_bg_pinzhiituijian.jpg" alt="" width="100%" height="100%">
			</div>
			<div class="content">
				<ul>
					<li v-for='(item,index) in grous' :key="index" v-if="index<6">
						<router-link :to="{path:'/detail?id='+item.commodity_id}">
							<div>
								<img :src="item.img_url">
								<div class='describe'>
									<h1>{{item.name}}</h1>
									<!-- <p>{{item.commodity_details}}</p> -->
									<p>
										<span>￥</span>
										<span>{{item.original_price}}</span>

									</p>

								</div>
							</div>
						</router-link>

					</li>

				</ul>

			</div>

		</div>

	</section>
</template>

<script>
	import Util from '../../util/common'
	import { Lazyload } from "mint-ui";
	export default {
		data() {
			return {
				grous: [],
				page: 1
			};
		},
		created() {
			this.getguess();
		},
		methods: {
			getguess() {
				this.$http
					.get(this.HOME + "/Product/area?area=4")
					.then(res => {
						console.log("------------------");
						console.log(res);
						console.log("------------------");
						this.grous = res.data.Data.List;
					}).catch();
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "../../assets/fz.less";
	@import "../../assets/index/style.css";
	// 清除浮动
	.cleafix:after {
		content: ".";
		clear: both;
		display: block;
		height: 0;
		overflow: hidden;
		visibility: hidden;
	}
	
	.section5 {
		width: 100%;
		overflow: hidden;
		position: relative;
		.title {
			margin-top: 10pt;
			width: 100%;
			height: 100pt;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #ffffff;
			img {
				width: 100%;
			}
		}
	}
	
	.guess {
		margin-top: 0.5rem;
		.content {
			padding-top: 1%;
			ul {
				width: 100%;
				// display: flex;
				li {
					width: 33.3%;
					float: left;
					height: 17rem;
					div {
						padding: 0.5rem;
						img {
							/*border-radius: 6px;*/
							width: 100%;
							height: 10rem;
						}
						.describe {
							width: 100%;
							h1 {
								width: 100%;
								height: 30px;
								color: #000;
								margin-top: 6px;
								font-size: 1.4rem;
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
								span:first-child {
									font-size: 1.4rem;
								}
								span:nth-child(2) {
									font-size: 1.4rem;
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
	}
</style>