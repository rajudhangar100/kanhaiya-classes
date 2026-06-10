import connectDB
from "@/lib/mongodb";

import Student
from "@/models/Student";

import Fees
from "@/models/Fees";

export async function GET() {
  try {
    await connectDB();

    const totalStudents =
      await Student.countDocuments(
        {
          isApproved:
            true,
        }
      );

    const pendingStudents =
      await Student.countDocuments(
        {
          isApproved:
            false,
        }
      );

    const students =
      await Student.find({
        isApproved:
          true,
      });

    const avgAttendance =
      students.length > 0
        ? (
            students.reduce(
              (
                sum,
                student
              ) =>
                sum +
                Number(
                  student.attendancePercentage ||
                    0
                ),
              0
            ) /
            students.length
          ).toFixed(1)
        : 0;

    const dueFees =
      await Fees.find({
        paymentStatus: {
          $ne: "paid",
        },
      }).populate(
        "studentId"
      );

    return Response.json({
      success: true,

      totalStudents,

      pendingStudents,

      avgAttendance,

      dueFees,
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