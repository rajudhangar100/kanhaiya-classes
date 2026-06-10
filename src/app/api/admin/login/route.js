import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { username, password } =
      await request.json();

    const admin =
      await Admin.findOne({
        username,
      });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      generateToken({
        id: admin._id,
        role: "admin",
      });

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login successful",
      });

    response.cookies.set(
      "adminToken",
      token,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:
          60 *
          60 *
          24 *
          7,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}