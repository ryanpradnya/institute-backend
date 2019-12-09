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
exports.registerStudent = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Signup failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const year = req.body.year;
        const hashedPw = await bcrypt.hashSync(password, 12);

        const student = new Student({
            studentEmail: email,
            studentPassword: hashedPw,
            studentName: name,
            studentYear: year
        });

        //add student to database
        const result = await student.save();

        //to add year of student and max student in that year to program
        const students = await Student.find({ studentYear: year });
        const programs = await Program.find();
        for (let program of programs) {
            let maxStudent = Math.ceil(students.length * program.percentage);
            let studentToAdd = {
                year: year,
                maxStudents: maxStudent
            }

            let toAdd = true;
            if (program.students.length != 0) {
                for (let student of program.students) {
                    if (student.year == year) {
                        student.maxStudents = maxStudent;
                        toAdd = false;
                    }
                }
                if (toAdd) {
                    program.students.push(studentToAdd);
                }

            } else {
                program.students.push(studentToAdd);
            }
            await program.save();
        };
        res.status(201).json({ message: 'Student account created!', student: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};
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