const express = require('express');
const { body } = require('express-validator');

const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/programs');
router.get('/classrooms');
router.post('/choose-program/:programId');
router.post('/add-clasroom/:classroomId');

module.exports = router;