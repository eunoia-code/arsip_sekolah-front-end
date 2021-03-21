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

import moment from 'moment';
import VueHtmlToPaper from 'vue-html-to-paper';

import axios from 'axios';
import VueAxios from 'vue-axios';
// import AxiosPlugin from 'vue-axios-cors';
import api from "./plugins/axios";

let vuePlugins = [
  Vuetify, VueTailwindPicker, VueSimpleAlert
];
vuePlugins.forEach((x) => {
  Vue.use(x)
});

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
Vue.use(VueHtmlToPaper, options)

Vue.config.productionTip = false;

Vue.filter('format_tanggal', (value:any) => {
  if(value){
    return moment(String(value)).format('DD-MM-YYYY')
  }
})

Vue.filter('tanggal_dan_nama_bulan', (value:any) => {
  if(value){
    return moment(String(value)).locale('id').format('DD MMMM YYYY')
  }
})

Vue.filter('nama_hari', (value:any) => {
  if(value){
    return moment(String(value)).locale('id').format('dddd')
  }
})

const auth = localStorage.getItem('loginState')

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !auth) next({ name: 'login' })
  // if the user is not authenticated, `next` is called twice
  document.title = to.meta.title || "DPUTR KONKEP";
  next()
})

const levelStat = localStorage.getItem('level');
console.log(levelStat);


// router.afterEach((to, from) => {
//     // Use next tick to handle router history correctly
//     // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
//     Vue.nextTick(() => {
//       console.log(to);
//
//         // document.title = to.meta.title || "DPUTR KONKEP | ";
//     });
// });

new Vue({
  router,
  store,
  api,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
