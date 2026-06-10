"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import BottomNav
from "@/components/student/BottomNav";

export default function ProfilePage() {
  const router =
    useRouter();

  const [student,
    setStudent] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {
    const fetchData =
      async () => {
        const response =
          await fetch(
            "/api/student/dashboard"
          );
          if (!response.ok) {
              throw new Error(
                "Failed request"
              );
            }

        const data =
          await response.json();

        setStudent(
          data.student
        );
      };

    fetchData();
  }, []);

  const updateProfile =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/student/update-profile",
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                student
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

        alert(
          data.message
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }

      setLoading(false);
    };

  const logout =
    async () => {
      await fetch(
        "/api/student/logout",
        {
          method:
            "POST",
        }
      );

      router.push(
        "/student/login"
      );
    };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 pb-24">

      <div className="bg-white rounded-[35px] shadow-lg p-6">

        <h1 className="heading-font text-3xl font-bold text-[#163232] mb-6">
          Profile
        </h1>

        <div className="space-y-4">

          <input
            value={
              student.fullName
            }
            onChange={(e) =>
              setStudent({
                ...student,
                fullName:
                  e.target
                    .value,
              })
            }
            className="w-full border rounded-2xl p-4"
          />

          <input
            value={
              student.schoolName
            }
            onChange={(e) =>
              setStudent({
                ...student,
                schoolName:
                  e.target
                    .value,
              })
            }
            className="w-full border rounded-2xl p-4"
          />

          <input
            value={
              student.parentMobileNumber
            }
            onChange={(e) =>
              setStudent({
                ...student,
                parentMobileNumber:
                  e.target
                    .value,
              })
            }
            className="w-full border rounded-2xl p-4"
          />

          <textarea
            placeholder="Address"
            value={
              student.address ||
              ""
            }
            onChange={(e) =>
              setStudent({
                ...student,
                address:
                  e.target
                    .value,
              })
            }
            className="w-full border rounded-2xl p-4 h-30"
          />

          {/* Read Only */}
          <input
            disabled
            value={`Student ID: ${student.studentId}`}
            className="w-full bg-gray-100 border rounded-2xl p-4"
          />

          <input
            disabled
            value={`Mobile: ${student.mobileNumber}`}
            className="w-full bg-gray-100 border rounded-2xl p-4"
          />

          <input
            disabled
            value={`Standard: ${student.standard}`}
            className="w-full bg-gray-100 border rounded-2xl p-4"
          />

          <button
            onClick={
              updateProfile
            }
            disabled={
              loading
            }
            className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold"
          >
            {loading
              ? "Updating..."
              : "Update Profile"}
          </button>

          <button
            onClick={
              logout
            }
            className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}