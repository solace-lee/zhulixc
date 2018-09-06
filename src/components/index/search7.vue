<template>
  <div>

     <v-header></v-header>
    <div style="height:3rem"></div>
    <p>用户评价（{{comment.length}}）</p>
    <div class="box" v-for="(item,index) in comment" :key="index">
      <span><img :src="item.img_url" alt=""></span>
      <span class="span2">{{item.nickname}}</span>
      <span class="span3">{{item.createddate}}</span>
      <span class="span4">{{item.content}}</span>
    </div>
   <v-baseline></v-baseline>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Baseline from "@/common/_baseline.vue";
export default {
  components: {
    "v-baseline": Baseline,
    "v-header": Header
  },
  data() {
    return {
      comment: []
    };
  },
  created() {
    this.getShose();
  },
  methods: {
    //获取评论数据
    // 获取详情页
    getShose() {
      var token = localStorage.getItem("Token");
      this.$http
        .get(
          this.HOME+"/product/GetCommodity?cId=" +
            this.$route.query.cid +
            "&token=" +
            token
        )
        .then(res => {
          this.comment = res.data.Data.comment;
          console.log(this.comment);
        });
    }
  }
};
</script>

<style scoped lang="less">
p{
  background-color: #fff;
  padding: .5rem 0 .5rem 1rem;
 
}
.box {
  width: 100%;
  height: 100px;
  display: flex;
  background-color: #fff;
  padding: 5px 10px;
  position: relative;
  margin-top: 2px;
  > span {
    display: inline-block;
    // border: 1px solid #000;
  }
  > span:nth-of-type(1) {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin-right: 15px;
    border: 1px solid #000;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .span2 {
    position: absolute;
    top: 27px;
    left: 87px;
  }
  .span3 {
    // border: 1px solid #000;
    position: absolute;
    right: 30px;
    top: 27px;
  }
  .span4 {
    position: absolute;
    // right: 30px;
    top: 80px;
    font-size: 15px;
    // padding-top: 5px;
  }
}
</style>