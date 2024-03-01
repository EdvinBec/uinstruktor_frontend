"use client";
import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiResponse, EditorType, TestCase } from "@/types";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Loader, Play, Save } from "lucide-react";
import CustomButton from "./CustomButton";
import TaskDescription from "@/app/(wide)/task/components/TaskDescription";
import TaskBadges from "@/app/(wide)/task/components/TaskBadges";
import { Badge } from "./ui/badge";
import TestCaseCard from "./ProblemCard/TestCaseCard";
import OutputTab from "@/app/(wide)/sandbox/components/OutputTab";
import Editor from "./ui/code-editor";
import {
  saveCode,
  uploadCode,
  uploadExerciseCode,
  uploadSandboxCode,
} from "@/lib/Services";

type CodeEditorProps = {
  title: string;
  description: string;
  taglines: string;
  language: "cpp" | "python";
  type: EditorType;
  ID?: string;
};

const IDE = ({
  title,
  description,
  taglines,
  language,
  type,
  ID,
}: CodeEditorProps) => {
  const [code, setCode] = useState<string>("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [aiWaiting, setAiWaiting] = useState(false);
  const [tab, setTab] = useState<string>("description");
  const [help, setHelp] = useState("");
  const [apiResponse, setApiResponse] = useState<
    ApiResponse<{
      compileStatus: boolean;
      id: string;
      message: string;
      output?: TestCase[] | undefined;
      status: string;
    }>
  >();
  const [editorDidMount, setEditorDidMount] = useState(false);
  const [error, setError] = useState(false);

  const auth = useAuth();

  const handleSaveCode = (type: EditorType) => {
    switch (type) {
      case "task":
        if (code.length > 1) {
          try {
            saveCode(auth?.username!, code, ID!).then((data) => {});
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case "exercise":
        break;
      case "sandbox":
        break;
      case "assigment":
        break;
      default:
        break;
    }
  };

  const handleUploadCode = (type: EditorType) => {
    setIsWaiting(true);
    switch (type) {
      case "task":
        uploadCode(code, ID!, "cpp", auth?.username!)
          .then(async (response) => {
            const result = await response.json();
            if (result.err || result.status === "error") {
              setError(true);
              setApiResponse(result);
            }
            if (result.compileStatus) {
              setApiResponse(result);
              setError(false);
            }
          })
          .finally(() => {
            setIsWaiting(false);
            setTab("tests");
          })
          .catch(() => {
            setIsWaiting(false);
            setError(true);
          });
        break;
      case "exercise":
        uploadExerciseCode(code, ID!, "cpp")
          .then((res) => {
            if (res.status === "error") {
              setError(res.err);
              console.log(res.err);
            }
            setApiResponse(res);
          })
          .finally(() => {
            setIsWaiting(false);
          })
          .catch(() => {
            setIsWaiting(false);
          });
        break;
      case "sandbox":
        uploadSandboxCode(code, "", "cpp")
          .then((res) => {
            if (res.status === "error") {
              setError(res.err);
              console.log(res.err);
            }
            setApiResponse(res);
          })
          .finally(() => {
            setIsWaiting(false);
          })
          .catch(() => {
            setIsWaiting(false);
          });
        break;
      case "assigment":
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <ResizablePanelGroup className="space-x-2" direction="horizontal">
        <ResizablePanel
          minSize={30}
          className="border-gray-200 border-[1px] rounded-md"
        >
          <Editor
            value={code}
            onChange={(value) => {
              setCode(value!);
            }}
            setEditorDidMount={setEditorDidMount}
            defaultLanguage={language}
            defaultValue=""
            className="py-4 px-4 dark:bg-[#1c1b22]"
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          minSize={30}
          className="border-neutral-300 border p-2 rounded-lg"
        >
          <Tabs value={tab} onValueChange={(value) => setTab(value)}>
            <div className="p-2 flex justify-between gap-2">
              <div className="flex gap-4">
                <TabsList className="space-x-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>

                <Button
                  onClick={() => handleSaveCode(type)}
                  variant={"outline"}
                >
                  <Label className="flex gap-2 items-center text-xs font-bold">
                    Shrani
                    {isWaiting && <Loader size={18} className="animate-spin" />}
                    {!isWaiting && <Save size={22} />}
                  </Label>
                </Button>
                {apiResponse && (
                  <CustomButton
                    isLoading={aiWaiting}
                    onClick={() => {}}
                    label="Pomoč umetne inteligence"
                    icon={Play}
                  />
                )}
              </div>
              <CustomButton
                isLoading={isWaiting}
                onClick={() => handleUploadCode(type)}
                label="Zaženi"
                icon={Play}
              />
            </div>
            <TabsContent value="description" className="p-4">
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className={`flex gap-2`}>
                {taglines.split(",").map((item, index) => {
                  return (
                    <Badge
                      key={index}
                      variant={"outline"}
                      className="bg-[#2B44E7] capitalize border-none text-white tracking-wide font-medium"
                    >
                      {item}
                    </Badge>
                  );
                })}
              </div>
              <div className="mt-6 mr-2 pr-6">
                <p
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="tests" className="p-4">
              {apiResponse?.data?.compileStatus && (
                <h2 className="font-bold text-blue-500">
                  Compiled successfully
                </h2>
              )}
              <div className="mt-6 mr-2 pr-6">
                {apiResponse?.data?.compileStatus &&
                  apiResponse.data.output &&
                  apiResponse?.data?.output.map((testCase, index) => (
                    <TestCaseCard
                      input={testCase.input}
                      index={index + 1}
                      passed={testCase.matching}
                      key={index}
                      output={testCase.expectedOutput}
                      actualOutput={testCase.actualOutput}
                    />
                  ))}
              </div>
              {help && (
                <OutputTab
                  output={help}
                  height={200}
                  title="Pomoč umetne inteligence: "
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default IDE;
