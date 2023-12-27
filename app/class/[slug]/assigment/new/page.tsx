"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/ui/text-editor";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { publishAssigment } from "@/lib/class";
import useAuth from "@/hooks/useAuth";

type Assigment = {
  title: string;
  description: string;
  shortDescription: string;
  timeCreated: Date;
  timeExpiration: Date;
  classID: string;
  lang: string;
};

const NewAssigmentPage = ({ params }: { params: { slug: string } }) => {
  const user = useAuth();
  const [newAssigment, setNewAssigment] = useState<Assigment>({
    title: "",
    description: "",
    shortDescription: "",
    timeCreated: new Date(),
    timeExpiration: new Date(),
    classID: params.slug,
    lang: "",
  });

  function handleAssigmentTitle(value: string) {
    setNewAssigment({ ...newAssigment, title: value });
  }
  function handleAssigmentDescription(value: string) {
    setNewAssigment({ ...newAssigment, description: value });
  }
  function handleAssigmentLanguage(lang: string) {
    setNewAssigment({ ...newAssigment, lang: lang });
  }
  function handleAssigmentDate(date?: Date) {
    setNewAssigment({ ...newAssigment, timeExpiration: date! });
  }

  function handlePublishAssigment() {}

  return (
    <div className="md:w-1/2">
      <div>
        <div>
          <h1 className="text-3xl font-bold">New assigment</h1>
        </div>
      </div>
      <div className="mt-8 space-y-6">
        <div>
          <Label>Assigment Title</Label>
          <Input
            value={newAssigment.title}
            onValueChange={handleAssigmentTitle}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Select onValueChange={handleAssigmentLanguage} defaultValue="cpp">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a language..." />
            </SelectTrigger>
            <SelectContent className="bg-neutral-100 dark:bg-neutral-700">
              <SelectGroup>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DatePicker
            date={newAssigment.timeExpiration}
            onChange={handleAssigmentDate}
          />
        </div>
        <TextEditor
          className="min-h-[300px]"
          editableClassName="min-h-full"
          setValue={handleAssigmentDescription}
        />
        <div className="flex flex-row gap-4 items-center justify-end">
          <Button variant={"destructive"}>Discard</Button>
          <Button onClick={() => publishAssigment(newAssigment, user?.token)}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewAssigmentPage;
