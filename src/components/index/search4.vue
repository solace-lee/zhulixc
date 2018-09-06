<template>
  <div class="box">
    <!-- <h1 class="h1">交易成功</h1> -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">立即评价</mt-tab-item>
      <span>|</span>
      <mt-tab-item id="2">订单详情</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
          1
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <!-- <mt-cell v-for="n in 4" :title="'content ' + n" /> -->
2
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: "1"
    };
  }
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  background-color: #eee;
 span{
   font-size: 30px;
   line-height: 45px;
 }
}
.mint-navbar .mint-tab-item.is-selected {
    /* border-bottom: 3px solid #26a2ff; */
    /* color: #26a2ff; */
    margin-bottom: -3px;
}
</style>