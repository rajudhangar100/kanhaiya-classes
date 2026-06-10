import {
  Calculator,
  FlaskConical,
  Landmark,
  BookOpen,
  Languages,
  Briefcase,
} from "lucide-react";

import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

const subjects = [
  {
    title: "Mathematics",
    icon: Calculator,
  },
  {
    title: "Science",
    icon: FlaskConical,
  },
  {
    title: "History",
    icon: Landmark,
  },
  {
    title: "Languages",
    icon: Languages,
  },
  {
    title: "Commerce",
    icon: Briefcase,
  },
  {
    title: "General Studies",
    icon: BookOpen,
  },
];

export default function Subjects() {
  return (
    <section className="section-padding bg-[#FAFAFA]">

      <div className="container-width px-5">

        <SectionHeading
          badge="Subjects"
          title="Subjects We Teach"
          description="Structured learning with chapter-wise progress, tests, and performance tracking."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {subjects.map((subject, index) => {
            const Icon = subject.icon;

            return (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
              >
                <div className="bg-white rounded-[32px] p-8 shadow-lg hover:-translate-y-2 transition duration-500">

                  <div className="w-16 h-16 rounded-full bg-[#3ED6C1]/15 flex items-center justify-center">
                    <Icon
                      size={28}
                      className="text-[#2CB5A0]"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-5 text-[#163232]">
                    {subject.title}
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Chapter-wise learning and
                    regular assessments.
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