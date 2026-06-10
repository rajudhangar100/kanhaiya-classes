"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

export default function ExamsPage() {
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
          Exams
        </h1>

        <p className="text-gray-500 mt-2">
          Add marks & results
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

                <Link
                  href={`/admin/student/${student._id}`}
                  className="bg-gradient-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-5 py-3 rounded-2xl"
                >
                  Manage
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}