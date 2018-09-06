<template>
  <!-- 店铺首页->全部商品页面 -->
  <div>
    <!-- <div class="box">
      <span class="inconX">
        <button name="like-o">取消关注</button>
      </span>
    </div> -->
    <mt-tab-container v-model="selected">
      <!-- 全部商品 -->
      <mt-tab-container-item id="1">
        <div>
          <section class="swipe">
            <van-swipe :autoplay="3000">
              <van-swipe-item v-for="(image, index) in Simages" :key="index" class="swipe">
                <img v-lazy="image.imgUrl" />
              </van-swipe-item>
            </van-swipe>
          </section>
        </div>
        <div class="boxq1">
          <div class="boxq">
            <div class="boxq_Left" v-for='item in commoList2' :key="item.commodityId">
              <img :src="item.picUrl" alt="">
              <p>{{item.name}}</p>
              <p style="color:#fecd00">￥{{item.price}}</p>
              <button>购买</button>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data: function() {
    return {
      selected: "1",
      Simages: [
        // "../../../static/ss.jpg",
        // "../../../static/12.jpg"
        // 'https://img.yzcdn.cn/2.jpg'
      ],
      commoList2:[],
      page:1,
      rows:10,
      shopId:1,
    };
  },
  created(){
    //  this.shopId=this.$router.params.shopId
    // console.log(this.$route.parmas) 
    // console.log(this.shopId)
    this.fileList2()
    this.fileswiper()
    
   
  },
   methods:{
     //获取列表信息
    fileList2(){
        this.$http.get(this.HOME+'/commodity/queryShopCommodityByPage',{params:{page:this.page,rows:this.rows,shopId:this.shopId}}).then(res=>{
          console.log(res);
          console.log(11111111111111);
       this.commoList2=res.data.data.data;
        console.log(this.commoList2)
      })
    },

    //获取轮播图
    fileswiper(){
      this.$http.get(this.HOME+'/sysImg/getMainPageSysImg/2/5').then(res=>{    
        //  console.log(res)   
       this.Simages=res.data.data;
      //  console.log(this.Simages)
      })
      // .catch(res=>{
      //   console.console.log();
        
      // })
    }
  },
};
</script>

<style scoped lang="less">
.swipe {
  height: 220px;
  width: 100%;
  > img {
    width: 100%;
    height: 100%;
    // border: 1px solid #000;
  }
}
.box {
  white-space: 100%;
  height: 120px;
  border: 1px solid #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  background-color: #f77076;
  font-size: 14px;
  color: #fff;
  align-items: center;
  position: relative;
  .inconX {
    // border: 1px solid #000;
    display: inline-block;
    display: flex;
    width: 80px;
    height: 20px;
    position: absolute;
    bottom: 0;
    right: 0;
    > button {
      border: 1px solid #fff;
      width: 75px;
      height: 20px;
      background-color: #f77076;
      border-radius: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
}
.boxq1 {
  display: flex;
  background-color: #fff;
  flex-direction: column;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
  .boxq {
    width: 90%;
    height: 100%;
    display: flex;
    margin: 10px;
    justify-content: center;   
    font-size: 15px;
    flex-wrap: wrap;
    > .boxq_Left {
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
}
</style>