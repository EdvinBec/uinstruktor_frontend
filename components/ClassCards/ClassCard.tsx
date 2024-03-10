import React from "react";
import { Button } from "../ui/button";

import Banner0 from "@/assets/img/gradient.png";
import Banner1 from "@/assets/img/gradient2.png";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  src?: string;
  progress?: number;
};

const ClassCard = ({ title, description }: Props) => {
  return (
    <div className="w-full h-full min-h-[200px] rounded-md border bg-white dark:bg-black border-gray-200 dark:border-neutral-800 hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className="rounded-t-xl relative min-h-[150px] flex flex-col justify-end p-4">
        <Image
          className="absolute w-full h-full z-20 top-0 left-0 rounded-t-md inset-0"
          src={Math.floor(Math.random() * 100) % 2 === 0 ? Banner0 : Banner1}
          alt="Class Banner Image"
        />
        <h1 className="text-xl text-white absolute z-50 self-start font-bold">
          {title}
        </h1>
      </div>
      <div className="p-4 flex justify-between rounded-b-md items-center mt-1 dark:bg-black bg-white">
        <p className="text-black dark:text-white font-semibold text-base">
          {description}
        </p>
        <Button variant={"blue"}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;
