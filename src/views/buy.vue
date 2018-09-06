<template>
  <div>
      <h1>商品详情</h1>
      <div class="box">
        <img src="../../static/12.jpg" alt="">
      </div>
  </div>
</template>

<script>
import chose from '../components/detail/chose.vue'
  export default {
    "v-chose":chose,
  }
</script>

<style scoped lang="less">
h1{
  width: 100%;
  height: 60px;
  background-color: #000;
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.box{
  width: 100%;
  height: 100%;
  >img{
    width: 100%;
    height: 300px;
  }
}
</style>