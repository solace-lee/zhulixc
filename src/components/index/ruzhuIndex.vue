<template>
    <div class="tmpl">
        <v-header></v-header>
        <div class="box">
            <div class="want" @click='ruzhu("商家入驻协议")'>
                <div>
                    我要成为商家
                </div>
            </div>
            <div class="want">
                <div @click="ruzhu2('代理商入驻协议')">
                    我要成为代理商
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      shop_id: ""
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      var token = localStorage.getItem("Token");
      console.log(token);
      this.$http.get(this.HOME+"/shop/getshopinfo?token=" + token).then(res => {
        console.log(res);
        this.shop_id = res.data.Data.Info.shop_id;
      });
    },
    ruzhu(name) {
      var Token = localStorage.getItem("Token");
      if (this.shop_id != "") {
        this.$router.push({ path: "/ruzhu3?name=商家入驻审核情况" });
      } else if (this.shop_id == "") {
        this.$router.push({ path: "/ruzhu?name=" + name });
      }
    },
     ruzhu2(name) {
      var Token = localStorage.getItem("Token");
        this.$router.push({ path: "/ruzhu?name=" + name });
    
    }
  }
};
</script>
<style scoped lang="less">
.box {
  width: 100%;
  width: 100%;
  padding-top: 4rem;
  .want {
    width: 14rem;
    height: 5rem;
    background-color: #1bc6a3;
    padding: 0.8rem;
    // margin-bottom: 1rem;
    margin: 1rem auto;

    div {
      border: 1px solid #fff;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      letter-spacing: 0.2rem;
    }
  }
  .want:nth-child(2) {
    background-color: #0b78b7;
  }
}
</style>