<template>
  <!-- 商家入驻信息 -->
  <div>
    <v-header></v-header>
    <div class="head" style="width: 100%;height: 3.5rem;"></div>
    <div style="margin: 10px;">基本资料</div>
    <div class="sMessage">
        <div class="sMessage2" style="margin-top:10px;">
        <div>代理级别：</div>
        <div class="sMessage3">
          <div style="height:100%;">
            <div class="cltext" @click="agency">
              <span>{{agencyName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>            
          </div>
        </div>
        
      </div>
      <div class="sMessage2">
        <div>联系人：</div>
        <input type="text" class="iP" v-model="form.Contect" placeholder="请输入联系人名字">
      </div>
      <div class="sMessage2">
        <div>
          联系人电话：
        </div>
        <input type="text" class="iP" v-model="form.Phone" placeholder="请输入联系方式">
      </div>
      <div class="sMessage2">
        <div>
          QQ：
        </div>
        <input type="text" class="iP" v-model="form.QQ" placeholder="请输入QQ号码">
      </div>
      <div class="sMessage2">
        <div>
          邮箱地址：
        </div>
        <input type="text" class="iP" v-model="form.Email" placeholder="请输入Email">
      </div>
      <!-- <div class="sMessage2">
        <div>
          推荐码：
        </div>
        <input type="text" class="iP" v-model="form.ReferralCode">
      </div> -->
      <p style="margin: 10px;font-size: 14px;">认证信息</p>
      <!--<div class="sMessage2">
        <div>代理性质:</div>
        <div class="sMessage3 checkfather">
            <van-radio-group v-model="form.Nature">
        <van-radio :name="1">个人</van-radio>
        <van-radio :name="2">企业</van-radio>
      </van-radio-group>
        </div>
      </div>-->
      <div class="sMessage2"><!--v-if="form.Nature==2"-->
        <div>公司名称:</div>
        <div class="sMessage3 checkfather">
          <input type="text" class="iP" v-model="form.Company"placeholder="请输入公司名称">
        </div>
      </div>
      <div class="sMessage2">
        <div>法人代表:</div>
        <div class="sMessage3 checkfather">
          <input type="text" class="iP" v-model="form.Faren"placeholder="请输入法人代表姓名">
        </div>
      </div>
      <div class="sMessage2" >
        <div>法人身份证号码:</div>
        <div class="sMessage3 checkfather">
          <input type="text" class="iP" v-model="form.FarenId"placeholder="请输入法人身份证号码">
        </div>
      </div>
      <div class="sMessage2 heightbox" >
        <div>证件照片:</div>
        <div class="tuxiang">
        <div class="touxiang">  
          <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
            <img v-if="form.ZidImg" :src="form.ZidImg" class="avatar" alt="正面">
            <img class="moren" src="../../assets/images/111.png" alt="正面" v-else> 
          </el-upload>
        </div>
        <p class="text-center">身份证正面</p>
        </div>
        <div class="tuxiang">
        <div class="touxiang">  
          <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload3">
            <img v-if="form.FidImg" :src="form.FidImg" class="avatar" alt="反面">
            <img class="moren" src="../../assets/images/111.png" alt="反面" v-else> 
          </el-upload>
        </div>
        <p class="text-center">身份证反面</p>
        </div>
        <div class="tuxiang">
        <div class="touxiang">  
          <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess4" :before-upload="beforeAvatarUpload4">
            <img v-if="form.SidImg" :src="form.SidImg" class="avatar" alt="手持身份证">
            <img class="moren" src="../../assets/images/111.png" alt="手持身份证" v-else> 
          </el-upload>
        </div>
        <p class="text-center">手持身份证</p>
        </div>

      </div>
       <div class="sMessage2" >
        <div>营业执照编号:</div>
        <div class="sMessage3 checkfather">
          <input type="text" class="iP" v-model="form.AvatarId"placeholder="营业执照编号">
        </div>
      </div>
      <div class="sMessage2 heightbox" >
        <div>营业执照:</div>
        <div class="touxiang">
          <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="form.ShopImg" :src="form.ShopImg" class="avatar">
            <img class="moren" src="../../assets/images/111.png" v-else>
          </el-upload>
      
        </div>
      </div>
    
      <div class="sMessage2 heightbox2">
        <div>代理地址:</div>
        <div class="sMessage3">
          <div>
            <div class="cltext" @click="getProvince">
               <span> {{ProvinceName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">省</div>
          </div>
          <div>
            <div class="cltext" @click="getCity">
               <span> {{CityName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">市</div>
          </div>
          <div>
            <div class="cltext" @click="getDistrict">
              <span> {{DistrictName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">区/县</div>
          </div>
        </div>
      </div>

      <!--<div class="sMessage2 heightbox2">
        <div></div>
        <div class="sMessage3">
          <div>
            <div class="cltext" @click="getVillage">
             <span> {{VillageName}}</span>
              <img src="../../assets/images/personal_bg_graytriangle@2x.png" alt="">
            </div>
            <div class="clatext-right">街道</div>
          </div>
          <input type="text" class="iP" v-model="form.AddDetail" style='width: 100%;' placeholder="请输入详细地址">
        </div>
      </div>-->
      
      <div class="form-btn" @click="ruzhu3" v-if="addflag">

        <button class="numebtn">提交</button>
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
      actionurl: "https://api.zhulixc.com/file/upload",
      addflag: true,
      columns: [],
      flagbox: false,
      form: {
        //   代理级别
        AgencyLevel: "",
        // 店铺，联系人
        Contect: "",
        Phone: "",
        Nature: "",
        Token: "",
        // QQ: "",
        Email: "",
        // ReferralCode: "",
        // 公司名称
        Company: "",
        // 营业执照
        ZidImg: "",
        FidImg: "",
        SidImg: "",
        ShopImg:"",
        Faren:"",//法人姓名
        FarenId:"",//法人id
        AvatarId:"",//营业执照
        // // 分类
        // FirstClassify: "",
        // SecondClassify: "",
        // ThirdClassify: "",
        // 省市区
        Province: "",
        City: "", 
        District: "",
        Village: "",
        AddDetail: "",
        // 推荐码
        // ReferralCode: ""
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
      firstlist: [],
      secondlist: [],
      thirdlist: [],
      provincelist: [],
      citylist: [],
      districtlist: [],
      villagelist: [],
      flagIndex: 1,
      num: 1,
      agencyName: "",
      agencylist: []
    };
  },
  created() {
    this.getToken();
    setTimeout(() => {
      //   this.getdata();
    }, 1000);
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
        handleAvatarSuccess3(res, file) {
      console.log(res);
      this.form.FidImg = res.Data[0].url;
    },
    beforeAvatarUpload3(file) {
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
        handleAvatarSuccess4(res, file) {
      console.log(res);
      this.form.SidImg = res.Data[0].url;
    },
    beforeAvatarUpload4(file) {
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
      this.form.ZidImg = res.Data[0].url;
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
    onConfirm(value, index) {
        console.log(value, index);
      if (this.num == 5) {
        console.log(this.agencylist);
        this.agencylist.forEach(val => {
          if (value == val.name) this.form.AgencyLevel = val.AgencyLevel;
          this.agencyName = value;
          console.log(this.form.AgencyLevel);
        });
      }
      // 省
      if (this.num == 1) {
        this.provincelist.forEach(val => {
          if (value == val.province) {
            this.form.Province = val.province_id;
            this.ProvinceName = value;
            this.CityName =null;
            this.DistrictName =null;
            
          }
        });
      }
      // 市
      if (this.num == 2) {
        this.citylist.forEach(val => {
          if (value == val.city_name) {
            this.form.City = val.city_id;
            this.CityName = value;
            this.DistrictName =null;
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

    // 获取代理级别
    agency() {
      var obj1 = (this.agencylist = [
        { name: "省级代理", AgencyLevel: 1 },
        { name: "市级代理", AgencyLevel: 2 },
        { name: "区县代理", AgencyLevel: 3 }
      ]);
      this.columns = [];
      this.agencylist.forEach(val => {
        console.log(val);
        this.columns.push(val.name);
      });
      this.num = 5;
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
//  getVillage() {
//    this.$http.get(this.HOME+"/sys/GetVallage/" + this.form.District).then(res => {
//      console.log(res);
//      this.villagelist = res.data.Data;
//      this.columns = [];
//      this.villagelist.forEach(val => {
//        this.columns.push(val.village_name);
//      });
//      this.num = 4;
//      this.flagbox = true;
//    });
//  },

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
      } else if (this.form.AgencyLevel == "") {
        Toast("请选择代理级别");
        return;

      } else if (this.form.ProvinceName == ""&&this.form.CityName==''&&this.form.DistrictName==''&&this.form.VillageName=='') {
           Toast("请填写地址");
            return;
      
      }else if (this.form.Contect == "" || this.form.Phone == "") {
        Toast("请认真填写相对应的信息");
        return;
      }
      this.$http
        .post(this.HOME+"/agency/assign", this.form)
        .then(res => {
          console.log(res);
          Toast(res.data.Message);

          // setTimeout(() => {
          //   sessionStorage.setItem('active',0)
          //   this.$router.push({ path: "/" });
          // }, 2000);
        })
        .catch(err => {
          console.log(err.response);
        });
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
    padding-left: 0.8rem;
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
 margin: 5px;
  font-size: 12px;
  .avatar-uploader {
    /*width: 5rem;
    height: 5rem;*/
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
  .tuxiang{
  	  width: 5rem;
     height: 6rem;
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
  width: 100%;
  height: 100vh;
  font-size: 0.8rem;
  color: #666;
  > div {
    height: 30px;
    background-color: #fff;
    margin-bottom: 5px;
/*    line-height: 30px;*/
    /* padding: 0 0.8rem; */
  }

  .sMessage2 {
    /* width: 100%; */
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
    > div:nth-of-type(1) {
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
    // height: 3rem !important;
  }
  .heightbox {
    height: 7rem !important;
  }
  .sMessage3 {
    height: 100%;
    flex: 1;

    > div {
      padding: 0.1rem;
      height: 30%;
      display: flex;
    }
  }
  .checkfather {
    display: flex;
    > div {
      height: 100% !important;
    }
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
    > div {
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
/*    position: fixed;*/
    bottom: 0;
  }
}
</style>