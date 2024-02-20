import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient2.jpg";
import Placeholder2 from "@/assets/img/gradient.jpg";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  title: string;
  description: string;
  src?: string;
  progress?: number;
};

const ClassCard = ({ title, description, src, progress }: Props) => {
  return (
    <div className="w-full h-full min-h-[200px] rounded-xl border border-gray-200 hover:shadow-2xl shadow-lg transition-all duration-300">
      <div
        className="rounded-t-xl min-h-[100px] flex flex-col justify-end p-4 bg-center bg-cover
        bg-no-repeat"
        style={{ backgroundImage: "url('/gradient.jpg')" }}
      >
        <h1 className="text-xl self-start font-bold">{title}</h1>
      </div>
      <div className="p-4 flex min-h-[200px] flex-col justify-between mt-1">
        <p className="text-neutral-600 font-medium">{description}</p>
        <div className="">
          <div className="flex flex-row justify-between items-center">
            <span>Progress</span> <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <Button variant={"blue"} className="flex-[0] self-end">
          Vstopi
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;
