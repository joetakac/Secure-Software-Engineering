var express = require('express');
var router = express.Router();
var reportingController = require('../controllers/reporting.controller');
const { protectAA } = require('../authentication/keycloakroles');
 
router.get("/reporting/student", reportingController.GetAttendanceForStudent);

router.get("/reporting/module", protectAA, reportingController.GetAttendanceForModule);

router.get("/reporting/course", protectAA, reportingController.GetAttendanceForCourse);

router.get("/reporting/advisor", protectAA, reportingController.GetAttendanceForAdvisor);

router.post("/reporting/download", reportingController.DownloadReport);

module.exports = router;