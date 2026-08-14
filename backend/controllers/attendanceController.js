const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

// @desc   Mark attendance for a student (teacher/admin)
// @route  POST /api/attendance
const markAttendance = async (req, res) => {
  try {
    const { student, className, date, status, remarks } = req.body;

    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const record = await Attendance.findOneAndUpdate(
      { student, date: attendanceDate },
      {
        student,
        className,
        date: attendanceDate,
        status,
        remarks,
        markedBy: req.user._id,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Bulk mark attendance for a whole class in one go
// @route  POST /api/attendance/bulk
const bulkMarkAttendance = async (req, res) => {
  try {
    const { className, date, records } = req.body; // records: [{ student, status, remarks }]

    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const results = await Promise.all(
      records.map((r) =>
        Attendance.findOneAndUpdate(
          { student: r.student, date: attendanceDate },
          {
            student: r.student,
            className,
            date: attendanceDate,
            status: r.status,
            remarks: r.remarks || "",
            markedBy: req.user._id,
          },
          { upsert: true, new: true, runValidators: true }
        )
      )
    );

    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get attendance records for a class on a date, or a date range
// @route  GET /api/attendance?className=&date=&from=&to=
const getAttendance = async (req, res) => {
  try {
    const { className, date, from, to, student } = req.query;
    const filter = {};

    if (className) filter.className = className;
    if (student) filter.student = student;

    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      filter.date = d;
    } else if (from && to) {
      filter.date = { $gte: new Date(from), $lte: new Date(to) };
    }

    const records = await Attendance.find(filter)
      .populate({ path: "student", populate: { path: "user", select: "name" } })
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged-in student's own attendance
// @route  GET /api/attendance/me
const getMyAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const records = await Attendance.find({ student: student._id }).sort({ date: -1 });

    const total = records.length;
    const present = records.filter((r) => r.status === "present").length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    res.json({ records, summary: { total, present, percentage } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  markAttendance,
  bulkMarkAttendance,
  getAttendance,
  getMyAttendance,
};
