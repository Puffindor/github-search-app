import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import SearchInput from "../components/SearchInput.vue";
const routes: Array<RouteRecordRaw> = [
 {
  path: "/",
  component: SearchInput,
 },
];

const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes,
});

export default router;
