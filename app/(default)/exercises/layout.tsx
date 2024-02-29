"use client";

import { exerciseSteps } from "@/steps";
import { TourProvider } from "@reactour/tour";

const ExercisesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:text-black">
      <TourProvider className="rounded-md" steps={exerciseSteps}>
        {children}
      </TourProvider>
    </div>
  );
};

export default ExercisesLayout;
