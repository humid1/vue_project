<template>
    <div class="shopcar-container">
        <!-- 商品区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="item in goodsCarList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img :src="item.thumbPath" alt="图片加载失败">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.price }}</span>
                                <numbox :count="item.count"></numbox>
                                <a href="#">删除</a>
                            </p>
                        </div>
                    </div>
				</div>
			</div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from '../subComponents/shopCar_numbox.vue';
export default {
    data() {
        return {
            goodsCarList: [] // 购物车中所有商品的数据
        }
    },
    components: {
        numbox
    },
    created(){
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            // 1.获取到store中所有的商品id，然后拼接一个用逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => {
                idArr.push(item.id);
            });
            // 如果购物车中没有数据，则直接返回会报错
            if(idArr.length <= 0){
                return;
            }
            // 获取购物车商品列表
            this.$http.get('shopcar/getlist/'+idArr.join(",")).then(result => {
                console.log(result.body);
                this.goodsCarList = result.body;
            });
        }

    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-content: center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h1{
                    font-size: 14px;
                    // 复制jd的代码
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    height: 27px;
                    padding: 0px 5px 5px 5px;
                }
                p{
                    margin-top: 5px;
                }
                .price{
                    color: red;
                    font-weight: bold
                }
            }
        }
    }
</style>