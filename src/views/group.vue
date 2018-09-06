<template lang="html">
  <!-- 拼团商城 -->
  <div class="wrap">
    <!-- <v-header class="header" style="background:#000;">
      <h1 slot="title" style="color: #fff;">拼团商城</h1>
    </v-header> -->
    <!-- 搜索框 -->
    <div class="seek">
      <img src="../../img/mall_icon_search.png" alt="" class="se">
      <input type="text" placeholder="搜索你想购买的商品">
    </div>
    <!-- v-for="item in grou2" :key="item.grou2" -->
    <mt-navbar v-model="selected">
      <!-- @click="check(item.id) -->
      <mt-tab-item id='1' selected>综合</mt-tab-item>
      <mt-tab-item :id="item.classifyId" v-for="item in group2" :key="item.group2">{{item.classifyName}}
      </mt-tab-item>
    </mt-navbar>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->

    <!-- 上拉加载 -->
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <!-- 内容 -->
      <mt-tab-container v-model="selected">

        <mt-tab-container-item id='1'>
          <div class="group" v-for='item in grou' :key="item.grou">
            <div class="group-left">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="group-right">
              <span class="name">{{item.commodityName}}
                <br>
              </span>
              <div class="price">
                <span>
                  <del>原价：{{item.originalPrice}}</del>
                </span>
                <span>已成团：{{item.joinPeople}}人</span>
              </div>
              <div class="price2">
               
                <span>{{item.numberOfPeople}}人拼团</span>
                
                <span>￥{{item.groupBuyingPrice}}/1件</span>
                
                <router-link :to="{ path:'/Ptuan?id='+item.commodityId+'&groupbuyingId='+item.groupbuyingId}">
                  <span class="pTuan">去拼团></span>
                </router-link>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item :id='this.selectID'>
          <div class="group" v-for='item in grou' :key="item.grou">
            <div class="group-left">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="group-right">
              <span>{{item.commodityName}}
                <br>
              </span>
              <div class="price">
                <span>
                  <del>原价：{{item.originalPrice}}</del>
                </span>
                <span>已成团：{{item.joinPeople}}人</span>
              </div>
              <div class="price2">
                <span>团</span>
                <span>{{item.numberOfPeople}}人团</span>
                <span>￥</span>
                <span>{{item.groupBuyingPrice}}</span>
                <span>/1件</span>
                <router-link :to="{ name:'团购商品详情'}">
                  <span class="pTuan">去拼团&nbsp;&nbsp;&nbsp;></span>
                </router-link>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id="this.selectID">
          <mt-cell v-for="n in this.selectID" :title="'content ' + n" />        
        </mt-tab-container-item> -->
      </mt-tab-container>
      <van-cell v-for="item in list" :key="item" :title="item + ''" />
    </van-list>


    </van-pull-refresh>

    <!-- <button class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" ref="loadMoreBtn" @click="getgroupList">加载更多</button> -->
  </div>

</template>

