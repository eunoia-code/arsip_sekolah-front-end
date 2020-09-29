<template lang="html">
  <div class="main">
    <Nav />
    <div class="container mx-auto px-4">
      <router-view/>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    Nav
  },
})
export default class Home extends Vue {}
</script>
