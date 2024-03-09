"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseImage1 from "@/assets/img/courseImage1.jpg";
import CourseImage2 from "@/assets/img/courseImage2.jpg";
import CourseImage3 from "@/assets/img/courseImage3.jpg";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

const CourseCard = ({
  itemIdx,
  wordsArray,
  courseID,
  progress,
  skillLevel,
  name,
}: {
  itemIdx: number;
  wordsArray: string[];
  courseID: string;
  progress: number;
  skillLevel: string;
  name: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`${
        progress === 100
          ? "bg-[#8ac926] px-2 pt-2 pb-1 rounded-md text-center"
          : ""
      }`}
    >
      <div
        className={` p-4 border-[1px] border-gray-200 dark:border-0 rounded-md lg:max-w-full md:max-w-[350px] w-full bg-white dark:bg-black`}
      >
        {itemIdx === 0 && (
          <Image className="rounded-md" src={CourseImage1} alt="course" />
        )}
        {itemIdx === 1 && (
          <Image className="rounded-md" src={CourseImage2} alt="course" />
        )}
        {itemIdx === 2 && (
          <Image className="rounded-md" src={CourseImage3} alt="course" />
        )}
        <div className="py-2 mt-2 flex justify-between">
          <div className="flex gap-1 items-center">
            <BarChart size={24} strokeWidth={2.5} color="#2B44E7" />
            <Label className="capitalize font-semibold">{skillLevel}</Label>
          </div>
          <div className="flex gap-2">
            {wordsArray.slice(0, 2).map((item: string, itemIdx: number) => {
              return (
                <Badge
                  key={itemIdx}
                  className="bg-[#2B44E7] capitalize text-white rounded-md font-medium"
                >
                  {item}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="mt-2 mb-8">
          <h4 className="font-bold text-xl">{name}</h4>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`course/${courseID}`}
            onClick={() => {
              setIsLoading(true);
            }}
          >
            <CustomButton
              isLoading={isLoading}
              label={
                progress === 100
                  ? "Zaključen tečaj"
                  : progress === 0
                  ? "Začni z učenjem"
                  : "Nadaljuj z učenjem"
              }
            />
          </Link>
          <div className="w-1/4 text-center">
            <Label className="font-semibold">{Math.floor(progress!)}%</Label>
            <Progress className="h-[10px] mt-1" value={Math.floor(progress!)} />
          </div>
        </div>
      </div>
      <Label
        className={`${
          progress === 100
            ? "font-bold text-white text-sm tracking-wide"
            : "hidden"
        }`}
      >
        Tečaj narejen
      </Label>
    </div>
  );
};

export default CourseCard;
