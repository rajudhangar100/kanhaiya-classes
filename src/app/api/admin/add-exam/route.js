import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    await connectDB();

    const {
      studentId,
      examType,
      standard,
      subjectScores,
    } =
      await request.json();

    const totalObtained =
      subjectScores.reduce(
        (sum, subject) =>
          sum +
          Number(
            subject.marksObtained
          ),
        0
      );

    const totalMarks =
      subjectScores.reduce(
        (sum, subject) =>
          sum +
          Number(
            subject.totalMarks
          ),
        0
      );

    const percentage =
      totalMarks > 0
        ? Number(
            (
              (totalObtained /
                totalMarks) *
              100
            ).toFixed(1)
          )
        : 0;

    await Exam.create({
      studentId,
      standard,
      examType,
      subjectScores,
      percentage,
    });

    // update overall performance
    const allExams =
      await Exam.find({
        studentId,
      });

    const avgPerformance =
      allExams.length > 0
        ? (
            allExams.reduce(
              (
                sum,
                exam
              ) =>
                sum +
                exam.percentage,
              0
            ) /
            allExams.length
          ).toFixed(1)
        : 0;

    await Student.findByIdAndUpdate(
      studentId,
      {
        overallPerformance:
          avgPerformance,
      }
    );

    return Response.json({
      success: true,
      message:
        "Exam added successfully",
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