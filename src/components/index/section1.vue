<template lang="html">
  <section class="section1">
       <!-- 热点 -->
            <div class="hotFathe">
                <div class="hot">
                    <div class="hotLeft" @click='gohots'>
                        <div>
                            <span>
                                乡村快讯
                            </span>
                        </div>
                    </div>
                    <div class="hotRight">
                        <img src="../../../img/indexImage/mall_bg_kuaixun.png" alt="">
                    </div>
                </div>
                <div class="hotContent">
                    <van-swipe :autoplay="5000" vertical :show-indicators='false'>
                        <van-swipe-item v-for='item in articletitle' :key="item.flash_id">
                            <ul>
                                <li @click='goparticulars(item.flash_id)'>{{item.flash_title}}</li>
                            </ul>
                        </van-swipe-item> 

                    </van-swipe>
   
                </div>
            </div>
  </section>
</template>

<script>
import { Toast } from "vant";
import { Lazyload } from "mint-ui";
export default {
  data() {
    return {
      coupon: [],
      rows: 10,
      page: 1,
      articletitle: [],
      // 首页文章
      flash:'',
    };
  },
  props: ["section1"],

  created() {
    // this.getcoupon();
    this.getflash();
  },
  mounted() {},
  methods: {
    // 获取文章标题
    getflash() {
      this.$http.get(this.HOME+"/home/getdata", {}).then(res => {
        console.log(res);
        res.data.Data.flash.forEach(val => {
          this.articletitle.push(val);
        });
        console.log(this.articletitle);
      });
    },
    // 去热点列表
    gohots() {
      this.$router.push({ path: "/hotspot?name=乡村快讯" });
    },
    // 去热点详情页
    goparticulars(flash_id) {
      console.log(flash_id);
      console.log("6666666666666");
      this.$router.push({
        path: "/hotspotparticulars?flash=" +flash_id+ "&name=乡村快讯详情"
      });
    },
    // 三张优惠券
    getcoupon() {
      this.$http.get(this.HOME+"/coupon/mainPageCoupon", {}).then(res => {
        console.log(res);
        console.log("ppppppppppppp");

        var a = res.data;
        this.coupon = a.data.map(function(photo, i) {
          return photo;
        });
      });
    },
    // 点击领取
    getlingqv(id) {
      console.log(id);
      console.log(666666666666666666666);
      //获取存储数据
      var userStr = sessionStorage.getItem("userInfo");
      var user = {};
      var user = JSON.parse(userStr);
      var userId = user.userId;
      console.log(userId);
      this.$http
        .get(this.HOME+"/coupon/getCoupon?userId=" + userId + "&couponId=" + id)
        .then(res => {
          console.log(res);

          if (res.data.success == true) {
            Toast("领取成功");
          } else if (res.data.success == false) {
            Toast(res.data.errorMessage);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section1 {
  margin-top: 1rem;
}
/*热点*/
.hot {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  .hotLeft {
    width: 4rem;
    height: 100%;
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      font-size: 0.9rem;
      span {
        padding: 0.3rem 0;
        display: inline-block;
        border: 1px solid #00ad8a;
        color: #00ad8a;
        border-radius: 0.3rem;
      }
    }
  }
  .hotRight {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.hotFathe {
  position: relative;
  .hotContent {
    width: 60%;
    height: 3rem;
    position: absolute;
    top: 0;
    left: 5rem;
    .van-swipe {
      width: 100%;
      height: 100%;
      .van-swipe__track {
        width: 100%;
        height: 100%;
        .van-swipe-item {
          // width: 100%;
          height: 100%;
          ul {
            width: 100%;
            height: 100%;
            li {
              width: 100%;
              height: 100%;
              line-height: 3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #666666;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
}
</style>