<template lang="html">
  <div class="bg-yellow-100 h-screen font-sans">
      <div class="container mx-auto h-full flex justify-center items-center">
          <div class="w-1/3">
              <h1 class="font-hairline text-center text-xl font-bold">SELAMAT DATANG, DI SIMUTAR </h1><br>
              <h2 class="font-hairline mb-6 text-center text-md font-bold">PEMERINTAH KABUPATEN KONAWE KEPULAUAN</h2>
              <form @submit.prevent="login()" action="/" method="post">

              <div class="border-yellow-700 p-8 border-t-12 bg-yellow-400 mb-6 rounded-lg shadow-lg">
                <div class="text-center mb-6">
                  <span class="font-hairline mb-6 text-center w-auto text-md font-bold">SILAHKAN LOGIN</span>
                  <div class="flex block justify-center text-center mx-auto">
                    <img :src="'konkep.png'" class="text-center mt-6 mx-3 h-16" alt="PU">
                    <img :src="'logo.png'" class="text-center mt-6 mx-3 h-16" alt="DPUTR">
                  </div>
                </div>
                  <div class="mb-4">
                      <label class="font-bold text-grey-darker block mb-2">Nama Pengguna</label>
                      <input v-model="username" type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" placeholder="Nama Pengguna">
                  </div>

                  <div class="mb-4">
                      <label class="font-bold text-grey-darker block mb-2">Kata Sandi</label>
                      <input v-model="password" type="password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" placeholder="Kata Sandi">
                  </div>

                  <div class="flex items-center justify-end">
                      <button type="submit" class="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded items-end">
                          Login
                      </button>
                  </div>
              </div>
              <div class="text-center">
                  <!-- <p class="text-grey-dark text-sm">Don't have an account? <a href="#" class="no-underline text-blue font-bold">Create an Account</a>.</p> -->
              </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        username: '',
        password: ''
    }
  },
  methods: {
    login: function() {
      if (this.username != '' && this.password != '') {
        this.$api.post('login/', {
          request: 1,
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          if (response.data['status'] == 1) {
            // alert('Login Successfully');
            console.log(response.data['resp']);
            localStorage.setItem("loginState", true);
            localStorage.setItem("username", response.data['resp'][0].username);
            localStorage.setItem("level", response.data['resp'][0].level);
            localStorage.setItem("name", response.data['resp'][0].name);
            localStorage.setItem("id", response.data['resp'][0].id_user);

            // window.location = `http://localhost:8081/`;
            window.location = `https://dputr-konkep.vercel.app/`
            // this.$router.push('/')
          } else {
            alert("User does not exist");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      } else {
        alert('Please enter username & password');
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
