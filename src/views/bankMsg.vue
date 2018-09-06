<template>
    <div class="tmpl">
         <v-header></v-header>
        <div style="height:4rem"></div>
         <div class="box">
             <p>请绑定本人持卡银行卡</p>
       
            <div>
                <span>持卡人</span><input type="text" placeholder="请输入持卡人姓名" v-model="info.userName">
            </div>
            <div>
                <span>开卡银行</span>
                <input type="text"  placeholder="请输入卡所属银行" v-model="info.bankName">
            </div>
            <div>
                <span>卡号</span>
                <input type="text" placeholder="请输入银行卡号" v-model="info.bankNo">
            </div>
             <button @click='UpdateBank'>完成</button>
        </div>
    </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from 'vant';
  export default {
    components: {
      "v-header": Header
    },

  data() {
    return {
        show:true,
        info:{
            token:'',
            bankName:'',
            bankNo:'',
            userName:'',
        }
    };
  },
  created() {
      this.gettoken();
  },
  methods: {
      gettoken(){
          this.info.token = sessionStorage.getItem('Token');
      },
      UpdateBank(){   
          this.$http.post(this.HOME+'/user/UpdateBank',this.info).then(res=>{
              console.log(res);
              Toast.success(res.data.Message);
              setTimeout(() => {
                  this.$router.go(-1);
                  
              }, 1000);
              
          })
      }
  }
};
</script>
<style scoped lang="less">

.box {
  position: relative;
  text-align: center;
  span{
  	width: 21%;
  	text-align:initial;
  }
  button{
      width: 80%;
      margin-top: 6rem;
      height: 3rem;
      color: #fff;
      background-color: #0BB794;
      border-radius: 0.5rem;
      letter-spacing: .4rem;
      

  }
  p{
      text-align: left;
      padding: .2rem .4rem;
  }
  i {
    font-size: 1.6rem;
    color: #fff;
    position: fixed;
    right: 1rem;
    top: 0.7rem;
    z-index: 100001;
  }
  div:nth-child(1) {
    border-top: none;
  }

  div {
    padding: 0 0.8rem;
    height: 3rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #dbdbdb;
    span:nth-child(1) {
        padding-right: .5rem;
      color: #000;
    //    font-size: .9rem;
    }
    input {
      flex: 1;
      padding-left: 1rem;
      color: gray;
      font-size: 1rem;
    }
  }
}
</style>