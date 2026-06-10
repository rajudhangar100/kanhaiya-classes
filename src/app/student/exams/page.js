"use client";

import { useEffect,
useState } from "react";

import BottomNav
from "@/components/student/BottomNav";

export default function ExamsPage() {
  const [exams,
    setExams] =
    useState([]);

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

        setExams(
          data.exams || []
        );
      };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 pb-24">

      <h1 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Exams
      </h1>

      <div className="space-y-4">
        {exams.map(
          (exam) => (
            <div
              key={
                exam._id
              }
              className="bg-white rounded-[30px] p-5 shadow-md"
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="font-bold text-lg">
                    {
                      exam.examType
                    }
                  </h2>

                  <p className="text-gray-500">
                    {
                      exam.percentage
                    }
                    %
                  </p>
                </div>

                <span className="font-semibold text-[#2CB5A0]">
                  Std{" "}
                  {
                    exam.standard
                  }
                </span>
              </div>
            </div>
          )
        )}
      </div>

      <BottomNav />
    </div>
  );
}