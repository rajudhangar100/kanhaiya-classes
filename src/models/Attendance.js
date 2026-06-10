import mongoose from "mongoose";

const attendanceSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "present",
          "absent",
        ],
        required: true,
      },

      standard: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

attendanceSchema.index({
  studentId: 1,
  date: 1,
});

export default mongoose.models
  .Attendance ||
  mongoose.model(
    "Attendance",
    attendanceSchema
  );