<template>
    <div class="tmpl">
        <v-header></v-header>

        <div style="height:4rem"></div>
        <div class="box" v-if="!show">
         
            <div>
                <span>持卡人</span><span>{{info.userName}}</span>
            </div>
            <div>
                <span>开卡银行</span>
                <span>{{info.bankName}}</span>
            </div>
            <div>
                <span>卡号</span>
                <span>{{info.bankNum}}</span>
            </div>
            <button @click='gobankMsg("修改银行卡")'>修改</button>
        </div>
           <div>
      <div class="box2" v-if="show">
             <i @click="gobankMsg('添加银行卡')">+</i>
        <div>
          <img src="../../img/userImg/comm_bg_empty.png" alt="">
        <p>没有任何数据~</p>
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
      show: false,
      info: {}
    };
  },
  created() {
    this.getGetBankInfo();
  },
  methods: {
    //   获取用户银行卡
    getGetBankInfo() {
      var token = localStorage.getItem("Token");
      this.$http.get(this.HOME+"/user/GetBankInfo?token=" + token).then(res => {
        console.log(res);
        if (res.data.Data.bankName) {
          this.info = res.data.Data;
        }else{
             this.show=true;
        }
      });
    },
    //   到添加银行卡页面
    gobankMsg(name) {
      this.$router.push({ path: "/bankMsg?name="+name });
    }
  }
};
</script>
<style scoped lang="less">
.box2 {
	margin-top: 3px;
  background-color: #fff;
  padding: 3rem;
  height: 80vh;
  i {
  	
    font-size: 1.6rem;
    color: green;
    position: fixed;
    right: 1rem;
    top: 0.7rem;
    z-index: 100001;
  }

  div {
    // width: 100%;
    padding-top: 20vh;
    text-align: center;
    p {
      font-size: 0.8rem;
      padding: 0.8rem 0 2rem 0;
    }
    img {
      width: 10rem;
    }
  }
}
.head {
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
  display: flex;
  position: fixed;
  z-index: 100000;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-location {
        vertical-align: middle;
      }
      span {
        font-size: 1.6rem;
      }
    }
  }
span{
	font-size: 1.6rem;
}
  .title {
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      color: #fff;
      margin-right: 0.5rem;
    }
  }
}
.box {
	margin-top: 6px;
  position: relative;
  text-align: center;
  button {
    width: 90%;
    margin-top: 1rem;
    height: 3rem;
    color: #fff;
    background-color: #0bb794;
    border-radius: 2rem;
    letter-spacing: 0.4rem;
  }
  
  div:nth-child(1) {
    border-top: none;
  }

  div {
    padding: 0 0.8rem;
    height: 3rem;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #dbdbdb;
    span:nth-child(1) {
      padding-right: 1rem;
      text-align:initial;
      width: 8rem;
      color: #000;
    }
    span:nth-child(2) {
      color: gray;
    }
    input {
      flex: 1;
      padding-left: 1rem;
      color: gray;
    }
  }
}
</style>