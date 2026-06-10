export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-[35px] p-10 shadow-lg text-center">

      <div className="text-6xl">
        📂
      </div>

      <h2 className="text-2xl font-bold text-[#163232] mt-5">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}