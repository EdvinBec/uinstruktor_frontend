"use client";

import Navbar from "@/components/Navbar/Navbar";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen px-4 py-2">
      <Navbar />
      <div className="h-[90%] flex justify-center">{children}</div>
    </div>
  );
};

export default ClassLayout;
