import connectDB from "@/lib/mongodb";
import Fees from "@/models/Fees";
import Student from "@/models/Student";

import {
  feesByStandard,
} from "@/constants/fees";

export async function POST(
  request
) {
  try {
    await connectDB();

    const {
      studentId,
      month,
      year,
      amountPaid,
    } =
      await request.json();

    const student =
      await Student.findById(
        studentId
      );

    if (!student) {
      return Response.json(
        {
          success: false,
          message:
            "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    const existingFee =
      await Fees.findOne({
        studentId,
        month,
        year,
      });

    if (existingFee) {
      return Response.json(
        {
          success: false,
          message:
            "Fees already added for this month",
        },
        {
          status: 400,
        }
      );
    }

    const totalFees =
      feesByStandard[
        student.standard
      ];

    const remainingAmount =
      totalFees -
      amountPaid;

    let paymentStatus =
      "pending";

    if (
      amountPaid === 0
    ) {
      paymentStatus =
        "pending";
    } else if (
      amountPaid <
      totalFees
    ) {
      paymentStatus =
        "partial";
    } else {
      paymentStatus =
        "paid";
    }

    await Fees.create({
      studentId,
      month,
      year,
      totalFees,
      amountPaid,
      remainingAmount,
      paymentStatus,
    });

    return Response.json({
      success: true,
      message:
        "Fees added successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}