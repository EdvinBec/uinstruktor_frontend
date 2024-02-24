import { Coins, Dumbbell } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  description: string;
  points: number;
  difficulty: string;
  exerciseID: string;
};

const Exercise = ({
  title,
  description,
  points,
  difficulty,
  exerciseID,
}: Props) => {
  return (
    <div className="h-[280px] aspect-square border flex flex-col justify-between border-gray-500 rounded-xl p-4">
      <div>
        <h3 className="font-medium text-xl">{title}</h3>
        <p className="text-neutral-600 mt-4">{description}</p>
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
  );
};

export default Exercise;
