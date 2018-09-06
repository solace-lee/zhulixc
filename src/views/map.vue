<template>
<div>
     <v-header></v-header>
    <div style="height: 3.5rem;"></div>

    <div class="choice">
      <div class="location">
        <span @click='get' style="color: #000000;">自动定位</span>
      </div>
     <div class="nav">
     	
        <ul>
        <li :class="{active:isA}" @click='navpro'>
          <span v-if="!ProvinceName" >请选择</span><span>{{ProvinceName}}</span>
          </li>
        <li :class="{active:isB}" v-if='activeB' @click='navcity'><span v-if="!city_name">请选择</span><span>{{city_name}}</span></li>
        <li :class="{active:isC}"  v-if='activeC' @click='navDis'><span v-if="!district_name">请选择</span><span>{{district_name}}</span></li>
        <!--<li :class="{active:isD}"  v-if='activeD'><span v-if="!vallage_name">请选择</span><span>{{vallage_name}}</span></li>-->
      </ul>
     </div>
      <div class="content">
        <!-- 省 -->
        <ul v-if='activeA'>
          <li :class='{conactive:ac==index}' @click="Click(index,i.province_id,i.province)" v-for="(i,index) in ProvideList" :key="index">
            <span v-if="i.province">{{i.province}}</span>
          </li>
        </ul>
        <!-- 市 -->
          <ul v-if='showB'>
          <li :class='{conactive:ac==index}' @click="city(index,i.city_id,i.city_name)" v-for="(i,index) in CityList" :key="index">
            <span v-if="i.city_name">{{i.city_name}}</span>
          </li>
        </ul>
        <!-- 区 -->
          <ul v-if='showC'>
          <li :class='{conactive:ac==index}' @click="District(index,i.district_id,i.district_name)" v-for="(i,index) in Districtlsit" :key="index">
            <span v-if="i.district_name">{{i.district_name}}</span>
          </li>
        </ul>
          <!-- 街道 -->
          <!--<ul v-if='showD'>
          <li :class='{conactive:ac==index}' @click="vallage(index,i.village_name)" v-for="(i,index) in Villagelist" :key="index">
            <span v-if="i.village_name">{{i.village_name}}</span>
          </li>
        </ul>-->
        

      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/common/_header.vue";
import { Toast, Tabs } from "vant";

