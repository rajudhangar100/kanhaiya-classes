"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const faqData = [
  {
    question:
      "Which standards are taught at Kanhaiya Classes?",
    answer:
      "We provide coaching from 1st to 10th standard and Commerce coaching for 11th and 12th.",
  },
  {
    question:
      "How are student performances tracked?",
    answer:
      "We regularly track attendance, chapter completion, tests, exam performance, and learning goals.",
  },
  {
    question:
      "Are regular tests conducted?",
    answer:
      "Yes, Unit Tests, Mid-Terms, Revision Tests and Final Exams are conducted for better preparation.",
  },
  {
    question:
      "Can parents monitor student progress?",
    answer:
      "Yes, performance dashboards help students and parents monitor academic growth.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] =
    useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  return (
    <section
      id="faq"
      className="section-padding bg-[#FAFAFA]"
    >
      <div className="container-width px-5">

        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          description="Everything you need to know about Kanhaiya Classes."
        />

        <div className="max-w-3xl mx-auto space-y-5">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] shadow-md overflow-hidden"
            >
              <button
                onClick={() =>
                  toggleFAQ(index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-[#163232] text-lg">
                  {item.question}
                </span>

                <ChevronDown
                  className={`transition duration-300 ${
                    openIndex === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-500 leading-8">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}