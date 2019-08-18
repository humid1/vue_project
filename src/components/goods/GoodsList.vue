<template>
    <div class="goods-list">
        <!-- <router-link tag="div" :to="'/home/goodsInfo/'+item.gid" class="goods-item" v-for="item in goodsList" :key="item.gid">
            <img :src="item.gImgurl" alt="图片飞了">
            <h1 class="title">{{ item.gTitle }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.gSellPrice }}</span>
                    <span class="old">￥{{ item.gMarketPrice }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.gStockQuantity }}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中有两种跳转方式 -->
        <!-- 1. 使用a标签的形式叫 标签跳转 -->
        <!-- 2. 使用window.location.href的形式，叫做编程式导航 -->
        <div class="goods-item" v-for="item in goodsList" :key="item.gid"
            @click="goDetail(item.gid)">
            <img :src="item.gImgurl" alt="图片飞了">
            <h1 class="title">{{ item.gTitle }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.gSellPrice }}</span>
                    <span class="old">￥{{ item.gMarketPrice }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.gStockQuantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button @click="getMore()" type="danger" size="large" icon="more" plain>加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            pageNum: 1,     //分页页数
            goodsList: []   // 商品列表
        }
    },
    created(){
        this.getGoodsList();
    },
    methods: {
        // 获取商品数据的方法
        getGoodsList(){
            this.$http.get("getGoods?pageNum=" + this.pageNum).then(result =>{
                // console.log(result.body.list);
                // this.goodsList = result.body.list;
                this.goodsList = this.goodsList.concat(result.body.list);
            },err => {
                Toast("商品数据读取失败！" + err);
            })
        },
        // 点击加载更多
        getMore(){
            this.pageNum++ ;
            this.getGoodsList();
        },
        // 使用js代码的形式进行路由导航
        goDetail(gid){
            // 区分this.$route 和this.$router这两个对象，
            //   this.$route 是路由参数对象，所有路由中的参数，param，query都属于他
            //   this.$router 是一个路由导航对象，是专门来实现编程式导航的，用它 可以方便的 使用js代码，实现路由的前进，后退，跳转到新的url地址

            // console.log(this);
            // 1.简单传递
            // this.$router.push('/home/goodsInfo/'+gid);
            // 2.传递对象
            // this.$router.push({ path:'/home/goodsInfo/'+gid });
            // 3.命名的路由参数传递
            this.$router.push({name: 'goodsInfo',params: {gid} });
        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-between;
        h1{
            // 复制jd的代码
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 32px;
            padding: 4px;
        }

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 9px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;

            img{
                width: 100%;
                height: 165px;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                     .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                     }
                     .old{
                        text-decoration: line-through;
                        font-size: 13px;
                        margin-left: 5px;
                     }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
