"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/admin/login",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              formData
            ),
          }
        );
        if (!response.ok) {
          throw new Error(
            "Failed request"
          );
        }

      const data =
        await response.json();

      if (!data.success) {
        setError(
          data.message
        );
        setLoading(false);
        return;
      }
      console.log("dashboard pr jaana chaiye");
      console.log(
        "redirecting..."
      );
      
      setTimeout(() => {
        window.location.href =
          "/admin/dashboard";
      }, 1000);
      // router.replace("/admin/dashboard");
    } catch (error) {
      console.log("error: ",error);
      setError(
        error.message || 
        "Something went wrong: ", 
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-5">

      <div className="glass rounded-[40px] p-8 md:p-10 w-full max-w-md shadow-2xl border border-white/50">

        <h1 className="heading-font text-4xl font-bold text-center text-[#163232]">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Welcome to Kanhaiya
          Classes Admin Panel
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium text-[#163232]">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={
                formData.username
              }
              onChange={
                handleChange
              }
              className="w-full mt-2 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#3ED6C1]"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="font-medium text-[#163232]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className="w-full mt-2 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#3ED6C1]"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}