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
## 发表评论
    1. 把文本框做双向绑定，发表按钮绑定一个事件
    2. 校验评论内容是否为空，如果为空，则Toast提示用户，评论内容不能为空
    3. 通过vue-resource发送一个请求，把评论内容提交给后台服务器
    4. 当发表评论ok后，重新加载评论数据列表，以查看最新的评论
        当评论成功后，在客户端手动拼接出一个 最新的评论对象，然后调用数组   的unshift方法，把最新的评论，追加到data中的comments的开头。
## 改造图片分析按钮为路由链接并显示对应的组件页面

## 图片列表 组件页面结构
    1. 制作 顶部的滑动条
    2. 制作底部的图片列表
    3. 使用 MUI 中的tab-top-webview-main.html ，把slider区域的mui-fullscreen类去掉。
    4. 顶部滑动的动态JS
        导入mui.js
        使用官方提供的方式进行初始化：
        、、、
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        、、、
    5. 在导入mui.js中。出现的问题
        1) 可能mui.js中用到的'caller','callee',and 'arguments' 东西，但是，webpack 打包好的bundle.js中，默认是启用严格模式的，所以，两者冲突。
        解决方案：(1) 把mui.js中的非严格模式的代码改掉，这个方法不现实。
                 (2) 把webpack打包时候的严格模式禁用掉。
                    先安装 npm i babel-plugin-transform-remove-strict-mode -D
                    在.babelrc中配置 { "plugins": ["transform-remove-strict-mode"] }，去掉babel-plugin-transform-runtime.
                    加上 touch-action: pan-y; 样式
        2) 解决首次 进入页面 顶部无法滑动 (初始化滑动条必须等DOM元素加载完毕)
            把滑动条代码，添加到 mounted() 方法中
        3) 解决 tabbar底部栏 无法切换(与滑动条的class=mui-tab-item冲突)
            修改class，复制之前的css样式.......好麻烦
    6. 获取所有分类，并渲染分类列表
## 制作图片列表区域
    1. 图片列表需要使用lazy加载技术，我们可以使用Mint-UI提供现成
    2. 根据'lazy-load'的使用文档，尝试使用，渲染图片列表数据
## 实现了 点击图片 跳转到图片详情页面
    1. 把各个图片详情li改为router-link，需要使用tag属性渲染为那种元素
## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中 缩略图的功能 
    1. 使用vue-preview这个缩略图插件
    2. 获取到所有的图片列表，然后使用v-for进行渲染
## 制作 商品列表

## 使用手机调试Vue项目
    1. 前提：要保证自己的手机和当前做项目的电脑，处于同一个WIFI环境中；
    2. 当手机和电脑处于同一个WIFI中之后，大家需要运行终端命令`ipconfig`，查找 `无线局域网适配器` 的网络配置，复制其`IPv4`的地址；
    3. 把复制的Ip地址，粘贴到`package.json`中：`"dev": "webpack-dev-server --open --port 3000 --host 127.0.0.1 --hot"`， 将`--host`指令设置为 WIFI的地址；
    4. 在确保手机和自己的电脑处于同个WIFI的前提下，而且，正确使用 WIFI 地址运行了我们的项目之后，大家可以打开自己的手机浏览器，输入 `http:// + IP地址 + 端口号`，就能在手机上调试自己的网站了！



