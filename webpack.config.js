// 这个配置文件。就是一个js文件，通过Node中的模块，向外暴露一个配置对象
const path = require('path')
// 启用热更新的 第2步
const webpack = require('webpack') 
// 导入在内存中生成的HTML页面的插件，插件都要放到plugins节点中
// 作用：1. 自动在内存中根据指定页面生成一个内存页面
// 2. 自动把打包好的bundle.js追加到html页面中
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 设置mode(模式)，指定是“开发环境(development))”还是“生产环境(production)”
    mode: 'development',
    // 入口：表示要使用webpack打包哪个文件（语法规定必须写为 __dirname）
    entry: path.join(__dirname,'./src/main.js'),
    // 输出文件相关的配置
    output: {
        // 配合热编译服务器设置公共资源路径，但编译的时候需要移除。不加默认是以 / 开头
        // publicPath : "/assets/",
        path: path.join(__dirname,'./dist/'), // 指定打包好的文件输出到哪个目录中去
        filename: 'bundle.js', // 这是指定输出的文件的名称
    },
    devServer: { // 这是dev-server命令参数的第二种形式
        // --open --port 9000 --contentBase src --hot
        open: true, // 自动打开浏览器
        port: 8878, // 设置启动运行端口
        // host: '192.168.31.103', //可以让手机端访问
        // contentBase: '/', //指定托管目录
        // disableHostCheck: true, // 热更新报错则需要配置和下面这个
        hot: true   //启动热更新 第1步

    },
    plugins: [ // 配置插件的节点, webpack4.x 会自动加载HotModuleReplacementPlugin
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新模块对象 ，热更新 第3步    
        new VueLoaderPlugin(), // 配合.vue模板
        // 创建一个在内存生成html页面的插件
        new htmlWebpackPlugin({
            // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            template: path.join(__dirname,'./src/index.html'),
            filename: 'index.html', // 指定生成页面的名称
            
        })
    ],
    module: { // 这个节点用于配置所有 第三方模块 加载器
        rules: [ // 所有第三方模块的 匹配规则， use 是从右到左进行匹配加载器 ,webpack1.x可以省略 -loader
            { test: /\.css$/, use: ['style-loader','css-loader']}, // 配置.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader','css-loader','less-loader'] }, // 配置.less文件的第三方loader规则
            { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader'] }, // 配置.scss文件的第三方loader规则
            // limit给定的值是图片的大小，单位是字节（byte），如果我们引用的图片大于或等于给定的limit值，则不会被转为base64格式的字符串
            // name代表引入的指定名称，[name].[ext]代表与你放入的文件名和后缀一致
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=10240&name=[hash:8]-[name].[ext]'] }, // 处理图片路径，配置url地址,文件的第三方loader规则
            // 处理字体加载器
            { test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},//处理字体文件的loader
            { test: /\.js$/, use:'babel-loader',exclude: /node_modules/}, // 配置babel来转换高级的ES语法
            { test: /\.vue$/,use:'vue-loader'}, // 处理.vue的文件规则
        ]
    },
    resolve: { // 需要修改Vue被导入包的路径
        alias: {
            // "vue$": "vue/dist/vue.js"
        }
    }

}


// 在控制台直接输入webpack命令执行的过程
// 1、首先webpack发现，我们没有通过命令形式指定入口额出口
// 2、webpack就会去项目的根目录中，查找一个叫做webpack.config.js的配置文件
// 3、当找到配置文件webpack就会去执行这个配置文件
// 4、当webpack拿到配置对象后，就拿到配置对象中，指定的入口和出口，然后进行打包构建

// 使用webpack-dev-server这个工具，来实现自动打包编译的功能
// 1. 运行 npm i webpack-dev-server -D 把这个工具安装到项目额本地开发依赖
// 2. 安装完毕后这个工具用法和webpack命令用法一样
// 3.由于，我们是在项目中安装的webpack-dev-server，无法把它当做脚本命令在powershell终端直接运行（只有安装全局的 -g的工具，才能在终端中运行）
// 4. 注意：webpack-dev-server工具 ，要正常运行必须在项目中安装webpack
// 5. webpack-dev-server 打包生成的bundle.js,并没有存放到实际的物理磁盘上，而是托管在电脑内存中，所以我们在跟目录中找不到
