"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminStats() {
  const [stats,
    setStats] =
    useState(null);

  useEffect(() => {
    const fetchStats =
      async () => {
        const response =
          await fetch(
            "/api/admin/dashboard"
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
          setStats(
            data
          );
        }
      };

    fetchStats();
  }, []);

  if (!stats) {
    return null;
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <p className="text-gray-500">
            Students
          </p>

          <h2 className="text-4xl font-bold text-[#163232] mt-3">
            {
              stats.totalStudents
            }
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-3">
            {
              stats.pendingStudents
            }
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <p className="text-gray-500">
            Attendance
          </p>

          <h2 className="text-4xl font-bold text-[#2CB5A0] mt-3">
            {
              stats.avgAttendance
            }
            %
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <p className="text-gray-500">
            Due Fees
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-3">
            {
              stats.dueFees
                .length
            }
          </h2>
        </div>
      </div>

      {/* Due Fees */}
      <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

        <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
          Fee Due Alerts
        </h2>

        <div className="space-y-4">

          {stats.dueFees
            .slice(0, 5)
            .map(
              (
                fee
              ) => (
                <div
                  key={
                    fee._id
                  }
                  className="border rounded-[25px] p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {
                        fee
                          .studentId
                          ?.fullName
                      }
                    </h3>

                    <p className="text-gray-500">
                      {
                        fee.month
                      }{" "}
                      {
                        fee.year
                      }
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="font-bold text-red-500">
                      ₹
                      {
                        fee.remainingAmount
                      }
                    </p>

                    <span className="text-sm text-gray-500">
                      {
                        fee.paymentStatus
                      }
                    </span>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}