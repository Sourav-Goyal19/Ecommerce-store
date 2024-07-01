import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicPath =
    pathname == "/sign-in" ||
    pathname == "/sign-up" ||
    pathname == "/verifyemail" ||
    pathname == "/forgotpassword";

  const token = request.cookies.get("token");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
};
