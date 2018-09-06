<template lang="html">

  <div class="service">
    <ul>
      <li>  
         <router-link :to="{name:'分类页'}">
           <i><img src="../../../img/mall_btn_commodityclassification.png" alt=""></i>
          <span @click="classify">商品分类</span>
        </router-link>
      </li>    
       
      <li>
         <router-link :to="{name:'拼团商城'}">
           <i><img src="../../../img/mall_btn_coupon.png" alt=""></i>
          <span @click="classify">拼团商城</span>
        </router-link>
      </li>
      <li>
         <router-link :to="{name:'充值中心'}">
           <i><img src="../../../img/mall_btn_fightgroups.png" alt=""></i>
          <span @click="classify">充值中心</span>
        </router-link>
      </li>
      <li>
         <router-link :to="{name:'登录页'}">
           <i><img src="../../../img/mall_btn_recharge.png" alt=""></i>
          <span @click="classify">优惠券</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
     classify(){
     }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .service {
    width: 100%;
    // border: 1px solid #000;
    background-color: #fff;
    display: flex;
    flex-grow:1;
    .bd();
    ul {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-around;
      height: 120px;
      // flex-grow:1;
      width: 100%;
      margin-top: 5px;
      li {
        display: -webkit-flex;
        display: -ms-flex;       
        // border: 1px solid #000;
        height: 100%;            
        span {
          //  border: 1px solid #000;
          width: 100%;
          display: inline-block;
          .fz(font-size,30);
          // padding-left: 1vw;
          text-align: center;
        }
        i {
          .fz(font-size,36);
          // border: 1px solid #000;
          margin: 15px;
          display: block;
          text-align: center;
          width: 9vh;
         height: 9vh;
         border-radius: 50%;
         margin-bottom: 10px;
         margin-top: 20px;
          text-align: center;
        line-height: 8vh;
        
        // flex: 2;
        >img{
          width: 100%;
          height: 100%;
        }
        }
      }
    }
  }

</style>
