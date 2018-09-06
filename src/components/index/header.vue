<template lang="html">

    <div class="head">
                <div class="site">
                    <div>
                        <van-icon name="location" />
                        <span>广州天河</span>
                    </div>
                </div>
                <div class="search">
                    <van-icon name="search" />
                    <input type="text" placeholder="搜索你想购买的商品"  @click="hotspot">
                </div>
                <div class="enter">
                    <img src="../../../img/indexImage/mall_btn_ruzhu.png" alt=""  @click="ruzhu">
                </div>

            </div>
  <!-- <div class="header">
    
    <span>
      <img src="../../../img/mall_icon_search.png" alt="" class="sou" />
    </span>
    
    <input type="text" placeholder="搜索你想购买的商品" @click="hotspot" />
    <img src="../../../img/mall_btn_ruzhu.png" alt="" class="ruzhu" @click="ruzhu" />

  </div> -->

  </mt-header>

</template>

<script>
  export default {
    value: "",
    result: "a",
    data() {
      return {
        value: "",
        result: "",

      };
    },
    created() {

    },
    methods: {
    
      //点击搜索传递input里面的参数给页面
      ruzhu() {
        this.$router.push({ path: "/ruzhu" });
      },
      hotspot() {
        this.$router.push({ path: "/hotspot" });
      },
      
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/fz.less";
  @import "../../assets/index/style.css";
  .header {
    width: 100%;
    height: 50px;
    position: relative;
    background-color: #f2f2f2;
    input {
      width: 80%;
      height: 80%; // border: 1px solid #000;
      border-radius: 10px;
      background-color: #fff;
      margin-top: 3px;
      text-indent: 2.5em;
      font-size: 14px;
    }
    .sou {
      // border: 1px solid #000;
      position: absolute;
      left: 20px;
      top: 11px;
      width: 5%;
      height: 45%;
    }
    .ruzhu {
      // border: 1px solid #000;
      width: 8%;
      height: 60%;
      display: inline-block;
      position: absolute;
      right: 5%;
      margin-top: 6px;
    }
  }

  .mint-header {
    width: 100%;
    height: 53px;
    padding: 4.8vw; // border: 1px solid #000;
    background: #d9d9d9;
  }

  .mint-search[data-v-20bfb24f] {
    height: 8vh;
    width: 167vh;
    position: absolute;
    left: 0px;
    width: 100%;
    top: 0;
  }

  .mint-searchbar-inner .mintui-search {
    font-size: 28px;
    color: #d9d9d9;
  }

  .mint-search[data-v-20bfb24f][data-v-20bfb24f] {
    height: 10vh;
  }

  .bba {
    width: 50px;
    height: 50px;
    background-color: red;
  }
</style>