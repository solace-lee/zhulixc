<template>
  <!-- <header>
    <router-link
     class="icon-go"
     :to="{ name: '首页'}"
     v-if="$route.matched[0].path=='/category'">
    </router-link>
    <span class="icon-go" @click="$router.go(-1)" v-else></span>
    <slot name="title"></slot>
  </header> -->

  <div class="head">
    <div class="site">
      <div  @click="$router.go(-1)" v-if="name!='个人中心'"><!--&&name!='分类专区'-->
      	<span style="width: 10px;"></span>
        <van-icon name="arrow-left" />
        
      </div>
      <!--<div  @click="goIndex" v-if="name=='分类专区'">
        <van-icon name="arrow-left" />
        <span>首页</span>
      </div>-->
    </div>
    <div class="title">
     <span v-text='name'></span>
     <!-- <span v-if="commodity_id!=''">评价</span>
     <span v-if="commodity_id!=''">详情</span> -->
     <!-- <span v-if='name=="用户协议"'>同意协议</span> -->
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      name:'',
      // 商品id
      commodity_id:'',

    }    
  },
  created(){
    this.getName();
  },
   methods: {
     getName(){
       this.name=this.$route.query.name;
       this.commodity_id = this.$route.query.id;
     },
     goIndex(){
       sessionStorage.setItem('active',0)
                this.$router.push({path:'/'});
     }
   
   }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.msg{
  position: absolute;
  top: 0;
  right: .5rem;
  width: 2rem;
  height: 100%;
    display: flex;
      justify-content: center;
      align-items: center;
  img{
    width: 1.2rem;
  }
}
.head {
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
  display: flex;
  position: fixed;
  z-index: 100000;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-location {
        vertical-align: middle;
      }
      span {
        font-size: 1rem;
      }
    }
  }

  .title {
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span{
      color: #000;
      margin-right: .5rem;
    }
  }
}
</style>



