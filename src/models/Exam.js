import mongoose from "mongoose";

const examSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      standard: {
        type: String,
        required: true,
      },

      examType: {
        type: String,
        required: true,
      },

      subjectScores: [
        {
          subject: String,

          marksObtained: Number,

          totalMarks: Number,
        },
      ],

      percentage: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .Exam ||
  mongoose.model(
    "Exam",
    examSchema
  );