<script>
  import Header from "@/common/_header.vue";
  import Aside from "@/components/category/category.vue";
  //import category from "@/http/mock.js"; //模拟数据;
  import ptuan from './Ptuan.vue'
  export default {
    components: {
      "v-header": Header,
      "v-aside": Aside
    },
    data: function () {
      return {
        // 定义上拉加载
        list: [],
        loading: false,
        finished: true,
        selected: "1",
        selectID: '',
        grou: [],
        grou2: [],
        group2: [],
      };
    },
    watch: {
      selected: function (val, oldVal) {
        // alert(val);
        //val     切换后 id
        //oldVal  切换前 id 
        this.selectID = val;
        this.grou = [];
        this.$http
          .post("/GroupBuying/queryGroupBuyingByClassifyId", { classifyId: this.selectID })
          .then(res => {
            console.log(res);
            console.log(this.grou);
            console.log(3333333333333);
            var g = res.data.data;
            this.grou = g.data.map(function (params, i) {
              /*alert(params.commodityName);*/
              return params;
            });



          });
      }
    },
    created() {
      this.getGroup(),
        this.getGroup2();
      // this.getgroupList();
    },
    methods: {
      aaa() {
        // alert(id);
        this.ids = id;
        // console.log(id)
      },
      //获取团购列表
      getGroup(id) {
        // id: res.data.message.orderid
        this.$http
          .post(this.HOME+"/GroupBuying/queryGroupBuyingByClassifyId", {})
          .then(res => {
            console.log(res);
            var g = res.data.data;
            this.grou = g.data.map(function (params, i) {
              /*alert(params.commodityName);*/
              return params;
            });
          });
      },
      // check(id){
      //   this.getGroup(id)
      // },

      // 获取tab栏
      getGroup2() {
        this.$http.get(this.HOME+"/commodity/classify/queryFirstClassifyName", {})
          .then(res => {
            // console.log(this.group2 );
            var group = res.data;
            console.log(group)
            this.group2 = group.data.map(function (params, i) {
              // alert(params.classifyName)
              return params;
            });

          });
      },
      onLoad() {
        alert(111);
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      getid(id) {
        id: res.data.classifyId
        this.$http.get(this.HOME+"/commodity/classify/querythirdclassifyname:id", {})
      },
      //上拉加载
      // 2
      getgroupbuyingId() {
        id: res.data.groupbuyingId
        this.$http.get(this.HOME+'/commodity/classify/querythirdgroupbuyingId:id', {})
        // alert(id)
      }
    },

  };
</script>

<style lang="less" scoped>
  @import "../assets/fz.less";
  @import "../assets/index/style.css";
  @import "../assets/user/icon/carstyle.css";

  .wrap {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    background-color: #eee; // border: 1px solid #000;
    .group {
      width: 100%;
      height: 18vh;
      display: flex;
      margin-top: 5px;

      background-color: #fff;

      .group-left {
        width: 33%;
        height: 100%;
        >img {
          width: 100%;
          height: 100%;
        }
      }
      .group-right {
        width: 65%;
        height: 95%;
        font-size: 0.8rem;
        .name{height: 2.1rem;
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2; 
        }
        .price {
          width: 100%;
          color: #ff6170;
          font-size: 10px;
          padding-top: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          >span:nth-of-type(2) {
            color: #999;
          }
        }
        .price2 {
          width: 90%; 
          margin: 10px auto;
          display: flex;
          color: #fff;
          border-radius: 20px;
          height: 20px;
          font-size: 0.7rem;
          line-height: 20px;
          >span{
            flex: 1;
            background-color: #ff6170;
            height: 100%;
            
          }
          a{
            flex: 1;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
             background: red;
            height: 100%;
          }
          >span:nth-of-type(1) {
            border-right: 2px dotted #fff;
            /* font-size: 12px;  */
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            display: inline-block;
           
           
            text-align: center;
          }
          
          .pTuan {
            display: flex;
            align-items: center;
            justify-content: center;
            color:#fff;

          }
        }
      }
    }
  }

  .se {

    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    z-index: 999;
  }

  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #eee;
    h1 {
      width: 100%;
      height: 8vh;
      background: rgb(129, 123, 123);
      text-align: center;
      line-height: 8vh;
      color: #fff; // border: 1px solid #000;
    }
    .header {
      width: 100%;
      height: 40vw;
      background: url(../../static/carbg.png) center #ff6170;
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;

      .header-icon {
        border: 0.4vw solid #ffffff;
        background-color: @cl;
        margin-left: 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        margin-top: 2vw;

        span {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
        }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: 0.2vw;
        margin-top: 7vw;
      }
    }
    .main {
      width: 90%; // border: 1px solid #000;
      margin: 0 auto;
      border-radius: 10px;
      position: relative;
      top: -80px;
      .my-indent {
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
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px; // border: 1px solid #000;
        margin-bottom: -1px;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230);
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, 0.4);
            position: relative;
          }
          i {
            position: relative;
            top: 0.8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px; // border: 1px solid #fff;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
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
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        margin-top: 10px; // border: 1px solid #000;
      }
      .my-pay2 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff; // border: 1px solid #000;
        // margin-top: 10px;
        // height: 30vw;
        // line-height: 30vw;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,
      .my-service,
      .my-settle {
        width: 100%;
        border: 1px solid #fff;
        background-color: #fff;
        .mt();
        .bd();
        .bt();
        >a {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 2;
            padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: 0.4vw;
            }
          }
        }
      }
    }
  }

  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }

  .seek {
    width: 100%;
    height: 3rem;
    border: 1px solid #eee;
    background-color: #eee;
    position: relative;
    input {
      width: 93%;
      height: 2.5rem;
      border: 1px solid #eee;

      border-radius: 8px;
      text-indent: 2em;
      font-size: 0.8rem;
      position: relative;
    }


  }

  .mint-navbar {
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    /* display: flex; */
    /* text-align: center; */
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid red;
    color: red;
    margin-bottom: -3px;
  }
</style>