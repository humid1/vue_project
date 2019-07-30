// 1.导入vue-router包
import VueRouter from 'vue-router'

// 导入tabbar 相关的路由组件
import homeContainer from './components/tabbar/HomeContainer.vue'
import memberContainer from './components/tabbar/MemberContainer.vue'
import shopcarContainer from './components/tabbar/ShopcarContainer.vue'
import searchContainer from './components/tabbar/SearchContainer.vue'


// 3.创建路由对象
const router = new VueRouter({
    routes: [ // 配置路由规则
         { path:'/home', component: homeContainer},
         { path:'/member', component: memberContainer},
         { path:'/shopcar', component: shopcarContainer},
         { path:'/search', component: searchContainer},
    ],
    linkActiveClass: 'mui-active' // 覆盖默认路由高亮的类
})
// 把路由对象暴露出去
export default router;