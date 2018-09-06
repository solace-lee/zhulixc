<template>
    <div class="tmpl">
        <div class="head">
            <div class="site">
                <div @click="goIndex">
                    <van-icon name="arrow-left" />
                    <span>首页</span>
                </div>
            </div>
            <div class="title">
                <span>提示</span>
                <!-- <span v-if="commodity_id!=''">评价</span>
             <span v-if="commodity_id!=''">详情</span> -->
                <!-- <span v-if='name=="用户协议"'>同意协议</span> -->
            </div>
        </div>
        <div>
            <div class="box">
                <div>
                    <img src="../../img/userImg/comm_bg_empty.png" alt="">
                    <p>您还没有登录,赶紧去登录吧~</p>
                    <button @click='gologin'>去登录</button>
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
            }
        },
        methods: {
            goIndex(){
                sessionStorage.setItem('active',0)
                this.$router.push({path:'/'});
            },
            gologin(){
                this.$router.push({path:"/login?name=登录"})
            }
        }
    }
</script>
<style scoped lang="less">
.tmpl{
}
    .head {
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
  display: flex;
  position: fixed;
  border-bottom: 1px solid #F2F2F2;
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
        font-size: 1rem;
      }
    }
  }

  .title {
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span{
      color: #000;
      margin-right: .5rem;
    }
  }
}
      .box {
    background-color: #fff;
    padding: 3rem;
  
    div{
      // width: 100%;
      padding-top: 20vh;
     text-align: center;
     p{
       font-size: 1.6rem;
       padding: .8rem 0 2rem 0;
       opacity: 0.4;
     }
     button{
     	margin-top: 20px;
       width: 100%;
       height: 3rem;
       background-color: #0BB794;
       color: #fff;
       font-size: 0.8rem;
       letter-spacing: .1rem;
       border-radius: 0.61rem;
     }
      img{
        width: 15rem;
      }
    }
  }
</style>