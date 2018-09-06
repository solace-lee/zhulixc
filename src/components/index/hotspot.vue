<template>
  <div class="tmpl">
    <v-header></v-header>
    <div class="head"></div>
    <van-tabs v-model="active" @click="getclassifycontent">
      <!-- <van-tab title="综合"></van-tab> -->
      <van-tab v-for="(i,index) in classifylist" :key="index" :title="i.name" >
      </van-tab>
    </van-tabs>
   
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="box">
        <div class="boxcontent" @click="goparticulars(item.flash_id,item.title)" v-for="item in articlelist" :key="item.flash_id">

          <div class="box-left">
            <img :src="item.title_img" alt="">
          </div>
          <div class="box-right">
            <h3>{{item.title}}</h3>
            <!-- <p v-text='item.content'></p> -->
            <div class="flooter">
            <span>{{item.created_date|formatDate}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    
  </div>
</template>

<script>
import { formatDate } from "../../assets/js/data.js";
import { Toast } from "vant";
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    return {
      active: 0,
      // 文章列表
      articlelist: [],
      // 文章分类的列表
      classifylist: [],
      // 对应分类的文章
      classifyarticle: [],
      // 文章分类id
      classifyId: "",
      // 时间

      time: "",
      page: 1,
      rows: 10,
      finished: false,
      loading: true,
      loading2: true,
      finished2: false,
      classify:"",
    };
  },
  created() {
    this.loadMore();
    this.getclassify();
  },
  methods: {
    // 获取不同的分类内容
    getclassifycontent(index, title) {
     console.log(index, title);
      this.articlelist = [];
      this.classifyarticle = [];
      this.classifylist.forEach(val => {
        if (val.name == title) {
          this.classifyId = val.classify_id;         
        }
      });
      this.loadMore();
    },
    getclassifylist() {
      this.$http.get(this.HOME+"/flash/GetClassify").then(res => {
        console.log(res);
        console.log(33333);
        
        // res.data.data.data.forEach(val => {
        //   this.articlelist.push(val);
        // });
        console.log(this.articlelist);
      });
    },
    // 获取所有文章
    loadMore() {
      console.log({ page: this.page, rows: this.rows });
      this.$http
        .get(this.HOME+"/flash/GetFlashs?page=" + this.page + "&classify="+this.classifyId)
        .then(res => {
          console.log(res);
          console.log(111);
           this.articlelist=[];
          res.data.Data.List;
          var arr = [];
          res.data.Data.List.forEach(el => { 
            var str = '';
             str = el.created_date;
             console.log(str);
            //  将日期转成数字的时间戳
              var num=parseInt(str.replace(/[^0-9]/ig,""));
             console.log(num);
            el.created_date = num;
            arr.push(el);
            console.log(arr); 
          });

          if (arr.length >= this.rows) {
            this.page++;
            console.log("继续");
          } else {
            // this.nomore = true;
            this.finished = true;
            console.log("已加载全部");
          }
          arr.forEach(val => {
            this.articlelist.push(val);
          });
          this.loading = false;
          console.log(this.articlelist);
        });
    },
    onLoad() {
      console.log(!this.loading);
      if (!this.loading) {
        console.log("111111111111111");
        return;
      }
      this.loading = true;
      console.log(this.page);
      this.loadMore();
    },
    // 获取文章的分类
    getclassify() {
      this.$http.get(this.HOME+"/flash/GetClassify").then(res => {
        console.log(res);
        this.classifylist = res.data.Data;
      });
    },
    // 跳转到文章详情页
    goparticulars(id, title) {
      this.$router.push({
        path:
          this.HOME+"/hotspotparticulars?flash=" +
          id +
          "&name=乡村快讯详情" +
          "&title=" +
          title
      });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 4rem;
}
.box {
  width: 100%;
  height: 100%;
  .msg {
    text-align: center;
    padding-top: 2rem;
  }
  .boxcontent {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.8rem;
    background-color: #fff;
    .box-left {
      width: 6rem;
      padding-right: 0.5rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .box-right {
      padding: 0 0.6rem;
      flex: 1;
      h3 {
        width: 100%;
        height: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-weight: 600;
      }
      p {
        padding-top: 0.5rem;
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-indent: 2em;
      }
      div {
        display: flex;
        justify-content: flex-end;
        padding-top: 2.3rem;
        font-size: 0.4rem;
        color: #949494;
      }
    }
  }
}
</style>