import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
        },
        {
          path: '/surat_masuk',
          name: 'surat_masuk',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/SuratMasuk.vue'),
        },
        {
          path: '/surat_keluar',
          name: 'surat_keluar',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/SuratKeluar.vue'),
        },
        {
          path: '/buku_agenda',
          name: 'buku_agenda',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/BukuAgenda.vue'),
        },
        {
          path: '/referensi',
          name: 'referensi',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/Referensi.vue'),
        },
        {
          path: '/dokumen',
          name: 'dokumen',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/Dokumen.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
});
