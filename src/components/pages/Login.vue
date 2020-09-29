<template lang="html">
  <div class="bg-teal-100 h-screen font-sans">
      <div class="container mx-auto h-full flex justify-center items-center">
          <div class="w-1/3">
              <h1 class="font-hairline mb-6 text-center text-xl font-bold">Login</h1>
              <div class="border-teal-500 p-8 border-t-12 bg-teal-300 mb-6 rounded-lg shadow-lg">
                <form @submit.prevent="login">
                  <div class="mb-4">
                      <label class="font-bold text-grey-darker block mb-2">Username or Email</label>
                      <input v-model="username" type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" placeholder="Your Username">
                  </div>

                  <div class="mb-4">
                      <label class="font-bold text-grey-darker block mb-2">Password</label>
                      <input v-model="password" type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" placeholder="Your Password">
                  </div>

                  <div class="flex items-center justify-end">
                      <button type="submit" class="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded items-end">
                          Login
                      </button>
                  </div>
                </form>
              </div>
              <div class="text-center">
                  <p class="text-grey-dark text-sm">Don't have an account? <a href="#" class="no-underline text-blue font-bold">Create an Account</a>.</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
const api_url = 'http://localhost:8080/api/';
import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

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
        this.$axios.post(`${api_url}login`, {
          request: 1,
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          console.log(response);
          if (response.data['status'] == 1) {
            alert('Login Successfully');
            window.location = `http://localhost:8081/`;
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
