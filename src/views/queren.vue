<template>
  <!-- 提交订单 -->
  <div>

    <!-- <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"/> -->
    <div class="van-cell van-hairline van-cell--clickable">
      <!---->
      <div class="van-cell__value van-cell__value--link van-cell__value--alone">
        <div class="van-radio" @click="addressFlag=true">
          <span class="van-radio__input">

            <van-icon class="icon" name="location" />
          </span>
          <span class="van-radio__label">
            <div class="van-address-list__name">收货人:{{addressMsg.contact}}
              <span class="span1">{{addressMsg.phone}}</span>
            </div>
            <div class="van-address-list__address">收货地址：{{addressMsg.provinceName}}{{addressMsg.cityName}}{{addressMsg.districtName}}{{addressMsg.villageName}}{{addressMsg.detailaddress}}</div>
          </span>
        </div>
      </div>

      <div class="rule"></div>
    </div>

    <van-popup v-model="addressFlag" position="bottom" :overlay="true">
      <div class="address-top">
        选择地址
      </div>
      <div class="addresslist-box">
        <div class="addmsg " v-for="addressItem in addresslist">
          <div class="van-radio__label">
            <div class="van-address-list__name">收货人:{{addressItem.contact}}
              <span class="span1">{{addressItem.phone}}363253355</span>
            </div>
            <div class="van-address-list__address">收货地址：{{addressItem.provinceName}}{{addressItem.cityName}}{{addressItem.districtName}}{{addressItem.villageName}}{{addressItem.detailaddress}}</div>
          </div>
          <div class="useBtn" @click="toUseAddress(addressItem.addressId)">
            <span>使用</span>
          </div>
        </div>
      </div>
      <div class="toAdd">
        <span @click="toAdd">新增地址</span>

      </div>

    </van-popup>
    <h1 style="padding: 0 0.5rem">{{goodsData.shopName}}</h1>
    <!-- <v-zu></v-zu> -->
    <div class="group" v-for="item in goodsData.orderDetailsVOs">
      <div class="group-left">
        <img :src="item.imgUrl" alt="">
      </div>
      <div class="group-right">

        <div class="goodsTitle">

          <div class="goodsName">
            <span>{{item.name}}</span>
            <span>{{item.specificationName}},{{item.linkValue}}</span>
          </div>
          <div class="serve2">
            <div style="text-align: right;">
              <span>￥</span>
              <span>{{item.unitPrice}}</span>
            </div>
            <span style="display: inline-block;width:100%;text-align:right; font-size: 0.5rem;color: #999;">X{{item.quantity}}</span>
          </div>
        </div>


      </div>
    </div>

    <div class="div1" @click="show=true" v-if="!isGroupbuying">
      <span>店铺优惠券</span>
      <span>
        <span v-if="couponBIgNum">满{{couponBIgNum}}减{{couponNum}}&nbsp;</span>
        <van-icon class="icon3" name="arrow" />
      </span>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">

      <div class="popup">
        <h1>店铺优惠卷</h1>
        <label class="mint-checklist-label" v-for="coupon in couponlist" @click='toUseCoupon(coupon.satisfyAmount,coupon.amount,coupon.couponId)'>
          <span class="mint-checkbox-label">满{{coupon.satisfyAmount}}元减{{coupon.amount}}元</span>
          <span class="mint-checkbox">
            <input type="radio" name="name" class="mint-checkbox-input" value="选项A">
            <span class="mint-checkbox-core"></span>
          </span>
        </label>
        <label class="mint-checklist-label">
          <span class="mint-checkbox-label">不使用优惠卷</span>
          <span class="mint-checkbox">
            <input type="radio" name="name" class="mint-checkbox-input" value="选项A">
            <span class="mint-checkbox-core"></span>
          </span>
        </label>

        <!-- <button class="btn" @click="show=false">关闭</button> -->
      </div>
    </van-popup>




    <div class="div4">
      <span>卖家留言:</span>
      <input type="text" v-model="leaveWord">
    </div>
    <div class="div2">
      <span>共{{goodsData.Num}}件商品&nbsp;&nbsp;总付金额：</span>
      <span style="color:#cd2a34">￥{{goodsData.originalPrice}}</span>
    </div>
    <div class=" div2 div3">
      <span>合计：</span>
      <span style="color:#cd2a34">￥{{goodsData.originalPrice-couponNum}}</span>
      <div class="btn" @click="queren2(goodsData.orderId,(goodsData.originalPrice-couponNum))">
        提交订单
      </div>
      <!-- <van-button type="danger">危险按钮</van-button> -->
      <!-- <van-button  ></van-button> -->
    </div>

  </div>

