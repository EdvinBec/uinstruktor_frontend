"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { useState } from "react";

const CourseDrawer = ({ name }: { name: string }) => {
  const [height, setHeight] = useState<"auto" | "400px">("auto");

  return (
    <div
      className={`w-2/3 h-[${height}] flex-col px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 cursor-pointer transition-all ease-in-out duration-250`}
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
              if (height === "400px") {
                setHeight("auto");
              } else {
                setHeight("400px");
              }
            }}
          >
            <ArrowDown />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDrawer;
