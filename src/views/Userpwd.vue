<template>
    <div class="tmpl">
       <v-header></v-header>
       <div class="head"></div>
      <div v-if='!onoff'>
           <div class="msg" >
           <p>为确保是您本人操作，请完成以下验证</p>
           <p>我们已经发送校验码到您的手机：</p>
           <p>*******2356</p>
       </div>
       <div class="verification">
           <span>校验码:</span>
           <input type="text" placeholder="短信校验码">
           <button>60秒后重新获取</button>
       </div>
      </div>
      <div v-if="onoff" class="pwd">
          <div>
              <input type="text" placeholder="输入新密码" v-model="pwd">
              <van-icon name="password-view" />
          </div>
           <div>
              <input type="password" placeholder="确认新密码" v-model="pwd2">
              <van-icon name="password-not-view" />
          </div>
      </div>
       <div class="btns">
           <button @click='onoff=true' v-if="!onoff">下一步</button>
           <button v-if="onoff" @click="amend">完成</button>
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
        onoff:false,
        token:'',
        pwd:'',
        pwd2:'',
    };
  },
  methods: {
      amend(){
          if(this.pwd2 != this.pwd){
              Toast('两次密码输入不一致');
              return;
          }else if (this.pwd==''){
               Toast('密码不能为空');
              return;
          }
          var obj = {};
          obj.pwd = this.pwd;
          console.log(obj);
          
          obj.token = sessionStorage.getItem('Token');
          this.$http.post(this.HOME+'/user/UpdatePwd',obj).then(res=>{
              console.log(res);
              Toast.success(res.data.Message);
              

          })
      },
  }
};
</script>
<style scoped lang="less">
.head {
  width: 100%;
  height: 4rem;
}
.msg {
  width: 100%;
  height: 6rem;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    height: 1.6rem;
  }
  p:nth-child(1) {
    color: #00ad8a;
  }
}
.verification {
  width: 100%;
  height: 2rem;
  background-color: #fff;
  font-size: .6rem;
    display: flex;
  span {
    width: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  button{
      height: 100%;
      width: 6rem;
      background-color: #fff;
      border-left: 1px solid #EEE;
      font-size: .5rem;
      color: #999999;
  }
  input{
      flex: 1;
      font-size: .6rem;
  }
    input::-webkit-input-placeholder{
        color:#c3c3c3;
    }
}
.btns{
    padding: 3rem;
    button{
        width: 100%;
        padding:.6rem 0;
        background-color: #0BB794;
        color: #fff;
        border-radius: 2rem; 
    }
}
.pwd{
    width: 100%;
    div{
        width: 100%;
        height: 2rem;
        position: relative;
        input{
            width: 100%;
            height: 100%;
            font-size: .7rem;
            padding-left: 1rem;
            margin-left: 0;
        }
        .van-icon{
            position: absolute;
            right:1rem;
            top: .5rem;
        }
    }
}

</style>