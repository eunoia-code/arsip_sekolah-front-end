import Vue from "vue";
import axios from "axios";

const guest = axios.create({
  baseURL: "http://localhost:8080/user",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

Vue.prototype.$guest = guest;
Vue.prototype.$api = api;

export { guest, api };
