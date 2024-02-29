"use client";

import { courseSteps } from "@/steps";
import { TourProvider } from "@reactour/tour";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:text-black">
      <TourProvider steps={courseSteps}>{children}</TourProvider>
    </div>
  );
};

export default CourseLayout;
