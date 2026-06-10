"use client";

import { useRouter }
from "next/navigation";

export default function SettingsPage() {
  const router =
    useRouter();

  const logout =
    async () => {
      await fetch(
        "/api/admin/logout",
        {
          method:
            "POST",
        }
      );

      router.push(
        "/admin/login"
      );
    };

  return (
    <div>

      <h1 className="heading-font text-3xl font-bold text-[#163232] mb-6">
        Settings
      </h1>

      <div className="bg-white rounded-[35px] shadow-lg p-6">

        <button
          onClick={
            logout
          }
          className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}