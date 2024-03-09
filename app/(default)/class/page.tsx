import React from "react";

import Link from "next/link";
import { cookies } from "next/headers";
import { decryptAuthToken } from "@/lib/auth";
import ClassCard from "@/components/ClassCards/ClassCard";
import { fetchClasses } from "@/lib/Services";
import { ClassT } from "@/types";
import PageHeader from "../exercises/components/PageHeader";
import { Button } from "@/components/ui/button";

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value as string;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await decryptAuthToken(getToken())!;
  const classes = (await fetchClasses(user?.username!)) as ClassT[];

  return (
    <div className="w-full mt-8">
      <PageHeader
        title="Učilnice"
        descritpion="Tukaj lahko vidite seznam učilnic, v katere ste se prijavili. Na tem mestu so zbrane informacije o vseh predavanjih, delavnicah, katerih član ste."
      />
      {user?.permissions.isTeacher && (
        <div className="mt-4 flex flex-row items-center p-2 w-max bg-white dark:bg-black rounded-md">
          <h3 className="text-xl font-medium">
            Želiš ustvariti novo učilnico?
          </h3>
          <Link href={"/class/new"}>
            <Button size={"lg"} variant={"link"}>
              Ustvari učilnico
            </Button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
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
