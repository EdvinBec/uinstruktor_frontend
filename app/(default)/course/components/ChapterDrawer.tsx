"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getChapterTasks } from "@/lib/Services";
import { Task } from "@/types";
import { ArrowDown, Check, GraduationCap, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ChapterDrawer = ({
  chapterID,
  username,
  name,
  totalLessons,
  solvedLessons,
}: {
  chapterID: string;
  username: string;
  name: string;
  totalLessons: number;
  solvedLessons: number;
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
      className={`w-full mt-4 gap-1 px-16 py-4 border-[1px] border-gray-200 dark:border-0 rounded-md h-auto bg-white dark:bg-black`}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <Link href={chapterID !== "finished" ? `/chapter/${chapterID}` : ""}>
            <Label className="font-bold text-lg hover:opacity-75 cursor-pointer transition-all ease-in-out duration-150">
              {name}
            </Label>
          </Link>
          <div className="flex gap-4 mt-2">
            <Label className="font-medium text-sm">
              {totalLessons} Lekcije
            </Label>
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
                  <GraduationCap size={28} strokeWidth={1.5} />
                  <Label className="font-medium text-sm">Lekcija</Label>
                </div>
                <Link href={`/task/${item.taskID}`}>
                  <Label className="font-bold cursor-pointer">
                    {item.title}
                  </Label>
                </Link>
              </div>
              <div
                className={`p-1 rounded-full border-[1px] border-gray-200  ${
                  item.isCompleted && "bg-blue border-0 text-white"
                }`}
              >
                <Check size={18} strokeWidth={2} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterDrawer;
