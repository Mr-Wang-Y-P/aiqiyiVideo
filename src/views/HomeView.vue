<template>
  <div class="body">
    <header class="header">
      <a-input-search
        class="input"
        v-model:value="input"
        placeholder="输入要看的影片"
        @search="onSearch"
      />
    </header>
    <a-layout has-sider class="content">
      <a-layout-sider
        class="sider"
        :style="{
          overflow: 'auto',
          height: 'calc(100% - 60px)',
          position: 'fixed',
          left: 0,
          top: 60,
          bottom: 0,
        }"
      >
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <div :key="item.channelid" v-for="item in navList">
            <a-menu-item :key="item.channelid">
              <div class="flex">
                <a-tooltip :title="item.text" placement="right" color="#87d068">
                  <img
                    v-show="item.channelid !== selectedKeys[0]"
                    :src="item.icon_default"
                  />
                  <img
                    v-show="item.channelid === selectedKeys[0]"
                    :src="item.icon_selected"
                  />

                  <span class="nav-text">{{ item.text }}</span>
                </a-tooltip>
              </div>
            </a-menu-item>
          </div>
        </a-menu>
      </a-layout-sider>
      <a-layout class="layout">
        <MovieList :searchText="searchValue" :channelid="selectedKeys[0]" />
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MovieList from "@/components/MovieList.vue";

import { getNavList } from "../util/index";
const selectedKeys = ref([1]);
const router = useRouter();
const input = ref("");
const navList = ref([]);
const searchValue = ref("");

onMounted(async () => {
  const res = await getNavList();
  navList.value = res.items.filter((item) => item.channelid < 100);
});
const jumpRouter = (url) => {
  console.log(url);
  router.push(url);
};
const onSearch = () => {
  // EventBus.emit('inputValueChanged', input.value);
  searchValue.value = input.value;
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input {
  width: 80%;
}
.body {
  height: 100%;
}
.content {
  height: calc(100% - 60px);
}
.layout {
  margin-left: 200px;
}
.flex {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.nav-text {
  position: relative;
  top: 2px;
  margin-left: 6px;
}
@media screen and (max-width: 800px) {
  .sider {
    width: 80px !important;
    flex-basis: 80px !important;
    min-width: 80px !important;
  }
  .layout {
    margin-left: 80px;
  }
  ::v-deep
    :where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark.ant-menu-inline
    .ant-menu-item {
    padding: 0 !important;
  }
  .nav-text {
    display: none;
  }
  .flex{
    justify-content: center;
  }
}
.sider::-webkit-scrollbar {
  width: 0; /* 隐藏滚动条，设置宽度为0 */
  background-color: transparent; /* 隐藏滚动条背景 */
}
.sider {
  scrollbar-width: none; /* 隐藏滚动条 */
  -moz-user-select: none; /* 阻止鼠标选择，保持可滚动性 */
  -ms-overflow-style: none;
}
</style>
