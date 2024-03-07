import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Coins, Dumbbell, Info, Weight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  points: number;
  difficulty: string;
  exerciseID: string;
  tags: string;
};

const Exercise = ({
  title,
  description,
  points,
  difficulty,
  tags,
  exerciseID,
}: Props) => {
  let weightSize;

  if (difficulty === "lahko") {
    weightSize = 17;
  } else if (difficulty === "srednje") {
    weightSize = 25;
  } else {
    weightSize = 30;
  }

  return (
    <Link className="h-[200px]" href={`/exercise/${exerciseID}`}>
      <div className="min-h-[220px] w-full flex flex-col justify-between border-gray-200 dark:border-0 border-[1px] rounded-md p-4 bg-white dark:bg-black">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm mt-1">{description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 mt-8">
            {tags.split(",").map((tag, idx) => {
              return (
                <Badge className="border-0" variant="tag" key={idx}>
                  {tag}
                </Badge>
              );
            })}
          </div>
          <div className="flex flex-row justify-between pb-1">
            <div className="flex flex-row items-center gap-2">
              <Weight size={weightSize} strokeWidth={2} />
              <Label className="capitalize">{difficulty}</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Coins size={20} strokeWidth={2} />
              <Label className="text-sm">{points}</Label>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="hover:text-blue">
                      <Info size={18} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tekmuj z drugimi v zbiranju točk.</p>
                    <p>Preglej lestvico najboljših učencev</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Exercise;
