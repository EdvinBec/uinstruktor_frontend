"use client";

import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  difficulty: string;
  title: string;
  id: number;
};

const CardContent = ({ difficulty, title, id }: Props) => {
  const router = useRouter();

  return (
    <div className="absolute bg-white w-full h-2/5 flex items-center justify-between z-10 items-star bottom-0 rounded-b-md px-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-xl text-black">{title}</h1>
        <div
          className={`rounded-full text-center px-2 text-white ${
            difficulty == "easy" && "bg-green-500 w-12"
          } ${difficulty == "medium" && "bg-orange-500 w-16"} ${
            difficulty == "hard" && "bg-red-600 w-12"
          }`}
        >
          <h2 className="text-xs py-1 font-medium">{difficulty}</h2>
        </div>
      </div>
      <Button
        onClick={() => {
          router.push("/problem/" + id);
        }}
        className="rounded-full w-12 h-12 flex items-center justify-center dark:bg-black dark:text-white dark:hover:bg-black dark:hover:opacity-70"
      >
        <Play />
      </Button>
    </div>
  );
};

export default CardContent;
