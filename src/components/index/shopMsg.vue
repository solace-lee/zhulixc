<template>
  <div>
     <v-header></v-header>
        <div class="head" style="width: 100%;height: 3.5rem"></div>
    
    <div class="boxx">
      <div class="box" >
        <span>
          <img :src="shopparticulars.shop_img_url" alt="">
        </span>
        <span>
          <!-- <p>{{shopparticulars.shop_name}}</p> -->
          <p>hfkahf</p>
        <p style=" font-size: 12px;">店铺地址：{{shopparticulars.province}} {{shopparticulars.city}}{{shopparticulars.district}}{{shopparticulars.Village}}
          {{shopparticulars.address_detail}}
          
        </p>
       <p>
         <span v-if="shopparticulars.nature=='个人'">
           <img src="../../../img/userImg/mall_bg_personal.png" alt=""><i>个人店</i>
         </span>
         <span v-if="shopparticulars.nature=='企业'">
           <img src="../../../img/userImg/mall_bg_enterprise.png" alt=""><i>企业店</i>
         </span>
         
       </p>
       <!-- <p><img src="../../../img/userImg/mall_bg_enterprise.png" alt="">企业店</p> -->
        </span>
    </div>
    <!-- <div class="synopsis">
      <h3>店铺简介</h3>
      <div>
        店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介
      </div>
    </div> -->
    <div class="phone">
      <span>工商执照</span><span><img src="../../../img/userImg/mall_bg_businesscircles.png" alt=""></span>
    </div>
  </div>
  </div>
</template>


<script>
import { Toast } from "vant";
import Header from "@/common/_header.vue";
export default {
  components: {
    // "v-baseline": Baseline,
    "v-header": Header
  },
  data: function() {
    return {
      show: false,
      active: 1,
      show: true,
      // 店铺详情
      shopparticulars: {},
      // 开关
      off: true,
      shopId: ""
    };
  },
  created() {
    this.getshopMsg();
    this.getShopId();
  },
  methods: {
    getShopId() {
      this.shopId = this.$route.query.shopId;
    },
    // 店铺详情
    getshopMsg() {
      this.$http.get(this.HOME+"/shop/getshopinfo?shopId=1").then(res => {
        console.log(res);
        console.log(1111);
        this.shopparticulars = res.data.Data.Info;
        console.log(this.shopparticulars);
      });
    },

    //返回上一页
    go() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
h1 {
  width: 100%;
  height: 60px;
  background-color: #000;
  text-align: center;
  color: #fff;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .fanhui {
    // border: 1px solid #fff;
    position: absolute;
    left: 10px;
  }
}

.box {
  white-space: 100%;
  height: 120px;
  border: 1px solid #fff;
  background-color: #fff;
   font-size: 14px;
  display: flex;
 
  justify-content: space-between;
  align-items: center;
  position: relative;
  .inconX {
    // border: 1px solid #000;
    display: inline-block;
    display: flex;
    width: 80px;
    height: 20px;
    position: absolute;
    bottom: 0;
    right: 0;

    button {
      // border: 1px solid #000;
      width: 75px;
      height: 20px;
      background-color: #fecd00;
      border-radius: 5px;
      color: #fff;
      text-indent: 1em;
    }

    > img {
      position: absolute;
      left: 16px;
      top: 11px;
      width: 16px;
      height: 16px;
    }
  }
  .incon {
    display: inline-block;
    display: flex;
    width: 100px;
    height: 20px;
    position: absolute;
    bottom: 0;
    right: 0;

    button {
      // border: 1px solid #000;
      width: 100px;
      height: 20px;
      background-color: #fecd00;
      border-radius: 5px;
      color: #fff;
      text-indent: 1em;
    }

    > img {
      position: absolute;
      left: 19px;
      top: 12px;
      width: 16px;
      height: 16px;
    }
  }
  > span {
    display: inline-block; // border: 1px solid #000;
    padding: 10px;
    > img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
  }
  span:nth-child(2){
    flex: 1;
    width: 100%;
    p:last-child{
      padding-top: 1.5rem;
      span{
        background-color: #00AD8A;
        padding: .1rem .2rem;
        color: #fff;
        
        border-radius: .6rem;
      img{
        width: 1rem;
        vertical-align: middle;
        margin: 0 .3rem;

      }
      i{
        vertical-align: middle;
        font-size: .6rem;
      }
      }
    
    }
    
  }
}

.boxE {
  // border: 1px solid #000;
  width: 100%;
  height: 500px; // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center; // padding-top:10px;
  flex-direction: column;
  background-color: #f2f2f2;
  > img {
    width: 200px;
    height: 200px;
  }
  > p {
    width: 200px;
    height: 30px; // border: 1px solid #000;
    text-align: center;
    color: #000;
    line-height: 30px;
  }
}

.mint-navbar .mint-tab-item.is-selected {
  border-bottom: none;
  color: #000;
  margin-bottom: -3px;
}

.su {
  font-size: 30px; //  border: 1px solid #000;
  line-height: 40px;
  color: #eee;
}

.btnn {
  // border: 1px solid #000;
  width: 75px;
  height: 20px;
  background-color: #f77076;
  border-radius: 5px;
  color: #fff; //  text-indent: 1em;
  position: absolute;
  right: 15px;
  top: 88px; // display: none;
}
.synopsis {
  margin-top: 5px;
  background: #fff;
  padding: 0px 10px;
  font-size: 14px;
  padding: 10px;
}
.synopsis h3 {
  font-weight: 600;
}
.synopsis div {
  text-indent: 2rem;
}
.phone {
  margin-top: 5px;
  background-color: #fff;
  padding: 8px;
  span{
    vertical-align: middle;
    img{
      width: 1.3rem;
      vertical-align: middle;
      margin-left: 1rem;
    }
  }
}
</style>