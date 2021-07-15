import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/virtualList",
    name: "virtualList",
    component: () => import("./views/VirtualList.vue"),
  },
  {
    path: "/chess",
    name: "chess",
    component: () => import("./views/Chess/Chess.vue"),
  },
  { path: "/demo", name: "demo", component: () => import("./views/Demo.vue") },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
