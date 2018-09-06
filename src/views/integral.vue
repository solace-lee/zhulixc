<template lang="html">
  <div class="car">
    <v-header></v-header>
    <div class="head"></div>

<div class="msgs" @click='message'>
  <img src="../../img/userImg/personal_icon_news.png" alt="">
</div>
    <!-- 用户名 -->
    <header class="header">
      
      <router-link :to="{ path:'/User2?id='+login.userId}">
        <div class="header-icon">
          <div>
            <img :src="login.headImgUrl" v-if="login.headImgUrl" alt="">
            <img src="../../img/userImg/634095260664276696.png" alt="">

            <span class="username">{{login.nickName}}</span>
          </div>

        </div>
        <div class='arch'>

        </div>
        <div class='msg'>
          <span>普通会员</span>
          <br>
          <span>用户名</span>
          <br>
          <span>推荐码：1234567</span>
        </div>

      </router-link>
    </header>
    <div class="main">
      <router-link class="my-indent" :to="{ path:'/UserFf2?id='+login.userId }">
        <span class="my-indent-left">
<div>
          <img src="../../img/userImg/personal_icon_order.png" alt="">
          <span>我的订单</span>
          </div>
        </span>
        <div class="my-indent-right">
          <span>全部订单</span>
          <i class="icon-go"></i>
        </div>
      </router-link>

      <section class="my-pay">
        <router-link :to="{ path:'/UserFf2?id='+login.userId +'&orderStatus=1'}">

          <img src="../../img/userImg/personal_icon_pendingpayment.png" alt="">
          <p>待付款</p>
        </router-link>
        <router-link :to="{ path:'/UserFf2?id='+login.userId +'&orderStatus=2'}">

          <img src="../../img/userImg/personal_icon_pendingdelivery.png" alt="">
          <p>待收货</p>
        </router-link>
        <router-link :to="{ path:'/UserFf2?id='+login.userId +'&orderStatus=3'}">

          <img src="../../img/userImg/personal_icon_goodsreceipt.png" alt="">
          <p>待发货</p>
        </router-link>
        <router-link :to="{ path:'/UserFf2?id='+login.userId +'&orderStatus=4'}">

          <img src="../../img/userImg/personal_icon_complete.png" alt="">
          <p>完成</p>
        </router-link>
      </section>

      <router-link class="my-indent2" :to="{ path: '/wallet?name=我的收益'}">
        <span class="my-indent-left">
          <div>
          <img src="../../img/userImg/personal_bg_wallet.png" alt="">
          <span>我的钱包</span>
          </div>
        </span>
      </router-link>
      <div class='wallet'>
        <ul>
          <li>
            <router-link :to="{ path: '/wallet?name=我的收益'}">
           <div> <span>400:00</span>
            <span>收益</span></div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/wallet?name=我的积分'}">
             <div>
            <span>100</span>
            <span>积分</span>
            </div>
            </router-link>
          </li>
          <li>
             <div>
            <span>0:00</span>
            <span>已返</span>
            </div>
          </li>
          <li>
            <div>
            <span>0:00</span>
            <span>待返</span>
            </div>
          </li>
        </ul>
      </div>
      <router-link class="my-indent2" :to="{ name: ''}">
        <span class="my-indent-left">
            <div>
          <img src="../../img/userImg/personal_bg_shop.png" alt="">
          <span>入驻申请</span>
            </div>
            <i class="icon-go"></i>
        </span>
      </router-link>
          <router-link class="my-indent2" :to="{ name: ''}">
        <span class="my-indent-left">
            <div>
          <img src="../../img/userImg/personal_bg_data.png" alt="">
          <span>我的账号</span>
            </div>
            <i class="icon-go"></i>
        </span>
      </router-link>
            <router-link :to="{ path:'/shipping?id='+login.userId}">
        <span class="my-indent-left">
          <div>
            <img src="../../img/userImg/personal_bg_receivingaddress.png" alt="">
          <span>收货地址</span>
          </div>
          <i class="icon-go"></i>
        </span>
      </router-link>

       <section class="my-pay2">
        <router-link :to="{ path:'/shipping?id='+login.userId}">

          <img src="../../img/个人中心/personal_icon_rceivingaddress@2x.png" alt="">
          <p>收货地址</p>
        </router-link>
        <router-link :to="{path:'/Kfc?id='+login.userId}">

          <img src="../../img/个人中心/personal_icon_coupon@2x.png" alt="">
          <p>优惠券</p>
        </router-link>
        <router-link :to="{path:'/User4?id='+login.userId}">

          <img src="../../img/个人中心/微信图片_20180417151705.png" alt="">
          <p>钱包</p>
        </router-link>
        <router-link :to="{path:'/shoppingCart?id='+login.userId}">

          <img src="../../img/个人中心/微信图片_20180417151623.png" alt="">
          <p>购物车</p>
        </router-link>
        <router-link :to="{path:'/put1?id='+login.userId}">

          <img src="../../img/个人中心/personal_icon_collection@2x.png" alt="">
          <p>收藏夹</p>
        </router-link>
        <router-link :to="{ path:'/attention?id='+login.userId}">

          <img src="../../img/个人中心/personal_icon_follow@2x.png" alt="">
          <p>关注的店铺</p>
        </router-link>
      </section> 


    </div>

    <v-footer></v-footer>
  </div>
