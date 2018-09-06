<template lang="html">
  <footer class="footer">
    <router-link :to="{name:'首页'}" class="footer-index">
      <i class="icon-index"></i>
    </router-link>
    <router-link :to="{name:'购物车页'}" class="footer-gocar">
      <i class="el-icon-star-off"></i>
      <span v-if="count">{{count}}</span>
    </router-link>
    <div class="shop">
      <button class="addcar " @click="showBase=true"> 加入购物车</button>
      <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goodsId" :hide-stock="sku.hide_stock" :quota="quota" :quota-used="quotaUsed"
        :reset-stepper-on-hide="resetStepperOnHide" :reset-selected-sku-on-hide="resetSelectedSkuOnHide" :close-on-click-overlay="closeOnClickOverlay"
        :disable-stepper-input="disableStepperInput" :message-config="messageConfig" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked"
      />
      <button class="addcar2" @click="buy">立即购买</button>
    </div>
  </footer>
</template>

<script>
  import { MessageBox } from "mint-ui";
  import { Toast } from "mint-ui";
  import { mapState } from "vuex";
  import { Dialog } from "vant";
  export default {
    data() {
      return {
        nowIndex: 0,
        goods: {},
        id:"",
        isShow: false,
        kinds: [],
        kindName: "",
        total: "",
        kid: "",
        smpic: "",
        count: 1,
        cartCount: "",
        goodsId: "",
        quota: "",
        quotaUsed: "",
        resetStepperOnHide: "",
        closeOnClickOverlay: "",
        resetSelectedSkuOnHide: "",
        disableStepperInput: "",
        onBuyClicked: "",
        onAddCartClicked: "",
        //弹出框
        showBase: false,
        sku: {
          tree: [
            {
              k: "颜色", // skuKeyName：规格类目名称
              v: [
                // {
                //   id: "30349", // skuValueId：规格值 id
                //   name: "深蓝色", // skuValueName：规格值名称
                 
                // },
                // {
                //   id: "30333", // skuValueId：规格值 id
                //   name: "蓝色", // skuValueName：规格值名称
                 
                // },
              ],
              k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
           ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
              s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
              s3: "0", // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 110 // 当前 sku 组合对应的库存
            }
          ],
          price: "80", // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              // 商品留言
              datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: "留言", // 留言名称
              type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              required: "1" // 是否必填 '1' 表示必填
            }
          ],
          hide_stock: true // 是否隐藏剩余库存
        },
        goods: {
          // 商品标题
          title: "测试商品",
          // 默认商品 sku 缩略图
          picture: "https://img.yzcdn.cn/1.jpg"
        },
        customStepperConfig: {
          // 自定义限购文案
          quotaText: "每次限购xxx件",
          // 自定义步进器超过限制时的回调
          handleOverLimit: data => {
            const { action, limitType, quota, quotaUsed } = data;

            if (action === "minus") {
              Toast("至少选择一件商品");
            } else if (action === "plus") {
              // const { LIMIT_TYPE } = Sku.skuConstants;
              if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
                let msg = `单次限购${quota}件`;
                if (quotaUsed > 0) msg += `，您已购买${quotaUsed}`;
                Toast(msg);
              } else {
                Toast("库存不够了~~");
              }
            }
          }
        },
        messageConfig: {
          // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
          uploadImg: () => {
            return new Promise(resolve => {
              setTimeout(
                () =>
                  resolve(
                    "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                  ),
                1000
              );
            });
          },
          // 最大上传体积 (MB)
          uploadMaxSize: 3,
          // placehold配置
          placeholderMap: {
            text: "xxx",
            tel: "xxx"
          }
        },
        skuData: {
          // 商品 id
          goodsId: "946755",
          // 留言信息
          messages: {
            message_0: "12",
            message_1: ""
          },
          // 另一种格式的留言，key 不同
          cartMessages: {
            留言1: "xxxx"
          },
          // 选择的商品数量
          selectedNum: 1,
          // 选择的 sku 组合
          selectedSkuComb: {
            id: 2257,
            price: 100,
            s1: "30349",
            s2: "1193",
            s3: "0",
            stock_num: 111
          }
        }
      };
    },
    //

    created() {
      this.getId()
      this.getShose()
      this.getcommoodity()
      this.getDetails();
      this.upDateCount();
    },
    computed: {
      ...mapState({
        //绑定store.selectGoods到组件，之后可用this.selectGoods获取
        selectGoods: state => state.selectGoods
      }),
      count() {
        //页面刷新后 数据会消失,解决:加判断
        if (this.$store.state.detail.count == "") {
          this.$store.commit("CHANGE_COUNT");
        }
        return this.$store.state.detail.count;
      },
      productDatasView() {
        return this.$store.state.detail.productDatas.view;
      },
      colSelected() {
        return this.$store.state.detail.colSelected;
      },
      sizeSelected() {
        return this.$store.state.detail.sizeSelected;
      }
    },

    methods: {
      getId() {
        var that = this
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        // console.log(num)
        // console.log(str)
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
          }
        }
        if (num > 0) {
          this.id = value
          console.log(this.id)
      
        }
      },
      getShose(){
       console.log(this.$route.params.id)
      this.$http.get(this.HOME+'/commodity/queryFrontCommodityById',{params:{commodityId:this.id,userId:this.$route.params.userId}}).then(res => {	
        console.log(res)
              this.goods.title=res.data.data.commodity.commodityDetails
              this.goods.picture=res.data.data.commodityImgs[0].imgUrl
              this.sku.price=res.data.data.commodity.discountPrice
              this.sku.stock_num=res.data.data.commodity.quantity
              // console.log(this.sku)
			 })
     },
     getcommoodity(){
       this.$http.get(this.HOME+"/commoditySpecification/querySpecificationByCommodityId/"+this.id).then(res=>{
         console.log(res)
         this.sku.tree[0].k=res.data.data.commoditySpecification.specificationName
         
         var arr=res.data.data.linkCommoditySpecifications
         arr.forEach(val => {
          var obj={}
            obj.id=val.csLinkId
            obj.name=val.linkValue 
            this.sku.tree[0].v.push(obj)
         });
         console.log(this.sku)
       })
     },
      onRefresh() {
        setTimeout(() => {
          this.$toast("刷新成功");
          this.isLoading = false;
          this.count++;
        }, 500);
      },
      onClick(key) {
        this.activeKey = key;
      },
      onSave() {
        Toast("save");
      },
      onDelete() {
        Toast("delete");
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [
            {
              name: "黄龙万科中心",
              address: "杭州市西湖区"
            }
          ];
        } else {
          this.searchResult = [];
        }
      },

      //弹出框
      addIntoCar() {
        //  mint-ui的弹出式提示框
        const product = [
          {
            title: this.productDatasView.title,
            price: this.productDatasView.price,
            size: this.productDatasView.chose[this.sizeSelected].size,
            col: this.productDatasView.chose[this.colSelected].col,
            id: this.productDatasView.id,
            imgPath: this.$store.state.detail.productDatas.swiper[0].imgSrc,
            choseBool: false
          }
        ];

        MessageBox.confirm(
          `商品名称:${product[0].title}</br>` +
          `价格:${product[0].price}</br>` +
          `规格:${product[0].size}</br>` +
          `颜色:${product[0].col}</br>` +
          `商品ID:${product[0].id}</br>`
        ).then(
          action => {
            //点击成功执行这里的函数
            this.$store.dispatch("setLocalCount", true);
            this.$store.dispatch("addCarList", product);

            Toast({
              message: "添加成功",
              duration: 1000
            });
          },
          function (err) { }
        );
      },
      buy() {
        this.$router.push({ path: "/buy" });
      },
      getDetails() {
        const _this = this;
        this.$http.get(url.details + "?id=" + this.id)
          .then(res => {
            //console.log(res.data.data);
            this.goods = res.data.data;
            this.kinds = this.goods.kinds;
            this.kindName = this.kinds[0].kindName;
            this.total = this.kinds[0].total;
            this.kid = this.kinds[0].kid;
            this.smpic = this.goods.smpic;
            //console.log(this.kinds[2].kid)
          })
          .catch(function () {
            console.log(error);
          });
      },
      onAddcart() {
        this.isShow = true;
        console.log("1111111");
        this.count = 1;
      },
      closeBtn() {
        this.isShow = !this.isShow;
      },
      stop(event) {
        event.cancelBubble = true;
      },
      sendGift() { },
      //选择类型
      chooseType(index) {
        this.nowIndex = index;
        this.kindName = this.kinds[index].kindName;
        this.total = this.kinds[index].total;
        this.kid = this.kinds[index].kid;
      },
      //加入购物车
      addToCart() {
        console.log(this.selectGoods);

        let flag = true;
        let num = 0;

        this.selectGoods.forEach((item, index) => {
          // 通过kid值判断购物车是否已经存在商品,如果存在就不添加
          if (this.kid == item.kid) {
            flag = false;
            if (this.count != item.count) {
              item.count += this.count;
              console.log("不等");
              this.isShow = !this.isShow;
              this.upDateCount();
            }
          }
        });

        if (flag) {
          this.$store.dispatch("addGoods", {
            name: this.goods.name,
            price: this.goods.currentPrice,
            id: this.goods.id,
            smpic: this.goods.smpic,
            kid: this.kid,
            kindName: this.kindName,
            count: this.count,
            check: true
          });
          this.upDateCount();
          this.isShow = !this.isShow;
        }
      },
      //更新购物车数量
      upDateCount() {
        let num = 0;
        this.selectGoods.forEach((item, index) => {
          num += item.count;
        });
        this.cartCount = String(num);
      },
      //跳转到购物车
      goCart() {
        this.$router.push({ path: "/cart" });
      }
    },
  };
