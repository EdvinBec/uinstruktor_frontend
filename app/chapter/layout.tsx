import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode } from "react";

const ChapterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-8">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default ChapterLayout;
