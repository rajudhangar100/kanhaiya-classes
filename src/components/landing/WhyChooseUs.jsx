import {
  BookOpen,
  ClipboardCheck,
  Trophy,
  BarChart3,
  Target,
  Users,
} from "lucide-react";

import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

const features = [
  {
    title: "Expert Guidance",
    icon: BookOpen,
  },
  {
    title: "Regular Tests",
    icon: ClipboardCheck,
  },
  {
    title: "Performance Tracking",
    icon: BarChart3,
  },
  {
    title: "Learning Goals",
    icon: Target,
  },
  {
    title: "Top Results",
    icon: Trophy,
  },
  {
    title: "Personal Attention",
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-[#FAFAFA]">

      <div className="container-width px-5">

        <SectionHeading
          badge="Why Choose Us"
          title="Why Parents & Students Trust Kanhaiya Classes"
          description="We believe in quality education, regular performance monitoring, and creating strong academic foundations."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
              >
                <div className="bg-white rounded-[30px] p-7 shadow-md hover:-translate-y-2 transition duration-500 text-center">

                  <div className="w-16 h-16 rounded-full bg-[#3ED6C1]/15 flex items-center justify-center mx-auto">
                    <Icon
                      size={28}
                      className="text-[#2CB5A0]"
                    />
                  </div>

                  <h3 className="font-semibold text-lg mt-5 text-[#163232]">
                    {item.title}
                  </h3>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}