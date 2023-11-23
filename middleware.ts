import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./lib/AuthService";

export const middleware = async (request: NextRequest) => {
  const currentUserToken = request.cookies.get("token")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUserToken) {
    request.cookies.delete("token");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUserToken) {
    return NextResponse.redirect(new URL("/protected", request.url));
  }
};
