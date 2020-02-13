<template>
    <div class="goodsInfo-container">
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
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
				<div class="mui-card-header" id="gTitle">{{ goodsInfo.gtitle }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价:<del>￥{{ goodsInfo.gmarketPrice }}</del>&nbsp;&nbsp;畅销价:<span class="now_price">￥{{ goodsInfo.gsellPrice }}</span>
						</p>
						<p>购买数量: <numbox @getCount="getSelectedCount" :maxcount="goodsInfo.gstockQuantity"></numbox></p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号: {{ goodsInfo.gno }}</p>
						<p>库存情况: {{ goodsInfo.gstockQuantity }}件</p>
						<p>上架时间: {{ goodsInfo.gtime | dataFormat }}</p>
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
			ballFlag: false, // 控制小球的显隐
			selectedCount: 1,// 保存用户选择商品数量
		}
	},
	created(){
		this.getLunbo();
		this.getGoodsInfo();
	},
	methods: {
		getLunbo(){
			this.$http.get("goodsImglist/getList/" + this.gid).then(result => {
				// 更换json数据的key值
				result.body.forEach(item => {
					item.url = "#";
					item.img = item.goodsImgsrc;
				})
				console.log(result.body);
				this.lunboImg = result.body;
			},err => {
                Toast("商品图片信息读取失败！" + err);
            })
		},
		getGoodsInfo(){
			this.$http.get("goods/getOne/"+this.gid).then(result => {
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
		},
		addToShopCar(){
			// 添加到购物车
			this.ballFlag = !this.ballFlag;
			// 拼接出一个商品对象信息，保存到store中car数组中的商品信息对象
			var goodsCarInfo = {
				id: this.gid,
				count: this.selectedCount,
				price: this.goodsInfo.gsellPrice,
				selected: true
			};
			// 添加到数据库中
			this.$http.post("shopcar/add",{gid: this.gid,count: this.selectedCount}).then(result => {
				if(Number(result.body) > 0){
					console.log("数据库中添加购物车成功！");
				}
			})
			// 调用store中的mutations来将数据传到vuex仓储中
			this.$store.commit('addToCar',goodsCarInfo);
		},
		beforeEnter(el){
			el.style.transform = "translate(0,0)";
		},
		enter(el,done){
			el.offsetWidth;
			// 动画的位移位置固定了，分辨率改变就会出现问题
			// 动态计算坐标轴信息

			// 获取小球在页面中的距离
			const ballPosition = this.$refs.ball.getBoundingClientRect();
			// 获取购物车上小球的距离,获取徽标
			const badge = document.getElementById("badge").getBoundingClientRect();
			// 获取x左轴到屏幕的距离作差
			const xDist = badge.left - ballPosition.left;
			// 获取y左轴到屏幕的距离作差
			const yDist = badge.top - ballPosition.top;

			// el.style.transform = "translate(88px, 168px)";
			// el.style.transform = "translate(" + xDist + "px," + yDist + "px)";
			el.style.transform = `translate(${xDist}px,${yDist}px)`; //反向字符串的拼接
			// el.style.transition = "all 1s ease";
			el.style.transition = "all 0.5s cubic-bezier(.41,-0.32,.99,.62)";
			done(); // 调用下面的函数
		},
		afterEnter(el){
			this.ballFlag = !this.ballFlag;
		},
		getSelectedCount(count){
			// 当子组件把选中的数量传递给父组件，把选中数据保存到data上
			this.selectedCount = count;
			// console.log("父组件接收到的数量值为"+this.selectedCount);
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
	#gTitle{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		height: 76px;
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
	.ball{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		top: 425px;
		left: 140px;
		// 层级问题
		z-index: 99; 
	}
}

</style>
