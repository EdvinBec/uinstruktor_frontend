"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Check, Loader } from "lucide-react";
import { useState } from "react";

const RoadmapCard = ({
  title,
  description,
  tags,
  disabled,
  taskID,
  chapterID,
  isCompleted,
}: {
  title: string;
  description: string;
  tags: string[];
  disabled: boolean;
  taskID: string;
  chapterID: string;
  isCompleted: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`w-[350px] rounded-md bg-[#2B44E7] px-6 py-4 gap-4 flex flex-col items-center text-white`}
    >
      <h1 className="font-extrabold text-center text-2xl tracking-wide">
        {title}
      </h1>
      <p className="text-center text-sm font-medium">{description}</p>
      <div className="flex gap-2">
        {tags.map((item: string, itemIdx: number) => {
          return (
            <div
              key={itemIdx}
              className="bg-black px-4 py-1 font-medium text-white text-xs rounded-full w-auto"
            >
              {item}
            </div>
          );
        })}
      </div>
      {!disabled ? (
        isCompleted ? (
          <Button
            className={`w-full flex gap-2 opacity-80 ${
              isCompleted && "bg-green-500"
            }`}
            variant="default"
            disabled
          >
            <Link
              href={`/task/${taskID}`}
              className="w-full flex justify-center gap-2"
            >
              <div className=" text-white">
                <Check size={18} />
              </div>
              Rešeno
            </Link>
          </Button>
        ) : (
          <Button
            className={`w-full bg-black hover:bg-black hover:opacity-80 transition-all ease-in-out duration-150  ${
              isCompleted && "bg-green-500"
            }`}
            variant="default"
            onClick={() => setIsLoading(true)}
          >
            <Link
              href={`/task/${taskID}`}
              className="w-full flex justify-center gap-2"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              Start!
            </Link>
          </Button>
        )
      ) : (
        <Button
          className={`w-full bg-black  ${isCompleted && "bg-green-500"}`}
          variant="default"
          disabled
        >
          Start!
        </Button>
      )}
    </div>
  );
};

export default RoadmapCard;
