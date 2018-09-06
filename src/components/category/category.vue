<template>
  <div style="height: 100%;">
    <v-header></v-header>
    <div class="head"></div>
    <div class="categories_content">
      <div class="categories_list" ref="menuWrapper">
        <van-badge-group :active-key="activeKey">
           <van-badge :title="item.classify_name" @click="onClick" v-for="(item,index) in categoryList" :key="index" v-if="index<8"></van-badge>
        </van-badge-group>

      </div>

      <div class="categories_box" ref='foodsWarpper'>
        <div class="contentsbigBox">
          <div class="goods-item" v-for="(item2,index) in secondlist" :key="index" >
            <div class="titlebox">
              {{item2.classify_name}}
            </div>
            <div class="contents">
              <div class="list" v-for="(item3,index) in item2.child" :key="index" @click="tochecklist(item3.classify_id)" v-if="index<6">
                <div class="imgbox">
                  <img :src="item3.classify_img_url" alt="">
                </div>
                <div class="name">
                  {{item3.classify_name}}
                </div>
              </div>

            </div>



          </div>

        </div>
      </div>
    </div>
<!--    <v-footer></v-footer>-->

  </div>
</template>

<script>
import Scroll from "better-scroll";
import Footer from "@/common/_footer.vue";
import Header from "@/common/_header.vue";

export default {
  components: {
    "v-footer": Footer,
    "v-header": Header
  },
  data() {
    return {
      activeKey: 0,
      categoryList: [],
      secondlist: [],
      category: [],
      id: ""
    };
  },

  watch: {
    id() {}
  },
  created() {
    this.getcategoryList();
  },
  methods: {
    getcategoryList() {
      this.$http.get(this.HOME+"/product/FirstClassify").then(res => {
        console.log(res);
        
        this.categoryList = res.data.Data;
        this.id = this.categoryList[0].classify_id;
        console.log(this.id);
        console.log(222);
        this.getsecondlist(this.id);
      });
    },
    getsecondlist(id) {
      this.$http.get(this.HOME+"/product/SecondClassify/" + id).then(res => {
        console.log(res);
        this.secondlist = res.data.Data;
      });
    },
    onClick(key) {
      console.log(key)
      this.activeKey = key;
      var id = this.categoryList[key].classify_id;
      console.log(id);
      this.getsecondlist(id);
    },
    tochecklist(id) {
      console.log(id);
      this.$router.push({ path: "/Category2?id=" + id });
    }
  }
};
</script>

<style scoped lang="less">
/* @import "../../assets/css/base.less"; */
.head {
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
  z-index: 10000;
}

.categories_content {
  display: -webkit-flex;
  display: flex;
  height: 100%;
  width: 100%;
  
}
.categories_list{
	position:fixed;
}
.contentsbigBox {
	margin-left: 85px;
}

.goods-item {
	margin-left: 8px;
	margin-top: 6px;
  /* display: flex; */
  padding: 5px 8px;
  background-color: #fff;

}
a:hover, a:focus {
    color: #23527c;
    text-decoration: none;
}
.goods-item .titlebox {
  font-size: 1.4rem;
  color: #666666;
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-weight: 600;
  background-image: url(../../../img/fenleibg.png);
  background-size: 100% 100%;
}

.name {
  width: 95%;
  padding: 0.3rem 0;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.4rem;
}

.contents {
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  
}

.list {
  padding: 10px 0;
  /* height: 5rem; */
  width: 30%;
  // float: left;
  margin: 0 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
}

.imgbox {
  width: 70%;
  margin: 0 0.3rem;
  height: 4rem;
  text-align: center;
  /*background-image: url(../../../img/login_img/login.png);
  background-size: 100% 100%;*/
}

.imgbox > img {
  width: 100%;
  height: 4rem;
}
</style>