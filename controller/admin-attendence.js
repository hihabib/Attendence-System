const service = require('../service/admin-attendence');
const error = require('../utils/error');
const addMinutes = require('date-fns/addMinutes')
const isAfter = require('date-fns/isAfter')

const getEnable = async (_req, res, next) => {
    try{
        const isRunning = await service.isAttendenceSet();
        if(isRunning.status === "RUNNING") {
            throw error("Attendence already running!");
        }
       
        const attendence = await service.enableAttendence();
        res.status(200).json(attendence)
    }catch(err){
        next(err);
    }
}

const getDisable = async (_req, res, next) => {
    try {
        const isRunning = await service.isAttendenceSet();
        if(isRunning.status === "COMPLETED") {
            throw error("Attendence already Completed!");
        }

        const attendence = await service.disableAttendence();
        res.status(200).json(attendence)
    }catch(err){
        next(err);
    }
}

const checkStatus = async (_req, res, next) => {
    try {
        let attendence = await service.isAttendenceSet();
        if(!attendence) {
            throw error("No running attendence");
        }
        const createdAt = new Date(attendence.updatedAt);
        const timeWithLimit = addMinutes(createdAt, attendence.timeLimit);

        if(isAfter(new Date(), timeWithLimit)) {
            attendence = await service.updateStatus("COMPLETED");
        }


        res.status(200).json(attendence)
    } catch(err) {
        next(err);
    }
}



module.exports = {getEnable, checkStatus, getDisable}