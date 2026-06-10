export default function SectionHeading({
  badge,
  title,
  description,
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      <span className="bg-[#3ED6C1]/15 text-[#2CB5A0] px-5 py-2 rounded-full text-sm font-medium">
        {badge}
      </span>

      <h2 className="heading-font text-4xl md:text-5xl font-bold mt-5 text-[#163232]">
        {title}
      </h2>

      <p className="text-gray-500 mt-5 text-lg leading-8">
        {description}
      </p>
    </div>
  );
}