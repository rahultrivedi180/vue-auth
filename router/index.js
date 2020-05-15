import Vue from "vue";
import VueRouter from "vue-router";
import adminRoutes from "./admin";
import authService from "@/services/auth.service";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  adminRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const authenticated = authService.isAuthenticated();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authenticated) {
      next("/login");
    } else {
      next();
    }
  } else if (!to.matched.some((record) => record.meta.requiresAuth)) {
    if (
      authenticated &&
      (to.fullPath === "/login" || to.fullPath === "/login/")
    ) {
      next({
        name: "dashboard",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
