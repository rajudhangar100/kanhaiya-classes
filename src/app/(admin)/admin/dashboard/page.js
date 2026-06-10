"use client";

import {
  useEffect,
  useState,
} from "react";
import StudentManagement
from "@/components/admin/StudentManagement";

import { useRouter }
from "next/navigation";

import PendingStudents
from "@/components/admin/PendingStudents";
import AttendanceManagement from "@/components/admin/AttendanceManagement";
import AdminStats from "@/components/admin/AdminStats";
import AdminAnalyticsChart from "@/components/admin/AdminAnalyticsChart";
import DashboardHero from "@/components/admin/DashboardHero";
import FadeIn from "@/components/common/FadeIn";
import NotificationCenter from "@/components/admin/NotificationCenter";

export default function Dashboard() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const checkAuth =
      async () => {
        try {
          const response =
            await fetch(
              "/api/admin/check-auth"
            );
          if (!response.ok) {
            throw new Error(
              "Failed request"
            );
          }
          const data =
            await response.json();

          if (
            !data.authenticated
          ) {
            router.push(
              "/admin/login"
            );
            return;
          }

          setLoading(
            false
          );
        } catch {
          router.push(
            "/admin/login"
          );
        }
      };

    checkAuth();
  }, [router]);

  const handleLogout =
    async () => {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );

      router.push(
        "/admin/login"
      );
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 md:p-8">

      {/* Header */}
      <div className="bg-white rounded-[35px] shadow-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-5">

        <DashboardHero/>

        <button
          onClick={
            handleLogout
          }
          className="bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Total Students
          </h3>

          <h2 className="text-4xl font-bold mt-3 text-[#163232]">
            0
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Attendance
          </h3>

          <h2 className="text-4xl font-bold mt-3 text-[#163232]">
            0%
          </h2>
        </div>

        <div className="bg-white rounded-[30px] p-6 shadow-md">
          <h3 className="text-gray-500">
            Pending Fees
          </h3>

          <h2 className="text-4xl font-bold mt-3 text-[#163232]">
            ₹0
          </h2>
        </div>
      </div>
      <div className="space-y-8">
          <PendingStudents />
          <FadeIn>
            <AdminStats/>
          </FadeIn>
          <AdminAnalyticsChart/>
          <NotificationCenter />
      </div>
    </div>
  );
}