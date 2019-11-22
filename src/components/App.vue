<template>
    <div class="app-container">
        <!-- 顶部 Header 区域 -->
        <mt-header fixed title="我的Vue项目">
			<span slot="left" @click="goBack" v-show="flag">
        		<mt-button icon="back">返回</mt-button>
      		</span>
		</mt-header>

        <!-- 中间 router-view 区域 -->
		<transition >
        	<router-view></router-view>
		</transition>
        
        <!-- 底部 Tabbar 区域-->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-modify" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-modify" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-modify" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-modify" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
			<!-- 分析：如何实现加入购物车，拿到选择数量 -->
			<!-- 1. 经过分析发现：按钮属于goodsInfo页面，数字属于numbox组件 -->
			<!-- 2. 由于涉及到父子组件的嵌套，所以无法直接在goodsinfo页面中获取到商品数量 -->
			<!-- 3. 解决这个问题，涉及到子组件向父组件传值（事件调用机制） -->
			<!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数，传递这个方法 -->
		</nav>

    </div>
</template>

<script>

export default {
	data(){
		return {
			flag: true, // 默认显示返回按钮
		}
	},
	created() {
		if (this.$route.path === "/home") {
			this.flag = false;
		} else {
			this.flag = true;
		}
  	},
	methods: {
		goBack(){
			// 点击返回按钮，向后跳转
     		this.$router.go(-1);
     		console.log(this);
		}
	},
	watch: {
		// 根据路由地址的变化来判断是否需要返回键，当页面刷新的时候，不会触发 watch 中监听的 路由地址的变化
		"$route.path": function(newVal, oldVal) {
			if (newVal === "/home") {
				this.flag = false;
			} else {
				this.flag = true;
			}
		}
  	},
}
</script>

<style scoped>
	.mint-header{
		/* 解决滚动图片遮住顶部 */
		z-index: 99;
	}

    .app-container{
        padding-top: 40px; 
		padding-bottom: 50px;
		/* 使用动画时，隐藏顶部动画效果 */
		overflow-x: hidden;
    }

	.v-enter {
		opacity: 0;
		transform: translateX(100%);
	}

	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute
	}
	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}

	/* 复制样式之前有关class为mui-tab-item的样式 */
	.mui-bar-tab .mui-tab-item-modify.mui-active {
    	color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-modify {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-bar-tab .mui-tab-item-modify .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item-modify .mui-icon ~ .mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
