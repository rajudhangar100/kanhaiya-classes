import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

const toppers = [
  {
    name: "Vijaylaxmi Dhangar",
    score: "79%",
    standard: "8th Standard",
  },
  {
    name: "Govind Dhangar",
    score: "69%",
    standard: "12th Commerce",
  },
  {
    name: "Rakesh Dhangar",
    score: "60%",
    standard: "12th Commerce",
  },
];

export default function Performance() {
  return (
    <section
      id="performance"
      className="section-padding hero-gradient"
    >
      <div className="container-width px-5">

        <SectionHeading
          badge="Student Results"
          title="Our Students Achieve Excellence"
          description="Consistent performance tracking and regular assessments help students excel academically."
        />

        <div className="grid md:grid-cols-3 gap-6">

          {toppers.map((student, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
            >
              <div className="glass rounded-[35px] p-8 text-center shadow-lg hover:-translate-y-2 transition">

                <div className="w-24 h-24 rounded-full bg-[#3ED6C1]/20 mx-auto mb-5" />

                <h3 className="text-2xl font-bold text-[#163232]">
                  {student.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {student.standard}
                </p>

                <h2 className="text-5xl font-bold mt-6 gradient-text">
                  {student.score}
                </h2>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}