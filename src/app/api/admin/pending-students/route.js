import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();

    const students =
      await Student.find({
        isApproved:
          false,
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