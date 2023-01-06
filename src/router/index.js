import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Importer from "../views/Importers.vue";
import Customer from "../views/Customers.vue";
import Login from "../views/Login.vue";
import Users from "../views/users.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      secure: true,
    },
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },

  {
    path: "/users",
    name: "users",
    component: Users,
    meta: {
      secure: true,
    },
  },

  {
    path: "/importer",
    name: "importer",
    component: Importer,
    meta: {
      secure: true,
    },
  },

  {
    path: "/customer",
    name: "customer",
    component: Customer,
    meta: {
      secure: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.secure)) {
    if (!store.state.loggedIn) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!store.state.loggedIn) {
      next();
    } else {
      next({
        path: "/",
      });
    }
  } else {
    next();
  }
});

export default router;
