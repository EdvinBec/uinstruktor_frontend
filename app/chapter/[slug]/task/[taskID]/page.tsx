"use client";
import { useEffect, useState } from "react";
import { getSavedCode, getTask } from "@/lib/Services";
import { Task } from "@/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Hourglass, Save } from "lucide-react";
import { saveCode, uploadCode, uploadCodeTask } from "@/lib/code";
import { AIHelp } from "@/lib/ai";
import useAuth from "@/hooks/useAuth";

const TaskPage = ({
  params,
}: {
  params: { taskID: string; chapterID: string };
}) => {
  const [task, setTask] = useState<Task>({} as Task);
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const [tab, setTab] = useState<string>("description");
  const [help, setHelp] = useState("");
  const [aiWaiting, setAiWaiting] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    getTask(params.taskID)
      .then((data) => {
        setTask(data);
      })
      .finally(() => {
        setLoading(false);
      });

    getSavedCode(auth?.username!, params.taskID).then((data) => {
      setCode(data);
    });
  }, [auth?.username, params.taskID]);

  function handleUploadCode() {
    setWaiting(true);
    uploadCodeTask(code, params.taskID, "cpp", auth?.username!)
      .then(async (response) => {
        const result = await response.json();
        if (result.err || result.status === "error") {
          setError(true);

          setApiResponse(result);
        }
        if (result.compileStatus) {
          setApiResponse(result);
          console.log(result);
          setError(false);
        }
      })
      .finally(() => {
        setWaiting(false);
        setTab("tests");
      });
  }

  function handleSaveCode() {
    if (code.length > 1) {
      saveCode(auth?.username!, params.taskID, code).then((data) => {
        console.log(data.json);
      });
    }
  }

  function handleUseAI() {
    setAiWaiting(true);
    AIHelp(code, undefined, params.taskID)
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

  if (loading) return <div className="w-full h-full p-2">Loading...</div>;

  return (
    <div className="w-full h-screen p-2">
      <ResizablePanelGroup className="space-x-2" direction="horizontal">
        <ResizablePanel className="border-neutral-300 border p-2 rounded-lg">
          <Tabs value={tab} onValueChange={(value) => setTab(value)}>
            <TabsList className="space-x-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
            </TabsList>
            <div className="p-2 inline-flex gap-2">
              <Button onClick={handleUploadCode}>
                {waiting ? (
                  <Hourglass size={20} strokeWidth={1.75} />
                ) : (
                  "Compile"
                )}
              </Button>
              {apiResponse && (
                <Button onClick={handleUseAI} variant={"outline"}>
                  {aiWaiting ? (
                    <Hourglass size={20} strokeWidth={1.75} />
                  ) : (
                    <> Use AI</>
                  )}
                </Button>
              )}
              <Button onClick={handleSaveCode} variant={"outline"}>
                <Save />
              </Button>
            </div>
            <TabsContent value="description" className="p-4">
              <h1 className="text-3xl font-bold">{task.title}</h1>
              <div className="space-x-2 py-2">
                {task?.taglines.split(",").map((tagline, index) => {
                  return (
                    <Badge key={index} className="" variant={"outline"}>
                      {tagline}
                    </Badge>
                  );
                })}
              </div>

              <div className="mt-6 mr-2 pr-6">
                <p>{task?.infoPage?.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="tests" className="p-4">
              <div className="mt-6 mr-2 pr-6"></div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="border-neutral-300 border p-2 rounded-lg">
          <CodeEditor
            value={code}
            onChange={(value) => {
              setCode(value!);
            }}
            defaultLanguage="cpp"
            defaultValue=""
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TaskPage;
