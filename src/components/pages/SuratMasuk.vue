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
      Data Surat Masuk
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
            <td>{{row.item.asal_surat}}</td>
            <td>{{row.item.isi_surat}}</td>
            <td>{{row.item.tanggal_surat}}</td>
            <td style="width:auto">
              <div class="flex justify-center">
                <button class="text-black bg-yellow-500 border border-solid border-yellow-600 font-bold hover:bg-yellow-400 active:bg-yellow-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="selectDataSuratMasuk(row.item)" title="Edit Data">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="text-black bg-green-500 border border-solid border-green-600 font-bold hover:bg-green-400 active:bg-green-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="selectDisposisiDataSuratMasuk(row.item.id_surat_masuk)" title="Disposisi Surat">
                    <i class="fas fa-share"></i>
                </button>
                <button class="text-black bg-red-500 border border-solid border-red-600 font-bold hover:bg-red-400 active:bg-red-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="deleteDataSuratMasuk(row.item.id_surat_masuk)" title="Hapus Data">
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
              Tambah Data Surat Masuk
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleAddModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <form @submit.prevent="addDataSuratMasuk" id="addSuratMasukForm">
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
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="asal_surat">
                    Asal Surat
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="asal_surat" type="text" placeholder="Asal Surat" v-model="addData.asal_surat" required>
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
              Edit Data Surat Masuk
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleEditModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <form @submit.prevent="editDataSuratMasuk" id="editSuratMasukForm">
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
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="easal_surat">
                    Asal Surat
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="easal_surat" type="text" placeholder="Asal Surat" v-model="editData.asal_surat" required>
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

    <!-- DISPOSISI MODAL -->
    <div v-if="disposisiModal" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
      <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start bg-green-500 justify-between p-2 border-b border-solid border-green-300 rounded-t">
            <h3 class="text-3xl font-semibold">
              Disposisi Data Surat Masuk
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleDisposisiModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <form @submit.prevent="disposisiDataSuratMasuk" id="disposisiSuratMasukForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <input id="disposisi_id_surat_masuk" type="hidden" v-model="disposisiData.id_surat_masuk" required>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="disposisi_tujuan">
                    Tujuan Disposisi
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="disposisi_tujuan" type="text" placeholder="Tujuan" v-model="disposisiData.tujuan" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="disposisi_sifat">
                    Sifat Disposisi
                  </label>
                  <div class="relative">
                    <select class="block appearance-none w-full bg-gray-200 border border-red-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:shadow-outline hover:shadow-outline" v-model="disposisiData.sifat" id="grid-state">
                      <option selected disabled>-- Pilih Sifat Disposisi --</option>
                      <option value="Biasa">Biasa</option>
                      <option value="Penting">Penting</option>
                      <option value="Segera">Segera</option>
                      <option value="Rahasia">Rahasia</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="disposisi_isi_surat">
                    Isi Disposisi
                  </label>
                  <textarea class="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="disposisi_isi_surat" v-model="disposisiData.isi" required></textarea>
                  <p class="text-gray-600 text-xs italic">Isi Disposisi</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="disposisi_catatan">
                    Catatan
                  </label>
                  <textarea class="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="disposisi_catatan" v-model="disposisiData.catatan" required></textarea>
                  <!-- <p class="text-gray-600 text-xs italic">Isi Disposisi</p> -->
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="disposisi_batas">
                    Batas Waktu
                  </label>
                  <VueTailwindPicker id="disposisi_batas"
                    @change="(v) => { this.disposisiDate(v) }"
                  >
                      <input type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-500" v-model="disposisiData.batas" required />
                  </VueTailwindPicker>
                </div>
              </div>
            </div>
            <!--footer-->
            <div class="flex items-center bg-green-500 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button class="text-black bg-gray-200 border border-solid border-gray-500 hover:bg-gray-200 hover:bg-gray-400 active:bg-gray-500 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="toggleDisposisiModal">
                Close
              </button>
              <button type="submit" class="text-black bg-green-400 hover:bg-green-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease">
                Disposisi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="disposisiModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>

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
      disposisiModal: false,
      addData: {},
      editData: {},
      klasifikasi: {},
      disposisiData: {},
      dateChanged: false,
      selectedData: {},
      success_message: '',
      nomor_surat: '',
      nomor_agenda: 0,
      search: '',
      headers: [
        { text: 'No.', value: 'num' },
        { text: 'Nomor Surat', value: 'nomor_surat' },
        { text: 'Asal Surat', value: 'asal_surat' },
        {
          text: 'Isi Surat',
          align: 'start',
          sortable: false,
          value: 'isi_surat',
        },
        { text: 'Tanggal Surat', value: 'tanggal_surat' },
        { text: 'Pilihan' },
      ],
      surat_masuk_data: []
    }
  },
  computed: {
    items() {
      return this.surat_masuk_data.map((d, index) => ({
        ...d,
        num: index + 1
      }))
    }
  },
  methods: {
    getData: function(){
      const options = {
        url: `${api_url}surat_masuk`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.surat_masuk_data = response.data['data']))
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
    getKlasifikasi: function(){
      const options = {
        url: `${api_url}referensi`,
        method: 'GET'
      }

      this.$axios(options)
        .then(response => (this.klasifikasi = response.data['data']))
        .catch(error => console.log(error));
    },
    toggleAddModal: function(){
      this.getKlasifikasi()
      this.addModal = !this.addModal
    },
    addDataSuratMasuk: function(e){
      this.$axios
        .post(`${api_url}surat_masuk/`, {
            nomor_surat: `${this.nomor_surat}`,
            asal_surat: `${this.addData.asal_surat}`,
            isi_surat: `${this.addData.isi_surat}`,
            id_referensi: `${this.addData.id_referensi}`,
            nomor_agenda: `${this.addData.nomor_agenda}`,
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
    selectDataSuratMasuk: function(row){
      this.toggleEditModal()

      this.editData = {
        id_surat_masuk: `${row.id_surat_masuk}`,
        nomor_surat: `${row.nomor_surat}`,
        asal_surat: `${row.asal_surat}`,
        isi_surat: `${row.isi_surat}`,
        kode_klasifikasi: `${row.kode_klasifikasi}`,
        nomor_agenda: `${row.nomor_agenda}`,
        tanggal_surat: `${row.tanggal_surat}`
      }
      this.dateChanged = false;
    },
    editDataSuratMasuk: function(){
      this.$axios
        .put(`${api_url}surat_masuk/${this.editData.id_surat_masuk}`, this.editData)
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
    deleteDataSuratMasuk: function(id){
      this.$confirm("Apakah Kamu yakin ingin menghapus data ini?").then(conf => {
        if(conf){
          this.$axios
            .delete(`${api_url}surat_masuk/${id}`)
            .then(data => {
              this.getData();
              this.successMessage('dihapus');
            }).catch(err => {
              console.error(err);
            })
        }
      });
    },
    selectDisposisiDataSuratMasuk: function(id){
      this.disposisiData.id_surat_masuk = id
      this.toggleDisposisiModal()
    },
    disposisiDataSuratMasuk: function(){
      this.$axios
        .post(`${api_url}disposisi/`, {
            tujuan: `${this.disposisiData.tujuan}`,
            isi_disposisi: `${this.disposisiData.isi_disposisi}`,
            sifat: `${this.disposisiData.sifat}`,
            id_surat_masuk: `${this.disposisiData.id_surat_masuk}`,
            batas_waktu: `${this.disposisiData.batas_waktu}`
          }, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
         })
        .then((data) => {
          this.getData();
          this.toggleDisposisiModal();
          this.successMessage('didisposisi');
        }).catch(err => {
          console.error(err);
        });
    },
    disposisiDate: function(v){
      this.disposisiData.batas = v;
      this.toggleDisposisiModal()
      this.toggleDisposisiModal()
    },
    toggleDisposisiModal: function(){
      this.disposisiModal = !this.disposisiModal
    },
    successMessage: function(msg){
      this.success_message = msg;
    }
  },
  mounted() {
    this.getData();
    this.getNomorSurat();
  }
}
</script>

<style lang="css" scoped>
</style>
