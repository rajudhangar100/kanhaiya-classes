"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState({
      type: "",
      text: "",
    });

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
    const {
      name,
      value,
    } = e.target;

    // allow only digits for phone numbers
    if (
      name ===
        "mobileNumber" ||
      name ===
        "parentMobileNumber"
    ) {
      const cleaned =
        value
          .replace(/\D/g, "")
          .slice(0, 10);

      setFormData({
        ...formData,
        [name]: cleaned,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setMessage({
        type: "",
        text: "",
      });

      // validate student mobile
      if (
        !/^\d{10}$/.test(
          formData.mobileNumber
        )
      ) {
        setMessage({
          type: "error",
          text:
            "Student mobile number must be exactly 10 digits.",
        });

        return;
      }

      // validate parent mobile (optional)
      if (
        formData.parentMobileNumber &&
        !/^\d{10}$/.test(
          formData.parentMobileNumber
        )
      ) {
        setMessage({
          type: "error",
          text:
            "Parent mobile number must be exactly 10 digits.",
        });

        return;
      }

      setLoading(true);

      try {
        const response =
          await fetch(
            "/api/students/register",
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  formData
                ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
              "Registration failed"
          );
        }

        if (
          data.success
        ) {
          setMessage({
            type:
              "success",
            text:
              "Registration submitted successfully. Wait for admin approval.",
          });

          // reset form
          setFormData({
            fullName:
              "",
            mobileNumber:
              "",
            parentMobileNumber:
              "",
            standard:
              "",
            schoolName:
              "",
            gender:
              "",
            address:
              "",
          });

          // redirect after 2 sec
          setTimeout(
            () => {
              router.replace(
                "/student/login"
              );
            },
            2000
          );
        } else {
          setMessage({
            type:
              "error",
            text:
              data.message ||
              "Registration failed.",
          });
        }
      } catch (error) {
        console.error(
          "Registration Error:",
          error
        );

        setMessage({
          type: "error",
          text:
            error.message ||
            "Something went wrong. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen hero-gradient py-20 px-5">

      <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-8 shadow-xl">

        {/* Title with icon */}
        <div className="flex items-center justify-center gap-3">

          <UserPlus
            size={36}
            className="text-[#2CB5A0]"
          />

          <h1 className="heading-font text-4xl font-bold text-[#163232]">
            Student Registration
          </h1>
        </div>

        <p className="text-center text-gray-500 mt-2">
          Register to access student portal
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 grid gap-5"
        >

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={
              formData.fullName
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
            required
          />

          {/* Student Mobile */}
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={
              formData.mobileNumber
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
            maxLength={10}
            required
          />

          {/* Parent Mobile */}
          <input
            type="tel"
            name="parentMobileNumber"
            placeholder="Parent Mobile Number"
            value={
              formData.parentMobileNumber
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
            maxLength={10}
          />

          {/* Standard */}
          <select
            name="standard"
            value={
              formData.standard
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
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
                  Class{" "}
                  {i + 1}
                </option>
              )
            )}
          </select>

          {/* School */}
          <input
            type="text"
            name="schoolName"
            placeholder="School Name"
            value={
              formData.schoolName
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
          />

          {/* Gender */}
          <select
            name="gender"
            value={
              formData.gender
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
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

            <option value="other">
              Other
            </option>
          </select>

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
            className="border rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading
            }
            className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold disabled:opacity-70"
          >
            {loading
              ? "Submitting..."
              : "Register"}
          </button>

          {/* Message */}
          {message.text && (
            <div
              className={`text-center rounded-xl py-3 px-4 text-sm font-medium ${
                message.type ===
                "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {
                message.text
              }
            </div>
          )}
        </form>
      </div>
    </div>
  );
}