"use client";
import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient.jpg";
import { Badge } from "@/components/ui/badge";
import { Check, Hourglass, Settings } from "lucide-react";
import useAuth from "@/hooks/useAuth";

type Props = {
  title: string;
  description: string;
  isCompleted: boolean;
  time: string;
  classCreator: string;
};

const AssigmentCard = ({
  title,
  description,
  isCompleted,
  time,
  classCreator,
}: Props) => {
  const completeDate = new Date(time);
  const auth = useAuth();
  return (
    <div className=" w-full h-full rounded-xl border hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className=" shadow-inner relative">
        {auth?.username === classCreator && (
          <Settings
            size={20}
            className="absolute text-neutral-100 hover:text-neutral-700 transition-all  top-2 right-2"
          />
        )}
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
          <div className="rounded-full flex flex-row items-center justify-center bg-neutral-200 px-1 absolute bottom-2 left-2 ">
            <Hourglass size={17} className="" />
            <p className=" border-l-neutral-600 text-center">
              {completeDate.getDate()}. {completeDate.getMonth() + 1}.
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
