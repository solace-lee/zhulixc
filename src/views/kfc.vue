<template lang="html">
  <div class="wrap">
    <!-- 会员中心的优惠券 -->
    <van-tabs v-model="active" v-if='!off'>
      <van-tab v-for="index in statuslist" :title="index">
        <div class="contents">
          <div class="kfc" v-for="item in kfc" :key="item.kfc" v-if="active==0">
            <div class="kfc2">
              <div class="mask">未使用</div>
              <div class="kfc3">
                <span style="font-size:20px">优惠券</span>
                <br>
                <span style="font-size:25px;color:#CD2A34">{{item.amount}}</span>
                <span class="qian">￥</span>
              </div>
              <div class="kfc4">
                <span style=" font-size:15px">无门槛卷</span>
                <br>
                <span style=" font-size:10px">有效期至{{item.startDate|date}}</span>
              </div>
            </div>
          </div>
          <div class="kfc" v-for="item2 in kfc2" :key="item2.kfc2" v-if="active==1">
            <div class="kfc2">
              <div class="mask" style="border-color:transparent transparent #ccc;">已过期</div>
              <div class="kfc3">
                <span style="font-size:20px">优惠券</span>
                <br>
                <span style="font-size:25px;color:#CD2A34">{{item2.amount}}</span>
                <span class="qian">￥</span>
              </div>
              <div class="kfc4">
                <span style=" font-size:15px">无门槛卷</span>
                <br>
                <span style=" font-size:10px">有效期至{{item2.startDate|date}}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
        <div class="contents" v-if='off'>
          <p v-if='kfc3.length<=0'>你已经领完所有的优惠券啦~</p>
          <div class="kfc" @click='getlingqv(item.couponId)' v-for="item in kfc3" :key="item.kfc3" v-if="active==0">
            <div class="kfc2">
              <div class="mask">可领取</div>
              <div class="kfc3">
                <span style="font-size:20px">优惠券</span>
                <br>
                <span>{{item.amount}}</span>
                <span class="qian">￥</span>
              </div>
              <div class="kfc4">
                <span style=" font-size:15px">无门槛卷</span>
                <br>
                <span style=" font-size:10px">有效期至{{item.startDate|date}}</span>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
  import Aside from "@/components/category/aside.vue";
  import { Waterfall } from "vant";
  import { Toast } from 'vant';

  // import category from "@/http/mock.js";
  //模拟数据
  // import filter from "../filter/index";
  export default {
    directives: {
      WaterfallLower: Waterfall("lower"),
      WaterfallUpper: Waterfall("upper")
    },
    data() {
      return {
        userId: "",
        active: 0,
        statuslist: ["未使用","已过期"],
        off: true,
        kfc: [],
        kfc2: [],
        kfc3:"",
        filter: "",
      totalCount:10,
      };
    },

    created() {
      this.getId();
     
    },
    methods: {
      // ` 获取用户id
      getId() {
        var that = this;
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?");
        // console.log(num)
        // console.log(str)
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
            // console.log(value)
          }
        }
        if (num > 0) {
          // console.log(value)
          this.off = false;
          this.userId = value;
          this.getKfcet();
          this.getKfcet2();
        } else {
          this.getallkfcet();
        }
      },

      //获取未使用
      getKfcet() {
        this.$http
          .get(this.HOME+"/coupon/queryUserValidCoupon", {
            params: { page: 1, rows: 10, userId: this.userId }
          })
          .then(res => {
            // console.log(res);
            var Gkfc = res.data.data;
            this.kfc = Gkfc.data.map(function (params, i) {
              return params;
            });
            console.log(this.kfc);
            
          });
      },
      // 获取首页的优惠券列表
      getallkfcet() {
         var userStr = sessionStorage.getItem("userInfo");
        var user ={};
        var user = JSON.parse(userStr);
        var userId = user.userId;
        console.log(userId)
        this.$http
          .get(this.HOME+"/coupon/queryFrontCouponList?userId="+userId+"&page=1&rows="+this.totalCount, {})
          .then(res => {
            console.log(res)
            this.totalCount = res.data.data.totalCount;
            var Gkfc = res.data.data;
            this.kfc3 = Gkfc.data.map(function (params, i) {
              return params;
            });
            console.log( this.kfc3)
          });
      },
        // 点击领取
    getlingqv(id) {
      console.log(id);
       //获取存储数据
        var userStr = sessionStorage.getItem("userInfo");
        var user ={};
        var user = JSON.parse(userStr);
        var userId = user.userId;
        console.log(userId);
      this.$http.get(this.HOME+"/coupon/getCoupon?userId="+userId+'&couponId='+id).then(res => {
        if(res.data.success==true){     
        Toast.success('领取成功');
        this.getallkfcet()
        } 
      }).catch(err=>{
        Toast(err.response.data.errorMessage);      
      })
    },

      // 已过期
      getKfcet2() {
        this.$http
          .get(this.HOME+"/coupon/queryUserInvalidCoupon", {
            params: { page: 1, rows: 1, userId: this.userId }
          })
          .then(res => {
            console.log(res);
            var Gkfc2 = res.data.data;
            this.kfc2 = Gkfc2.data.map(function (params2, i) {
              return params2;
            });
          });
          console.log( this.kfc2 );
          
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/fz.less";
  @import "../assets/index/style.css";
  @import "../assets/user/icon/carstyle.css";
  .wrap {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap; // border: 1px solid #000;
    background: #eee;
    .mask {
      width: 36.5px;
      height: 0;
      border-width: 0 34px 30px 26px;
      border-style: none solid solid;
      border-color: transparent transparent #7fc84d;
      transform: rotate(48deg);
      position: absolute;
      right: -33px;
      font-size: 10px;
      text-align: center;
      line-height: 30px;
      color: #fff; // border: 1px solid #000;
    }
    .kfc {
      width: 90%;
      height: 100px;
      border: 1px solid #eee;
      margin: 0 auto;
      margin-top: 10px;
      position: relative;
      background-color: #fff;
      .kfc2 {
        position: absolute;
        top: 10px;
        width: 95%;
        height: 80px;
        border: 1px solid #eee; // margin: 0 auto;
        left: 8px;
        .kfc3 {
          width: 48%;
          height: 80%; // border: 1px solid #000;
          position: absolute;
          left: 15px;
          top: 10px;
          .qian {
            // border: 1px solid #000;
            color: #cd2a34;
            font-size: 13px;
            position: absolute;
            top: 25px;
            left: 30px;
          }
          .qian2 {
            color: #cd2a34;
            font-size: 13px;
            position: absolute;
            top: 25px;
            left: 45px;
          }
        }
        .kfc4 {
          width: 30%;
          height: 80%; // border: 1px solid #000;
          position: absolute;
          right: 5px;
          top: 20px;
        }
      }
    }
  }
 .contents p{
   width: 100%;
    text-align: center;
    padding-top: 2rem;
 }
</style>