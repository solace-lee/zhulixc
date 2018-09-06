<template>
  <div class="box">

    <!-- <h1>商品列表</h1>
    <div class="box2">
      <input type="text" placeholder="搜索你想购买的商品">
    </div>
    <div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">综合</mt-tab-item>
        <mt-tab-item id="2">价格</mt-tab-item>
        <mt-tab-item id="3">最新</mt-tab-item>
        <mt-tab-item id="4" class="el-icon-arrow-down">
          <span class="shuaixuan">帅选</span>
        </mt-tab-item> -->

      <!-- </mt-navbar> -->
      <!-- tab-container -->

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!-- <mt-cell v-for="n in 10" :title="'content ' + n" /> -->

        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!-- <mt-cell v-for="n in 4" :title="'content ' + n" /> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!-- <mt-cell v-for="n in 4" :title="'content ' + n" /> -->
        </mt-tab-container-item>
        <!-- 筛选 -->
        <van-popup v-model="show" position="top" :overlay="false">
        
        </van-popup>  
        <mt-tab-container-item id="4">
          <!-- <mt-cell v-for="n in 6" :title="'content ' + n" /> -->
          <div class="box">
            <h2 style="background:#fff;">价格区间</h2>
            <div class="box3">
              <span>最低价</span>
              <i>
              </i>
              <span>最高价</span>
            </div>
            <h3 style="background:#fff;">品牌
               <span class="el-icon-arrow-down iconJ"></span>
            </h3>
           
            <div class="box4">
              <span>最低价</span>
              <span>最低价</span>
              <span>最低价</span>
              <span>最低价</span>
            </div>
            <div class="box4">
              <span>衣服</span>
              <span>衣服</span>
              <span>衣服</span>
              <span>衣服</span>
            </div>
            <h2 style="background:#fff;">发货地址</h2>

            <div class="box5">
              <span class="el-icon-location-outline"></span>
              <div class="sel">
                <select name="" id="1">
                  <option value="广东">广东</option>
                  <option value="广东">广东</option>
                </select>
                <select name="" id="2">
                  <option value="广州">广州</option>
                  <option value="广州">广州</option>
                </select>
              </div>
            </div>
            <div class="box6">
              <button>重置</button>
              <button>确认</button>
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
      selected: "4"
    };
  }
};
</script>

<style scoped lang="less">
.box {
  background-color: #fff;
  width: 100%;
  height: 100%;
  text-indent: 1em;
  margin-top: 5px;
  h1 {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 50px;
    background-color: #000;
    color: #fff;
  }
  > .box2 {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    > input {
      width: 90%;
      height: 80%;
      border-radius: 5px;
      border: 1px solid #ccc;
      text-indent: 1em;
    }
  }
  h2 {
    width: 100%;
    height: 25px;
    padding-top: 5px;
  }
  h3 {
    // border: 1px solid #000;
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: relative;
    display: flex;
     .iconJ{
    // border: 1px solid #000;
    position: absolute;
    top: 8px;
    left: -1.5px;
  }
  }
 
  //帅选
  .shuaixuan {
    // border: 1px solid #000;
    padding-right: 15px;
  }
  // 字体图标开始
  .el-icon-arrow-down:before {
    content: "\E603";
    position: relative;
    left: 330px;
  }
  .el-icon-arrow-down:before {
    position: absolute;
  }
  .van-icon {
    left: 220px;
  }
  // 字体图标结束
  .box3 {
    width: 100%;
    // border: 1px solid #000;
    display: flex;
    background-color: #fff;
    padding-left: 20px;
    > span {
      display: inline-block;
      // border: 1px solid #000;
      // flex-grow:1;
      text-align: center;
      background-color: #eee;
      border-radius: 10px;
      margin: 5px;
      text-indent: 0em;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      width: 80px;
    }
    > i {
      // border: 1px solid #000;
      border-bottom: 2px solid #ccc;
      width: 40px;
      position: relative;
      top: -16px;
    }
  }
  .box4 {
    // border: 1px solid #000;
    width: 100%;
    display: flex;
    background-color: #fff;
    // padding-left: 10px;
    align-items: center;
    justify-content: center;
    > span {
      display: inline-block;
      // border: 1px solid #000;
      // flex-grow: 1;
      text-align: center;
      background-color: #eee;
      border-radius: 10px;
      margin: 5px;
      text-indent: 0em;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      width: 60px;
      height: 22px;
      // border: 1px solid #000;
    }
  }
  .box5 {
    display: flex;
    width: 100%;
    height: 80px;
    //  border: 1px solid #000;
    position: relative;
    background-color: #fff;
    .sel {
      //  border: 1px solid #000;
      //  justify-content: space-between;
      display: inline-block;
      width: 50%;
      height: 100%;
      position: absolute;
      font-size: 10px;
    }
    > span {
      //  border: 1px solid #000;
      position: absolute;
      right: 15px;
    }
  }
  .box6 {
    // border: 1px solid #000;
    width: 100%;
    height: 50px;
    display: flex;
    //  align-content: center;
    background-color: #fff;
    padding-top: 10px;
    > button {
      width: 40%;
      height: 80%;
      flex-grow: 2;
      color: #fff;
    }
    button:nth-of-type(1) {
      // border: 1px solid #000;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      background-color: #ff6565;
      margin-left: 10px;
    }
    button:nth-of-type(2) {
      // border: 1px solid #000;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      background-color: #cd2a34;
      margin-right: 10px;
    }
  }
}

.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #cd2a34;
  color: #cd2a34;
  margin-bottom: -3px;
}
</style>