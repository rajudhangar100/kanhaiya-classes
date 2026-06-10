import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(
  request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const existingStudent =
      await Student.findOne({
        mobileNumber:
          body.mobileNumber,
      });

    if (
      existingStudent
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Mobile already registered",
        },
        {
          status: 400,
        }
      );
    }

    await Student.create({
      ...body,
      isApproved:
        false,
    });

    return Response.json({
      success: true,
      message:
        "Registration submitted",
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