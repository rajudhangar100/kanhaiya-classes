"use client";

import {
  useEffect,
  useState,
} from "react";

export default function StudentFees({
  studentId,
}) {
  const [fees,
    setFees] =
    useState([]);

  const [month,
    setMonth] =
    useState("");

  const [year,
    setYear] =
    useState(
      new Date().getFullYear()
    );

  const [amountPaid,
    setAmountPaid] =
    useState("");

  const fetchFees =
    async () => {
      const response =
        await fetch(
          `/api/admin/student-fees/${studentId}`
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
        setFees(
          data.fees
        );
      }
    };

  useEffect(() => {
    fetchFees();
  }, []);

  const addFees =
    async () => {
      const response =
        await fetch(
          "/api/admin/add-fees",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              {
                studentId,
                month,
                year,
                amountPaid:
                  Number(
                    amountPaid
                  ),
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

      // alert(
      //   data.message
      // );

      if (
        data.success
      ) {
        fetchFees();

        setMonth("");
        setAmountPaid(
          ""
        );
      }
    };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

      <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Fees Management
      </h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <select
          value={month}
          onChange={(e) =>
            setMonth(
              e.target.value
            )
          }
          className="border rounded-2xl p-4"
        >
          <option value="">
            Select Month
          </option>

          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map(
            (
              month
            ) => (
              <option
                key={
                  month
                }
                value={
                  month
                }
              >
                {month}
              </option>
            )
          )}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value
            )
          }
          className="border rounded-2xl p-4"
        />

        <input
          type="number"
          placeholder="Amount Paid"
          value={
            amountPaid
          }
          onChange={(e) =>
            setAmountPaid(
              e.target.value
            )
          }
          className="border rounded-2xl p-4"
        />

        <button
          onClick={
            addFees
          }
          className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white rounded-2xl font-semibold"
        >
          Add Fees
        </button>
      </div>

      <div className="space-y-4">
        {fees.map(
          (fee) => (
            <div
              key={
                fee._id
              }
              className="border rounded-[25px] p-5"
            >
              <div className="flex justify-between flex-wrap gap-3">

                <div>
                  <h3 className="font-bold text-lg">
                    {
                      fee.month
                    }{" "}
                    {
                      fee.year
                    }
                  </h3>

                  <p>
                    Paid:
                    ₹
                    {
                      fee.amountPaid
                    }
                  </p>

                  <p>
                    Remaining:
                    ₹
                    {
                      fee.remainingAmount
                    }
                  </p>
                </div>

                <span
                  className={`px-5 py-2 rounded-full font-semibold ${
                    fee.paymentStatus ===
                    "paid"
                      ? "bg-green-100 text-green-600"
                      : fee.paymentStatus ===
                        "partial"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
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
  );
}