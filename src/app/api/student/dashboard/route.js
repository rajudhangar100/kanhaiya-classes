import connectDB
from "@/lib/mongodb";

import Student
from "@/models/Student";

import Attendance
from "@/models/Attendance";

import Exam
from "@/models/Exam";

import Fees
from "@/models/Fees";

import LearningPath
from "@/models/LearningPath";

import {
  cookies,
} from "next/headers";

import {
  verifyToken,
} from "@/lib/auth";

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
      !decoded ||
      decoded.role !==
        "student"
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

    const exams =
      await Exam.find({
        studentId:
          student._id,
      }).sort({
        createdAt: -1,
      });

    const fees =
      await Fees.find({
        studentId:
          student._id,
      }).sort({
        createdAt: -1,
      });

    const learningPath =
      await LearningPath.find({
        studentId:
          student._id,
      });

    const attendanceCount =
      await Attendance.countDocuments(
        {
          studentId:
            student._id,
        }
      );

    return NextResponse.json({
      authenticated: true,
      student,
      exams,
      fees,
      learningPath,
      attendanceCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        authenticated:
          false,
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}