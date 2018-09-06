<template>
  <div class="popup" @click="show=true">
    <!-- 配送方式弹层 -->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="box">
        <h1>支付方式</h1>
        <!-- <template>
          <div>
            <div class="box2">
              <span><img src="../../../img/确认订单/personal_bg_wechatpayment@2x.png" class="wallet" alt=""></span>
          <el-radio v-model="radio" label="1">微信支付</el-radio>
            </div>
          <div class="box2">
            <img src="../../../img/确认订单/personal_bg_memberpayment@2x.png"  class="wallet" alt="">
          <el-radio v-model="radio" label="2">会员钱包支付</el-radio>
          </div>
          </div>
        </template> -->
        <label class="mint-checklist-label" label="1" >
          <span class="mint-checkbox">
            <input type="checkbox" class="mint-checkbox-input" value="选项A" name=reaio>
            <span class="mint-checkbox-core"></span>
            <span><img src="../../../img/确认订单/personal_bg_wechatpayment@2x.png" class="wallet" alt=""></span>
            <span class="mint-checkbox-label" >微信支付</span>
          </span>
        </label>
        <label class="mint-checklist-label" label="2">
          <span class="mint-checkbox">
            <input type="checkbox" class="mint-checkbox-input" value="选项A">
            <span class="mint-checkbox-core"></span>
             <img src="../../../img/确认订单/personal_bg_memberpayment@2x.png"  class="wallet" alt="">
            <span class="mint-checkbox-label">会员钱包支付</span>
          </span>
        </label>
        <button class="btn">下一步</button>
      </div>

    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      radio: "1"
    };
  }
};
</script>

<style scoped lang="less">
.van-popup--bottom {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.popup {
  width: 100%;
  height: 100%;
  // background-color: #000;
}
.box {
  width: 100%;
  height: 300px;
  border: 1px solid #000;
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
  .box2{
    border: 1px solid #000;
    display: flex;
    padding: 10px;
    // height: 30px;
    // line-height: 30px;
  }
  .btn {
    width: 100%;
    height: 50px;
    background-color: #e24e56;
    color: #fff;
    margin-top: 50px;
  }
}
.wallet {
  // border: 1px solid #000;
  // line-height: 20px;
  // height: 20px;
   width: 20px;
  //  position: absolute;
  //  padding-left: 18px;
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
</style>
