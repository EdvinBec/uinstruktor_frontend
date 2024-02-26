import React from "react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

import Banner0 from "@/assets/img/gradient.jpg";
import Banner1 from "@/assets/img/gradient2.jpg";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  title: string;
  description: string;
  src?: string;
  progress?: number;
};

const ClassCard = ({ title, description, src, progress }: Props) => {
  return (
    <div className="w-full h-full min-h-[200px] rounded-md border border-gray-200 hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className="rounded-t-xl relative min-h-[150px] flex flex-col justify-end p-4">
        <Image
          className="absolute w-full h-full -z-20 top-0 left-0 rounded-t-md inset-0"
          src={Math.floor(Math.random() * 100) % 2 === 0 ? Banner0 : Banner1}
          alt="Class Banner Image"
        />
        <h1 className="text-xl text-white self-start font-bold">{title}</h1>
      </div>
      <div className="p-4 flex justify-between items-center mt-1">
        <p className="text-black font-semibold text-base">{description}</p>
        <Button variant={"blue"}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;
