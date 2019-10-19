// 1.导入vue-router包
import VueRouter from 'vue-router'

// 导入tabbar 相关的路由组件
import homeContainer from './components/tabbar/HomeContainer.vue';
import memberContainer from './components/tabbar/MemberContainer.vue';
import shopcarContainer from './components/tabbar/ShopcarContainer.vue';
import searchContainer from './components/tabbar/SearchContainer.vue';
// 导入首页-新闻相关的组件
import newsList from "./components/news/NewsList.vue";
import newsInfo from "./components/news/NewsInfo.vue";
// 导入图片分享相关的组件
import photoList from "./components/photos/PhotoList.vue";
import photoInfo from "./components/photos/PhotoInfo.vue";
// 导入商品相关的组件
import goodsList from "./components/goods/GoodsList.vue";
import goodsInfo from "./components/goods/GoodsInfo.vue";
import goodsDesc from "./components/goods/GoodsDesc.vue";
import goodsComment from "./components/goods/GoodsComment.vue";

// 3.创建路由对象
const router = new VueRouter({
    routes: [ // 配置路由规则
         { path:'/', redirect: '/home'},
         { path:'/home', component: homeContainer},
         { path:'/member', component: memberContainer},
         { path:'/shopcar', component: shopcarContainer},
         { path:'/search', component: searchContainer},
         { path:'/home/newsList', component: newsList},
         { path:'/home/newsInfo/:id', component: newsInfo},
         { path:'/home/photoList', component: photoList},
         { path:'/home/photoInfo/:pid', component: photoInfo},
         { path:'/home/goodsList', component: goodsList},
         { path:'/home/goodsInfo/:gid', component: goodsInfo, name:'goodsInfo'},
         { path:'/home/goodsDesc/:gid', component: goodsDesc, name:'goodsDesc'},
         { path:'/home/goodsComment/:gid', component: goodsComment, name:'goodsComment'},
    ],
    linkActiveClass: 'mui-active' // 覆盖默认路由高亮的类
})
// 把路由对象暴露出去
export default router;