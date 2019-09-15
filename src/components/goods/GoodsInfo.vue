<template>
    <div class="goodsInfo-container">
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :swipeList="lunboImg" :isFull="false"></swiper>
					</div>
				</div>
			</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品名称标题</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价:<del>￥1399</del>&nbsp;&nbsp;畅销价:<span class="now_price">￥1199</span>
						</p>
						<p>购买数量: <numbox></numbox></p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:</p>
						<p>库存情况:</p>
						<p>上架时间:</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain>图文介绍</mt-button>
					<mt-button type="danger" size="large" plain>商品评论</mt-button>
				</div>
			</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subComponents/swiper.vue'
import numbox from '../subComponents/goodsInfo_numbox.vue'

export default {
    data() {
		return {
			gid: this.$route.params.gid,
			lunboImg: [],
			goodsInfo: [],	
		}
	},
	created(){
		this.getLunbo();
	},
	methods: {
		getLunbo(){
			this.$http.get("getGoodsImglist/" + this.gid).then(result => {
				// 更换json数据的key值
				result.body.forEach(item => {
					item.url = "#";
				})
				console.log(result.body);
				this.lunboImg = result.body;
			},err => {
                Toast("商品图片信息读取失败！" + err);
            })
		},
		getGoodsInfo(){
			this.$http.get("getGoodsById/"+this.gid).then(result => {
				console.log(result.body);
				// 获取商品信息
				this.goodsInfo = result.body;
			});
		}
	},
	components: {
		swiper,
		numbox
	}
}
</script>

<style lang="scss" scoped>
.goodsInfo-container{
    background-color: #eeeeee;
    overflow: hidden;
}
.now_price{
	color: red;
	font-size: 16px;
	font-weight: bold;
}
.mui-card-footer{
	display: block;
	button {
		margin: 10px 0;
	}
}
</style>
