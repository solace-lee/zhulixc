<template lang="html">
  <div class="wrap">
    <v-header class="header">
      <h1 slot="title">商品分类</h1>
    </v-header>
   <!-- <router-link :to="{name:''}" slot="left"> -->
     <!-- cancel-text="搜索" -->
    <mt-search v-model="value" placeholder="搜索你想购买的商品">          
    </mt-search>
  <!-- </router-link> -->

    <section class="view">     
      <v-aside :datas="allData"></v-aside>
      <router-view :datas="allData"></router-view>
    </section>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import Footer from "@/common/_footer.vue";
import Header from "@/common/_header.vue";
import Aside from "@/components/category/aside.vue";
 import category from "@/http/mock.js"; //模拟数据
export default {
  components: {
    "v-header": Header,
    "v-aside": Aside,
    "v-footer": Footer
    
  },
  data() { 
    return {
      allData: "",
      value:''
    };
  },
  created() {
    this.$api({
      method: "post",
      url: "/category"
    })
      .then(res => {
        this.allData = res.data;
        this.allData =  {"aside":[{"title":"啊","list":{"title":"Martin","imgPath":"http://dummyimage.com/2000x2000/5169b4/FFF.png"}}]}

      })
      .catch(error => {
        console.log(error);
      });
  }
};

</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;

  .view {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    // border: 1px solid #000;
    margin-top: 10px;
  }
}
</style>
