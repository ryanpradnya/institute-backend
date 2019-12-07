const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    classroomName: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]

})

module.exports = mongoose.model('Classroom', classroomSchema);