import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tv from "../views/Tv.vue";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      redirect:'/home'
    },
    {
      path: "/tv",
      name: "tv",
      component: Tv,
    },
  ],
});

export default router;