</script>

<style lang="less" scoped>
  @import "../../assets/fz.less";
  @import "../../assets/index/style.css"; 
  .el-icon-star-off {
    font-size: 20px;
    color: #cd2a34;
  }

  .icon-index {
    color: #ffdc53;
  }

  .footer {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    height: 14vw;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    -moz-user-select: none;
    -webkit-user-select: none;
    .bt();
    .footer-index,
    .footer-gocar,
    .footer-addcar {
      text-align: center; // border: 1px solid #000;
    }

    .footer-index {
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      line-height: 14vw;
      height: 14vw;
      padding-top: 1.5vw;
      border-right-color: #f7f7f7;
      border-right-style: solid;
      .fz(border-right-width, 1);

      i {
        .fz(font-size, 45);
      }
      &:active {
        background-color: #f1f1f1;
      }
    }

    .footer-gocar {
      position: relative;
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      height: 14vw;
      line-height: 14vw;
      padding-top: 1.6vw;
      span {
        height: 5.5vw;
        width: 5.5vw;
        line-height: 5.5vw;
        position: absolute;
        top: 0.5vw;
        right: 5.5vw;
        background-color: @cl;
        border-radius: 50%;
        color: #fff;
        .fz(font-size, 24);
      }

      &:active {
        background-color: #f1f1f1;
      }
      i {
        .fz(font-size, 48);
      }
    }

    .footer-addcar {
      -webkit-flex: 6;
      -ms-flex: 6;
      flex: 6;
      line-height: 14vw;
      height: 14vw;

      color: #fff;
      background-color: @cl;
      letter-spacing: 0.2vw;
      &:active {
        background-color: #ee6870;
      }
    }
  }

  .shop {
   
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding-right: 8px;
    .addcar {
      // border: 1px solid #000;
      width: 50%;
      height: 80%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      font-size: 14px;
      background-color: #ee6870;
      color: #fff;
    }
    .addcar2 {
      // border: 1px solid #000;
      width: 50%;
      height: 80%;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      font-size: 14px;
      background-color: #cd2a34;
      color: #fff;
    }
  }

  .van-popup--bottom {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
</style>