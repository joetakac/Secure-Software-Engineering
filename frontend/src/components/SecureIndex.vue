<template>
  <div id="index">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
          <router-link :to="this.getDefaultRoute()" class="navbar-brand">{{this.title}}</router-link>
        <div class="navbar-nav me-auto">

          <li v-if="this.keycloak.hasRealmRole('Student')" class="nav-item">
            <router-link to="/timetable" class="nav-link">Timetable</router-link>
          </li>

          <li v-if="!this.keycloak.hasRealmRole('Student')" class="nav-item dropdown">
            <a class="nav-link" href="#">
              <router-link to="/upload" class="dropdown-item">Upload File</router-link>
            </a>
          </li>

          <li v-if="!this.keycloak.hasRealmRole('Student')" class="nav-item">
            <router-link to="/reporting" class="nav-link">Reporting</router-link>
          </li>

        </div>
        <div class="navbar-nav mr-auto">
          <li id="currUser" class="nav-item">
            <form>
              <input type="submit" class="nav-link" :value="this.currentUserName" />
            </form>
          </li>
          <li class="nav-item">
            <form action="/">
              <input type="submit" to="/login" class="nav-link" value="Logout" @click="Logout()" />
            </form>
          </li>
        </div>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
  
<script>

export default {
  name: "app",
  data(){
        return{
            title: document.title,
            currentUser: this.keycloak.tokenParsed,
            currentUserName: this.keycloak.tokenParsed.name,
        }
    },
    inject: ['keycloak'],
  methods:
  {
    Logout() {
      this.keycloak.clearToken().logout();
    },
    getDefaultRoute()
    {
      if (this.keycloak.hasRealmRole('Student')) 
      {
          this.$router.push('/timetable')
      }
      
      return("/home");
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
};
</script>
  
<style>
  #currUser{
    color: white;
    
  }
</style>