import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

const standards = [
  "1st Standard",
  "2nd Standard",
  "3rd Standard",
  "4th Standard",
  "5th Standard",
  "6th Standard",
  "7th Standard",
  "8th Standard",
  "9th Standard",
  "10th Standard",
  "11th Commerce",
  "12th Commerce",
];

export default function Standards() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width px-5">

        <SectionHeading
          badge="Standards"
          title="Classes We Offer"
          description="From strong academic foundations to board preparation, we guide students from 1st to 12th Commerce."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {standards.map((standard, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.05}
            >
              <div className="bg-gradient-to-br from-[#EFFFFB] to-[#FFF8E7] rounded-[30px] p-6 shadow-md hover:scale-105 transition duration-500 text-center">

                <h3 className="font-semibold text-[#163232] text-lg">
                  {standard}
                </h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}