<template>
    <div class="tmpl">
        <div class="head" @click='hideEmoji'>
            <span @click='$router.go(-1)'><van-icon name="arrow-left" /></span>
            <span>Ahri</span>
            <span>
                <van-icon name="delete" />
            </span>
        </div>
       

        <div class="content" @click='hideEmoji'>
             <div class="hint">没有更多信息啦-.-</div>

            <div v-for="item in chatHistory" :class="item.from == from_username ? 'coright' : 'coleft'" >
                <div class="nickName">{{item.nickName}}</div>
                <div class="message-content">
                    <p class="message-text">
                        {{item.sourceMsg}}
                    </p>
                    <div class="message-time">
                        {{item.time}}
                        <span class="message-status"></span>
                    </div>
                </div>
            </div>
            <!--<div class="coright">-->
                <!--<div class="nickName">ting</div>-->
                    <!--<p class="message-text">-->
                        <!--尼玛-->
                    <!--</p>-->
                    <!--<div class="message-time">-->
                     <!--2018-7-12 17:16-->
                        <!--<span class="message-status"></span>-->
                    <!--</div>-->
            <!--</div>-->

        </div>

        <ul class="faces-ul" v-show="showEmoji">
            <li v-for="(value,key) in emojiMap" :key="key" class="webim-emoji-item">
                <img :src="value" alt="emoj" />
            </li>
        </ul>

        <div class="bottom">
            <div class="voice" @click='hideEmoji'>
                <img src="../../img/userImg/yuyin.png" alt="">
            </div>
            <textarea type="text" id="inputcontent" cols="11" placeholder="" v-model="value"></textarea>
            <div class="expression">
                <img src="../../img/userImg/biaoqing.png" alt="" @click='onoff' v-if="convert">
                <img src="../../img/userImg/wenzi.png" alt="" v-if="!convert" @click='hideEmoji'>
                <button @click='sendTextMsg'>发送</button>
            </div>
        </div>

    </div>
</template>

//
<script>
import ee_1 from "../assets/faces/ee_1.png";
import ee_2 from "../assets/faces/ee_2.png";
import ee_3 from "../assets/faces/ee_3.png";
import ee_4 from "../assets/faces/ee_4.png";
import ee_5 from "../assets/faces/ee_5.png";
import ee_6 from "../assets/faces/ee_6.png";
import ee_7 from "../assets/faces/ee_7.png";
import ee_8 from "../assets/faces/ee_8.png";
import ee_9 from "../assets/faces/ee_9.png";
import ee_10 from "../assets/faces/ee_10.png";
import ee_11 from "../assets/faces/ee_11.png";
import ee_12 from "../assets/faces/ee_12.png";
import ee_13 from "../assets/faces/ee_13.png";
import ee_14 from "../assets/faces/ee_14.png";
import ee_15 from "../assets/faces/ee_15.png";
import ee_16 from "../assets/faces/ee_16.png";
import ee_17 from "../assets/faces/ee_17.png";
import ee_18 from "../assets/faces/ee_18.png";
import ee_19 from "../assets/faces/ee_19.png";
import ee_20 from "../assets/faces/ee_20.png";
import ee_21 from "../assets/faces/ee_21.png";
import ee_22 from "../assets/faces/ee_22.png";
import ee_23 from "../assets/faces/ee_23.png";
import ee_24 from "../assets/faces/ee_24.png";
import ee_25 from "../assets/faces/ee_25.png";
import ee_26 from "../assets/faces/ee_26.png";
import ee_27 from "../assets/faces/ee_27.png";
import ee_28 from "../assets/faces/ee_28.png";
import ee_29 from "../assets/faces/ee_29.png";
import ee_30 from "../assets/faces/ee_30.png";
import ee_31 from "../assets/faces/ee_31.png";
import ee_32 from "../assets/faces/ee_32.png";
import ee_33 from "../assets/faces/ee_33.png";
import ee_34 from "../assets/faces/ee_34.png";
import ee_35 from "../assets/faces/ee_35.png";

