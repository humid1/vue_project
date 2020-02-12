<template>
    <div>
        <!-- 轮播图区域 -->
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <a :href="item.url">
                    <img :src="item.img" alt="图片加载失败">
                </a>
            </mt-swipe-item>
        </mt-swipe> -->
        <swiper :swipeList="swipeList" :isFull="true"></swiper>
        <!-- 六宫格区域 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
                    <img src="../../images/menu1.png" alt="图片遇到问题">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
                    <img src="../../images/menu2.png" alt="图片遇到问题">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
                    <img src="../../images/menu3.png" alt="图片遇到问题">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="图片遇到问题">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="图片遇到问题">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="图片遇到问题">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subComponents/swiper.vue'

export default {
    data(){
        return {
            swipeList: [] // 保存轮播图的数组
        };
    },
    created() {
        this.getSwipe();
    },
    methods: {
        getSwipe(){
            this.$http.get('swipeData/list').then(result => {
                console.log(result.body);
                if(result.body != null){
                    this.swipeList = result.body;
                } else {
                    Toast('加载轮播图失败！');
                }
            },err => {
                Toast('数据访问错误，' + err);
            });
        }
    },
    components: {
        swiper
    }
}
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
    background-color: #ffffff;
    border: none;
    
    img{
        width: 60px;
    }

    .mui-media-body{
        font-size: 13px
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}
</style>
