import { Badge } from "@/components/ui/badge";
import { fetchCourses } from "@/lib/Services";
import { letterToUpper } from "@/lib/utils";
import { Dumbbell, Gauge } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Course } from "@/types";
import Leaderboard from "@/components/Leaderboard";

const CoursePage = async () => {
  const courses = await fetchCourses();

  return (
    <div>
      <h1 className="text-5xl font-bold">Vaje</h1>
      <p className="my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        explicabo amet harum quisquam quis possimus voluptas debitis sapiente,
        iste, inventore culpa reiciendis dolorem molestias ea saepe illum
        corrupti asperiores ex?
      </p>
      <div className="space-y-16">
        <div className="gap-4 grid grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => {
            return (
              <div
                className="h-[200px] bg-neutral-200 rounded-xl"
                key={idx}
              ></div>
            );
          })}
        </div>
        <div className="gap-4 grid grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => {
            return (
              <div
                className="h-[200px] bg-neutral-200 rounded-xl"
                key={idx}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
