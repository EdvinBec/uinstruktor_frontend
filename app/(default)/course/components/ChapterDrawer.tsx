"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getChapterTasks } from "@/lib/Services";
import { Task } from "@/types";
import { cn } from "@udecode/cn";
import {
  ArrowDown,
  Check,
  GraduationCap,
  Hourglass,
  Loader,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ChapterDrawer = ({
  chapterID,
  username,
  name,
  totalLessons,
  solvedLessons,
  current,
}: {
  chapterID: string;
  username: string;
  name: string;
  totalLessons: number;
  solvedLessons: number;
  current?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>();

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const result = await getChapterTasks(chapterID, username);
      setTasks(result);
      setIsLoading(false);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        `w-full  mt-4 gap-1 px-16 py-4 border-[1px] border-gray-200 rounded-md h-auto bg-white dark:bg-black`,
        current ? "border-blue" : "dark:border-transparent",
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <Link href={chapterID !== "finished" ? `/chapter/${chapterID}` : ""}>
            <Label className="font-bold text-lg hover:opacity-75 cursor-pointer transition-all ease-in-out duration-150">
              {name}
            </Label>
          </Link>
          <div className="flex gap-4 mt-2">
            <Label className="font-medium text-sm">{totalLessons} Naloge</Label>
            <Label className="font-medium text-sm">|</Label>
            <Label className="font-medium text-sm">
              {solvedLessons} Rešenih
            </Label>
          </div>
        </div>
        <Button
          variant="ghost"
          className={`${
            isOpen && "rotate-180 transition-all ease-in-out duration-200"
          }`}
          size="icon"
          onClick={() => {
            if (!isOpen) {
              if (!tasks) {
                getTasks();
              } else {
                setIsOpen(true);
              }
            } else {
              setIsOpen(false);
            }
          }}
        >
          {!isLoading && <ArrowDown />}
          {isLoading && <Loader size={24} className="animate-spin" />}
        </Button>
      </div>
      <div className={`mt-8 ${!isOpen && "hidden"}`}>
        {tasks?.map((item: Task, itemIdx: number) => {
          return (
            <div key={itemIdx} className="flex justify-between items-center">
              <div className="flex items-center py-2">
                <div className="flex items-center gap-4 mr-8">
                  <ScrollText size={28} strokeWidth={1.5} />
                  <Label className="font-medium text-sm">Naloga</Label>
                </div>
                <Link href={`/task/${item.taskID}`}>
                  <Label className="font-bold cursor-pointer">
                    {item.title}
                  </Label>
                </Link>
              </div>
              {item.isCompleted ? (
                <div
                  className={`p-1 rounded-full border border-transparent border-gray-200 bg-blue  text-white `}
                >
                  <Check size={18} strokeWidth={2} />
                </div>
              ) : (
                <div
                  className={`p-1 rounded-full border border-neutral-300  bg-neutral-200 text-black `}
                >
                  <Hourglass size={18} strokeWidth={2} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterDrawer;
