<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你要评论的内容！(最多输入120个字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        
        <div class="cmt-list" v-for="(item,i) in comments" :key="item.cid">
            <div class="cmt-item">
                <div class="cmt-title">
                    <span>第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.cName }}</span><span>发表时间：{{ item.cCreatetime | dataFormat }}</span> 
                </div>
                <div class="cmt-body">
                    {{ item.cContent === 'undefined' ? '此用户很懒啥都没说' : item.cContent }}
                </div>
            </div>
        </div>

        <mt-button type="danger" v-if="this.pages != 0 && (this.pages != this.pageNum)" size="large" icon="more" plain @click="getMore()">加载更多</mt-button>
        <p v-else="">没有更多数据了!</p>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
             pageNum: 1, //默认展示第一页
             comments: [], // 所有的评论数据
             pages: 1   // 页数
        }
    },
    created(){
        this.getComment();
    },
    methods:{
        getComment(){ // 获取评论
            this.$http.get('getComments/' + this.id + '?pageNum=' + this.pageNum).then(result => {
                console.log(result.body.list);
                // this.comments = result.body.list;
                // 每当获取最新数据的时候，不把老数据清空，拼接上之前的数据
                this.comments = this.comments.concat(result.body.list);
                this.pages = result.body.pages;
                // console.log(this.pages);
            },err => {
                Toast('读取数据失败！' + err.message);
            })
        },
        getMore(){
            this.pageNum++ ;
            this.getComment();
        }
    },
    props: ['id']
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 80px;
            margin: 0;
        }
        p{
            text-align: center;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #CCC;
                    line-height: 30px;
                    display: flex;
                    justify-content: space-around;
                }
                .cmt-body{
                    line-height: 30px;
                }
            }
        }
    }
</style>
