<template>
  <div>
  <!-- <v-header></v-header> -->
  <div class="head">
    <div class="site">
      <div  @click="$router.go(-1)">
      	<span style="width: 10px;"></span>
        <van-icon name="arrow-left" />
        
      </div>
    </div>
    <div class="title">
      <van-icon name="search" />
        <input type="text" placeholder="搜索你想购买的商品" style="margin-right: 12px;">
    </div>
  </div>
        <div style="width: 100%;height: 3rem"></div>
    <div class="box">
      <span>
        <img :src="shopparticulars.shop_img_url" alt="">
      </span>
      <span>
        <p>{{shopparticulars.shop_name}}</p>
        <p style=" font-size: 12px;">店铺地址：{{shopparticulars.province}} {{shopparticulars.city}}{{shopparticulars.district}}{{shopparticulars.Village}}
          {{shopparticulars.address_detail}}
          
        </p>
      </span>
      <!-- 关注 -->
      <!-- <span class="inconX">
        <img v-if='content=="取消关注"' src='../../assets/images/kong.png' alt="">
        <img v-if='content=="关注"' src='../../assets/images/red.png' alt="">
        <button name="like-o" v-if='content=="关注"' @click='notattention' class="long">取消关注</button>
        <button name="like-o" v-if='content=="取消关注"' @click='attention'>关注</button>
      </span> -->
    </div>
    <!-- <van-tabs v-model="active">
      <van-tab v-for="(item,index) in title" :title="item" :key="index">
      </van-tab>
    </van-tabs> -->
    <!-- 全部商品 -->
    <div v-if="active==0">
 
      <!-- 列表 -->
      <!-- <van-list v-model="loading" :finished="finished" @load="onLoad"> -->
        <div v-for="(item,index) in commoList2" :key="index" class="goodsBox" @click="tobuy(item.commodityId)">
          <div class="goodsImg">
            <img :src="item.picUrl">
          </div>
          <div style="padding: 0.2rem 0;height: 2rem;">
              <p>{{item.name}}</p>
          </div>
          <div style="display: flex;justify-content: space-between;padding: 0 0.5rem;">
            <span class="num">￥{{item.price}}</span>
            <span class="tobuy">购买</span>
          </div>

        </div>
      <!-- </van-list> -->
      <div class="btns">
        <button :class="{active:isA}" @click='shopMsg(shopparticulars.shop_id)'>店铺详情</button>
        <button class="active">
          <p><img src="../../../img/userImg/mall_bg_customerservice.png" alt=""></p>
          客服
          </button>
      </div>
      <v-baseline v-if="nomore"></v-baseline>
    </div>
    <!-- 新品上架 -->
    <div v-if="active==1">
  
      <!-- <van-list v-model="loading2" :finished="finished2" @load="onLoad2"> -->
        <div v-for="(item2,index) in newlist" :key="index" class="goodsBox"  @click="tobuy(item2.commodityId)">
          <div class="goodsImg">
            <img :src="item2.picUrl">
          </div>
          <div style="padding: 0.2rem 0;height: 2rem;">
              <p>{{item2.name}}</p>
          </div>
          <div style="display: flex;justify-content: space-between;padding: 0 0.5rem;">
            <span class="num">￥{{item2.price}}</span>
            <span class="tobuy">购买</span>
          </div>

        </div>
      <!-- </van-list> -->
      <v-baseline v-if="nomore2"></v-baseline>


    </div>
    <!-- 店铺二维码 -->
    <div v-if="active==2">
      <div class="shopcode">
        <img src="../../assets/images/choujiang.png" alt="">
      </div>

    </div>

  </div>
</template>


<script>
  import Baseline from "@/common/_baseline.vue";
