<template>
<!-- 问题：我们不知道什么时候能够拿到 maxCount的值，但是，总归有一刻会得到真正的值-->
<!-- 可以使用watch 属性进行监听，监听父组件传递过来的max值，不管watch触发几次，最后一次一定是合法的值 -->
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="count" ref="numbox" @change="countChanged"/>
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
    props: ["count","gid"],
    mounted() {
        // 初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){
            // 数量改变了
            // console.log(this.$refs.numbox.value);
            // 每当数量值改变，则立即把最新的数量同步到 购物车中的store中，覆盖之前的数量值
            this.$store.commit("updateGoodsInfo",{
                id: this.gid,
                count: this.$refs.numbox.value
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>