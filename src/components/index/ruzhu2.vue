<template>
  <!-- 商家入驻信息 -->
  <div>
    <v-header></v-header>
    <div class="head" style="width: 100%;height: 3.5rem;"></div>

    <div class="sMessage">

      <div class="sMessage2 heightbox">
        <div>店铺头像</div>
        <div class="touxiang">
          <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="form.ShopImg" :src="form.ShopImg" class="avatar">
            <img class="moren" src="../../assets/images/111.png" v-else>
          </el-upload>

        </div>
      </div>
      <div class="sMessage2">
        <div>店铺名称：</div>
        <input type="text" class="iP" v-model="form.ShopName">
      </div>
      <div class="sMessage2 heightbox2">
        <div>店铺分类:</div>
        <div class="sMessage3">
          <div>
            <div class="cltext" @click="checkFirst">
              <span> {{firstName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">一级分类</div>
          </div>
          <div>
            <div class="cltext" @click="checksecond">
              <span>{{secondName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">二级分类</div>
          </div>
          <div>
            <div class="cltext" @click="checkThird">
              <span>{{thirdName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">三级分类</div>
          </div>

        </div>
      </div>
      <div class="sMessage2">
        <div>店铺联系人：</div>
        <input type="text" class="iP" v-model="form.Contact">
      </div>
      <div class="sMessage2">
        <div>
          联系电话：
        </div>
        <input type="text" class="iP" v-model="form.Phone">
      </div>
      <div class="sMessage2">
        <div>店铺性质:</div>
        <div class="sMessage3 checkfather">
          <van-radio-group v-model="form.Nature">
            <van-radio :name="1">个人</van-radio>
            <van-radio :name="2">企业</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="sMessage2" v-if="form.Nature==2">
        <div>公司名称:</div>
        <div class="sMessage3 checkfather">
          <input type="text" class="iP" v-model="form.Company">
        </div>
      </div>

      <div class="sMessage2 heightbox" v-if="form.Nature==2">
        <div>营业执照:</div>
        <div class="touxiang">
          <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
            <img v-if="form.BussImg" :src="form.BussImg" class="avatar">
            <img class="moren" src="../../assets/images/111.png" v-else>
          </el-upload>

        </div>
      </div>

      <div class="sMessage2 heightbox2">
        <div>店铺地址:</div>
        <div class="sMessage3">
          <div>
            <div class="cltext" @click="getProvince">
              <span>{{ProvinceName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">省</div>
          </div>
          <div>
            <div class="cltext" @click="getCity">
              <span>{{CityName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">市</div>
          </div>
          <div>
            <div class="cltext" @click="getDistrict">
              <span>{{DistrictName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">区/县</div>
          </div>
        </div>
      </div>
      <div class="sMessage2 heightbox2">
        <div></div>
        <div class="sMessage3">
          <div>
            <div class="cltext" @click="getVillage">
              {{VillageName}}
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">街道</div>
          </div>
          <input type="text" class="iP" v-model="form.AddDetail" style='width: 100%;' placeholder="请输入详细地址">
        </div>
      </div>
      <div class="form-btn" @click="ruzhu3" v-if="addflag">

        <button class="numebtn">提交</button>
      </div>
      <div class="form-btn" @click="ruzhu3" v-if="!addflag">

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
        // 图片上传url
        actionurl: "http://api.zhulixc.com/file/upload",
        addflag: true,
        columns: [],
        flagbox: false,
        form: {
          // 店铺，联系人
          ShopImg: "",
          ShopName: "",
          Contact: "",
          Phone: "",
          Nature: "",
          Token: "",
          // 公司名称
          Company: "",
          // 营业执照
          BussImg: "",

          // 分类
          FirstClassify: "",
          SecondClassify: "",
          ThirdClassify: "",
          // 省市区
          Province: "",
          City: "",
          District: "",
          Village: "",
          AddDetail: "",
          // 营业执照
          BussImg: "",
          // 推荐码
          ReferralCode: ""
        },
        // 省名
        ProvinceName: "",
        CityName: "",
        DistrictName: "",
        VillageName: "",

        classify_id: "",
        firstName: "",
        secondName: "",
        thirdName: "",
        Nature: "",
        firstlist: [],
        secondlist: [],
        thirdlist: [],
        provincelist: [],
        citylist: [],
        districtlist: [],
        villagelist: [],
        flagIndex: 1,
        num: 1
      };
    },
    created() {
      this.getToken();
      this.getdata();
    },
    methods: {
      getToken() {
        this.form.Token = localStorage.getItem("Token");
      },
      handleAvatarSuccess1(res, file) {
        console.log(res);
        this.form.ShopImg = res.Data[0].url;
      },
      beforeAvatarUpload1(file) {
        console.log(file);
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 0.5;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          Toast("上传图片大小不能超过 500kb!");
        }
        return isLt2M;
      },

      handleAvatarSuccess2(res, file) {
        console.log(res);
        this.form.BussImg = res.Data[0].url;
      },
      beforeAvatarUpload2(file) {
        console.log(file);
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 0.5;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          Toast("上传图片大小不能超过 500kb!");
        }
        return isLt2M;
      },

      getdata() {
        console.log(this.$route.query.id);
        var id = this.$route.query.id;
        if (id) {
          this.addflag = false;
          this.$http.get(this.HOME+"/shop/queryShopById/" + id).then(res => {
            console.log(res);
            this.form = res.data.data;
          });
          this.$http.get(this.HOME+"/shop/queryShopByShopId/" + id).then(res => {
            console.log(res);
            var data = res.data.data;
            this.firstName = data.firstClassifyName;
            this.secondName = data.secondClassifyName;
            this.thirdName = data.thirdClassifyName;
            this.province = data.provinceName;
            this.city = data.cityName;
            this.district = data.districtName;
            this.village = data.villageName;
          });
        }
      },
      onConfirm(value, index) {
        console.log(value, index);
        // 一级分类
        if (this.flagIndex == 1) {
          this.firstlist.forEach(val => {
            if (value == val.classify_name) {
              this.form.FirstClassify = val.classify_id;
              this.firstName = value;
              console.log(this.classify_id);
            }
          });
        }
        // 二级分类
        if (this.flagIndex == 2) {
          this.secondlist.forEach(val => {
            if (value == val.classify_name) {
              this.form.SecondClassify = val.classify_id;
              this.secondName = value;
            }
          });
        }
        // 三级分类
        if (this.flagIndex == 3) {
          this.thirdlist.forEach(val => {
            if (value == val.classify_name) {
              this.form.ThirdClassify = val.classify_id;
              this.thirdName = value;
            }
          });
        }
        // 省
        if (this.num == 1) {
          this.provincelist.forEach(val => {
            if (value == val.province) {
              this.form.Province = val.province_id;
              this.ProvinceName = value;
            }
          });
        }
        // 市
        if (this.num == 2) {
          this.citylist.forEach(val => {
            if (value == val.city_name) {
              this.form.City = val.city_id;
              this.CityName = value;
            }
          });
        }
        // 区
        if (this.num == 3) {
          this.districtlist.forEach(val => {
            if (value == val.district_name) {
              this.form.District = val.district_id;
              this.DistrictName = value;
            }
          });
        }
        // 街道
        if (this.num == 4) {
          this.villagelist.forEach(val => {
            if (value == val.village_name) {
              this.form.Village = val.village_id;

              this.VillageName = value;
            }
          });
        }

        console.log(this.form);

        this.flagbox = false;
      },
      onCancel() {
        this.flagbox = false;
        // alert(11111111)
        Toast("取消");
      },
      onRead(file) {
        console.log(file);
        this.form.shopImgUrl = file.content;
      },
      // 一级分类
      checkFirst() {
        this.$http.get(this.HOME+"/product/FirstClassify").then(res => {
          console.log(res);
          console.log("777");
          this.firstlist = res.data.Data;
          console.log(this.firstlist);
          this.columns = [];
          this.firstlist.forEach(val => {
            this.columns.push(val.classify_name);
          });
        });

        this.flagIndex = 1;
        this.flagbox = true;
      },
      // 二级分类
      checksecond() {
        this.$http
          .get(this.HOME+"/product/GetClassify/" + this.form.FirstClassify)
          .then(res => {
            console.log(res);
            console.log(8778787);

            this.secondlist = res.data.Data;
            this.columns = [];
            this.secondlist.forEach(val => {
              this.columns.push(val.classify_name);
            });
          });
        this.flagIndex = 2;
        this.flagbox = true;
      },

      // 三级分类
      checkThird() {
        this.$http
          .get(this.HOME+"/product/GetClassify/" + this.form.SecondClassify)
          .then(res => {
            console.log(res);
            this.thirdlist = res.data.Data;
            console.log(this.thirdlist);
            this.columns = [];
            this.thirdlist.forEach(val => {
              this.columns.push(val.classify_name);
            });
          });
        this.flagIndex = 3;
        this.flagbox = true;
      },
      // 获取省
      getProvince() {
        this.$http.get(this.HOME+"/sys/GetProvince").then(res => {
          console.log(res);
          this.provincelist = res.data.Data;
          this.columns = [];
          this.provincelist.forEach(val => {
            this.columns.push(val.province);
          });
          this.num = 1;
          this.flagbox = true;
        });
      },

      getCity() {
        this.$http.get(this.HOME+"/sys/GetCity/" + this.form.Province).then(res => {
          console.log(res);
          this.citylist = res.data.Data;
          this.columns = [];
          this.citylist.forEach(val => {
            this.columns.push(val.city_name);
          });
          this.num = 2;
          this.flagbox = true;
        });
      },
      getDistrict() {
        this.$http.get(this.HOME+"/sys/GetDistrict/" + this.form.City).then(res => {
          console.log(res);
          this.districtlist = res.data.Data;
          this.columns = [];
          this.districtlist.forEach(val => {
            this.columns.push(val.district_name);
          });
          this.num = 3;
          this.flagbox = true;
        });
      },
      getVillage() {
        this.$http.get(this.HOME+"/sys/GetVallage/" + this.form.District).then(res => {
          console.log(res);
          this.villagelist = res.data.Data;
          this.columns = [];
          this.villagelist.forEach(val => {
            this.columns.push(val.village_name);
          });
          this.num = 4;
          this.flagbox = true;
        });
      },

      ruzhu3() {
        console.log(this.form);
        if (this.form.Nature == 2) {
          if (this.form.Company == "") {
            Toast("公司名称必须填写");
            return;
          } else if (this.form.BussImg == "") {
            Toast("公司营业执照必须上传");
            return;
          }
        } else {
          if (
            this.form.ShopName == "" ||
            this.form.Contact == "" ||
            this.form.Phone == ''
          ) {
            Toast("请认真填写相对应的信息");
            return;
          } else if (
            this.form.FirstClassify == "" ||
            this.form.SecondClassify == "" ||
            this.form.ThirdClassify == ""
          ) {
            Toast("请选择店铺分类");
            return;
          }
          this.$http
            .post(this.HOME+"/shop/assign", this.form)
            .then(res => {
              Toast(res.data.Message);
              // var id = res.data.data;
              // console.log(id);
              setTimeout(() => {
                this.$router.push({ path: "/ruzhu3?name=商家入驻审核情况" });
              }, 1000);
            })
            .catch(err => {
              console.log(err.response);
            });
        }
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
    span {
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

  .touxiang {
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 5rem;
    height: 5rem;

    font-size: 12px;
    .avatar-uploader {
      width: 5rem;
      height: 5rem;
      /* border-radius: 50%; */
      /* border: 1px solid #999; */
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 5rem;
        height: 5rem;
      }
    }
    .moren {
      width: 60%;
      padding: 10%;
    }
    /* } */
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
  	margin-top: 1px;
    width: 100%;
    height: 100vh;
    font-size: 0.8rem;
    color: #666;
    >div {
      height: 30px;
      background-color: #fff;
      margin-bottom: 5px;
      line-height: 30px;
      /* padding: 0 0.8rem; */
    }

    .sMessage2 {
      /* width: 100%; */
      height: 3rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 0.8rem;
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
      select {
        font-size: 0.6rem;
        padding: 0.2rem 0.4rem;
      }
    }
    .heightbox2 {
      height: 6rem !important;
    }
    .heightbox2:last-child {
      height: 3rem !important;
    }
    .heightbox {
      height: 6rem !important;
    }
    .sMessage3 {
      height: 100%;
      flex: 1;

      >div {
        padding: 0.1rem;
        height: 30%;
        display: flex;
      }
      .checkfather {
        display: flex;
        >div {
          height: 100%;
        }
        .van-radio {
          margin-right: 10px;
        }
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
      background-color: #0bb794;
      width: 90%;
      height: 3rem;
      color: #fff;
      font-size: 1.1rem;
      border-radius: 3rem;
      position: fixed;
      bottom: 0;
    }
  }
</style>