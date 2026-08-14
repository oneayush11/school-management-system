const express = require("express");
const router = express.Router();
const {
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getMyTeacherProfile,
} = require("../controllers/teacherController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

router.get("/me/profile", protect, authorize("teacher"), getMyTeacherProfile);

router.get("/", protect, authorize("admin"), getTeachers);
router.get("/:id", protect, authorize("admin"), getTeacherById);
router.put("/:id", protect, authorize("admin"), updateTeacher);
router.delete("/:id", protect, authorize("admin"), deleteTeacher);

module.exports = router;
