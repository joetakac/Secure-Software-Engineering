var express = require('express');
var router = express.Router();
const {protectCL} = require('../authentication/keycloakroles');

//Require controller
var courseController = require('../controllers/course.controller');
 
// Create a new course
router.post("/courses/", protectCL, courseController.create);
 
// Retrieve all courses
router.get("/courses/", protectCL ,courseController.findAll);

// Retrieve a single course with id
router.get("/courses/:id", protectCL ,courseController.findOne);
 
// Update a course with id
router.put("/courses/:id",protectCL , courseController.update);
 
// Delete a course with id
router.delete("/courses/:id", protectCL, courseController.delete);

/* GET courses listing. */
router.get('/', function(req, res, next) {
  res.send('courses');
});

module.exports = router;