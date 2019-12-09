const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Student = require('../models/student');
const config = require('../util/config');

exports.studentSignup = async (req, res, next) => {
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
        const hashedPw = await bcrypt.hashSync(password, 12);

        const student = new Student({
            studentEmail: email,
            studentPassword: hashedPw,
            studentName: name,
            studentYear: year
        });

        const result = await student.save();
        res.status(201).json({ message: 'Student account created!', student: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.adminSignin = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Signin failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const email = req.body.email;
        const password = req.body.password;

        const admin = await Admin.findOne({ adminEmail: email });
        if (!admin) {
            const error = new Error('Account not found');
            error.statusCode = 401;
            throw error;
        }
        const passrowdIsValid = await bcrypt.compareSync(password, admin.adminPassword);
        if (!passrowdIsValid) {
            const error = new Error('Wrong passord!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                userId: admin._id.toString()
            }, config.jwtSecret,
            { expiresIn: 86400 }
        );
        res.status(200).json({ message: 'Signin success', token: token })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.studentSignin = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Signin failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const email = req.body.email;
        const password = req.body.password;

        const student = await Student.findOne({ studentEmail: email });
        if (!student) {
            const error = new Error('Account not found');
            error.statusCode = 401;
            throw error;
        }
        const passrowdIsValid = await bcrypt.compareSync(password, student.studentPassword);
        if (!passrowdIsValid) {
            const error = new Error('Wrong passord!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                userId: student._id.toString()
            }, config.jwtSecret,
            { expiresIn: 86400 }
        );
        res.status(200).json({ message: 'Signin success', token: token })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};