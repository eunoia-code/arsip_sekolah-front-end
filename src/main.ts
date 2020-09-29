import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import '@/assets/css/tailwind.css';
import VueTailwindPicker from 'vue-tailwind-picker';

import VueSimpleAlert from "vue-simple-alert";

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import axios from 'axios';
import VueAxios from 'vue-axios';
import AxiosPlugin from 'vue-axios-cors';

let vuePlugins = [
  Vuetify, AxiosPlugin, VueTailwindPicker, VueSimpleAlert
];
vuePlugins.forEach((x) => Vue.use(x));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
