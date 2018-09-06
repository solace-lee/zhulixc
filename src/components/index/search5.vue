<template>
  <div>
    
    <div class="box">
      <span>
        <img src="../../../static/12.jpg" alt="">
      </span>
      <span>
        <p>物流状态：运输中</p>
        <p>承运来源：圆通快速</p>
        <p>运单编号：881321632123123</p>
      </span>
    </div>
    <div>
      <van-steps direction="vertical" :active="0" active-color="#f60">
        <van-step>
          <h3>已签收</h3>
          <p>【已签收】,签收人是本人</p>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>派送中</h3>
          <p>【广州市】,广州东圃物流派件员：李某某</p>
          <p>电话：1231321321</p>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>运输中</h3>
          <p>广州市【城市】,正发往【广州转运中心】</p>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <p>广州市【城市】,正发往【广州转运中心】</p>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <p>广州市【城市】,正发往【广州转运中心】</p>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>已拦揽件</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  created(){
    this.getdata()
  },
  methods:{
    getdata(){
      var id=this.$route.query.orderId
      
    }
  }
};
</script>

<style scoped lang="less">
h1 {
  width: 100%;
  height: 60px;
  background-color: #000;
  text-align: center;
  color: #fff;
  line-height: 60px;
}
.box {
  white-space: 100%;
  height: 100px;
  border: 1px solid #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  background-color: #fff;
  > span {
    display: inline-block;
    // border: 1px solid #000;
    flex-grow: 1;
    padding: 10px;
      >img{
      width: 120px;
      height: 100%;

    }
  }

}
</style>