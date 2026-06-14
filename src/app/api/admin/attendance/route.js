import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";

export async function POST(
  request
) {
  try {
    await connectDB();

    const {
      standard,
      attendance,
      forceUpdate,
    } =
      await request.json();

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    // Check existing attendance
    const existingAttendance =
      await Attendance.find({
        standard,
        date: today,
      });

    // Already marked
    if (
      existingAttendance.length >
        0 &&
      !forceUpdate
    ) {
      return Response.json(
        {
          success: false,
          alreadyMarked:
            true,

          message:
            "Attendance already marked for today",

          attendance:
            existingAttendance,
        },
        {
          status: 200,
        }
      );
    }

    // Update mode
    if (
      existingAttendance.length >
      0
    ) {
      for (const item of attendance) {
        await Attendance.findOneAndUpdate(
          {
            studentId:
              item.studentId,

            standard,

            date: today,
          },
          {
            status:
              item.status,
          }
        );
      }
    } else {
      // First save
      const attendanceDocs =
        attendance.map(
          (
            item
          ) => ({
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
    }

    // Update percentages
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
        existingAttendance.length >
        0
          ? "Attendance updated successfully"
          : "Attendance marked successfully",
    });
  } catch (error) {
    console.log(
      error
    );

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