// Import dependencies
const assert = require('chai').assert;
const { createApp } = require('vue');
const App = require('../src/App.vue');
const router = require('../src/router');
const Keycloak = require('keycloak-js');

describe('Keycloak authentication', () => {

  it('should create the app with the Keycloak instance when authenticated', async () => {

    // Create the Keycloak instance
    const keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'demo',
      clientId: 'test-client',
    });

    // Initialize Keycloak
    await keycloak.init({ onLoad: 'login-required' });

    // Create the app if authenticated
    if (keycloak.authenticated) {
      const app = createApp(App);
      app.provide('keycloak', keycloak); //provide keycloak instance
      app.use(router);
      const vm = app.mount('#app');
      assert.isObject(vm, 'App instance should be an object');
    }
  });

  it('should not create the app with the Keycloak instance when not authenticated', async () => {

    // Create the Keycloak instance
    const keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'demo',
      clientId: 'test-client',
    });

    // Initialize Keycloak
    await keycloak.init({ onLoad: 'login-required' });

    // Create the app if authenticated
    if (!keycloak.authenticated) {
      const app = createApp(App);
      app.provide('keycloak', keycloak); //provide keycloak instance
      app.use(router);
      const vm = app.mount('#app');
      assert.isUndefined(vm, 'App instance should not be created');
    }
  });

});