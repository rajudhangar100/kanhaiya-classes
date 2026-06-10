"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams }
from "next/navigation";
import StudentFees from "@/components/admin/StudentFees";
import StudentExams
from "@/components/admin/StudentExams";
import LearningManagement
from "@/components/admin/LearningManagement";

export default function StudentProfile() {
  const params =
    useParams();

  const [student,
    setStudent] =
    useState(null);

  const [attendance,
    setAttendance] =
    useState([]);

  const [exams,
    setExams] =
    useState([]);

  const [fees,
    setFees] =
    useState([]);

  const [learningPath,
    setLearningPath] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStudent =
      async () => {
        try {
          const response =
            await fetch(
              `/api/admin/student/${params.id}`
            );
            if (!response.ok) {
              throw new Error(
                "Failed request"
              );
            }

          const data =
            await response.json();

          if (
            data.success
          ) {
            setStudent(
              data.student
            );

            setAttendance(
              data.attendance
            );

            setExams(
              data.exams
            );

            setFees(
              data.fees
            );

            setLearningPath(
              data.learningPath
            );
          }
        } catch (error) {
          console.log(error);
        }

        setLoading(false);
      };

    if (params.id) {
      fetchStudent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Student not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 md:p-8">

      {/* Student Header */}
      <div className="bg-white rounded-[35px] shadow-lg p-8">

        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div>
            <h1 className="heading-font text-4xl font-bold text-[#163232]">
              {student.fullName}
            </h1>

            <div className="mt-4 text-gray-500 space-y-2">

              <p>
                🆔 ID:
                {" "}
                {
                  student.studentId
                }
              </p>

              <p>
                🎓 Standard:
                {" "}
                {
                  student.standard
                }
              </p>

              <p>
                📱 Mobile:
                {" "}
                {
                  student.mobileNumber
                }
              </p>

              <p>
                👨‍👩‍👧 Parent:
                {" "}
                {
                  student.parentMobileNumber
                }
              </p>

              <p>
                🏫 School:
                {" "}
                {
                  student.schoolName
                }
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">

            <button className="bg-[#F4A261] text-white px-6 py-3 rounded-2xl font-semibold">
              Edit Student
            </button>

            <button className="bg-[#3ED6C1] text-white px-6 py-3 rounded-2xl font-semibold">
              Mark Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Attendance
          </h3>

          <h2 className="text-4xl font-bold mt-3 text-[#163232]">
            {
              student.attendancePercentage
            }
            %
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Performance
          </h3>

          <h2 className="text-4xl font-bold mt-3 text-[#163232]">
            {
              student.overallPerformance
            }
            %
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Exams
          </h3>

          <h2 className="text-4xl font-bold mt-3 text-[#163232]">
            {exams.length}
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Goals
          </h3>

          <h2 className="text-2xl font-bold mt-3 text-[#163232]">
            {
              student.learningGoalStatus
            }
          </h2>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

        <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
          Learning Progress
        </h2>

        <div className="grid gap-5">
          {learningPath.map(
            (subject) => (
              <div
                key={
                  subject._id
                }
              >
                <div className="flex justify-between mb-2">

                  <h3 className="font-semibold text-[#163232]">
                    {
                      subject.subject
                    }
                  </h3>

                  <span className="text-gray-500">
                    {
                      subject.completedChapters
                    }
                    /
                    {
                      subject.totalChapters
                    }
                  </span>
                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0]"
                    style={{
                      width:
                        `${subject.chapterProgress}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <StudentFees studentId={student._id}/>
      <StudentExams
  studentId={
    student._id
  }
  standard={
    student.standard
  }
/>
<LearningManagement
  learningPath={
    learningPath
  }
/>
    </div>
  );
}