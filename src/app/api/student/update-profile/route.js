import connectDB
from "@/lib/mongodb";

import Student
from "@/models/Student";

import {
  cookies,
} from "next/headers";

import {
  verifyToken,
} from "@/lib/auth";

import {
  NextResponse,
} from "next/server";

export async function PUT(
  request
) {
  try {
    await connectDB();

    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "studentToken"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const decoded =
      verifyToken(token);

    if (
      !decoded ||
      decoded.role !==
        "student"
    ) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const {
      fullName,
      parentMobileNumber,
      schoolName,
      address,
    } =
      await request.json();

    const updatedStudent =
      await Student.findByIdAndUpdate(
        decoded.id,
        {
          fullName,
          parentMobileNumber,
          schoolName,
          address,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      student:
        updatedStudent,
      message:
        "Profile updated successfully",
    });
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