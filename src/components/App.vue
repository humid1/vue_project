<template>
    <div class="app-container">
        <!-- 顶部 Header 区域 -->
        <mt-header fixed title="我的Vue项目"></mt-header>

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
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-modify" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    </div>
</template>

<script>

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
