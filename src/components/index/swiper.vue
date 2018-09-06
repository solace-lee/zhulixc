<template lang="html">
    <div class="swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="i in swiper" :key="i.id">
          <!-- <router-link :to="{ name: '详情页'}" @click="as(i.commodityId)"> -->
        <img :src="i.imgUrl" @click="as(i.commodityId,i.userId)">
        <!-- </router-link> -->
        </mt-swipe-item>
      </mt-swipe>
      
    </div>
</template>
<script>
export default {
  data(){
    return{
      swiper:[],      
    }
  },
  
  created(){
    this.getSwiper()
  },
    methods:{
      as(key,userId){        
        var user = userId;
        if(userId=="undefined"){
          user=null;
        }
        this.$router.push({name:'详情页',params:{id:key,userId:user}})        
      },
      getSwiper(){ 
      
        this.$http.get(this.HOME+'/sysImg/getMainPageSysImg/0/5').then(res=>{
          //console.log(res)
           this.swiper=res.data.data;
          //  console.log(this.swiper)
        })
      }
    }
  }

</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';

.swiper {
  width: 100%;
  position: relative;

  .mint-swipe {
    width: 100%;
    height:60vw;
    // border: 1px solid #000;
    img {
      display: block;
      width: 100%;
      height:100%;
    }
  }

  

}
</style>