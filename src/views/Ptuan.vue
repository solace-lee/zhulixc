<template lang="html">
  <div class="detail">
    <div class="swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="i in datas" :key="i.id">
          <img :src="i.imgUrl">
        </mt-swipe-item>
      </mt-swipe>
      <div class="groupShop">
        <div class="gsleft">
          <p>
            <span class='salespan'>￥</span><span class='sale'>{{groupBuyingCommodity.groupbuyingAmount}}</span>
           <s><span>￥</span><span>{{groupMsg.originalPrice}}</span></s>
          </p>
          <p>已团人数：{{joinpeople}}人</p>
        </div>
        <div class="gsright">
          <p>开始时间：{{groupBuyingCommodity.startDate|formatDate}}</p>
          <p>结束时间：{{groupBuyingCommodity.endDate|formatDate}}</p>
        </div>
  
      </div>
    </div>
    <section class="chose">
      <div class="chose-view">
        <h1 class="chose-view-title">

          <div class="title">
            <span>
              {{goodsData.name}}
            </span>
            <!-- <i class="el-icon-share share1 share_hide" @click="share_show=true"></i> -->
          </div>
          <div>成团人数：{{groupBuyingCommodity.numberOfpeople}}人</div>
 
          <div style="height:1.8rem;line-height: 1.8rem;" v-if='off'>
            <span>￥</span>
            <span>
              {{goodsData.discountPrice}}
              <!-- {{$store.state.detail.id.commodity.originalPrice}} -->
            </span>
          </div>
          <div class="jage" v-if='off'>
            <span>
              <del>原价{{goodsData.originalPrice}}
                <!-- {{$store.state.detail.id.commodity.originalPrice}} -->
              </del>
            </span>
            <span>库存： {{goodsData.quantity}}
              <!-- {{$store.state.detail.id.commodity.quantity}} -->
              件
            </span>
          </div>
        </h1>

        <p class="chose-view-intro"></p>
      </div>

      <div>
        <div class="chos_fw" @click="show2=true">
          <span>服务</span>
          <span>
            <!-- {{$store.state.detail.id.commodityServers[0].serverName}}*{{$store.state.detail.id.commodityServers[1].serverName}} -->
          </span>
          <span class="el-icon-arrow-right"></span>
        </div>
        <!-- 服务弹层 -->
        <van-popup v-model="show2" position="bottom" :overlay="true">
          <div class="boxf">
            <h1>服务</h1>
            <label class="mint-checklist-label boxf2" v-for="array in serverData ">
              <span class="mint-checkbox">
                <input type="checkbox" class="mint-checkbox-input" value="选项A">

                <span class="mint-checkbox-label ">
                  {{array.serverName}}
                  <p class="p">{{array.serverDescribe}}</p>
                </span>
              </span>
            </label>
            <!-- <button class="btn" @click="show2=false">完成</button> -->
          </div>
        </van-popup>
      </div>

      <div class="chos_fw " @click="buyFlag=true">
        <span>规格</span>
        <div>

          <span>{{text}}</span>
          <!-- <span>{{}}</span> -->
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>

      <router-link :to="{name:'用户评价'}">
        <div class="chos_fw3">
          <span>用户评价({{goodsData.totalComment}})</span>
          <span class="el-icon-arrow-right"></span>
        </div>
      </router-link>

      <div class="chos_fw4" v-for="comment in commentlist">
        <span>
          <img :src="comment.headImgUrl" alt="">
        </span>
        <span>{{comment.nickName}}</span>
        <span>2018.03.22 &nbsp;&nbsp;02.10</span>
        <span>{{comment.content}}</span>
      </div>

      <h1 class="chose_h1">产品详情</h1>
      </router-link>
      <div class="buyGoodsBtn">
        <div class="left-box">
            <div class="gotoshop left-btn" @click='goshop(goodsData.shopId)'>
                <img src="../assets/images/commoditydetails_icon_shop@2x.png" alt="">
                <span>店铺</span>
              </div>
              <div class="shoucang left-btn" @click='getcollect' v-if='Status==500'>
                <img src="../assets/images/576620462228919312.png" alt="">
                <span>收藏</span>
              </div>
              <div class="shoucang left-btn" v-if='Status==200' @click='notcollect'>
                <img src="../assets/images/commoditydetails_icon_collection_pre@2x.png" alt="">
                <span>已收藏</span>
              </div>
        </div>
        <div class="buyBtn">
          <div class="addCart buybtn-btn" @click="tobugGoods">
            <span>￥{{goodsData.originalPrice}}</span>
           <span> 原价购买</span>
          </div>
          <div class="toBuy buybtn-btn" @click="pintuan">
            <span>￥{{groupBuyingCommodity.groupbuyingAmount}}</span>
            <span>一键拼团</span>
          </div>
        </div>
      </div>



      <van-popup v-model="buyFlag" position="bottom" :overlay="true">
        <div class="goodsMsgBox">
          <div class="title">
            <div class="img">
              <img :src="imgUrl" alt="">
            </div>
            <div class="title-right">
              <h3>{{goodsData.name}}</h3>
              
              <div class="title-price">
                <span>
                  <span class='price_symbol'>￥</span>{{orderlist.unitPrice}}</span>
                <span class="discountPrice">
                  <!-- <s>￥{{goodsData.discountPrice}}</s> -->
                </span>
              </div>
              <p>库存
                <span> {{goodsData.quantity}}</span>件</p>

            </div>
            
          </div>
          <div class="commodity">
            <div class="commodityTitle">
              {{commodity.specificationName}}
            </div>
            <div class="commoditylist">
              <span v-for="(comlist,index) in commoditylist" @click="checkThis(index,comlist.csLinkId,comlist.amount,comlist.linkValue)" v-bind:class="{'acrive':flag==index}">{{comlist.linkValue}}</span>

            </div>
            <div class="commodityTitle">
              购买数量
            </div>
            <div class="buyNum">
              <van-stepper v-model="orderlist.quantity" />
            </div>
          </div>

          <div class="goodsMsgBuyBtn">
           <div class="goodsAddCart" @click="goodsAddCart">
              确定
            </div>
           
          </div>
        </div>
      </van-popup>

    </section>
    <section class="content">
      <div class="img-wrap" v-for="k in contentImgs">
        <img :src="k.imgUrl">
      </div>
    </section>

    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import Baseline from "@/common/_baseline.vue";
