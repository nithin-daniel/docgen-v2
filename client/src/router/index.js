import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../components/Login.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../components/Signup.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/doc",
      name: "docform",
      component: () => import("../components/DocForm.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/superadmin",
      name: "superadmin",
      component: () => import("../components/SuperAdmin.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../components/Admin.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin =
    authStore.userRole === "admin" || authStore.userRole === "superadmin";

  console.log("Navigation guard - Auth status:", {
    isAuthenticated,
    isAdmin,
    userRole: authStore.userRole,
    to: to.name,
  });

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Redirecting to login - requires auth");
    next({ name: "login" });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    console.log("Redirecting to admin - already authenticated");
    next({ name: "admin" });
  } else if (to.meta.requiresAdmin && !isAdmin) {
    console.log("Redirecting to admin - requires admin");
    next({ name: "admin" });
  } else {
    console.log("Proceeding to route");
    next();
  }
});

export default router;
