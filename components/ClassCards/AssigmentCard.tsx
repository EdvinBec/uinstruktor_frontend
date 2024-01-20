"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import Placeholder from "@/assets/img/gradient.jpg";
import Placeholder2 from "@/assets/img/bg.jpg";
import Placeholder3 from "@/assets/img/bg2.jpg";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Hourglass,
  MoreVertical,
  Settings,
  TimerOff,
  Trash,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cm } from "@/lib/utils";
import DatePicker from "../ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAssigment, updateAssigment } from "@/lib/class";

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
  const auth = useAuth();
  const rand = assigmentID.length + title.length + description.length;

  const [isFliped, setIsFliped] = useState(false);
  const [edited, setEdited] = useState<{ title: string; date: Date }>({
    date: new Date(time),
    title: title,
  });
  const [err, setErr] = useState({ error: false, message: "" });

  const handleUpdateAssigment = () => {
    updateAssigment(
      classID,
      assigmentID,
      edited.title,
      edited.date,
      auth?.token,
    ).then((res) => {
      if (res.error) {
        setErr({ error: true, message: res.message });
      } else {
        setIsFliped(!isFliped);
      }
    });
  };
  const handleDeleteAssigment = () => {
    deleteAssigment(classID, assigmentID, auth?.token).then((res) => {
      if (res.error) {
        setErr({ error: true, message: res.message });
      } else {
        setIsFliped(!isFliped);
      }
    });
  };

  return (
    <div
      className={cm(
        "size-full perspective rounded-xl border dark:border-neutral-700 hover:shadow-2xl shadow-lg transition-all duration-300",
        /* isFliped ? "animate-rotate-card" : "", */
      )}
    >
      {isFliped ? (
        <div className="p-4 flex animate-fade-in flex-col justify-between h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="self-end">
              <Dialog>
                <DialogTrigger>
                  <div className=" hover:text-red-500 transition-colors">
                    <Trash />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-neutral-100 dark:bg-neutral-900">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription className="leading-relaxed">
                      This action is irreversible. You will delete{" "}
                      <p>
                        <span className="p-1 bg-neutral-200/30 dark:bg-neutral-700/30 dark:border-neutral-500 my-2 border rounded-lg">
                          {title}
                        </span>{" "}
                        assigment
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={handleDeleteAssigment}
                      variant="destructive"
                      disabled
                    >
                      Delete
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <p>{err.message}</p>
            <Label>Assigment title</Label>
            <Input
              value={edited.title}
              onValueChange={(text) => {
                setEdited({ ...edited, title: text });
              }}
            />
            <Label>Date</Label>
            <DatePicker
              onChange={(date) => {
                setEdited({ ...edited, date: date! });
              }}
              date={edited.date}
            />
          </div>
          <div className="space-x-2 self-end">
            <Button
              variant={"destructive"}
              onClick={() => setIsFliped(!isFliped)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateAssigment} variant={"outline"}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="shadow-inner relative">
            {auth?.username === classCreator && (
              <MoreVertical
                onClick={() => setIsFliped(!isFliped)}
                size={20}
                className="absolute text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-400 transition-all  top-2 right-2"
              />
            )}
            <Image
              src={
                rand % 2 === 0
                  ? Placeholder
                  : rand > 80
                  ? Placeholder3
                  : Placeholder2
              }
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
              <>
                {new Date().getTime() > completeDate.getTime() ? (
                  <div className="rounded-full flex flex-row items-center justify-center bg-red-400 px-1 absolute bottom-2 left-2 ">
                    <TimerOff size={17} className="dark:text-neutral-800" />
                    <p className=" border-l-neutral-600 text-center dark:text-neutral-800">
                      {completeDate.getDate()}. {completeDate.getMonth() + 1}.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-full flex flex-row items-center justify-center bg-neutral-200 px-1 absolute bottom-2 left-2 ">
                    <Hourglass size={17} className="dark:text-neutral-800" />
                    <p className=" border-l-neutral-600 text-center dark:text-neutral-800">
                      {completeDate.getDate()}. {completeDate.getMonth() + 1}.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <Link href={`${classID}/assigment/${assigmentID}`}>
            <div className="p-2 border-t dark:border-t-neutral-700">
              <h2 className="text-2xl font-medium">{title}</h2>
              <div className="p-1 pt-2">
                <p className="font-normal">{description}</p>
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default AssigmentCard;
