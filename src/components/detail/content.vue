<template lang="html">
  <section class="content">
    <div class="img-wrap" v-for="k in datas">
      <img :src="k.imgUrl">
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return {
      datas: '',
      loading:true,
      id:""
    }
  },
  mounted() {
	
    },
    created(){
      this.getId()
      this.getcontent()
    },
    methods:{
      getId() {
        var that = this
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        // console.log(num)
        // console.log(str)
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
          }
        }
        if (num > 0) {
          this.id = value
          console.log(this.id)
      
        }
      },
      getcontent(){
        this.$http.get(this.HOME+'/commodity/queryFrontCommodityById',{params:{commodityId:this.id,userId:this.$route.params.userId}}).then(res => {	
              
              this.datas = res.data.data.commodityImgs;
})
      }
    },
  computed:{
    content(){
      return this.$store.state.detail.productDatas.contentImgSrc
    }
  }
}
</script> 

<style lang="less" scoped>
  .content {
    width: 100%;
   
    background-color: #fff;
    .img-wrap {
    /* height: 120vw; */

      img {
        display: block;
        width: 95%;
       
        margin: 0 auto;
      
      }
    }
  }
</style>
