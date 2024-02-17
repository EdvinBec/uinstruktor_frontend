import { Badge } from "@/components/ui/badge";
import { fetchCourses } from "@/lib/Services";
import { letterToUpper } from "@/lib/utils";
import { Dumbbell, Gauge } from "lucide-react";
import Link from "next/link";
import React from "react";

type Course = {
  title: string;
  courseID: string;
  description: string;
  skillLevel: string;
  skills: string;
};

const CoursePage = async () => {
  const courses = await fetchCourses();

  return (
    <>
      <div className="w-full text-neutral-100 bg-neutral-900 rounded-xl p-4 py-6 my-4 mb-8">
        <h3 className="text-2xl text-center">
          Neveš kje bi začel?{" "}
          <span className="font-medium underline">Reši naš kviz</span>
        </h3>
      </div>
      <h1 className="font-bold text-4xl">Raziščite katalog tečajev</h1>
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">Popularni tečaji in jeziki</h2>
        <div className="flex flex-row gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <div
                className="bg-neutral-900 border-neutral-800 rounded-xl flex-1 h-[150px]"
                key={index}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-semibold text-2xl">Seznam tecajev</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {courses.map((course: Course, index: number) => {
            return (
              <Link href={`/course/${course.courseID}`} key={index}>
                <div className="bg-neutral-900 border-neutral-800 border text-neutral-100 rounded-xl p-4 flex-1 flex flex-col justify-between h-[250px] shadow-lg hover:shadow-neutral-400/10 transition-all">
                  <div>
                    <h4 className="text-xl font-semibold">{course.title}</h4>
                    <p className="my-2">{course.description}</p>
                    <div className="flex flex-row flex-wrap gap-2 my-2">
                      {course.skills.split(",").map((skill, index) => {
                        return (
                          <Badge
                            variant={"default"}
                            className="bg-neutral-100 text-neutral-900"
                            key={index}
                          >
                            {skill}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    {" "}
                    <Dumbbell /> <p>{letterToUpper(course.skillLevel)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