</template>

<script>
// import * as mockData from '@/http/mock.js' //模拟数据
// import Baseline from "@/common/_baseline.vue";
import Footer from "@/common/_footer.vue";
import Header from "@/common/_header.vue";

export default {
  components: {
    "v-footer": Footer,
    // "v-baseline": Baseline,
    "v-header": Header
  },
  data() {
    return {
      login: {
        userId: 520
      }
    };
  },
  created() {
    this.getLogin();
  },

  methods: {
    getLogin() {
      // this.login =JSON.parse(sessionStorage.getItem("userInfo"))
    },
    message(){
      this.$router.push({path:"/message"})
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";
.head {
  width: 100%;
  height: 4rem;
}
.msgs{
  position: absolute;
  right: 1rem;
  z-index: 100000;
  img{
    width: 1.5rem;
    height: 1.5rem;
  }
}

.car {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f2f2f2;

  .header {
    width: 100%;
    height: 10rem;
    background-color: #1bc6a3;
    position: relative;
    .arch {
      width: 100%;
      height: 20rem;
      padding-top: 1.3rem;
      background-color: #f2f2f2;
      border-radius: 50%;
      position: absolute;
      top: 4rem;
    }
    .msg {
      width: 100%;
      height: 4rem;
      text-align: center;
      z-index: 100000;
      position: absolute;
      bottom: 1rem;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        background-color: #1bc6a3;
        width: 5rem;
        font-size: 0.9rem;
        color: #fff;
        border-radius: 0.4rem;
        text-align: center;
      }
      span:nth-child(3) {
        font-size: 1.1rem;
      }
      span:nth-child(5) {
        color: #1bc6a3;
        font-size: 0.9rem;
      }
    }

    img {
      border-radius: 50%;
      border: 0.4vw solid #ffffff;
      background-color: @cl;
      width: 4rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -2rem;
      margin-top: -3rem;
      z-index: 10000;
    }
    span {
      .fz(font-size, 54);
      &::before {
        color: #ffffff;
      }
    }
    .username {
      padding-left: 10px;
      position: absolute;
      left: 85px;
      top: 18px;
      color: #fff;
      font-size: 14px;
    }

    > span {
      margin-left: 3.2vw;
      .fz(font-size, 30);
      color: #ffffff;
      letter-spacing: 0.2vw;
      margin-top: 7vw;
    }
  }
  .main {
    width: 100%; // border: 1px solid #000;
    margin: 0 auto;
    border-radius: 10px;
    position: relative; // top: -80px;
    // 我的钱包
    .wallet {
      width: 100%;
      height: 4rem;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 25%;
          height: 100%;
          text-align: center;
          float: left;
          padding: 0.8rem 0;
          div {
            border-right: 1px solid #eee;
            span {
              display: block;
              padding-bottom: 0.4rem;
              font-size: 0.6rem;
            }
            span:lath-child {
              color: #1bc6a3;
            }
          }
        }
      }
    }
    .my-indent-left {
      display: flex;
      justify-content: space-between;
      width: 100%;
      div {
        img {
          width: 1rem;
          margin-right: 0.3rem;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 0.8rem;
          color: #666;
        }
        
      }
      i{
        display: flex;
  justify-content: center;
  align-items: center;
      }
    }
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
        width: 5rem;
        span {
          display: inline-block;
          .fz(font-size, 28);
          color: rgba(0, 0, 0, 0.4);
          position: relative;
        }
        i {
          position: absolute;
          top:1.2rem;
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

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }
        > img {
          width: 20px;
          height: 20px;
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
      padding: 0 0.6rem;
      height: 2rem;
      line-height: 2rem;
      background-color: #fff;
      // border-top-right-radius: 8px;
      // border-top-left-radius: 8px;
      border-top: 1px solid #dadada;
      // margin-top: 10px;
    }
    .my-pay2 {
      display: -webkit-box;
      display: -ms-flexbox; // display: flex;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 2vw 0;
      background-color: #fff; // border: 1px solid #000;
      // margin-top: 10px;
      // height: 30vw;
      // line-height: 30vw;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;
        margin-top: 1rem;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }
        > img {
          width: 20px;
          height: 20px;
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
      > a {
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
        > div {
          -ms-flex: 2;
          -webkit-box-flex: 2;
          flex: 2;
          padding-top: 1.3vw;
        }

        .my-vip-top-div {
          padding-top: 0;
        }
        > p {
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
</style>