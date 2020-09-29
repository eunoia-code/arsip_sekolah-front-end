<template>
  <div class="referensi">
    <Breadcrumbs page="Referensi" show="Data" />
    <div class="flex mb-4">
      <div class="w-full h-12 p-3">
        <div class="w-full bg-gray-500 h-12">
          <Referensi />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/components/Main.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Referensi from '@/components/pages/Referensi.vue';

@Component({
  components: {
    Main,
    Breadcrumbs,
    Referensi
  },
})
export default class Home extends Vue {}
</script>
