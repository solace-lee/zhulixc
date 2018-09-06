<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer">
    <van-tabbar v-model="active">


      <van-tabbar-item icon="shop">
        <span>首&nbsp;页</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/indexImage/tab_icon_shoppingmall_nor.png" v-if="!props.active" />
          <img src="../../img/indexImage/tab_icon_shoppingmall_pre.png" alt="" v-if="props.active">
        </template>
      </van-tabbar-item>

      <van-tabbar-item icon="shop">
        <span>发&nbsp;现</span>
        <template slot="icon" slot-scope="props">
        	<img src="../../img/indexImage/found1.png" v-if="!props.active" />
          <img src="../../img/indexImage/found2.png" alt="" v-if="props.active">
          <!--<img src="../../img/indexImage/fenlei120180705180249.png" v-if="!props.active" />
          <img src="../../img/indexImage/fenlei2_20180705180331.png" alt="" v-if="props.active">-->
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop">
        <span @click="footer">我&nbsp;的</span>
        <template slot="icon" slot-scope="props">
          <img src="../../img/indexImage/tab_icon_my_nor.png" v-if="props.active" />
          <img src="../../img/indexImage/tab_icon_my_pre.png" alt="" v-if="!props.active">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
  export default {
    props: {
      foot: Number
    },
    data() {
      return {
        active: 0,
        icon: {
          normal: "../../img/index1.png",
          active: "../../img/index2.png"
        },
        icon2: {
          normal: "../../img/index1.png",
          active: "../../img/index2.png"
        },
        icon3: {
          normal: "../../img/index1.png",
          active: "../../img/index2.png"
        }
      };
    },
    watch: {
      active() {
        console.log(this.active);
        if (this.active == 0) {
        	this.$router.push({ path: "/" });
          sessionStorage.setItem("active", this.active);
        }
        if (this.active == 1) {
        	this.$router.push({ path: "/found?name=发现精彩" });
          sessionStorage.setItem("active", this.active);
        }
        if (this.active == 2) {
        	this.$router.push({ path: "/user?name=个人中心" });
          sessionStorage.setItem("active", this.active);
          
        }
      }
    },
    created() {
      // this.active=0
    },
    mounted() {
      this.active = sessionStorage.active
        ? JSON.parse(sessionStorage.getItem("active"))
        : 0;
      this.active = this.foot;
    },
    methods: {
      toIndex() {
        console.log("111");
      },
      footer(){
      	 this.$http.get(this.HOME+'/wx/login').then(res=>{
        console.log(res)
           })  
      }
    }
  };
</script>

<style lang="less" scoped>
  .footer {}

  .van-tabbar-item--active {
    color: #00ad8a;
    font-weight: 600;
  }
  .van-tabbar-item__icon img {
    height: 22px;
}
</style>