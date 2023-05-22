const router = require('express').Router();
const controller = require("../controller/student-attendence");

router.get('/status', controller.getStatus);
router.get('/:id', controller.getAttendence);




module.exports = router;