import Vue from "vue";
import Vuex from "vuex";
import router from "./../router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
  },
  getters: {
    loginState: (state) => {
      return state.isLoggedIn;
    },
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
      if (router.currentRoute.name !== "dashboard") router.push("/");
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("loginState");
      localStorage.removeItem("username");

      router.push("/login");
    },
  },
  actions: {
    login({ commit }, expires_in) {
      setTimeout(() => {
        commit("logout");
      }, expires_in);
      commit("login");
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});