import { Toast } from "vant";
import {formatDate} from '../assets/js/data.js';
export default {
   filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy'+'年'+'MM'+'月'+'dd'+'日'+' hh:mm');
        }
    },
  components: {
    "v-baseline": Baseline
  },
  data() {
    return {
      text:"请选择类型",
      datas: "",
      id: "",
      userId:"",
      buyFlag: false,
      showshare: true,
      show2: false,
      share_show: false,
      yardage_show: false,
      num7: 1,
      ins: 0,
      off:true,
      // 步进器
      Status: 0,
      serverData: [],
      id: "",
   
      commodity: "",
      flag: 0,
      commoditylist: "",
      goodsData: "",
      contentImgs: "",
      imgUrl: "",
      orderlist: {
        quantity: 1,
        csLinkId: "",
        unitPrice: ""
      },
      commentlist: [],
      // 拼团信息
      groupMsg:'',
         // 拼团id
      groupbuyingId:'',
      // 已团人数
      joinpeople:'',
      groupBuyingCommodity:'',
    };
  },
  created() {
    this.getId();
    this.getSwiper();
    this.getShose();
    this.getcommoditylist();
 
    this.getgroupMsg();
    this.examinecollect();
  },
  methods: {
    examinecollect() {
        this.$http.post(this.HOME+'/usercollect/checkUsercollect', { commodityId: this.id, userId: this.userId}).then(res => {
          console.log(res);
          if (res.data.data == true) {
            this.Status = 200;
          } else if (res.data.data == false) {
            this.Status = 500;
          }
        })
      },
      // 取消收藏商品
      notcollect() {
        this.$http.get(this.HOME+'/usercollect/deleteUsercollect/' + this.userId + '/' + this.id).then(res => {
          console.log(res);
          if (res.data.success == true) {
            this.Status = 500;
            Toast.success("取消收藏");
          }

        })
      },
        // 到店铺
        goshop(shopid) {
        this.$router.push({ path: "/indexS?shopId=" + shopid });
      },
      // 收藏商品
      getcollect() {
        console.log(this.id);
        this.$http
          .post(this.HOME+"/usercollect/insertUsercollect", {
            commodityId: this.id,
            userId: this.userId
          })
          .then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.Status = 200;
              Toast.success("收藏成功");
            }
          });
      },
    // 获取拼团信息；
    getgroupMsg(){
      this.$http.get(this.HOME+'/GroupBuying/queryGroupBuyingByid/'+this.id+'/'+this.groupbuyingId).then(res=>{  
        console.log(res);
        this.groupMsg = res.data.data.commodity;
        this.joinpeople = res.data.data.joinpeople;
        this.groupBuyingCommodity = res.data.data.groupBuyingCommodity;
        console.log(this.groupMsg);
        console.log( this.groupBuyingCommodity);
      })
    },
    getCommentlist() {
      this.$http.post(this.HOME+"/userComment/queryUserCommentByPage", {});
    },
    tobugGoods(){
      sessionStorage.setItem("orderlist", JSON.stringify(this.orderlist));
     
     this.$http
       .post(this.HOME+"/order/insertOrder", {
         shopId: this.goodsData.shopId,
         userId: JSON.parse(sessionStorage.getItem("userInfo")).userId,
         orderDetailsVOs: [this.orderlist]
       })
       .then(res => {
         // console.log(res);
         if (res.data.success) {
           var id = res.data.data;
           this.$router.push({ path: "/queren/?orderId=" + id });
         }
       });
    },
    pintuan(){
      
     console.log(this.orderlist)
     this.orderlist.unitPrice=this.groupBuyingCommodity.groupbuyingAmount
    //  this.orderlist.groupbuyingid=this.groupBuyingCommodity.groupbuyingId
     this.$http
       .post(this.HOME+"/order/insertOrder?groupbuyingid="+this.groupBuyingCommodity.groupbuyingId, {
         shopId: this.goodsData.shopId,
         userId: JSON.parse(sessionStorage.getItem("userInfo")).userId,
         orderDetailsVOs: [this.orderlist],
       })
       .then(res => {
         console.log(res);
         if (res.data.success) {
           var id = res.data.data;
           this.$router.push({ path: "/queren/?orderId=" + id });
         }
       }).catch(err=>{
         console.log(err.response)
       })
    },
    goodsAddCart() {
      Toast("已选中"+this.text)
      this.buyFlag = false;
     
    },
  
    checkThis(index, id,amount,value) {
      console.log(index, id,amount,value)
      this.text=value
      this.orderlist.unitPrice=amount
      this.orderlist.csLinkId = id;
      this.flag = index;
        // Toast("已选中"+value)
      setTimeout(()=>{
      // this.buyFlag=false
      },500)
    },
  
    // 打开详情页
    getShose() {
      this.$http
        .get(this.HOME+"/commodity/queryFrontCommodityById", {
          params: { commodityId: this.id, userId: this.$route.params.userId }
        })
        .then(res => {
          console.log(res);
          this.goodsData = res.data.data.commodity;
          this.goodsData.totalComment = res.data.data.totalComment;
          //  = res.data.data.commodityImgs[0].imgUrl;
          this.commentlist = res.data.data.userCommentVOs;
          if (this.commentlist) {
              this.commentlist.forEach(val => {
                val.createdDate = this.getTime(val.createdDate)

              });

            }
          this.contentImgs = res.data.data.commodityImgs;
          this.serverData = res.data.data.commodityServers;
          // console.log(this.serverData);
        });
    },
    getTime(d) {
        var time = new Date(d)
        var y = time.getFullYear()
        var m = time.getMonth(+1)
        var d = time.getDate()
        return y + "-" + m + "-" + d
      },
    // 获取页面详情 规格
    getcommoditylist() {
      this.$http
        .get(
          this.HOME+"/commoditySpecification/querySpecificationByCommodityId/" + this.id
        )
        .then(res => {
          // console.log(res);
          this.commodity = res.data.data.commoditySpecification;
          this.commoditylist = res.data.data.linkCommoditySpecifications;
          this.orderlist.csLinkId = this.commoditylist[0].csLinkId;
          this.orderlist.unitPrice = this.commoditylist[0].amount;
        });
    },
