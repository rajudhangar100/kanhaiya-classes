"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceChart({
  exams,
}) {
  const chartData =
    exams
      .slice()
      .reverse()
      .map(
        (
          exam
        ) => ({
          exam:
            exam.examType,
          percentage:
            exam.percentage,
        })
      );

  return (
    <div className="bg-white rounded-[35px] p-6 shadow-lg mt-6">

      <h2 className="heading-font text-2xl font-bold text-[#163232] mb-5">
        Performance Graph
      </h2>

      <div className="h-75">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={
              chartData
            }
          >
            <XAxis
              dataKey="exam"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="percentage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}