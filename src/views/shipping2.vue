<template>
  <!-- 商家入驻信息 -->
  <div>
    <v-header></v-header>
    <div class="head" style="width: 100%;height: 4rem;"></div>
    <div class="sMessage">
      <div class="sMessage2">
        <div>姓名：</div>
        <input type="text" class="iP" v-model="form.contact">
      </div>
      <div class="sMessage2">
        <div>
          电话：
        </div>
        <input type="text" class="iP" v-model="form.phone">
      </div>
      <div class=" sMessage2 sMessage4">
        <div>地址：</div>
        <div class="sMessage5">

            <div @click="checkproince" class="box">
              <span> {{province}}</span>
              <!-- <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt=""> -->
              <img src="../assets/images/personal_bg_graytriangle@2x.png" alt="">

            </div>
            <div @click="checkcity" class="box">
              <span> {{city}}</span>
              <img src="../assets/images/personal_bg_graytriangle@2x.png" alt="">

            </div>
            <div @click="checkdistrict" class="box">
              <span> {{district}}</span>
              <img src="../assets/images/personal_bg_graytriangle@2x.png" alt="">

            </div>
          
          <div class="box" @click="checkvillage">
              <span> {{village}}</span>
              <img src="../assets/images/personal_bg_graytriangle@2x.png" alt="">

          </div>
          <!--<div class="describe">
            <input type="text" v-model="form.detailaddress" placeholder="填写详细地址" id="" class="iP">
          </div>-->

        </div>
      </div>
      <div class="sMessage2">
        <div>
          详细地址：
        </div>
       <input type="text" v-model="form.detailaddress" placeholder="填写详细地址" id="" class="iP">
      </div>
      <!-- <div class="switchBox">
        设为默认地址
        <van-switch v-model="form.isdefault" />
      </div> -->
      <div class="form-btn" @click="xiugai">

        <button class="numebtn">更新</button>
      </div>
      <div class="pickerBox" v-if="flagbox">
        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />

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
        addflag: true,
        columns: [],
        flagbox: false,
        token:'',
        addressid:"",
        form:{},
        firstName: "",
        secondName: "",
        thirdName: "",
        province: "",
        city: "",
        district: "",
        village: "",
        firstlist: [],
        secondlist: [],
        thirdlist: [],
        provincelist: [],
        citylist: [],
        districtlist: [],
        villagelist: [],
        flagIndex: 1
      };
    },
    created() {
      this.getToken();
      setTimeout(() => {
      }, 1000);
    },
    watch:{
        // province(New,old){
        //   console.log(New,old);
          
        //   this.city='';
        //   this.district='';
        //   this.village='';
        // }
    },
    methods: {
      getToken() {
        this.token = localStorage.getItem("Token");
       this.form =JSON.parse(sessionStorage.getItem("site"));
       console.log(this.form);
       
       this.province = this.form.province;
       this.city = this.form.city_name;
       this.district = this.form.district_name;
       this.village = this.form.village_name;
      },

      onConfirm(value, index) {
        console.log(value,index);

        // 选取省
        if (this.flagIndex == 4) {
          this.provincelist.forEach(val => {
            if (value == val.province) {
              this.form.province = val.province_id;
             
              this.province = value;
            }
          });
        }
        if (this.flagIndex == 5) {
          this.citylist.forEach(val => {
            if (value == val.city_name) {
              this.form.city = val.city_id;
              this.city = value;
            }
          });
        }
        if (this.flagIndex == 6) {
          this.districtlist.forEach(val => {
            if (value == val.district_name) {
              this.form.district = val.district_id;
              this.district = value;
            }
          });
        }
        if (this.flagIndex == 7) {
          this.villagelist.forEach(val => {
            if (value == val.village_name) {
              this.form.village = val.village_id;
              this.village = value;
            }
          });
        }
        this.flagbox = false;
      },
      onCancel() {
        this.flagbox = false;
        // alert(11111111)
        Toast("取消");
      },
   

      add() {
        this.form.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;

        console.log(this.form);
        this.$http
          .post(this.HOME+"/userAddress/insertUserAddress", this.form)
          .then(res => {
            console.log(res);
            if (res.data.success) {
              Toast.success("添加成功");

              this.$router.go(-1);
            }
          })
          .catch(err => {
            console.log(err.response);
          });
      },
      xiugai() {
        var obj={};
        obj.token=this.token;
        obj.addressid = this.form.address_id;
        obj.province = this.form.province;
        obj.city = this.form.city;
        obj.district = this.form.district;
        obj.village = this.form.village;
        obj.details = this.form.detailaddress;
        obj.isdefual = this.form.isdefault;
        obj.contact = this.form.contact;
        obj.phone = this.form.phone;
        console.log(obj);
        

        this.$http
          .post(this.HOME+"/user/UpdateAddress", obj)
          .then(res => {
            console.log(res);
           
              Toast.success(res.data.Message);

             setTimeout(() => {
                this.$router.go(-1);
             }, 1000);
            
          })
          .catch(err => {
            console.log(err.response);
          });
      },
      // 获取省列表
      checkproince() {
         this.$http.get(this.HOME+"/sys/GetProvince").then(res => {
          this.provincelist = res.data.Data;
          this.columns = [];
          this.provincelist.forEach(val => {
            // console.log(val);
            this.columns.push(val.province);
    
          });
        });
        this.flagIndex = 4;
        this.flagbox = true;
      },
      //  获取城市
      checkcity() {
       
        console.log(this.form.province); 
        this.$http.get(this.HOME+"/sys/GetCity/" + this.form.province).then(res => {
            console.log(res);
            this.citylist = res.data.Data;
            console.log(this.citylist);
            this.columns = [];
            this.citylist.forEach(val => {
              this.columns.push(val.city_name);
     
            });
          });
        this.flagIndex = 5;
        this.flagbox = true;
      },
      //  获取区
      checkdistrict() {
        
        this.$http.get(this.HOME+"/sys/GetDistrict/" + this.form.city).then(res => {
            console.log(res);
            this.districtlist = res.data.Data;
            console.log(this.districtlist);
            this.columns = [];
            this.districtlist.forEach(val => {
              this.columns.push(val.district_name);
            
            });
          });
        this.flagIndex = 6;
        this.flagbox = true;
      },
      //  获取街道
      checkvillage() {
        this.$http.get(this.HOME+"/sys/GetVallage/" + this.form.district).then(res => {
            console.log(res);
            this.villagelist = res.data.Data;
            console.log(this.villagelist);
            this.columns = [];
            this.villagelist.forEach(val => {
              this.columns.push(val.village_name);
            });
          });
        this.flagIndex = 7;
        this.flagbox = true;
      }
    }
  };
