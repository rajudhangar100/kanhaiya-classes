import mongoose from "mongoose";

const studentSchema =
  new mongoose.Schema(
    {
      studentId: {
        type: String,
        unique: true,
      },

      fullName: {
        type: String,
        required: true,
      },

      mobileNumber: {
        type: String,
        required: true,
        unique: true,
      },

      parentMobileNumber: {
        type: String,
      },

      standard: {
        type: String,
        required: true,
      },

      schoolName: {
        type: String,
      },

      dob: {
        type: Date,
      },

      gender: {
        type: String,
        enum: [
          "male",
          "female",
          "other",
        ],
      },

      address: {
        type: String,
      },

      profileImage: {
        type: String,
        default: "",
      },

      role: {
        type: String,
        default: "student",
      },

      isApproved: {
        type: Boolean,
        default: false,
      },

      attendancePercentage: {
        type: Number,
        default: 0,
      },

      overallPerformance: {
        type: Number,
        default: 0,
      },

      learningGoalStatus: {
        type: String,
        enum: [
          "not-started",
          "in-progress",
          "completed",
        ],
        default: "not-started",
      },

      firebaseUid: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .Student ||
  mongoose.model(
    "Student",
    studentSchema
  );