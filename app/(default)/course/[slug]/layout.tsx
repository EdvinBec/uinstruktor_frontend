"use client";

import { courseSteps } from "@/steps";
import { TourProvider } from "@reactour/tour";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return <TourProvider steps={courseSteps}>{children}</TourProvider>;
};

export default CourseLayout;
