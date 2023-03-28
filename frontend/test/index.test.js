const assert = require('chai').assert;
const { createApp } = require('vue');
const App = require('../src/App.vue');
const router = require('../src/router');
const Keycloak = require('keycloak-js');

describe('App', function () {
  let app, keycloak;
  
  before(function(done) {
    keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'demo',
      clientId: 'test-client',
    });

    keycloak.init({ onLoad: 'login-required' })
      .then(() => {
        app = createApp(App);
        app.provide('keycloak', keycloak); //provide keycloak instance
        app.use(router).mount('#app');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  after(function() {
    app.unmount();
  });

  it('should authenticate the user successfully', function () {
    assert.isTrue(keycloak.authenticated);
  });

  it('should check if the user has Student role', function () {
    if (keycloak.hasRealmRole('Student')) {
      const navbarItems = app.$el.querySelectorAll('.navbar-nav li');
      assert.strictEqual(navbarItems.length, 1, 'Student should only have 1 menu item');
      assert.strictEqual(navbarItems[0].querySelector('a').textContent, 'Timetable', 'Student should see the Timetable menu item');
    } else {
      const navbarItems = app.$el.querySelectorAll('.navbar-nav li');
      assert.strictEqual(navbarItems.length, 2, 'User should have 2 menu items');
      assert.strictEqual(navbarItems[0].querySelector('a').textContent, 'Upload File', 'User should see the Upload File menu item');
      assert.strictEqual(navbarItems[1].querySelector('a').textContent, 'Reporting', 'User should see the Reporting menu item');
    }
  });
});