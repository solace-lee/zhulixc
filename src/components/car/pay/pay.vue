<template lang="html">

  <div class="pay">
    <v-header></v-header>
    <div class="head" style='width: 100%;height: 4rem;'></div>
    <div class="pay-address" @click='goShipping'>
      <div class="icon_father">
        <van-icon name="location" />
      </div>
      <div class='main-father'>
        <div>
          <p class="main-address-tel">
            <span>{{Address.contact}}</span>
            <span>{{Address.phone}}</span>
          </p>
          <p>
            <p>{{Address.province}}{{Address.city_name}}{{Address.district_name }}{{Address.village_name}}{{Address.detailaddress}}
            </p>
          </p>
        </div>
        <i>
          <van-icon name="arrow" />
        </i>
      </div>
    </div>
    <div class="img-father">
      <img src="../../../../img/userImg/personal_bg_caidai.png" alt="">
    </div>


    <div class="contents">
      <div>
        <div class="ff_di" @click='goshop(info.shop_id)'>
          <span>&nbsp;&nbsp;{{info.shop_name}}</span>
          <span>进店&nbsp;&nbsp;></span>
          <span>待付款</span>
          <!-- <span>待发货</span>
                              <span>待收货</span>
                              <span>已完成</span>
                              <span>退款</span>
                              <span>已取消</span> -->
        </div>
        <div class="group">
          <div class="group-left">
            <img :src="info.img_url" alt="">
          </div>
          <div class="group-right">
            <div class="title-top">
              <span class="title">
                {{info.name}}
              </span>

            </div>
            <div class="size">{{specification_name}}:{{link_value}}</div>
           <div class='rigth-bottom'>
              <div class="serve">
                <span v-for='(i,index) in serverlist' :key="index">{{i}}</span>
              
              </div>
              <div class='floor-price'>
                <span>￥{{amount}}</span>
                <span>X{{value}}</span>
              </div>
           </div>
          </div>
        </div>

        <div class="box">
          <p>
            <span>购买数量</span>
            <van-stepper v-model="value" />
          </p>
          <p @click='show=true'>
            <span>配送方式</span>
            <span>快递 免邮
              <van-icon name="arrow" />
            </span>
          </p>
          <p>
            <span>买家留言：</span>
            <input type="text" v-model='msg'>
          </p>
          <div class='all'>

            共{{value}}件商品 应付金额：

            <i>￥{{num}}</i>
          </div>
        </div>

      </div>

    </div>
    <div class='flooer'>
      <span>总金额：
        <i>￥{{num}}</i>
      </span>
      <button @click='goorder'>提交订单</button>

    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="boxf">
        <h1>配送方式</h1>
        <label class="mint-checklist-label boxf2">
          <span class="mint-checkbox">
            <van-checkbox v-model="checked" disabled>快递 免邮</van-checkbox>

          </span>
        </label>
        <button class="btn" @click="show=false">完成</button>
      </div>
    </van-popup>
    <van-popup  v-model="show3" position="bottom" :overlay="true">
      <div class="fk_title">
        <span>付款详情</span>
        <!--<span>
          <van-icon name="arrow" />
        </span>-->
      </div>
      <div class='hint'>
        请选择支付方式
      </div>
      <van-radio-group v-model="radio">
       <!--<div class='divs' @click='onoff=false'>
          <span>
            <img src='../../../../img/userImg/20180702164133.png'>
            <div>
              <p>我的钱包</p>
              <p>可用余额:{{balance}}</p>
            </div>
          </span>
          <van-icon  v-if='!onoff' name="checked" />
       </div>-->
       <div  class='divs'  @click='onoff=true'>
           <span><img src='../../../../img/userImg/20180702164022.png'>微信支付</span><van-icon  v-if='onoff' name="checked" />
       </div>
      </van-radio-group>
      <div class='money'>
        需支付<span>{{num}}</span>

      </div>
      <div class='btns'> 
        <button @click='weixinOrder' v-if='onoff'>确认付款</button>
        <button @click='walletOrder' v-if='!onoff'>确认付款</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Util from "../../../util/common";
