const jwt = require('jsonwebtoken');

const config = require('../util/config');
const Admin = require('../models/admin');
const Student = require('../models/student');

exports.checkExistingAdminEmail = async (req, res, next) => {
    const email = req.body.email;
    try {
        const admin = await Admin.findOne({ adminEmail: email });
        if (admin) {
            const error = new Error('Email is already use!');
            error.statusCode = 400;
            throw error;
        } else {
            next();
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.checkExistingStudentEmail = async (req, res, next) => {
    const email = req.body.email;
    try {
        const student = await Student.findOne({ studentEmail: email });
        if (student) {
            const error = new Error('Email is already use!');
            error.statusCode = 400;
            throw error;
        } else {
            next();
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.veryfiToken = (req, res, next) => {
    let authHeader = req.get('Authorization');

    let decodedToken;

    if (!authHeader) {
        const error = new Error('No token provided');
        error.statusCode = 403;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    try {
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};