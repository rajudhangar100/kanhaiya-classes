"use client";

import { useState } from "react";

export default function AttendanceManagement() {
  const [standard, setStandard] =
    useState("");

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [
    alreadyMarked,
    setAlreadyMarked,
  ] = useState(false);

  const [
    allowUpdate,
    setAllowUpdate,
  ] = useState(false);

  const fetchStudents =
    async (
      selectedStandard
    ) => {
      try {
        setLoading(true);

        setAlreadyMarked(
          false
        );

        setAllowUpdate(
          false
        );

        const response =
          await fetch(
            `/api/admin/students-by-standard?standard=${selectedStandard}`
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          const initialized =
            data.students.map(
              (
                student
              ) => ({
                ...student,
                status:
                  "present",
              })
            );

          setStudents(
            initialized
          );
        }
      } catch (error) {
        console.log(
          error
        );
      }

      setLoading(false);
    };

  const handleStatus =
    (
      studentId,
      status
    ) => {
      setStudents(
        students.map(
          (
            student
          ) =>
            student._id ===
            studentId
              ? {
                  ...student,
                  status,
                }
              : student
        )
      );
    };

  const saveAttendance =
  async (
    forceUpdate = false
  ) => {
    try {
      setSaving(true);

      const response =
        await fetch(
          "/api/admin/attendance",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                  standard,

                  forceUpdate,

                  attendance:
                    students.map(
                      (
                        student
                      ) => ({
                        studentId:
                          student._id,

                        status:
                          student.status,
                      })
                    ),
                }
              ),
          }
        );

      const data =
        await response.json();

      // Already marked
      if (
        data.alreadyMarked
      ) {
        setAlreadyMarked(
          true
        );

        alert(
          data.message
        );

        return;
      }

      alert(
        data.message
      );

      setAlreadyMarked(
        false
      );

      setAllowUpdate(
        false
      );
    } catch (error) {
      console.log(
        error
      );
    } finally {
      // THIS FIXES THE ISSUE
      setSaving(false);
    }
  };
  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 mt-10">
      <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Attendance Management
      </h2>

      <select
        value={standard}
        onChange={(e) => {
          setStandard(
            e.target.value
          );

          fetchStudents(
            e.target.value
          );
        }}
        className="border rounded-2xl px-5 py-4 mb-6"
      >
        <option value="">
          Select Standard
        </option>

        {[...Array(12)].map(
          (_, i) => (
            <option
              key={i}
              value={String(
                i + 1
              )}
            >
              Std {i + 1}
            </option>
          )
        )}
      </select>

      {alreadyMarked && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-2xl mb-5 flex justify-between items-center">
          <span>
            Attendance already
            marked for today
          </span>

          {!allowUpdate ? (
            <button
              onClick={() =>
                setAllowUpdate(
                  true
                )
              }
              className="bg-orange-500 text-white px-5 py-2 rounded-xl"
            >
              Update
              Attendance
            </button>
          ) : (
            <span className="font-semibold text-green-700">
              Update Mode
              Enabled
            </span>
          )}
        </div>
      )}

      {loading ? (
        <p>
          Loading students...
        </p>
      ) : (
        <div className="space-y-5">
          {students.map(
            (
              student
            ) => (
              <div
                key={
                  student._id
                }
                className="border rounded-[25px] p-5 flex flex-col md:flex-row justify-between gap-5"
              >
                <div>
                  <h3 className="font-bold text-xl text-[#163232]">
                    {
                      student.fullName
                    }
                  </h3>

                  <p className="text-gray-500">
                    ID:{" "}
                    {
                      student.studentId
                    }
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={
                      alreadyMarked &&
                      !allowUpdate
                    }
                    onClick={() =>
                      handleStatus(
                        student._id,
                        "present"
                      )
                    }
                    className={`px-6 py-3 rounded-2xl font-semibold ${
                      student.status ===
                      "present"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Present
                  </button>

                  <button
                    disabled={
                      alreadyMarked &&
                      !allowUpdate
                    }
                    onClick={() =>
                      handleStatus(
                        student._id,
                        "absent"
                      )
                    }
                    className={`px-6 py-3 rounded-2xl font-semibold ${
                      student.status ===
                      "absent"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            )
          )}

          {students.length >
            0 && (
            <button
              onClick={() =>
                saveAttendance(
                  allowUpdate
                )
              }
              disabled={
                saving ||
                (alreadyMarked &&
                  !allowUpdate)
              }
              className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold mt-5 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : allowUpdate
                ? "Update Attendance"
                : "Save Attendance"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}