import Header from "@/common/_header.vue";
import { MessageBox } from "mint-ui";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      onoff: false,
      radio: "1",
      value: 1,
      confirm: "",
      show: false,
      show3: false,
      Address: {},
      info: {},
      infoMsg: {},
      comment: [],
      checked: true,
      token: "",
      serverlist: [],
      cs_link_id: "",
      commodity_id: "",
      address_id: "",
      msg: "",
      shopId: "",
      address_id: "",
      amount: 0,
      link_value: "",
      specification_name: "",
      balance: "",
      weixin: {},
      on: false
    };
  },
  mounted() {
    // 防止页面刷新后数据丢失
    if (this.$store.state.detail.selectedList == "") {
      this.$store.commit("SET_SELECTEDLIST");
    }
  },
  computed: {
    //所有商品列表
    carList() {
      return this.$store.state.detail.selectedList;
    },

    // 商品价格总和
    allpay() {
      let allpay = 0;
      for (let i = 0; i < this.$store.state.detail.selectedList.length; i++) {
        allpay += this.$store.state.detail.selectedList[i].price;
      }
      return allpay;
    }
  },
  created() {
    this.getUserMsg();
    this.getAddress();
    this.getShose();
    this.gomoney();
  },
  watch: {
    value() {
      var num = this.value * this.amount;
      this.num = num.toFixed(2);
    }
  },

  methods: {
    // 到店铺
    goshop(shopid) {
      this.$router.push({ path: "/indexS?shopId=" + shopid });
    },

    //
    goorder() {
      this.show3 = true;
      //  var obj = {};
      // obj.token = this.token;
      // obj.shopId = this.shopId;
      // obj.address_id = this.address_id;
      // obj.cs_link_id = this.cs_link_id;
      // obj.commodity_id = this.commodity_id;
      // obj.quantity = this.value;
      // obj.msg = this.msg;
      // obj.amount = this.num;
      // obj.cs_link_id = this.cs_link_id;
      // obj.type = 2;
      // console.log(obj);
      //   this.$http.post('/order/CreateOrder',obj).then(res=>{
      //     console.log(res);

      //  this.weixin=res.data.Data;
      // })
    },
    getUserMsg() {
      this.commodity_id = JSON.parse(
        sessionStorage.getItem("info")
      ).commodity_id;
      this.address_id = JSON.parse(sessionStorage.getItem("info")).address_id;
      this.cs_link_id = JSON.parse(sessionStorage.getItem("info")).cs_link_id;
      this.commodity_id = JSON.parse(
        sessionStorage.getItem("info")
      ).commodity_id;
      this.specification_name = JSON.parse(
        sessionStorage.getItem("info")
      ).specification_name;
      this.amount = JSON.parse(sessionStorage.getItem("info")).amount;
      this.value = JSON.parse(sessionStorage.getItem("info")).value;
      var num = this.amount * this.value;
      this.num = num.toFixed(2);
      this.link_value = JSON.parse(sessionStorage.getItem("info")).link_value;

      this.token = localStorage.getItem("Token");
    },
    goShipping() {
      this.$router.push({ path: "/shipping?name=收货地址" });
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
    // 钱包付款
    walletOrder() {
      var obj = {};
      obj.token = this.token;
      obj.shopId = this.shopId;
      obj.address_id = this.address_id;
      obj.cs_link_id = this.cs_link_id;
      obj.commodity_id = this.commodity_id;
      obj.quantity = this.value;
      obj.msg = this.msg;
      obj.amount = this.value * this.amount;
      obj.type = 1;
      console.log(obj);
      this.$http.post(this.HOME + "/order/WalletPay", obj).then(res => {
        console.log(res);
        Toast(res.data.Message);
        if (res.data.Message == "您的钱包金额不足") {
          return;
        } else {
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }
      });
    },

    weixinOrder() {
      var obj = {};
      obj.token = this.token;
      obj.shopId = this.shopId;
      obj.address_id = this.address_id;
      obj.cs_link_id = this.cs_link_id;
      obj.commodity_id = this.commodity_id;
      obj.quantity = this.value;
      obj.msg = this.msg;
      obj.amount = this.num;
      obj.cs_link_id = this.cs_link_id;
      obj.type = 2;
      console.log(obj);
      this.$http.post(this.HOME + "/order/CreateOrder", obj).then(res => {
        console.log(res);
        var fee = res.data.Data.fee;
        var baseUrl = res.data.Data.baseUrl;
        var orderId = res.data.Data.orderId;
        var type = res.data.Data.type;
        var token = res.data.Data.token;
        var weixinUrl = baseUrl;
        console.log(weixinUrl);
        if (res.data.Message == "您的积分不足") {
          return;
        }
        Toast(res.data.Message);
        this.$router.push({ path: "/payorder?name=ok", query: { url: weixinUrl } });
      });
    },

    // 获取用户的默认地址
    getAddress() {
      var token = localStorage.getItem("Token");
      this.$http
        .get(this.HOME + "/user/GetUserAddress?token=" + token)
        .then(res => {
          console.log(res);
          var arr = res.data.Data;
          arr.forEach(el => {
            if (el.isdefault) {
              this.Address = el;
              console.log(this.Address);
              this.address_id = el.address_id;
            }
          });
        });
    },
    // 获取详情页
    getShose() {
      this.$http
        .get(
          this.HOME +
            "/product/GetCommodity?cId=" +
            this.commodity_id +
            "&token=" +
            this.token
        )
        .then(res => {
          console.log(res);
          this.info = res.data.Data.info;
          this.shopId = res.data.Data.info.shop_id;
          var arr = [];
          var str = res.data.Data.info.server;
          arr = str.split(",");
          console.log(arr);
          this.serverlist = arr;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";
.van-popup--bottom {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.btns {
  width: 100%;
  button {
    width: 100%;
    height: 4rem;
    background-color: #0bb794;
    color: #fff;
  }
}
.fk_title {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  span:nth-child(1) {
    flex: 1;
    font-size: 1.4rem;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span:nth-child(2) {
    display: inline-block;
    width: 2rem;
    display: flex;
    
    // justify-content: center;
    align-items: center;
  }
}
.hint {
  padding: 0.2rem 0.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
  font-size: 0.8rem;
  color: #acaaaa;
}
.van-radio-group {
  .divs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    height: 4.5rem;
    border-bottom: 1px solid #c3c3c3;
    span {
      display: flex;
      align-items: center;
      div {
        display: inline-block;
        font-size: 0.9rem;
        p:nth-child(2) {
          font-size: 12px;
          color: #acaaaa;
        }
      }
      img {
        width: 1.3rem;

        margin-right: 0.5rem;
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
  font-size: 0.6rem;
  // display: flex;
  span {
    color: #0bb794;
    font-size: 1.2rem;
  }
}

.boxf {
  width: 100%;
  height: 18rem;
  width: 99%;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 10px;
  font-size: 0.6rem;
  h1 {
    width: 100%;
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 1rem;
  }

  .boxf2 {
    line-height: 1.6rem;
    font-size: 0.8rem;
    /* display: flex;
   align-items: center;  */
  }
  .p {
    padding-left: 1rem;
    display: inline;
  }
  .btn {
    width: 80%;
    height: 3rem;
    background-color: #0bb794;
    color: #fff;
    border-radius: 2rem;
    position: fixed;
    bottom: 1rem;
    left: 50%;
    margin-left: -40%;
  }
}

.box {
  p {
    // width: 100%;
    display: flex;
    padding: 0 0.3rem 0 0.6rem;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-top: 0.2rem;
    height: 3rem;
    font-size: 0.6rem;
    input {
      flex: 1;
      font-size: 0.6rem;
    }
  }
  .all {
    // width: 100%;
    height: 3rem;
    background-color: #fff;
    text-align: right;
    padding-right: 0.3rem;
    line-height: 3rem;
    font-size: 0.6rem;

    i {
      font-size: 1.2rem;
      color: #ff8400;
    }
  }
}

.flooer {
  width: 100%;
  height: 4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  text-align: right;
  font-size: 0.6rem;

  span {
    i {
      font-size: 1.6rem;
      color: #ff8400;
    }
  }
  button {
    padding: 0 3.8rem;
    height: 100%;
    background-color: #ff8400;
    color: #fff;
    margin-left: 0.5rem;
  }
}

.ff_di {
  width: 100%;
  height: 30px;
  background-color: #fff;
  margin-top: 5px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 5px;
  > span:nth-of-type(2) {
    font-size: 12px;
    color: #999;
  }
  > span:nth-of-type(3) {
    font-size: 12px;
    color: #00ad8a;
    position: absolute;
    right: 10px;
  }
}

.group {
  padding: 8px;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .group-left {
    width: 28vw;
    height: 28vw;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .group-right {
    width: 70%;
    padding-left: 8px;
    height: 28vw;

    position: relative;
    .size {
      font-size: 0.7rem;
      padding-left: 0.3rem;
    }
    .title-top {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 0.9rem;
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
      font-size: 14px;
      margin-top: 3px;
    }
    > span:nth-of-type(1) {
      font-size: 14px;
    }
    > span:nth-of-type(2) {
    }
    .price {
      width: 100%;
      color: #ff6170; // border: 1px solid #000;
      font-size: 10px;
      position: absolute; // left: 10px;
      top: 60px;
      > span:nth-of-type(2) {
        margin-left: 99px;
        color: #999;
      }
    }
    .floor-price {
      width: 100%;
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:nth-child(1) {
        font-size: 1.2rem;
        color: #ff8400;
      }
      span:nth-child(2) {
        font-size: 0.7rem;
      }
    }
    .rigth-bottom {
      position: absolute;
      bottom: 0;
    }
    .serve {
      span {
        padding: 0.1rem 0.2rem;
        background-color: #00ad8a;
        color: #fff;
        font-size: 0.6rem;
        border-radius: 0.5rem;
      }
    }
  }
}

.img-father {
  width: 100%;
  img {
    width: 100%;
    height: 0.3rem;
  }
}

.main-address-tel {
  span:nth-child(1) {
    margin-right: 1rem;
    color: #00ad8a;
  }
}

.pay {
  width: 100%;
  background-color: #f7f7f7;

  .pay-address {
    margin-top: 2px;
    background-color: #fff; // border-bottom: 1 * 10vw/75 solid #dedede;
    padding: 0.6rem;
    display: flex;
    justify-content: space-between;
    .icon_father {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 1.6rem;
        padding-right: 0.6rem;
      }
    }

    > .main-father {
      display: flex;
      flex: 1;
      justify-content: space-between;
      div {
        flex: 1; // display: flex;
        p {
          width: 100%;
        }
      }
      i {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    > p {
      .fz(font-size, 28px);
      color: #868686;
      padding-top: 30 * 10vw/75;
      letter-spacing: 3 * 10vw/75;
      line-height: 45 * 10vw/75;
    }
  }
  .pay-product {
    background-color: #fff;
    height: 60vw;
    overflow: auto;

    li {
      a {
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        box-sizing: border-box;
        padding: 20 * 10vw/75 30 * 10vw/75;
        color: #4d4d4d;
        .fz(font-size, 30px);
        border-bottom: 1 * 10vw/75 solid #dedede;

        > img {
          display: block;
          width: 2.5 * 10vw;
          height: 2.5 * 10vw;
        }

        > div {
          box-sizing: border-box;
          padding-left: 50 * 10vw/75;
          width: 70%;
          h2 {
            padding-top: 0.09 * 10vw;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          p {
            text-align: right;
            .fz(font-size, 24px);
            padding-top: 1.4 * 10vw;
          }
        }
      }
    }
  }

  .pay-allpay {
    text-align: right;
    margin-top: 6vw;
    padding: 4vw 5vw;
    .fz(font-size, 32px);
    color: #999999;
    background-color: #fff;
    i,
    span {
      color: @cl;
    }
  }

  .pay-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 4vw;
    span {
      display: block;
      width: 85%;
      background-color: #fd729c;
      border-radius: 1.3vw;
      color: #fff;
      font-size: 17px;
      padding: 4vw;
      margin: 0 auto;
      text-align: center;
      &:active {
        background-color: @cl;
      }
    }
  }

  .pay-confirm {
    padding: 20px 0;
    background-color: @cl;
    text-align: center;
    color: #fff;
    line-height: 30px;
    .fz(font-size, 40);
  }
}
</style>