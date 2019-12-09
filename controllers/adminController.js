const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Student = require('../models/student');
const Classroom = require('../models/classroom');
const Program = require('../models/program');
const config = require('../util/config');

//Controller for work with student
exports.getStudents = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error;
        }

        const students = await Student.find();
        res.status(200).json({
            message: 'Students fetch successfully!',
            students: students
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};
exports.registerStudent = (req, res, next) => { };
exports.updateStudent = (req, res, next) => { };
exports.deleteStudent = (req, res, next) => { };

//Controller for work with classroom
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
exports.addClassroom = (req, res, next) => { };
exports.updateClassroom = (req, res, next) => { };
exports.deleteClassroom = (req, res, next) => { };

//Controller for work with program
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
exports.addProgram = (req, res, next) => { };
exports.updateProgram = (req, res, next) => { };
exports.deleteProgram = (req, res, next) => { };

//Controller for work with admin
exports.addAdmin = (req, res, next) => { };
exports.updateAdmin = (req, res, next) => { };
exports.deleteAdmin = (req, res, next) => { };