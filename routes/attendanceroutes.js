const express = require('express');
const router = express.Router();
const attendanceController = require('../app/api/controllers/attendanceController.js')

router.post('/signin', attendanceController.signin);
router.post('/signout', attendanceController.signout);

module.exports = router;