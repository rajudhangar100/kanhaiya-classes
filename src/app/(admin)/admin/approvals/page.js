"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ApprovalsPage() {
  const [students,
    setStudents] =
    useState([]);

  const fetchStudents =
    async () => {
      const response =
        await fetch(
          "/api/admin/pending-students"
        );

      const data =
        await response.json();

      if (
        data.success
      ) {
        setStudents(
          data.students
        );
      }
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  const approveStudent =
    async (id) => {
      await fetch(
        "/api/admin/approve-student",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              {
                studentId:
                  id,
              }
            ),
        }
      );

      fetchStudents();
    };

  return (
    <div>

      <h1 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Pending Approvals
      </h1>

      <div className="space-y-4">

        {students.length ===
        0 ? (
          <div className="bg-white rounded-[30px] p-8 text-center text-gray-500 shadow-md">
            No pending approvals
          </div>
        ) : (
          students.map(
            (
              student
            ) => (
              <div
                key={
                  student._id
                }
                className="bg-white rounded-[30px] p-5 shadow-md"
              >
                <h2 className="font-bold text-lg">
                  {
                    student.fullName
                  }
                </h2>

                <p className="text-gray-500">
                  Std{" "}
                  {
                    student.standard
                  }
                </p>

                <p className="text-gray-500">
                  {
                    student.mobileNumber
                  }
                </p>

                <button
                  onClick={() =>
                    approveStudent(
                      student._id
                    )
                  }
                  className="mt-4 w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-3 rounded-2xl font-semibold"
                >
                  Approve
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}