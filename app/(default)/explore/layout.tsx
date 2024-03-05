"use client";

import Navbar from "@/components/Navbar/Navbar";
import { steps } from "@/steps";
import { TourProvider } from "@reactour/tour";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:text-black">
      <TourProvider steps={steps}>{children}</TourProvider>
    </div>
  );
};

export default ExploreLayout;
