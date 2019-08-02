<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a v-for="item in imgcategoryList" :key="item.pid" :class="['mui-control-item',item.pid == 0 ? 'mui-active' : '']">
							{{ item.ptitle }}
						</a>
						
					</div>
				</div>
			</div>
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
		}
	},
	created(){
		this.getImgcategory();
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
			this.$http.get('getImgcategory').then(result => {
				result.body.unshift({ pid: 0 , ptitle: '全部'});
				console.log(result.body);

				this.imgcategoryList = result.body
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
</style>
