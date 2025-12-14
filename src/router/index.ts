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

// Base path должен совпадать с base в vite.config.ts
const getBasePath = () => {
  // Для продакшена используем base path из vite config
  // В браузере определяем автоматически
  if (import.meta.env.PROD) {
    const path = window.location.pathname;
    const match = path.match(/^\/([^/]+)\//);
    if (match && match[1] !== "index.html") {
      return "/" + match[1] + "/";
    }
    return "/favorite-car/"; // Замените на имя вашего репозитория
  }
  return "/";
};

const router = createRouter({
  history: createWebHistory(getBasePath()),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Навигационный guard для защищенных маршрутов!
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Home", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
