"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminAnalyticsChart() {

  const data = [
    {
      month: "Jan",
      students: 20,
    },

    {
      month: "Feb",
      students: 28,
    },

    {
      month: "Mar",
      students: 35,
    },

    {
      month: "Apr",
      students: 40,
    },
  ];

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

      <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Student Growth
      </h2>

      <div className="h-75">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
          >
            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="students"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}