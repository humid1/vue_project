<template>
    <div>
        <!-- 谁使用轮播图组件，谁将为我们传递 swipeList-->
        <!-- 此时，这个数据应该是父组件向子组件来传值来设置 -->
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <a :href="item.url">
                    <img :src="item.img" alt="图片加载失败" :class={full:isFull}>
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析：为什么商品中的轮播不好看？ -->
    <!-- 1. 首页中的图片，它的宽高都是使用的100%的宽度 -->
    <!-- 2. 在商品详情页面中，轮播图，如果也使用的是100%宽度就不好看 -->
    <!-- 3. 商品详情中的轮播图期望是 100%，但是宽度为自适应 -->
    <!-- 4. 经过分析得到问题的原因：首页中轮播图和详情中的轮播图，分歧点是宽度是100%,还是自适应 -->
    <!-- 5. 既然这两个轮播图：其他方面是无冲突，只是宽度问题。 -->
</template>

<script>
export default {
    props: ["swipeList","isFull"]
}
</script>

<style lang="scss" scope>
.mint-swipe{
    height: 200px;

    // .mint-swipe-item:nth-child(1){
    //     background-color: aqua
    // }
    // scss专用语法
    .mint-swipe-item{
        text-align: center;
        // &:nth-child(1){
        //     background-color: aqua;
        // }
        // &:nth-child(2){
        //     background-color: red;
        // }
        // &:nth-child(3){
        //     background-color: blue;
        // }

        img{
            // width: 100%;
            height: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>