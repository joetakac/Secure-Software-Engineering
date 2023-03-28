const keycloak = require('../app');
console.log("log " + keycloak)

const protectCL = keycloak.protect('Course Leader');
const protectML = keycloak.protect('Module Leader');
const protectT = keycloak.protect('Tutor');
const protectAA = keycloak.protect('Academic Advisor');
const protectS = keycloak.protect('Student');

module.exports = {
  protectCL,
  protectML,
  protectT,
  protectAA,
  protectS
};