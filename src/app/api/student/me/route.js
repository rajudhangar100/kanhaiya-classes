import { cookies }
from "next/headers";

import {
  verifyToken,
} from "@/lib/auth";

import Student
from "@/models/Student";

import connectDB
from "@/lib/mongodb";

import {
  NextResponse,
} from "next/server";

export async function GET() {
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
          authenticated:
            false,
        },
        {
          status: 401,
        }
      );
    }

    const decoded =
      verifyToken(token);

    if (
      !decoded
    ) {
      return NextResponse.json(
        {
          authenticated:
            false,
        },
        {
          status: 401,
        }
      );
    }

    const student =
      await Student.findById(
        decoded.id
      );

    return NextResponse.json({
      authenticated: true,
      student,
    });
  } catch {
    return NextResponse.json(
      {
        authenticated:
          false,
      },
      {
        status: 500,
      }
    );
  }
}