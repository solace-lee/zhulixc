<template lang="html">
  <!-- 商品详情页 -->
  <section class="chose">
    <div class="chose-view">
      <h1 class="chose-view-title">
        <!-- {{view.title}} -->
        <div class="title">
          <span>
            
            {{$store.state.detail.id.commodity.commodityDetails}}
          </span>


          <!-- 分享图标 -->
          <i class="el-icon-share share1 share_hide" @click="share_show=true"></i>
        </div>
        <!-- 分享弹出层 -->
        <van-popup v-model="share_show" position="bottom" :overlay="true">
          <div class="share_box">
            <h1>
              分享到
              <span class="el-icon-circle-close-outline share_hide" @click="share_show=false"></span>
            </h1>
            <div class="share_box2">
              <div class="box22">
                <img src="../../../img/分享/share_bg_wechat@2x.png" alt=""> 微信
              </div>
              <div class="box22">
                <img src="../../../img/分享/share_bg_circleoffriends@2x.png" alt=""> 朋友圈
              </div>
              <div class="box22">
                <img src="../../../img/分享/share_bg_qq@2x.png" alt=""> QQ
              </div>
              <div class="box22">
                <img src="../../../img/分享/share_bg_microblog@2x.png" alt=""> 微博
              </div>
              <div class="box22">
                <img src="../../../img/分享/share_bg_message@2x.png" alt=""> QQ
              </div>
              <div class="box22">
                <img src="../../../img/分享/share_bg_copylink@2x.png" alt=""> 微博
              </div>
            </div>
            <div class="share_box3">
              <button class="btn">取消</button>
            </div>
          </div>
        </van-popup>
        <!-- <span>(已选 {{colText}} - {{sizeText}})</span> -->
        <div style="hieght:1.8rem;line-height: 1.8rem;">
          <span>￥</span>
          <span>{{$store.state.detail.id.commodity.originalPrice}}</span>
        </div>
        <div class="jage">
          <span>
            <del>价格{{$store.state.detail.id.commodity.originalPrice}}</del>
          </span>
          <span>库存：{{$store.state.detail.id.commodity.quantity}}件</span>
        </div>
      </h1>
      
      <p class="chose-view-intro"></p>
    </div>
    
      <div>
      <div class="chos_fw" @click="show2=true">
        <span>服务</span>
        <span> {{$store.state.detail.id.commodityServers[0].serverName}}*{{$store.state.detail.id.commodityServers[1].serverName}}</span>
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
          <button class="btn" @click="show2=false">完成</button>
        </div>
      </van-popup>
    </div>
   
      <div class="chos_fw2 " @click="buyFlag=true">
        <span>规格</span>
        <span>请选择颜色分类</span>
        <span class="el-icon-arrow-right"></span>
      </div>
     
    <router-link :to="{name:'用户评价'}">
      <div class="chos_fw3">
        <span>用户评价(100)</span>
        <span class="el-icon-arrow-right"></span>
      </div>
    </router-link>
    <router-link :to="{name:'详情页'}">
      <div class="chos_fw4">
        <span>
          <img src="../../../img/mall_btn_coupon.png" alt="">
        </span>
        <span>名字</span>
        <span>2018.03.22 &nbsp;&nbsp;02.10</span>
        <span>物流很快，货物很新鲜，口感很好，下次再来</span>
      </div>
    </router-link>
    <h1 class="chose_h1">产品详情</h1>
    </router-link>
    <div class="buyGoodsBtn">
      <div class="left-box">
        <div class="gotoshop left-btn">
          <img src="../../assets/images/commoditydetails_icon_shop@2x.png" alt="">
          <span>店铺</span>
        </div>
        <div class="shoucang left-btn">
          <img src="../../assets/images/commoditydetails_icon_collection_pre@2x.png" alt="">
          <span>收藏</span>
        </div>
      </div>
      <div class="buyBtn">
        <div class="addCart buybtn-btn" @click="buyFlag=true">
          加入购物车
        </div>
        <div class="toBuy buybtn-btn"  @click="buyFlag=true">
          立即购买
        </div>
      </div>
    </div>

   <div style="background: rgba(0, 0, 0, 0.2);width:100%;height: 100%;position: fixed;top: 0;left: 0;" v-if="buyFlag"  @click='buyFlag=false'></div>
    <div class="goodsMsgBox" v-if="buyFlag">
      <div class="title">
        <div class="img">
          <img :src="goodsData.imgUrl" alt="">
        </div>
        <div class="title-right">
         <h3>{{goodsData.name}}</h3>
          <div class="titletext">
            {{goodsData.commodityDetails}}
          </div>
          <div class="title-price">
            <span><span class='price_symbol'>￥</span>{{goodsData.discountPrice}}</span>
            <span class="discountPrice" ><s>￥{{goodsData.discountPrice}}</s></span>
          </div>
          <p>库存<span> {{goodsData.quantity}}</span>件</p>
      
        </div>
        <div class="closeBtn"  @click='buyFlag=false'>
          <img src="../../assets/images/del.png" alt="">
        </div>
      </div>
      <div class="commodity">
        <div class="commodityTitle">
          {{commodity.specificationName}}
        </div>
        <div class="commoditylist">
          <span v-for="(comlist,index) in commoditylist"  @click="checkThis(index,comlist.csLinkId,comlist.amount)" v-bind:class="{'acrive':flag==index}">{{comlist.linkValue}}</span>

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
            加入购物车
        </div>
        <div class="goodstoBuy" @click="tobuy(goodsData.shopId)">
          立即购买
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      buyFlag: false,
      showshare: true,
      show2: false,
      share_show: false,
      yardage_show: false,
      num7: 1,
      ins: 0,
      // 步进器
     
      serverData: [],
      id: "",
      commodity: "",
      flag: 0,
      commoditylist: "",
      goodsData:'',

      orderlist:{
        quantity: 1,
        csLinkId:"",
        unitPrice:""
      }
    };
  },

  created() {
    this.getId();
    this.getShose();
    this.getcommoditylist();
  },
  methods: {
   },
  // computed: mapState({
  //   view: state => state.detail.productDatas.view,
  //   colSelected: state => state.detail.colSelected,
  //   sizeSelected: state => state.detail.sizeSelected,
  //   // 返回当前选择颜色的值(innerText)
  //   colText() {
  //     return this.view.chose[this.colSelected].col;
  //   },
  //   // 返回当前选择规格的值(innerText)
  //   sizeText() {
  //     return this.view.chose[this.sizeSelected].size;
  //   }
  // })
};
</script>

<style lang="less" scoped>



</style>