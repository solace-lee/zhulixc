<template>
  <!-- gouwu -->
  <div class="wrap">
    <div class="box" v-for='(item,index) in carlist' :key="index">
      <div class="shopname">
        <!-- <van-checkbox class="checkbox" v-model="item.shopId"></van-checkbox> -->
        <h3>{{item.shopName}}
          <span>进店 ></span>
        </h3>
      </div>
      <div class="singleshop" v-for="goods in item.carItemDTOs">
        <div class="clearfix">
          <van-checkbox v-model="orderlist[goods.carId]" ></van-checkbox>
        </div>
        <div class="goodsBox">
          <div class="shop_left">
            <img :src="goods.imgUrl" alt="">
          </div>
  
          <div class="shop_right">
            <div class="right-top">
              <p>{{goods.name}}</p>
              <div>
                <span class="price">
                  <span>￥</span>{{goods.amount}}</span>
                <span>×{{goods.num}}</span>
              </div>
            </div>
            <div class="right-bottom">
              <span>{{goods.specificationName}}</span> 
              <span> {{goods.linkValue}}</span>
            </div>
          </div>
        </div>
       
      </div>
   
    </div>
   



    <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit" />
  </div>


</template>

<script>
  // import $ from 'jquery';
  import { Toast } from 'vant';
export default {
  data() {
    return {
      list:[],
      orderlist:{},
      carlist: [],
      userId: "",
      totalPrice:"",
      orderIds:""
    };
  },
  watch:{
    orderlist:{
      handler(val, oldVal){

      this.list=[]
      var order={}
      this.carlist.forEach(val => {
      
        var orderDetailsVOs=[]

        val.carItemDTOs.forEach(val2 => {
         
          for(var key in this.orderlist){
            if( this.orderlist[key]& val2.carId==key){
              
            
            console.log(order.shopId)
                if(order.shopId){
                    if(order.shopId==val2.shopId){
                      var arr2={}
                      arr2.csLinkId=val2.csLinkId
                      arr2.quantity=val2.num
                      arr2.unitPrice= val2.amount
                      orderDetailsVOs.push(arr2)

                    }else{
                      Toast("请添加相同店铺的订单")
                      this.orderlist[key]=false
                    }
                  }else{
                    var arr2={}
                    arr2.csLinkId=val2.csLinkId
                    arr2.quantity=val2.num
                    arr2.unitPrice= val2.amount
                    orderDetailsVOs.push(arr2)
                  }
               
              }  
          }
          });
          if(orderDetailsVOs.length>0){
            // console.log(1)
          order={}
              order.shopId=val.shopId
              order.userId=Number(this.$route.query.id)
              order.orderDetailsVOs=orderDetailsVOs
              // console.log(JSON.stringify(order))
              // if(shopId==shopId2){
                this.list.push(order)

              // }else{

              // }
              orderDetailsVOs=[]
            }
        });
        for(var key in this.orderlist){
        console.log(key)
        if(!this.orderlist[key]){
          delete this.orderlist[key]
        }
      }
        console.log(this.list)
      this.totalPrice=0
      this.list[0].orderDetailsVOs.forEach(val => {
        this.totalPrice+=val.unitPrice
      }); 
      // this.totalPrice=0
      // orderDetailsVOs.forEach(val => {
      //   this.totalPrice+=val.unitPrice
      // });
      console.log(this.totalPrice)
      },
            deep:true
    },
    
  },
  created() {
    this.getId();
    this.getcarlist();
  },
  methods: {
    // 全选
   
    getId() {
      this.userId = this.$route.query.id;
    },
    // 获取购物车数据
    getcarlist() {
      this.$http.get(this.HOME+"car/queryCarByUserId/" + this.userId).then(res => {
        console.log(res);
        this.carlist = res.data.data;
        console.log( this.carlist)
      });
    },
    onSubmit() {
     console.log(this.list)
    this.$http.post(this.HOME+"/order/insertOrder",this.list[0]).then(res=>{
         console.log(res)
        if(res.data.success){
          var id=res.data.data
          this.$router.push({path:"/queren?orderId="+id})
        }
       })
  
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix {
  width: 25px;
}

.shopname {
  padding: 0.5rem 0 0.5rem 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  > h3 {
    vertical-align: middle;
    display: inline-block;
    letter-spacing: 1px;
    span {
      padding-left: 0.8rem;
      color: #666;
      font-size: .8rem;
    }
  }
}

.van-checkbox {
  vertical-align: middle;
  display: inline-block;
}

.goodsBox {
  flex: 1;
  display: flex;
}
.singleshop {
  padding: 0.5rem;
  background-color: #fff;
  position: relative;
  display: flex;

  .van-checkbox {
    position: absolute;
    top: 1rem;
    left: 0.5rem;
  }
  .shop_left {
    margin-right: 0.3rem;
    > img {
      width: 7rem;
      height: 7rem;
    }
  }
}

.shop_right {
  flex: 1;
  padding-left: 0.5rem;
  .right-top {
    width: 100%;

    display: flex;
    justify-content: space-between;
    p {
      color: #333;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    div {
      .price {
        color: #cd2a34;
        font-size: 1.2rem;
        span {
          font-size: 0.8rem;
        }
      }
      span:nth-child(2) {
        font-size: 0.8rem;
        float: right;
        color: #666;
      }
    }
  }
}

.right-bottom {
  padding-top: 1rem;
  span:first-child {
    font-size: 0.8rem;
  }
  span:last-child {
    font-size: 0.7rem;
  }
}
</style>