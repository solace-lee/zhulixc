<template lang="html">
  <section class="section3">
     <div class="title">
    <!--<img src="../../../img/indexImage/mall_bg_pinpaituijian.png" alt="">-->
    	<img src="../../../img/indexImage/mall_bg_pinpaituijian.jpg" alt="" width="100%" height="100%">
   </div>
    <ul class="section3-list">
      <li v-for="k in brand" :key="k.id">
        <router-link :to="{path:'/Category2?brandId='+k.brand_id}" class="section3-list-right">
          <img :src="k.img_url" alt="">
          <!-- <img v-lazy="k.imgUrl"> -->
        </router-link>
      </li>
       
    </ul>
  </section>
</template>

<script>
import { Lazyload } from "mint-ui";

export default {
  data() {
    return {
      brand: [],
      section3: "",
      commodity: [],
      page: 1,
      rows: 10
    };
  },
  created() {
    this.getbrand();
  },
  methods: {
    //获取品牌推荐
    getbrand() {
        this.$http
          .get(this.HOME+"/home/getdata")
          .then(res => {
            console.log(res);
            this.brand = res.data.Data.brand;
            console.log(this.brand);
          })
          .catch(err => {
            console.log(err.header);
          });
      },

  },
  
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section3 {
	    padding-top: 0vw !inportant;;
  .title {
    margin-top: 0pt;
     width: 100%;
    height: 100pt;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
       width: 100%;
    }
  }
}
// h1 {
//   .fz(font-size, 36);
//   font-weight: 600;
//   height: 35px;
//   color: #333333;
//   font-family: hzgb;
//   line-height: 30px;
//   width: 100%;
//  padding:0;
//   text-align: center;
//   background-color: #fff;

//   i {
//     width: 30px;
//     height: 32px;
//     margin-top: 4px;
//     color: #fff;
//     padding-top: 10px;
//     justify-content: center;

//     img {
//       width: 30px;
//       height: 30px;
//     }
//   }
// }
.section3[data-v-518314b0] {
  padding-top: 0 !important;
}
.section3 {
  padding: 0;
  padding-top: 0;
  width: 100%;


  .pt();
  .section3-list {
  	margin-top: 5px;
    width: 100%;
    height: 60vh;
     overflow:hidden;
   

    // .bt();
    > li {
    	border-bottom: 1px solid #DDDDDD3a;
    	border-right: 1px solid #DDDDDD3a;
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 50%;

      float: left;
      .section3-list-right {
        width: 100%;
        display: block;
        position: relative;

        height: 15.2vh;
        text-align: center;
        line-height: 15.2vh;
        img {
        	/*border-radius: 6px;*/
         max-width: 75%;
         max-height: 75%;
        }
        span {
          padding: 0.3vw 1.2vw;
          border-radius: 1vw;
          text-align: center;
          position: absolute;
          bottom: 0.4vw;
          right: 0.2vw;
          background-color: @cl;
          color: #fff;
          .fz(font-size,24);
        }
      }
    }
  }
}
.section3[data-v-b62e11ca] {
    padding: 0;
    padding-top: 0;
    width: 100%;
    padding-top: 2vw;
}
</style>
