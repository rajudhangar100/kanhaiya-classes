import "@/app/globals.css";
import AdminBottomNav
from "@/components/admin/AdminBottomNav";

export const metadata = {
  title:
    "Admin Dashboard | Kanhaiya Classes",
};

export default function AdminLayout({
  children,
}) {
  return (
  <div className="min-h-screen bg-[#F8FAFC] pb-28">

    {/* Header */}
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">

      <div className="px-5 py-4 flex justify-between items-center">

        <div>
          <h1 className="heading-font text-2xl font-bold text-[#163232]">
            Kanhaiya Classes
          </h1>

          <p className="text-sm text-gray-500">
            Admin ERP
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>

    <main className="p-5">
      {children}
    </main>

    <AdminBottomNav />
  </div>
);
}