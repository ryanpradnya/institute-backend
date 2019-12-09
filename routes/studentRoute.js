const express = require('express');
const { body } = require('express-validator');

const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/programs', authMiddleware.veryfiToken, studentController.getPrograms);
router.get('/classrooms', authMiddleware.veryfiToken, studentController.getClasrooms);
router.post('/choose-program/:programId', authMiddleware.veryfiToken, studentController.chooseProgram);
router.post('/add-clasroom/:classroomId', authMiddleware.veryfiToken, studentController.addClassroom);

module.exports = router;