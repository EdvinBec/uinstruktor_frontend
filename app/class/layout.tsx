"use client";

import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="max-w-[1400px] mx-auto px-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
