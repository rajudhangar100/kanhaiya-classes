import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function GET(
  request,
  context
) {
  try {
    await connectDB();
    const params =
      await context.params;

    const exams =
      await Exam.find({
        studentId:
          params.id,
      }).sort({
        createdAt: -1,
      });

    return Response.json({
      success: true,
      exams,
    });
  } catch {
    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}