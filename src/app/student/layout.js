import "../globals.css";

export const metadata = {
  title:
    "Student Portal | Kanhaiya Classes",
};

export default function StudentLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {children}
    </div>
  );
}