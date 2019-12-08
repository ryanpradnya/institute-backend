const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/student-signin', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    body('password')
        .trim()
        .not().isEmpty().withMessage('Password is required.')],
    authController.studentSignin);

router.post('/admin-signin', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    body('password')
        .trim()
        .not().isEmpty().withMessage('Password is required.')],
    authController.adminSignin);

module.exports = router;