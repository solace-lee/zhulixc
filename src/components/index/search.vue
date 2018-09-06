<template>
  <div class="box">
    <!-- <h1>搜索</h1> -->
    <div class="box2">
      <input type="text" placeholder="搜索你想购买的商品">
    </div>
    
      <!-- <h2 style="background:#fff;">热门搜索</h2> -->
      <!-- <div class="box3">
        <span>12</span>
        <span>衣服</span>
        <span>衣服</span>
        <span>衣服</span>
        <span>衣服</span>
        <span>衣服</span>
      </div>
      <h3 style="background:#fff;">历史搜索
        <van-icon name="delete" />
      </h3>
      <div class="box4">
        <span>衣服</span>
        <span>衣服</span>
      </div> -->
    </div>
  
</template>

<script>
export default {
  data() {
    return {
      grabble:[]
    };
  },
  created() {
    this.getlistt();
  },
  methods: {
    //  商城首页商品搜索
    getlistt() {
      this.$http
        .post(this.HOME+"/commodity/queryThirdClassifyCommodity", {
          page: 1,
          rows: 10,
          sort: 0,
          title: "手机",
          userId: 6
        })
        .then(res=> {
           console.log(res);
          this.grabble = res.data.data;
          
        });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  text-indent: 1em;
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
  }
  .van-icon {
    left: 220px;
  }
  .box3 {
    width: 100%;
    // border: 1px solid #000;
    display: flex;
    background-color: #fff;
    > span {
      display: inline-block;
      // border: 1px solid #000;
      flex-grow: 2;
      text-align: center;
      background-color: #eee;
      border-radius: 10px;
      margin: 5px;
      text-indent: 0em;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
    }
  }
  .box4 {
    // border: 1px solid #000;
    width: 100%;
    display: flex;
    background-color: #fff;
    > span {
      display: inline-block;
      // border: 1px solid #000;
      // flex-grow: 2;
      text-align: center;
      background-color: #eee;
      border-radius: 10px;
      margin: 5px;
      text-indent: 0em;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      width: 50px;
      height: 22px;
      // border: 1px solid #000;
    }
  }
}
</style>