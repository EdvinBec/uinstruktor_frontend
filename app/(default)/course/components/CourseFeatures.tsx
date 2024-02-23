"use client";

import { Label } from "@radix-ui/react-label";
import { BrainCircuit, Codesandbox, Rocket, Sparkle } from "lucide-react";

const CourseFeatures = ({
  skillLevel,
  skills,
}: {
  skillLevel: string;
  skills: string[];
}) => {
  return (
    <div className="w-2/5 hidden md:block">
      {skills?.map((item: string, itemIdx: number) => {
        return (
          <div
            key={itemIdx}
            className="flex items-center gap-4 border-b-[1px] py-2 border-black"
          >
            {itemIdx == 0 && <BrainCircuit strokeWidth={1.5} size={26} />}
            {itemIdx == 1 && <Sparkle strokeWidth={1.5} size={26} />}
            {itemIdx == 2 && <Codesandbox strokeWidth={1.5} size={26} />}
            <Label className="font-normal text-sm">{item}</Label>
          </div>
        );
      })}
      <div className="flex items-center gap-4 border-b-[1px] py-2 border-black">
        <Rocket strokeWidth={1.5} size={26} />
        <Label className="font-normal text-sm capitalize">{skillLevel}</Label>
      </div>
    </div>
  );
};

export default CourseFeatures;
