import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";

export async function POST(request) {
  try {
    await connectDB();

    const { standard, attendance } =
      await request.json();

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    // Prevent duplicate marking
    const alreadyMarked =
      await Attendance.findOne({
        standard,
        date: today,
      });

    if (alreadyMarked) {
      return Response.json(
        {
          success: false,
          message:
            "Attendance already marked for today",
        },
        {
          status: 400,
        }
      );
    }

    // Save attendance
    const attendanceDocs =
      attendance.map(
        (item) => ({
          studentId:
            item.studentId,

          standard,

          status:
            item.status,

          date: today,
        })
      );

    await Attendance.insertMany(
      attendanceDocs
    );

    // Update attendance %
    for (const item of attendance) {
      const totalClasses =
        await Attendance.countDocuments(
          {
            studentId:
              item.studentId,
          }
        );

      const presentClasses =
        await Attendance.countDocuments(
          {
            studentId:
              item.studentId,

            status:
              "present",
          }
        );

      const percentage =
        totalClasses > 0
          ? (
              (presentClasses /
                totalClasses) *
              100
            ).toFixed(1)
          : 0;

      await Student.findByIdAndUpdate(
        item.studentId,
        {
          attendancePercentage:
            percentage,
        }
      );
    }

    return Response.json({
      success: true,
      message:
        "Attendance marked successfully",
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