export default {
  components: {
    "v-header": Header
  },
  data() {
    const self = this;
    return {
      isA: true,
      showA: true,
      activeA: true,
      isB: false,
      showB: false,
      activeB: false,
      isC: false,
      showC: false,
      activeC: false,
      isD: false,
      showD: false,
      activeD: false,
      flag: 0,
      ac: "y",
      show: false,
      // 省市区
      ProvideList: [],
      CityList: [],
      Districtlsit: [],
      Villagelist: [],
      //
      street: "",
      // 省名
      ProvinceName: "",
      city_name: "",
      district_name: "",
      vallage_name: "",

      // id
      Province: "",
      city_id: "",
      district_id: "",

      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          // timeout: 100,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
              var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });
              geocoder.getAddress([lng, lat], function(status, result) {
                if (status === "complete" && result.info === "OK") {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              });
            },

            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ],
      content: ""
    };
  },
  mounted() {
    // this.get();
    this.getProvince();
  },
  methods: {
    // nav 省 点击
    navpro(){  
      this.isA = true;
      this.activeA = true;
      this.activeB = false;
      this.isB = false;
      this.showB = false;
      this.activeC = false;
      this.showC = false;
      this.isC = false;
      this.activeD = false;
      this.isD = false;
      this.showD = false;
     
      this.city_name = '';
      this.district_name = '';
      this.vallage_name = '';
    },
    // nav 市 点击
    navcity(){
      this.isA = false;
      this.activeA = false;
      this.activeB = true;
      this.isB = true;
      this.showB = true;
      this.activeC = false;
      this.showC = false;
      this.isC = false;
      this.activeD = false;
      this.isD = false;
      this.showD = false;
       this.district_name = '';
      this.vallage_name = '';
    },
     // nav 区 点击
     navDis(){
        this.isA = false;
      this.activeA = false;
      this.activeB = false;
      this.isB = false;
      this.showB = false;
      this.activeC = true;
      this.showC = true;
      this.isC = true;
      this.activeD = false;
      this.isD = false;
      this.showD = false;
      this.vallage_name = '';
     },
    //省
    Click(index, id, name) {
      this.ac = index;
      console.log(id, name);
      this.Province = id;
      this.ProvinceName = name;
      this.showA = false;
      this.showB = true;
      this.ac = "y";
      this.getCity();
    },
    // 市
    city(index, id, name) {
      this.ac = index;
      console.log(id, name);
      this.city_id = id;
      this.city_name = name;
      this.showA = false;
      this.activeC = true;
      this.ac = "y";
      this.getDistrict();
    },
    // 区
    District(index, id, name) {
      this.ac = index;
      console.log(id, name);
      this.district_id = id;
      console.log(this.district_id);
      this.district_name = name;
      this.showA = false;
      this.showB = false;
      this.showC = false;
      this.isC = false;
      this.showD = true;
      this.activeD = true;

      this.isD = true;
      this.ac = "y";
      this.getVillage();
      sessionStorage.setItem("city", this.city_name);
      sessionStorage.setItem("district", this.district_name);
      Toast("您已经切换至"+this.city_name+this.district_name);
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 1000);
    },
    // 街道
    vallage(index, name) {
      this.ac = index;
      console.log(name);
      this.vallage_name = name;
      sessionStorage.setItem("street", this.vallage_name);
      Toast("您已经切换至"+this.vallage_name);
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 1000);
    },
    //nav
    getIndex(index) {
      this.flag = index;
      console.log(index);
    },
    // 获取省市区
    // 获取省
    getProvince() {
      this.$http.get(this.HOME+"/sys/GetProvince").then(res => {
        console.log(res);
        this.ProvideList = res.data.Data;
      });
    },

    getCity() {
      this.isA = false;
      this.activeA = false;
      this.isB = true;
      this.showB = true;
      this.activeB = true;
      this.$http.get(this.HOME+"/sys/GetCity/" + this.Province).then(res => {
        console.log(res);
        this.CityList = res.data.Data;
      });
    },
    getDistrict() {
      console.log(this.city_id);
      console.log("----------");
      this.isA = false;
      this.isB = false;
      this.showB = false;
      this.isC = true;
      this.showC = true;
      this.$http.get(this.HOME+"/sys/GetDistrict/" + this.city_id).then(res => {
        console.log(res);
        this.Districtlsit = res.data.Data;
      });
    },
    getVillage() {
      this.$http.get(this.HOME+"/sys/GetVallage/" + this.district_id).then(res => {
        console.log(res);

        this.Villagelist = res.data.Data;
        console.log(this.Villagelist)
      });
    },
    // 自动定位
    get() {
      console.log(144444444444);
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      console.log(mapObj);
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
        function onComplete(data) {
          console.log(data);
          that.street = data.addressComponent.street;
          sessionStorage.setItem("street", that.street);
          Toast("定位成功");
          setTimeout(() => {
            that.$router.push({ path: "/" });
          }, 1000);
        }
        function onError(data) {
          console.log(data);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.choice {
  width: 100%;
  .location {
    /*width: 1.5rem;*/
    font-size: 0.6rem;
    // height: 100%;
    position: fixed;
    top: 0.8rem;
    right: 0.8rem;
    z-index: 100000;
    span {
      color: #fff;
    }
  }
  .nav {
  	margin-top: 7px;
    ul {
      display: flex;
      li {
        width: 33.33%;
        height: 3rem;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 15px;
      }
      .active {
        color: #1bc6a3;
        border-bottom: 2px solid #1bc6a3;
      }
    }
  }
  .content {
    width: 100%;
    ul {
      width: 100%;
      li {
        padding-left: 1rem;
        line-height: 3rem;
        height: 3rem;
        display: flex;
        font-size: 14px;
        span{
        	margin-left: 30px;
        }
      }
      .conactive {
        color: #1bc6a3;
      }
    }
  }
}
</style>