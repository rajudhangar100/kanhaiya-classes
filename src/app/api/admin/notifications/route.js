import connectDB
from "@/lib/mongodb";

import Student
from "@/models/Student";

import Fees
from "@/models/Fees";

export async function GET() {
  try {
    await connectDB();

    // Pending approvals
    const pendingStudents =
      await Student.find({
        isApproved:
          false,
      });

    // Fee dues
    const dueFees =
      await Fees.find({
        paymentStatus: {
          $ne: "paid",
        },
      }).populate(
        "studentId"
      );

    // Low attendance
    const lowAttendance =
      await Student.find({
        attendancePercentage:
          { $lt: 60 },
        isApproved:
          true,
      });

    // Weak performers
    const weakPerformance =
      await Student.find({
        overallPerformance:
          { $lt: 50 },
        isApproved:
          true,
      });

    const notifications =
      [];

    pendingStudents.forEach(
      (student) => {
        notifications.push(
          {
            type:
              "approval",

            title:
              "New Student Approval",

            message:
              `${student.fullName} waiting for approval`,
          }
        );
      }
    );

    dueFees.forEach(
      (fee) => {
        notifications.push(
          {
            type:
              "fees",

            title:
              "Pending Fees",

            message:
              `${fee.studentId?.fullName} has ₹${fee.remainingAmount} pending`,
          }
        );
      }
    );

    lowAttendance.forEach(
      (student) => {
        notifications.push(
          {
            type:
              "attendance",

            title:
              "Low Attendance",

            message:
              `${student.fullName} attendance below 60%`,
          }
        );
      }
    );

    weakPerformance.forEach(
      (student) => {
        notifications.push(
          {
            type:
              "performance",

            title:
              "Weak Performance",

            message:
              `${student.fullName} below 50% performance`,
          }
        );
      }
    );

    return Response.json({
      success: true,
      notifications,
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