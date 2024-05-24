<template>
    <div class="body">
        <a-button @click="goBack" type="primary">返回</a-button>
        <div v-show="movie" class="movieItem1">
      <div class="header">
        <div class="left">
          <img class="img" :src="movie?.albumInfo?.imgH" alt="" />
        </div>
        <div class="right">
          <div class="title text-ellipsis">{{ movie?.albumInfo?.title }}</div>
          <div class="tags" v-show="movie?.albumInfo?.tags">
            <a-tag
              v-for="(item, index) in movie?.albumInfo?.tags"
              :key="index"
              color="#f50"
              >{{ item.text }}</a-tag
            >
          </div>
          <div>{{ movie?.albumInfo?.category.value }}</div>
          <div class="text-container">{{ movie?.albumInfo?.introduction }}</div>
          <a-button @click="jumpMovie(movie)" class="btn" type="primary" danger>去播放</a-button>
        </div>
      </div>
      <div class="footer" v-show="movie?.albumInfo?.videos">
        <a-pagination v-model:current="current" pageSize="1" :total="movie?.albumInfo?.videos?.length">
          <template #itemRender="{ type, originalElement }">
            <component :is="originalElement" v-if="type !== 'prev' && type !== 'next'"></component>
          </template>
        </a-pagination>
      </div>
    </div>
    </div>
</template>

<script setup>
import {useRoute,useRouter} from 'vue-router'
import {onMounted,ref} from 'vue'
import {searchPage} from '../util/index'
const route = useRoute()
const router = useRouter()
const movie = ref(null)
const current = ref(1)
const searchParams = {
  key: "",
  version: "12.5.15971",
  pageNum: "1",
  pageSize: "20",
  durationLevel: "",
  channelName: "",
  sitePublishDate: "",
  site: "",
  bitrate: "",
  pu: "",
  u: "005bb7db399a6241b67270177df7011c",
  mode: "1",
  source: "default",
  scale: "150",
  token: "",
  userVip: "0",
  conduit: "",
  vipType: "-1",
  os: "",
  ad: "%5B%7B%22lm%22%3A5%2C%22position%22%3A%22library%22%7D%5D",
  adExt: "%7B%22r%22%3A%221.1.4-ares6-pure%22%7D",
};
const goBack = ()=>{
  router.replace('/home')
}
onMounted(async()=>{
    console.log(route);
    const res = await searchPage({...searchParams,key:route.query.key})
    console.log(res);
    movie.value = res.data.templates[0]
    console.log(movie.value);
})

const jumpMovie =(item)=>{
    let url = ''
    if(item.albumInfo.videos){
       url = item.albumInfo.videos[current.value - 1].pageUrl
    }else{
      url = item.albumInfo.pageUrl
    }
    window.open('https://jx.xmflv.com/?url='+url,"_blank")
}
</script>

<style  scoped>
.body{
    width: 100vw;
    height: 100vh;
}
.movieItem1{
  color: #000;
  width: 100%;
  height: 100%;
}

.btn{
  position: absolute;
  bottom: 0;
}
.text-ellipsis {
  display: block;
  width: 100px; /* 根据需要设置宽度 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header {
  display: flex;
}
.left {
  width: 70%;
  /* height: 120px; */
}
.img {
  width: 70%;
  /* height: 120px; */
  object-fit: cover;
}
.right {
  margin-left: 10px;
  height: 100%;
  height: 200px;
  position: relative;
}
.title {
  font-size: larger;
  color: #00f48e;
}
.footer {
  margin: 20px;
  /* height: 60px; */
}
.text-container {
  font-size: 12px;
  display: -webkit-box; /* For Safari and Chrome */
  display: -moz-box; /* For Firefox */
  display: box; /* For standards-compliant browsers */
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical; /* Orientation must be vertical */
  overflow: hidden; /* Hide the overflowing content */
  text-overflow: ellipsis; /* Display an ellipsis when content overflows */
  white-space: normal; /* Allow line breaks */
}
.w-full {
  width: 100%;
}
@media screen and (max-width: 800px) {
  .tags{
    display: none;
  }
  .header{
    transform: scale(0.8);
  }
}
</style>