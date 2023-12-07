"use client";

import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const JoinClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default JoinClassLayout;
