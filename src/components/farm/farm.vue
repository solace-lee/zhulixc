<template>
    <div class="tmpl">
        <div class="box">
            <div class="tool">

                <div @click='onoff=true'>
                    <img src="../../../img/farmImg/btn_shop.png" alt="">
                    <p>商店</p>
                </div>

                <div>
                    <img src="../../../img/farmImg/farm_btn_animalquantity.png" alt="" @click='quantity'>
                    <p>动物数量</p>
                    <span v-if="quonoff==true">
                        <van-icon name="clear" @click="close" />
                        <img class="dialogue" src="../../../img/farmImg/farm_btn_framewhite.png" alt="">
                        <div class="imgbox">
                            <div>
                                <img src="../../../img/farmImg/farm_bg_chicken.png" alt=""> x
                                <i>{{chickens.count}}</i>
                            </div>
                            <div>
                                <img src='../../../img/farmImg/farm_bg_duck.png' alt=""> x
                                <i>{{ducks.count}}</i>
                            </div>
                        </div>
                    </span>

                </div>
            </div>
            <!-- 三朵云 -->
            <div class="cloud">
                <img src="../../../img/farmImg/cloud1.png" alt="">
                <img src="../../../img/farmImg/cloud2.png" alt="">
                <img src="../../../img/farmImg/cloud3.png" alt="">

            </div>
           
            <div class="turn">
                <img src="../../../img/farmImg/windmill_img.png" alt="">
            </div>
            <div class="character" v-if='!onoff'>
               <div @click='goDuckhouse'>
                  <img class="yaImg" src="../../../img/farmImg/windmill_img_yun.png" alt="">
                <p class="ya">
                    <span>点击进入</span>
                    <span>鸭窝</span>
                </p>
               </div>
                <div @click='goHenhouse'>
                  <img class="jiImg" src="../../../img/farmImg/windmill_img_yun.png" alt="">
                <p class="ji">
                    <span>点击进入</span>
                    <span>鸡窝</span>
                </p>
                </div>
            </div>
            <div class="shop" v-if="onoff">
                 <div class="shopping" v-if="shoponoff">
                <div class="shopleft">
                   <div class="imgdiv">
                        <img src="../../../img/farmImg/farm_bg_chicken.png" alt="" v-if='animal_id==1'>
                          <img src="../../../img/farmImg/farm_bg_duck.png" alt="" v-if='animal_id==2'>
                           <img :src="product_img_url" alt="" v-if='product_id'>
                           <!-- <img src="../../../img/farmImg/_20180705103313.png" alt="" v-if="animal_id==null"> -->
                   </div>
                   
                        <van-stepper v-model="num1" :integer='true'/>
      
                </div>
                <div class="shopright">
                    <p>
                        <span>{{animal_name}},{{product_name}}</span>
                        <van-icon name="clear" @click="shoponoff=false" />
                    </p>
                   <div>
                        <p>
                        <span>售价：</span>￥<i>{{unit_price}}</i>
                    </p>
                   
                        <button @click="buy(animal_id,product_id,unit_price)">购买</button>
                        <!-- <button>出售</button> -->

                   </div>

                </div>
            </div>
                <van-icon name="close" @click="close" />
                <img src="../../../img/farmImg/farm_bg_greeninterval.png" alt="">
                <div class="nav">
                    <ul>
                        <li v-for='(item,index) in list' :key="index" :class='{active:flag==index}' @click='shop(index)'>{{item}}</li>
                    </ul>
                </div>
                <div class="commodity">
                   <div class="Gf">
                      <div class="father" v-for="(i,index) in zoolist" :key="index">
                        <div @click="shopping(i.animal_name,i.unit_price,i.animal_id,i.product_name,i.product_id,i.product_img_url)">
                            <span>{{i.animal_name}}</span>
                            <span>{{i.product_name}}</span>
                            <p>
                                <img v-if='i.animal_id==1' src='../../../img/farmImg/farm_bg_chicken.png' alt="">
                                 <img v-if='i.animal_id==2' src='../../../img/farmImg/farm_bg_duck.png' alt="">
                            </p>
                            <i>
                                ￥{{i.unit_price}}
                            </i>
                        </div>
                    </div>
                   </div>


                </div>

            </div>

        </div>
        <v-footer></v-footer>

    </div>
</template>

