var express = require('express');
var router = express.Router();
const {protectCL} = require('../authentication/keycloakroles');
const {protectT} = require('../authentication/keycloakroles');

//Require controller
var importController = require('../controllers/fileimport.controller');
 
// Create a new module
router.post("/fileimport/users",protectCL, importController.importUsers);
router.post("/fileimport/attendance", protectT, importController.importAttendance);



module.exports = router;