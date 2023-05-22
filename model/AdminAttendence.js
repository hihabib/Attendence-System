const mongoose = require('mongoose');

const adminAttendenceSchema = new mongoose.Schema({
    timeLimit: {
        type: Number,
        min: 0.1,
        max: 30,
        default: 5,
        required: true
    },
    status: {
        type: String,
        enum: ["RUNNING", "COMPLETED"],
        required: true,
        defaut: "RUNNING"
    }
}, {timestamps: true});

const AdminAttendence = mongoose.model("AdminAttendence", adminAttendenceSchema);
module.exports = AdminAttendence;