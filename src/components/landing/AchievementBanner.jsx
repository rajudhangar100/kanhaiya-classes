"use client";

export default function AchievementBanner() {
  const items = [
    "500+ Students Trained",
    "98% Success Rate",
    "12+ Years Experience",
    "1000+ Tests Conducted",
    "Expert Guidance",
    "Personal Attention",
  ];

  return (
    <section className="overflow-hidden bg-[#163232] py-4">

      <div className="marquee whitespace-nowrap">

        {[...items, ...items].map(
          (item, index) => (
            <span
              key={index}
              className="text-white text-lg font-medium mx-8 inline-block"
            >
              ✦ {item}
            </span>
          )
        )}
      </div>
    </section>
  );
}