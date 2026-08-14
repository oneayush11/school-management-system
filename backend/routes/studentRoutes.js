const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getMyStudentProfile,
} = require("../controllers/studentController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

router.get("/me/profile", protect, authorize("student"), getMyStudentProfile);

router.get("/", protect, authorize("admin", "teacher"), getStudents);
router.get("/:id", protect, authorize("admin", "teacher"), getStudentById);
router.put("/:id", protect, authorize("admin"), updateStudent);
router.delete("/:id", protect, authorize("admin"), deleteStudent);

module.exports = router;
