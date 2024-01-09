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
import useAuth from "@/hooks/useAuth";

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value as string;
}

const AssigmentsPage = async ({ params }: { params: { slug: string } }) => {
  const user = await decryptAuthToken(getToken());
  const classData = await getClassData(params.slug);

  return (
    <div className="md:p-6 p-2 md:w-3/4 w-full">
      {classData && classData.classCreator === user?.username! ? (
        <div className="flex flex-row items-center gap-4 pb-4">
          <Dialog>
            <DialogTrigger>
              <Button className="block">
                <Share2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-center w-3/4 md:w-full rounded-xl">
              <DialogTitle>Class join code</DialogTitle>
              <DialogDescription>
                <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                  {classData.joinCode}
                </h2>
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <Link href={`/class/${params.slug}/assigment/new`}>
            <Button>
              <BookPlus />
            </Button>
          </Link>
          <Link href={`/class/${params.slug}/settings`}>
            <Button className="block">
              <Settings2 />
            </Button>
          </Link>
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
            <Link
              key={index}
              className=""
              href={`${params.slug}/assigment/${assigment.assigmentID}`}
            >
              <AssigmentCard
                key={index}
                time={classData.assigments[index].timeExpiration.toString()}
                isCompleted={
                  classData.assigments[index].completedUsers !== null ||
                  classData.assigments[index].completedUsers !== undefined
                    ? classData.assigments[index].completedUsers?.includes(
                        user?.username!,
                      )!
                    : false
                }
                title={assigment.title}
                description={assigment.shortDescription}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssigmentsPage;
