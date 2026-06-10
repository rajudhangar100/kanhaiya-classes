"use client";

import {
  useEffect,
  useState,
} from "react";

export default function FeesPage() {
  const [students,
    setStudents] =
    useState([]);

  useEffect(() => {
    const fetchStudents =
      async () => {
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
      };

    fetchStudents();
  }, []);

  return (
    <div>

      <div className="mb-6">

        <h1 className="heading-font text-3xl font-bold text-[#163232]">
          Fees Management
        </h1>

        <p className="text-gray-500 mt-2">
          Monthly fees tracking
        </p>
      </div>

      <div className="space-y-4">

        {students.map(
          (student) => (
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
                  className="bg-gradient-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-5 py-3 rounded-2xl"
                >
                  Add Fees
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}