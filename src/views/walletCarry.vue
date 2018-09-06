<template>
    <div class="tmpl">
        <v-header></v-header>
        <div style='height:3.5rem'></div>
        <div class="box" v-if='info'>
        	<div class="title_wallet1">
        		到帐银行卡
        		<span style="margin-left: 10%;" v-text="info.bankName"></span>
        		<span v-text="info.bankNum"></span>
        	</div>
            <br />
            <span style="margin: 20px;">
                <b style="padding-top:30px;">提现金额:</b><br /><br />
                       <span style="margin-left: 20px;font-size: 24px;">￥<input type="text" placeholder="0.00" v-model="amount" /></span>
            </span>
            <div style="border-top: 1px solid #33333330;">
                <span></span>
                <span style="margin-top: 6px;">当前零钱余额{{balance}}元</span>
            </div>
            <!--<div class="msg">将提现至</div>
            <div>
                <span>持卡人</span>
                <span v-text="info.userName"></span>
            </div>
            <div>
                <span>开卡银行</span>
                <span v-text="info.bankName"></span>
            </div>
            <div>
                <span>卡号</span>
                <span v-text="info.bankNum"></span>
            </div>-->
            <div class="btns">
                <button @click='withdraw'>提现</button>
            </div>

        </div>
  


    </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
import { formatDate } from "../assets/js/data.js";
import { Toast } from "vant";
export default {
  components: {
    "v-header": Header,
    "v-baseline": Baseline
  },
  data() {
    return {
      balance: 0,
      token: "",
      amount: "",
      info: "",
    };
  },
  watch: {},
  created() {
    this.getBalance();
    this.getGetBankInfo();
  },
  methods: {
    getBalance() {
      this.balance = this.$route.query.balance;
      this.token = localStorage.getItem("Token");
    },
    withdraw() {
      var reg = /^(0?|[1-9]\d*)(\.\d{0,2})?$/;
      if (parseInt(this.amount) > parseInt(this.balance)) {
        Toast("提现金额不能大于钱包的总金额~");
        return;
      } else if (!reg.test(this.amount)) {
        Toast("金额只能输入两位小数~");
        return;
      } else if (this.amount == "") {
        Toast("请输入提现金额~");
        return;
      }
      this.$http
        .post(this.HOME+"/user/Withdraw", {
          token: this.info,
          amount: this.amount
        })
        .then(res => {
          console.log(res);
        });
    },
    //   获取用户银行卡信息
    getGetBankInfo() {
      var token = localStorage.getItem("Token");
      this.$http.get(this.HOME+"/user/GetBankInfo?token=" + token).then(res => {
        console.log(res);
        if (res.data.Data) {
          this.info = res.data.Data;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.box {
	background-color: white;
	border-radius:10px;
	height: 250px;
	margin: 5%;
  width: 90%;
  .msg {
    // text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title_wallet1{
  	border-top-right-radius: 10px;
  	border-top-left-radius: 10px;
  	background-color: #DCDCDC;
  }
  .btns {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    button {
      width: 90%;
      height: 3rem;
      border-radius: 10px;
      color: #fff;
      letter-spacing: 0.2rem;
      background-color: #0bb794;
    }
  }

  div {
    padding: 0.6rem 0 0.6rem 0.5rem;
    background-color: #fff;
    margin-top: 0.1rem;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1) {
      padding-right: 1rem;
    }
    span:nth-child(2) {
      color: #999;
      flex: 1;
    }
    input {
      flex: 1;
      color: #999;
    }
    input::-webkit-input-placeholder {
      /*WebKit browsers*/

      color: #999;
    }

    input::-moz-input-placeholder {
      /*Mozilla Firefox*/

      color: #999;
    }

    input::-ms-input-placeholder {
      /*Internet Explorer*/

      color: #999;
    }
  }
}
</style>