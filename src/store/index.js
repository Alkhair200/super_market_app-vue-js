import { createStore } from "vuex";
import axios from "axios";
import vuexPersistence from "vuex-persist";

export default createStore({
  state: {
    loggedIn: false,
    user: null,
    token: null,
  },

  plugins: [new vuexPersistence().plugin],
  getters: {
    get_loggedIn(state) {
      return state.loggedIn;
    },

    get_token(state) {
      return state.token;
    },

    get_user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_user(state, payload) {
      state.user = payload;
    },
    SET_loggedIn(state, payload) {
      state.loggedIn = payload;
    },
    SET_token(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    performLoginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://127.0.0.1:8000/api/login", {
            email: payload.email,
            password: payload.password,
          })
          .then((res) => {
            if (res.data.status == true) {
              commit("SET_token", res.data.access_token);
              commit("SET_loggedIn", true);
              commit("SET_user", res.data.user);
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    performLogoutAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://127.0.0.1:8000/api/auth/logout", {
            token: state.token,
          })
          .then((res) => {
            if (res.data.status == true) {
              commit("SET_token", null);
              commit("SET_loggedIn", false);
              commit("SET_user", null);
            }

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
