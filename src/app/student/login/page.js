"use client";

import {
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { ShieldCheck } from "lucide-react";

export default function StudentLogin() {
  const router = useRouter();

  const [mobile, setMobile] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [
    confirmationResult,
    setConfirmationResult,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState({
      type: "",
      text: "",
    });

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    )
      return;

    const initializeRecaptcha =
      async () => {
        try {
          if (
            !window
              .recaptchaVerifier
          ) {
            window.recaptchaVerifier =
              new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                  size:
                    "invisible",

                  callback:
                    () => {
                      console.log(
                        "reCAPTCHA solved"
                      );
                    },
                }
              );

            await window.recaptchaVerifier.render();
          }
        } catch (error) {
          console.error(
            "Recaptcha init error:",
            error
          );
        }
      };

    initializeRecaptcha();
  }, []);

  const sendOtp =
    async () => {
      try {
        setLoading(true);

        setMessage({
          type: "",
          text: "",
        });

        // validate mobile number
        if (
          !/^\d{10}$/.test(
            mobile
          )
        ) {
          setMessage({
            type: "error",
            text:
              "Please enter a valid 10-digit mobile number.",
          });

          return;
        }

        // check student exists
        const response =
          await fetch(
            "/api/student/login",
            {
              method: "POST",
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
          setMessage({
            type: "error",
            text:
              data.message ||
              "Student not found.",
          });

          return;
        }

        // initialize recaptcha if missing
        if (
          !window
            .recaptchaVerifier
        ) {
          window.recaptchaVerifier =
            new RecaptchaVerifier(
              auth,
              "recaptcha-container",
              {
                size:
                  "invisible",
              }
            );
        }

        const appVerifier =
          window.recaptchaVerifier;

        const result =
          await signInWithPhoneNumber(
            auth,
            `+91${mobile}`,
            appVerifier
          );

        setConfirmationResult(
          result
        );

        setMessage({
          type: "success",
          text:
            "OTP sent successfully.",
        });
      } catch (error) {
        console.error(
          "Send OTP Error:",
          error
        );

        setMessage({
          type: "error",
          text:
            error.message ||
            "Failed to send OTP.",
        });
      } finally {
        setLoading(false);
      }
    };

  const verifyOtp =
    async () => {
      try {
        setLoading(true);

        setMessage({
          type: "",
          text: "",
        });

        if (
          otp.length !== 6
        ) {
          setMessage({
            type: "error",
            text:
              "Please enter a valid 6-digit OTP.",
          });

          return;
        }

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

              body:
                JSON.stringify(
                  {
                    mobileNumber:
                      mobile,
                  }
                ),
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Login failed"
          );
        }

        const data =
          await response.json();

        if (
          !data.success
        ) {
          setMessage({
            type: "error",
            text:
              data.message ||
              "Login failed.",
          });

          return;
        }

        setMessage({
          type: "success",
          text:
            "Login successful. Redirecting...",
        });

        setTimeout(() => {
          router.push(
            "/student/dashboard"
          );
        }, 1000);
      } catch (error) {
        console.error(
          "Verify OTP Error:",
          error
        );

        setMessage({
          type: "error",
          text:
            "Invalid OTP. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-5 py-10">

      <div className="bg-white rounded-[40px] p-8 shadow-xl max-w-md w-full">

        {/* Title with Icon */}
        <div className="flex items-center justify-center gap-3">

          <ShieldCheck
            size={36}
            className="text-[#2CB5A0]"
          />

          <h1 className="heading-font text-4xl font-bold text-[#163232]">
            Student Login
          </h1>
        </div>

        <p className="text-center text-gray-500 mt-2">
          Login with mobile OTP
        </p>

        <div className="mt-8 space-y-5">

          {/* Mobile Number */}
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(
                e.target.value
                  .replace(
                    /\D/g,
                    ""
                  )
                  .slice(0, 10)
              )
            }
            className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
            maxLength={10}
          />

          {!confirmationResult ? (
            <>
              <div
                id="recaptcha-container"
                style={{
                  display:
                    "none",
                }}
              />

              <button
                onClick={
                  sendOtp
                }
                disabled={
                  loading
                }
                className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold disabled:opacity-70"
              >
                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <input
                type="tel"
                placeholder="Enter OTP"
                value={otp}
                onChange={(
                  e
                ) =>
                  setOtp(
                    e.target.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        6
                      )
                  )
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2CB5A0]"
                maxLength={6}
              />

              <button
                onClick={
                  verifyOtp
                }
                disabled={
                  loading
                }
                className="w-full bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white py-4 rounded-2xl font-semibold disabled:opacity-70"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </>
          )}

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
        </div>
      </div>
    </div>
  );
}