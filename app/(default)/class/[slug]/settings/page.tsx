"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ClassData, getClassData } from "@/lib/class";
import { AtSign, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Paginator from "@/components/ui/paginator";

const ClassSettingsPage = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState<ClassData>();

  const [newClassName, setNewClassName] = useState("");

  useEffect(() => {
    getClassData(params.slug).then((classData) => {
      if (classData) {
        setClassData(classData);
        setLoading(false);
      }
    });
  }, [params.slug]);

  return (
    <div className="p-2 w-full">
      <Paginator
        links={[
          { display: "Učilnice", href: "/class" },
          {
            display: `${classData?.className}`,
            href: `/class/${params.slug}`,
          },
          {
            display: "Nastavitve",
            href: "",
            current: true,
          },
        ]}
      />
      <h1 className="text-4xl font-semibold">Nastavitve učilnice</h1>
      <div className="mt-6 space-y-8">
        <div>
          <h2 className="text-xl font-bold pb-2">Udeleženci</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-[70px]" />
                ))
              : classData?.users.map((user, index) => (
                  <div
                    className="py-2 px-4 rounded-xl w-full bg-white dark:bg-black flex items-center flex-row justify-between"
                    key={index}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <User strokeWidth={2} size={24} />
                        <p className="capitalize font-bold">{user.username}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <AtSign strokeWidth={2} size={24} />
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="destructive">Odstrani</Button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSettingsPage;
