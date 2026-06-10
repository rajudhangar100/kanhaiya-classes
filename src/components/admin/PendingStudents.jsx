"use client";

import {
  useEffect,
  useState,
} from "react";

export default function PendingStudents() {
  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [approvingId, setApprovingId] =
    useState("");

  const fetchStudents =
    async () => {
      try {
        const response =
          await fetch(
            "/api/admin/pending-students"
          );
        if (!response.ok) {
          throw new Error(
            "Failed request"
          );
        }

        const data =
          await response.json();

        if (data.success) {
          setStudents(
            data.students
          );
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleApprove =
    async (studentId) => {
      try {
        setApprovingId(
          studentId
        );

        const response =
          await fetch(
            "/api/admin/approve-student",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  studentId,
                }
              ),
            }
          );
        if (!response.ok) {
          throw new Error(
            "Failed request"
          );
        }

        const data =
          await response.json();

        if (data.success) {
          fetchStudents();
        }
      } catch (error) {
        console.log(error);
      }

      setApprovingId("");
    };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading students...
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-font text-3xl font-bold text-[#163232]">
          Pending Approvals
        </h2>

        <div className="bg-[#3ED6C1]/15 px-5 py-2 rounded-full text-[#2CB5A0] font-semibold">
          {students.length} Pending
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-[30px] shadow-md p-10 text-center text-gray-500">
          No pending students
        </div>
      ) : (
        <div className="grid gap-5">
          {students.map(
            (student) => (
              <div
                key={
                  student._id
                }
                className="bg-white rounded-[35px] p-6 shadow-md border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

                  <div>
                    <h3 className="text-2xl font-bold text-[#163232]">
                      {
                        student.fullName
                      }
                    </h3>

                    <div className="mt-3 text-gray-500 space-y-1">

                      <p>
                        📱{" "}
                        {
                          student.mobileNumber
                        }
                      </p>

                      <p>
                        👨‍👩‍👧 Parent:{" "}
                        {
                          student.parentMobileNumber
                        }
                      </p>

                      <p>
                        🎓 Standard:{" "}
                        {
                          student.standard
                        }
                      </p>

                      <p>
                        🏫 School:{" "}
                        {
                          student.schoolName
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleApprove(
                        student._id
                      )
                    }
                    disabled={
                      approvingId ===
                      student._id
                    }
                    className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
                  >
                    {approvingId ===
                    student._id
                      ? "Approving..."
                      : "Approve Student"}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}