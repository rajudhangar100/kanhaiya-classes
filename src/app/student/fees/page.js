"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNav
from "@/components/student/BottomNav";

export default function FeesPage() {
  const [fees,
    setFees] =
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

        setFees(
          data.fees || []
        );
      };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 pb-24">

      <h1 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Fees History
      </h1>

      <div className="space-y-4">

        {fees.map(
          (fee) => (
            <div
              key={
                fee._id
              }
              className="bg-white rounded-[30px] p-5 shadow-md"
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="font-bold">
                    {
                      fee.month
                    }{" "}
                    {
                      fee.year
                    }
                  </h2>

                  <p>
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
        )}
      </div>

      <BottomNav />
    </div>
  );
}