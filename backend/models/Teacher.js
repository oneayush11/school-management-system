const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    assignedClasses: [
      {
        type: String, // e.g. ["10th A", "9th B"]
      },
    ],
    qualification: {
      type: String,
      default: "",
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
