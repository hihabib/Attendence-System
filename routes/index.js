const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const adminAttendenceRouter = require("./admin-attendence.js");
const studentAttendenceRouter = require("./student-attendence.js");
const router = require("express").Router();
const authenticate = require('../middleware/authenticate');


router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", authenticate, userRouter);
router.use("/api/v1/admin-attendence", authenticate, adminAttendenceRouter);
router.use("/api/v1/student-attendence", authenticate, studentAttendenceRouter);

module.exports = router;
