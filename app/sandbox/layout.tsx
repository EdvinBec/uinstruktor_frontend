import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const SandboxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full px-4 relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default SandboxLayout;
