<template>
    <div class="tmpl">
        <div class="box">
            <div class="head">
                <div @click='$router.go(-1)'>
                    <van-icon name="arrow-left" /> 返回
                </div>
                <div @click='getrizi'>
                    <img src="../../../img/farmImg/farm_bg_more.png" alt="">
                </div>
            </div>
            <div class="allduck">
                <div class="small">
                    <img src="../../../img/farmImg/farm_bg_duck.png" alt="">
                    <img src="../../../img/farmImg/farm_bg_duck.png" alt="">
                    <img src="../../../img/farmImg/farm_bg_duck.png" alt="">
                </div>
                <div class="big">
                    <img src="../../../img/farmImg/farm_bg_duck.png" alt="">
                    <img src="../../../img/farmImg/farm_bg_duck.png" alt="">
                    <img src="../../../img/farmImg/farm_bg_duck.png" alt="">
                </div>
            </div>
            <div class="swim">
                <img src="../../../img/farmImg/goduck.gif" alt="">
                <img src="../../../img/farmImg/goduck.gif" alt="">
            </div>
            <div class="tool">  
                <img class="food" src="../../../img/farmImg/farm_bg_chickenslot.png" alt="">

                <div @click='getfoot(1)'>
                    <img src="../../../img/farmImg/farm_btn_foodstuff.png" alt="">
                    <p>粮食</p>
                    <span v-if="quonoff==true">
                        <van-icon name="clear" @click="close" />

                        <div class="imgbox">
                            <img class="dialogue" src="../../../img/farmImg/farm_btn_framegreen.png" alt="">
                            <div class="btns">
                                <button>去购买</button>
                                <button>取消</button>
                            </div>
                            <p>
                                温馨提示：已无粮食，需要购买，否则小鸡会饿晕！！
                            </p>
                        </div>
                    </span>
                </div>
                <div>
                    <img src="../../../img/farmImg/farm_btn_egg.png" alt="">
                    <p>鸡蛋</p>
                </div>
                <div  @click='getfoot(3)'>
                    <img src="../../../img/farmImg/farm_btn_vaccine.png" alt="">
                    <p>疫苗</p>
                    <span v-if="quonoff==true">
                        <van-icon name="clear" @click="close" />

                        <div class="imgbox">
                            <img class="dialogue" src="../../../img/farmImg/farm_btn_framegreen.png" alt="">
                            <div class="btns">
                                <button>去购买</button>
                                <button>取消</button>
                            </div>
                            <p>
                                为了小鸡的健康，每只小鸡在60天内需要种植疫苗4次，每半个月一次。
                            </p>
                        </div>
                    </span>
                </div>
                <div @click='getfoot(3)'>
                    <img src="../../../img/farmImg/farm_btn_firstaidkit.png" alt="">
                    <p>急救包</p>
                    <span v-if="quonoff==true">
                        <van-icon name="clear" @click="close" />

                        <div class="imgbox">
                            <img class="dialogue" src="../../../img/farmImg/farm_btn_framegreen.png" alt="">
                            <div class="btns">
                                <button>去购买</button>
                                <button>取消</button>
                            </div>
                            <p>
                                温馨提示：小鸡已饿晕，请立即购买急救包，否则小鸡会死掉！！
                            </p>

                        </div>
                    </span>
                </div>

            </div>

            <van-popup v-model="onoff" position="bottom" :overlay="true">
                <div class="shop">
                    <van-icon name="close" @click="close" />
                    <div class="commodity">
                        <div class="cleft">
                            <span>{{food.product_name}}</span>
                            <div class="imgfather">
                                <img class="dialogue" v-if="food.product_img_url" :src="food.product_img_url" alt="">
                            </div>
                            <!-- <img class="dialogue" v-if="food.product_img_url==null" src="../../../img/farmImg/_20180705103313.png" alt=""> -->
                            <div>
                                <img src="../../../img/farmImg/farm_btn_lefttriangle.png" alt="" @click='minus'>
                                <i>{{quantity}}</i>
                                <img src="../../../img/farmImg/farm_btn_righttriangle.png" alt="" @click='add(food.quantity)'>
                            </div>
                        </div>
                        <div class="cright">
                            
                            <div>
                              
                               <span>{{food.product_name}},{{food.remark}}</span>
                                <span>当前剩余：{{food.quantity}}</span>
                                
                            </div>
                            <button @click='getemploy(food.product_id)'>立刻使用</button>
                        </div>
                    </div>
                    <div class="ctitle">
                        <span>喂养</span>
                    </div>

                </div>
            </van-popup>
            <van-popup v-model="show" position="bottom" :overlay="true" style="overflow-y: scroll;">
              <div class="scontent">
                    <div class="ctitle">
                        <span>成长日记</span>
                        <van-icon name="close" @click='close' />
                    </div>
                    <van-steps direction="vertical" :active="0" active-color="#0bb794">
                        
                        <van-step v-for='(item,index) in msglist' :key="index">
                         <div class="scimg">
                             <img src="../../../img/farmImg/farm_btn_framegreen.png" alt="">
                             <div>
                                 <span>{{item.created_date|formatDate}}</span>
                                 <p>{{item.remark}}</p>
                             </div>
                         </div>
                        </van-step>    
                    </van-steps>
              </div>
            </van-popup>

            <v-baseline v-if="nomore"></v-baseline>
        </div>

    </div>
