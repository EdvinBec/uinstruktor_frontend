"use client";

import { useEffect, useState } from "react";
import { getSavedCode, getTask, saveCode, uploadCode } from "@/lib/Services";
import { Task, TestCase } from "@/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader, Play, Save } from "lucide-react";
import { AIHelp } from "@/lib/ai";
import useAuth from "@/hooks/useAuth";
import TestCaseCard from "@/components/ProblemCard/TestCaseCard";
import TaskDescription from "../components/TaskDescription";
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/CustomButton";
import OutputTab from "../../sandbox/components/OutputTab";

type ApiResponse = {
  compileStatus: boolean;
  id: string;
  message: string;
  output?: TestCase[];
  status: string;
};

const TaskPage = ({
  params,
}: {
  params: { slug: string; chapterID: string };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [aiWaiting, setAiWaiting] = useState(false);

  const [task, setTask] = useState<Task>({} as Task);
  const [code, setCode] = useState<string>("");
  const [tab, setTab] = useState<string>("description");
  const [help, setHelp] = useState("");

  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const [editorDidMount, setEditorDidMount] = useState(false);
  const [error, setError] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    getTask(params.slug)
      .then((data) => {
        setTask(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (editorDidMount) {
      getSavedCode(auth?.username!, params.slug).then((data) => {
        setCode(data.code);
      });
    }
  }, [auth?.username, params.slug, editorDidMount]);

  function handleUploadCode() {
    setIsWaiting(true);
    uploadCode(code, params.slug, "cpp", auth?.username!)
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
      });
  }

  function handleSaveCode() {
    setIsWaiting(true);
    if (code.length > 1) {
      try {
        saveCode(auth?.username!, code, params.slug).then((data) => {
          setIsWaiting(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleUseAI() {
    setAiWaiting(true);
    AIHelp(code, undefined, params.slug)
      .then((response) => {
        if (response.status === "success") {
          setHelp(response.data.choices[0].message.content);
        }
      })
      .finally(() => {
        setAiWaiting(false);
        setTab("tests");
      });
  }

  if (isLoading) return <div className="w-full h-full p-2">Loading...</div>;

  return (
    <div className="w-full h-[85vh] p-2">
      <ResizablePanelGroup className="space-x-2" direction="horizontal">
        <ResizablePanel className="border-gray-200 border-[1px] rounded-md">
          <CodeEditor
            value={code}
            onChange={(value) => {
              setCode(value!);
            }}
            setEditorDidMount={setEditorDidMount}
            defaultLanguage="cpp"
            defaultValue=""
            className="py-4 px-4 dark:bg-[#1c1b22]"
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="border-neutral-300 border p-2 rounded-lg">
          <Tabs value={tab} onValueChange={(value) => setTab(value)}>
            <div className="p-2 flex justify-between gap-2">
              <div className="flex gap-4">
                <TabsList className="space-x-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>

                <Button onClick={handleSaveCode} variant={"outline"}>
                  <Label className="flex gap-2 items-center text-xs font-bold">
                    Shrani
                    {isWaiting && <Loader size={18} className="animate-spin" />}
                    {!isWaiting && <Save size={22} />}
                  </Label>
                </Button>
                {apiResponse && (
                  <CustomButton
                    isLoading={aiWaiting}
                    onClick={handleUseAI}
                    label="Pomoč umetne inteligence"
                    icon={Play}
                  />
                )}
              </div>
              <CustomButton
                isLoading={isWaiting}
                onClick={handleUploadCode}
                label="Zaženi"
                icon={Play}
              />
            </div>
            <TabsContent value="description" className="p-4">
              <TaskDescription task={task} />
            </TabsContent>
            <TabsContent value="tests" className="p-4">
              {apiResponse?.compileStatus && (
                <h2 className="font-bold text-blue-500">
                  Compiled successfully
                </h2>
              )}
              <div className="mt-6 mr-2 pr-6">
                {apiResponse?.compileStatus &&
                  apiResponse.output &&
                  apiResponse?.output.map((testCase, index) => (
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

export default TaskPage;
