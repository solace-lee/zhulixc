<template>
  <!-- 提交订单 -->
  <div>
    <h2>确认订单</h2>
    <!-- <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"/> -->
    <div class="van-cell van-hairline van-cell--clickable">
      <!---->
      <div class="van-cell__value van-cell__value--link van-cell__value--alone">
        <div class="van-radio">
          <span class="van-radio__input"><input type="radio" class="van-radio__control" value="1">
            <van-icon class="icon" name="location" />
          </span>
          <span class="van-radio__label">
            <div class="van-address-list__name">收货人:用户昵称
              <span class="span1">1321321231</span>
            </div>
            <div class="van-address-list__address">收货地址：浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</div>
          </span>
        </div>
      </div>
      <van-icon class="icon2" name="arrow" />
      <div class="rule"></div>
    </div>
    <h1>小星星服装店</h1>
    <v-zu></v-zu>
    <!-- @click="show=true点击弹出 -->

    <div class="div1" @click="show=true">
      <span>店铺优惠券</span> 
      <span>满减10元&nbsp;
        <van-icon class="icon3" name="arrow" />
      </span>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
        <!-- 弹出层内容 -->
        <!-- <div class="van-modal"> -->
        <div class="popup">
          <h1>店铺优惠卷</h1>
          <label class="mint-checklist-label">
            <span class="mint-checkbox-label">满XX元减10元</span>
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" value="选项A">
              <span class="mint-checkbox-core"></span>
            </span>
          </label>
          <label class="mint-checklist-label">
            <span class="mint-checkbox-label">不使用优惠卷</span>
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" value="选项A">
              <span class="mint-checkbox-core"></span>
            </span>
          </label>

          <button class="btn" @click="show=false">关闭</button>
        </div>
      </van-popup>
    <!-- </div>  -->
    <!--  -->
    <div class="div1" @click="show2=true">
      <span>配送方式</span>
      <span>快递&nbsp;免邮
        <van-icon class="icon3" name="arrow" />
      </span>
    </div>
    <!-- 配送方式弹层 -->
      <van-popup v-model="show2" position="bottom" :overlay="true">
      <div class="pei">
        <h1>配送方式</h1>
        <label class="mint-checklist-label">
          <span class="mint-checkbox-label">快递 免邮</span>
          <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" value="选项A">
            <span class="mint-checkbox-core"></span>
          </span>
        </label>
        <button class="btn" @click="show2=false">关闭</button>
      </div>
    </van-popup>



    <div class="div1">
      <span>卖家留言:选填</span>
    </div>
    <div class="div2">
      <span>共1件商品&nbsp;&nbsp;总付金额：</span>
      <span style="color:#cd2a34">￥80</span>
    </div>
    <div class=" div2 div3">
      <span>合计：</span>
      <span style="color:#cd2a34">￥80</span>
      <van-button type="default" class="btn" @click="queren2">提交订单</van-button>
    </div>
    <div class="box">
      <div class="pay">
        <img src="../../img/mall_tab_icon_classification_pre.png" alt="">
        <span class="pay2">微信支付</span>
        <span class="pay3"></span>
        <span class="pay3"></span>
        <span class="pay3"></span>
      </div>
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
      show: false,
      show2:false,
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
    methods: {
      // discounts(){
      //   this.
      // }
    }
  },

  methods: {
    onAdd() {
      Toast("新增收货地址");
    },
    onEdit(item, index) {
      Toast("编辑收货地址:" + index);
    },
    queren2() {
      this.$router.push({ path: "/queren2" });
    }
  }
};
</script>

<style scoped lang="less">
// 遮罩层
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  // -moz-opacity: 0.2;
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
    > img {
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
}
// 弹出层
.popup {
  border: 1px solid #ccc;
  width: 99%;
  height: 300px;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  
  > h1 {
    width: 98%;
    height: 30px;
    text-align: center;
    color: #000;
    font-size: 16px;
    //  border: 1px solid #000;
    // border-bottom: 1px solid #ccc;
  }
  .btn {
    width: 100%;
    height: 35px;
    background-color: #e24e56;
    color: #fff;
    margin-top: 50px;
  }
  //  单选按钮修改
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
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #cd2a34;
    border-color: #cd2a34;
  }
  .mint-checkbox-core {
    width: 15px;
    height: 15px;
  }
}
//配送方式弹出层
.pei {
  width: 100%;
  height: 300px;
  // border: 1px solid #000;
  width: 99%;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 10px;
  h1 {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    // border: 1px solid red;
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
}
//  单选按钮修改
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
.mint-checkbox-input:checked + .mint-checkbox-core {
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
.span1 {
  position: absolute;
  right: 0px;
}
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

.van-radio__label {
  /* border: 1px solid #000; */
  position: relative;
  left: 10px;
  /* top:-15px; */
  width: 85%;
  height: 70px;
}
.icon2 {
  /* border: 1px solid #000; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
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
  > span {
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
  > span {
    display: inline-block;
    padding-right: 10px;
    /* border: 1px solid #000; */
  }
}
.div3 {
  position: fixed;
  bottom: 0;
  > .btn {
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
</style>