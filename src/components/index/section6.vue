<template>
  <section class="section2" >
    <div class="title">
   <!--<img src="../../../img/indexImage/mall_bg_pinzhituijian.png" alt="">-->
   	<p style="font-size: 22px;color: #8CD71B;font-family:'楷体';width: 75%;">新品推荐</p>
   	<span @click="getcommodity" style="float: right;margin-top: 20px;"><img src="../../../img/indexImage/hz.png" style="width: 20px;">换一组</span>
   </div>
   
    <div class="section2-list" id="wrap" style=" padding-top: 0;">

      <ul id="list">
        <li v-for="(k,index) in commodity" :key="k.commodity_id" v-if="index<15">
          <router-link :to="{path:'/detail?id='+k.commodity_id}">
            <img v-lazy="k.img_url">
          
          <h2 class="goodstitle">
            {{k.name}}
          </h2>
          <p class="section2-list-intro">
            {{k.brand}}
          </p>
          <p class="section2-list-price">
            <span> ￥{{k.discount_price}}</span>
           
<!--            <span class="buyBtn">购买</span>-->
          </p>
          </router-link>
        </li>
      </ul>
    </div>
   
    
  </section>
</template>
<script>

import { Lazyload } from "mint-ui";

export default {
  props: ["section2"],
  data() {
    return {
      commodity: [],
      page: "1",
      rows: "100"
    };
  },
  created() {
    this.getcommodity();
  },
  watch:{
  },
  methods: {
    //品质推荐
    getcommodity() {
      this.$http
        .get(this.HOME+"/home/getdata")
        .then(res => {
          this.commodity = res.data.Data.cha;
          console.log( this.commodity);
        })
        .catch(err => {
          console.log(err.header);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section2 {
  background: #eee;
  .title {
    margin-top: 1rem;
    width: 100%;
    height: 39pt;
    display: flex;
    /*justify-content: center;
    align-items: center;*/

  background-color: #ffffff;
    img {
      width: 8rem;
    }
    p{
    	padding-top: 12pt;
    	margin-left: 12pt;
    }
  }
}

.section2-list {
  overflow-x: auto;
  width: 100%;

  background-color: #fff;
  display: flex;

  .pt();
  /*原生滑动*/
  -webkit-overflow-scrolling: touch;
  > ul {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    width: 380%;

    li {
      // margin-right: 1vw;
      width: 100px;

      display: flex;
      flex-direction: column;

      margin: 0 auto;
      margin: 8px;
      a,
      img {
      	border-radius: 5px;
        display: block;
        width: 100px;
        height: 120px;
      }
      .goodstitle {
        color: #333;
        font-size: 1.3rem;
        height: 2.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      h2 {
        .fz(font-size, 32);
  margin-top: 6px;
        color: #333;
      }

      p.section2-list-intro {
      	 margin-top: 6px;
        // padding-top: 2vw;
        .fz(font-size, 26);
        color: rgb(150, 150, 150);
      }

      p.section2-list-price {
        color: #D42732;

        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFang SC;
        .buyBtn {
          border: 1px solid #cd2a34;
          padding: 0 0.3rem;

          border-radius: 5px;

          font-size: 0.7rem;
          color: #cd2a34;
        }
      }
    }
  }
}
		@keyframes move{
			0% {
				right: -500px;
			}
			50% {
				right: 0;
			}
			100% {
				right: -500px;
			}
		}

		#wrap {
			width: 380%;
			height: 200px;
			margin: 0px auto;
			overflow: hidden;
		}
		
		#list {
			position: absolute;
			animation: 30s move infinite linear;
		}
		
		#list li {
			list-style: none;
			color: #fff;
/*			text-align: center;*/
			float: left;
		}
		
		#wrap:hover #list {

		}
.section2-banner {
  display: block;
  width: 100vw;
  img {
    display: block;
    height: 24vw;
    width: 100%;
  }
}
</style>
