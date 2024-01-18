"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import Navbar from "@/components/Navbar/Navbar";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full overflow-hidden">{children}</div>;
};

export default LoginLayout;
