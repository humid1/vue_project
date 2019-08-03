<template>
    <div class="photoInfo-container">
        <h3>标题: {{ photoInfo.imgTitle }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.addTime | dataFormat }}</span>
            <span>点击次数：{{ photoInfo.imgClick }}</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="imgsrc">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>

        <!-- 图片的内容区域 -->
        <div class="content" v-html="photoInfo.imgContent"></div>

        <!-- 放置评论子组件 -->
        <comment-box :id="this.pid"></comment-box>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from '../subComponents/comment.vue'

export default {
    data(){
        return {
            pid: this.$route.params.pid,
            photoInfo: {},
            list: []
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            // 获取图片详情
            this.$http.get('getPhotoInfo/' + this.pid).then(result => {
                // console.log(result.body);
                this.photoInfo = result.body;
            },err => {
                Toast("获取信息失败！"+err);
            })
        },
        getThumbs(){
            // 获取缩略图数据
            this.$http.get('getThumImages/'+this.pid).then(result =>{
                // 循环每个图片的数据，补充数据
                result.body.forEach(item => {
                    item.w = 600;
                    item.h = 400;
                    item.msrc = item.src;
                });
                // 把补全的数据添加到list集合
                this.list = result.body;
                console.log(this.list);

            },err => {
                Toast("获取缩略图信息失败！"+err);
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components: {
        "comment-box": comment
    }
}
</script>

<style lang="scss">
    .photoInfo-container{
        padding: 3px;
        h3{
            font-size: 16px;
            color: #26A2FF;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
        }
        .imgsrc{
            
            .my-gallery{
                padding-left: 5px;
                figure{
                    display: inline;
                    margin: 0;
                    img{
                        box-shadow: 0 0 6px #666;
                        width: 30%;
                    }
                }
            }
            
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>
