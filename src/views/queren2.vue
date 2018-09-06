<template>
  <!-- 会员充值 -->
  <div class="vip">
    <!-- <h1>确认完成</h1> -->
    <div class="sum1">
      <span>￥{{orderPrice}}</span>
    </div>

    <div class="check">
      <span @click="line(orderId)">查看订单</span>
      <span>|</span>
      <span @click="index">返回首页</span>
    </div>

  </div>

</template>

<script>
  export default {
    data() {
      return{

      orderPrice: "",
      orderId:""
      }
    },

    created() {
      this.getNum()
    },
    methods: {
      getNum() {
        this.orderPrice = this.$route.query.orderPrice

        this.orderId=   this.$route.query.orderId
      },
      index() {
        this.$router.push({ path: '/' });
      },
      line(id){
        console.log(id)
        this.$router.push({ path: '/line?orderId='+id });
      }
    }
  };
</script>

<style lang=less scoped>
  .vip {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    h1 {
      width: 100%;
      height: 60px;
      background-color: #000;
      color: #fff;
      text-align: center;
      line-height: 60px;
    }
    .sum1 {
      width: 100%;
      height: 100px;
      display: block;
      /* border: 1px solid #ccc; */
      line-height: 50px;
      background-color: #fff;
      /* padding-left: 25%; */
      text-align: center;
      line-height: 100px;
      span {
        color: #cd2a34;
        font-size: 20px;
      }
    }
    .check {
      /* border: 1px solid #000; */
      padding:1rem 0.5rem;
      display: flex;
      >span:nth-of-type(1) {
        /* border: 1px solid #000; */
        flex-grow: 1;
        text-align: center;
        font-size: 0.8rem;
      }
      >span:nth-of-type(2) {
        /* border: 1px solid #000; */
        flex-grow: 1;
        text-align: center;
      }
      >span:nth-of-type(3) {
        /* border: 1px solid #000; */
        font-size: 0.8rem;
        flex-grow: 1;
        text-align: center;
      }
    }
  }
</style>