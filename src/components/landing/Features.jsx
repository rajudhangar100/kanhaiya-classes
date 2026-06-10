import {
  CalendarCheck,
  BadgeIndianRupee,
  Target,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  BellRing,
  UserCheck,
} from "lucide-react";

import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

const features = [
  {
    title: "Attendance Tracking",
    description:
      "Daily attendance tracking with automatic percentage calculation.",
    icon: CalendarCheck,
  },
  {
    title: "Exam Analytics",
    description:
      "Subject-wise marks, total percentage and performance graphs.",
    icon: BarChart3,
  },
  {
    title: "Learning Goals",
    description:
      "Track student goals, progress and chapter completion.",
    icon: Target,
  },
  {
    title: "Chapter Tracking",
    description:
      "Structured chapter-wise completion for every subject.",
    icon: BookOpen,
  },
  {
    title: "Regular Tests",
    description:
      "Unit tests, mid-term exams and revisions for better learning.",
    icon: ClipboardCheck,
  },
  {
    title: "Fees Tracking",
    description:
      "Monthly fee tracking with pending dues monitoring.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Admin Notifications",
    description:
      "Alerts for fee dues and student progress monitoring.",
    icon: BellRing,
  },
  {
    title: "Student Dashboard",
    description:
      "Students can view attendance, marks and performance reports.",
    icon: UserCheck,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="section-padding bg-white"
    >
      <div className="container-width px-5">

        <SectionHeading
          badge="Features"
          title="Digital Learning Experience"
          description="A complete student performance and learning management system for Kanhaiya Classes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <AnimatedSection
                key={index}
                delay={index * 0.08}
              >
                <div className="bg-gradient-to-br from-[#EFFFFB] to-[#FFF8E7] rounded-[32px] p-7 shadow-md hover:-translate-y-2 transition duration-500 h-full">

                  <div className="w-16 h-16 rounded-full bg-[#3ED6C1]/20 flex items-center justify-center">
                    <Icon
                      size={30}
                      className="text-[#2CB5A0]"
                    />
                  </div>

                  <h3 className="font-bold text-xl mt-5 text-[#163232]">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}