# 这是vue一个的项目1

## 制作首页App组件
    1. 完成 Header 顶部区域，使用的是 Mint-UI 中的Header组件
    2. 制作 Tabbar 底部区域，使用的是 MUI 的Tabbar.html
        + 制作购物车图标需要把扩展图标的的.css样式和.ttf扩展字体库拷贝到项目中
        + 购物车图标添加class="mui-icon mui-icon-extra mui-icon-extra-cart"
    3. 要在中间区域放一个 router-view 来展示路由匹配到的组件

## 改造 tabbr 为 router-link
    在底部高亮显示默认路由类替换成mui的 linkActiveClass: 'mui-active' 覆盖默认路由高亮的类

## 点击 tabbar 中的路由链接，展示对应的路由组件
    添加4个路由组件

## 在首页添加轮播图 
    使用scss专用语法 &:nth-child(1/2/3) 来为每张轮播图添加背景
## 加载首页轮播图数据
    1. 获取后台数据，使用vue-resource (需要后台数据接口)
    2. this.$http.get(接口地址)获取数据
    3. 获取到的数据保存到data定义的 swipeList 上
    4. 使用 v-for 渲染每个 item 项
## 使用 MUI 添加首页六宫格样式

## 使用路由重定向改变首次访问的地址
    { path:'/', redirect: '/home'}
## 底部切换路由加上切换效果动画

## 首页新闻资讯，改造成路由链接
    页面制作
    1. 绘制界面，使用MUI
    2. 使用 vue-resource 获取数据
    3. 渲染数据到页面
## 实现新闻资讯列表，跳转到新闻详细
    1. 把列表中的每一项变为router-link。同时，在跳转的时候提供一个唯一的id标识符
    2. 创建新闻详情的组件页面，NewsInfo.vue
    3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来
## 实现新闻详情的 页面布局 和 数据渲染

## 单独封装一个评论的子组件 （comment.vue）
    1. 创建一个单独的comment.vue组件模板
    2. 在需要使用comment组件的页面中，先导入comment组件
    3. 在父组件，使用components属性，将刚才导入comment组件，注册为自己的子组件
    4. 将注册子组件时候的注册名称，以标签形式在页面中引入。
## 获取评论数据显示到页面中

## 实现点击...加载更多
    1. 为加载更多按钮，绑定点击事件，在事件中请求，下一页数据，
    2. 点击加载更多，让 pageNum++ , 然后重新调用 this.getComments() 方法重新获取最新的一页数据
    3. 防止新数据覆盖老数据，在点击更多时，获取到新数据，应该让老数据调用数组的 concat 方法，拼接上新数组