<template>
<!-- 交易完成 -->
  <div>
    <div class="tt">
      <span>交易完成</span> 
      <span><img src="../../img/个人中心/personal_bg_transactioncompletion@3x.png" alt=""></span>
    </div>
    <!-- 车 -->
    <span class="icon2-thecar icon4"></span>
    <div class="tt2">
      <div class="div4 div5" >
        <span style="color:#bde24a">【已签收，签收人是本人】</span>
        <span>2018-04-01 15: 00 00</span>
      </div> 
      <span><van-icon class="icon" name="arrow"/></span>
    </div>
    <!-- <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"/> -->
    <div class="van-cell van-hairline van-cell--clickable">
      
      <div class="van-cell__value van-cell__value--link van-cell__value--alone">
        <div class="van-radio">
          <span class="van-radio__input"><input type="radio" class="van-radio__control" value="1">
            <van-icon class="icon" name="location"/>
          </span>
          <span class="van-radio__label">
            <div class="van-address-list__name">收货人:1322</div>
            <div class="van-address-list__address">收货地址：浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</div>
          </span>
        </div>
      </div>
      
      <van-icon class="icon2" name="arrow"/>
        <div class="rule"></div>
      
    </div>
    <h1 class="ff_di">
        <span>小星星服装店&nbsp;&nbsp;</span>
        <span>进店&nbsp;&nbsp;></span> 
      </h1> 
    <v-zu></v-zu>
    <div class="div1"><span>商品总价</span><span>￥80</span></div>
    <div class="div1"><span>运费</span><span>￥0&nbsp;<van-icon class="icon3" name="arrow"/></span></div>
    
    <div class="div1"><span>实付款</span><span style="color:#cd2a34">￥80</span></div>
    <div class="div4">
        <span>订单编号：12345215</span>
        <span>下单时间：2018-04-01 13：00 00</span>
    </div>
    <div class=" div2 div3">
      <van-button type="default" class="btn">查看物流</van-button>
      <van-button type="default" class="btn2" @click="line5">评价</van-button>
    </div>
  </div>
</template>

<script>
import zu from "./zu.vue";
export default {
  components: {
    "v-zu": zu,
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "收货人:",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        }
      ]
    };
  },

  methods: {
    onAdd() {
      Toast("新增收货地址");
    },
    onEdit(item, index) {
      Toast("编辑收货地址:" + index);
    },
    line5() {
      this.$router.push({ path: "/line5" });
    }
  }
  
};
</script>

<style scoped lang=less>
.tt{
  width: 100%;
  height: 60px;
  background-color: #e44f58;
  color: #fff;
  justify-content: space-between;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  text-indent: 1em;
  >span{
    display: inline-block;
  }
  span:nth-of-type(2){
    /* border: 1px solid #000; */
    width: 80px;
    height: 40px;
    margin: 15px;
    text-indent:0;
    >img{
      width: 100%;
      height: 100%;
    }
  }
}
.div5{
  text-indent: 2em;
}
.div4{
     display: flex;
  flex-direction: column;
  justify-content: space-between;
  span{
    display: inline-block;
    /* border: 1px solid #000; */
    background-color: #fff;
    font-size: 14px;
    padding-left: 10px;
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
.icon{
  /* border: 1px solid #000; */
  position: absolute;
  top: -20%;
  
}.van-cell{
  /* border: 1px solid #000; */
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* padding-left:20px;  */
 display: flex;
  justify-content: space-between;   
    
}

.van-radio__label{
  /* border: 1px solid #000; */
  position: relative;
  left: 10px;
  /* top:-15px; */
  width: 85%;
  height: 70px;
}
.icon2{
  /* border: 1px solid #000; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
}
.icon3{
  /* border: 1px solid #000; */
  font-size: 14px;
  color: #ccc;
  position: absolute;
  top: 75px;
  right: 14px;
}
.icon4{
  position: absolute;
  left: 13px;
  top:67px;
  font-size: 16px;
  color: #ccc;
  /* border: 1px solid #000; */
}
.div1{
  border-bottom: 1px solid #eee;
  background-color: #fff;
   display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
 
  >span{
    display: inline-block;
     padding-right: 10px;
     padding-left: 10px;
}
  }
 .div2{
  /* border: 1px solid #000; */
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px; 
  >span{
    display: inline-block;
     padding-right: 10px;
    /* border: 1px solid #000; */
}
  }
.div3{
  position: fixed;
  bottom: 0;
  >.btn{
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
.btn2{
    padding-right: 10px;
    border: 1px solid #cd2a34;
    color: #cd2a3499;
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
/* .rule{
  border: 1px solid #000;
  width: 95%;
  height: 10px;
  position: absolute;
  left: 7px;
  top: 78px;
  background-image: url('../../img/order_bg_line@2x.png');
} */
</style>