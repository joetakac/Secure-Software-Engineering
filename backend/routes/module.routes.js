var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');
const {protectML} = require('../authentication/keycloakroles');

//Require controller
var moduleController = require('../controllers/module.controller');
 
// Create a new module
router.post("/modules/", protectML, moduleController.create);
 
// Retrieve all modules
router.get("/modules/", protectML ,moduleController.findAll);
 
// Retrieve a single module with id
router.get("/modules/:id", protectML, moduleController.findOne);
 
// Update a module with id
router.put("/modules/:id", protectML, moduleController.update);
 
// Delete a module with id
router.delete("/modules/:id", protectML, moduleController.delete);

/* GET modules listing. */
router.get('/', function(req, res, next) {
  res.send('modules');
});

module.exports = router;