const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


module.exports = router;