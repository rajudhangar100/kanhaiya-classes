"use client";

import {
  useEffect,
  useState,
} from "react";

export default function FeesPage() {

  const [students,
    setStudents] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [savingId,
    setSavingId] =
    useState(null);

  const fetchStudents =
    async () => {
      try {
        const response =
          await fetch(
            "/api/admin/students"
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
      } catch (error) {
        console.log(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addFees =
    async (
      studentId,
      forceUpdate =
        false
    ) => {
      try {
        const month =
          prompt(
            "Enter month (e.g. June)"
          );

        if (!month)
          return;

        const year =
          prompt(
            "Enter year"
          );

        if (!year)
          return;

        const amountPaid =
          prompt(
            "Enter amount paid"
          );

        if (
          amountPaid ===
          null
        )
          return;

        setSavingId(
          studentId
        );

        const response =
          await fetch(
            "/api/admin/add-fees",
            {
              method:
                "POST",

              headers:
                {
                  "Content-Type":
                    "application/json",
                },

              body:
                JSON.stringify(
                  {
                    studentId,

                    month,

                    year:
                      Number(
                        year
                      ),

                    amountPaid:
                      Number(
                        amountPaid
                      ),

                    forceUpdate,
                  }
                ),
            }
          );

        const data =
          await response.json();

        // Already exists
        if (
          data.alreadyAdded
        ) {
          const shouldUpdate =
            confirm(
              "Fees already added. Update it?"
            );

          if (
            shouldUpdate
          ) {
            return addFees(
              studentId,
              true
            );
          }

          return;
        }

        // alert(
        //   data.message
        // );
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setSavingId(
          null
        );
      }
    };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <div className="mb-8">
        <h1 className="heading-font text-3xl font-bold text-[#163232]">
          Fees Management
        </h1>

        <p className="text-gray-500 mt-2">
          Monthly fees tracking
        </p>
      </div>

      <div className="space-y-4">

        {students.map(
          (
            student
          ) => (
            <div
              key={
                student._id
              }
              className="bg-white rounded-[30px] p-5 shadow-md"
            >
              <div className="flex justify-between items-center">

                <div>
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
                </div>

                <button
                  onClick={() =>
                    addFees(
                      student._id
                    )
                  }
                  disabled={
                    savingId ===
                    student._id
                  }
                  className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-5 py-3 rounded-2xl"
                >
                  {savingId ===
                  student._id
                    ? "Saving..."
                    : "Add Fees"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}