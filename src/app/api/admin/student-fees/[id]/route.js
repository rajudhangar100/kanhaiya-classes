import connectDB from "@/lib/mongodb";
import Fees from "@/models/Fees";

export async function GET(
  request,
  context
) {
  try {
    await connectDB();

    // Next.js 16 fix
    const params =
      await context.params;

    const fees =
      await Fees.find({
        studentId:
          params.id,
      }).sort({
        createdAt: -1,
      });

    return Response.json({
      success: true,
      fees,
    });
  } catch (error) {
    console.log(error);

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