<template>
    <div class="tmpl">
        <!-- <v-header></v-header> -->
        <div class="head" style="width: 100%;height: 4rem;">
        	<div class="site">
        		<div @click="$router.go(-1)">
        			<i class="van-icon van-icon-arrow-left"><!----></i> 
        			<span>返回</span></div> <!---->
        	</div>
        	<div class="title"><span data-v-4c6d6ba1="">订单支付</span></div>
        </div>
        <div style="height: 4rem;"></div>
        <!--<div v-html="content"></div>-->
        <!--<object data="https://api.zhulixc.com/order/pay/2/1598"  type="text/x-scriptlet" width="100%" height="300px"></object>-->
        <iframe id="iframe" :src="content" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> 
    </div>
</template>
<script>
import Header from "@/common/_header.vue";

export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      content: "",
      height: "",
      width: ""
    };
  },
created() {
this.getUrl();
},
  methods: {
    getUrl() {
    	this.content = this.$route.query.url;
    	console.log(this.$route.query.url);
//  	location.href = this.content
//    	this.$axios.get(this.$route.query.url).then(res=>{
//      console.log(res.data);
//      console.log('000000000');
//     this.content = res.data;
//    })
    }
   },
   mounted() {
   	const oIframe = document.getElementById('iframe');
   	const deviceWidth = document.documentElement.clientWidth;
   	const deviceHeight = document.documentElement.clientHeight;
   	oIframe.style.width = deviceWidth + "px";
   	oIframe.style.height = deviceHeight - 80 + "px";
   }
}
</script>
<!--<script>
import Header from "@/common/_header.vue";
import wx from "weixin-js-sdk";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      content: ""
    };
  },
  created() {
    // this.getUrl();
    document.getElementById("iframe").src = "www.baidu.com";
  },
  methods: {
    getUrl() {
      this.$axios
        .get(this.$route.query.url, {
          accept: "text/html, text/plain"
        })
        .then(res => {
          console.log(res);

          this.content = res.data;
        });
    }
  }
};
</script>-->
<style scoped lang="less">
.head {
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 100000;
  .site {
    width: 4rem;
    height: 100%;
    display: flex;
    position: absolute;
    color: #000;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-location {
        vertical-align: middle;
      }
      span {
        font-size: 0.2rem;
      }
    }
  }
  .van-icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    text-rendering: auto;
  }
  .title {
    font-size: 0.2rem;
    // flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      color: #000;
      margin-right: 0.5rem;
    }
  }
}
.box {
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  padding: 0.6rem;
  background-color: #fff;
  height: 6rem;
  .left {
    width: 6rem;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 1rem;
    height: 100%;
    font-size: 0.8rem;
    p {
      height: 50%;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 2.8rem;
        padding-right: 1rem;
        text-align: right;
      }
      i {
        color: #ff8400;
        font-size: 1.1rem;
      }
    }
  }
}

element.style {
  width: 100%;
  height: 0.8rem;
}
.btns {
  text-align: center;
  padding-top: 1rem;
  button {
    width: 80%;
    height: 3rem;
    background-color: #ff8400;
    color: #fff;
    border-radius: 2rem;
  }
}
</style>