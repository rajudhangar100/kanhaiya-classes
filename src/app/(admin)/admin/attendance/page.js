"use client";

import AttendanceManagement
from "@/components/admin/AttendanceManagement";

export default function AttendancePage() {
  return (
    <div>

      <div className="mb-6">

        <h1 className="heading-font text-3xl font-bold text-[#163232]">
          Attendance
        </h1>

        <p className="text-gray-500 mt-2">
          Bulk attendance marking
        </p>
      </div>

      <AttendanceManagement />
    </div>
  );
}