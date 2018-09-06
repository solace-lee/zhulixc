<template>
  <div class="box">
    <div class="father">
      <div class="draw" v-for='item in list' >

        <!-- <div class="draw_left">
          <img :src="item.imgUrl" alt="">
        </div> -->
        <div class="draw_right">
          <p>{{item.awardName}}</p>
          <p>
            <span>领取截取时间:</span>{{item.validTime|formatDate}}</p>
          <button @click='getGift(item.winningId)' v-if='item.state==1'>点击领取</button>
          <button v-if='item.state==2' class="yi">已领取</button>
          <button v-if='item.state==3' class="guo">已过期</button>

        </div>
      </div>

    </div>
    <van-popup v-model="show" :overlay="true" class="site-content">
      <h3>请选择收货地址</h3>
      <div class="user" v-for='item in sitelist' :key="item.addressId" @click='determine'>
        <div class="user-top clearfix">
          <span>{{item.contact}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="usersite">
          {{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.villageName}} {{item.detailaddress}}
        </div>
      </div>

      <div class="btn">
        <button class="sh" @click="shipping2">添加新地址</button>
      </div>

    </van-popup>

  </div>
</template>
<script>
  import { Checkbox, CheckboxGroup } from "vant";
  import { formatDate } from "../../assets/js/data.js";
  import { Dialog } from 'vant';
  export default {
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    data() {
      return {
        show: false,
        checked: false,
        //   奖品列表
        list: [],
        // 领取状态
        state: '',
        id:"",
        userId: this.$route.query.userId,
        //   中奖的id
        winningId: '',
        sitelist: []
      };
    },
    created() {
      this.getlist();
      this.getaddress();
    },
    methods: {
      //   点击新增地址
      shipping2() {
        this.$router.push({ path: "/shipping2" });
      },
      //   点击领取弹出层
      getGift(id) {
        this.show = true;
        this.id=id
     
      
      },
      // 确定地址
      determine(id) {
        Dialog.confirm({
          title: "确定？",
          message: "确定要送到这个地址吗"
        }).then(() => {
            // console.log(this.winningId);
            this.$http.get(this.HOME+'/award/lottery/acceptPrize/' +this.id).then(res => {
              Dialog.alert({
                message: '领取成功'
              }).then(() => {
                this.show = false;
              }).then(()=>{
                this.getlist()
              })

            })
          })
      },
      getlist() {
      
        this.$http.get(this.HOME+"/award/lottery/queryWinning/"+ this.userId).then(res => {
          console.log(res);
          this.list = res.data.data;

        });
      },
      // 获取地址
      getaddress() {
        
        this.$http.get(this.HOME+"/userAddress/queryUserAddressByUserId/" + this.userId)
          .then(res => {
            console.log(res);
            this.sitelist = res.data.data;
          });
      }
    }
  };
</script>
<style scoped lang=less>
  .box {
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/images/choujiang.png");
    background-size: 100% 100%;
    position: fixed;
    overflow-y: auto;
    /* background-position: 100% 100%;
    background-size: 100% 100%;
    position: relative;
    overflow: scroll; */
  }

  .box .draw {
    height: 6rem;
    margin: 1rem 1rem 1rem;
    background-color: #fdc781;
    padding: 1rem 1.5rem;
  }

  .box .draw .draw_left {
    line-height: 6rem;
    float: left;
    padding-right: 1rem;
  }

  .box .father {
    padding: 1rem 1rem 0;
    position: relative;
  }

  .box .father .draw_right {
    color: #fff;
    font-size: 1rem;
    text-align: center;
  }

  .box .father .draw_right p {
    padding-bottom: 1rem;
  }

  .box .father .draw_right p:nth-child(2) {
    font-size: 0.8rem;
  }

  .box .father .draw_right button {
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    color: #fff;
    background-color: #e6535c;
    border-radius: 1rem;
  }

  .box .father .draw_right .yi {
    background-color: #FFB5BA;
  }

  .box .father .draw_right .guo {
    background-color: rgb(146, 141, 141);
  }

  img {
    width: 3rem;
  }

  .clearfix:after {
    content: ".";
    /*加一段内容*/
    display: block;
    /*让生成的元素以块级元素显示，占满剩余空间*/
    height: 0;
    /*避免生成的内容破坏原有布局高度*/
    clear: both;
    /*清除浮动*/
    visibility: hidden;
    /*让生成的内容不可见*/
  }

  /* 地址 */

  .site-content {
    width: 90%;
    height: 50%;
    border-radius: 0.8rem;
    overflow: scroll;

  }

  .site-content h3 {
    text-align: center;
    padding: 1rem;
  }

  .site-content .user {
    padding: 1rem 1rem;

    .user-top {
      span:nth-child(1) {
        float: left;
      }
      span:nth-child(2) {
        float: right;
      }
    }
    .usersite {
      color: #666;
      font-size: 0.8rem;
    }
  }

  .site-content .user:nth-last-child(1) {
    margin-bottom: 100px;
  }

  .btn {
    text-align: center;
  }

  .sh {
    margin: 20px auto;
    font-size: 16px;
    color: #fff;
    border-radius: 50px;
    height: 30px;
    width: 70vw;
    background-color: #CD2A34;
  }
</style>