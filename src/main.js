// 入口文件
import Vue from 'vue'

// 1.1 导入路由
import VueRouter from 'vue-router'
// 1.2 安装路由模块
Vue.use(VueRouter) 

// 注册vuex
import Vuex from 'vuex';
Vue.use(Vuex);
// 每次刚进入网站，就会调用main.js在刚调用的时候，先从本地仓储中，把购物车的数据读出来放到store中
var car = JSON.parse(localStorage.getItem("car") || "[]");

// vuex的实例对象仓储
var store = new Vuex.Store({
    state: { // this.$store.state.****
        car: car, // 将购物车的商品数据，用另一个数组存起来，在 car 数组中，存储一些商品的对象，我们可以暂时将这个对象设计成这个样子
        // {id：商品的id,count：购买的数量,price：商品的单价,selected：false}
        
    },
    mutations: { // this.$store.commit('方法名称','按需传递的唯一参数')
        addToCar(state, goodCarInfo){
            // 点击加入购物车，把商品信息保存到store中的car上，
            // 1. 如果购物车中，之前就已经有了这个对应的商品，那么只需更新数量
            // 2. 如果没有则直接把商品数据，push到car中即可
        
            // 假设在购物车中，没有找到对应的商品
            var flag = false;
            // 查找是否存在该商品
            state.car.some( item => {
                if(item.id == goodCarInfo.id){
                    item.count += parseInt(goodCarInfo.count);
                    flag = true;
                    return true; // 结束循环，相当于break
                }
            })
            // 如果不存在该商品就进行添加到仓储中
            if(!flag){
                state.car.push(goodCarInfo);
            }
            // 当更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodCarInfo){
            // 修改购物车中商品的数量值
            console.log(goodCarInfo);
            state.car.some( item => {
                if(item.id == goodCarInfo.id){
                    item.count = parseInt(goodCarInfo.count);
                    return true; // 结束循环，相当于break
                }
            })
            // 当更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        removeFormCar(state, id){
            // 根据id，从store中的购物车中对应的那条商品数据
            state.car.some((item, i) => {
                if(item.id == id){
                    state.car.splice(i, 1);
                    return true;
                }
            })
            // 当更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            });
            // 当更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem("car",JSON.stringify(state.car));
        }
    },
    getters: { // this.$store.getters.****
        // 相当于计算属性，也相当于 filters
        getAllCount(state){
            var c = 0;
            state.car.forEach( item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getSelectCountAndPrice(state){
            var o = {
                count: 0,
                amout: 0.00,
            };
            state.car.some(item => {
                if(item.selected){
                    o.count += parseInt(item.count);
                    o.amout += item.count * item.price;
                }
            });
            return o;
        }
    }
})

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
// Vue.http.options.root = 'http://127.0.0.1:8085/vue_api/'
Vue.http.options.root = 'http://47.103.14.67/vue_api/'
// 全局设置post提交表单数据格式组织形式
Vue.http.options.emulateJSON = true;

// 导入 App.vue 组件
import app from './components/App.vue'

// 按需导入 MintUI 的 Header 组件 Swipe 组件(轮播图)
// import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

// 导入MUI
import './lib/mui/css/mui.css'
// 导入MUI扩展图标样式
import './lib/mui/css/icons-extra.css'


// 1.3 导入自定义的路由模块
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app), // 导入组件
    router, // 1.4 挂载路由对象到vm实例中
    store, // 将vuex挂载到vm实例中
})