// 入口文件
import Vue from 'vue'

// 1.1 导入路由
import VueRouter from 'vue-router'
// 1.2 安装路由模块
Vue.use(VueRouter) 

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)

// 导入 App.vue 组件
import app from './App.vue'

// 按需导入 MintUI 的 Header 组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
// 按需导入 MintUI 的 Swipe 组件(轮播图)
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入MUI
import './lib/mui/css/mui.css'
// 导入MUI扩展图标样式
import './lib/mui/css/icons-extra.css'


// 1.3 导入自定义的路由模块
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app), // 导入组件
    router // 1.4 挂载路由对象到vm实例中
})