<script>
import Footer from "@/common/_footer.vue";
import { Toast } from "vant";
export default {
  components: {
    "v-footer": Footer
  },
  data() {
    return {
      onoff: false,
      germchit: true,
      fodder: false,
      vaccine: false,
      firstAid: false,
      deal: false,
      quonoff: false,
      shoponoff: false,
      flag: 0,
      token: "",
      chickens: {},
      ducks: {},
      type: 1,

      zoolist: [],
      animal_name: "",
      animal_id: "",
      unit_price: "",
      product_name: "",
      product_img_url: "",
      product_id: "",
      userall:{},

      //   购买数量
      num1: 1,
      list: ["种苗", "饲料","急救包", "疫苗", "仓库"]
    };
  },
  created() {
    this.gettoken();
  },
  mounted() {
    this.getfarm();
    // this.shop();
    this.getShopfarm();
  },
  methods: {
    // 获取农场1饲料;2:急救包;3:疫苗产品
    shop(index) {
      this.flag = index;
      if(index==0){
        this.zoolist = [];
        this.getShopfarm();
      }else if(index==4){
        // 仓库
        this.zoolist = [];
        this.$http.get(this.HOME+'/farm/GetUserProduct?token='+this.token).then(res=>{
          console.log(res);
          this.userall = res.data.Data
        })
        
      }
      else{
        this.zoolist = [];
          this.$http.get(this.HOME+"/farm/GetProduct?type=" + index).then(res => {
            console.log(res);
        this.zoolist = res.data.Data;
      });
      }
    },
    // 获取仓库的产品
    getmarket(){
      this.$http.get
    },
    // 关闭
    close() {
      this.onoff = false;
      this.quonoff = false;
    },
    // 动物数量
    quantity() {
      this.quonoff = true;
    },
    // 去鸡窝
    goHenhouse() {
      this.$router.push({ path: "/henhouse?animalId=1" });
    },
    // 去鸭窝
    goDuckhouse() {
      this.$router.push({ path: "/duckhouse?animalId=2" });
    },

    // 点击商品图片
    shopping(Aname, Aprice, Aid, Pname, Pid, img) {
      this.shoponoff = true;
      this.animal_name = Aname;
      this.animal_id = Aid;
      this.unit_price = Aprice;
      this.product_name = Pname;
      this.product_img_url = img;
      this.product_id = Pid;
    },
    gettoken() {
      this.token = localStorage.getItem("Token");
    },
    // 购买动物
    buy(id,Pid,price) {
      var allprice = this.num1 * price;
      if(id){
        this.$http
        .post("/farm/BuyAnimal", {
          Token: this.token,
          animalId: id,
          quantity: this.num1,
          amount: allprice
        })
        .then(res => {
          console.log(res);
          Toast(res.data.Message);
          setTimeout(() => {
            this.shoponoff = false;
          }, 2000);
        });
      }
      if(Pid){
      this.$http.post(this.HOME+'/farm/BuyProduct',{
        Token:this.token,
        pId:Pid,
        quantity:this.num1,
        amount:allprice
      }).then(res=>{
        console.log(res);
        Toast(res.data.Message);
          setTimeout(() => {
            this.shoponoff = false;
          }, 2000);
      })
        
      }
    },


    // 获取农场已有的动物
    getfarm() {
      this.$http.get(this.HOME+"/farm/index?token=" + this.token).then(res => {
        // console.log(res);
        this.chickens = res.data.Data.chicken;
        this.ducks = res.data.Data.duck;
      });
    },
    // 获取农场商店动物
    getShopfarm() {
      this.$http.get(this.HOME+"/farm/GetAnimal").then(res => {
        // console.log(res);
        this.zoolist = res.data.Data;
      });
    }
  }
};
</script>
<style scoped lang="less">
.turn {
  width: 4rem;
  height: 4rem;
  display: inline-block;
  position: absolute;
  top: 62vw;
  left: 10vw;
  img {
    width: 100%;
    height: 100%;
  }
}

.tmpl {
  width: 100%;
  height: 100vh;
}

.box {

  height: 100%;
  background-image: url("../../../img/farmImg/yangzhi.jpg");
  background-size: 100%;
}

.turn {
  width: 4rem;
  height: 4rem;
  display: inline-block;
  position: absolute;
  animation: loadRotate 5s linear infinite;
  img {
    width: 100%;
    height: 100%;
  }
}

.cloud {
  width: 100%;
  img:nth-child(1) {
    width: 5rem;
    transform: translate(20rem, 2rem);
    animation: img1 20s linear 0s alternate infinite;
  }
  img:nth-child(2) {
    width: 6rem;
    transform: translate(3rem, 4rem);
    animation: img2 10s linear 1s alternate infinite;
  }
  img:nth-child(3) {
    width: 7rem;
    transform: translate(-20rem, 6rem);
    animation: img3 20s linear 2s alternate infinite;
  }
}

// 文字云
.character {
  width: 100%;
  height: 100vh;
  position: relative;
  img {
    width: 25vw; // height:
  }
  .yaImg {
    position: absolute;
    left: 2vw;
    top: 88vw;
  }
  .jiImg {
    position: absolute;
    right: 26vw;
    top: 72vw;
  }
  p {
    width: 18vw;
    text-align: center;
    font-size: 0.6rem;
    color: #eb9c03;
    font-weight: 700;
    span {
      display: block;
    }
  }
  .ya {
    position: absolute;
    left: 6vw;
    top: 94vw;
  }
  .ji {
    position: absolute;
    right: 29vw;
    top: 78vw;
  }
}

