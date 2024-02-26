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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Paginator from "@/components/ui/paginator";
import PageHeader from "../../exercises/components/PageHeader";

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

  return (
    <div className="md:p-6 p-2 w-full">
      <Paginator
        links={[
          { display: "Učilnice", href: "/class" },
          { display: classData.className, href: "", current: true },
        ]}
      />
      <PageHeader
        title={classData.className}
        descritpion={classData.description}
        classname="my-4"
      />

      {classData && classData.classCreator === user?.username! && (
        <div className="flex flex-row items-center gap-4 pb-4">
          <Dialog>
            <DialogTrigger>
              <div className="bg-[#2B44E7] h-10 px-4 py-2 p-2 rounded-lg text-white ">
                <Share2 />
              </div>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-center w-3/4 md:w-full rounded-xl">
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <h2 className="text-6xl font-bold text-blue dark:blue">
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
      )}

      <div className="mt-6 font-semibold">
        <h2 className="text-2xl font-semibold mb-2">Naloge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {classData.assigments.map((assigment, index) => (
            <AssigmentCard
              key={index}
              time={classData.assigments[index].timeExpiration.toString()}
              isCompleted={
                classData.assigments[index].completedUsers !== null &&
                classData.assigments[index].completedUsers !== undefined
                  ? classData.assigments[index].completedUsers?.includes(
                      user?.username!
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
