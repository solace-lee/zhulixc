<template>
<!-- 店铺首页->新品上架->取消关注页面 -->
  <div>
    <h1>店铺首页</h1>
    <div class="box">
      <span>
        <img src="../../../static/12.jpg" alt="">
      </span>
      <span>
        <p>店铺名称</p>
        <p>店铺地址：广东省广州市天河区东圃大马路kfc..</p>
      </span>
      <span class="inconX">
        <button name="like-o">取消关注</button>
      </span>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部商品</mt-tab-item>
      <span class="su">|</span>
      <mt-tab-item id="2">新品上架</mt-tab-item>
      <span class="su">|</span>
      <mt-tab-item id="3">店铺二维码</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <!-- 全部商品 -->
      <mt-tab-container-item id="1">
        <div class="boxq1">
          <p>3月20日</p>
         <div class="boxq">
            <div class="boxq_Left">
            <img src="../../../static/12.jpg" alt="">
            <p>2018新款牛仔短裤女夏季韩版牛仔短裤宽....</p>
            <button>购买</button>
          </div>
          <div class="boxq_right">
            <img src="../../../static/12.jpg" alt="">
            <p>2018新款牛仔短裤女夏季韩版牛仔短裤宽....</p>
            <button>购买</button>
          </div>
         </div>
        </div>
      </mt-tab-container-item>
      <!-- 新品上架 -->
      <mt-tab-container-item id="2">
        <!-- <mt-cell v-for="n in 4" :title="'content ' + n" /> -->
        2
      </mt-tab-container-item>
      <!-- 微信二维码 -->
      <mt-tab-container-item id="3">
        <div class="boxE">
          <img src="../../../static/ma.jpg" alt="">
          <p>手机微信扫一扫</p>
        </div>

      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: "1"
    };
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
  > span {
    display: inline-block;
    // border: 1px solid #000;
    flex-grow: 1;
    padding: 10px;
    > img {
      width: 100px;
      height: 100px;
    }
  }
}
.boxE {
  // border: 1px solid #000;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding-top:10px;
  flex-direction: column;
  background-color: #f2f2f2;
  > img {
    width: 200px;
    height: 200px;
  }
  > p {
    width: 200px;
    height: 30px;
    // border: 1px solid #000;
    text-align: center;
    color: #000;
    line-height: 30px;
  }
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: none;
  color: #000;
  margin-bottom: -3px;
}
.su {
  font-size: 30px;
  //  border: 1px solid #000;
  line-height: 40px;
  color: #eee;
}

.boxq1{
  display: flex;
  background-color: #fff;
   flex-direction: column; 
   >p{
     width: 100%;
     height: 30px;
     text-indent: 1em;
     color: #ccc;
    line-height: 30px;
    background-color: #f2f2f2;
   }
  .boxq {
  border: 1px solid #000;
  width: 94.5%;
  height: 250px;
  display: flex;
  margin: 10px;
  justify-content: center;  
  font-size: 15px;
  > .boxq_right {
    width: 90%;
    display: flex;
     flex-direction: column; 
     position: relative;
    > img {
      width: 98%;
      height: 180px;
      margin: 2px;
    }
    >button{
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
  > .boxq_Left{
    width: 90%;
     display: flex;
     flex-direction: column; 
     position: relative;
    > img {
      // border: 1px solid #000;
      width: 98%;
      height: 180px;
      margin: 2px;
    }
    >button{
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