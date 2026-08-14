const Teacher = require("../models/Teacher");
const User = require("../models/User");

// @desc   Get all teachers (admin)
// @route  GET /api/teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate(
      "user",
      "name email phone isActive"
    );
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single teacher by id
// @route  GET /api/teachers/:id
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      "user",
      "name email phone isActive"
    );
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update teacher details (admin)
// @route  PUT /api/teachers/:id
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete teacher (admin) - deactivates linked user account too
// @route  DELETE /api/teachers/:id
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    await User.findByIdAndUpdate(teacher.user, { isActive: false });
    await teacher.deleteOne();

    res.json({ message: "Teacher removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get own teacher profile (for logged in teacher)
// @route  GET /api/teachers/me/profile
const getMyTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate(
      "user",
      "name email phone"
    );
    if (!teacher) return res.status(404).json({ message: "Teacher profile not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getMyTeacherProfile,
};
