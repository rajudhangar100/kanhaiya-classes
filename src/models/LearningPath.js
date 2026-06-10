import mongoose from "mongoose";

const learningPathSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },

      standard: {
        type: String,
      },

      subject: {
        type: String,
      },

      totalChapters: {
        type: Number,
        default: 0,
      },

      completedChapters: {
        type: Number,
        default: 0,
      },

      chapterProgress: {
        type: Number,
        default: 0,
      },

      goalStatus: {
        type: String,
        enum: [
          "not-started",
          "in-progress",
          "completed",
        ],
        default: "not-started",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .LearningPath ||
  mongoose.model(
    "LearningPath",
    learningPathSchema
  );