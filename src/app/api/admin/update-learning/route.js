import connectDB from "@/lib/mongodb";
import LearningPath from "@/models/LearningPath";

export async function POST(request) {
  try {
    await connectDB();

    const {
      learningPathId,
      totalChapters,
      completedChapters,
      goalStatus,
    } = await request.json();

    const progress =
      totalChapters > 0
        ? Number(
            (
              (completedChapters /
                totalChapters) *
              100
            ).toFixed(1)
          )
        : 0;

    await LearningPath.findByIdAndUpdate(
      learningPathId,
      {
        totalChapters,
        completedChapters,
        chapterProgress:
          progress,
        goalStatus,
      }
    );

    return Response.json({
      success: true,
      message:
        "Learning progress updated",
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