<template>
  <div class="home">
    <Breadcrumbs page="Beranda" show="Data" />
    <div class="flex items-center bg-blue-400 rounded text-white text-sm font-bold px-4 py-3 my-5" role="alert">
      <i class="fas fa-bullhorn text-3xl"></i> &nbsp;
      <p>Selamat Datang di halaman admin.</p>
    </div>
    <div class="flex mb-4">
      <Widget class="w-1/4 h-12" bgColor="bg-teal-500" comValue="1" icon="fas fa-envelope-open-text" comName="Surat Masuk" />
      <Widget class="w-1/4 h-12" bgColor="bg-green-500" comValue="1" icon="fas fa-envelope-open" comName="Surat Keluar" />
      <Widget class="w-1/4 h-12" bgColor="bg-yellow-500" comValue="1" icon="fas fa-share" comName="Disposisi" />
      <Widget class="w-1/4 h-12" bgColor="bg-red-500" comValue="1" icon="fas fa-clipboard-list" comName="Referensi" />
      <!-- <Widget bgColor="bg-teal-500" comValue="1" icon="fas fa-book" comName="Surat Masuk" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/components/Main.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Widget from '@/components/Widget.vue';

@Component({
  components: {
    Main,
    Breadcrumbs,
    Widget
  },
})
export default class Home extends Vue {}
</script>
