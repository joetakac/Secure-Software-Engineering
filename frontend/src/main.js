import { createApp} from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import './assets/all.css';
import Keycloak from "keycloak-js";


//keycloak realm details
const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'demo',
    clientId: 'test-client',
  });

keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
    if (authenticated) {
      const app = createApp(App);
      app.provide('keycloak', keycloak); //provide keycloak instance
      app.use(router).mount('#app');
    }
  }).catch((error) => {
    console.log(error) 
    //keycloak.login();
  });
  