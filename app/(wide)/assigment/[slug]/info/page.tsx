import { Button } from "@/components/ui/button";
import Paginator from "@/components/ui/paginator";
import { getAssigmentInfo } from "@/lib/Services";
import { Assigment, getAssigmentData, getClassData } from "@/lib/class";
import { ArrowRight, CheckCircle2, User, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const AssigmentInfo = async ({ params }: { params: { slug: string } }) => {
  const classInfo = (await getAssigmentData(params.slug)) as {
    classID: string;
  };
  const assigments: {
    username: string;
    completed: boolean;
    solution: string | null;
    timestamp: Date | null;
  }[] = await getAssigmentInfo(params.slug);

  return (
    <Suspense
      fallback={
        <div>
          <h1>Loading...</h1>
        </div>
      }
    >
      <Paginator
        links={[
          { display: "Učilnica", href: `/class/${classInfo.classID}` },
          {
            display: "Podrobnosti naloge",
            href: "",
            current: true,
          },
        ]}
      />
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Podatki o nalogi</h1>
          <p>
            Tukaj se nahajajo podatki o nalogi. Seznam učencev in njihovih
            rešitev.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Učenci</h2>
          <div className="flex flex-col gap-4">
            {assigments?.map((user, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 bg-white dark:bg-black p-4 rounded-lg shadow-md"
                >
                  <div className="flex flex-row items-center gap-4">
                    <div className="">
                      {user.completed ? (
                        <CheckCircle2 color="green" />
                      ) : (
                        <XCircle color="red" />
                      )}
                    </div>
                    <User />
                    <p className="font-medium">{user.username}</p>
                  </div>
                  <div>
                    <Link
                      href={`/assigment/${params.slug}/info/${user.username}`}
                    >
                      <Button variant={"outline"}>Podrobnosti</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AssigmentInfo;
