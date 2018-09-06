<template>
  <div class="popup" @click="show=true">
    <!-- 选择颜色分类弹层 -->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="yardage">
        <div>
          <img src="../../../static/12.jpg" alt="">
          <span>￥</span>
          <span>80</span>
          <span>库存100件</span>
          <span>已选："深蓝色""s"</span>
        </div>
        <div>
          <h1>颜色</h1>
          <button>深蓝色</button>
          <button>浅蓝色</button>
        </div>
         <div>
          <h1>尺寸</h1>
          <button>s</button>
          <button>M</button>
          <button>L</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:false,
      share_show: false
    };
  }
};
</script>

<style scoped lang="less">
.van-popup--bottom {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.yardage{
  border: 1px solid #000;
  width: 100%;
  height: 350px;
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