</script>

<style scoped lang="less">
  .van-uploader__input {
    margin-left: 0;
  }
  .box{
    display: flex;
    border: 1px solid #ccc;
    align-items: center;
    height: 1.2rem;
      padding: 0.2rem 0 .2rem .4rem;
    margin: .2rem;
     position: relative;
    span{
      display: flex;
      align-items: center;
    }
  }
  .describe{
    padding: .2rem 0 .2rem .6rem;
    input{
      font-size: .6rem;
    }
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
  }

  .iP {
    margin-left: 0;
    font-size: 0.9rem;
    color: #666;
  }

  .sMessage {
  	margin-top: 6px;
    width: 100%;
    height: 100vh;
    font-size: 0.8rem;
    color: #666;
    >div {
      height: 30px;
      background-color: #fff;
      margin-bottom: 5px;
      // line-height: 30px;
      padding: 0 0.8rem;
    }
    .heightbox {
      height: 6rem;
    }
    .heightbox2 {
      height: 7rem;
    }
    .switchBox {
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: .8rem;
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
        .van-uploader {
          width: 100%;

          height: 100%;
          display: flex;

          justify-content: center;
          align-items: center;
          img {
            width: 60%;
            padding: 10%;
          }
        }
      }
    }
    .sMessage3 {
      height: 100%;
      flex: 1;

      >div {
        padding: 0.1rem;
        height: 30%;
        display: flex;
      }
    }
    .sMessage4 {
      height: 7rem;
      overflow: hidden;
      background-color: #fff;
    }
    .sMessage5 {
      flex: 1;
      padding-right: 5rem;
     
      >div {
        display: flex;
        align-items: center;

        img {
          position: absolute;
          top: 0;
          right: 0;
          width: 1.2rem;
          height: 100%;
          padding-left: .5rem;
          display: block;
        
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
      background-color: #0bb794;
      width: 90%;
      height: 3rem;
      color: #fff;
      font-size: 1.1rem;
      border-radius: 3rem;
    }
  }
</style>