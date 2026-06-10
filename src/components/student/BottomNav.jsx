"use client";

import Link from "next/link";
import { usePathname }
from "next/navigation";

export default function BottomNav() {
  const pathname =
    usePathname();

  const navItems = [
    {
      label:
        "Home",
      href:
        "/student/dashboard",
      icon: "🏠",
    },

    {
      label:
        "Exams",
      href:
        "/student/exams",
      icon: "📘",
    },

    {
      label:
        "Fees",
      href:
        "/student/fees",
      icon: "💰",
    },

    {
      label:
        "Profile",
      href:
        "/student/profile",
      icon: "👤",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] bg-white/90 backdrop-blur-lg rounded-[30px] shadow-2xl px-5 py-4 z-50 border border-white">

      <div className="flex justify-between items-center">

        {navItems.map(
          (item) => {
            const active =
              pathname ===
              item.href;

            return (
              <Link
                key={
                  item.href
                }
                href={
                  item.href
                }
                className={`flex flex-col items-center transition-all ${
                  active
                    ? "scale-110"
                    : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#3ED6C1] to-[#2CB5A0]"
                      : ""
                  }`}
                >
                  {
                    item.icon
                  }
                </div>

                <span
                  className={`text-xs mt-1 ${
                    active
                      ? "text-[#163232] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {
                    item.label
                  }
                </span>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}