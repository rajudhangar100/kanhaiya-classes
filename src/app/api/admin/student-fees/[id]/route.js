import connectDB from "@/lib/mongodb";
import Fees from "@/models/Fees";

export async function GET(
  request,
  { params }
) {
  try {
    await connectDB();

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