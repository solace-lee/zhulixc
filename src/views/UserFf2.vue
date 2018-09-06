<template lang="html">

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
     <span v-text='name'></span>
    </div>
  </div>
    <div style="width: 100%;height: 3rem;"></div>
    <div class="wrap">

      <van-tabs v-model="active">
        <van-tab v-for="index in statuslist" :title="index">
        </van-tab>
      </van-tabs>

      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="contents">
          <div v-for='(e,index) in orderlist' :key="index">
            <div class="ff_di">
              <span>&nbsp;&nbsp;{{e.shop_name}}</span>
              <span>进店&nbsp;&nbsp;></span>
              <span v-if='e.order_status==1'>待付款</span>
              <span v-if='e.order_status==2'>待发货</span>
              <span v-if='e.order_status==3'>待收货</span>
              <span v-if='e.order_status==4'>已完成</span>
              <span v-if='e.order_status==5'>申请退货</span>
              <span v-if='e.order_status==6'>已取消</span>
              <span v-if='e.order_status==7'>退货成功</span>
              <span v-if='e.order_status==8'>退货失败</span>

            </div>
            <div class="group">
              <div class="group-left">
                <img :src="e.img_url" alt="">
              </div>
              <div class="group-right">
                <div class="title-top">
                  <span class="title">
                    {{e.name}}
                  </span>
                  <div class="serve2">
                    <div>
                      <span style="font-size: 1.4rem;">￥</span>
                      <span style=" font-size: 1.4rem;">{{e.discount_price}}</span>
                    </div>
                    <div style=" font-size: 1.4rem;color: #999;">X{{e.quantity }}
                    </div>
                  </div>
                </div>
                <div class="size">{{e.specification_name}}：{{e.link_value}}</div>
                <div class="serve">
                  <span v-for='(i,index) in e.server' :key="index">{{i}}</span>

                </div>

              </div>
            </div>
            <div class="ff_di2">
              <span>共{{e.quantity}}件商品&nbsp;&nbsp;应付金额：</span>
              <span>￥{{e.discount_price*e.quantity}}</span>
            </div>
            <div class="btn">
              <button class="btn1" @click='cancelOrder(e.order_id)'>取消订单</button>
              <button class="btn2" v-if='e.order_status==1' @click='weixinOrder(e.order_num,e.order_id,e.discount_price
,e.quantity,e.img_url)'>立刻付款</button>
              <!-- <button v-if="e.status!=1" class=" btn1" @click="tosearch5(e.orderId)">查看详情</button> -->
              <button class="btn2" v-if='e.order_status==3' @click="toYes(e.order_id)">确定收货</button>
              <button  class="btn2"  v-if='e.order_status==4' @click="pingjia(e.commodity_id,e.name,e.img_url)">评价</button>
            </div>
            <van-popup v-model="show3" position="bottom" :overlay="true">
              <div class="fk_title">
                <span>付款详情</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </div>
              <div class='hint'>
                请选择支付方式
              </div>
              <van-radio-group v-model="radio">
                <div class='divs' @click='onoff=false'>
                  <span>
                    <img src='../../img/userImg/20180702164133.png'>
                    <div>
                    <p>我的钱包</p>
                    <p>可用余额为:{{balance}}</p>
                    </div>
                  </span>
                  <van-icon  v-if='!onoff' name="checked" />
                </div>
                <div class='divs' @click='onoff=true'>
                  <span>
                    <img src='../../img/userImg/20180702164022.png'>微信支付</span>
                  <van-icon  v-if='onoff' name="checked"/>
                </div>
              </van-radio-group>
              <div class='money'>
                需支付
                <span>{{e.quantity*e.discount_price}}</span>

              </div>
              <div class='btns'>
                <button @click='weixinOrder' v-if='onoff'>确认付款</button>
        <button @click='walletOrder' v-if='!onoff'>确认付款</button>
              </div>
            </van-popup>
          </div>

        </div>
      </van-list>



      <v-baseline v-if="nomore"></v-baseline>
    </div>
  </div>

</template>

<script>
import { Toast } from "vant";
import Baseline from "@/common/_baseline.vue";
import Header from "@/common/_header.vue";
import { Dialog } from "vant";

