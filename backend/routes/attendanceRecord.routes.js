var express = require('express');
var router = express.Router();
const {protectCL,protectML,protectT,protectAA} = require('./keycloakProtect');


//Require controller
var attendanceController = require('../controllers/attendanceRecord.controller');
 
// Create a new attendance
router.post("/attendanceRecords/", protectT, attendanceController.create);
 
// Retrieve all attendances
router.get("/attendanceRecords/", protectCL, protectML, protectT, protectAA, attendanceController.findAll);
 
// Retrieve a single attendance with id
router.get("/attendanceRecords/:id", protectCL, protectML, protectT, protectAA, attendanceController.findOne);
 
// Update a attendance with id
router.put("/attendanceRecords/:id", protectT, protectCL, protectML, attendanceController.update);
 
// Delete a attendance with id
router.delete("/attendanceRecords/:id", protectCL, attendanceController.delete);

/* GET attendances listing. */
router.get('/', function(req, res, next) {
  res.send('attendanceRecords');
});

module.exports = router;