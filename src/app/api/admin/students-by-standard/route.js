import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(
        request.url
      );

    const standard =
      searchParams.get(
        "standard"
      );

    const students =
      await Student.find({
        standard,
        isApproved: true,
      });

    return Response.json({
      success: true,
      students,
    });
  } catch (error) {
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