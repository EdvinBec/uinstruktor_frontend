"use client";

import { Course } from "@/types";
import CourseCard from "./CourseCard";
import CodeBlocks from "./CodeBlocks";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTour } from "@reactour/tour";

type Props = {
  course: Course[];
};

const ExplorePageComponent = ({ course }: Props) => {
  const { setIsOpen } = useTour();
  const { toast } = useToast();

  useEffect(() => {
    if (!localStorage.getItem("exploreTour")) {
      toast({
        title: "Uvod",
        description:
          "Z klikom na gumb, si lahko ogledate voden uvod skozi našo aplikacijo.",
        action: (
          <ToastAction
            altText="Poglej uvod"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Poglej uvod
          </ToastAction>
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-8 dark:text-white" data-tour="step-explore">
      <div className="flex gap-8 flex-wrap lg:flex-nowrap">
        {course.map((item: Course, itemIdx: number) => {
          const wordsArray = item?.skills.split(",").map((word) => word.trim());
          return (
            <div
              className="lg:max-w-full md:max-w-[350px] w-full h-full"
              data-tour={`step-explore-${itemIdx + 1}`}
              key={itemIdx}
            >
              <CourseCard
                itemIdx={itemIdx}
                courseID={item.courseID}
                skillLevel={item.skillLevel}
                wordsArray={wordsArray}
                progress={item.progress!}
                name={item.title}
              />
            </div>
          );
        })}
      </div>
      <div data-tour="step-explore-4">
        <CodeBlocks />
      </div>
    </div>
  );
};

export default ExplorePageComponent;
