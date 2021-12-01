import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Wallet from "../views/Wallet.vue";
import Report from "../views/Report.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Wallet",
    component: Wallet,
  },
  {
    path: "/reports",
    name: "Report",
    component: Report,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
