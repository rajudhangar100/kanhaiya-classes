export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">

      <div className="relative">

        <div className="w-16 h-16 border-[6px] border-[#3ED6C1]/20 rounded-full" />

        <div className="w-16 h-16 border-[6px] border-[#2CB5A0] border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
      </div>

      <p className="mt-5 text-[#163232] font-semibold">
        Loading Kanhaiya Classes...
      </p>
    </div>
  );
}