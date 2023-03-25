const KeycloakConnect = require('keycloak-connect');

const protectCL = KeycloakConnect.protect('Course Leader');
const protectML = KeycloakConnect.protect('Module Leader');
const protectT = KeycloakConnect.protect('Tutor');
const protectAA = KeycloakConnect.protect('Academic Advisor');
const protectS = KeycloakConnect.protect('Student');

module.exports = {
  protectCL,
  protectML,
  protectT,
  protectAA,
  protectS
};