export const protectedRoutes = [
  "/explore",
  "/class",
  "/join-classroom",
  "/settings",
  "/exercises",
  "/tutorials",
  "/course",
  "/class/[A-Za-z0-9]+",
];
export const adminRoutes = [
  /class\/[A-Za-z0-9]+\/settings/,
  /class\/[A-Za-z0-9]+\/assigment\/new/,
];
export const authRoutes = ["/login"];
export const publicRoutes = ["/"];
