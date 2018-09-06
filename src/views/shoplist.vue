<template lang="html">
  <!-- 商品列表页 -->



  <div>
    <div class="classfily">

      <mt-navbar v-model="selected">

        <mt-tab-item id='1' selected>
          <div @click="getAllList">全部商家</div>
        </mt-tab-item>
        <mt-tab-item :id="item.classifyId" v-for="item in titlelist" :key="item.classifyId">
          <div @click="checksecond(item.classifyId)">
            {{item.classifyName}}
          </div>

        </mt-tab-item>
      </mt-navbar>



    </div>
    <van-popup v-model="show" position="top" :overlay="true">
      <div class="secondlist">
        <div class="searchsecond" v-for="item2 in secondlist" @click="searchlist(item2.classifyId)">
          <span>{{item2.classifyName}}</span>
          <span>
            <img src="../assets/images/toright.png" alt="">
          </span>
        </div>
      </div>
    </van-popup>

    <van-list v-model="loading" :finished="finished" @load="onLoad">

      <div class="list">

        <div class="group" v-for='item in shoplist' :key="item.grabble" @click="toShop(item.shopId)">
          <div class="group-left">
            <img :src="item.shopImgUrl" alt="">
          </div>
          <div class="group-right">
            <div class="goodsname">
              {{item.shopName}}
            </div>

            <div class="serve2">
              {{item.addressDetail}}
            </div>
          </div>

        </div>
      </div>
    </van-list>


    <v-baseline v-if="nomore"></v-baseline>
  </div>

</template>

<script>
  import search2 from "../components/index/search2.vue";
  import Baseline from "@/common/_baseline.vue";
  import { Toast } from 'vant';
  export default {
    components: {
      "v-baseline": Baseline,
      "v-search2": search2
    },

    data() {
      return {
        nomore: false,
        show: false,
        selected: "1",
        count: 0,
        isLoading: false,
        loading: true,
        finished: false,
        show: false,
        shoplist: [],
        id: "",
        secondlist: [],
        page: 1,
        rows: 10,
        secondClassifyId: "",
        titlelist: []
      };
    },

    created() {
      this.gettitlelist()
      this.getlist()

    },
    methods: {
      // 分类列表
      gettitlelist() {
        this.$http.get(this.HOME+"/commodity/classify/queryFirstClassifyName").then(res => {
          console.log(res)
          this.titlelist = res.data.data
          console.log(this.titlelist)

        });
      },
      toShop(id) {

        this.$router.push({ path: "/indexS?shopId=" + id })
      },
      // 查看二级分类
      checksecond(id) {
        console.log(id)
        this.$http.get(this.HOME+"/commodity/classify/queryClassifyListByParentId?id=" + id).then(res => {
          console.log(res)
          this.secondlist = res.data.data
          this.show = true

        })
      },
      searchlist(id) {
        console.log(id)

        this.shoplist = []
        this.secondClassifyId = id
        this.page = 1
        this.show = false
        this.getlist()
      },



      // 获取列表
      getlist() {
        console.log({ page: this.page, rows: this.rows, secondClassifyId: this.secondClassifyId })
        this.$http.post(this.HOME+"/shop/queryShops?page=" + this.page + "&rows=" + this.rows, { secondClassifyId: this.secondClassifyId }).then(res => {
          console.log(res)
          var arr = res.data.data.data
          console.log(arr.length)
          if (arr.length >= this.rows) {

            this.page++
            console.log("继续")
          } else {
            this.nomore = true
            this.finished = true;
            console.log("已加载全部")

          }
          arr.forEach(val => {
            this.shoplist.push(val)
          });
          this.loading = false;
          console.log(this.shoplist)
          console.log(this.loading)
        })
      },

      //  综合列表
      getAllList() {
        this.shoplist = []
        this.show = false
        this.page = 1
        this.secondClassifyId = ""
        this.getlist()
      },
      onLoad() {

        console.log(!this.loading)
        if (!this.loading) {
          console.log("111111111111111")
          return
        }
        this.loading = true;
        console.log(this.page)
        this.getlist()


      },





    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/fz.less";
  @import "../assets/index/style.css";
  @import "../assets/user/icon/carstyle.css";
  .search-btn {
    font-size: 0.6rem;
    color: #fff;
    span {
      padding: 0.3rem 0.6rem;
      border-radius: 1.2rem;
    }
    span:nth-of-type(1) {
      background-color: #CD2A34;
    }
    span:nth-of-type(2) {
      background-color: #FF6565;
    }
  }

  .secondlist {
    background-color: #fff;
    width: 100%;
    margin-top: 3rem;
    /* position: fixed;
  left: 0;
  top: 3rem; */
    z-index: 5;
  }

  .searchsecond {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    border-bottom: 1px solid #eee;
    img {
      height: 0.8rem;
    }
  }



  .classfily {
    position: fixed;
    z-index: 999999;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    width: 100%;
    height: 2.8rem;
    top: 0;
    line-height: 2.8rem;
    >div {
      height: 100%;
      flex: 1;
      text-align: center;
    }
  }

  .list {
    padding-top: 3rem !important;
  }
  .icons {
    /* border: 1px solid #000; */
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);

  }

  .list {
    padding: 0 10px;
  }

  .group {
    width: 100%;
    /* height: 120px;  */
    display: flex;
    margin-top: 5px;

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

      padding-left: 8px;
      width: 65%;

      font-size: 14px;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .goodsname {
        padding-top: 0.2rem;
        font-size: 1rem;
        color: #666;
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }

    }
  }


  .serve2 {
    display: flex;
    align-items: center;
    height: 30%;

    color: #666;

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
        width: 100%; // border: 1px solid #fff;
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
    position: relative;
    padding: 5px 10px;
    height: 40px;

    /* display: flex;
     align-items: center; */
    input {
      margin-left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 8px;

      /* border-radius: 5px; */
      text-indent: 40px;
      font-size: 14px;
    }
    .mintui-search {
      font-size: 25px;
      color: #d9d9d9;
      border: 1px solid #eee;
      position: absolute;
      left: 25px;
      top: 52px;
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