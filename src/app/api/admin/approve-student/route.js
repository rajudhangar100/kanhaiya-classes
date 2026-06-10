import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import LearningPath from "@/models/LearningPath";

import {
  subjectsByStandard,
} from "@/constants/subjects";

import {
  generateStudentId,
} from "@/lib/studentId";

export async function POST(
  request
) {
  try {
    await connectDB();

    const {
      studentId,
    } =
      await request.json();

    const student =
      await Student.findById(
        studentId
      );

    if (!student) {
      return Response.json(
        {
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const count =
      await Student.countDocuments(
        {
          standard:
            student.standard,
          isApproved:
            true,
        }
      );

    const generatedId =
      await generateStudentId(
        student.standard,
        count
      );

    student.studentId =
      generatedId;

    student.isApproved =
      true;

    await student.save();

    const subjects =
      subjectsByStandard[
        student.standard
      ];

    const learningDocs =
      subjects.map(
        (subject) => ({
          studentId:
            student._id,

          standard:
            student.standard,

          subject,

          totalChapters:
            0,

          completedChapters:
            0,

          chapterProgress:
            0,
        })
      );

    await LearningPath.insertMany(
      learningDocs
    );

    return Response.json({
      success: true,
      message:
        "Student approved",
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