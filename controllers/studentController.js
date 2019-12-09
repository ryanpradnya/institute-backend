const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Student = require('../models/student');
const config = require('../util/config');

exports.getPrograms = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error;
        }

        const programs = await Program.find();
        res.status(200).json({
            message: 'Programs fetch successfully!',
            programs: programs
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.getClasrooms = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error;
        }

        const clasrooms = await Classroom.find();
        res.status(200).json({
            message: 'Clasrooms fetch successfully!',
            clasrooms: clasrooms
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.chooseProgram = (req, res, next) => { };
exports.addClassroom = (req, res, next) => { };