<template>
  <div>
    <mt-tab-container v-model="selected">
      <!-- 新品上架列表 -->
      <mt-tab-container-item id="1">
        <p>3月20日</p>
        <div class="boxq1"> 
          <div class="boxq_Left" v-for='item in commoList' :key="item.id">
            <img :src="item.picUrl" alt="">
            <p>{{item.name}}</p>
            <p style="color:#fecd00">￥{{item.price}}</p>
            <button>购买</button>
         <div class="boxq" v-for='item in commoList' :key="item.id">
            
          </div>
          <!-- <div class="boxq_right">
            <img :src="item.picUrl" alt="">
            <p>{{item.name}}</p>
            <button>购买</button>
            <p style="color:#fecd00">￥{{item.price}}</p>
          </div> -->
         </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: "1",
       commoList:[],
    };
  },
  created(){
      this.fileList();
  },
   methods:{
    fileList(){
      this.$http.get(this.HOME+'/commodity/queryShopCommodityByPage',{params:{page:1,rows:10,shopId:10}}).then(res=>{     
       this.commoList=res.data.data.data;
       console.log(res);
       
      })
    }
  },
};
</script>

<style scoped lang="less">
p{
     width: 100%;
     height: 30px;
     text-indent: 1em;
     color: #ccc;
    line-height: 30px;
    background-color: #f2f2f2;
   }
.boxq1{
  display: flex;
  background-color: #fff;
  //  flex-direction: column; 
   justify-content: center;
  // align-items: center;
   flex-wrap: wrap;
// }
// .boxq1 {
//   display: flex;
//   background-color: #fff;
//   flex-direction: column;
//   border: 1px solid #000;
//   justify-content: center;
//   align-items: center;
  // .boxq {
  //   width: 90%;
  //   height: 100%;
  //   // display: flex;
  //   margin: 10px; 
  //   font-size: 15px;
  //   border: 1px solid #000;
  //   > 
  .boxq_Left {
      display: flex;
      flex-direction: column;
      position: relative;
      border: 1px solid #000;
      width: 45%;
      margin: 5px;
      > p {
        font-size: 14px;
      }
      > img {
        width: 98%;
        height: 180px;
        margin: 2px;
      }
      > button {
        border: 1px solid #ce2a32;
        width: 50px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        border-radius: 10px;
        color: #ce2a32;
        background-color: #fff;
        position: absolute;
        right: 10px;
        bottom: 5px;
      }
    }
  }


</style>