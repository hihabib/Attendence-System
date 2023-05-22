const router = require('express').Router();
const controller = require('../controller/admin-attendence');

router.get("/enable", controller.getEnable);
router.get("/disable", controller.getDisable);
router.get("/status", controller.checkStatus);


module.exports = router;