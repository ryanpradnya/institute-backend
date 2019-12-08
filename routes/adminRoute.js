const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/adminController');

const router = express.Router();

//Route for work with student
router.get('/students');
router.post('/ragister-student');
router.put('/ragister-student');
router.delete('/ragister-student');

//Route for work with classroom
router.get('/classrooms');
router.post('/add-classroom');
router.put('/edit-classroom');
router.delete('/delete-classroom');

//Route for work with program
router.get('/programs');
router.post('/add-program');
router.put('/edit-program');
router.delete('/delete-program');

//Route for work with admin
router.post('/add-admint');
router.put('/edit-admin');
router.delete('/delete-admin');

module.exports = router;