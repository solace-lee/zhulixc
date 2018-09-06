<template>
  <!-- 订单详情 -->
  <div>
    <div class="tt">
      <span v-if="orderMsg.orderStatus==1">未支付</span>
      <span v-if="orderMsg.orderStatus==2">买家已付款</span>
      <span v-if="orderMsg.orderStatus==3">待收货</span>
      <span v-if="orderMsg.orderStatus==4">已完成</span>
      <span v-if="orderMsg.orderStatus==5">已退款</span>
      <span v-if="orderMsg.orderStatus==6">已关闭</span>
     
    </div>
    <!-- 车 -->
    <!-- <span class="icon2-thecar icon4"></span> -->
    <!-- <div class="tt2">
      <div class="div4 div5">
        <span style="color:#cd2a34">你的订单待配货</span>
        <span>2018-04-01 15: 00 00</span>
      </div>
      <span>
        <van-icon class="icon" name="arrow" />
      </span>
    </div> -->

    <div class="van-cell">

     
        <div class="van-radio">
          <div class="van-radio__input">
            <!-- <input type="radio" class="van-radio__control" value="1"> -->
            <van-icon class="icon" name="location" />
          </div>
          <div class="van-radio__label" v-if="address">
            <div class="van-address-list__name"><span>收货人:{{address.contact}}</span><span>{{address.phone}}</span></div>
            <div class="van-address-list__address">收货地址：{{address.provinceName}}{{address.cityName}}{{address.districtName}}{{address.villageName}}{{address.detailaddress}}</div>
          </div>
          <div style="font-size: 0.8rem;color: #999;padding-left: 1rem;" v-if="!address">没有读取到用户地址</div>
        </div>
    

    </div>
    <h1 class="ff_di">
      <span>{{orderMsg.shopName}}&nbsp;&nbsp;</span>
      <span @click="toShop(orderMsg.shopId)">进店&nbsp;&nbsp;></span>
    </h1>
    <div class="group" v-for="goods in orderMsg.orderDetailsVOs">
      <div class="group-left">
        <img :src="goods.imgUrl" alt="">
      </div>
      <div class="group-right">
        <div class="title-top">
          <span class="title">
            {{goods.name}}
          </span>

          <div class="serve2">
            <div>
              <span style="font-size: 0.7rem;">￥</span><span style=" font-size: 0.9rem;">{{goods.unitPrice}}</span>
            </div>
            <div style="text-align: right; font-size: 10px;color: #999;">x{{goods.quantity}}</div>
          </div>
        </div>
        <div style="font-size: 12px;
            margin-top: 6px;">{{goods.specificationName}},{{goods.linkValue}}</div>
        <!-- <div clas -->

      </div>
    </div>

    <div class="div1">
      <span>实付款</span>
      <span style="color:#cd2a34">￥{{orderMsg.originalPrice}}</span>
    </div>
    <div class="div4">
      <span>订单编号：{{orderMsg.orderNum}}</span>
      <span>下单时间：{{orderMsg.createdDate}}</span>
    </div>
    
  </div>
</template>

<script>
 
  export default {
   
    data() {
      return {
        address:"",
        orderMsg: {}
      };
    },
    created() {
      this.getdata()
    },
    methods: {
      getdata() {
        this.$http.get(this.HOME+"order/queryOrderById/" + this.$route.query.orderId).then(res => {
          console.log(res)
          this.orderMsg = res.data.data
          this.orderMsg.createdDate=this.getTime(this.orderMsg.createdDate)
          console.log(this.orderMsg)
          this.addressId= this.orderMsg.addressId
          console.log(this.addressId);
        }).then(()=>{
          this.$http.get(this.HOME+"/userAddress/queryUserAddressByAddressId/"+this.addressId).then(res2=>{
            console.log(res2)
            this.address=res2.data.data
          })
        })
      },
      getTime(d) {
        var time = new Date(d)
        // console.log(time)
        var y = time.getFullYear()
        var m = time.getMonth(+1)
        var d = time.getDate()
        return y + "-" + m + "-" + d
      },

    }
  };
</script>

<style scoped lang=less>
  .van-address-list__name{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  
  }
  .tt {
    width: 100%;
    height: 60px;
    background-color: #e44f58;
    color: #fff;
    justify-content: space-between;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    text-indent: 1em;
    >span {
      display: inline-block;
    }
    span:nth-of-type(2) {
      /* border: 1px solid #000; */
      width: 80px;
      height: 30px;
      margin: 15px;
      text-indent: 0;
      >img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .div5 {
    text-indent: 2em;
  }

  .div4 {
    background-color: #fff;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      line-height:1.8rem;
     
      font-size: 14px;
      /* padding-left: 10px; */
    }
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

  .icon {
    /* border: 1px solid #000; */
    position: absolute;
    top: -20%;

  }
.serve2{
  color: #cd2a34;
}

.van-radio{
  display: flex;
  align-items: center;
  min-height: 3rem;
}
.van-radio__input{
    width: 2rem;
  
    display: flex;
    justify-content: center;
   
}
  .van-radio__label {
   
    flex: 1;
    height: 70px;
  }

  .icon2 {
    /* border: 1px solid #000; */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
  }

  .icon3 {
    /* border: 1px solid #000; */
    font-size: 14px;
    color: #ccc;
    position: absolute;
    top: 75px;
    right: 14px;
  }

  .icon4 {
    position: absolute;
    left: 13px;
    top: 67px;
    font-size: 16px;
    color: #ccc;
    /* border: 1px solid #000; */
  }

  .div1 {
    border-bottom: 1px solid #eee;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

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
      border: 1px solid #ccc;
      color: #999;
      height: 100%;
      /* line-height:40px; */
      width: 20%;
      height: 50%;
      font-size: 14px;
      text-align: center;
      padding-left: 5px;
      border-radius: 5px;
      font-size: 12px;
      margin-right: 10px;
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
      >img {
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
          font-size: 0.9rem;
          padding: 0 0.2rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      >span {
        // border: 1px solid #000;
        display: inline-block;
        width: 80%;
        font-size: 14px;
        margin-top: 3px;
      }
      >span:nth-of-type(1) {
        font-size: 14px;
      }
      >span:nth-of-type(2) {}
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
      }

      .serve {
        width: 80%;
        position: absolute;
        left: 10px;
        bottom: 10px-;
        >span {
          border: 1px solid #ce2e37;
          border-radius: 10px;
          display: inline-block;
          width: 30%;
          height: 18px;
          line-height: 18px;
          text-align: center;
          color: #ce2e37;
        }
      }
    }
  }
</style>