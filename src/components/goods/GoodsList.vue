<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="//img14.360buyimg.com/n2/s240x240_jfs/t1/4136/40/6201/250287/5ba1f333E745fc8b9/b34c5ccc4c4fd548.jpg!q70.jpg" alt="">
            <h1 class="title">小米（MI） 小米8青春版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥1099</span>
                    <span class="old">￥1199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>    
        <div class="goods-item">
            <img src="//img10.360buyimg.com/n2/s240x240_jfs/t1/22746/35/11162/104085/5c8b6a19Eb8e8f34e/9cd57e3a481c7160.jpg!q70.jpg" alt="">
            <h1 class="title">小米 红米Redmi Note7Pro AI双摄 6GB+128GB 梦幻蓝 全网通4G 双卡双待 水滴屏拍照游戏手机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥1399</span>
                    <span class="old">￥1599</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>    
        <div class="goods-item">
            <img src="//img14.360buyimg.com/n2/s240x240_jfs/t1/4136/40/6201/250287/5ba1f333E745fc8b9/b34c5ccc4c4fd548.jpg!q70.jpg" alt="">
            <h1 class="title">小米（MI） 小米8青春版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥1099</span>
                    <span class="old">￥1199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>    
  
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-between;
        h1{
            // 复制jd的代码
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 32px;
            padding: 4px;
        }

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 9px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;

            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                     .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                     }
                     .old{
                        text-decoration: line-through;
                        font-size: 13px;
                        margin-left: 5px;
                     }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
