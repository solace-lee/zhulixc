<template>
  <div>

  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    created () {
    // 检测会员有没有登录
    console.log(123123123131231231231231231231);
    if(!holdno.cookie.get('user')){
      let ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        // 跳转到微信授权页面
        console.log(123123123131231231231231231231);
        window.location.href = 'http://api.zhulixc.com/wx/login'
      }
    }else{
      // 如果有token 但是vuex中没有用户登录信息则做登录操作
      this.login()
    }
},
methods: {
    login () {
      let url = 'http://api.zhulixc.com/wx/login'
      // 通过cookie中保存的token 获取用户信息
      this.$http.get(url).then(response => {
        response = response.body
        if(response){
          // 保存用户登录状态(Vuex)
          this.$store.commit('user', response)
          setTimeout(() => {
            this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
          }, 2000)
        }else{
          this.$alert('服务器撸猫去惹 :(', 'wrong')
          if(holdno.cookie.get('user')){
            // 跳转到微信授权页面
            window.location.href = 'http://api.zhulixc.com/wx/login'
          }
        }
      })
    }
}
  }
</script>

<style scoped>

</style>