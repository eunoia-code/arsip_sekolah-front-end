import Vue from "vue";
import axios from "axios";

// const api = 
// Vue.prototype.$api = api;

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});
