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
1. 获取数据，使用vue-resource
