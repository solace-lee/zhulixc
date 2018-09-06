<template>
    <div class="tmpl">
        <v-header></v-header>
        <div class="head" style='width: 100%;height: 3.5rem;'></div>
        <div class="box">
            <div class="boxleft">
                <img src="../../img/indexImage/ji.png" alt="">
            </div>
            <div class="boxcentent">
                <span>暂无消息</span>
                <span></span>
            </div>
            <div class="boxright">
                
            </div>

        </div>
        <v-footer></v-footer>
    </div>

</template>

<script>
	import Footer from "@/common/_footer.vue";
    import Header from "@/common/_header.vue";
    export default {
        components: {
            "v-header": Header,
            "v-footer": Footer,
        },
        data() {
            return {};
        },

        methods: {
            loginEasemob(){}
        }
    };
</script>
<style scoped lang="less">
    .box {
        height: 18vw;
        display: flex;
          background-color: #fff;
          padding: 0 3vw;
          margin-top: 10px;
          margin-bottom: 5px;
        .boxleft {
            width: 20vw;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 80%;
                height: 80%;
            }
        }
        .boxcentent {
            flex: 1;
            padding-left: 3vw;

            span {
                display: block;
                width: 40vw;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.9rem;
                color: #333333;
            }
            span:first-child{
            	font-weight: 700;
            }
            span:nth-child(2) {
                padding-top: 8vw;
                color: #666666;
                font-size: .6rem;
            }
        }
        .boxright {
            height: 100%;
            font-size: 0.6rem;
            color: #666666;
        }
    }
</style>