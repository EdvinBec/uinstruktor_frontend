"use client";

import { Label } from "@radix-ui/react-label";
import {
  BrainCircuit,
  CheckCircle2,
  Codesandbox,
  Rocket,
  Sparkle,
} from "lucide-react";

const CourseFeatures = ({
  skillLevel,
  skills,
}: {
  skillLevel: string;
  skills: string[];
}) => {
  return (
    <div className="w-2/5 hidden md:block">
      <h2 className="text-2xl font-semibold mb-4">Znanja</h2>
      {skills?.map((item: string, itemIdx: number) => {
        return (
          <div
            key={itemIdx}
            className="flex items-center gap-4  py-2 border-black dark:border-white"
          >
            <CheckCircle2 color="#2B44E7" size={24} />
            <Label className="font-normal text-sm">{item}</Label>
          </div>
        );
      })}
      {/* <div className="flex items-center gap-4 border-b-[1px] py-2 border-black dark:border-white">
        <Rocket strokeWidth={1.5} size={26} />
        <Label className="font-normal text-sm capitalize">{skillLevel}</Label>
      </div> */}
    </div>
  );
};

export default CourseFeatures;
