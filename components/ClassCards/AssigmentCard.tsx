"use client";
import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient.jpg";
import Placeholder2 from "@/assets/img/bg.jpg";
import Placeholder3 from "@/assets/img/bg2.jpg";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Hourglass, TimerOff } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { cm } from "@/lib/utils";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  isCompleted: boolean;
  time: string;
  classCreator: string;
  classID: string;
  assigmentID: string;
};

const AssigmentCard = ({
  title,
  description,
  isCompleted,
  time,
  classCreator,
  classID,
  assigmentID,
}: Props) => {
  const completeDate = new Date(time);
  const rand = Math.floor(Math.random() * 100);

  return (
    <div
      className={cm(
        "size-full perspective rounded-md border dark:border-neutral-700 hover:shadow-2xl shadow-lg transition-all duration-300"
      )}
    >
      <div className="shadow-inner relative">
        <Image
          src={
            rand % 2 === 0
              ? Placeholder
              : rand > 80
              ? Placeholder3
              : Placeholder2
          }
          className="rounded-t-md max-h-[150px]  object-cover"
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
          <>
            {new Date().getTime() > completeDate.getTime() ? (
              <div className="rounded-full flex gap-1 items-center justify-center bg-red-400 px-2 py-1 absolute bottom-2 left-2 ">
                <TimerOff
                  size={16}
                  strokeWidth={1.5}
                  className="dark:text-neutral-800"
                />
                <p className=" border-l-neutral-600 text-center dark:text-neutral-800">
                  {completeDate.getDate()}. {completeDate.getMonth() + 1}.
                </p>
              </div>
            ) : (
              <div className="rounded-full flex gap-1 items-center justify-center bg-neutral-200 px-2 py-1 absolute bottom-2 left-2 ">
                <Hourglass
                  size={16}
                  strokeWidth={1.5}
                  className="dark:text-neutral-800"
                />
                <p className=" border-l-neutral-600 text-center dark:text-neutral-800">
                  {completeDate.getDate()}. {completeDate.getMonth() + 1}.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-4 border-t dark:border-t-neutral-700 flex items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="pt-2">
            <p className="font-normal text-neutral-600">{description}</p>
          </div>
        </div>
        <Button>
          <Link href={`/assigment/${assigmentID}`}>
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AssigmentCard;
