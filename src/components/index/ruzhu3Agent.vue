<template>
  <!-- 商家入驻信息 -->
  <div>
    <v-header></v-header>
    <div class="head" style="width: 100%;height: 4rem;"></div>

    <div class="sMessage">

      <div class="status">
        <span class="status1" v-if="form.Status">{{form.Status}}</span>
      </div>
   
      <div class="sMessage2">
        <div>代理级别：</div>
        <span>{{form.LEVEL}}</span>
        <!-- <span v-if="form.agency_level==1">省级代理</span>
        <span v-if="form.agency_level==2">区级代理</span> -->
      </div>
      <div class="sMessage2">
        <div>店铺联系人：</div>
        <span>{{form.contect_name}}</span>
      </div>
      <div class="sMessage2">
        <div>
          联系电话：
        </div>
        <span>{{form.contact_phone}}</span>
      </div>
       <div class="sMessage2">
        <div>
          QQ：
        </div>
        <span>{{form.contact_qq}}</span>
      </div>
       <div class="sMessage2">
        <div>
          邮箱地址：
        </div>
        <span>{{form.contact_email}}</span>
      </div>
      <div class="sMessage2">
        <div>代理性质：</div>
        <span>{{form.Nature}}</span>
      </div>
      <div class="sMessage2" v-if="form.Nature=='企业'">
        <div>公司名称：</div>
        <span>{{form.agency_company}}</span>
      </div>
      <div class="sMessage2 heightbox"  v-if='form.Nature=="企业"'>
        <div>营业执照:</div>
        <div class="touxiang">
          <img :src="form.bussiness_license_url"  alt="" style="width: 100%;height: 100%">
        </div>
      </div>
      <div class=" sMessage2">
        <div>店铺地址:</div>
        <span>{{form.Province}}{{form.City}}{{form.District}}{{form.Village}}</span>

      </div>
      <div class=" sMessage2">
        <div></div>
        <span>{{form.address_detail}}</span>
      </div>


    </div>
  </div>

</template>

<script>
  import { Toast } from "vant";
  import Header from "@/common/_header.vue";
  export default {
    components: {
      "v-header": Header
    },
    data() {
      return {
        form: {}
      };
    },
    created() {
      // this.getUserInfo()
      // this.getShopData();
      this.getdata();
    },
    methods: {
      // getUserInfo() {
      //   var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      //   console.log(userInfo)
      //   this.form.userId = userInfo.userId
      // },
      getdata() {
        var token = sessionStorage.getItem('Token');
        console.log(token);
        this.addflag = false;
        this.$http.get(this.HOME+"/agency/GetAgencyInfo?Token="+token).then(res => {
          console.log(res);
          console.log(22222222222);
          this.form = res.data.Data.Info;
          console.log(this.form);
          
          this.id = res.data.Data.Info.shop_id;
        });
        // this.$http.get("/shop/queryShopByShopId/" + this.id).then(res => {
        //   console.log(res);
        //   var data = res.data.data;
        //   this.firstName = data.firstClassifyName;
        //   this.secondName = data.secondClassifyName;
        //   this.thirdName = data.thirdClassifyName;
        //   this.province = data.provinceName;
        //   this.city = data.cityName;
        //   this.district = data.districtName;
        //   this.village = data.villageName;
        // });

      },
      // getShopData() {
      //   var id = this.$route.query.id;
      //   console.log(id);
      //   this.$http.get("/shop/queryShopByShopId/" + id).then(res => {
      //     console.log(res);
      //     this.form = res.data.data;
      //   });
      // },
      ruzhu2(id) {
        console.log(id);
        this.$router.push({ path: "/ruzhu2?id=" + id });
      },
      onRead(file) {
        console.log(file);
        this.form.shopImgUrl = file.content;
      }
    }
  };
</script>

<style scoped lang="less">
  .van-uploader__input {
    margin-left: 0;
  }

  .sMessage .pickerBox {
    width: 100%;
    height: 15rem;
    position: fixed !important;
    left: 0;
    z-index: 9999999;
    bottom: 0;
    transition: 1s;
  }

  .cltext {
    width: 10rem;
    height: 95%;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
     span{
    padding-left: .8rem;
  }

    img {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      background-color: #eee;
    }
  }

  .clatext-right {
    padding: 0.2rem;
    font-size: 0.75rem;
    color: #999;
    white-space: nowrap;
  }


  .iP {
    margin-left: 0;
    font-size: 0.7rem;
    color: #666;
  }

  .sMessage {
    width: 100%;
    height: 100vh;
    font-size: 0.8rem;
    color: #666;
    .status {
      height: 3.5rem;
      background-color: #FFF;
      line-height: 3.5rem;
      font-size: 1rem;
      .status1 {
        color: #f38f00;
      }
      .status2 {
        color: #126ae4;
      }
      .status3 {
        color: #cd0400;
      }
    }
    >div {
      height: 30px;
      background-color: #fff;
      margin-bottom: 5px;
      line-height: 30px;
      padding: 0 0.8rem;
    }
    .heightbox {
      height: 6rem !important;
    }
    .heightbox2 {
      height: 7rem !important;
    }
    .sMessage2 {
      /* width: 100%; */
      height: 2.5rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      >div:nth-of-type(1) {
        width: 30%;
      }
      .touxiang {
        border: 1px solid #ddd;
        border-radius: 6px;
        width: 5rem;
        height: 5rem;

        font-size: 12px;
        display: flex;

        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          // padding: 10%;
        }
      }
    }
    .sMessage3 {
      height: 100%;
      flex: 1;

      >div {
        padding: 0.1rem;
        /* height: 30%; */
        display: flex;
      }
    }
    .checkfather {
      .van-radio {
        margin-right: 10px;
      }
    }
    .sMessage4 {
      height: 12rem;
      overflow: hidden;
      background-color: #fff;
    }
    .sMessage5 {
      flex: 1;
      >div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 1.2rem;
          height: 0.7rem;
          display: block;
          /* position: absolute;
         right: 0;
         top: 0; */
        }
      }
    }
    .dp {
      padding-top: 10px;
    }
    .form-btn {
      padding-top: 2rem;
      display: flex;
      justify-content: center;
      background-color: #f2f2f2;
    }
    .numebtn {
      background-color: #cd2a34;
      width: 90%;
      height: 3rem;
      color: #fff;
      font-size: 1.1rem;
      border-radius: 3rem;
    }
  }
</style>