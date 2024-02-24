import { Class, getClasses } from "@/lib/class";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { cookies } from "next/headers";
import { decryptAuthToken } from "@/lib/auth";
import ClassCard from "@/components/ClassCards/ClassCard";
import { fetchClasses } from "@/lib/Services";
import { ClassT } from "@/types";

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value as string;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await decryptAuthToken(getToken())!;
  const classes = (await fetchClasses(user?.username!)) as ClassT[];

  return (
    <div className="p-4 w-full">
      <div className="flex flex-row space-x-2 items-center">
        <h1 className="text-4xl font-bold">Classes:</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {classes.map((subject, index) => (
          <Link key={index} className="" href={`/class/${subject.classID}`}>
            <ClassCard
              title={subject.className}
              description={subject.description}
              src={subject.src}
              progress={Number(subject.progress)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
