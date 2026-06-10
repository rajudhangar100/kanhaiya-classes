"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter }
from "next/navigation";
import PerformanceChart from "@/components/student/PerformaceChart";
import BottomNav from "@/components/student/BottomNav";
import FadeIn from "@/components/common/FadeIn";

export default function StudentDashboard() {
  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  const [data,
    setData] =
    useState(null);

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const response =
            await fetch(
              "/api/student/dashboard"
            );
            if (!response.ok) {
              throw new Error(
                "Failed request"
              );
            }

          const dashboard =
            await response.json();

          if (
            !dashboard.authenticated
          ) {
            router.push(
              "/student/login"
            );
            return;
          }

          setData(
            dashboard
          );
        } catch {
          router.push(
            "/student/login"
          );
        }

        setLoading(
          false
        );
      };

    fetchDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  const latestFee =
    data.fees?.[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 pb-24">

      {/* Header */}
     <div className="bg-linear-to-r from-[#163232] to-[#2CB5A0] rounded-[40px] p-8 text-white shadow-lg">

  <p className="text-white/80">
    Welcome Back 👋
  </p>

  <h1 className="heading-font text-3xl font-bold mt-2">
    {
      data.student
        .fullName
    }
  </h1>

  <div className="flex gap-6 mt-5 text-sm">

    <div>
      <p className="text-white/70">
        Student ID
      </p>

      <p className="font-semibold">
        {
          data.student
            .studentId
        }
      </p>
    </div>

    <div>
      <p className="text-white/70">
        Standard
      </p>

      <p className="font-semibold">
        Std{" "}
        {
          data.student
            .standard
        }
      </p>
    </div>
  </div>
</div>

      {/* Analytics */}
      <div className="grid grid-cols-2 gap-4 mt-6">

  {[
    {
      title:
        "Attendance",
      value:
        `${data.student.attendancePercentage}%`,
      emoji:
        "📅",
    },

    {
      title:
        "Performance",
      value:
        `${data.student.overallPerformance}%`,
      emoji:
        "📈",
    },

    {
      title:
        "Exams",
      value:
        data.exams.length,
      emoji:
        "📝",
    },

    {
      title:
        "Fees",
      value:
        latestFee
          ?.paymentStatus ||
        "N/A",
      emoji:
        "💰",
    },
  ].map(
    (
      card,
      index
    ) => (
      <div
        key={index}
        className="bg-white rounded-[30px] p-5 shadow-md active:scale-[0.98] transition-transform"
      >
        <div className="flex justify-between items-start">

          <div>
            <p className="text-gray-500 text-sm">
              {
                card.title
              }
            </p>

            <h2 className="text-2xl font-bold text-[#163232] mt-2">
              {
                card.value
              }
            </h2>
          </div>

          <div className="text-3xl">
            {
              card.emoji
            }
          </div>
        </div>
      </div>
    )
  )}
</div>

      {/* Exams */}
      <div className="bg-white rounded-[35px] p-6 shadow-lg mt-6">

        <h2 className="heading-font text-2xl font-bold text-[#163232] mb-5">
          Exam Results
        </h2>

        <div className="space-y-4">
          {data.exams.length===0?
          (<div className="text-center text-gray-500 py-10"> 
            No exam data yet
          </div>): (
            data.exams.map(
            (exam) => (
              <div
                key={
                  exam._id
                }
                className="border rounded-[25px] p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <h3 className="font-bold">
                      {
                        exam.examType
                      }
                    </h3>

                    <p className="text-gray-500">
                      {
                        exam.percentage
                      }
                      %
                    </p>
                  </div>

                  <span className="text-[#2CB5A0] font-bold">
                    Std{" "}
                    {
                      exam.standard
                    }
                  </span>
                </div>
              </div>
            )
          )
          )}
        </div>
      </div>
        <FadeIn>
            <PerformanceChart exams={data.exams}/>
        </FadeIn>

      {/* Learning */}
      <div className="bg-white rounded-[35px] p-6 shadow-lg mt-6">

        <h2 className="heading-font text-2xl font-bold text-[#163232] mb-5">
          Learning Progress
        </h2>

        <div className="space-y-5">
          {
            data.learningPath.length===0?(
                <div className="text-center text-gray-500 py-10">
                    No Learning data yet
                </div>   
            ):(
            data.learningPath.map(
            (
              subject
            ) => (
              <div
                key={
                  subject._id
                }
              >
                <div className="flex justify-between mb-2">

                  <span className="font-medium">
                    {
                      subject.subject
                    }
                  </span>

                  <span className="text-gray-500">
                    {
                      subject.chapterProgress
                    }
                    %
                  </span>
                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0]"
                    style={{
                      width:
                        `${subject.chapterProgress}%`,
                    }}
                  />
                </div>
              </div>
            )
          )
            )
          }
        </div>
      </div>

      {/* Fees */}
      <div className="bg-white rounded-[35px] p-6 shadow-lg mt-6">

        <h2 className="heading-font text-2xl font-bold text-[#163232] mb-5">
          Fees History
        </h2>

        <div className="space-y-4">
          {data.fees.length===0?(
              <div className="text-center text-gray-500 py-10">
                No fees data yet
                </div>
          ):(
            data.fees.map(
            (fee) => (
              <div
                key={
                  fee._id
                }
                className="border rounded-[25px] p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <h3 className="font-bold">
                      {
                        fee.month
                      }{" "}
                      {
                        fee.year
                      }
                    </h3>

                    <p className="text-gray-500">
                      Paid:
                      ₹
                      {
                        fee.amountPaid
                      }
                    </p>
                  </div>

                  <span className="font-semibold">
                    {
                      fee.paymentStatus
                    }
                  </span>
                </div>
              </div>
            )
          )
          )} 
        </div>
      </div>
      <BottomNav/>
    </div>
  );
}