// 入口文件
import Vue from 'vue'

// 导入 App.vue 组件
import app from './App.vue'

// 按需导入 MintUI 组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

// 导入MUI
import './lib/mui/css/mui.css'

var vm = new Vue({
    el: '#app',
    render: c => c(app) // 导入组件
})