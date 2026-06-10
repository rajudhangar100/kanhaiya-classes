import {
  cookies,
} from "next/headers";

import {
  verifyToken,
} from "@/lib/auth";

import {
  NextResponse,
} from "next/server";

export async function GET() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "adminToken"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated:
            false,
        },
        {
          status: 401,
        }
      );
    }

    const decoded =
      verifyToken(token);

    if (
      !decoded ||
      decoded.role !==
        "admin"
    ) {
      return NextResponse.json(
        {
          authenticated:
            false,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        authenticated:
          true,
      }
    );
  } catch {
    return NextResponse.json(
      {
        authenticated:
          false,
      },
      {
        status: 500,
      }
    );
  }
}