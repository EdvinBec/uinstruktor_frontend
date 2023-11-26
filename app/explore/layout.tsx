"use client";

import { Button } from "@/components/ui/button";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default ExploreLayout;
