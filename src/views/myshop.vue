<template>
  <div class="tmpl">
    <v-header></v-header>
    <div class="head" style="width: 100%;height: 4rem;"></div>
    <!-- 没有店铺 -->
    <div class="box" v-if='shopId==0' >
            <div class="img">
                <img src="../../img/userImg/comm_bg_empty.png" alt="">
            </div>
            <p>您还没有入驻店铺</p>
            <div class="btns">
                <button @click='ruzhu("商家入驻协议")'>店铺入驻</button>
            </div>
           <br />
            <!--<div class="btns">
                <button @click='ruzhu("代理商入驻协议")'>代理入驻</button>
            </div>-->
        </div>
    <!-- 店铺信息 -->
    <div class="box" v-if='shopId!=0'>
      <div class="userImg">
        <img :src="userInfo.shop_img_url" alt="">
      </div>
      <div class="money" >
        <span>收益：</span>
        <span>￥{{wallet_amount}}</span>
      </div>
      <div class="btnFather">
        <button :class='{"activeA":isA,"activeB":isB}' @click='getShopMsg'>店铺信息</button>
        <button :class='{"activeA":isB,"activeB":isA}' @click="getDetails">钱包详情</button>
      </div>
      <!-- 店铺信息 -->
      <div class="shopmsg" v-if="onoff">
        <ul>
          <li>
            <span>店铺名称:</span>
            <span>{{userInfo.shop_name}}</span>
          </li>
          <li>
            <span>店铺性质:</span>
            <span>{{userInfo.nature}}</span>
          </li>

          <li>
            <span>店铺分类:</span>
            <span>{{userInfo.firstClassify}} / {{userInfo.secondClassify}} / {{userInfo.thirdClassify}}</span>
          </li>
          <li>
            <span>店铺联系人:</span>
            <span>{{userInfo.contact_name}}</span>
          </li>
          <li>
            <span>联系电话:</span>
            <span>{{userInfo.contact_phone}}</span>
          </li>
          <li>
            <span>店铺地址:</span>
            <span>{{userInfo.province}}{{userInfo.city}}{{userInfo.district}}{{userInfo.Village}}{{userInfo.address_detail}}</span>
          </li>
        </ul>
      </div>
      <!-- 钱包详情 -->
      <div v-if="!onoff">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div class="detail_" v-for='(item,index) in list' :key="index">
            <div>
              <div class="left">
                <span>订单号:{{item.order_num}}</span>
                <span>{{item.createddate}}</span>
              </div>
            </div>
            <div class="right">
              <span>+{{item.details_amount}}元</span>
            </div>
          </div>
        </van-list>
        <v-baseline v-if="nomore"></v-baseline>

      </div>
       <!--<div class="btnFather" >
                <button @click='ruzhu("代理商入驻协议")'>代理入驻</button>
       </div>-->

    </div>

  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-header": Header,
    "v-baseline": Baseline
  },
  data() {
    return {
      nomore: false,
      finished: false,
      loading: true,
      isA: true,
      isB: false,
      onoff: true,
      token: "",
      userInfo: {},
      shopId: "",
      page: 1,
      row: 10,
      list: [],
      wallet_amount:'',
    };
  },
  created() {
    this.getToken();

      this.getShopMsg();
  
  },
  methods: {
    // 去商家入驻协议
    ruzhu(name) {
      this.$router.push({ path: "/ruzhu?name=" + name });
    },
    getToken() {
      this.token = localStorage.getItem("Token");
    },
    getShopMsg() {
      this.onoff = true;
      this.isA = true;
      this.isB = false;
      this.$http.get(this.HOME+"/shop/getshopinfo?token=" + this.token).then(res => {
        console.log(res);
        this.userInfo = res.data.Data.Info;
        this.shopId = res.data.Data.Info.shop_id;
        this.wallet_amount = res.data.Data.Wallet.wallet_amount;
      });
    },
    // 钱包详情
    getDetails() {
      this.onoff = false;
      this.isA = false;
      this.isB = true;
      this.$http
        .get(
          this.HOME+"/shop/GetShopWalletInfo?shopId=" +
            this.shopId +
            "&page=" +
            this.page +
            "&rows=" +
            this.row
        )
        .then(res => {
          console.log(res);
          var arr = res.data.Data.List;
          if (arr.length == this.row) {
            this.page++;
          } else {
            this.nomore = true;
            this.finished = true;
            console.log("已加载全部");
          }
          arr.forEach(val => {
            this.list.push(val);
          });
          this.loading = false;
        });
    },
    onLoad() {
      if (!this.loading) {
        return;
      }
      this.loading = true;
      this.getDetails();
    }
  }
};
</script>
<style scoped lang="less">
.box {
	margin-top: -6rem;
  width: 100vw;
  background-color: #fff;
  height: 100rem;
  .img {
    width: 100%;
    padding-top: 10rem;
    text-align: center;
    img {
      width: 13rem;
    }
  }
  p {
    width: 100%;
    text-align: center;
    color: #999999;
    padding: 1rem 0 2rem 0;
  }
  .btns {
    padding: 0 3rem;
    button {
      width: 100%;
      padding: 0.7rem 0;
      color: #fff;
      background-color: #00ad8a;
      border-radius: 0.8rem;
    }
  }
}
.head{
	border-bottom: 1px solid #F2F2F2;
}
.box {
  .userImg {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem; // border: 1px solid #ccc;
    }
  }
  .money {
    padding: 0.6rem 1rem;
    font-size: 1.6rem;
    color: #666;
    span:nth-child(2) {
      font-size: 1.6rem;
      color: #fd8e00;
    }
  }
  .btnFather {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    button {
      width: 50%;
      border: 1px solid #00ad8a;
      font-size: 1.6rem;
    }
  }
}

.activeA {
  background-color: #00ad8a;
  color: #fff;
}

.activeB {
  background-color: #fff;
  color: #00ad8a;
}

.shopmsg {
  width: 100%;
  ul {
  	margin:2rem;
    width: 100%;
    li {
      padding-right: 0.5rem;
      height: 3rem;
      display: flex;
      justify-content: space-between;
      line-height: 2rem;
      span {
        // display: inline-block;
        width: 25%;
        text-align: left;
        font-size: 1.5rem;
      }
      span:nth-child(2) {
        flex: 1;
        text-align: left;
        padding-left: 1rem;
      }
    }
  }
}

.detail_ {
  width: 100%;
  height: 2rem;
  padding: 0.4rem 0;
  border-top: 0.07rem solid #ccc;
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 0.6rem;
    color: #999999;
    span {
      display: block;
      padding: 0 0.8rem;
    }
    span:nth-child(1) {
      font-size: 0.9rem;
      padding-bottom: 0.2rem;
    }
  }
  .right {
    padding-right: 1rem;
    height: 100%;
    line-height: 2rem;
    color: #ff8400;
  }
}
</style>