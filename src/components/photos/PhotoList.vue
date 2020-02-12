<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<!-- mui自带的tap，类似click -->
						<a v-for="item in imgcategoryList" :key="item.pid" 
							:class="['mui-control-item',item.pid == 0 ? 'mui-active' : '']"
							@tap="getImgListByCateId(item.pid)">
							{{ item.ptitle }}
						</a>
					</div>
				</div>
		</div>
		<!-- 图片区域 -->
		<ul class="photo_list">
			<router-link :to="'/home/photoInfo/'+item.id" tag="li" v-for="item in list" :key="item.id">
				<img v-lazy="item.imgUrl">
				<div class="info">
					<h1 class="info-title">{{ item.imgTitle }}</h1>
					<div class="info-body">{{ item.imgSummary }}</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>

<script>

import { Toast } from 'mint-ui';
// 1. 导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
		return {
			imgcategoryList: [],	// 图片类型
			list: [] 	//图片列表数组
		}
	},
	created(){
		this.getImgcategory();
		// 进入页面就加载全部图片数据
		this.getImgListByCateId(0);
	},
	mounted(){ 
		// 当组件中的DOM结构被渲染好并放入到页面，会执行这个钩子函数
		// 如果要操作元素，最好在mounted里面，因为这里的DOM元素是最新的
		// 2. 初始化滑动控件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
    methods:{
		// 获取所有图片分类
		getImgcategory(){
			this.$http.get('imgcategory/list').then(result => {
				result.body.unshift({ pid: 0 , ptitle: '全部'});
				// console.log(result.body);
				this.imgcategoryList = result.body
			},err => {
				Toast("图片数据加载异常！" + err);
			})
		},
		getImgListByCateId(cateId){
			// 根据分类id，获取图片列表
			this.$http.get('img/list/' + cateId).then(result =>{
				this.list = result.body;
				console.log(result.body);
			},err => {
				Toast("图片数据加载异常！" + err);
			})
		}
    }
}
</script>

<style lang="scss" scoped>
	*{
		touch-action: pan-y; //阻值滑动出现错误，这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
	}
	.photo_list{
		margin: 0;
		padding: 10px;
		padding-bottom: 0;

		list-style: none;
		li{
			text-align: center;
			margin-bottom: 10px;
			background-color: #cccccc;
			box-shadow: 0 0 10px #999;
			position: relative;

			img{
				width: 100%;
				vertical-align: middle;
			}
			
			img[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}

			.info{
				width: 100%;
				color: #fff;
				text-align: left;
				background-color: rgba(0,0,0,0.5);
				// 相对定位
				position: absolute;
				bottom: 0;
				left: 0;
				// 最大高度
				max-height: 84px;
				.info-title{
					font-size: 14px;
				}
				.info-body{
					font-size: 13px;
				}
			}
		}
		
	}
	
</style>
