<template>
    <div class="tmpl">
        <div class="head">
            <div class="site">
                <div @click="$router.go(-1)">
                    <van-icon name="arrow-left" />
                    <span>返回</span>
                </div>
            </div>
            <div class="title">
                <span v-text='name'></span>
                <span>完成</span>
            </div>
        </div>
        <div style='height: 3rem;'></div>
        <div class="name" v-if="name=='修改昵称'">
            <input type="text" placeholder="请输入昵称">
        </div>
    

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'',
            }
        },
        created() {
            this.getname();
        },
        methods: {
              getname() {
                this.name = this.$route.query.name;
                console.log(this.name);
            },
        }
    }
</script>
<style scoped lang="less">
.name{
    width: 100%;
    height: 3rem;
    background-color: #fff;
    line-height: 3rem;
}
     .head {
    width: 100%;
    height: 4rem;
    background-color: #1bc6a3;
    display: flex;
    position: fixed;
    z-index: 100000;
    .site {
      width: 4rem;
      height: 100%;
      display: flex;
      position: absolute;
      color: #fff;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon-location {
          vertical-align: middle;
        }
        span {
          font-size: 1rem;
        }
      }
    }

    .title {
      // flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        color: #fff;
        margin-right: .5rem;
      }
      span:nth-child(2) {
        position: absolute; // top: 0;
        right: 1rem;
      }
    }
  }
</style>