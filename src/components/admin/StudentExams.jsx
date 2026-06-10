"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  subjectsByStandard,
} from "@/constants/subjects";

export default function StudentExams({
  studentId,
  standard,
}) {
  const [examType,
    setExamType] =
    useState("");

  const [subjects,
    setSubjects] =
    useState([]);

  const [exams,
    setExams] =
    useState([]);

  useEffect(() => {
    const standardSubjects =
      subjectsByStandard[
        standard
      ] || [];

    setSubjects(
      standardSubjects.map(
        (
          subject
        ) => ({
          subject,
          marksObtained:
            "",
          totalMarks:
            100,
        })
      )
    );
  }, [standard]);

  const fetchExams =
    async () => {
      const response =
        await fetch(
          `/api/admin/student-exams/${studentId}`
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
        setExams(
          data.exams
        );
      }
    };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleChange =
    (
      index,
      field,
      value
    ) => {
      const updated =
        [...subjects];

      updated[
        index
      ][field] =
        value;

      setSubjects(
        updated
      );
    };

  const addExam =
    async () => {
      const response =
        await fetch(
          "/api/admin/add-exam",
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
                standard,
                examType,
                subjectScores:
                  subjects,
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

      alert(
        data.message
      );

      if (
        data.success
      ) {
        fetchExams();
      }
    };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

      <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Exam Management
      </h2>

      <div className="space-y-5">

        <select
          value={examType}
          onChange={(e) =>
            setExamType(
              e.target.value
            )
          }
          className="border rounded-2xl p-4 w-full"
        >
          <option value="">
            Select Exam
          </option>

          <option>
            Unit Test 1
          </option>

          <option>
            Unit Test 2
          </option>

          <option>
            Mid Term
          </option>

          <option>
            Final Exam
          </option>
        </select>

        {subjects.map(
          (
            subject,
            index
          ) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-3"
            >
              <input
                disabled
                value={
                  subject.subject
                }
                className="border rounded-2xl p-4 bg-gray-100"
              />

              <input
                type="number"
                placeholder="Marks"
                value={
                  subject.marksObtained
                }
                onChange={(e) =>
                  handleChange(
                    index,
                    "marksObtained",
                    e.target.value
                  )
                }
                className="border rounded-2xl p-4"
              />

              <input
                type="number"
                value={
                  subject.totalMarks
                }
                onChange={(e) =>
                  handleChange(
                    index,
                    "totalMarks",
                    e.target.value
                  )
                }
                className="border rounded-2xl p-4"
              />
            </div>
          )
        )}

        <button
          onClick={addExam}
          className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold"
        >
          Add Exam
        </button>

        <div className="space-y-4 mt-8">

          {exams.map(
            (exam) => (
              <div
                key={
                  exam._id
                }
                className="border rounded-[25px] p-5"
              >
                <div className="flex justify-between">

                  <div>
                    <h3 className="font-bold text-lg">
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

                  <span className="font-bold text-[#2CB5A0]">
                    {
                      exam.standard
                    }
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}