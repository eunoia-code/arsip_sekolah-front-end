<template>
  <div class="disposisi">
    <Breadcrumbs page="Disposisi" show="Data" />
    <div class="flex mb-4">
      <div class="w-full h-12 p-3">
        <div class="w-full bg-gray-500 h-12">
          <Disposisi />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/components/Main.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Disposisi from '@/components/pages/Disposisi.vue';

@Component({
  components: {
    Main,
    Breadcrumbs,
    Disposisi
  },
})
export default class Home extends Vue {}
</script>
