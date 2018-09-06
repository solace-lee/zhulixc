<template>
  <div class="father"> 
    <v-header></v-header>
    <div style="height:3rem"></div>
    <!-- 发表评价 -->
    <div class="evaluate">
      <!-- 描述开始 -->
      <div class="describe">

        <div>
          <img :src="msg.imgurl" alt="">
        </div>

        <span class="title">
          {{msg.name}}
        </span>
      </div>
      <div class="describe2">
        <textarea id="text" cols="30" rows="5" v-model="form.Content" placeholder="请输入您对商品的评价"></textarea>
        <ul>
          <li v-for="(item,index) in list" :class='{green:flag==index}' @click='active(index)' :key="index">{{item}}</li>
          
        </ul>
      </div>
      <div class="describe3">
        <div class="submit" id="btnSubmit" @click="subComment()">
          提交
        </div>


      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from "vant";
  import Header from "@/common/_header.vue";
  export default {
    components: {
      "v-header": Header
    },
    data() {
      return {
        id: "",
        goods: {},
        flag:0,
        list:['好评','中评','差评'],
       form:{
        Content:"",
        ComId:"",
        Level:1,
        token:"",
       },
       msg:{},
      };
    },
    created() {
      // this.getData();
      this.getuser();
    },
    methods: {
      // 
      getuser(){
        this.form.token = sessionStorage.getItem('Token');
        this.msg = JSON.parse(sessionStorage.getItem('msg'));
        console.log( this.msg);
        this.form.ComId = this.$route.query.commodity_id;   
      },
      active(index){
        this.flag = index;
        this.form.Level=index+1;
        console.log( this.form.Level);
        
      },

      // 发表评论
      subComment() {
        console.log(this.form);
        this.$http.post('/user/Evaluate',this.form).then(res=>{
          console.log(res);
          Toast(res.data.Message);
          if(res.data.Message=='评论成功'){
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
          
        })
      }
    }
  };
</script>

<style scoped lang="less">
.father{
  
}
  .hp {
    height: 4rem;
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    /* >div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 2rem;
      }
    } */
  }

  .active {
    color: #cd2a34;
  }

  .evaluate {
    width: 100%;
    height: 100%;
    // background-color: #fff;
    padding-bottom: 1rem;
    .describe {
      text-align: center;
      div {
        padding: 2rem 0 .5rem 0;
        img {
          display: inline-block;
          width: 5rem;
        }
      }

      span {}
    }
    .describe2 {
      height: 150px;
      border-top: 1px solid #eee;
      padding-top: 1rem;
      /* border:1px solid #eee; */
      text-align: center;
      ul{
        // width: 100%;
        border: 1px solid #0BB794;
        display: flex;
       margin: 1rem 0;
        
        li{
         width: 33%;
         padding: .5rem 0;
         display: flex;
         justify-content: center;
         align-items: center;
         border-right: 1px solid #0BB794;
        }
        li:nth-child(3){
           border-right: none;
        }
        .green{
          background-color:  #0BB794;
        }
      }
      #text {
        border: none;
        width: 90%;
        font-size: 0.9rem;
        color: #333;
        border:1px solid #e0e0e0;
        margin-left: 0;
      
      }
   #text::-webkit-input-placeholder {
    color: #6b6b6b;
}
    }
    .describe3 {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1rem;
      >.submit {
        width: 80%;
        height: 3rem;
        background-color:#0BB794;
        color: #fff;
        border-radius: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>