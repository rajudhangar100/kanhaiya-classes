import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";
import Exam from "@/models/Exam";
import Fees from "@/models/Fees";
import LearningPath from "@/models/LearningPath";

export async function GET(
  request,
  { params }
) {
  try {
    const { id } = await params;
    await connectDB();

    const student =
      await Student.findById(
        id
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

    const attendance =
      await Attendance.find({
        studentId:
          student._id,
      });

    const exams =
      await Exam.find({
        studentId:
          student._id,
      });

    const fees =
      await Fees.find({
        studentId:
          student._id,
      });

    const learningPath =
      await LearningPath.find({
        studentId:
          student._id,
      });

    return Response.json({
      success: true,
      student,
      attendance,
      exams,
      fees,
      learningPath,
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