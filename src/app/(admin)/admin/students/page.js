"use client";

import StudentManagement
from "@/components/admin/StudentManagement";

export default function StudentsPage() {
  return (
    <div>

      <h1 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Students
      </h1>

      <StudentManagement />
    </div>
  );
}