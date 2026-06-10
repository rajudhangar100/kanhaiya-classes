"use client";

import {
  useState,
} from "react";

export default function LearningManagement({
  learningPath,
}) {
  const [subjects,
    setSubjects] =
    useState(
      learningPath
    );

  const [savingId,
    setSavingId] =
    useState("");

  const handleChange =
    (
      index,
      field,
      value
    ) => {
      const updated =
        [...subjects];

      updated[index][field] =
        value;

      setSubjects(
        updated
      );
    };

  const saveSubject =
    async (subject) => {
      try {
        setSavingId(
          subject._id
        );

        const response =
          await fetch(
            "/api/admin/update-learning",
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  learningPathId:
                    subject._id,

                  totalChapters:
                    Number(
                      subject.totalChapters
                    ),

                  completedChapters:
                    Number(
                      subject.completedChapters
                    ),

                  goalStatus:
                    subject.goalStatus,
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
      } catch (error) {
        console.log(error);
      }

      setSavingId("");
    };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

      <h2 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Learning Management
      </h2>

      <div className="space-y-5">

        {subjects.map(
          (
            subject,
            index
          ) => (
            <div
              key={
                subject._id
              }
              className="border rounded-[30px] p-5"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

                <div className="w-full lg:w-1/5">
                  <h3 className="font-bold text-xl text-[#163232]">
                    {
                      subject.subject
                    }
                  </h3>
                </div>

                <input
                  type="number"
                  placeholder="Total Chapters"
                  value={
                    subject.totalChapters
                  }
                  onChange={(e) =>
                    handleChange(
                      index,
                      "totalChapters",
                      e.target.value
                    )
                  }
                  className="border rounded-2xl p-4 w-full lg:w-45"
                />

                <input
                  type="number"
                  placeholder="Completed"
                  value={
                    subject.completedChapters
                  }
                  onChange={(e) =>
                    handleChange(
                      index,
                      "completedChapters",
                      e.target.value
                    )
                  }
                  className="border rounded-2xl p-4 w-full lg:w-45"
                />

                <select
                  value={
                    subject.goalStatus
                  }
                  onChange={(e) =>
                    handleChange(
                      index,
                      "goalStatus",
                      e.target.value
                    )
                  }
                  className="border rounded-2xl p-4 w-full lg:w-50"
                >
                  <option value="not-started">
                    Not Started
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>

                <button
                  onClick={() =>
                    saveSubject(
                      subject
                    )
                  }
                  disabled={
                    savingId ===
                    subject._id
                  }
                  className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-6 py-4 rounded-2xl font-semibold"
                >
                  {savingId ===
                  subject._id
                    ? "Saving..."
                    : "Save"}
                </button>
              </div>

              <div className="mt-5">

                <div className="flex justify-between mb-2">
                  <span>
                    Progress
                  </span>

                  <span>
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
            </div>
          )
        )}
      </div>
    </div>
  );
}