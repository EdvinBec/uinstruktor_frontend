"use client";

import { ArrowDown, Book, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { useState } from "react";
import { getCourseChapters } from "@/lib/Services";
import { Chapter } from "@/types";
import ChapterListItem from "./ChapterListItem";

const CourseDrawer = ({
  name,
  courseID,
  username,
}: {
  name: string;
  courseID: string;
  username: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chapters, setChapters] = useState<Chapter[]>();

  const fetchCourseChapters = async () => {
    const chapters = await getCourseChapters(courseID, username);
    setChapters(chapters);
  };

  return (
    <div
      className={`w-2/3 h-auto flex-col px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-md transition-all ease-in-out duration-250`}
    >
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">COURSE</Label>
          <h2 className="font-bold text-xl">{name}</h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2 justify-center items-end h-full w-[75px]">
            <Label className="font-bold text-sm">79%</Label>
            <Progress value={79} className="w-full h-[10px]" />
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              if (!chapters) {
                fetchCourseChapters();
              }
              if (!isOpen) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
          >
            <ArrowDown />
          </Button>
        </div>
      </div>
      <div className={`${!isOpen && "hidden"}`}>
        <div
          className={` w-full px-6 py-4 mt-4 border-[1px] border-gray-300 rounded-md flex flex-col items-center gap-4`}
        >
          {chapters?.slice(0, 3).map((item: Chapter, itemIdx: number) => {
            return (
              <ChapterListItem key={itemIdx} name={item.name} idx={itemIdx} />
            );
          })}
          <Button variant="secondary">View More</Button>
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button variant="secondary">Continue Learning</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDrawer;
