import mongoose from "mongoose";

const feesSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      month: {
        type: String,
        required: true,
      },

      year: {
        type: Number,
        required: true,
      },

      totalFees: {
        type: Number,
        required: true,
      },

      amountPaid: {
        type: Number,
        default: 0,
      },

      remainingAmount: {
        type: Number,
        default: 0,
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "partial",
          "paid",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .Fees ||
  mongoose.model(
    "Fees",
    feesSchema
  );