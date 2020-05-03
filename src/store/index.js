import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "You are Welcome!";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
  },
  actions: {
    register({ commit }, user, state) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8000/users/register",
          data: user,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((resp) => {
            const token = resp.data.token;
            console.log("my token", token);
            const user = resp.data.user;
            console.log("my details", user);
            localStorage.setItem("token", token);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", {
              token,
              user,
            });
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8000/users/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            console.log("my token", token);
            const user = resp.data.user;
            localStorage.setItem("token", token);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", {
              token,
              user,
            });
            console.log("produce user", user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
  },

  modules: {},
});