// import category from "@/http/mock.js"; //模拟数据
export default {
  components: {
    "v-baseline": Baseline,
    "v-header": Header
  },
  data() {
    return {
      onoff: true,
      radio: "1",
      active: "",
      id: 0,
      show3: false,
      toloading: false,
      status: "",
      loading: true,
      finished: false,
      nomore: false,
      page: 1,
      rows: 10,
      statuslist: [
        "全部订单",
        "待付款",
        "待发货",
        "待收货",
        "已完成",
        "申请退货",
        "已取消",
        "退货成功",
        "退货失败"
      ],
      selected: "0",
      orderlist: [],
      token: "",
      // 钱包余额
      balance: "",
      shopId: "",
      address_id: "",
      // this.cs_link_id = val.cs_link_id;
      commodity_id: "",
      quantity: "",
      msg: "",
      obj: {},
      name: ""
    };
  },
  mounted() {
    this.getUserMsg();
    this.gomoney();
    this.getName();
  },
  created() {
    this.getStatus();
  },
  watch: {
    active() {
      if (this.active == 0) {
        this.status = "";
        this.name = "全部订单";
      } else if (this.active == 1) {
        this.name = "待付款";
      } else if (this.active == 2) {
        this.name = "待发款";
      } else if (this.active == 3) {
        this.name = "待付款";
      } else if (this.active == 4) {
        this.name = "已完成";
      } else if (this.active == 5) {
        this.name = "申请退货";
      } else if (this.active == 6) {
        this.name = "已取消";
      } else if (this.active == 7) {
        this.name = "退货成功";
      } else if (this.active == 8) {
        this.name = "退货失败";
      } else {
        this.status = this.active;
      }

      this.page = 1;
      this.orderlist = [];
      this.loading = true;
      this.finished = false;
      this.nomore = false;

      this.getorderlist();
    }
  },
  methods: {
    getUserMsg() {
      this.token = localStorage.getItem("Token");
    },
    toYes(id) {
      console.log(id);
      this.$http.get(this.HOME + "/order/Affirm/" + id).then(res => {
        console.log(res);
        Toast(res.data.Message);
        setTimeout(() => {
          this.getorderlist();
        }, 1000);
      });
    },
    pingjia(id, name, imgurl) {
      var msg = {};
      msg.name = name;
      msg.imgurl = imgurl;
      sessionStorage.setItem("msg", JSON.stringify(msg));
      this.$router.push({
        path: "/line5?commodity_id=" + id + "&name=发表评论"
      });
    },
    // 微信付款
    weixinOrder(order_num, order_id, discount_price, quantity, img_url) {
      var num = discount_price * quantity;
      num = num.toFixed(2);

      this.$axios
        .get("https://api.zhulixc.com/order/pay/3/" + order_id + "?token=" + this.token)
        .then(res => {
          console.log(res);
          var weixinUrl = res.config.url;
          console.log(weixinUrl);

          this.$router.push("/payorder?name=订单支付" + "&url=" + weixinUrl);
        });
    },
    // 钱包付款
    // walletOrder() {
    //  this.obj.token = this.token;
    //   // this.obj.type = 1;
    //   this.obj.amount =this.obj.quantity*this.obj.discount_price
    //   console.log(this.obj);
    //    let postData = this.$qs.stringify(this.obj);
    //    console.log(postData);
    //   this.$http.post("/order/WalletPay", postData).then(res => {
    //     console.log(res);
    //     Toast(res.data.Message);
    //     setTimeout(() => {
    //       this.$router.go(-1);
    //     }, 1000);
    //   });
    // },
    // 取消订单
    cancelOrder(orderId) {
      Dialog.confirm({
        title: "提示",
        message: "确定取消该订单吗？"
      })
        .then(() => {
          this.$http.get(this.HOME + "/order/cancel/" + orderId).then(res => {
            console.log(res);
            Toast.success(res.data.Message);
            this.getorderlist();
          });
        })
        .catch(() => {});
    },
    // 获取钱包余额
    gomoney() {
      this.$http
        .get(this.HOME + "/user/GetUserCashInfo?token=" + this.token)
        .then(res => {
          console.log(res);
          this.balance = res.data.Data.balance;
        });
    },

    // 钱包支付
    // getwallet() {
    //   this.$http.post("/order/WalletPay");
    // },
    getweixin() {},
    getStatus() {
      this.status = this.active = this.$route.query.status;
      this.page = 1;
      this.orderlist = [];
      this.toloading = true;
      this.loading = true;
      this.finished = false;
      this.nomore = false;
    },
    getName() {
      this.name = this.$route.query.name;
    },
    // 获取订单列表
    getorderlist() {
      if (this.active == 0) {
        this.status = "";
      } else {
        this.status = this.active;
      }
      console.log(111);
      console.log(this.active);
      console.log(111);

      this.$http
        .get(
          this.HOME +
            "/order/getlist?token=" +
            this.token +
            "&page=" +
            this.page +
            "&rows=" +
            this.rows +
            "&status=" +
            this.status
        )
        .then(res => {
          console.log(res);
          var arr = res.data.Data.List;
          console.log(arr);
          this.orderlist = [];
          if (arr.length < this.rows) {
            this.nomore = true;
            this.finished = true;
            console.log("已加载全部");
          } else {
            this.page++;
            console.log("继续");
          }
          var strArr = [];
          console.log(arr);
          arr.forEach(val => {
            // this.address_id = val.address_id;
            // // this.cs_link_id = val.cs_link_id;
            // this.commodity_id = val.commodity_id;
            // this.quantity = val.quantity;
            // this.msg = val.msg;
            var str = val.server;
            strArr = str.split(",");
            for (let i = 0; i < strArr.length; i++) {
              console.log(strArr);
              val.server = strArr;
            }
            this.orderlist.push(val);
          });

          // console.log(this.orderlist);
          this.loading = false;
        });
    },
    getTime(d) {
      var time = new Date(d);
      // console.log(time)
      var y = time.getFullYear();
      var m = time.getMonth(+1);
      var d = time.getDate();
      return y + "-" + m + "-" + d;
    },

    onLoad() {
      console.log(!this.loading);
      if (!this.loading) {
        console.log("111111111111111");
        return;
      }
      this.loading = true;
      console.log(this.page);
      this.getorderlist();
    },
    tosearch5(id) {
      this.$router.push({ path: "/line?orderId=" + id });
    },
    chose() {
      this.$router.push({ path: "/chose" });
    },
    // 店铺首页
    indexS() {
      this.$router.push({ path: "/indexS" });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";
.fk_title {
  width: 100%; // height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  span:nth-child(1) {
    flex: 1;
    font-size: 1rem;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span:nth-child(2) {
    display: inline-block;
    width: 2rem;
    display: flex; // justify-content: center;
    align-items: center;
  }
}

.hint {
  padding: 0.5rem 0.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
  color: #999;
}

.van-radio-group {
  .divs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #c3c3c3;
    span {
      display: flex;
      align-items: center;
      img {
        width: 1.3rem;
        vertical-align: middle;
        margin-right: 0.5rem;
      }
      div {
        display: inline-block;
        p:nth-child(2) {
          font-size: 0.8rem;
          color: #999999;
        }
      }
    }
    .van-icon {
      font-size: 1.3rem;
      color: #0bb794;
    }
  }
}

.money {
  text-align: right;
  padding: 1rem;
  color: #969696;
  font-size: 0.6rem; // display: flex;
  span {
    color: #0bb794;
    font-size: 1.2rem;
  }
}

.btns {
  width: 100%;
  button {
    width: 100%;
    height: 3rem;
    background-color: #0bb794;
    color: #fff;
  }
}

.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0.8;
  z-index: 99999;
  display: flex;
  display: none;
  .pay {
    background-color: #595959;
    width: 120px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > img {
      width: 35px;
      height: 35px;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .pay2 {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      width: 70px;
      text-align: center;
      font-size: 12px;
    }
    .pay3 {
      width: 8px;
      height: 8px;
      background-color: #fff;
      display: inline-block;
      position: relative;
      border-radius: 4px;
      top: 80%;
      left: 37%;
      transform: translate(-50%, -50%);
    }
  }
} // 遮罩层结束
.wrap {
  margin-top: 10px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  .group {
    padding: 8px;
    display: flex;
    background-color: #fff;
    border-top: 1px solid #ccc;
    .group-left {
      width: 28vw;
      height: 28vw;
      > img {
      	border-radius: 6px;
        width: 100%;
        height: 100%;
      }
    }
    .group-right {
      width: 70%;
      padding-left: 8px;
      height: 28vw;

      position: relative;
      .title-top {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 1.56rem;
          padding: 0 0.2rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      > span {
        // border: 1px solid #000;
        display: inline-block;
        width: 80%;
        font-size: 1.56rem;
        margin-top: 3px;
      }
      > span:nth-of-type(1) {
        font-size: 1.56rem;
      }
      > span:nth-of-type(2) {
      }
      .price {
        width: 100%;
        color: #ff6170; // border: 1px solid #000;
        font-size: 1.56rem;
        position: absolute; // left: 10px;
        top: 60px;
        > span:nth-of-type(2) {
          margin-left: 99px;
          color: #999;
        }
      }

      .serve {
        padding-top: 1rem;
        span {
          padding: 0.1rem 0.2rem;
          background-color: #00ad8a;
          color: #fff;
          font-size: 0.6rem;
          border-radius: 0.5rem;
          margin-left: 0.2rem;
        }
      }
    }
  }
}

.serve2 {
  width: 40px;
  height: 40px;
  color: #999999;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  > div {
    white-space: nowrap;
    font-size: 1.6rem;
  }
}

/* 规格 */

.size {
	margin-left: 8px;
  font-size: 1.4rem;
  color: #999999;
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
    > span {
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

.head {
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
  display: flex;
  position: fixed;
  z-index: 100000;
  border-bottom: 1px solid #F2F2F2;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;
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
    span {
      color: #000;
      margin-right: 0.5rem;
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
  height: 40px; // border: 1px solid #000;
  background-color: #eee; // text-align: center;
  margin: 0 auto;
  input {
    width: 90%;
    height: 80%;
    border: 1px solid #eee;
    margin-top: 0.5vh;
    margin-left: 2.5vh;
    border-radius: 10px;
    text-indent: 2em;
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
  border-bottom: 2px solid red;
  color: #ce2e37;
  margin-bottom: -3px;
}

.ff_di {
  width: 100%;
  height: 36px;
  background-color: #fff;
  margin-top: 5px;
  line-height: 30px;
  font-size: 1.6rem;
  padding-left: 5px;
  padding-top: 5px;
  > span:nth-of-type(2) {
    font-size: 1.4rem;
    color: #999;
  }
  > span:nth-of-type(3) {
    font-size: 1.5rem;
    color: #00ad8a;
    position: absolute;
    right: 10px;
  }
}

.ff_di2 {
  /* width: 100%; */
  height: 30px;
  background-color: #fff;
  line-height: 30px;
  font-size: 1.5rem;
  padding-right: 0.5rem;
  display: flex;
  justify-content: flex-end;
  > span:nth-of-type(1) {
    /* position: absolute;
            left: 50%; */
  }
  > span:nth-of-type(2) {
    font-size: 1.5rem; // color:red;
    color: #333333;
    /* position: absolute;
            right: 10px; */
  }
}

.btn {
  width: 100%;
  height: 35px; // border: 1px solid #000;
  background-color: #fff;
  text-align: right;
  > button {
    width: 25%;
    height: 70%;
    background-color: #fff;
    border-radius: 5px;
    font-size: 0.8rem;

    margin: 0 5px;
    color: #000;
  }
  .btn1 {
  	height: 2rem;
    border: 1px solid #999999;
    color: #999999;
  }
  .btn2 {
  	height: 2rem;
    border: 1px solid #ff8400;
    color: #ff8400;
  }
  header h1[data-v-416b7b2c] {
    font-size: 17px;
    letter-spacing: 0.2vw;
    font-weight: 600;
    margin-right: 80vw;
  }
}
</style>