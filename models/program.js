const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programSchema = new Schema({
    programName: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    students: [
        {
            year: { type: String },
            maxStudents: { type: Number }
        }
    ],
    classrooms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Classroom'
        }
    ]

});

module.exports = mongoose.model('Program', programSchema);