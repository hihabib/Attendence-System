const service = require('../service/student-attendence');
const error = require('../utils/error');

const getStatus = async (_req, res, next) => {
    try {
        let attendence = await service.isAnyRunningAttendence();
        if(!attendence) {
            throw error("No running attendence");
        }
         
        res.status(200).json(attendence)
    } catch(err) {
        next(err);
    }
}

const getAttendence = async (req, res, next) => {
    try {
        const {id: attendenceId} = req.params;
        const attendence = await service.createAttendence(req.user._id, attendenceId);
        res.status(201).json(attendence);
    } catch(err){
        next(err)
    }
}



module.exports = {getStatus, getAttendence}