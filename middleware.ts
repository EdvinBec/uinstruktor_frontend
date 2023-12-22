import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./lib/routes";

export const middleware = async (request: NextRequest) => {
  const currentUserToken = request.cookies.get("token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !currentUserToken) {
    request.cookies.delete("token");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUserToken) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }
};
