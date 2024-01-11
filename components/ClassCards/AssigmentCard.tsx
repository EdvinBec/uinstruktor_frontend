import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient.jpg";
import { Badge } from "@/components/ui/badge";
import { Check, Hourglass } from "lucide-react";
type Props = {
  title: string;
  description: string;
  isCompleted: boolean;
  time: string;
};

const AssigmentCard = ({ title, description, isCompleted, time }: Props) => {
  const completeDate = new Date(time);
  return (
    <div className=" w-full h-full rounded-xl border hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className=" shadow-inner relative">
        <Image
          src={Placeholder}
          className="rounded-t-xl max-h-[150px]"
          alt="Gradient grainy gradient"
        />
        {isCompleted ? (
          <Badge
            className="absolute bottom-2 left-2 p-1 aspect-square"
            variant={"passed"}
          >
            <Check size={15} />
          </Badge>
        ) : (
          <div className="rounded-full flex flex-row items-center justify-center bg-neutral-200 px-2 absolute bottom-2 left-2 ">
            <Hourglass size={17} className="" />
            <p className="border-l ml-1 pl-1 border-l-neutral-600 text-center py-1">
              {completeDate.getDay()}.{completeDate.getMonth() + 1}
            </p>
          </div>
        )}
      </div>
      <div className="p-2 border-t">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="p-1 pt-2">
          <p className="font-normal">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AssigmentCard;
