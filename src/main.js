// 入口文件
import Vue from 'vue'

// 1.1 导入路由
import VueRouter from 'vue-router'
// 1.2 安装路由模块
Vue.use(VueRouter) 

// 导入格式化时间的插件
import moment from 'moment'

// 定义全局的过滤器（处理时间显示的问题）
Vue.filter('dataFormat',function( dataStr, pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern);
})

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://localhost:8899/vue-api/'

// 导入 App.vue 组件
import app from './components/App.vue'

// 按需导入 MintUI 的 Header 组件 Swipe 组件(轮播图)
import { Header, Swipe, SwipeItem,Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

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