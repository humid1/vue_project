<template>
    <div class="newsInfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ news.ntitle }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ news.addTime | dataFormat }}</span>
            <span>点击：{{ news.nclick }} 次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="news.ncontent == null ? '<h2>抱歉！该新闻没有内容！！！</h2>' : news.ncontent"></div>
        
        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 1.导入评论子组件
import comment from '../subComponents/comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            news: {}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){ // 获取新闻详情
            this.$http.get('getOneNews/' + this.id).then(result => {
                // console.log(result.body);
                this.news = result.body;
            },err => {
                Toast('页面加载失败！' + err);
            });
        }
    },
    components: { // 用来注册子组件的节点
        'comment-box':comment
    }
}
</script>

<style lang="scss">
.newsInfo-container{
    padding: 0 5px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 14px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        h2{
            color: red;
            text-align: center
        }
        // 若有图片则需要加上，并去掉 scoped 属性
        // img{
        //     width: 100%;
        // }
    }
}
</style>
