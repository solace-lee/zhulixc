<template>
    <div class="tmpl">
        <v-header></v-header>
        <!-- <div class="head" style='width: 100%;height: 3rem;'></div> -->
        <div class="box">

            <div class="erweima">
                <img src="../../img/userImg/personal_login_bg_yellowpattern.png" alt="">
            </div>
            <div class="yeji">
                <p>当前业绩</p>
                <span></span>
                <p>{{Data}}元</p>
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
                Data:"",
            }
        },
        created() {
            this.getYeji();
        },
        methods: {
            
            getYeji(){
                var token = sessionStorage.getItem('Token');
                this.$http.get(this.HOME+'/user/GetUserPerformance?token='+token).then(res=>{
                    console.log(res);
                    this.Data = res.data.Data;
                    
                })
            }
        }
    }
</script>
<style scoped lang="less">
     .tmpl{
     	background-image: url('../../img/userImg/personal_login_bg_background.png');
        background-size: 100% 100%;
     }
      .box{
        width: 100wh;
        height: 100vh;

        position: relative;
        .erweima{
            padding:6rem 3rem 2rem;
            img{
               width: 100%;
            }
        }
        .yeji{
            width: 100%;
            position: absolute;
            top: 30vh;
            font-size: 1.6rem;
            text-align: center;
          
            p{
                width: 100%;
                color: #fff;
                letter-spacing: .1rem;
                font-size: 1.6rem;
            }
            span{
                display: inline-block;
                width:6rem ;
                background-color: #fff;
                height: .2rem;

                // position: absolute;
            }
           
        }
    
    }
</style>