export default {
  data() {
    return {
      convert: true,
      from_username: "", // url中的发起方用户名
      to_username: "", // url中的接收方用户名
      conn: {}, // 与环信的通信长连接
      chatHistory: [], // 聊天记录数组
      currentUserpwd: "123456", // 当前用户环信密码
      accence_token: "", // 权限token
      emojiMap: {
        "[):]": ee_1,
        "[:D]": ee_2,
        "[;)]": ee_3,
        "[:-o]": ee_4,
        "[:p]": ee_5,
        "[(H)]": ee_6,
        "[:@]": ee_7,
        "[:s]": ee_8,
        "[:$]": ee_9,
        "[:(]": ee_10,
        "[:'(]": ee_11,
        "[:|]": ee_12,
        "[(a)]": ee_13,
        "[8o|]": ee_14,
        "[8-|]": ee_15,
        "[+o(]": ee_16,
        "[<o)]": ee_17,
        "[|-)]": ee_18,
        "[*-)]": ee_19,
        "[:-#]": ee_20,
        "[:-*]": ee_21,
        "[^o)]": ee_22,
        "[8-)]": ee_23,
        "[(|)]": ee_24,
        "[(u)]": ee_25,
        "[(S)]": ee_26,
        "[(*)]": ee_27,
        "[(#)]": ee_28,
        "[(R)]": ee_29,
        "[({)]": ee_30,
        "[(})]": ee_31,
        "[(k)]": ee_32,
        "[(F)]": ee_33,
        "[(W)]": ee_34,
        "[(D)]": ee_35
      }, // 表情集合
      showEmoji: false, // 是否显示表情
      myNickName: "", // 发送人昵称
      receiveNickName: "", //接收人昵称
      headimgurl: "", // 发送人头像

    };
  },
  created() {
    this.getUserMsg();
  },
  mounted() {
    this.loginEasemob();
  },
  methods: {
    // 表情开关
    onoff() {
      this.showEmoji = true;
      this.convert = false;
    },
    // 表情开关
    hideEmoji() {
      this.showEmoji = false;
      this.convert = true;
    },
    // 发送
    send() {
      this.showEmoji = false;
      this.convert = true;
    },
    getUserMsg() {
      this.from_username = JSON.parse(localStorage.getItem("userMsg")).Account;
      this.currentUserpwd = JSON.parse(localStorage.getItem("userMsg")).Pwd;
    },
    // 登录环信
    loginEasemob() {
      this.$imoption.user = this.from_username;
      this.$imoption.pwd = this.currentUserpwd;
      console.log(this.$imoption.user, this.$imoption.pwd);
      this.$imoption.appKey = "1176180515146684#vhapp";
      this.$imoption.success = res => {
        this.accence_token = res.access_token;
        this.myNickName = res.user.nickname;
        this.addListen();
      };
      this.$imconn.open(this.$imoption);
    },
    addListen() {
      this.$imconn.listen({
        onOpened: function(message) {
          console.log("用户已上线");
        },
        onClosed: function(message) {
          console.log("用户已下线");
        },
        // onEmojiMessage: this.receiveEmojiMessage,
        // onPictureMessage: this.receivePictureMessage,
        onTextMessage: this.receiveTextMsg
      });
    },
    receiveTextMsg(message) {
      let sendTime = sendTimeWZ.getMonth() + 1 + '-' + sendTimeWZ.getDate() + ' ' + sendTimeWZ.getHours() + ':' + sendTimeWZ.getMinutes()
      let receiveMessage = {
        from: message.from,
        sourceMsg: message.sourceMsg,
        time: sendTime,
        nickName: this.receiveNickName
      }
      this.chatHistory.push(receiveMessage)
    },
    getNowTime () {
  let now = new Date()
  return now.getMonth() + 1 + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
},
    // 发送文本消息
    sendTextMsg () {
      var text = document.querySelector('#inputcontent').value;
      if (!text) {
        this.$createDialog({
          type: 'alert',
          title: '温馨提示',
          content: '发送内容不能为空'
        }).show()
        return
      }
      var id = this.$imconn.getUniqueId()
      var msg = new WebIM.message('txt', id)
      let fromUserName = this.from_username
      let to_username = this.to_username
      let _thisChatHistory = this.chatHistory
      let sendTime = this.getNowTime()
      let myNickName = this.getMyNickName
      let headimgurl = this.headimgurl
      msg.set({
        msg: text,
        action: 'action',                     //用户自定义，cmd消息必填
        ext: {'nickName': myNickName, headimgurl},    //用户自扩展的消息内容（群聊用法相同）
        to: this.to_username,
        roomType: false,
        success: function (id, serverMsgId) {
          document.querySelector('#inputcontent').value = ''
          let sendMessage = {
            from: fromUserName,
            sourceMsg: text,
            time: sendTime,
            nickName: myNickName
          }
          _thisChatHistory.push(sendMessage)
        },
        fail: function (e) {
          console.log('Send private text error')
        }
      })
      msg.body.chatType = 'singleChat'
      this.$imconn.send(msg.body)
    },
  }
};
//
</script>
<style scoped lang="less">
.head {
  position: relative;
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #d6dce0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1bc6a3;
  color: #fff;
  span:nth-child(1){
      position: absolute;
      left:1rem;
  }
//   span:nth-child()
  
  span:nth-child(3) {
    position: absolute;
    right: 1rem;
  }
}
.hint{
    width: 100%;
    text-align: center;
        padding: .5rem 0;
    color: #888c98;
    font-size: .8rem;
}
.coleft {
  padding: 1rem 2rem 0 1rem;
  text-align: left;

  p {
    text-align: left;
    display: inline-block;
    padding: 0.5rem 0.6rem;
    margin-left: 0.5rem;
    background-color: #eceff1;
    border-radius: 1rem;
    background-color: #fff;
  }
}
.content{
	margin-top: 10px;
}
.coright {
  padding: 0 1rem 0 2rem;
  text-align: right;
  p {
    display: inline-block;
    padding: 0.5rem 0.6rem;
    margin-right: 0.5rem;
    background-color: #eceff1;
    border-radius: 1rem;
    background-color: #81ea81;
  }
}
.message-time {
  color: #888c98;
  font-size: 0.6rem;
}
.faces-ul {
  z-index: 1;
  position: absolute;
  width: 100%;
  bottom: 3.5rem;
  left: 0;
  border-radius: 2px;
  background: #fff;
  box-sizing: border-box;
  padding: 4px;
  li {
    width: 14%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 3rem;
  bottom: 2.66667rem;
  padding: 0 0.42667rem;
  overflow: scroll;
}

.bottom {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 0.5rem 0;
  border-top: 1px solid #d6dce0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .voice {
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .expression {
    width: 8rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      flex: 1;
      height: 2rem;
    }
  }
  img {
    width: 2rem;
  }
  textarea {
    width: 100%;
    border: 1px solid #d6dce0;
    word-wrap: break-word;
    word-break: normal;
  }
}
</style>