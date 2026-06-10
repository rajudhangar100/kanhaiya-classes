"use client";

import { useState } from "react";

export default function Register() {
  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      fullName: "",
      mobileNumber: "",
      parentMobileNumber:
        "",
      standard: "",
      schoolName: "",
      gender: "",
      address: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        const response =
          await fetch(
            "/api/students/register",
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

        if (data.success) {
          alert(
            "Registration successful.\nPlease wait for admin approval before login."
          );
          setSuccess(
            "Registration submitted. Wait for admin approval."
          );
          router.push(
            "/student/login"
          );
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

  return (
    <div className="min-h-screen hero-gradient py-20 px-5">

      <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-8 shadow-xl">

        <h1 className="heading-font text-4xl font-bold text-center text-[#163232]">
          Student Registration
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 grid gap-5"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4"
            required
          />

          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4"
            required
          />

          <input
            type="text"
            name="parentMobileNumber"
            placeholder="Parent Mobile Number"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4"
          />

          <select
            name="standard"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4"
            required
          >
            <option value="">
              Select Standard
            </option>

            {[...Array(12)].map(
              (_, i) => (
                <option
                  key={i}
                  value={
                    i + 1
                  }
                >
                  {i + 1}
                </option>
              )
            )}
          </select>

          <input
            type="text"
            name="schoolName"
            placeholder="School Name"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4"
          />

          <select
            name="gender"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4"
          >
            <option value="">
              Select Gender
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 h-32"
          />

          <button
            disabled={loading}
            className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold"
          >
            {loading
              ? "Submitting..."
              : "Register"}
          </button>

          {success && (
            <p className="text-green-600 text-center">
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}