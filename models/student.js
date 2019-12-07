const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentPassword: {
        type: String,
        required: true
    },
    studentSemesters: [
        {
            SemesterName: { type: String },
            totalcredit: { type: Number },
            subject: {
                clasroomId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Classroom',
                    required: true
                },
                credit: {
                    type: Number,
                    required: true
                }
            }

        }
    ]

})

module.exports = mongoose.model('Student', studentSchema);