"use client";

import {
  useState,
  useEffect,
} from "react";

import { useRouter }
from "next/navigation";

import { auth }
from "@/lib/firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function StudentLogin() {
  const router =
    useRouter();

  const [mobile,
    setMobile] =
    useState("");

  const [otp,
    setOtp] =
    useState("");

  const [
    confirmationResult,
    setConfirmationResult,
  ] = useState(null);

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {
    if (
      typeof window !==
      "undefined" &&
      !window.recaptchaVerifier
    ) {
      try {
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }

        window.recaptchaVerifier =
          new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
            }
        );

        window.recaptchaVerifier.render();
      } catch (error) {
        console.error(
          "Recaptcha init error:",
          error
        );
      }
    }
  }, []);

  const sendOtp =
    async () => {
      try {
        setLoading(true);

        const appVerifier =
          window.recaptchaVerifier;
        const response =
        await fetch(
          "/api/student/login",
          {
            method:
              "POST",
          
            headers: {
              "Content-Type":
                "application/json",
            },
          
            body:
              JSON.stringify(
                {
                  mobileNumber:
                    mobile,
                }
              ),
          }
        );
      
      const data =
        await response.json();
      
      if (!data.success) {
        alert(
          data.message
        );
      
        setLoading(
          false
        );
      
        return;
      }

        const result =
          await signInWithPhoneNumber(
            auth,
            `+91${mobile}`,
            appVerifier
          );

        setConfirmationResult(
          result
        );

        alert(
          "OTP sent successfully"
        );
      } catch (error) {
        console.error(
          "Send OTP Error:",
          error
        );

        alert(
          `${error.code}\n${error.message}`
        );
      }

      setLoading(false);
    };

  const verifyOtp =
    async () => {
      try {
        setLoading(true);

        await confirmationResult.confirm(
          otp
        );

        const response =
          await fetch(
            "/api/student/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  mobileNumber:
                    mobile,
                }
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

        if (
          !data.success
        ) {
          alert(
            data.message
          );
          return;
        }
        console.log("dashboard aana chaiye");
        window.location.href="/student/dashboard";
        
      } catch (error) {
        console.error(
          "Verify OTP Error:",
          error
        );

        alert(
          "Invalid OTP"
        );
      }

      setLoading(false);
    };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-5">

      <div className="bg-white rounded-[40px] p-8 shadow-xl max-w-md w-full">

        <h1 className="heading-font text-4xl font-bold text-center text-[#163232]">
          Student Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login with mobile OTP
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-4"
          />

          {!confirmationResult ? (
            <>
              <div
                id="recaptcha-container"
                className="flex justify-center"
              />

              <button
                onClick={
                  sendOtp
                }
                disabled={
                  loading
                }
                className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold"
              >
                {loading
                  ? "Sending..."
                  : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

              <button
                onClick={
                  verifyOtp
                }
                disabled={
                  loading
                }
                className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}