// 工具
.tool {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  padding-top: 10vw;
  div {
    color: #fff;
    font-size: 0.6rem;
    width: 17vw;
    text-align: center;
  }
  div:nth-child(1) {
    img {
      width: 10vw;
    }
  }
  div:nth-child(2) {
    .van-icon {
      position: absolute;
      top: -0.5rem;
      right: -0.4rem;
      color: #666;
      font-size: 0.9rem;
    }
    img {
      width: 8vw;
    }
    span {
      position: absolute;
      top: 25vw;
      left: 15vw;
      .dialogue {
        width: 25vw;
      }
      .imgbox {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0vw;
        left: 0vw;
        div {
          width: 100%;
          height: 50%;
          padding-top: 1vw; // display: flex;
          // justify-content: center;
          // align-items: center;
          color: #666;
          img {
            margin-right: 3vw;
          }
          i {
            font-size: 1rem;
            color: #00ad8a;
            border-bottom: 2px solid #ff8400;
            margin-left: 2vw;
          }
        }
      }
    }
  }
}

// 商品
.shop {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 13vw;
  .van-icon {
    position: absolute;
    top: 0.6rem;
    right: 1rem;
    font-size: 1.3rem;
  }
  img {
    width: 100%;
    height: 12vh;
  }
  .nav {
    padding: 0 3vh; // width: 100%;
    height: 6vh;
    margin-top: -6.5vh;

    border: 1px solid #ccc;

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      border-radius: 0.6rem;
      li {
        background-color: #ffde7b;
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #82490d;
        font-size: 0.6rem;
      }
      li:first-child {
        border-top-left-radius: 0.6rem;
      }
      li:last-child {
        border-top-right-radius: 0.6rem;
      }
      .active {
        color: #6a3906;
        font-weight: 900;
        font-size: 0.9rem;
      }
      .big {
        color: red;
        font-size: 0.8rem;
      }
    }
  }
  .commodity {
    // width: 100%;
    height: 21vh;
    
    .Gf {
      overflow-x: scroll;
    overflow-y: hidden;
      width: 100%;
      white-space: nowrap;
      height: 100%;
      // -webkit-overflow-scrolling: touch;
       background-color: #fde196;
    }
    .father {
      
      padding: 1rem;
      display: inline-block;
      width:8rem;
      height: 80%;
      // float: left;
      position: relative;
      div {
        background-color: #fff;
        width: 100%;
        height: 100%;

        p {
          width: 100%;
          display: flex;
          justify-content: center;
          img {
            width: 3rem;
            height: 3rem;
          }
        }
        span {
          display: inline-block;
          padding: 0.2rem 0 0 0.6rem;
          font-size: 0.6rem;
        }
        i {
          display: inline-block;
          background: rgba(0, 173, 138, 0.4);
          color: #fff;
          border-radius: 1rem;
          padding: 0 0.2rem;
          position: absolute;
          right: 1.5rem;
          bottom: 1.3rem;
          font-size: 0.6rem;
        }
      }
    }
  }
}
// 购买
.shopping {
  position: absolute;
  top: -45vw;
  width: 100%;
  height: 45vw;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  .shopleft {
    width: 50%;
    text-align: center;
    .imgdiv {
      width: 16vw;
      height: 16vw;
      background-color: #fff;
      padding: 2vw;
      margin: 8vw auto 2vw;
      border-radius: 2vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .shopright {
    flex: 1;
    p {
      color: #fff;
    }
    p:nth-child(1) {
      display: flex;
      padding-top: 3vw;
      justify-content: space-between;
      span {
        font-size: 0.7rem;
      }
      .van-icon {
        // font-size: .8rem;
      }
    }
    div {
      padding-top: 8vw;
      p {
        height: 10vw;
        line-height: 10vw;
        span:nth-child(1) {
          font-size: 1rem;
        }
        i {
          font-size: 1.8rem;
          flex: 1;
        }
      }
      button {
        width: 30vw;
        padding: 2vw;
        background-color: #02e2b0;
        color: #fff;
        border-radius: 1rem;
      }
    }
  }
}
.van-stepper {
  .van-stepper__input {
    margin-left: none !important ;
  }
}

@keyframes loadRotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

@keyframes img1 {
  from {
    transform: translate(20rem, 1rem);
  }
  to {
    transform: translate(-4rem, 2rem);
  }
}

@keyframes img2 {
  from {
    transform: translate(3rem, 4rem);
  }
  to {
    transform: translate(10rem, 4rem);
  }
}

@keyframes img3 {
  from {
    transform: translate(-20rem, 8rem);
  }
  to {
    transform: translate(20rem, 8rem);
  }
}
</style>