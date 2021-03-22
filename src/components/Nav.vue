<template>
  <nav class="flex items-center justify-between flex-wrap bg-yellow-600 p-3" id="nav">
    <div class="flex items-center flex-shrink-0 text-white mr-6 ml-12"> &nbsp;
      <router-link to="/" class="flex">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-warehouse" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M3 21v-13l9-4l9 4v13" />
          <path d="M13 13h4v8h-10v-6h6" />
          <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
        </svg> -->
        <img :src="'logo.png'" class="h-6 w-6" alt="DPUTR">
        <span class="font-semibold text-xl tracking-tight">&nbsp; Dinas Pekerjaan Umum & Tata Ruang</span>
      </router-link>
    </div>
    <div class="block lg:hidden">
      <button @click="toggle" class="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div :class="open? 'block' : 'hidden'" class="w-full lg:flex lg:items-center lg:w-auto mr-12">
      <div class="text-sm lg:flex-grow">
        <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Beranda</b>
        </router-link>
        <router-link to="/surat_masuk" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Surat Masuk</b>
        </router-link>
        <router-link to="/surat_keluar" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Surat Keluar</b>
        </router-link>
        <!-- <router-link to="/buku_agenda" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Buku Agenda</b>
        </router-link> -->
        <router-link to="/disposisi" v-if="levelStat===1" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Disposisi</b>
        </router-link>
        <a href="javascript:void(0)" @click="logout()" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Keluar</b>
        </a>

        <!-- <router-link to="/dokumen" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>Dokumen</b>
        </router-link> -->
        <!-- <router-link to="/about" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-200 mr-4">
          <b>About</b>
        </router-link> -->
      </div>
      <div>
        <!-- <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0">Download</a> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data: function() {
    return {
      open: false,
      levelStat: parseInt(localStorage.getItem('level')),
    }
  },
  methods: {
  	toggle() {
    	this.open = !this.open
    },
    logout(){
      localStorage.clear();
      this.$router.push("/login");
      // window.location = `http://localhost:8081/login`;
    }
  }
};
</script>
