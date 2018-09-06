<template>
  <section class="section2" >
    <div class="title">
   <!--<img src="../../../img/indexImage/mall_bg_pinzhituijian.png" alt="">-->
   	<p style="font-size: 20px;color: #777777;width: 90%;">新品推荐</p>
   	<span @click="getcommodity" style="float: right;margin-top: 0px;"><img src="../../../img/indexImage/hz.png" style="width: 15px;"></span>
   </div>
    <div class="section2-list" style=" padding-top: 0;">

      <ul>
        <li v-for="(k,index) in commodity" :key="k.commodity_id" v-if="index<15">
          <router-link :to="{path:'/detail?id='+k.commodity_id}">
           <img v-lazy="k.img_url">
          </router-link>
          <h2 class="goodstitle">
            {{k.name}}
          </h2>
          <p class="section2-list-intro">
            {{k.brand}}
          </p>
          <p class="section2-list-price">
            <span> ￥{{k.discount_price}}</span>
           
           <!--<span class="buyBtn" @click="addCarList(commodity)">购物车</span>-->
          </p>
        </li>

      </ul>
    </div>
   
    
  </section>
</template>
<script>
import { Lazyload } from "mint-ui";
import {mapGetters, mapActions } from "vuex"
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
  computed: {
        ...mapGetters(['selectedList','unSelectedList']) 
    },
  methods: {
   ...mapActions(['addCarList']),
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
    height: 32pt;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    img {
      width: 8rem;
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
/*  -webkit-overflow-scrolling: touch;*/
  > ul {
    white-space:nowrap; 
    width: 380%;

    li {
      // margin-right: 1vw;
      width: 100px;
      height: 150px;
      flex-direction: column;
      display: inline-table;
      z-index: 1;
      position: relative;
      margin: 5px;
      display: inline-table;
      a,
      img {
      	border-radius: 6px;
        display: block;
        width: 100px;
        height: 100px;
      }
      .goodstitle {
        color: #000;
        margin-top: 6px;
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
      	width: 100px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      h2 {
        .fz(font-size, 32);

        color: #333;
      }

      p.section2-list-intro {
      	width: 100px;
      	overflow: hidden;
       text-overflow:ellipsis;
        white-space: nowrap;
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
