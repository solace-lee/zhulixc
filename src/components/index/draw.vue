<template>
  <div class="awardRotate">
    <img id="shan-img" src="../../assets/img/bean_500.png" style="display:none;" />
    <img id="sorry-img" style="display:none;" />
    <div class="banner">
      <div class="turnplate">
        <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>

        <img class="pointer" src="../../assets/images/1.png" v-on:click="pointer" />

      </div>


    </div>
    <div class="floorbtn">
      <button @click='contentshow'>活动详情>></button>
      <button>已有{{}}人参与</button>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true" class="showheight">
      <h3>活动详情</h3>
      <p>
        <span>开始时间：</span>{{awardMSG.startDate|formatDate}}
        <br/>
        <span>结束时间：</span>{{awardMSG.endDate|formatDate}}

      </p>

      <p>
        <b>规则:</b><br/>
         {{awardMSG.description}}
      </p>
     


    </van-popup>

  </div>
</template>

<script>
  
  import { myfun } from "../../assets/js/awardRotate";
  import "mint-ui/lib/style.css";
  import { Toast } from "mint-ui";
  import {formatDate} from '../../assets/js/data.js';
 
  export default {
        filters: {
              formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
              }
            },
    name: "awardRotate",
    data() {
      return {
        show: false,
        datanum: "",
        datanumobj: "",
        // 奖品列表
        prizelist: [],
        allaward: [],
        awardMSG: "",
        num: true,
        msg: "",
        userId: "",
        turnplate: {
          restaraunts: [],
          colors: [],
          outsideRadius: 192,
          textRadius: 155,
          insideRadius: 68,
          startAngle: 0,
          bRotate: false
        }
      };
    },
    created() {
      this.getawardMSG();
      // <!-- document.title = "大转盘抽奖代码"; -->
      this.$nextTick(() => {
        this.turnplate.restaraunts = [
          "50M免费流量包",
          "10Q币",
          "谢谢参与",
          "5Q币",
          "10M免费流量包",
          "20M免费流量包",
          "20Q币 "
        ];

        this.turnplate.colors = [
          "#FFF4D6",
          "#FFFFFF",
          "#FFF4D6",
          "#FFFFFF",
          "#FFF4D6",
          "#FFFFFF",
          "#FFF4D6"
        ];
        this.rotateTimeOut();

        this.getawardName();
        this.rotateFn();
      });
    },
    components: {
      myfun
    },
    methods: {
      // 活动规则
      contentshow() {
        this.show = true;
      },
      // 获取所有奖品
      getawardName() {
        this.$http.post(this.HOME+"/award/queryAward", {}).then(res => {
          console.log(res);
          this.prizelist = res.data.data.data;
          console.log(this.prizelist);
          console.log(this.turnplate.restaraunts);

          this.turnplate.restaraunts = [];
          this.prizelist.forEach(val => {
            this.turnplate.restaraunts.push(val.awardName);
          });
          this.turnplate.restaraunts.push("谢谢参与");
          console.log(this.turnplate.restaraunts);
          this.drawRouletteWheel();
        });
      },

      rotateTimeOut: function () {
        $("#wheelcanvas").rotate({
          angle: 0,
          animateTo: 2160,
          duration: 8000,
          callback: function () {
            Toast({
              message: "网络超时，请检查您的网络设置！",
              position: "middle"
            });
          }
        });
      },
      getallaward() {
        console.log(this.datanum);
      },
      rotateFn: function (item, txt) {
        var that = this;
        var angles =
          item * (360 / this.turnplate.restaraunts.length) -
          360 / (this.turnplate.restaraunts.length * 2);
        if (angles < 270) {
          angles = 270 - angles;
        } else {
          angles = 360 - angles + 270;
        }
        var bRotateT = this.turnplate.bRotate;
        this.$nextTick(() => {
          $("#wheelcanvas").stopRotate();
          $("#wheelcanvas").rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function () {
              console.log(that.datanum);
              //跳转到领奖页面
              if (
                that.datanum != 6 &&
                that.datanum != "" &&
                that.datanum != null
              ) {
                that.$router.push({ path: "/drawsingle?userId=" + that.userId });
              }

              if (bRotateT) {
                bRotateT = false;
              } else {
                bRotateT = true;
              }
            }
          });
        });
        this.turnplate.bRotate = bRotateT;
      },
      // 获取活动信息
      getawardMSG() {
        this.$http
          .post(this.HOME+"/award/activity/queryAwardActivity?activityId=3", {})
          .then(res => {
            console.log(res);
            var arr = [];
            var arr = res.data.data.data;
            arr.forEach(val => {
              console.log(val);
              this.awardMSG = val;
              console.log("555555555555555");
            });
            console.log(this.awardMSG);
          });
      },
      //点击抽奖按钮
      pointer() {
        this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
        this.$http
          .post(this.HOME+"/award/lottery/islucky", { userId: this.userId, activityId: 3 })
          .then(res => {
            console.log(res);
            console.log("`````````````````````````");

            this.datanumobj = res.data.data;
            this.datanum = res.data.data.awardLevel;
            console.log(this.datanum);

            this.turnplate.bRotate = !this.turnplate.bRotate;
            //(让指针转到奖品某个个范围内)
            var item = this.datanum;
            // 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
            this.rotateFn(item, this.turnplate.restaraunts[item - 1]);
          })
          .catch(err => {
            console.log(err.response);
            Toast(err.response.data.errorMessage);
          });
      },
      drawRouletteWheel() {
        var canvas = document.getElementById("wheelcanvas");
        if (canvas.getContext) {
          // 根据奖品个数计算圆周角度
          var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
          var ctx = canvas.getContext("2d");

          // 在给定矩形内清空一个矩形
          ctx.clearRect(0, 0, 422, 422);
          // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
          ctx.strokeStyle = "#FFBE04";
          // font 属性设置或返回画布上文本内容的当前字体属性
          ctx.font = "16px Microsoft YaHei";
          for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
            var angle = this.turnplate.startAngle + i * arc;
            ctx.fillStyle = this.turnplate.colors[i];
            ctx.beginPath();
            //  arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(
              211,
              211,
              this.turnplate.outsideRadius,
              angle,
              angle + arc,
              false
            );
            ctx.arc(
              211,
              211,
              this.turnplate.insideRadius,
              angle + arc,
              angle,
              true
            );
            ctx.stroke();
            ctx.fill();
            // 锁画布(为了保存之前的画布状态)
            ctx.save();

            // ----绘制奖品开始----
            ctx.fillStyle = "#E5302F";
            var text = this.turnplate.restaraunts[i];
            var lineHeight = 17;
            // translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(
              211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius,
              211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius
            );

            // rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);

            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            if (text.indexOf("M") > 0) {
              // 流量包
              var texts = text.split("M");
              for (var j = 0; j < texts.length; j++) {
                ctx.font =
                  j === 0 ? "bold 20px Microsoft YaHei" : "16px Microsoft YaHei";
                if (j === 0) {
                  ctx.fillText(
                    texts[j] + "M",
                    -ctx.measureText(texts[j] + "M").width / 2,
                    j * lineHeight
                  );
                } else {
                  ctx.fillText(
                    texts[j],
                    -ctx.measureText(texts[j]).width / 2,
                    j * lineHeight
                  );
                }
              }
            } else if (text.indexOf("M") === -1 && text.length > 6) {
              // 奖品名称长度超过一定范围
              text = text.substring(0, 6) + "||" + text.substring(6);
              var textst = text.split("||");
              for (var ji = 0; ji < textst.length; ji++) {
                ctx.fillText(
                  textst[ji],
                  -ctx.measureText(textst[ji]).width / 2,
                  ji * lineHeight
                );
              }
            } else {
              // 在画布上绘制填色的文本。文本的默认颜色是黑色
              // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
              ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            }

            // 添加对应图标
            if (text.indexOf("Q币") > 0) {
              var img = document.getElementById("shan-img");
              img.onload = function () {
                // ctx.drawImage(img, -15, 10) //本来第一次加载大转盘抽奖就会出现奖品图片，但是有点瑕疵没有解决所以注释了，现在第二次加载就会出现，
                //谁解决了来说下，帮助大家
              };
              ctx.drawImage(img, -15, 10);
            } else if (text.indexOf("谢谢参与") >= 0) {
              img = document.getElementById("sorry-img");
              img.onload = function () {
                // ctx.drawImage(img, -15, 10) //本来第一次加载大转盘抽奖就会出现奖品图片，但是有点瑕疵没有解决所以注释了，现在第二次加载就会出现，
                //谁解决了来说下，帮助大家
              };
              ctx.drawImage(img, -15, 10);
            }

            // 把当前画布返回（调整）到上一个save()状态之前
            ctx.restore();
            // 绘制奖品结束
          }
        }
      }
    }
  };