</template>

<script>
  export default {

    data() {
      return {
        isGroupbuying: false,
        leaveWord: "",
        couponBIgNum: "",
        couponNum: 0,
        couponId: "",
        addressFlag: false,
        goodsData: {},
        show: false,
        show2: false,
        addressId: "",
        num1: 1,
        addressMsg: {},
        addresslist: [],
        orderlist: {},
        userInfo: {},
        couponlist: [],
      }

    },
    created() {
      this.getOrderList()
    },

    methods: {


      colChose(i) {
        this.$store.commit("CHANGE_COL_SELECTED", i);
      },
      sizeChose(i) {
        this.$store.commit("CHANGE_SIZE_SELECTED", i);
      },

      getOrderList() {
        this.orderlist = JSON.parse(sessionStorage.getItem("orderlist"))
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        // console.log(this.orderlist)
        this.getGoodsData()
        this.getDefaultAddress()

      },
      getDefaultAddress() {
        this.$http.get(this.HOME+"/userAddress/queryUserAddressByUserId/" + this.userInfo.userId).then(res => {
          // console.log(res)
          this.addresslist = res.data.data
          this.addresslist.forEach(val => {
            if (val.isdefault) {
              this.addressMsg = val
              return
            }
            this.addressMsg = this.addresslist[0]
            this.addressId = this.addressMsg.addressId
          });
          console.log(this.addressMsg)

        })
      },
      getGoodsData() {
        this.$http.get(this.HOME+"order/queryOrderById/" + this.$route.query.orderId).then(res2 => {
          console.log(res2)
          this.goodsData = res2.data.data
          this.goodsData.Num = 0
          this.userId = this.goodsData.userId
          this.isGroupbuying = this.goodsData.orderDetailsVOs[0].isGroupbuying
          this.goodsData.orderDetailsVOs.forEach(val => {
            this.goodsData.Num += val.quantity
            // console.log(val);

            this.getCoupon()
          });
        })
      },
      getCoupon() {
        this.$http.get(this.HOME+"/coupon/queryUserValidCoupon", {
          params: {
            page: 1,
            rows: 10,
            userId: this.userInfo.userId
          }
        }).then(res3 => {
          var list = res3.data.data.data
          list.forEach(val => {
            // console.log(val.satisfyAmount)
            // console.log(this.goodsData.originalPrice)
            // console.log(val.satisfyAmount<this.goodsData.originalPrice)
            if (val.satisfyAmount < this.goodsData.originalPrice) {
              // console.log(val)
              this.couponlist.push(val)
            }
          });
          // console.log(this.couponlist)
        })
      },
      toUseCoupon(totalNum, Num, id) {
        this.couponBIgNum = totalNum
        this.couponNum = Num
        this.couponId = id
        setTimeout(() => {
          this.show = false
        }, 500);

      },
      toUseAddress(id) {
        this.$http.get(this.HOME+"/userAddress/queryUserAddressByAddressId/" + id).then(res => {
          console.log(res)
          this.addressMsg = res.data.data
          this.addressId = this.addressMsg.addressId
          this.addressFlag = false
        })
      },
      toAdd() {
        this.$router.push({ path: "/shipping2" })
      },
      // 支付
      queren2(id, orderPrice) {
        var that = this
        var url = "/order/submitOrder"
        if (this.couponId) {
          url += ("?usLinkId=" + this.couponId)
        }
        // that.$router.push({ path: "/queren2?orderPrice=" + orderPrice });
        // console.log(id, orderPrice)
        var token = localStorage.getItem("Token")
        console.log(this.$route)
        let postData = this.$qs.stringify({
          totalPrice: 0.01,
          orderId: id,
          token: token,
          content: "大悦城商城在线支付"
        });
        // that.$http.post(url, {
        //   userId: that.userId,
        //   orderId: id,
        //   discountPrice: orderPrice,
        //   addressId: that.addressId,
        //   leaveWord: that.leaveWord
        // }).then(res => {
        
        //   if (res.data.success) {
        //     that.$router.push({ path: "/queren2?orderPrice=" + orderPrice + "&orderId=" + id });
        //   }
        // }).catch(err => {
        //   alert(JSON.stringify(err.response))
        // })

        this.$http.post(this.HOME+"pay/saveFaceToFacePayment", postData).then((res) => {
          console.log(res)
          if (res.data.code == 0) {

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
                  that.$http.post(url, {
                    userId: that.userId,
                    orderId: id,
                    discountPrice: orderPrice,
                    addressId: that.addressId,
                    leaveWord: that.leaveWord
                  }).then(res => {
                    if (res.data.success) {
                      that.$router.push({ path: "/queren2?orderPrice=" + orderPrice + "&orderId=" + id });
                    }
                  }).catch(err => {

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
      },

    },


  };
</script>

<style scoped lang="less">
  .addressBox {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .address-top {
    height: 3rem;
    line-height: 3rem;
    background-color: #fff;
    color: #333;
    text-align: center;
    border-radius: 8px 8px 0 0;
    border: 1px solod #000;
  }

  .addresslist-box {
    background-color: #fff;
    padding-bottom: 1rem;
  }

  .van-address-list__name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .addmsg {
    padding: 0.8rem 0.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }

  .addmsg:last-of-type {
    border-bottom: none;
  }

  .useBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: #666;

  }

  .group {
    padding: 0 0.5rem;
    /* width: 100%; */
    height: 5rem;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    display: flex;

    .group-left {
      width: 25%;
      height: 90%;
      >img {
        width: 100%;
        height: 100%;
      }
    }
    .group-right {
      width: 75%;
      height: 100%;

      padding-left: 0.5rem;
      display: flex;
      flex-direction: column;
      .goodsTitle {
        display: flex;
        justify-content: space-between;
        .goodsName {
          >span:nth-of-type(1) {

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 0.8rem;
          }
          >span:nth-of-type(2) {
            margin-top: 0.5rem;
            font-size: 0.6rem;

          }
        }
      }
      >span {
        display: inline-block;
        width: 80%;

        display: flex;

      }

      .price {
        width: 100%;
        color: #ff6170; // border: 1px solid #000;
        font-size: 10px;
        position: absolute; // left: 10px;
        top: 60px;
        >span:nth-of-type(2) {
          margin-left: 99px;
          color: #999;
        }
      } // 服务
      .serve {
        // border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: space-between; // margin-top: 15px;
        width: 80%; // position: relative;
        height: 45%; // top: 10%;
        >span {
          border: 1px solid #ce2e37;
          border-radius: 20px;
          display: inline-block;
          width: 30%;
          height: 40%;
          text-align: center;
          color: #ce2e37;
        }
      }
    }
  }

  .serve2 {

    width: 50px;
    height: 40px;
    color: #ce2e37;
    padding-right: 0.5rem;
    >div {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      >span:nth-of-type(1) {
        font-size: 0.6rem;

      }
      >span:nth-of-type(2) {
        font-size: 1rem;


      }
    }

  } // 遮罩层
  .box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2); // -moz-opacity: 0.2;
    opacity: 0.8;
    z-index: 99999;
    display: flex;
    display: none;
    .pay {
      // border: 1px solid #000;
      background-color: #595959;
      width: 120px;
      height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      >img {
        width: 35px;
        height: 35px;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .pay2 {
        // border: 1px solid #000;
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
        border: 1px solid #000;
        width: 6px;
        height: 6px;
        background-color: #fff;
        display: inline-block;
        position: relative;
        border-radius: 4px;
        top: 80%;
        left: 40%;
        transform: translate(-50%, -50%);
      }
    }
  } // 弹出层
  .van-popup--bottom {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .popup {

    font-size: 0.8rem;
    >h1 {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 0;
      width: 100%;
      height: 30px;
      text-align: center;
      color: #000;
      font-size: 1rem;
      ;
    }
    .btn {
      width: 100%;
      height: 35px;
      background-color: #e24e56;
      color: #fff;
      margin-top: 50px;
    }
    s label {
      border-bottom: 1px solid #ccc;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
    }
    .mint-checkbox-core::after {
      top: 0px;
      left: 5px;
    }
    .mint-checkbox-input:checked+.mint-checkbox-core {
      background-color: #cd2a34;
      border-color: #cd2a34;
    }
    .mint-checkbox-core {
      width: 15px;
      height: 15px;
    }
  } //配送方式弹出层
  .pei {
    width: 100%;
    height: 300px; // border: 1px solid #000;
    width: 99%;
    height: 300px;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    h1 {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px; // border: 1px solid red;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
    .btn {
      width: 100%;
      height: 35px;
      background-color: #e24e56;
      color: #fff;
      margin-top: 50px;
    }
  } //  单选按钮修改
  label {
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
  }

  .mint-checkbox-core::after {
    top: 0px;
    left: 5px;
  }

  .mint-checkbox-input:checked+.mint-checkbox-core {
    background-color: #cd2a34;
    border-color: #cd2a34;
  }

  .mint-checkbox-core {
    width: 15px;
    height: 15px;
  }

  h2 {
    width: 100%;
    height: 60px;
    background-color: #000;
    text-align: center;
    line-height: 60px;
    color: #fff;
  }

  h1 {
    width: 100%;
    height: 30px;
    background-color: #fff;
    margin-top: 5px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 5px;
  }

  /* 电话号码 */

  .span1 {}

  .icon {
    /* border: 1px solid #000; */
    position: absolute;
    top: -20%;
  }

  .van-cell {
    /* border: 1px solid #000; */
    width: 100%;
    height: 100%;
    background-color: #fff;
    /* padding-left:20px;  */
    display: flex;
    justify-content: space-between;
  }

  .van-radio {

    display: flex;
    align-items: center;
    /* width: 100%; */
  }

  .van-radio__input {
    width: 1.5rem;
    /* height: 100%; */
    display: flex;
    align-items: center;
    justify-content: center
  }

  .van-radio__label {
    flex: 1;

    padding-right: 0.8rem;
  }

  .van-cell__value--link {
    padding-right: 0;
  }

  .icon2 {
    /* border: 1px solid #000; */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
  }

  .toAdd {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    span {
      color: #fff;
      padding: 0.5rem 1.5rem;
      border-radius: 8px;
      background-color: #CD2A34;
    }
  }

  .div4 {
    padding: 0 0.5rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
    height: 40px;
    font-size: 14px;
    input {
      flex: 1
    }
  }

  .div1 {
    border-bottom: 1px solid #eee;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 14px;
    >span {
      display: inline-block;
      padding-right: 10px;
      padding-left: 10px;
    }
  }

  .div2 {
    /* border: 1px solid #000; */
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 14px;
    >span {
      display: inline-block;
      padding-right: 10px;
      /* border: 1px solid #000; */
    }
  }

  .div3 {
    position: fixed;
    bottom: 0;
    >.btn {
      padding-right: 10px;
      background-color: #cd2a34;
      color: #fff;
      height: 100%;
      line-height: 40px;
      width: 28%;
      font-size: 14px;
      text-align: center;
      padding-left: 5px;
    }
  }

  .rule {
    /* border: 1px solid #000; */
    width: 95%;
    height: 10px;
    position: absolute;
    left: 7px;
    top: 78px;
    background-image: url("../../img/order_bg_line@2x.png");
  }

  .el-input-number {
    position: relative;
    display: inline-block;
    width: 143px;
    line-height: 29px;
  }
</style>