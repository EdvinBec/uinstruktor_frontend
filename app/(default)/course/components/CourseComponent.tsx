"use client";

import Paginator from "@/components/ui/paginator";
import CourseFeatures from "./CourseFeatures";
import CourseHeader from "./CourseHeader";
import ChapterDrawer from "./ChapterDrawer";
import { Chapter, Course, Resume } from "@/types";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTour } from "@reactour/tour";

type Props = {
  filteredCourse: Course;
  username: string;
  currentModule: Resume;
  chapters: Chapter[];
  wordsArray: string[];
};

const CourseComponent = ({
  filteredCourse,
  username,
  currentModule,
  chapters,
  wordsArray,
}: Props) => {
  const { toast } = useToast();
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (!localStorage.getItem("courseTour")) {
      toast({
        title: "Uvod v tečaj",
        description: "Z klikom na gumb, si lahko ogledate uvod skozi tečaj.",
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
    <div className="w-full dark:text-white">
      <Paginator
        links={[
          { display: "Tečaji", href: "/explore" },
          { display: filteredCourse?.title!, href: "", current: true },
        ]}
        className="mb-4"
      />
      <div
        className="flex mb-12 gap-12 border-gray-200 border-[1px] dark:border-0 bg-white dark:bg-black px-8 py-6 rounded-md"
        data-tour="step-course"
      >
        <CourseHeader
          firstChapter={chapters[0].chapterID}
          courseId={filteredCourse?.courseID!}
          username={username as string}
          title={filteredCourse?.title!}
          description={filteredCourse?.description!}
          progress={filteredCourse?.progress!}
        />
        <CourseFeatures
          skillLevel={filteredCourse?.skillLevel!}
          skills={wordsArray!}
        />
      </div>
      <div data-tour="step-course-4">
        <h2 className="font-bold text-2xl">Trenutno poglavje</h2>
        <ChapterDrawer
          username={username as string}
          currentModule={
            currentModule.nextChapter === null
              ? chapters[0]
              : chapters.find(
                  (item: Chapter) =>
                    currentModule.nextChapter === item.chapterID
                )!
          }
        />
      </div>
      <div className="mt-8" data-tour="step-course-5">
        <h2 className="font-bold text-2xl">Kazalo vsebine</h2>
        {chapters.map((item: Chapter, itemIdx: number) => {
          return (
            <ChapterDrawer
              key={itemIdx}
              username={username as string}
              currentModule={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseComponent;
