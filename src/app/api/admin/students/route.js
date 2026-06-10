import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const search =
      searchParams.get(
        "search"
      ) || "";

    const standard =
      searchParams.get(
        "standard"
      ) || "";

    const sort =
      searchParams.get(
        "sort"
      ) || "";

    let query = {};

    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options:
              "i",
          },
        },

        {
          studentId: {
            $regex: search,
            $options:
              "i",
          },
        },

        {
          mobileNumber:
            {
              $regex:
                search,
              $options:
                "i",
            },
        },
      ];
    }

    if (standard) {
      query.standard =
        standard;
    }

    let students =
      Student.find(
        query
      );

    if (
      sort ===
      "attendance"
    ) {
      students =
        students.sort(
          {
            attendancePercentage:
              -1,
          }
        );
    }

    if (
      sort ===
      "performance"
    ) {
      students =
        students.sort(
          {
            overallPerformance:
              -1,
          }
        );
    }

    students =
      await students;

    return Response.json({
      success: true,
      students,
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