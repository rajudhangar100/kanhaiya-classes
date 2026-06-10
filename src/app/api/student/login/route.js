import connectDB
from "@/lib/mongodb";

import Student
from "@/models/Student";

import {
  generateToken,
} from "@/lib/auth";

import {
  NextResponse,
} from "next/server";

export async function POST(
  request
) {
  try {
    await connectDB();

    const {
      mobileNumber,
    } =
      await request.json();

    const student =
      await Student.findOne(
        {
          mobileNumber,
        }
      );

    // not registered
    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student not registered",
        },
        {
          status: 404,
        }
      );
    }

    // approval pending
    if (
      !student.isApproved
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Waiting for admin approval",
        },
        {
          status: 403,
        }
      );
    }

    const token =
      generateToken({
        id: student._id,
        role:
          "student",
      });

    const response =
      NextResponse.json({
        success: true,
        student,
      });

    response.cookies.set(
      "studentToken",
      token,
      {
        httpOnly:
          true,
        secure:
          process.env
            .NODE_ENV ===
          "production",
        sameSite:
          "strict",
        maxAge:
          60 *
          60 *
          24 *
          7,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
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