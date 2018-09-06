<template>

  <div class="wrap">



    <div class="sum1">
      <span>账户余额:</span>
      <span style="color:#cd2a34;font-size:24px ">{{userWallet.balance}}</span>
      <span style="color:#cd2a34"> 元</span>
    </div>
    <div class="sum2">
      <input type="number" v-model="moneyNum" placeholder="请输入充值金额">
    </div>

    <div class="sum1">
      <button class="btn" @click='recharge'>充值</button>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        idss: 1111,
        moneyNum: "",
        userWallet: {},
        id: "",
        datalist: {},
        payFlag: 1
      }
    },
    created() {
      this.getUserId()
      this.getuserWallet()
    },
   
    methods: {
      getUserId() {
        this.id = Number(this.$route.query.id)
      },
      getuserWallet() {
        this.$http.get(this.HOME+'/userWallet/queryUserWalletByUserId?userId=' + this.id + "&walletType=2").then(res => {
          console.log(res)
          this.userWallet = res.data.data;
        })
      },
      recharge() {
        var that = this
        this.datalist.userId = that.userWallet.userId
        this.datalist.walletId = that.userWallet.walletId
        this.datalist.walletType = 2
        this.datalist.amount = that.moneyNum
        this.datalist.walletDetailsType = 2
        this.datalist.detailsamount = that.moneyNum

        var token = localStorage.getItem("Token").split("#/")[0]

        let postData = this.$qs.stringify({
          totalPrice: this.moneyNum,
          orderId: 0,
          token: token,
          content: "大悦城商城在线充值"
        });

        this.$http.post(this.HOME+"pay/saveFaceToFacePayment", postData).then((res) => {
          console.log(res)
          if (res.data.code == 0) {
            alert(res.data.code)
            return;
          }
          if (res.data.status) {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": res.data.appId,     //公众号名称，由商户传入
                "timeStamp": res.data.timeStamp,//时间戳，自1970年以来的秒数
                "nonceStr": res.data.nonceStr, //随机串
                "package": res.data.package,
                "signType": res.data.signType,//微信签名方式：
                "paySign": res.data.paySign //微信签名
              },
              function (rep) {
                WeixinJSBridge.log(rep.err_msg);

                if (rep.err_msg == "get_brand_wcpay_request:ok") {

                  that.$http.post(this.HOME+"/userWallet/updateUserWallet", that.datalist).then(res2 => {

                    if (res2.data.success) {
                      // alert("充值成功")
                      location.reload();
                      that.getuserWallet()
                    }
                  })



                } else if (rep.err_msg == "get_brand_wcpay_request:cancel") {
                  alert("取消支付");
                } else {
                  alert("支付失败");
                }
              }
            )



          }

        }).catch(err => {
          alert('网络异常');
        })


      }
    },

  }
</script>

<style scoped lang=less>
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
    border: 1px solid #ccc;
    background-color: #fff;
    h1 {
      width: 100%;
      height: 60px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      /* margin-left: 17vh; */
    }
  }

  .sum1 {
    /* border: 1px solid #000; */
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    >span {
      display: inline-block;
      /* border: 1px solid #000; */
    }
  }

  .sum2 {

    width: 100%;
    height: 45px;
    display: flex;
    flex-flow: row wrap;
    background-color: #fff;
    padding-left: 5px;
    >input {
      border: 1px solid #ccc;
      display: inline-block;
      width: 90%;
      height: 40px;
      border-radius: 8px;
      text-indent: 1em;
      font-size: 14px;
    }
  }

  .sum3 {

    display: flex;
    flex-flow: wrap;
    padding: 10px;

    background-color: #fff;
    .check {
      border: 1px solid #cd2a34;
      color: #cd2a34
    }
    div {
      border: 1px solid #999;
      font-size: 0.9rem;
      width: 6.5rem;
      border-radius: 6px;
      height: 3.5rem;
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {


        font-size: 0.9rem;
      }
    }
  }

  .btn {
    width: 90%;
    height: 50%;
    border-radius: 20px;
    background-color: #cd2a34;
    color: #fff;
    margin-top: 50px;
  }
</style>