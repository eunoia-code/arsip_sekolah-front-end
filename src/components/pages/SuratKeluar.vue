<template>
  <v-card class="p-3 mb-6">
    <div v-if="success_message!==''" role="alert">
      <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2">
        Sukses
        <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="successMessage('')">
          <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
            ×
          </span>
        </button>
      </div>
      <div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
        <p>Data berhasil {{success_message}}.</p>
      </div>
    </div>
    <v-card-title>
      Data Surat Keluar
      <v-spacer></v-spacer>
      <button @click="toggleAddModal" class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded">
        <i class="fa fa-plus"></i> Tambah Data
      </button>
    </v-card-title>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Pencarian . . ."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <div class="" data-app>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'fas fa-angle-double-left',
          lastIcon: 'fas fa-angle-double-right',
          prevIcon: 'fas fa-angle-left',
          nextIcon: 'fas fa-angle-right'
        }"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{row.item.num}}</td>
            <td>{{row.item.nomor_surat}}</td>
            <td>{{row.item.tujuan}}</td>
            <td>{{row.item.perihal}}</td>
            <td>{{row.item.tempat}}</td>
            <td>{{row.item.waktu}}</td>
            <td>{{row.item.isi_surat}}</td>
            <td>{{row.item.tanggal_surat | format_tanggal}}</td>
            <td style="width:auto">
              <div class="flex justify-center">
                <button class="text-black bg-teal-500 border border-solid border-teal-600 font-bold hover:bg-teal-400 active:bg-teal-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="showDataSuratKeluar(row.item)" title="Lihat Data">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="text-black bg-yellow-500 border border-solid border-yellow-600 font-bold hover:bg-yellow-400 active:bg-yellow-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="selectDataSuratKeluar(row.item)" title="Edit Data">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="text-black bg-red-500 border border-solid border-red-600 font-bold hover:bg-red-400 active:bg-red-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="deleteDataSuratKeluar(row.item.id_surat_keluar)" title="Hapus Data">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- ADD MODAL -->
    <div v-if="addModal" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
      <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start bg-blue-500 justify-between p-2 border-b border-solid border-gray-300 rounded-t">
            <h3 class="text-3xl font-semibold">
              Tambah Data Surat Keluar
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleAddModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <form @submit.prevent="addDataSuratKeluar" id="addSuratKeluarForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nomor_surat">
                    Nomor Surat
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="nomor_surat" type="text" placeholder="Nomor Surat" v-model="nomor_surat" disabled required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tujuan">
                    Tujuan
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="tujuan" type="text" placeholder="Tujuan" v-model="addData.tujuan" required>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="perihal">
                    Perihal
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="perihal" type="text" placeholder="Perihal..." v-model="addData.perihal" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tempat">
                    Tempat
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="tempat" type="text" placeholder="Tempat" v-model="addData.tempat" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="waktu">
                    Waktu
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="waktu" type="text" placeholder="Waktu" v-model="addData.waktu" required>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="isi_surat">
                    Isi Surat (Ringkasan)
                  </label>
                  <textarea class="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="isi_surat" v-model="addData.isi_surat" required></textarea>
                  <p class="text-gray-600 text-xs italic">Ringkasan Surat</p>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tanggal_surat">
                    Tanggal Surat
                  </label>
                  <VueTailwindPicker id="tanggal_surat"
                    @change="(v) => {this.selectDate(v)}"
                  >
                      <input type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-500" v-model="addData.tanggal_surat" required />
                  </VueTailwindPicker>
                </div>
              </div>
            </div>
            <!--footer-->
            <div class="flex items-center bg-blue-500 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button class="text-black bg-gray-200 border border-solid border-gray-500 hover:bg-gray-200 hover:bg-gray-400 active:bg-gray-500 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="toggleAddModal">
                Close
              </button>
              <button type="submit" class="text-black bg-teal-400 hover:bg-teal-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="addModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>


    <!-- EDIT MODAL -->
    <div v-if="editModal" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
      <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start bg-yellow-500 justify-between p-2 border-b border-solid border-yellow-300 rounded-t">
            <h3 class="text-3xl font-semibold">
              Edit Data Surat Keluar
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleEditModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <form @submit.prevent="editDataSuratKeluar" id="editSuratKeluarForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <input id="eid_surat_masuk" type="hidden" v-model="editData.id_surat_masuk" required>
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="enomor_surat">
                    Nomor Surat
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="enomor_surat" type="text" placeholder="Nomor Surat" v-model="editData.nomor_surat" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="etujuan">
                    tujuan
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="etujuan" type="text" placeholder="Asal Surat" v-model="editData.tujuan" required>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="eisi_surat">
                    Isi Surat (Ringkasan)
                  </label>
                  <textarea class="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="eisi_surat" v-model="editData.isi_surat" required></textarea>
                  <p class="text-gray-600 text-xs italic">Ringkasan Surat</p>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="etanggal_surat">
                    Tanggal Surat
                  </label>
                  <VueTailwindPicker id="etanggal_surat"
                    @change="(v) => { this.changeEditDate(v) }"
                  >
                      <input type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-500" v-model="editData.tanggal_surat" required />
                  </VueTailwindPicker>
                </div>
              </div>
            </div>
            <!--footer-->
            <div class="flex items-center bg-yellow-500 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button class="text-black bg-gray-200 border border-solid border-gray-500 hover:bg-gray-200 hover:bg-gray-400 active:bg-gray-500 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="toggleEditModal">
                Close
              </button>
              <button type="submit" class="text-black bg-orange-400 hover:bg-orange-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="editModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>

    <!-- EDIT MODAL -->
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
      <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none " style="margin-top:60vh">
          <!--header-->
          <div class="flex items-start bg-teal-500 justify-between p-2 border-b border-solid border-teal-300 rounded-t">
            <h3 class="text-3xl font-semibold">
              Lihat Surat Keluar
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleShowModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-10 flex-auto">
            <table id="surat_cinta" border="10px" style="margin:10px; padding:5px; width:100%; border-collapse: collapse;">
              <tr style="">
                <td style="width:100px"></td>
                <td style="width:20%"></td>
                <td style="width:20%"></td>
                <td style="width:20%"></td>
                <td style="width:20%"></td>
                <td style="width:100px"></td>
              </tr>
              <tr>
                <td style="width:100px">
                  <img src="../../assets/a.png">
                </td>
                <td style="text-align:center" colspan="4">
                  <h1>PEMERINTAH KABUPATEN KOLAKA TIMUR</h1>
                  <h1>DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA</h1>
                  <h1><b>SMP NEGERI SATU ATAP 1 AERE</b></h1>
                  <h1><b>NPSN: 40404649</b></h1>
                  <small> <i>Alamat: Desa Iwoimenggura Kec. Aere Kab. Kolaka Timur</i> </small><br>
                  <small> <i>email: smpnsatap1 aere@gmail.com</i> </small>
                </td>
                <td style="width:100px">
                  <img src="../../assets/b.png">
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <hr style="border-top: 3px double #8c8b8b; margin-top:1px">
                </td>
              </tr>
              <tr>
                <td colspan="6" style="text-align:right">
                  Aere, {{editData.tanggal_surat | tanggal_dan_nama_bulan}}
                </td>
              </tr>
              <tr>
                <td style="text-align:left;">
                  Nomor
                </td>
                <td colspan="5">
                   <span style="padding-left:10px;">:</span> {{editData.nomor_surat}}
                </td>
              </tr>
              <tr>
                <td style="text-align:left;">
                  Lampiran
                </td>
                <td colspan="5">
                  <span style="padding-left:10px;">:</span> <b> -</b>
                </td>
              </tr>
              <tr>
                <td style="text-align:left;">
                  Perihal
                </td>
                <td colspan="5">
                   <span style="padding-left:10px;">:</span><b> {{editData.perihal}}</b>
                </td>
              </tr>
              <tr>
                <td colspan="6">&nbsp;</td>
              </tr>
              <tr style="text-align:left">
                <td colspan="1"></td>
                <td colspan="1">Kepada</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td colspan="2" style="padding-left:70px">
                  Yth. {{editData.tujuan}}
                </td>
                <td colspan="1"></td>
                <td colspan="4"></td>
              </tr>
              <tr style="text-align:left">
                <td colspan="1"></td>
                <td colspan="1">Di-</td>
                <td colspan="4"></td>
              </tr>
              <tr style="text-align:left">
                <td colspan="1"></td>
                <td colspan="1" style="padding-left:20px">Tempat</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td colspan="6">&nbsp;</td>
              </tr>
              <!-- isi -->
              <tr>
                <td colspan="6">
                  Dengan hormat,
                </td>
              </tr>
              <tr>
                <td colspan="6" style="text-align: justify; text-justify: inter-word;">
                  <span style="padding-left:50px"></span>Teriring do’a semoga Tuhan Yang Maha Esa senantiasa melindungi dan selalu memberikan kita kesehatan dalam menjalankan aktivitas sehari-hari, Amin.
                </td>
              </tr>
              <tr>
                <td colspan="6" style="text-align: justify; text-justify: inter-word;">
                  <span style="padding-left:50px"></span>{{editData.isi_surat}}
                </td>
              </tr>
              <tr style="padding:5px 0 5px 0">
                <td></td>
                <td>Hari, Tanggal</td>
                <td colspan="4"> : {{editData.tanggal_surat | nama_hari}}, {{editData.tanggal_surat | tanggal_dan_nama_bulan}}</td>
              </tr>
              <tr style="padding:5px 0 5px 0">
                <td></td>
                <td>Waktu</td>
                <td colspan="4"> : {{editData.waktu}}</td>
              </tr>
              <tr style="padding:5px 0 5px 0">
                <td></td>
                <td>Tempat</td>
                <td colspan="4"> : {{editData.tempat}}</td>
              </tr>
              <tr>
                <td colspan="6">&nbsp;</td>
              </tr>
              <!-- penutup -->
              <tr>
                <td colspan="6" style="text-align: justify; text-justify: inter-word;">
                  Demikian undangan ini, atas perhatianya kami haturkan terima kasih.
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td colspan="2" style="">
                  Kepala Sekolah
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td style="height:150px;vertical-align:bottom;" colspan="2">
                  <b>LA SAMADE, S.Pd</b>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td style="" colspan="2">
                  NIP. 19661231 199002 1 015
                </td>
              </tr>
            </table>
          </div>
            <!--footer-->
            <div class="flex items-center bg-teal-500 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button class="text-black bg-gray-200 border border-solid border-gray-500 hover:bg-gray-200 hover:bg-gray-400 active:bg-gray-500 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="toggleShowModal">
                Close
              </button>
              <!-- <button type="button" class="text-black bg-teal-400 hover:bg-teal-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease" @click="print">
                Cetak
              </button> -->
            </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>


  </v-card>
