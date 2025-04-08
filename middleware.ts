import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  // Use getToken for middleware context
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Check if the user role is allowed to access /admin/* pages
  if (
    token.role !== "SuperAdmin" &&
    token.role !== "PED" &&
    req.nextUrl.pathname.startsWith("/admin/")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is allowed to access the page, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};