</script>

<style scoped>
  @media only screen and (max-width: 1080px),
  only screen and (max-device-width: 1080px) {
    html,
    body {
      font-size: 168.75px;
    }
  }

  @media only screen and (max-width: 960px),
  only screen and (max-device-width: 960px) {
    html,
    body {
      font-size: 150px;
    }
  }

  @media only screen and (max-width: 800px),
  only screen and (max-device-width: 800px) {
    html,
    body {
      font-size: 125px;
    }
  }

  @media only screen and (max-width: 720px),
  only screen and (max-device-width: 720px) {
    html,
    body {
      font-size: 112.5px;
    }
  }

  @media only screen and (max-width: 640px),
  only screen and (max-device-width: 640px) {
    html,
    body {
      font-size: 100px;
    }
  }

  @media only screen and (max-width: 600px),
  only screen and (max-device-width: 600px) {
    html,
    body {
      font-size: 93.75px;
    }
  }

  @media only screen and (max-width: 540px),
  only screen and (max-device-width: 540px) {
    html,
    body {
      font-size: 84.375px;
    }
  }

  @media only screen and (max-width: 480px),
  only screen and (max-device-width: 480px) {
    html,
    body {
      font-size: 75px;
    }
  }

  @media only screen and (max-width: 414px),
  only screen and (max-device-width: 414px) {
    html,
    body {
      font-size: 64.6875px;
    }
  }

  @media only screen and (max-width: 400px),
  only screen and (max-device-width: 400px) {
    html,
    body {
      font-size: 62.5px;
    }
  }

  @media only screen and (max-width: 375px),
  only screen and (max-device-width: 375px) {
    html,
    body {
      font-size: 58.59375px;
    }
  }

  @media only screen and (max-width: 360px),
  only screen and (max-device-width: 360px) {
    html,
    body {
      font-size: 56.25px;
    }
  }

  @media only screen and (max-width: 320px),
  only screen and (max-device-width: 320px) {
    html,
    body {
      font-size: 50px;
    }
  }

  @media only screen and (max-width: 240px),
  only screen and (max-device-width: 240px) {
    html,
    body {
      font-size: 37.5px;
    }
  }

  .awardRotate {
    background-image: url("../../assets/images/choujiang.png");
    background-position: 100% 100%;
    background-size: 100% 100%;
    height: 100%;
    /* width: 100%; */
    margin: 0px auto;
  }

  ul,
  ol {
    list-style-type: none;
  }

  select,
  input,
  img,
  select {
    vertical-align: middle;
  }

  input {
    font-size: 12px;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    color: #c00;
    text-decoration: none;
  }

  .clear {
    clear: both;
  }

  /* 大转盘样式 */

  .banner {
    width: 100vw;
    height: 100vh;
  }

  .banner .turnplate {
    display: block;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-size: 100% 100%;
  }

  .banner .turnplate canvas.item {
    width: 100%;
  }

  .banner .turnplate img.pointer {
    position: absolute;
    width: 31.5%;
    height: 42.5%;
    left: 34.6%;
    top: 23%;
  }

  .floorbtn {
    width: 100%;
    position: absolute;
    bottom: 6rem;
  }

  .floorbtn button {
    font-size: 0.6rem;
    background-color: #f2656e;
    border-radius: 1rem;
    padding: 0.5rem;
    color: #fff;
    letter-spacing: 0.1rem;
    position: absolute;
    top: 0;
  }

  .floorbtn button:nth-child(1) {
    left: 1rem;
  }

  .floorbtn button:nth-child(2) {
    right: 1rem;
  }

  .showheight {
    height: 28rem;
    padding-top: 1rem;
  }

  .showheight h3 {
    text-align: center;
  }

  .showheight p {
    padding: 1rem 1rem;
  }

  .showheight p b {
    margin-right: 0.5rem;
  }
</style>