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
      meta: { requiresAuth: true, requiresAdmin: true }, // Only superadmin can access
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../components/Admin.vue"),
      meta: { requiresAuth: true }, // Both admin and regular users can access
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isSuperAdmin = authStore.userRole === "superadmin";
  const isAdmin =
    authStore.userRole === "admin" || authStore.userRole === "user";

  console.log("Navigation guard - Auth status:", {
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    userRole: authStore.userRole,
    to: to.name,
  });

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Redirecting to login - requires auth");
    next({ name: "login" });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect authenticated users based on their role
    if (isSuperAdmin) {
      next({ name: "superadmin" });
    } else {
      next({ name: "admin" });
    }
  } else if (to.meta.requiresAdmin && !isSuperAdmin) {
    // Only allow superadmin to access superadmin route
    console.log("Redirecting to admin - requires superadmin");
    next({ name: "admin" });
  } else {
    console.log("Proceeding to route");
    next();
  }
});

export default router;
