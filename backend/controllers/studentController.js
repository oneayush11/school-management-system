const Student = require("../models/Student");
const User = require("../models/User");

// @desc   Get all students (admin/teacher)
// @route  GET /api/students
const getStudents = async (req, res) => {
  try {
    const { className } = req.query;
    const filter = className ? { className } : {};

    const students = await Student.find(filter).populate(
      "user",
      "name email phone isActive"
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single student by id
// @route  GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "user",
      "name email phone isActive"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update student details (admin)
// @route  PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete student (admin) - deactivates linked user account too
// @route  DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await User.findByIdAndUpdate(student.user, { isActive: false });
    await student.deleteOne();

    res.json({ message: "Student removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get own student profile (for logged in student)
// @route  GET /api/students/me/profile
const getMyStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate(
      "user",
      "name email phone"
    );
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getMyStudentProfile,
};
