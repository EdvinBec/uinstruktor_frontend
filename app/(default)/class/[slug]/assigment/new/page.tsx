"use client";
import React, { useState } from "react";
import TextEditor from "@/components/text-editor";
import { EditorValue, TestCase } from "@/types";
import Paginator from "@/components/ui/paginator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/date-picker";
import { uploadNewAssigment } from "@/lib/Services";

const NewAssigmentPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [editorValue, setEditorValue] = React.useState<EditorValue[]>([]);
  const [testCases, setTestCases] = React.useState<TestCase[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");

  const handleDateChange = (date: Date | undefined) => {
    setDate(date!);
  };

  const handleCreateAssigment = () => {
    uploadNewAssigment(
      JSON.stringify(editorValue),
      testCases,
      date,
      title,
      slug,
      "",
      "cpp",
    );
  };

  return (
    <div>
      <Paginator
        links={[
          { display: "Ucilnica", href: `/class/${slug}` },
          { display: "Nova zadolzitev", href: "", current: true },
        ]}
      />
      <div className="flex flex-row justify-between items-center my-8">
        <div className="">
          <h1 className="text-4xl font-bold">Nova naloga</h1>
          <p>Tukaj lahko dodate novo nalogo za ucence</p>
        </div>
        <div className="">
          <Button onClick={handleCreateAssigment}>Objavi</Button>
        </div>
      </div>
      <div className="flex flex-row gap-4 my-8">
        <div>
          <Label>
            Ime naloge
            <Input value={title} onValueChange={(value) => setTitle(value)} />
          </Label>
        </div>
        <div className="">
          <Label>
            Rok naloge
            <DatePicker onChange={handleDateChange} date={date} />
          </Label>
        </div>
      </div>
      <TextEditor
        onChange={(value) => {
          setEditorValue(value);
        }}
        value={editorValue}
      />
      <div className="my-8">
        <div className="space-x-4">
          <Button
            onClick={() => {
              setTestCases([
                ...testCases,
                {
                  input: "",
                  expectedOutput: "",
                  actualOutput: "",
                  matching: false,
                },
              ]);
            }}
          >
            Dodaj test
          </Button>
          <Button
            onClick={() => {
              setTestCases(testCases.slice(0, -1));
            }}
          >
            Odstrani test
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {testCases.map((testCase, index) => {
            return (
              <div className="bg-white rounded-sm p-4" key={index}>
                <h2 className="text-lg font-medium">
                  Testni primer {index + 1}
                </h2>
                <div className="space-y-2">
                  <Label>
                    Vhod
                    <Input
                      value={testCases[index].input}
                      onValueChange={(value) => {
                        const newTestCases = [...testCases];
                        newTestCases[index].input = value;
                        setTestCases(newTestCases);
                      }}
                    />
                  </Label>
                  <Label>
                    Izhod
                    <Input
                      value={testCases[index].expectedOutput}
                      onValueChange={(value) => {
                        const newTestCases = [...testCases];
                        newTestCases[index].expectedOutput = value;
                        setTestCases(newTestCases);
                      }}
                    />
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewAssigmentPage;
