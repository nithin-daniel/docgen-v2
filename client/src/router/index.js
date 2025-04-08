import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import DocForm from "../components/DocForm.vue";
import SuperAdmin from "../components/SuperAdmin.vue";
import Admin from "../components/Admin.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/doc",
      name: "docform",
      component: DocForm,
    },
    {
      path: "/superadmin",
      name: "superadmin",
      component: SuperAdmin,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
  ],
});

export default router;
