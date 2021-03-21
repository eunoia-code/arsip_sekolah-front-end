<template>
  <div id="app">
    <!-- <Nav /> -->
    <!-- <div class="container mx-auto px-4"> -->
      <router-view/>
    <!-- </div> -->
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts">
import Main from '@/components/Main.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'App',
  components: {
    Main,
    Nav,
    Breadcrumbs,
    Footer
  }
};
</script>

<style>

</style>
