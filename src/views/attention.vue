<template lang="html">
  <div class="wrap">

    <div class="gz" v-for='item in attention' :key="item.attention">
      <img :src="item.shopImgUrl" alt="">
      <span>{{item.shopName}}</span>
      <button @click="cancel(item.shopId)">取消关注</button>
    </div>
   
  </div>
</template>

<script>


export default {
  data(){
    return{
      attention:[],
      page:1,
      rows:10,
      userId:""
    }
  },

  created(){
    this.getId()
    this.getattention()
  },
  methods:{
    getId() {
       
          this.userId=this.$route.query.id
       
      },
      cancel(id){
console.log(id)
this.$http.post(this.HOME+"/userFollowshow/deleteUserFollowshow",{userId:this.userId,shopId:id}).then(res=>{
  console.log(res)
  if(res.data.success){
    this.getattention()
  }
})
      },
    getattention(){
     console.log({page:this.page,rows:this.rows,userId:this.userId})
      this.$http.get(this.HOME+'/userFollowshow/queryUserFollowshowByPage?page='+this.page+'&rows='+this.rows+'&userId='+this.userId).then(res=>{
        console.log(res)
        this.attention=res.data.data.data;
       
      })  
  } ,

  }
};
</script>

<style scoped lang="less">
  .gz{
    
    width: 100%;
    height: 80px;
    line-height: 65px;
    background-color: #fff;
    padding-left: 10px;
    margin-bottom: 5px;
     display: flex;
  
  align-items: center;
  
     font-size: 12px;
     span{
   
       width: 250px;
       height: 100%;
     
      display: flex;
      align-items: center;
      justify-content: center;
     }
    img{
     
      width: 60px;
      height: 60px;
      border-radius: 5px;
      display: inline-block;
    
     margin-right: 10px;
    }
    button{
     
      width:30%;
      height: 100%;
      background-color: #cd2a34;
      color: #fff;
     
      font-size: 14px;
  
    }
  }
</style>