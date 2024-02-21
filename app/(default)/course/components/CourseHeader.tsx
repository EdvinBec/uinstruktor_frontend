"use client";

import CustomButton from "@/components/CustomButton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { resumeLearning } from "@/lib/Services";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CourseHeader = ({
  title,
  description,
  progress,
  username,
  firstChapter,
  courseId,
}: {
  title: string;
  description: string;
  progress: number;
  username: string;
  firstChapter: string;
  courseId: string;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const continueLearning = async () => {
    try {
      const result = await resumeLearning(username);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handeResumeCourse = async () => {
    setIsLoading(true);
    const result = await continueLearning();
    if (result.nextChapter === null) {
      router.push(`/chapter/${firstChapter}`);
      setIsLoading(false);
    } else if (result.nextChapter === "finished") {
      router.push(`/course/${courseId}`);
      setIsLoading(false);
    } else {
      if (result.proceed === true) {
        router.push(`/chapter/${result.nextChapter}`);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full md:w-3/5">
      <h1 className="font-bold text-3xl tracking-wide">{title}</h1>
      <CustomButton
        className="my-4"
        isLoading={isLoading}
        label="Nadaljuj z učenjem"
        onClick={handeResumeCourse}
      />

      <p className="mt-2">{description}</p>
      <div className="mt-4">
        <h2 className="mb-2 font-bold text-xl">Napredek</h2>
        <div className="flex gap-4 w-full items-center">
          <Progress value={Math.floor(progress)} />
          <h3 className="font-bold text-xl">{Math.floor(progress)}%</h3>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
