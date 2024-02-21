import AssigmentCard from "@/components/ClassCards/AssigmentCard";
import { Button } from "@/components/ui/button";
import { decryptAuthToken } from "@/lib/auth";
import { getClassData } from "@/lib/class";
import { BookPlus, Settings2, Share2 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cm } from "@/lib/utils";

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value as string;
}

const AssigmentsPage = async ({ params }: { params: { slug: string } }) => {
  const user = await decryptAuthToken(getToken());
  const classData = await getClassData(params.slug);
  let completedCount = 0;

  classData.assigments.forEach((assigment) => {
    if (assigment.completedUsers?.includes(user?.username!)) {
      completedCount++;
    }
  });
  console.log((completedCount / classData.assigments.length) * 100);
  return (
    <div className="md:p-6 p-2 w-full">
      <div className="pb-2">
        <div className="flex flex-row justify-between">
          <h3 className="text-2xl  font-medium">Class progress</h3>
          <h3 className="text-2xl  font-medium">
            {(completedCount / classData.assigments.length) * 100}%
          </h3>
        </div>
        <div className=" flex flex-row">
          <div
            style={{
              width: `${(completedCount / classData.assigments.length) * 100}%`,
            }}
            className="h-2 rounded-l-lg bg-green-400"
          ></div>
          <div
            style={{
              width: `${
                100 - (completedCount / classData.assigments.length) * 100
              }%`,
            }}
            className={cm(
              "h-2 rounded-r-lg bg-gray-400",
              completedCount === 0 ? "rounded-lg" : "",
            )}
          ></div>
        </div>
      </div>
      {classData && classData.classCreator === user?.username! ? (
        <div className="flex flex-row items-center gap-4 pb-4">
          <Dialog>
            <DialogTrigger>
              <div className="bg-neutral-900 h-10 px-4 py-2 p-2 rounded-lg text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90">
                <Share2 />
              </div>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-center w-3/4 md:w-full rounded-xl">
              <DialogTitle>Class join code</DialogTitle>
              <DialogDescription>
                <h2 className="text-5xl font-bold text-indigo-700 dark:text-indigo-400">
                  {classData.joinCode}
                </h2>
              </DialogDescription>
            </DialogContent>
          </Dialog>

          <Button>
            <Link href={`/class/${params.slug}/assigment/new`}>
              <BookPlus />
            </Link>
          </Button>

          <Button className="block">
            <Link href={`/class/${params.slug}/settings`}></Link>
            <Settings2 />
          </Button>
        </div>
      ) : (
        ""
      )}
      <h1 className="text-4xl font-bold pb-2">{classData.className}</h1>
      <div className="pb-4">
        <p>{classData.description}</p>
      </div>

      <div className="mt-6 font-semibold">
        <h2 className="text-3xl pb-2">Assigments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4">
          {classData.assigments.map((assigment, index) => (
            <AssigmentCard
              key={index}
              time={classData.assigments[index].timeExpiration.toString()}
              isCompleted={
                classData.assigments[index].completedUsers !== null &&
                classData.assigments[index].completedUsers !== undefined
                  ? classData.assigments[index].completedUsers?.includes(
                      user?.username!,
                    )!
                  : false
              }
              title={assigment.title}
              description={assigment.shortDescription}
              classCreator={classData.classCreator}
              classID={params.slug}
              assigmentID={assigment.assigmentID}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssigmentsPage;
