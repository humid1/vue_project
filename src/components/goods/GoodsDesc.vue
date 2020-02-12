<template>
    <div class="goodsDescContainer">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {}, // 图文数据
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc(){
            this.$http.get("goodsDesc/getOneDesc/" + this.$route.params.gid).then(result => {
                console.log(result.body);
                this.info = result.body;
            });
        }
    }
}
</script>

<style lang="scss">
    .goodsDescContainer{
        padding: 4px;
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
    }
    .content{
        img{
            width: 100%;
        }
    }
</style>