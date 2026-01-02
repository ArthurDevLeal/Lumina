import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth/login", "/auth/register"];
const privateRoutes = ["/dashboard"];

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const hasToken = Boolean(token);

  if (path === "/" && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (hasToken && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));

  if (!hasToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};