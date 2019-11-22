<template>
<!-- 问题：我们不知道什么时候能够拿到 maxCount的值，但是，总归有一刻会得到真正的值-->
<!-- 可以使用watch 属性进行监听，监听父组件传递过来的max值，不管watch触发几次，最后一次一定是合法的值 -->
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='10'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
    <!-- 分析：子组件什么时候传递给父组件 -->
</template>

<script>
// 导入mui.js会出问题
import mui from '../../lib/mui/js/mui.min.js';

export default {
    mounted() {
        // 初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){
            // 每当文本框数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
            // console.log(this.$refs.numbox.value);
            // 使用 $emit 触发父组件的自定义事件
            this.$emit('getCount',parseInt(this.$refs.numbox.value)); // 传递给父组件
        }
    },
    props: ['maxcount'],
    watch: {
        // 属性监听
        'maxcount': function(newVal,oldVal){
            if(newVal != undefined && newVal != ""){
                mui(".mui-numbox").numbox().setOption('max',newVal);
            }
        }
    }
}
</script>

<style lang="sass" scoped>

</style>