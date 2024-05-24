<template>
  <div class="app">
    <header class="header" v-show="!isSearch">
      <a-carousel arrows>
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <LeftCircleOutlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <RightCircleOutlined />
          </div>
        </template>
        <div v-for="item in BannerList" :key="item.order">
          <img
            @click="routerJump(item.display_name)"
            style="width: 100%; object-fit: cover; height: 200px"
            :src="item.album_image_url_hover"
            alt=""
          />
        </div>
      </a-carousel>
    </header>
    <div class="body" :class="isSearch ?'h-full' :''" ref="scrollContainer" @scroll="handleScroll">
      <div class="content" :class="!isSearch ?'grid' :''">
        <div
          style="display: flex; align-items: center; justify-content: center"
          v-for="(item,index) in movieList"
          :key="index"
        >
          <movieItem :movie="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, nextTick } from "vue";
import movieItem from "./movieItem.vue";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { getPageList, searchPage } from "../util/index";
import {useRouter} from 'vue-router'
const router = useRouter()
const movieList = ref([]);
const pageNum = ref(1);
const scrollContainer = ref(null);
const loading = ref(false);
const BannerList = ref([]);

const isSearch = ref(false);

const params = {
  uid: "",
  passport_id: "",
  ret_num: "30",
  version: "12.5.15971",
  device_id: "005bb7db399a6241b67270177df7011c",
  channel_id: "",
  page_id: "1",
  session: "",
  rl: "1",
  os: "",
  conduit_id: "",
  vip: "0",
  auth: "",
  recent_selected_tag: "",
  ad: "%5B%7B%22lm%22%3A5%2C%22position%22%3A%22library%22%7D%5D",
  adExt: "%7B%22r%22%3A%221.1.4-ares6-pure%22%7D",
  mode: "24",
};

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
const props = defineProps({
  searchText: {
    type: String,
    required: false,
    default: "",
  },
  channelid: {
    type: Number,
    required: true,
  },
});

watch(
  () => props.searchText,
  async (newVal) => {
    if (newVal === "") {
      return;
    } else {
      const res = await searchPage({ ...searchParams, key: newVal });
      isSearch.value = true;
      console.log(res);
      movieList.value = res.data.templates.filter((item) => item.template < 108)
    }
  }
);
watch(
  () => props.channelid,
  async (newVal) => {
    isSearch.value = false;
    const res = await getPageList({ ...params, channel_id: newVal });
    nextTick(() => {
      movieList.value = res.data.filter((item) => {
        return item.channel_id === props.channelid;
      });
      BannerList.value = movieList.value.slice(-4);
      scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
);
onMounted(async () => {
  const res = await getPageList({ ...params, channel_id: props.channelid });
  movieList.value = res.data.filter((item) => {
    return item.channel_id === props.channelid;
  });
  if (movieList.value.length >= 4) {
    BannerList.value = movieList.value.slice(-4);
  } else {
    BannerList.value = movieList.value;
  }
});
const routerJump = (name)=>{
  console.log(name);
  router.replace({
  path: '/tv',
  query: {
    key: name, 
  },
})
}
const handleScroll = async () => {
  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    pageNum.value = pageNum.value + 1;
    if (isSearch.value) {
    } else {
      const res = await getPageList({
        ...params,
        page_id: String(pageNum.value),
        channel_id: props.channelid,
      });
      movieList.value = [
        ...movieList.value,
        ...res.data.filter((item) => {
          return item.channel_id === props.channelid;
        }),
      ];
    }
  }
};

const onSearch = () => {};
</script>
<style scoped>
.app {
  height: 100%;
  background: gainsboro;
}
.body {
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  height: calc(100% - 200px);
  scrollbar-width: none; /* 隐藏滚动条 */
  -moz-user-select: none; /* 阻止鼠标选择，保持可滚动性 */
  -ms-overflow-style: none; /* 隐藏滚动条 */
}
.body::-webkit-scrollbar {
  width: 0; /* 隐藏滚动条，设置宽度为0 */
  background-color: transparent; /* 隐藏滚动条背景 */
}

.content {
  padding: 12px;
  /* background: gainsboro; */
 
}
.grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
}
.header {
  width: 100%;
  height: 200px;
}
.input {
  width: 80%;
}

:deep(.slick-slide) {
  text-align: center;
  height: 200px;
  line-height: 200px;
  background: transparent;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: transparent;
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}

@media screen and (max-width: 800px) {
  .header{
    display: none;
  }
  .body{
    height: 100%;
  }
}
.h-full{
  height: 100%;
}
</style>
