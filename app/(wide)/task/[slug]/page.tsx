"use client";

import { useEffect, useState } from "react";
import {
  getAiHelp,
  getSavedCode,
  getTask,
  saveCode,
  uploadCode,
} from "@/lib/Services";
import { Task } from "@/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeHelp,
  Bug,
  Languages,
  Loader,
  MessageCircleIcon,
  Play,
  Save,
} from "lucide-react";
import { AIHelp } from "@/lib/ai";
import useAuth from "@/hooks/useAuth";
import TestCaseCard from "@/components/ProblemCard/TestCaseCard";
import TaskDescription from "../components/TaskDescription";
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/CustomButton";
import OutputTab from "../../sandbox/components/OutputTab";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ApiResponse = {
  compileStatus: boolean;
  id: string;
  message: string;
  output?: TestCase[];
  status: string;
  err: string;
};

type TestCase = {
  actualOutput: string;
  expectedOutput: string;
  input: string;
  matching: boolean;
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
  const [sheetOpen, setSheetOpen] = useState(false);

  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const [editorDidMount, setEditorDidMount] = useState(false);
  const [error, setError] = useState(false);

  const auth = useAuth();
  const router = useRouter();

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

  function handleUseAI(aiType: "bug" | "explain" | "tip") {
    setAiWaiting(true);
    setSheetOpen(false);
    getAiHelp(code, aiType, task.infoPage.description)
      .then((response) => {
        if (response.status === "success") {
          setHelp(response.data.message);
        }
      })
      .finally(() => {
        setAiWaiting(false);
        setTab("tests");
      });
  }

  if (isLoading) return <div className="w-full h-full p-2">Loading...</div>;

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Uporabi pomoč umetne inteligence</SheetTitle>
            <SheetDescription className="flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  handleUseAI("bug");
                }}
                className="py-6 text-black dark:text-white flex items-center justify-between font-bold"
              >
                <div className="flex gap-4">
                  <Bug size={20} />
                  Poišči napako
                </div>
                <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                className="py-6 text-black dark:text-white flex items-center justify-between font-bold"
                onClick={() => {
                  handleUseAI("explain");
                }}
              >
                <div className="flex gap-4">
                  <Languages size={20} />
                  Pojasni kodo
                </div>
                <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                className="py-6 text-black dark:text-white flex items-center justify-between font-bold"
                onClick={() => {
                  handleUseAI("tip");
                }}
              >
                <div className="flex gap-4">
                  <BadgeHelp size={20} />
                  Daj mi napotek
                </div>
                <ArrowRight size={20} />
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>

        <div className="w-full min-h-[85vh] h-full p-2">
          <div className="hidden md:block">
            <ResizablePanelGroup
              className="space-x-2 hidden md:block dark:bg-black bg-white"
              direction="horizontal"
            >
              <ResizablePanel className="border-gray-200 border-[1px] rounded-md">
                <CodeEditor
                  value={code}
                  onChange={(value) => {
                    setCode(value!);
                  }}
                  setEditorDidMount={setEditorDidMount}
                  defaultLanguage="cpp"
                  defaultValue={task.infoPage.exampleCode}
                  className="py-4 px-4 dark:bg-[#1c1b22]"
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel className="border-neutral-300 border p-2 rounded-lg">
                <Tabs value={tab} onValueChange={(value) => setTab(value)}>
                  <div className="p-2 flex justify-between gap-2">
                    <div className="flex gap-4">
                      <TabsList className="space-x-2 hidden md:block">
                        <TabsTrigger value="description">Naloga</TabsTrigger>
                        <TabsTrigger value="tests">Testiranje</TabsTrigger>
                      </TabsList>

                      <Button onClick={handleSaveCode} variant={"outline"}>
                        <Label className="flex gap-2 items-center text-xs font-bold">
                          Shrani
                          {isWaiting && (
                            <Loader size={18} className="animate-spin" />
                          )}
                          {!isWaiting && <Save size={22} />}
                        </Label>
                      </Button>

                      <CustomButton
                        onClick={() => {
                          setSheetOpen(true);
                        }}
                        label="Pomoč umetne inteligence"
                      />
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
                  <TabsContent value="tests" className="p-4 flex flex-col">
                    <div>
                      <OutputTab
                        output={apiResponse?.err!}
                        isError={error}
                        height={100}
                        title="Izhod: "
                      />
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
                          className="font-semibold text-sm"
                          output={help}
                          height={200}
                          title="Pomoč umetne inteligence: "
                        />
                      )}
                    </div>
                    {apiResponse?.output?.length !== 0 &&
                      apiResponse?.output?.every(
                        (item: TestCase) => item.matching,
                      ) && (
                        <CustomButton
                          className="mt-4"
                          label="Nadaljuj na naslednjo nalogo"
                          onClick={() => {
                            router.back();
                          }}
                        />
                      )}
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <div className="block md:hidden h-full">
            <ResizablePanelGroup
              className="space-y-2 h-full min-h-screen"
              direction="vertical"
            >
              <ResizablePanel className="border-neutral-300 border p-2 rounded-md h-1/2">
                <Tabs
                  className=" overflow-y-scroll"
                  value={tab}
                  onValueChange={(value) => setTab(value)}
                >
                  <div className="p-2 flex justify-between gap-2">
                    <div className="flex gap-4">
                      <TabsList className="space-x-2 hidden md:block">
                        <TabsTrigger value="description">Naloga</TabsTrigger>
                        <TabsTrigger value="tests">Testiranje</TabsTrigger>
                      </TabsList>

                      <Button onClick={handleSaveCode} variant={"outline"}>
                        <Label className="flex gap-2 items-center text-xs font-bold">
                          Shrani
                          {isWaiting && (
                            <Loader size={18} className="animate-spin" />
                          )}
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
                  <TabsContent value="tests" className="p-4 flex flex-col">
                    <div>
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
                    </div>
                    {apiResponse?.output?.map(
                      (item: TestCase, itemIdx: number) => {
                        let x = 0;
                        if (item.matching) {
                          x++;

                          if (x === apiResponse?.output?.length) {
                            return (
                              <CustomButton
                                key={itemIdx}
                                label="Nadaljuj na naslednjo nalogo"
                                onClick={() => {
                                  router.back();
                                }}
                              />
                            );
                          }
                        }
                      },
                    )}
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel className="border-gray-200 border-[1px] rounded-md ">
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
            </ResizablePanelGroup>
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default TaskPage;
