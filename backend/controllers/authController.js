const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// @desc   Register a new user (admin creates teacher/student, or public self-register)
// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, extra } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "student",
      phone,
    });

    // Create linked profile document based on role
    if (user.role === "student" && extra) {
      await Student.create({
        user: user._id,
        rollNumber: extra.rollNumber,
        className: extra.className,
        section: extra.section,
        guardianName: extra.guardianName,
        guardianContact: extra.guardianContact,
      });
    }

    if (user.role === "teacher" && extra) {
      await Teacher.create({
        user: user._id,
        employeeId: extra.employeeId,
        subject: extra.subject,
        assignedClasses: extra.assignedClasses || [],
        qualification: extra.qualification,
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Your account has been deactivated" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged-in user profile
// @route  GET /api/auth/profile
const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = { registerUser, loginUser, getProfile };
