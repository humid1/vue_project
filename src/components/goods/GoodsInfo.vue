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
				<div class="mui-card-header">{{ goodsInfo.gTitle }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价:<del>￥{{ goodsInfo.gMarketPrice }}</del>&nbsp;&nbsp;畅销价:<span class="now_price">￥{{ goodsInfo.gSellPrice }}</span>
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
						<p>商品货号: {{ goodsInfo.gNo }}</p>
						<p>库存情况: {{ goodsInfo.gStockQuantity }}件</p>
						<p>上架时间: {{ goodsInfo.gTime | dataFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(gid)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(gid)">商品评论</mt-button>
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
			gid: this.$route.params.gid,// 将路由参数对象中的id挂载到data，方便后期调用
			lunboImg: [],	// 获取到的轮播图信息
			goodsInfo: [],	// 获取到的商品信息
		}
	},
	created(){
		this.getLunbo();
		this.getGoodsInfo();
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
				// 获取商品信息
				this.goodsInfo = result.body;
			});
		},
		goDesc(gid){
			// 点击使用编程式导航跳转到，图文介绍页面
			this.$router.push({name:"goodsDesc",params: {gid} });
		},
		goComment(gid){
			// 点击跳转到 评论页面
			this.$router.push({ name: "goodsComment",params: {gid} });
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
