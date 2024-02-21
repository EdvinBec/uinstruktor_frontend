"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/ui/text-editor";
import React, { useEffect, useState } from "react";
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
import Codetag from "@/components/ui/code";
import Testcase from "@/components/ui/testcase";
import { toast } from "sonner";

type Assigment = {
  title: string;
  description: string;
  shortDescription: string;
  timeCreated: Date;
  timeExpiration: Date;
  classID: string;
  lang: string;
};
type TestCase = {
  input: string;
  output: string;
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
  const [testCases, setTestCases] = useState<TestCase[]>([]);

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

  function incrementTestCases() {
    setTestCases([...testCases, { input: "", output: "" }]);
  }
  function decrementTestCases() {
    setTestCases(testCases.slice(0, testCases.length - 1));
  }

  function handlePublishAssigment() {
    publishAssigment(newAssigment, testCases, user?.token).then((res) => {
      console.log(res);
      if (res.status === "success") {
        toast.success("Assigment published.");
      } else {
        toast.error("Error publishing assigment.");
      }
    });
  }

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
          className="mb-4"
          editableClassName="min-h-full h-[200px] p-2 rounded-lg"
          setValue={handleAssigmentDescription}
        />
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Test cases</h2>
          <p>
            For problem validation you need to create some testcases. A test
            case consists of an <Codetag>input</Codetag>, and{" "}
            <Codetag>output</Codetag>. The <Codetag>input</Codetag> is read by
            the program and then the <Codetag>output</Codetag> is used to
            determined if the program is correct or not.
          </p>
          <div className="space-x-4 py-2">
            <Button onClick={incrementTestCases}>+</Button>
            <Button onClick={decrementTestCases}>-</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testCases.map((testCase, index) => (
              <Testcase
                setTestCases={setTestCases}
                key={index}
                index={index}
                value={testCase}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end">
          <Button variant={"destructive"}>Discard</Button>
          <Button onClick={handlePublishAssigment}>Publish</Button>
        </div>
      </div>
    </div>
  );
};

export default NewAssigmentPage;
