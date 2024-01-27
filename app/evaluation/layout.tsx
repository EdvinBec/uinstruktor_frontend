import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";
import React from "react";

const EvalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="max-w-[1400px] mx-auto px-4">
        <Navbar />

        {children}
        <Footer />
      </div>
    </div>
  );
};

export default EvalLayout;
