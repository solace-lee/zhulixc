<template>
<!-- 会员充值 -->
  <div class="vip">
      <h1>
         <span class="el-icon-arrow-left fanhui" @click="go"></span>会员充值</h1>
      <div class="sum1">
        账户余额: <span>999元</span>
        <!-- <input type="text"> -->
      </div>
     <div class="sum2">请输入充值金额<input type="text"></div>
     <button>充值</button>
  </div>
  
</template>

<script>
  export default {
    data(){
      return{
        Member:[],
        userId:'',
        walletType:''
      }
    },
    methods:{
       getMeber(){
         //this.$http.get('/userWallet/queryUserWalletByUserId',{params:{userId:1,walletType:1}}).then(res=>{
           this.$http.get(this.HOME+'/userWallet/queryUserWalletByUserId',{params:{userId:this.userId,walletType:this.walletType}}).then(res=>{
           console.log(res);
         })
       },
        //返回上一页
    go(){
      this.$router.go(-1);
    } 
    },
     created(){
       getMeber()
     }
  }
</script>

<style lang="less" scoped>
.vip{
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
h1 {
  width: 100%;
  height: 60px;
  background-color: #000;
  text-align: center;
  color: #fff;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .fanhui{
    // border: 1px solid #fff;
    position: absolute;
    left: 10px;
  }
}
  .sum1{
    width: 100%;
    height: 100px;
    display:block;
    //  border: 1px solid #ccc; 
    line-height: 50px;
    background-color: #fff;
    /* padding-left: 25%; */
    text-align: center;
    line-height: 100px;
    span{
      color: #CD2A34;
      font-size: 20px;  
         
    }
  }
 .sum2{
    width: 88%;
    height: 10%;
    border: 1px solid #999;
    line-height: 50px;
    background-color: #fff;
    padding-left: 10px;
    border-radius:20px;
    margin-left: 12px;
    position: relative;
    font-size: 16px;
    display: flex;
    align-items: center;
    // border: 1px solid #000;
    input{
      //  border: 1px solid #000; 
      width: 55%;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      border-radius:20px;
    }
  }
  button{
    width: 90%;
    height: 48px;
    background-color: #CD2A34;
    color: #fff;
    border-radius: 24px;
    margin-left: 2.5vh;
    margin-top: 20vh;
  }
}
 
</style>