import AnimatedSection from "../common/AnimatedSection";
import SectionHeading from "../common/SectionHeading";

const feePlans = [
  {
    standard: "1st - 5th",
    fee: "₹1,500",
  },
  {
    standard: "6th - 8th",
    fee: "₹2,000",
  },
  {
    standard: "9th - 10th",
    fee: "₹2,500",
  },
  {
    standard: "11th - 12th Commerce",
    fee: "₹3,000",
  },
];

export default function Fees() {
  return (
    <section
      id="fees"
      className="section-padding bg-white"
    >
      <div className="container-width px-5">

        <SectionHeading
          badge="Fees Structure"
          title="Affordable Education For Everyone"
          description="Transparent monthly fee structure with quality education and progress tracking."
        />

        <div className="grid md:grid-cols-4 gap-5">

          {feePlans.map((plan, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
            >
              <div className="rounded-[35px] p-8 shadow-lg bg-gradient-to-br from-[#EFFFFB] to-[#FFF8E7] hover:scale-105 transition duration-500">

                <h3 className="font-bold text-2xl text-[#163232]">
                  {plan.standard}
                </h3>

                <h2 className="text-4xl font-bold mt-5 gradient-text">
                  {plan.fee}
                </h2>

                <p className="text-gray-500 mt-3">
                  Per Month
                </p>

                <button className="w-full bg-[#3ED6C1] text-white py-3 rounded-full mt-8 font-semibold">
                  Enroll Now
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}