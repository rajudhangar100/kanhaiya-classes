import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";
import Exam from "@/models/Exam";
import Fees from "@/models/Fees";
import LearningPath from "@/models/LearningPath";

export async function DELETE(
  request
) {
  try {
    await connectDB();

    const { studentId } =
      await request.json();

    await Attendance.deleteMany({
      studentId,
    });

    await Exam.deleteMany({
      studentId,
    });

    await Fees.deleteMany({
      studentId,
    });

    await LearningPath.deleteMany(
      {
        studentId,
      }
    );

    await Student.findByIdAndDelete(
      studentId
    );

    return Response.json({
      success: true,
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}