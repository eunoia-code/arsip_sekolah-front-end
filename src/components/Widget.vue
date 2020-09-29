<template>
  <div class="rounded px-3 mb-6 md:mb-0">
    <!-- small box -->
    <div class="small-box" :class="bgColor">
      <div class="p-4 text-white">
        <h3 v-if="comName=='Surat Masuk'">{{this.surat_masuk}}</h3>
        <h3 v-if="comName=='Surat Keluar'">{{this.surat_keluar}}</h3>
        <h3 v-if="comName=='Disposisi'">{{this.disposisi}}</h3>
        <h3 v-if="comName=='Referensi'">{{this.referensi}}</h3>

        <p>{{comName}}</p>
      </div>
      <div class="icon">
        <i :class="icon"></i>
      </div>
      <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const api_url = 'http://localhost:8080/api/';

export default {
  name: 'Widget',
  props: {
    bgColor: String,
    comValue: String,
    comName: String,
    icon: String
  },
  data(){
    return {
      surat_masuk: 0,
      surat_keluar: 0,
      disposisi: 0,
      referensi: 0
    }
  },
  methods: {
    getData: function(){
      let options = {
        url: `${api_url}countData/suratMasukCount`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.surat_masuk = response.data['data']))
        .catch(error => console.log(error));

      options = {
        url: `${api_url}countData/suratKeluarCount`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.surat_keluar = response.data['data']))
        .catch(error => console.log(error));

      options = {
        url: `${api_url}countData/disposisiCount`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.disposisi = response.data['data']))
        .catch(error => console.log(error));

      options = {
        url: `${api_url}countData/referensiCount`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.referensi = response.data['data']))
        .catch(error => console.log(error));
    },
  },
  mounted(){
    this.getData();
  }
};
</script>

<style lang="css" scoped>
  .small-box{
    border-radius: 2px;
    position: relative;
    display: block;
    margin-bottom: 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  }

  .small-box h3, .small-box p{
    z-index: 5;
  }

  .small-box h3{
    font-size: 38px;
    font-weight: bold;
    margin: 0 0 10px 0;
    white-space: nowrap;
    padding: 0;
  }

  sup{
    top: -.5em;
  }

  .small-box .icon{
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
    position: absolute;
    top: -10px;
    right: 10px;
    z-index: 0;
    font-size: 90px;
    color: rgba(0,0,0,0.15);
  }

  .small-box .icon:hover{
    transform: scale(1.1);
  }

  .small-box>.small-box-footer{
    position: relative;
    text-align: center;
    padding: 3px 0;
    color: #fff;
    color: rgba(255,255,255,0.8);
    display: block;
    z-index: 10;
    background: rgba(0,0,0,0.1);
    text-decoration: none;
  }
</style>
