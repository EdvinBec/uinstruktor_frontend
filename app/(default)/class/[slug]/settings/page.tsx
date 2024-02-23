"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ClassData, getClassData } from "@/lib/class";
import { AtSign, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="p-6 w-full min-h-[85vh] md:w-3/4">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <div className="mt-6 space-y-8">
        <div className="flex flex-row">
          <form className="w-1/3">
            <div className="flex flex-col gap-4">
              <Label>Change the classname</Label>
              <Input onValueChange={setNewClassName} value={newClassName} />
              <Button type="submit">Change</Button>
            </div>
          </form>
          <div className="w-1/3 flex flex-col items-center  justify-evenly">
            <h3 className="text-2xl text-center">Classroom join code</h3>
            <p className="text-center p-2 bg-neutral-200/90 border-neutral-300 border mx-auto w-1/2 rounded-lg">
              {classData?.joinCode}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl border-b pb-2">Students</h2>
          <div className="space-y-2 py-2">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-1/2 h-[68px]" />
                ))
              : classData?.users.map((user, index) => (
                  <div
                    className="p-2 border rounded-xl w-1/2 shadow-inner flex items-center flex-row justify-between"
                    key={index}
                  >
                    <div>
                      <div className="">
                        <User className="inline mr-2" />
                        <p className="inline">{user.username}</p>
                      </div>
                      <div className="">
                        <AtSign className="inline mr-2" />
                        <p className="inline">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="destructive">Kick</Button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl text-red-500 border-b-red-500/80 border-b pb-2">
            Danger zone
          </h2>
          <div className="py-2 space-x-2">
            <Button variant="destructive">Delete classroom</Button>
            <Button variant="destructive">Disable classroom</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSettingsPage;
