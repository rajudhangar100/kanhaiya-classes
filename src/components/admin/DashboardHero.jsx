export default function DashboardHero() {

  let greeting =
    "Hello";

  // if (currentHour < 12) {
  //   greeting =
  //     "Good Morning";
  // } else if (
  //   currentHour < 18
  // ) {
  //   greeting =
  //     "Good Afternoon";
  // }

  return (
    <div className="bg-linear-to-r from-[#163232] to-[#2CB5A0] rounded-[40px] p-8 text-white shadow-lg">

      <h1 className="heading-font text-4xl font-bold">
        {greeting},
        Admin 👋
      </h1>

      <p className="mt-3 text-white/80">
        Welcome back to
        Kanhaiya Classes ERP.
      </p>
    </div>
  );
}