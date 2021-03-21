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
      Data Disposisi
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
                <a :href="'http://localhost:8080/uploads/surat_masuk/'+row.item.file" target="_blank" class="text-black bg-blue-500 border border-solid border-blue-600 font-bold hover:bg-blue-400 active:bg-blue-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" title="Lihat Dokumen">
                    <i class="fas fa-file-pdf"></i>
                </a>
                <!-- <button class="text-black bg-yellow-500 border border-solid border-yellow-600 font-bold hover:bg-yellow-400 active:bg-yellow-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="selectDataSuratMasuk(row.item)" title="Edit Data">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="text-black bg-green-500 border border-solid border-green-600 font-bold hover:bg-green-400 active:bg-green-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="selectDisposisiDataSuratMasuk(row.item.id_surat_masuk)" title="Disposisi Surat">
                    <i class="fas fa-share"></i>
                </button> -->
                <!-- <button class="text-black bg-red-500 border border-solid border-red-600 font-bold hover:bg-red-400 active:bg-red-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="deleteDataDisposisi(row.item.id_disposisi)" title="Hapus Data">
                  <i class="fas fa-trash-alt"></i>
                </button> -->
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- ADD MODAL -->
    <!-- <div v-if="addModal" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
      <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="flex items-start bg-blue-500 justify-between p-2 border-b border-solid border-gray-300 rounded-t">
            <h3 class="text-3xl font-semibold">
              Tambah Data Referensi
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleAddModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <form @submit.prevent="addDataReferensi" id="addReferensiForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="kode">
                    Kode
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="kode" type="text" placeholder="Kode" v-model="addData.kode" required>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nama">
                    Nama
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="nama" type="text" placeholder="Nama" v-model="addData.nama" required>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="uraian">
                    Uraian
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="uraian" type="text" placeholder="Uraian" v-model="addData.uraian" required>
                </div>
              </div>
            </div>
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
    <div v-if="addModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div> -->


    <!-- EDIT MODAL -->
    <!-- <div v-if="editModal" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
      <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="flex items-start bg-yellow-500 justify-between p-2 border-b border-solid border-yellow-300 rounded-t">
            <h3 class="text-3xl font-semibold">
              Edit Data Referensi
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleEditModal">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <form @submit.prevent="editDataReferensi" id="editReferensiForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <input id="eid_referensi" type="hidden" v-model="editData.id_referensi" required>
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="ekode">
                    Kode
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="ekode" type="text" placeholder="Kode" v-model="editData.kode" required>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="enama">
                    Nama
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="enama" type="text" placeholder="Nama" v-model="editData.nama" required>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="euraian">
                    Uraian
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="euraian" type="text" placeholder="Uraian" v-model="editData.uraian" required>
                </div>
              </div>
            </div>
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
    <div v-if="editModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div> -->

  </v-card>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      addModal: false,
      editModal: false,
      addData: {},
      editData: {},
      selectedData: {},
      success_message: '',
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
        { text: 'Pilihan' }
      ],
      disposisi_data: []
    }
  },
  computed: {
    items() {
      return this.disposisi_data.map((d, index) => ({
        ...d,
        num: index + 1
      }))
    }
  },
  methods: {
    getData: function(){
      const id = localStorage.getItem('id');

      this.$api.get('disposisi/'+id)
        .then(response => {
          this.disposisi_data = response['data'].data
        })
        .catch(error => console.log(error));
    },
    toggleAddModal: function(){
      this.addModal = !this.addModal
    },
    // addDataReferensi: function(e){
    //   this.$axios
    //     .post(`${api_url}referensi/`, {
    //         kode: `${this.addData.kode}`,
    //         nama: `${this.addData.nama}`,
    //         uraian: `${this.addData.uraian}`
    //       }, {
    //       headers: {
    //         'Content-type': 'application/x-www-form-urlencoded',
    //       },
    //      })
    //     .then((data) => {
    //       this.getData();
    //       this.toggleAddModal();
    //       this.successMessage('ditambahkan');
    //     }).catch(err => {
    //       console.error(err);
    //     });
    //
    //   e.preventDefault();
    // },
    // toggleEditModal: function(){
    //   this.editModal = !this.editModal
    // },
    selectDataDisposisi: function(row){
      this.toggleEditModal()

      this.editData = {
        id_referensi: `${row.id_disposisi}`,
        kode: `${row.kode}`,
        nama: `${row.nama}`,
        uraian: `${row.uraian}`
      }
    },
    // editDataReferensi: function(){
    //   this.$axios
    //     .put(`${api_url}referensi/${this.editData.id_referensi}`, this.editData)
    //     .then(data => {
    //       this.getData();
    //       this.toggleEditModal();
    //       this.successMessage('diupdate');
    //     }).catch(err => {
    //       console.error(err);
    //     });
    // },
    deleteDataDisposisi: function(id){
      this.$confirm("Apakah Kamu yakin ingin menghapus data ini?").then(conf => {
        if(conf){
          this.$api
            .delete('diposisi/'+id)
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
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="css" scoped>
</style>
