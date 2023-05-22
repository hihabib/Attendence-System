const mongoose = require('mongoose');

const studentAttendenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    adminAttendence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminAttendence",
        required: true,
    }
}, {timestamps: true});

const StudentAttendence = mongoose.model("StudentAttendence", studentAttendenceSchema);

module.exports = StudentAttendence;