import Header from "@/common/_header.vue";
  import { Toast } from "vant";

  export default {
    components: {
      "v-baseline": Baseline,
      'v-header':Header,
    },
    data: function () {
      return {
        isA:false,
        isB:false,
        nomore: false,
        nomore2: false,
        show: false,
        disabled: false,
        selected: "1",
        loading: true,
        finished: false,
        loading2: true,
        finished2: false,
        // 关注
        content: '',

        active: 0,
        show: true,
        // 店铺详情
        shopparticulars: {},
        // 开关
        off: true,
        // 轮播图
        Simages: "",
        // 店铺标签页
        title: ["全部商品", "热卖区", "市价区",'新品上架'],
        // 全部商品列表
        commoList2: [],
        // 新品上架
        newlist: [],

        page: 1,
        rows: 4,
        shopId: 5,
        userId: 109,
      };
    },
    created() {
      this.getShopId()
      this.getshopMsg();
      this.fileswiper();
      this.loadMore()

      this.userFollowshow();
    },
    watch: {
      active() {
        this.page = 1
        if(this.active==0){
          this.loadMore()
        }
        if (this.active == 1) {
          this.loadMore2()
        }
      }
    },
    methods: {
      getShopId() {
        this.shopId = this.$route.query.shopId;
      },
      // 店铺详情
      getshopMsg() {
        this.$http.get(this.HOME+"/shop/getshopinfo?shopId="+this.shopId).then(res => {
          console.log(res);
          console.log(5555);
          
          this.shopparticulars = res.data.Data.Info;
          console.log(this.shopparticulars);
        });
      },
      shopMsg(id) {
        console.log(id)
        this.$router.push({ path: "/shopMsg?shopId="+id+"&name=店铺详情" });
      },
      //获取轮播图
      fileswiper() {
        this.$http.get("/sysImg/getMainPageSysImg/" + this.shopId + "/5").then(res => {
          console.log(res)
          this.Simages = res.data.data;
          console.log(this.Simages);
        });
      },
      //全部商品列表信息
      loadMore() {

        console.log({ page: this.page, rows: this.rows, shopId: this.shopId });
        this.$http
          .get(this.HOME+"/commodity/queryShopCommodityByPage", {
            params: { page: this.page, rows: this.rows, shopId: this.shopId }
          })
          .then(res => {
            console.log(res)
            var arr = res.data.data.data;
            if (arr.length >= this.rows) {

              this.page++
              console.log("继续")
            } else {
              this.nomore = true
              this.finished = true;
              console.log("已加载全部")

            }
            arr.forEach(val => {
              this.commoList2.push(val);
            });
            this.loading = false;
            console.log(this.commoList2)
          });

      },
      onLoad() {

        console.log(!this.loading)
        if (!this.loading) {
          console.log("111111111111111")
          return
        }
        this.loading = true;
        console.log(this.page)
        this.loadMore()
      },

      // 新品上架
      loadMore2() {
       
        this.$http
          .get(this.HOME+"/commodity/queryShopNewCommodityByPage", {
            params: { page: this.page, rows: this.rows, shopId: this.shopId }
          })
          .then(res => {
            console.log(res);
            var arr = res.data.data.data;
            if (arr.length >= this.rows) {

              this.page++
              console.log("继续")
            } else {
              this.nomore2 = true
              this.finished2 = true;
              console.log("已加载全部")
            }
            arr.forEach(val => {
              this.newlist.push(val);
            });
            this.loading2 = false;
          });

      },

      onLoad2() {

        console.log(!this.loading2)
        if (!this.loading2) {
          console.log("111111111111111")
          return
        }
        this.loading2 = true;
        console.log(this.page)
        this.loadMore2()
      },
      tobuy(id){
          this.$router.push({path:"/detail?id="+id})
      },
      //返回上一页
      go() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style scoped lang="less">
.head {
  width: 100%;
  height: 4rem;
  background-color: #1bc6a3;
  display: flex;
  position: fixed;
  z-index: 100000;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #fff;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-location {
        vertical-align: middle;
      }
      span {
        font-size: 1rem;
      }
    }
  }

  .title {
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span{
      color: #fff;
      margin-right: .5rem;
    }
     .van-icon-search {
        position: absolute;
        left: 20vw
      }
     input {
        width: 60%;
        padding: 0.4rem 0 0.4rem 1.6rem;
        border: none;
        font-size: 0.8rem;
        border-radius: 0.3rem;
      }
    
  }
}

  .swipe {
    height: 220px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }

  }
  .btns{
    width: 100%;
    height: 8vh;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    display: flex;
  justify-content: space-between;
  border-top:1px solid #1bc6a3;
  
  button{
    width: 50%;
    background-color: #fff;
    p{
      width: 100%;
      img{
        width: 6vw;
      }
    }

  }
  .active{
    color: #1bc6a3
  }

  }



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
    // border: 1px solid #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    background-color: #1bc6a3;
    font-size: 14px;
    color: #fff;
    align-items: center;
    position: relative;
    .inconX {
      // border: 1px solid #000;
      display: inline-block;
      display: flex;
      width: 90px;
      height: 20px;
      position: absolute;
      bottom: 0;
      right: 0;

      button {
        // border: 1px solid #000;
        width: 90px;
        height: 20px;
        background-color: #fecd00;
        border-radius: 5px;
        color: #fff;
        text-indent: 1em;
      }

      >img {
        position: absolute;
        left: 16px;
        top: 12px;
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

      >img {
        position: absolute;
        left: 19px;
        top: 12px;
        width: 16px;
        height: 16px;
      }
    }
    >span {
      display: inline-block; // border: 1px solid #000;
      flex-grow: 1;
      padding: 10px;
      >img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
      }
    }
  }

  .van-list {

    padding: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goodsBox {
      margin-top: 0.3rem;
      padding: 0.2rem 0;
      background-color: #fff;
      width: 49%;
      .goodsImg {
        width: 100%;
        height: 12rem;
        /* text-align: center; */
        img {
          height: 100%;
          width: 95%;
        }
      }
      p {
        /* padding: 0.3rem 0; */
        font-size: 0.9rem;
        color: #333;
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
      }
      .num {
        color: #FFCC00
      }
      .tobuy {
        border-radius: 6px;
        border: 1.5px solid #CD2A34;
        color: #CD2A34;
        font-size: 0.8rem;
        padding: 0.1rem 0.5rem;
      }
    }
    .van-list__loading {
      width: 100vw !important;

    }
  }
  .shopcode{
    width: 100%;
   padding-top: 2rem;
   text-align: center;
   img{
     width:60%
   }
  }
</style>