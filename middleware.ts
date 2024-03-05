import { NextRequest, NextResponse } from "next/server";
import { adminRoutes, authRoutes, protectedRoutes } from "./lib/routes";
import { decryptAuthToken } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const currentUserToken = request.cookies.get("token")?.value;
  const user = await decryptAuthToken(currentUserToken!);

  if (!user) {
    request.cookies.delete("token");
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const isAdminRoute = adminRoutes.some((route) =>
    route.test(request.nextUrl.pathname),
  );

  if (isAdminRoute && !user?.permissions?.isAdmin) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (isProtectedRoute && !user) {
    request.cookies.delete("token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authRoutes.includes(request.nextUrl.pathname) && user) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }
};
