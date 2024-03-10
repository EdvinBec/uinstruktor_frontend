"use client";

import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/ui/code-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Paginator from "@/components/ui/paginator";
import { getTask, getTestCases, updateTask } from "@/lib/Services";
import { cm } from "@/lib/utils";
import { ApiResponse, EditorValue, Task, TestCase } from "@/types";
import React, { Suspense, useState } from "react";

const TaskEditPage = ({ params }: { params: { slug: string } }) => {
  const [task, setTask] = React.useState<Task>({} as Task);
  const [testCases, setTestCases] = React.useState<
    {
      input: string;
      output: string;
      deleted: boolean;
      id: number;
      new: boolean;
    }[]
  >([]);
  const [resp, setResp] = useState<ApiResponse<{}>>();

  React.useEffect(() => {
    getTask(params.slug).then((data) => {
      setTask(data);
    });

    getTestCases(params.slug).then((data) => {
      setTestCases(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const handleSaveTask = () => {
    updateTask(task, testCases, params.slug)
      .then((res) => {
        setResp(res);
      })
      .then(() => {
        setTimeout(() => {
          setResp(undefined);
        }, 5000);
      });
  };

  return (
    <Suspense
      fallback={<div className="text-3xl font-semibold">Loading...</div>}
    >
      <div className="max-w-7xl  min-w-[70%] h-full min-h-screen p-4 self-center flex-none">
        <Paginator
          links={[
            { display: "Naloga", href: `/task/${params.slug}` },
            {
              display: "Urejevalnik naloge " + params.slug,
              href: "",
              current: true,
            },
          ]}
        />
        <div className="space-y-16 mt-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-4">
              <div>
                <Label>
                  Ime naloge
                  <Input
                    value={task.title}
                    onValueChange={(value) => {
                      setTask({ ...task, title: value });
                    }}
                  />
                </Label>
              </div>
              <div>
                <Label>
                  Kratek opis naloge
                  <Input
                    value={task.description}
                    onValueChange={(value) => {
                      setTask({ ...task, description: value });
                    }}
                  />
                </Label>
              </div>
              <div>
                <Label>
                  Taglines(loceni z vejico brez presledkov)
                  <Input
                    value={task.taglines}
                    onValueChange={(value) => {
                      setTask({ ...task, taglines: value });
                    }}
                  />
                </Label>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center">
              {resp?.status === "success" ? (
                <p className="text-lg animate-fade-in text-green-500 font-semibold">
                  Uspesno shranjeno
                </p>
              ) : (
                resp && (
                  <p className="text-lg text-red-500 font-semibold">
                    Napaka pri shranjevanju
                  </p>
                )
              )}
              <Button onClick={handleSaveTask}>Shrani</Button>
            </div>
          </div>

          <div>
            {task.infoPage && (
              <TextEditor
                onChange={(value) => {
                  setTask({
                    ...task,
                    infoPage: {
                      ...task.infoPage,
                      description: JSON.stringify(value),
                    },
                  });
                }}
                value={JSON.parse(task.infoPage.description)}
              />
            )}
          </div>

          <div>
            <div className="flex flex-row items-center gap-4 my-4">
              <h2 className="text-xl font-semibold">Testi</h2>
              <Button
                onClick={() => {
                  setTestCases([
                    ...testCases,
                    {
                      input: "",
                      output: "",
                      deleted: false,
                      id: Math.floor(Math.random() * 2000),
                      new: true,
                    },
                  ]);
                }}
                size={"sm"}
              >
                Dodaj
              </Button>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {testCases.map((testCase, idx) => {
                return (
                  <div
                    className={cm(
                      "space-y-2 bg-white rounded-lg p-4 border ",
                      testCase.deleted
                        ? " border-red-500"
                        : "border-transparent"
                    )}
                    key={idx}
                  >
                    <div>
                      <Label>
                        Vhod
                        <Input
                          value={testCase.input}
                          onValueChange={(value) => {
                            const newTestCases = [...testCases];
                            newTestCases[idx].input = value;
                            setTestCases(newTestCases);
                          }}
                        />
                      </Label>
                    </div>
                    <div>
                      <Label>
                        Izhod
                        <Input
                          value={testCase.output}
                          onValueChange={(value) => {
                            const newTestCases = [...testCases];
                            newTestCases[idx].output = value;
                            setTestCases(newTestCases);
                          }}
                        />
                      </Label>
                    </div>
                    {testCase.deleted ? (
                      <Button
                        onClick={() => {
                          const newTestCases = [...testCases];
                          newTestCases[idx].deleted = false;
                          setTestCases(newTestCases);
                        }}
                      >
                        Obnovi
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          const newTestCases = [...testCases];
                          newTestCases[idx].deleted = true;
                          setTestCases(newTestCases);
                        }}
                        variant={"destructive"}
                      >
                        Izbrisi
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {task.infoPage && (
              <Label>
                Vnaprej vnesena koda (default code)
                <CodeEditor
                  defaultLanguage="cpp"
                  value={task.infoPage.exampleCode}
                  height="400px"
                  onChange={(code) => {
                    setTask({
                      ...task,
                      infoPage: {
                        ...task.infoPage,
                        exampleCode: code!,
                      },
                    });
                  }}
                />
              </Label>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default TaskEditPage;
