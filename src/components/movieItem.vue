<template>
  <div :class="movie.template ? 'w-full' : ''">
    <div
      v-show="!movie.template"
      class="movieItem"
      @click="routerJump(movie.display_name)"
    >
      <div>
        <img class="movieItem-img" :src="movie.image_cover" alt="" />
      </div>
      <div class="movieItem-info">
        <div class="movieItem-info-title text-ellipsis">
          {{ movie.display_name }}
        </div>
        <div class="movieItem-info-type text-ellipsis">
          {{ movie.desc }}
        </div>
      </div>
    </div>
    <div v-show="movie.template" class="movieItem1">
      <div class="header">
        <div class="left">
          <img class="img" :src="movie.albumInfo?.imgH" alt="" />
        </div>
        <div class="right">
          <div class="title text-ellipsis">{{ movie.albumInfo?.title }}</div>
          <div class="tags" v-show="movie.albumInfo?.tags">
            <a-tag
              v-for="(item, index) in movie.albumInfo?.tags"
              :key="index"
              color="#f50"
              >{{ item.text }}</a-tag
            >
          </div>
          <!-- <div>{{ movie.albumInfo?.category.value }}</div> -->
          <div class="text-container">{{ movie.albumInfo?.introduction }}</div>
          <a-button @click="jumpMovie(movie)" class="btn" type="primary" danger>去播放</a-button>
        </div>
      </div>
      <div class="footer" v-show="movie.albumInfo?.videos">
        <a-pagination v-model:current="current" pageSize="1" :total="movie.albumInfo?.videos.length">
          <template #itemRender="{ type, originalElement }">
            <component :is="originalElement" v-if="type !== 'prev' && type !== 'next'"></component>
          </template>
        </a-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { defineProps } from "vue";
import {useRouter} from 'vue-router'
const router = useRouter()
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
const current = ref(1)
const jumpMovie =(item)=>{
    let url = ''
    if(item.albumInfo.videos){
       url = item.albumInfo.videos[current.value - 1].pageUrl
    }else{
      url = item.albumInfo.pageUrl
    }
    window.open('https://jx.playerjy.com/?url='+url,"_blank")
}


const routerJump = (name)=>{
  router.replace({
  path: '/tv',
  query: {
    key: name, 
  },
})
}
</script>

<style scoped>

.movieItem {
  width: 105px;
  height: 190px;
  background: #fff;
  margin: 10px;
  /* padding: 6px; */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.movieItem1{
  color: #000;
}
.movieItem-img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 105px;
  height: 140px;
  object-fit: contain;
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
.movieItem-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
}
.left {
  width: 200px;
  height: 120px;
}
.img {
  width: 200px;
  height: 120px;
  object-fit: cover;
}
.right {
  margin-left: 10px;
  height: 120px;
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
