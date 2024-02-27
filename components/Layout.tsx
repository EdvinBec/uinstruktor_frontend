"use client";

import { TourProvider, useTour } from "@reactour/tour";
import { steps } from "@/steps";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { setSteps, setCurrentStep } = useTour();

  useEffect(() => {
    setCurrentStep(0);

    if (pathname === "/course/5af3a800") {
      setSteps!([
        {
          selector: '[data-tour="step-page-course"]',
          content: "text page",
        },
      ]);
    } else if (pathname === "/page-2") {
      setSteps!([
        {
          selector: '[data-tour="step-page-2"]',
          content: "text page 2",
        },
        {
          selector: '[data-tour="step-page-3"]',
          content: "text page 3",
        },
      ]);
    } else {
      setSteps!(steps);
    }
  }, [pathname, setCurrentStep, setSteps]);

  return <TourProvider steps={steps}>{children}</TourProvider>;
};

export default DefaultLayout;
