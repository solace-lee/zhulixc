<template>
    <div class="tmpl">
        <div class="head">
            <div class="site">
                <div @click="goup">
                    <van-icon name="arrow-left" />
                    <span>返回</span>
                </div>
            </div>
            <div class="search">
                <van-icon name="search" />
                <input type="text" placeholder="搜索你想购买的商品" @click='goCategory'>
            </div>       
        </div>
        <div class="hint">大家都搜索</div>
        <div class="details cleafix">
            <ul>
                <li>衣服衣服衣服衣服衣服衣服</li>
                <li>裤子</li>
                  <li>衣服</li>
                <li>裤子</li>

            </ul>
        </div>
        <div class="hint cleafix">
            <span>最近搜索</span>
            <span>清空</span>
        </div>
        <div class="details">
            <ul>
                <li>衣服</li>  
            </ul>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
        goCategory() {
        this.$router.push({ path: "/Category2" });
      },
      goup(){
          this.$router.go(-1);
      }
  }
};
</script>
<style scoped lang="less">
// 清除浮动
.cleafix:after {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.head {
  width: 100%;
  height: 4rem;
  background-color: #1bc6a3;
  display: flex;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
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
  /*搜索框*/
  .search {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    .van-icon-search {
      position: absolute;
      left: 1rem;
    }
    input {
      width: 80%;
      padding: 0.4rem 0 0.4rem 1.6rem;
      border: none;
      font-size: 0.8rem;
      border-radius: 0.3rem;
    }
  }
}
.hint {
  // width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0.4rem 0.8rem;
  color: #666666;
  span:nth-child(2) {
    display: inline-block;
    width: 3rem;
    height: 1.6rem;
    float: right;
    color: #fff;
    background-color: #00ad8a;
    font-size: .8rem;
    border-radius: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.details {
  padding: 0.3rem 4rem;
  ul {
    width: 100%;
    li {
      float: left;
      margin: 0.5rem;
    }
  }
}
</style>