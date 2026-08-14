const express = require("express");
const router = express.Router();
const {
  markAttendance,
  bulkMarkAttendance,
  getAttendance,
  getMyAttendance,
} = require("../controllers/attendanceController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

router.get("/me", protect, authorize("student"), getMyAttendance);

router.post("/", protect, authorize("admin", "teacher"), markAttendance);
router.post("/bulk", protect, authorize("admin", "teacher"), bulkMarkAttendance);
router.get("/", protect, authorize("admin", "teacher"), getAttendance);

module.exports = router;
