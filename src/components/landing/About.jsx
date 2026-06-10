import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-white"
    >
      <div className="container-width px-5">

        <SectionHeading
          badge="About Us"
          title="Empowering Students for Academic Excellence"
          description="Kanhaiya Classes is dedicated to helping students achieve success through quality education, personalized guidance, and consistent performance tracking."
        />

        <div className="grid md:grid-cols-3 gap-6">

          <AnimatedSection>
            <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 floating-animation">
              <h3 className="text-2xl font-bold text-[#163232]">
                Our Mission
              </h3>

              <p className="text-gray-500 mt-4 leading-8">
                To nurture every student's
                potential with structured
                learning, regular assessments,
                and goal-based education.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-[#FFF8E7] rounded-[32px] p-8 shadow-lg floating-animation">
              <h3 className="text-2xl font-bold text-[#163232]">
                Our Vision
              </h3>

              <p className="text-gray-500 mt-4 leading-8">
                To become the most trusted
                coaching institute that shapes
                confident and successful
                students.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-[#EFFFFB] rounded-[32px] p-8 shadow-lg floating-animation">
              <h3 className="text-2xl font-bold text-[#163232]">
                Personalized Learning
              </h3>

              <p className="text-gray-500 mt-4 leading-8">
                Every student receives
                structured guidance through
                chapter tracking, tests, and
                performance monitoring.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}