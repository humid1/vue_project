<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model="msg" placeholder="请输入你要评论的内容！(最多输入120个字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large" @click="addComment()">发表评论</mt-button>
        
        <div class="cmt-list" v-for="(item,i) in comments" :key="item.cid">
            <div class="cmt-item">
                <div class="cmt-title">
                    <!-- <span>第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.cName }}</span><span>发表时间：{{ item.cCreatetime | dataFormat }}</span>  -->
                    <span>第{{ comments.length - i }}楼&nbsp;&nbsp;用户：{{ item.cName }}</span><span>发表时间：{{ item.cCreatetime | dataFormat }}</span> 
                </div>
                <div class="cmt-body">
                    {{ item.cContent === 'undefined' ? '此用户很懒啥都没说' : item.cContent }}
                </div>
            </div>
        </div>

        <p v-if="this.pages==0">暂无评论！</p>
        <mt-button type="danger" v-else-if="this.pages > this.pageNum" size="large" icon="more" plain @click="getMore()">加载更多</mt-button>
        <p v-else-if="this.pages <= this.pageNum">没有更多数据了!</p>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
             pageNum: 1, //默认展示第一页
             comments: [], // 所有的评论数据
             pages: 1,   // 页数
             msg: '',    //评论数据
        }
    },
    created(){
        this.getComment();
    },
    methods:{
        getComment(){ // 获取评论
            this.$http.get('comments/getList/' + this.id + '?pageNum=' + this.pageNum).then(result => {
                console.log(result.body);
                // this.comments = result.body.list;
                // 每当获取最新数据的时候，不把老数据清空，拼接上之前的数据
                this.comments = this.comments.concat(result.body.records);
                this.pages = result.body.current;
                // console.log(this.pages);
            },err => {
                Toast('读取数据失败！' + err.message);
            })
        },
        getMore(){    // 加载更多数据
            this.pageNum++ ;
            this.getComment();
        },
        addComment(){ // 增加评论

            // 校验是否为空内容
            if(this.msg.trim() == ''){
                return Toast('输入数据不能为空！')
            }
            // 发表评论
            // 参数1：请求的url地址，
            // 参数2：提交给服务器的数据对象
            // 参数3：定义提交时候，表单中数据的格式 { emulateJSON = true }
            this.$http.post('comments/add', {cnid: this.id,cContent: this.msg.trim()}).then(result =>{
                if(result.body != null){
                    this.comments.unshift({
                        cContent: this.msg.trim(),
                        cCreatetime: new Date(),
                        cName: '匿名用户',
                        cnid: this.id
                    });
                    this.msg = "";
                } else{
                    Toast('评论失败！');
                }
            },err => {
                Toast('读取数据错误！'+err);
            })
        }
    },
    props: ['id']
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        padding: 5px;
        h3{
            text-align: center;
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
