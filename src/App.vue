<template>
  <div id="app">
    <router-view></router-view>
    <v-loading v-show="fetchLoading"></v-loading>
  </div>
</template>

<script>
import Loading from '@/common/_loading'


export default {
	name:'app',
  components:{
    'v-loading':Loading,  
  },
  computed:{
    fetchLoading(){
      return this.$store.state.detail.fetchLoading
    }
  }
}
</script>

<style lang="less">

html,body,#app{
  width: 100%;

  -webkit-tap-highlight-color:rgba(0,0,0,0);
/* overflow:hidden; */
/* overflow-y: scroll; */
}
body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
    margin: 0;
    padding: 0;
    -moz-user-select:none;
    -webkit-user-select:none;
    -webkit-tap-highlight-color:transparent;
}

button,
fieldset,
img,
input {
    border: none;
    padding: 0;
    margin: 0;
    outline-style: none;
}

ul,li {
  background-color: #ffffff;
}
ol,
ul {
    list-style: none;
}

input {
    padding-top: 0;
    padding-bottom: 0;
    font-family: "SimSun", "宋体";
}

input,
select {
    vertical-align: middle;
}

input,
select,
textarea {
    font-size: 18px;
    margin: 0;
    margin-left: 10px;
    
}
textarea {
    resize: none;
}

/*防止拖动*/
img {
    border: 0;
    vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
    border-collapse: collapse;
}

i {
  font-style:normal
}
body {
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
    color: #666;
    background: #f2f2f2;
}

a {
    color: #666;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-decoration: none;
    font-weight: normal;
    font-size: 100%;
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
}

.ac {
    text-align: center;
}

.mint-searchbar-inner .mintui-search {
    font-size: 22px;
    color: #d9d9d9;
}
.mint-searchbar-inner {
   
    border-radius: 5px;
}
.car .main .my-indent[data-v-21974e90] {  
     border-bottom-color:#fff;    
    //  border: 1px solid #000;
}
.mint-search {
    height: 8vh;  
}
header h1[data-v-416b7b2c] {
    margin-right: 44vw;
}
.van-checkbox--checked {
    border-color: #cd2a34;
    background-color: #cd2a34;
    
}
.el-rate__icon {
    font-size: 28px;
}

//加入购物车的按钮
.van-sku-actions {
    width: 90%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}
.van-button--bottom-action {
    border-top-left-radius: 20px;
    border-bottom-left-radius:20px;  
    background-color: #ff6565;

}
.van-button--bottom-action.van-button--primary {
    background-color: #cd2a34;
     border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
     border-top-left-radius: 0px; 
     border-bottom-left-radius: 0px;
}
.van-sku-row__item--disabled {
    border-radius: 10px;
}
.van-sku-row__item--active {
    border-radius: 10px;
    background-color: #cd2a34;
    color: #fff;
}
.van-sku-row__item {
    display: inline-block;
    padding: 5px 9px;
    margin: 0 10px 10px 0;
    height: 28px;
    min-width: 52px;
    line-height: 16px;
    font-size: 12px;
    color: #000;
    text-align: center;
    border: 1px solid #999;
    border-radius: 10px;
    box-sizing: border-box;
}
.el-input__inner {
    height: 30px;    
    width: 87%;
    border: 1px solid #fff;
    background-color:#ccc;
}
.el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
    border-color: #fff;
}
.el-message-box {  
    width: 304px;
}
.van-button--primary {
    color: #fff;
    background-color: #f21536;
    border: 1px solid #f2143f;
    border-radius: 5px;
}
</style>
