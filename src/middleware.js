import {
  NextResponse,
} from "next/server";

export function middleware(
  request
) {
  const pathname =
    request.nextUrl
      .pathname;

  const adminToken =
    request.cookies.get(
      "adminToken"
    )?.value;

  const studentToken =
    request.cookies.get(
      "studentToken"
    )?.value;

  // ADMIN
  if (
    pathname.startsWith(
      "/admin"
    )
  ) {
    const publicRoutes =
      [
        "/admin/login",
      ];

    if (
      publicRoutes.includes(
        pathname
      )
    ) {
      return NextResponse.next();
    }

    if (!adminToken) {
      return NextResponse.redirect(
        new URL(
          "/admin/login",
          request.url
        )
      );
    }
  }

  // STUDENT
  if (
    pathname.startsWith(
      "/student"
    )
  ) {
    const publicRoutes =
      [
        "/student/login",
        "/student/register",
      ];

    if (
      publicRoutes.includes(
        pathname
      )
    ) {
      return NextResponse.next();
    }

    if (
      !studentToken
    ) {
      return NextResponse.redirect(
        new URL(
          "/student/login",
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config =
{
  matcher: [
    "/admin/:path*",
    "/student/:path*",
  ],
};