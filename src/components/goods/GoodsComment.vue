<template>
    <div>
        <cmtbox :id="$route.params.gid"></cmtbox>
    </div>
</template>

<script>
import cmtbox from "../subComponents/comment.vue"
export default {
    components: {
        cmtbox
    }
}
</script>

<style lang="scss" scoped>

</style>