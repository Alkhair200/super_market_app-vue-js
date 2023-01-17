import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Importer from "../views/Importers.vue";
import Customer from "../views/Customers.vue";

import Company from "../views/Companies.vue";
import Product from "../views/Products.vue";
import Place from "../views/Places.vue";
import Item from "../views/Items.vue";
import Hodoor from "../views/Hodoor.vue";
import Enseraf from "../views/Enseraf.vue";
import HodoEnse from "../views/HodoorEnseraf.vue";
import BuyBill from "../views/BuyBill.vue";

import Login from "../views/Login.vue";
import Users from "../views/users.vue";
import store from "../store";

const routes = [
  {
    path: "/buy-bill",
    name: "buy-bill",
    component: BuyBill,
    meta: {
      secure: true,
    },
  },

  {
    path: "/report-user",
    name: "report-user",
    component: HodoEnse,
    meta: {
      secure: true,
    },
  },

  {
    path: "/enseraf",
    name: "enseraf",
    component: Enseraf,
    meta: {
      secure: true,
    },
  },

  {
    path: "/hodoor",
    name: "hodoor",
    component: Hodoor,
    meta: {
      secure: true,
    },
  },

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

  {
    path: "/company",
    name: "company",
    component: Company,
    meta: {
      secure: true,
    },
  },

  {
    path: "/product",
    name: "product",
    component: Product,
    meta: {
      secure: true,
    },
  },

  {
    path: "/place",
    name: "place",
    component: Place,
    meta: {
      secure: true,
    },
  },

  {
    path: "/item",
    name: "item",
    component: Item,
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
