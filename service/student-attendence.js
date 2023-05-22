const { addMinutes, isAfter } = require("date-fns");
const service = require("./admin-attendence");
const error = require("../utils/error");
const StudentAttendence = require('../model/StudentAttendence');

const isAnyRunningAttendence = async () => {
    let attendence = await service.isAttendenceSet();
    if(!attendence) {
        throw error("No running attendence");
    }
    const createdAt = new Date(attendence.updatedAt);
    const timeWithLimit = addMinutes(createdAt, attendence.timeLimit);

    if(isAfter(new Date(), timeWithLimit)) {
        attendence = await service.updateStatus("COMPLETED");
        throw error("No running attendence");
    }

    return attendence;
}

const createAttendence = async (userId, attendenceId) => {
    const adminAttendence = await isAnyRunningAttendence();
    if(adminAttendence.status !== "RUNNING"){
        throw error("Attendence is not running now.");
    }

    let studentAttendence;
    studentAttendence = await StudentAttendence.findOne({
        user: userId,
        adminAttendence: attendenceId
    }).exec();

    if(studentAttendence){
        throw error("Attendence already given");
    }
    studentAttendence = new StudentAttendence({
        user: userId,
        adminAttendence: attendenceId
    });

    return await studentAttendence.save();
}

module.exports = {isAnyRunningAttendence, createAttendence}