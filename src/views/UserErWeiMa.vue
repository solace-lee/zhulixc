<template>
  <div class="tmpl">
    <v-header></v-header>
    <div class="box">

      <div class="erweima">
        <canvas id="cavasimg" width='200px' height="200"></canvas>
      </div>
      <div class="btns">

        <button @click='Download'>保存到相册</button>
        <button >分享二维码</button>
        <div style="float:right; margin-top:10px;">
           <div class="datasetconfig" data-title="" data-url="" :ata-pic="imgurl" data-sites="weibo,weixin,qzone"></div> 

          </div>
          
        </div>
      </div>
    </div>

</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "vant";
import "../assets/js/jquery.share.min.js";
import wx from "weixin-js-sdk";

export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      token: "",
      imgurl: "",
      sites: ["weixin,", "weibo", "qzone"],
      form: {
        appId: "",
        nonceStr: "",
        signature: "",
        timestamp: ""
      }
    };
  },
  created() {
    this.getToken();
    this.getErWeiMa();
    this.getwxMsg();
  },
  mounted() {
    wx.config({
      debug: false,
      appId: this.form.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
      timestamp: this.form.timestamp, // 必填，生成签名的时间戳
      nonceStr: this.form.nonceStr, // 必填，生成签名的随机串
      signature: this.form.signature, // 必填，签名，见附录1
      //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
      jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
    });
    //处理验证失败的信息
    wx.error(function(res) {
      logUtil.printLog("验证失败返回的信息:", res);
    });
    //处理验证成功的信息
    wx.ready(function() {
      //              alert(window.location.href.split('#')[0]);
      //分享到朋友圈
      wx.onMenuShareTimeline({
        title: _this.newDetailObj.title, // 分享标题
        link: window.location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: _this.newDetailObj.thu_image, // 分享图标
        success: function(res) {
          // 用户确认分享后执行的回调函数
          logUtil.printLog("分享到朋友圈成功返回的信息为:", res);
          _this.showMsg("分享成功!");
        },
        cancel: function(res) {
          // 用户取消分享后执行的回调函数
          logUtil.printLog("取消分享到朋友圈返回的信息为:", res);
        }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title: _this.newDetailObj.title, // 分享标题
        desc: _this.desc, // 分享描述
        link: window.location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: _this.newDetailObj.thu_image, // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function(res) {
          // 用户确认分享后执行的回调函数
          logUtil.printLog("分享给朋友成功返回的信息为:", res);
        },
        cancel: function(res) {
          // 用户取消分享后执行的回调函数
          logUtil.printLog("取消分享给朋友返回的信息为:", res);
        }
      });
    });

    //获取canvas元素
    this.$http.get(this.HOME+"/user/GetQrCode?token=" + this.token).then(res => {
      console.log(res);
      this.imgurl = res.data.Data.url;

      var cvs = document.getElementById("cavasimg");
      //创建image对象
      var imgObj = new Image();
      imgObj.src = res.data.Data.url;
      console.log(imgObj.src);
      imgObj.setAttribute("crossOrigin", "Anonymous");
      //待图片加载完后，将其显示在canvas上
      imgObj.onload = function() {
        var ctx = cvs.getContext("2d");
        // ctx.drawImage(this, 0, 0); //this即是imgObj,保持图片的原始大小：470*480
        ctx.drawImage(this, 0, 0, 200, 200); //改变图片的大小到1024*768
      };
    });
  },
  methods: {
    getwxMsg() {
      var that=this;
      this.$http.get(this.HOME+"/user/info?token=" + this.token).then(res => {
        console.log(res);
        var code = res.data.Data.userInfo.referralCode;
        console.log(code);
        var url = "https://api.zhulixc.com/User/RegPage?code=" + code;
        console.log(url);

        that.$http.get(this.HOME+"/wx/ShareConfig?url=" + url).then(res => {
          console.log(res);
          this.form = res.data.Data;
          console.log(this.form);
        });
      });
    },

    Download() {
      //cavas 保存图片到本地  js 实现
      //------------------------------------------------------------------------
      // 1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
      var type = "jpg"; //你想要什么图片格式 就选什么吧
      var d = document.getElementById("cavasimg");
      var imgdata = d.toDataURL(type);
      //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
      var fixtype = function(type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, "jpeg");
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return "image/" + r;
      };
      imgdata = imgdata.replace(fixtype(type), "image/octet-stream");
      //3.0 将图片保存到本地
      var savaFile = function(data, filename) {
        var save_link = document.createElementNS(
          "https://www.w3.org/1999/xhtml",
          "a"
        );
        save_link.href = data;
        save_link.download = filename;
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        save_link.dispatchEvent(event);
      };
      var filename = "" + new Date().getSeconds() + "." + type;
      //我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
      savaFile(imgdata, filename);
      Toast("保存成功");
    },
    getToken() {
      this.token = localStorage.getItem("Token");
    },
    getErWeiMa() {
      this.$http.get(this.HOME+"/user/GetQrCode?token=" + this.token).then(res => {
        console.log(res);
        this.imgurl = res.data.Data.url;
      });
    },
    save() {
      localStorage.setItem("imgUrl", this.imgurl);
      Toast("保存成功");
    }
  }
};
</script>
<style scoped lang="less">
@import url("../assets/css/share.min.css");
.tmpl{
	  background-image: url("../../img/userImg/personal_login_bg_background.png");
	  background-size: 100% 100%;
}
.box {
  width: 100wh;
  height: 100vh;
  background-position: 100% 100%;
  background-size: 100%;
  .erweima {
    padding: 12rem 0 2rem;
    display: flex;
    justify-content: center;
    canvas {
    }
    img {
      width: 100%;
    }
  }
  .btns {
    width: 100%;
    text-align: center;
    button {
      background-color: #1bc6a3;
      color: #fff;
      width: 35%;
      font-size: 0.8rem;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
  }
}
</style>