<template lang="html">
  <div class="wrap">
    <!-- 上拉刷新 -->
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="collect" v-for="item in usercollect" :key="item.commodityId" >
        <div class="imgBox"  @click='goparticulars(item.commodityId)'>
          <img :src="item.picUrl" alt="">
        </div>
        <div class="gz2" @click='goparticulars(item.commodityId)'>
          <span class="goodsname">{{item.name}}</span>
          <div class="price">
            <span>￥</span>
            <span class="num">{{item.price}}</span>
          </div>
         
        </div>
        <button @click='notcollect(item.commodityId)'>取消收藏</button>
      </div>
      <div v-if="flag" style="height: 5rem;line-height: 5rem;text-align: center">
          暂无更多收藏
      </div>
      <!-- <van-cell v-for="item in list" :key="item" :title="item + ''" /> -->

    </van-list>

  </div>

</template>

<script>

  import Aside from "@/components/category/aside.vue";
  import { Toast } from "vant";
  export default {
    data() {
      return {
        usercollect: [],
        flag:false,
        userId:'',
        // 商品id
        commodityId:'',
        // 上拉刷新
        list: [],
        loading: false,
        finished: false,
        page: 1,
        rows: 2,
        // 用户id
        userId:'',
      };
    },
    components: {
      "v-aside": Aside
    },
    created() {
      this.getusercollect();
      this.getuserId();
    },
    methods: {
      getuserId(){
        this.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId; 
      },
   
      //获取收藏列表
      getusercollect() {
        this.$http
          .get(this.HOME+"/usercollect/queryUsercollectByUserId", {
            params: { page: this.page, rows: this.rows, userId: this.$route.query.id}
          })
          .then(res => {
            console.log(res)       
            this.usercollect = res.data.data.data;
            this.usercollect.forEach(val => {
            console.log(this.usercollect);
            this.commodityId = val.commodityId;
            console.log( this.commodityId);
            });
            if(this.usercollect<=0){
              setTimeout(() => {
                this.flag=true
              }, 2000);
            }
          });
      },
      //上拉刷新
      onLoad() {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
        // 取消收藏商品
      notcollect(commodityId) {
        this.$http.get(this.HOME+'/usercollect/deleteUsercollect/' + this.userId + '/' +commodityId).then(res => {
          console.log(res);
          if (res.data.success == true) {
            Toast.success("取消收藏");
            this.getusercollect();
          }

        })
      },
      // 点击跳转
     goparticulars(commodityId) {
        console.log(commodityId);
        this.$router.push({ path: "/detail?id="+commodityId });
      }
    }
  };
</script>

<style scoped lang=less>
  .wrap {
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
  }

  .collect {
    padding: 10px;
    height: 100px;
    background-color: #fff;
    margin-bottom: 5px;
    display: flex;
    position: relative;
    button{
     height: 3rem;
     padding: 0 .5rem;
     background-color: #cd2a34;
     color: #fff;
     position: absolute;
     top: 50%;
    right: 1rem;
    margin-top: -1.5rem;
    }
    .imgBox {
      width: 25vw;
      height: 25vw;
      img {
        width: 100%;

      }
    }
    .gz2 {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 96%;

      padding-left: 10px;
      font-size: 15px;
      .goodsname {
        font-size: 18px;
        overflow: hidden;
        padding-right: 6rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        color: #333;
      }
      .price {
        color: #cd2a34;
        font-size: 12px;
        .num {
          font-size: 20px;
        }
      }
      span:nth-of-type(2) {

        font-size: 11px;


      }
      span:nth-of-type(3) {

        font-size: 18px;


      }
    }
  }
</style>