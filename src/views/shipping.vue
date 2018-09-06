<template>
  <!-- 收货地址页 -->
  <div class="wrap">
    <v-header></v-header>
    <div class="head" style="width: 100%;height: 4rem;"></div>

    <van-radio-group v-model="isdefault">
      <div class="addresslist" v-for="item in addresslist"style="margin-top: 8px;">
        <div class="listfather" @click="bianji(item)">
          <div class="father">
            <div class="list-1">
              <div>{{item.contact}}</div>
              <div>{{item.phone}}</div>
            </div>
            <div class="list-name">
              {{item.province}}{{item.city_name}}{{item.district_name}}{{item.village_name}} {{item.detailaddress}}
            </div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list-type">
          <van-radio :name="item.address_id" @click='clicks(item)'>设为默认地址</van-radio>
          <div class="site2">
            <!-- <span class="el-icon-edit-outline" >&nbsp;编辑</span>&nbsp;&nbsp; -->
            <span class="el-icon-delete" @click='del(item.address_id)'>&nbsp;删除</span>
          </div>
        </div>
      </div>

    </van-radio-group>

    <!-- <router-ling :to="{ name:'添加收货地址'}" class="sh"> -->
    <button class="sh" @click="shipping2">添加新地址</button>
    <!-- </router-ling> -->
  </div>

</template>

<script>
  import { RadioGroup } from "vant";
  import { Toast } from "vant";
  import Header from "@/common/_header.vue";
  

  // Vue.use(RadioGroup);

  export default {
    components: {
      "v-header": Header
    },
    data() {
      return {
        isdefault:'',
        addresslist: [],
        token: "",
        address_id: 0,
        form:{},
        delist:[],
      };
    },
    watch: {
      // isdefault() {
      //   console.log("000");
      //   this.$http
      //     .post("/user/UpdateAddress", {
      //       token:this.token,
      //       addressid:this.address_id,
      //       isdefault: true
      //     })
      //     .then(res => {
      //       console.log(res);
      //       // if (res.data.success) {
      //       //   this.getAddress();
      //       // }
      //     });
      // }
    },
    created() {
      this.gettoken();
      this.getAddress();
    },
    methods: {
      clicks(item) {
       var obj = {};
        obj.token = this.token;
        obj.addressid =item.address_id;
        obj.province = item.province_id;
        obj.city = item.city_id;
        obj.district = item.district_id;
        obj.village = item.village_id;
        obj.details = item.detailaddress;
        obj.isdefual = true;
        obj.contact = item.contact;
        obj.phone = item.phone;
        console.log(obj); 
        this.$http
          .post(this.HOME+"/user/UpdateAddress",obj)
          .then(res => {
            Toast.success(res.data.Message);
          });
          

      },
      shipping2() {
        this.$router.push({ path: "/shippingadd?name=新增地址" });
      },
      bianji(item) {
        console.log(item);
        sessionStorage.setItem('site',JSON.stringify(item));
        this.$router.push({
          path: "/shipping2?name=修改地址"
        });
      },
      gettoken() {
        this.token = localStorage.getItem("Token");
      },
      del(id){
        this.$http.post(this.HOME+'/user/DelAddress/'+id).then(res=>{
          console.log(res);
          
        })
      },
      //获取用户地址数据
      getAddress() {
        this.$http.get(this.HOME+"/user/GetUserAddress?token=" + this.token).then(res => {
          console.log(res);
          this.addresslist = res.data.Data;
          this.addresslist.forEach(val => {
            console.log(val.isdefault);
            if(val.isdefault){
              this.isdefault = val.address_id;
            }
            this.form = val;
 
          });
     
         
        });
      }
    }
  };
</script>

<style lang=less scoped>
  .wrap {
    width: 100%;
    /* height: 100%; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    /* border: 1px solid #ccc; */
    background-color: #f2f2f2;
    padding-bottom: 100px;
  }

  .addresslist {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 8px;
  }

  .listfather {
    width: 100%;

    display: flex;
    justify-content: space-between;
    .father {
      width: 80%;
    }
    .van-icon {
      font-size: .6rem;
    }
    div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .list-1 {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #000;
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    div:nth-child(1) {
      color: #00ad8a;
      padding-right: 1rem;

    }
  }

  .list-name {
    width: 100%;
    padding: 5px 0;
  }

  .list-type {
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    height: 28px;
    align-items: center;
  }

  .site2 {
    width: 40%;
    text-align: center;
  }

  .sh {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
    margin: 20px auto;
    font-size: 20px;
    color: #fff;
    border-radius: 50px;
    height: 50px;
    width: 80vw;
    background-color: #0bb794;
  }
</style>