</template>

<script>
import axios from 'axios';
import VueTailwindPicker from 'vue-tailwind-picker';
const api_url = 'http://localhost:8080/api/';

export default {
  components: {
    VueTailwindPicker,
  },
  data () {
    return {
      addModal: false,
      editModal: false,
      showModal: false,
      disposisiModal: false,
      addData: {},
      editData: {},
      disposisiData: {},
      dateChanged: false,
      selectedData: {},
      success_message: '',
      nomor_surat: '',
      nomor_agenda: 0,
      output: null,
      search: '',
      headers: [
        { text: 'No.', value: 'num' },
        { text: 'Nomor Surat', value: 'nomor_surat' },
        { text: 'Tujuan', value: 'tujuan' },
        { text: 'Perihal', value: 'perihal' },
        { text: 'Tempat', value: 'tempat' },
        { text: 'Waktu', value: 'waktu' },
        {
          text: 'Isi Surat',
          align: 'start',
          sortable: false,
          value: 'isi_surat',
        },
        { text: 'Tanggal Surat', value: 'tanggal_surat' },
        { text: 'Pilihan' },
      ],
      surat_keluar_data: []
    }
  },
  computed: {
    items() {
      return this.surat_keluar_data.map((d, index) => ({
        ...d,
        num: index + 1
      }))
    }
  },
  methods: {
    getData: function(){
      const options = {
        url: `${api_url}surat_keluar`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.surat_keluar_data = response.data['data']))
        .catch(error => console.log(error));
    },
    getNomorSurat: function(){
      const options = {
        url: `${api_url}nomor/428`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => {
          this.nomor_agenda = Number(response.data['data'].nomor_agenda) + 1;
          this.nomor_surat = '428/' + (this.nomor_agenda<10 ? '0'+this.nomor_agenda : this.nomor_agenda) +'/2021'
        })
        .catch(error => console.log(error));
    },
    editNomorSurat: function(){
      this.$axios
        .put(`${api_url}nomor/428`, {nomor_agenda: this.nomor_agenda})
        .then(data => {
          this.getData();
        }).catch(err => {
          console.error(err);
        });
    },
    toggleAddModal: function(){
      this.addModal = !this.addModal
    },
    addDataSuratKeluar: function(e){
      this.$axios
        .post(`${api_url}surat_keluar/`, {
            nomor_surat: `${this.nomor_surat}`,
            tujuan: `${this.addData.tujuan}`,
            perihal: `${this.addData.perihal}`,
            waktu: `${this.addData.waktu}`,
            tempat: `${this.addData.tempat}`,
            isi_surat: `${this.addData.isi_surat}`,
            tanggal_surat: `${this.addData.tanggal_surat}`
          }, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
         })
        .then((data) => {
          this.getData();
          this.toggleAddModal();
          this.editNomorSurat();
          this.successMessage('ditambahkan');
        }).catch(err => {
          console.error(err);
        });

      e.preventDefault();
    },
    selectDate: function(v){
      this.addData.tanggal_surat = v;
      this.toggleAddModal()
      this.toggleAddModal()
    },
    toggleEditModal: function(){
      this.editModal = !this.editModal
    },
    toggleShowModal: function(){
      this.showModal = !this.showModal
    },
    selectDataSuratKeluar: function(row){
      this.toggleEditModal()

      this.editData = {
        id_surat_keluar: `${row.id_surat_keluar}`,
        nomor_surat: `${row.nomor_surat}`,
        perihal: `${row.perihal}`,
        waktu: `${row.waktu}`,
        tempat: `${row.tempat}`,
        tujuan: `${row.tujuan}`,
        isi_surat: `${row.isi_surat}`,
        tanggal_surat: `${row.tanggal_surat}`
      }
      this.dateChanged = false;
    },
    showDataSuratKeluar: function(row){
      this.toggleShowModal()

      this.editData = {
        id_surat_keluar: `${row.id_surat_keluar}`,
        nomor_surat: `${row.nomor_surat}`,
        perihal: `${row.perihal}`,
        waktu: `${row.waktu}`,
        tempat: `${row.tempat}`,
        tujuan: `${row.tujuan}`,
        isi_surat: `${row.isi_surat}`,
        tanggal_surat: `${row.tanggal_surat}`
      }
      this.dateChanged = false;
    },
    editDataSuratKeluar: function(){
      this.$axios
        .put(`${api_url}surat_keluar/${this.editData.id_surat_keluar}`, this.editData)
        .then(data => {
          this.getData();
          this.toggleEditModal();
          this.successMessage('diupdate');
        }).catch(err => {
          console.error(err);
        });
    },
    changeEditDate: function(v){
      this.dateChanged ? this.editData.tanggal_surat = v : this.editData.tanggal_surat;
      this.dateChanged = true
    },
    deleteDataSuratKeluar: function(id){
      this.$confirm("Apakah Kamu yakin ingin menghapus data ini?").then(conf => {
        if(conf){
          this.$axios
            .delete(`${api_url}surat_keluar/${id}`)
            .then(data => {
              this.getData();
              this.successMessage('dihapus');
            }).catch(err => {
              console.error(err);
            })
        }
      });
    },
    successMessage: function(msg){
      this.success_message = msg;
    },
    print() {
      // Pass the element id here
      this.$htmlToPaper('surat_cinta');
    }
  },
  mounted() {
    this.getData();
    this.getNomorSurat();
  }
}
</script>

<style lang="css" scoped>
  /* td{
    border: 1px solid black;
  } */
</style>
