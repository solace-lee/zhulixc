 <template>
  <!-- gouwu -->
  <div class="wrap">
    <v-header class="header" style="background:#000;">
      <h1 slot="title" style="color: #fff;"></h1>
    </v-header>
    <!-- <i class="van-icon van-address-list__edit van-icon-edit"></i> -->
    <!-- <div class="bj" @click="bjy"><img src="../../img/mall_bg_brand.png" alt=""></div> -->
    <div class="mint-checklist page-part">
      <!-- 小星星服装店1 -->
      <label class="mint-checklist-label">
        <!-- 小圆点 -->
        <span class="mint-checkbox">
          <input type="checkbox" class="mint-checkbox-input" value="选项A">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label">小星星服装店 &nbsp;进店&nbsp;></span>
      </label>
      <!-- 商品2 -->
      <label class="mint-checklist-label">
        <span class="mint-checkbox yuandian">
          <input type="checkbox" class="mint-checkbox-input" value="选项A">
          <span class="mint-checkbox-core"></span>
        </span>
        <div class="group">
          <img src="../../img/mall_icon_search.png" alt="">          
             <div class="group-right">
                <div>
                <van-stepper v-model="value" />
                </div>
                <div>
                  <select>
                    <option value="深蓝色，s">深蓝色，s</option>
                    <option value="深蓝色，m">深蓝色，m</option>
                    <option value="深蓝色，L">深蓝色，L</option>
                  </select>
                </div>
              </div>      
             
                <button @click="shopping_cart">完成</button>
                                    
            
        </div>
      </label>
      
    </div>
    <!-- 结算 -->
    <label class="mint-checklist-label gg">
      <!-- 小圆点 -->
      <span class="mint-checkbox">
        <input type="checkbox" class="mint-checkbox-input" value="选项A">
        <span class="mint-checkbox-core"></span>
      </span>
      <!-- <span class="mint-checkbox-label">小星星服装店 &nbsp;进店&nbsp;></span>        -->
    </label>
    <van-submit-bar :price="8000" button-text="结算" @submit="onSubmit">
      <van-checkbox v-model="checked" class="qx">全选</van-checkbox>
      <span slot="tip">
        您的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>

</template>

<script>
import Header from "@/common/_header.vue";
// import { SubmitBar } from 'vant';
// Vue.use(SubmitBar);
export default {
  data() {
    return {
      value: 1
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: "/queren" });
    },
    bjy() {
      this.$router.push({ path: "/bjy" });
    },
    shopping_cart(){
      this.$router.push({path:'/shopping_cart'})
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  border: 1px solid #ccc;
  background-color: #eee;
  .header {
    width: 100%;
    height: 60px;
  }
}
.group{
  border: 1px solid #ccc;
  width: 100%;
  height: 110px;
  display: flex;
   justify-content:center;
  //  margin-top: 20px;
  background-color: #fff;
  position: relative;
  left: -11px;
  >img{
    flex-grow: 1;
    height: 88px;
    // border: 1px solid #000;
     display: inline-block;
     padding-left: 30px;
     padding-top: 10px;
  }
  >.group-right{
    flex-grow: 3;
    // border: 1px solid #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    justify-content:center;
    height: 100px;
    
  }
  >button{
    flex-grow: 2.5;
    height: 85%;
    margin-top: 5px;
    background-color: #cd2a34;
    color: #fff;
  }
}

.bj {
  // border: 1px solid #000;
  position: absolute;
  width: 15px;
  height: 15px;
  top: 160px;
  right: 15px;
  z-index: 999;
  > img {
    width: 100%;
    height: 100%;
  }
}
.serve2 {
  // border: 1px solid #000;
  width: 50px;
  height: 40px;
  color: #ce2e37;
  position: absolute;
  right: -2px;
  top: 5px;
  > span:nth-of-type(1) {
    font-size: 0.5rem;
    /* border: 1px solid #000; */
    position: absolute;
    top: 0.5%;
    left: 15%;
  }
  > span:nth-of-type(2) {
    font-size: 18px;
    /* border: 1px solid #000; */
    position: absolute;
    top: 0.5%;
    left: 35%;
  }
  > span:nth-of-type(3) {
    font-size: 10px;
    position: absolute;
    left: 25px;
    bottom: 5px;
    color: #999;
    /* border: 1px solid #000; */
  }
  > span:nth-of-type(4) {
    font-size: 15px;
    position: absolute;
    left: 50%;
    top: 180%;
    color: #999;
    /* border: 1px solid #000; */
  }
}
.mint-checklist-label {
  /* border: 1px solid #000; */
  /* display: inline-block; */
  height: 30px;
  width: 100%;
  line-height: 30px;
  font-size: 12px;
  background-color: #fff;
  position: relative;
}
.mint-checklist {
  border-bottom: 1px solid #ccc;
  height: 30px;
  margin-top: 1px;
}
/* 修改圆点 */
.mint-checkbox-core {
  width: 15px;
  height: 15px;
  // border: 1px solid #000;
}
.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #cd2a34;
  border-color: #cd2a34;
}
.mint-checkbox-core::after {
  top: 1px;
  left: 5px;
}
.mint-cell-wrapper {
  padding: 0;
}
/* 修改 */

.yuandian {
  /* border: 1px solid #000; */
  position: absolute;
  top: -1.5px;
  z-index: 999;
}
.gg {
  /* border: 1px solid #000; */
  position: absolute;
  top: 625px;
  width: 20px;
  z-index: 999;
}
.qx {
  position: absolute;
  left: 50px;
}
.van-icon {
  right: -280px;
  top: 40px;
}
</style>