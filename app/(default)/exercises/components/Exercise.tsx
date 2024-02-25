import { Badge } from "@/components/ui/badge";
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
    <Link href={`/exercise/${exerciseID}`}>
      <div className="min-h-[220px] border flex flex-col justify-between border-gray-500 rounded-xl p-4">
        <div>
          <h3 className="font-medium text-xl">{title}</h3>
          <p className="text-neutral-600 mt-4">{description}</p>
          <div className="flex gap-2 mt-2">
            {tags.split(",").map((tag, idx) => {
              return (
                <Badge className="border-0" variant="tag" key={idx}>
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row justify-between pb-1">
          <div className="flex flex-row items-center gap-2">
            <Dumbbell />
            {difficulty}
          </div>
          <div className="flex flex-row items-center gap-2">
            <Coins />
            {points}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Exercise;
