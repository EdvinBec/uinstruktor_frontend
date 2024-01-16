"use client";

import Navbar from "@/components/Navbar/Navbar";

const JoinClassLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full h-screen">{children}</div>;
};

export default JoinClassLayout;
