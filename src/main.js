import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "axios";

import Swal from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Notifications from "@kyvg/vue3-notification";
// Import one of the available themes

import "vue-toast-notification/dist/theme-sugar.css";

createApp(App)
  .use(store)
  .use(Swal)
  .use(Notifications)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
