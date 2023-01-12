import { createRouter, createWebHistory } from "vue-router";
import { useZulipStore } from "../stores/zulip.ts";

const Login = () => import("../page/Login.vue");
const routes = [{ path: "/login", component: Login, name: "login" }];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const zulipStore = useZulipStore();
  if (zulipStore.zulip === undefined && to.name !== "login") {
    return { name: "login" };
  }
});
