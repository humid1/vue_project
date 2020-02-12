<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.nid">
					<router-link :to=" '/home/newsInfo/' + item.nid ">
						<img class="mui-media-object mui-pull-left" :src="item.imgUrl">
						<div class="mui-media-body">
							<h1>{{ item.ntitle }}</h1> 
							<p class='mui-ellipsis'>
                                <span>发表时间：{{ item.addTime | dataFormat }}</span>
                                <span>点击：{{ item.nclick }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
				
			</ul>
    </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList(){ // 获取新闻列表
            // 基于全局Vue对象使用http
            this.$http.get('news/list').then( result => {
                this.newsList = result.body;
            },err => {
                Toast('数据访问错误，' + err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
