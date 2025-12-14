import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/autos",
    name: "AutoList",
    component: () => import("@/views/AutoList.vue"),
  },
  {
    path: "/autos/:id",
    name: "AutoDetail",
    component: () => import("@/views/AutoDetail.vue"),
    props: true,
  },
  {
    path: "/add-car",
    name: "AddCar",
    component: () => import("@/views/AddCar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/views/Favorites.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

// Используем BASE_URL из Vite, который автоматически подставляет правильный base path
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Навигационный guard для защищенных маршрутов
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Home", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
