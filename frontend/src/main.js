import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import './assets/all.css';
import axios from 'axios';
import Keycloak from "keycloak-js";

//keycloak realm details
const keycloakobj = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'sse',
    clientId: 'sse-client',
    onLoad: 'login-required'
  });

keycloakobj.init({ onLoad: 'login-required' }).then(authenticated => {
    if (authenticated) {
      // Set the user's access token as a default authorization header
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + keycloakobj.token;

      const app = createApp(App);
        app.use(router);
        app.mount('#app');
    }
  })
  