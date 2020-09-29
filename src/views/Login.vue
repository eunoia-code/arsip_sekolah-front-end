<template lang="html">
  <Login />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from '@/components/pages/Login.vue';

@Component({
  components: {
    Login
  },
})
export default class Home extends Vue {}
</script>
