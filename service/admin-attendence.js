const AdminAttendence = require('../model/AdminAttendence');
const error = require('../utils/error');

const isAttendenceSet = async () => {
    const attendence = await AdminAttendence.findOne({status: "RUNNING"}).exec();
    return attendence ? attendence : false
}

const enableAttendence = async () => {
    let attendence = await isAttendenceSet();
    if(attendence){
        attendence.status = "RUNNING";
        return await attendence.save();
    }
    attendence = new AdminAttendence({status: "RUNNING", timeLimit: 1});
    return await attendence.save();
}

const disableAttendence = async () => {
    let attendence = await isAttendenceSet();
    if(attendence.status === "COMPLETED"){
        throw error("Attendence already Completed!");
    }

    attendence.status = "COMPLETED";
    return await attendence.save();
}

const updateStatus = async (status) => {
   try{
        const attendence = await isAttendenceSet();
        if(!attendence) {
            throw error("Attendence is not enabled");
        }

        attendence.status = status;
        await attendence.save();
        return attendence;
   } catch(err){
        throw error("Something went wrong");
   }
}

module.exports = {isAttendenceSet, enableAttendence, updateStatus, disableAttendence}