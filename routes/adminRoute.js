const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Route for work with student
router.get('/students', authMiddleware.veryfiToken, adminController.getStudents);
router.post('/ragister-student', authMiddleware.veryfiToken, adminController.registerStudent);
router.put('/update-student/:studentId', authMiddleware.veryfiToken, adminController.updateStudent);
router.delete('/delete-student/:studentId', authMiddleware.veryfiToken, adminController.deleteStudent);

//Route for work with classroom
router.get('/classrooms', authMiddleware.veryfiToken, adminController.getClasrooms);
router.post('/add-classroom', authMiddleware.veryfiToken, adminController.addClassroom);
router.put('/update-classroom/:classroomId', authMiddleware.veryfiToken, adminController.updateClassroom);
router.delete('/delete-classroom/:classroomId', authMiddleware.veryfiToken, adminController.deleteClassroom);

//Route for work with program
router.get('/programs', authMiddleware.veryfiToken, adminController.getPrograms);
router.post('/add-program', authMiddleware.veryfiToken, adminController.addProgram);
router.put('/update-program/:programId', authMiddleware.veryfiToken, adminController.updateProgram);
router.delete('/delete-program/:programId', authMiddleware.veryfiToken, adminController.deleteProgram);

//Route for work with admin
router.post('/add-admin', authMiddleware.veryfiToken, adminController.addAdmin);
router.put('/update-admin/:adminId', authMiddleware.veryfiToken, adminController.updateAdmin);
router.delete('/delete-admin/:adminId', authMiddleware.veryfiToken, adminController.deleteAdmin);

module.exports = router;