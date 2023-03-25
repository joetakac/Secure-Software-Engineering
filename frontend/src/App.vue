<template>
  <div id="app">
    <ErrorView v-if="hasError" />
    <Index v-else-if="loggedIn"/>
  </div>
</template>

<script>

import Index from './components/SecureIndex.vue';
import ErrorView from './components/Error.vue'

export default {
  name: "app",
  data() {
    return {
      loggedIn: false,
      hasError: false
    }
  },
  inject: ['keycloak'],
  components: {
      Index,
      ErrorView,
    },
  methods: {
    isLoggedIn() {
      if(this.keycloak.authenticated) {
        this.loggedIn = true;
        this.updateRoutes();
      }
      else {
        this.loggedIn = false;
        this.updateRoutes();
      }
    },
    loadFonts() {
      var fontAwesome = document.createElement('script')
      fontAwesome.setAttribute('src', 'https://kit.fontawesome.com/93c807bff0.js')
      document.head.appendChild(fontAwesome)
    },
    updateRoutes() {
      if (this.loggedIn && this.keycloak.hasRealmRole('Student')) 
      {
          this.$router.push('/timetable')
      }
      else if (this.loggedIn && !this.keycloak.hasRealmRole('Student'))
      {
        this.$router.push('/home')
      } else if(!this.loggedIn) {
        this.keycloak.logout();
      }

    }
  },
  mounted() {
      this.loadFonts();
      this.isLoggedIn();
      console.log(this.keycloak.tokenParsed);
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>