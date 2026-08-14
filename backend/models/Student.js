const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    className: {
      type: String,
      required: true, // e.g. "10th A"
    },
    section: {
      type: String,
      default: "A",
    },
    dateOfBirth: {
      type: Date,
    },
    guardianName: {
      type: String,
      default: "",
    },
    guardianContact: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