// 获取id
    getId() {
      this.id = this.$route.query.id;
      this.userId=JSON.parse(sessionStorage.getItem("userInfo")).userId
      this.groupbuyingId = this.$route.query.groupbuyingId; 
      if( this.groupbuyingId){
        this.off=false;
      }
    },
    // 轮播
    getSwiper() {
      this.$http
        .post(this.HOME+"/commodityImg/queryCommodityImgByCommodityId", {
          commodityId: this.id,
          imgType: 1
        })
        .then(res => {
          // console.log(res);
          this.datas = res.data.data.data;
          this.imgUrl = this.datas[0].imgUrl;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
.content {
  width: 100%;

  background-color: #fff;
  .img-wrap {
    padding: 0 0.5rem;
    img {
      width: 100%;
    }
  }
}

.detail {
  overflow: hidden;
  width: 100%;
  padding-bottom: 14vw;
}

.swiper {
  width: 100%;
  height: 23rem;
 position: relative;
  .mint-swipe {
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.buyGoodsBtn {
  width: 100%;
  height: 4rem;
  background-color: #f2f2f2;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}

.left-box {
  width: 40%;
  height: 100%;
  display: flex;
}

.gotoshop i {
  color: #fc0;
}

.shoucang i {
  color: #cc2b35;
}

.left-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 1.2rem;
    padding: 0.2rem 0;
  }
  span {
    padding: 0.1rem 0;
    font-size: 0.8rem;
  }
}

.buyBtn {
  width: 60%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.5rem;
}

.buybtn-btn {
  width: 40%;
  height: 2.5rem;
  /* line-height: 2.5rem; */
  text-align: center;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column ;
}

.addCart {
  background-color: #ee6870;
  border-radius: 2.5rem 0 0 2.5rem;
}

.toBuy {
  background-color: #cd2a34;
  border-radius: 0 2.5rem 2.5rem 0;
}

.goodsMsgBox {
  overflow-y: scroll;
  background-color: #fff;
  width: 100%;
  height: 70vh;
padding-top: 1rem;
border-radius: 10px 10px 0 0 ;
  border-top: 1px solid #ccc;
}

.title {
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .price_symbol {
    font-size: 0.3rem;
  }
  .discountPrice {
    font-size: 0.8rem;
    color: #666;
  }
}

.img {
  // transform: translate(0.5rem, -1.5rem);
  width: 25%;
  height: 100%;
  img {
    width: 100%;
  }
}

.title-right {
  box-sizing: border-box;
  padding-left: 0.8rem;
  width: 65%;
  line-height: 2rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  p {
    font-size: 0.8rem;
  }
}

.titletext {
  widows: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-price {
  font-size: 1.2rem;
  color: #cd2a34;
}

.closeBtn {
  background-color: #eee;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 50%;
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  text-align: center;
  img {
    width: 80%;
    height: 80%;
  }
}

.commodity {
  padding: 2.5rem 0.5rem 0.5rem 0.5rem;
  border-top: 1px solid #eee;
}

.commodityTitle {
  font-size: 1rem;
  color: #000;
}

.commoditylist {
  padding: 1rem 0;
}

.commoditylist span {
  margin: 0.2rem;
  display: inline-block;
  height: 1.3rem;
  line-height: 1.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 1.3rem;
  background-color: #ccc;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
}

.commoditylist .acrive {
  background-color: #cc2b35;
  color: #fff;
}

.buyNum {
  display: flex;
  justify-content: flex-end;
  .van-stepper .van-stepper__input {
    margin-left: 0;
  }
  input {
    margin-left: 0;
  }
}

.goodsMsgBuyBtn {

  width: 90%;
  height: 4rem; 
  margin: 0.5rem auto;
   div {
     border-radius:1.5rem;
     background-color: #ff6565;
   width:100%;
    height: 1.5rem;
    float: left;
    text-align: center;
    padding: 0.6rem 0;
    color: #fff;
    letter-spacing: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
}

.chose-view .chose-view-title .title {
  font-size: 0.6rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  padding: 0.2rem;
  span {
    color: #333;
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// 分享
.share1 {
  margin: 0 0.5rem;
  width: 1rem;
  color: #999;
  font-size: 22px;
}

.chose-view-title {
  background-color: #fff; //   border: 1px solid #000;
  margin-bottom: 5px;
  padding-left: 10px;

  span:nth-of-type(1) {
    font-size: 10px;
    color: #cd2a34;
  }
  span:nth-of-type(2) {
    font-size: 1.2rem;
    color: #cd2a34;
    margin-left: -5px;
  }
  .jage {
    width: 98%; // border: 1px solid #000;
    display: flex;
    height: 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #666;
      font-size: 0.6rem;
    }
  }
}

.chose {
  background-color: #eee;
  width: 100%;

  /* line-height: 40px; */
  font-size: 15px;
  color: rgba(172, 169, 169, 0.925);

  > span:nth-of-type(2) {
    //   border: 1px solid #000;
    font-size: 15px;
    color: #000;
  }
  > span:nth-of-type(3) {
    font-size: 15px; //    margin-left: 50px;
    //    border: 1px solid #000;
    position: absolute;
    right: 10px;
    top: 11px;
  }
}

.chos_fw {
  margin-top: 6px;
  background-color: #fff;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.8rem;
}

.chos_fw3 {
  // border: 1px solid #000;
  background-color: #fff;
  margin-top: 6px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #000;
  padding-left: 5px;
  position: relative;
  > span:nth-of-type(2) {
    font-size: 18px;
    color: #ccc; // margin-left: 210px;
    position: absolute;
    right: 10px;
    top: 11px;
  }
}

.chos_fw4 {
  width: 100%;
  height: 100px;
  border: 1px solid #eee;
  background-color: #fff;
  position: relative;
  > span:nth-of-type(1) {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin-left: 10px;
    margin-top: 10px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  > span:nth-of-type(3) {
    // border: 1px solid red;
    font-size: 14px;
    position: absolute;
    right: 5px;
    top: 23px;
  }
  > span:nth-of-type(4) {
    // border: 1px solid #000;
    position: absolute;
    top: 70px;
    width: 100%;
    left: 10px;
    font-size: 12px;
  }
}

.chose_h1 {
  background-color: #fff;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-indent: 1em;
  margin-top: 5px;
}

//分享弹出层
.share_box {
  // width: 100%;
  height: 400px;
  border: 1px solid #000;
  width: 99%;
  height: 350px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 10px;

  h1 {
    width: 100%;
    height: 50px; // text-align: center;
    line-height: 50px; // border: 1px solid red;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    text-indent: 1em;
    position: relative;
    .share_hide {
      // border: 1px solid #000;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .share_box3 {
    width: 100%;
    height: 50px;

    display: flex;
    position: relative;
    top: 120px;
    align-items: center;
    justify-content: center;
    .btn {
      width: 90%;
      height: 50px; // background-color: #e24e56;
      color: #000; // margin-top: 50px;
      border-radius: 25px;
      position: absolute;
      bottom: 0;
      border: 1px solid #ccc;
    }
  }
  .share_box2 {
    // border: 1px solid #000;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center; // justify-content: center;
    flex-wrap: wrap; //  flex-direction: column;
    .box22 {
      // border: 1px solid #000;
      text-align: center;
      > img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin: 15px; // border: 1px solid #000;
      }
    }
  }
} //服务弹出层
.van-popup--bottom {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.boxf {
  width: 100%;
  height: 18rem;
  width: 99%;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 10px;
  h1 {
    width: 100%;
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .boxf2 {
    line-height: 1.6rem;
    font-size: 0.8rem;
    /* display: flex;
   align-items: center;  */
  }
  .p {
    padding-left: 1rem;
    display: inline;
  }
  .btn {
    width: 100%;
    height: 3rem;
    background-color: #e24e56;
    color: #fff;
    margin-top: 50px;
  }
} //颜色分类弹出层
.yardage {
  border: 1px solid #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #ccc;
  }
  > .yardage2 {
    display: flex;
    align-items: center;
    margin: 10px;

    > div {
      // border: 1px solid #000;
      &:nth-of-type(1) {
        border: 1px solid #000;
        width: 80px;
        height: 80px;
        flex-grow: 1;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-of-type(2) {
        //  border: 1px solid #000;
        display: flex;
        flex-direction: column;
        flex-grow: 3; //  width: 150px;
        font-size: 12px;
        height: 30px;
        position: relative;
        text-indent: 2em; // top: 30px;
        > span {
          // position: absolute;
          // border: 1px solid #000;
          &:nth-of-type(1) {
            // border: 1px solid #000;
            position: absolute;
            top: 3px;
            left: 1px;
            color: #cd2a34;
            font-size: 8px;
          }
          &:nth-of-type(2) {
            // border: 1px solid #000;
            color: #cd2a34;
          }
          &:nth-of-type(5) {
            position: absolute;
            top: -35px;
            right: 20px;
          }
        }
      }
    }
  }
  .yardage3 {
    // border: 1px solid #000;
    text-indent: 1em;
    height: 60px;
    > button {
      // border: 1px solid #000;
      width: 50px;
      height: 20px;
      border-radius: 12.5px;
      margin-left: 25px;
      margin-top: 5px;
      font-size: 10px;
      &:active {
        background-color: #cd2a34;
        color: #fff;
      }
    }
  }
  .yardage4 {
    // border: 1px solid #000;
    text-indent: 1em;
    height: 60px;
    > button {
      // border: 1px solid #000;
      width: 50px;
      height: 20px;
      border-radius: 12.5px;
      margin-left: 25px;
      margin-top: 5px;
      font-size: 10px;
    }
  }
  .yardage5 {
    border-top: 1px solid #ccc;
    text-indent: 1em;
    display: flex;
    position: relative;
    padding-top: 20px;
    > .counter {
      // border: 1px solid #000;
      position: absolute;
      right: 10px;
    }
    .yardage_btn {
      // border: 1px solid #000;
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      > button {
        // border: 1px solid #000;
        width: 140px;
        height: 50%;
        color: #fff;
        font-size: 14px;
        &:nth-of-type(1) {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          background-color: #ff6565;
        }
        &:nth-of-type(2) {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          background-color: #cd2a34;
        }
      }
    }
  }
} //  单选按钮修改
label {
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}

.mint-checkbox-core::after {
  top: 0px;
  left: 5px;
}

.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #cd2a34;
  border-color: #cd2a34;
}

.mint-checkbox-core {
  width: 15px;
  height: 15px;
}
.groupShop {
  width: 100%;
  height: 44px;
  /* padding: 5px; */
  background:rgba(205,42,52,.9);
  position: absolute;
  bottom: 0;
  left: 0;
  color:rgba(255,255,255,.7);
  display: flex;
  > div {

    font-size: 12px;
    height: 100%;
  }
 .gsleft {
    width: 45%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* align-items: center; */
    p {
      .salespan{
        color: #fff;
      }
      .sale {
        font-size: 24px;
        color: #fff;
      }
    }
  }

  .gsright{
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    p{
      white-space: nowrap;
      line-height:1.1rem;
    }
  
  }
}
</style>