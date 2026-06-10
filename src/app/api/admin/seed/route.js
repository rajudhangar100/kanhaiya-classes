import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    const existingAdmin =
      await Admin.findOne({
        username: "admin",
      });

    if (existingAdmin) {
      return Response.json({
        success: false,
        message:
          "Admin already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await Admin.create({
      username: "admin",
      password:
        hashedPassword,
    });

    return Response.json({
      success: true,
      message:
        "Admin created successfully",
    });
  } catch (error) {
    return Response.json(
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