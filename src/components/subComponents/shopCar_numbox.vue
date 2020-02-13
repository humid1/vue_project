<template>
<!-- 问题：我们不知道什么时候能够拿到 maxCount的值，但是，总归有一刻会得到真正的值-->
<!-- 可以使用watch 属性进行监听，监听父组件传递过来的max值，不管watch触发几次，最后一次一定是合法的值 -->
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="count" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
    <!-- 分析：子组件什么时候传递给父组件 -->
</template>

<script>
// 导入mui.js会出问题
import mui from '../../lib/mui/js/mui.min.js';

export default {
    data(){
        return {

        }
    },
    props: ["count"],
    mounted() {
        // 初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

</style>