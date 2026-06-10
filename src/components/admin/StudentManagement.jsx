"use client";

import {
  useEffect,
  useState,
} from "react";
import { useRouter }
from "next/navigation";

export default function StudentManagement() {

const [standard,
  setStandard] =
  useState("");

const [sort,
  setSort] =
  useState("");
  const [students, setStudents] =
    useState([]);
    const router =
  useRouter();

  const [search, setSearch] =
    useState("");

  const [standardFilter,
    setStandardFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const fetchStudents =
  async () => {
    try {
      const response =
        await fetch(
          `/api/admin/students?search=${search}&standard=${standard}&sort=${sort}`
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
        setStudents(
          data.students
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchStudents();
}, [
  search,
  standard,
  sort,
]);

  const deleteStudent =
    async (studentId) => {
      const confirmDelete =
        confirm(
          "Delete student?"
        );

      if (!confirmDelete)
        return;

      try {
        const response =
          await fetch(
            "/api/admin/delete-student",
            {
              method:
                "DELETE",
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
    };

  const filteredStudents =
    students.filter(
      (student) => {
        const matchesSearch =
          student.fullName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          student.studentId?.includes(
            search
          );

        const matchesStandard =
          standardFilter
            ? student.standard ===
              standardFilter
            : true;

        return (
          matchesSearch &&
          matchesStandard
        );
      }
    );

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading students...
      </div>
    );
  }

  return (
    <div className="mt-14">

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">

        <h2 className="heading-font text-3xl font-bold text-[#163232]">
          Students
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-white border rounded-2xl px-5 py-3 outline-none"
          />

          <select
            value={
              standardFilter
            }
            onChange={(e) =>
              setStandardFilter(
                e.target.value
              )
            }
            className="bg-white border rounded-2xl px-5 py-3 outline-none"
          >
            <option value="">
              All Standards
            </option>

            {[...Array(12)].map(
              (_, i) => (
                <option
                  key={i}
                  value={
                    String(i + 1)
                  }
                >
                  Std {i + 1}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div className="grid gap-5">
<div className="bg-white rounded-[35px] shadow-lg p-5 mb-6">
  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search name, ID, mobile..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      className="border rounded-2xl p-4"
    />

    <select
      value={standard}
      onChange={(e) =>
        setStandard(
          e.target.value
        )
      }
      className="border rounded-2xl p-4"
    >
      <option value="">
        All Standards
      </option>

      {[...Array(12)].map(
        (_, i) => (
          <option
            key={i}
            value={
              String(i + 1)
            }
          >
            Std {i + 1}
          </option>
        )
      )}
    </select>

    <select
      value={sort}
      onChange={(e) =>
        setSort(
          e.target.value
        )
      }
      className="border rounded-2xl p-4"
    >
      <option value="">
        Sort By
      </option>

      <option value="attendance">
        Attendance
      </option>

      <option value="performance">
        Performance
      </option>
    </select>
  </div>
</div>
        {filteredStudents.map(
          (student) => (
            <div
              key={student._id}
              className="bg-white rounded-[35px] shadow-md p-6 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-5">

                <div>
                  <h3 className="text-2xl font-bold text-[#163232]">
                    {
                      student.fullName
                    }
                  </h3>

                  <div className="mt-4 text-gray-500 space-y-1">

                    <p>
                      🆔{" "}
                      {
                        student.studentId
                      }
                    </p>

                    <p>
                      🎓 Std{" "}
                      {
                        student.standard
                      }
                    </p>

                    <p>
                      📱{" "}
                      {
                        student.mobileNumber
                      }
                    </p>

                    <p>
                      🏫{" "}
                      {
                        student.schoolName
                      }
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">

                  <button  onClick={() =>
                      router.push(
                        `/admin/student/${student._id}`
                      )
                    }
                   className="bg-[#3ED6C1] text-white px-5 py-3 rounded-2xl font-medium">
                    View Profile
                  </button>

                  <button className="bg-[#F4A261] text-white px-5 py-3 rounded-2xl font-medium">
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteStudent(
                        student._id
                      )
                    }
                    className="bg-red-500 text-white px-5 py-3 rounded-2xl font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex gap-4 mt-4 flex-wrap">

  <div className="bg-[#F8FAFC] px-4 py-2 rounded-2xl">

    <p className="text-xs text-gray-500">
      Attendance
    </p>

    <p className="font-bold text-[#2CB5A0]">
      {
        student.attendancePercentage
      }
      %
    </p>
  </div>

  <div className="bg-[#F8FAFC] px-4 py-2 rounded-2xl">

    <p className="text-xs text-gray-500">
      Performance
    </p>

    <p className="font-bold text-[#163232]">
      {
        student.overallPerformance
      }
      %
    </p>
  </div>

</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}