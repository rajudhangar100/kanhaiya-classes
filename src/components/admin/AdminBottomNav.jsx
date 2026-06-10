"use client";

import Link from "next/link";
import { usePathname }
from "next/navigation";

export default function AdminBottomNav() {
  const pathname =
    usePathname();

  const navItems = [
  {
    label: "Home",
    href: "/admin/dashboard",
    icon: "🏠",
  },

  {
    label: "Students",
    href: "/admin/students",
    icon: "🎓",
  },

  {
    label: "Approve",
    href: "/admin/approvals",
    icon: "✅",
  },

  {
    label: "Attendance",
    href: "/admin/attendance",
    icon: "📅",
  },

  {
    label: "Fees",
    href: "/admin/fees",
    icon: "💰",
  },

  {
    label: "Exams",
    href: "/admin/exams",
    icon: "📝",
  },

  {
    label: "Settings",
    href: "/admin/settings",
    icon: "⚙️",
  },
];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] bg-white/95 backdrop-blur-lg rounded-[30px] shadow-2xl px-4 py-4 z-50 border">

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
                className="flex flex-col items-center"
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
                      ? "font-semibold text-[#163232]"
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