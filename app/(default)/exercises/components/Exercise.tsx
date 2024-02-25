import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Coins, Dumbbell } from "lucide-react";
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
  return (
    <Link className="h-[200px]" href={`/exercise/${exerciseID}`}>
      <div className="min-h-[200px] w-full flex flex-col justify-between border-gray-200 dark:border-0 border-[1px] rounded-md p-4 bg-white">
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
              <Dumbbell size={20} strokeWidth={2} />
              <Label className="capitalize">{difficulty}</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Coins size={20} strokeWidth={2} />
              <Label className="text-sm">{points}</Label>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Exercise;