</template>

<script>
import Baseline from "@/common/_baseline.vue";
import { formatDate } from "../../../src/assets/js/data.js";
import { Toast } from "vant";
export default {
  components: {
    "v-baseline": Baseline
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      onoff: false,
      quonoff: false,
      show: false,
      token: "",
      page: 1,
      loading: true,
      nomore: false,
      finished: false,
      msglist: [],
      type: 1,
      animalId: "",
      quantity: 1,
      food: {}
    };
  },
  created() {
    this.getToken();
    // this.getfoot();
  },
  methods: {
    getToken() {
      this.token = localStorage.getItem("Token");
      this.animalId = this.$route.query.animalId;
    },
    // 关闭
    close() {
      this.show = false;
      this.onoff = false;
    },
    //获取对应的食物、疫苗、急救包
    getfoot(type) {
        console.log(type);
      this.onoff = true;
      this.type = type;
      console.log( this.type);
      this.$http
        .get(
          this.HOME+"/farm/GetAnimalProduct?token=" +
            this.token +
            "&animalId=" +
           this.animalId +
            "&type=" +
            this.type
        )
        .then(res => {
            console.log(res); 
            if(res.data.Data=[]){
            }
             this.food = res.data.Data[0];
          
        });
    },
    minus() {
      if (this.quantity) {
        this.quantity--;
        if (this.quantity == 0) {
          this.quantity = 1;
        }
      }
    },
    add(all) {
      if (this.quantity) {
        this.quantity++;
        if (this.quantity > all) {
          Toast("喂食不能超过剩余粮食~");
          this.quantity = all;
          return;
        }
      }
    },
    // 喂食、使用急救包、使用疫苗
    getemploy(pId) {
      var obj = {};
      obj.token = this.token;
      obj.animalId = this.animalId;
      obj.type = this.type;
      this.$http
        .get(
          "/farm/Eatting?token=" +
            this.token +
            "&animalId=" +
            this.animalId +
            "&type=" +
            this.type +
            "&pId=" +
            pId+"&quantity="+this.quantity
        )
        .then(res => {
          console.log(res);
           Toast(res.data.Message);
        });
    },
    // 获取成长日记
    getrizi() {
      this.show = true;
      this.$http
        .get(this.HOME+"/farm/GetFeeding?token=" + this.token + "&page=" + this.page)
        .then(res => {
          console.log(res);
          var arr = [];
          arr = res.data.Data.List;
          console.log(arr);
          if (arr.length == 10) {
            this.page++;
          } else {
            console.log("已加载全部");
          }
          arr.forEach(val => {
            var str = "";
            str = val.created_date;
            var num = parseInt(str.replace(/[^0-9]/gi, ""));
            val.created_date = num;
            this.msglist.push(val);
          });
          console.log(this.msglist);
        });
    }
  }
};
</script>
<style scoped lang='less'>
.tmpl {
  width: 100%;
  height: 100vh;
}
.scontent {
  height: 60vh;
  .ctitle {
    padding: 0 1rem;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #0bb794;
      border-bottom: 1px solid #0bb794;
      padding-bottom: 0.5rem;
    }
    .van-icon {
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 2rem;
      font-size: 1.6rem;
    }
  }
  .scimg {
    width: 100%;
    img {
      max-width: 90%;
      height: 5rem;
    }
    div {
      padding: 1rem;
      width: 80%;
      height: 5rem;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.box {
  width: 100%;
  height: 100%;
  background-image: url("../../../img/farmImg/_20180704182223.png");
  background-size: 100%;
  .head {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    div {
      display: flex;
      align-items: center;
      padding-right: 3vw;
      img {
        width: 6vw;
      }
    }
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
.swim {
  width: 120%;
  height: 3rem;
  position: absolute;
  top: 70vh;
  img {
    width: 50vw;
  }
  img:nth-child(1) {
    transform: translateX(-1rem);
  }
  img:nth-child(2) {
    transform: translateX(5rem);
    transform: rotateY(180deg);
  }
}

.allduck {
  position: absolute;
  width: 100%;
  top: 52vh;
  left: 30vw;
  .small {
    img {
      width: 5vw;
    }
  }
  .big {
    width: 100%; // margin-top: 1rem;
    img {
      width: 8vw;
    }
  }
}

// 工具
.tool {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  padding-top: 2vw;

  .food {
    width: 15vw;
    position: absolute;
    top: 76vw;
    left: 8vw;
  }
  div {
    color: #fff;
    font-size: 0.6rem;
    width: 17vw;
    text-align: center;
  }
  div {
    padding: 1vw 0;
    position: relative;
    img {
      width: 8vw;
    }
    .dialogue {
      width: 40vw;
      height: 15vw;
    }
    .imgbox {
      width: 40vw;
      height: 100%;
      position: absolute;
      top: 0vw;
      left: 15vw;
      p {
        //   width: 100%;
        position: absolute;
        top: 0;
        left: 3vw;
        color: #000000;
        font-size: 0.6rem;
        text-align: left;
        padding: 2vw 0;
      }
      .btns {
        margin-top: -1vw;
        display: flex;
        justify-content: flex-end;
        height: 1.5rem;
        button {
          width: 49.2%;
          font-size: 0.6rem;
        }
        button:nth-child(1) {
          background-color: #0bb794;
          color: #fff;
        }
      }
      div {
        width: 100%;
        height: 50%;
        padding-top: 1vw; //
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

// 商品
.shop {
  width: 100%;
  position: fixed;
  bottom: 0;
  .ctitle {
    position: absolute;
    top: -2.7rem;
    left: 1rem;
    width: 25vw;
    height: 2.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eacf7e;
    border: 1px solid #0bb794;
    color: #6a3906;
    border-bottom: none;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
  } //   margin-bottom: 13vw;
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
        background-color: #eacf7e;
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
    height: 13rem;
    display: flex;
    justify-content: space-between;
    background-color: #eacf7e;
    border-top: 1px solid #0bb794;
    display: flex;
    justify-content: space-between;
    color: #6a3906;
    .cleft {
      width: 30%;
      text-align: right;
      padding-top: 0.8rem;
      .imgfather {
        display: inline-block;
        width: 15vw;
        height: 15vw;
        margin: 1rem 0.6rem 0.5rem 0;
        background-color: #fff;
        .dialogue {
          width: 15vw;
          height: 15vw;
        }
      }
      span {
        padding: 0.4rem;
        background-color: rgba(19, 213, 173, 0.3);
        border-radius: 2rem;
        color: #fff;
      }

      div {
        img {
          width: 4vw;
          height: 5vw;
        }
        i {
          padding: 0 3vw;
          border: 1px solid #0bb794;
          border-radius: 2rem;
        }
      }
    }
    .cright {
      flex: 1;
      padding-left: 1rem;
      height: 100%;
      button {
        padding: 0.2rem 0.8rem;
        color: #fff;
        background-color: #0bb794;
        border-radius: 2rem;
      }
      div {
        padding: 3rem 0;

        span {
          display: block;
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
    margin-left: none !important;
  }
}
</style>