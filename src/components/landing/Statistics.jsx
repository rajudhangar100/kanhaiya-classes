"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Students Taught",
  },
  {
    value: 98,
    suffix: "%",
    label: "Success Rate",
  },
  {
    value: 1200,
    suffix: "+",
    label: "Tests Conducted",
  },
  {
    value: 12,
    suffix: "+",
    label: "Years Experience",
  },
];

export default function Statistics() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <section className="section-padding hero-gradient">

      <div
        ref={ref}
        className="container-width px-5"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {stats.map((item, index) => (
            <div
              key={index}
              className="glass rounded-[32px] p-7 text-center shadow-lg"
            >
              <h2 className="text-4xl font-bold text-[#163232]">
                {inView && (
                  <CountUp
                    end={item.value}
                    duration={3}
                  />
                )}
                {item.suffix}
              </h2>

              <p className="mt-2 text-gray-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}