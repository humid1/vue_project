<template>
    <div class="shopcar-container">
        <!-- 商品区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodsCarList" :key="item.gid">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.gid]"
                                @change="selectedChanged(item.gid, $store.getters.getGoodsSelected[item.gid])"></mt-switch>
                        <img :src="item.gimgurl" alt="图片加载失败">
                        <div class="info">
                            <h1>{{ item.gtitle }}</h1>
                            <p>
                                <span class="price">￥{{ item.gsellPrice }}</span>
                                <numbox :count="$store.getters.getGoodsCount[item.gid]" :gid="item.gid"></numbox>
                                <!-- 问题：如何从vuex购物车中获取商品数据 -->
                                <!-- 1.先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环的这条商品id，作为对象的属性名， count 值作为对象的属性值，这样把所有的商品循环一遍，就会得到对象
                                { 88:1,89:2 } -->
                                <a href="#" @click.prevent="remove(item.gid, i)">删除</a>
                            </p>
                        </div>
                    </div>
				</div>
			</div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content jiesuan">
                <div class="mui-card-content-inner">
                    <p>总计(不含运费)：</p>
                    <p>已勾选商品<span class="red"> {{ $store.getters.getSelectCountAndPrice.count }} </span>件，总价：<span class="red">￥{{$store.getters.getSelectCountAndPrice.amout }}</span></p>
                </div>
                <mt-button type="danger">去结算</mt-button> 
            </div>
        </div>
        <p>{{ $store.getters.getGoodsSelected }}</p>
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
            this.$http.get('shopcar/getlist2/'+idArr.join(",")).then(result => {
                console.log(result.body);
                this.goodsCarList = result.body;
            });
        },
        remove(id, index){
            // 点击删除，把商品从 store 中根据传递的id删除，同时把当前组件中的goodlist中，对应要删除的商品，使用index进行删除
            this.goodsCarList.splice(index, 1);
            this.$store.commit("removeFormCar",id);
        },
        selectedChanged(id, val){
            // 每当点击开关，把最新的 开关状态，同步到store中
            // console.log(id,val);
            this.$store.commit("updateGoodsSelected",{
                // id: id,
                id,
                selected: val
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
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                font-weight: 700;
                color: red;
            }
        }
    }
</style>