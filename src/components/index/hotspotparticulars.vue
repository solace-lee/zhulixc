<template>
    <div class="tmpl">
        <v-header></v-header>
        <div class="head"></div>
        <div class="box">
            <!-- <div class="article_title">
                <h1>名字</h1>
                <span>分类</span>
            </div>
            <div class="article_content">
                <p>内容</p>
            </div> -->
            <div v-html='particulars'>

            </div>
            <!-- <a :href="flashUrl"><h1>{{title}}</h1></a> -->
        </div>



    </div>
</template>

<script>
    import Header from '@/common/_header.vue';
    export default {
        components: {
            'v-header': Header,
        },
        data() {
            return {
                // 文章id
                flash: '',
                flashUrl:'',
                title:'',
                // 文章内容
                particulars: '',
                // 文章分类名字
                classifyname: '',
            };
        },
        created() {
            this.getflashId();
            this.getparticulars();
        },
        methods: {
            //   获取url中的flash
            getflashId() {
                this.flash = this.$route.query.flash;
                this.title = this.$route.query.title;

            },
            //   获取文章详情
            getparticulars() {
                var that = this;
                this.$http.get(this.HOME+'flash/GetFlash?flash=' + this.flash).then(res => {
                    console.log(res);
                    this.flashUrl = res.data.Data;
                    // console.log(this.flashUrl);
                    this.$http.get(this.flashUrl).then(res=>{
                        console.log(res);
                        this.particulars = res.data;
                        
                    })
                })
            },
        }
    };
</script>
<style lang="less" scoped>
    .head {
        width: 100%;
        height: 4rem;
    }

    .tmpl {
        background-color: #fff;
        width: 100%;
        height: 100%;
        .box {
            padding: 1rem;
          
        }
    }
</style>