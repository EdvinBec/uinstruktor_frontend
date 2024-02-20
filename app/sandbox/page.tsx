"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  getSavedCode,
  getTask,
  saveCode,
  uploadCode,
  uploadSandboxCode,
} from "@/lib/Services";
import { ApiResponse, Task, TestCase } from "@/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Hourglass, Play, Save, X } from "lucide-react";
import { AIHelp } from "@/lib/ai";
import useAuth from "@/hooks/useAuth";
import TestCaseCard from "@/components/ProblemCard/TestCaseCard";
import { defaultCode } from "@/lib/constants";
import Modal from "@/components/Sandbox/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Sandbox = () => {
  const [code, setCode] = useState<string>(defaultCode);
  const [apiResponse, setApiResponse] = useState<{
    compileStatus: boolean;
    output: string;
    message: string;
    status: string;
    err?: string;
  }>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState<string>("");

  const uploadCodeToServer = async () => {
    setWaiting(true);
    setModalOpen(false);
    uploadSandboxCode(code, input, "cpp")
      .then((res) => {
        console.log(res);
        if (res.status === "error") {
          setError(true);
          console.log("erewr");
        }
        setApiResponse(res);
      })
      .finally(() => {
        setWaiting(false);
      })
      .catch((err) => {
        setError(true);
        setWaiting(false);
      });
  };

  return (
    <>
      <div className="w-full h-[85vh] p-2">
        <ResizablePanelGroup className="space-x-2" direction="horizontal">
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className="border-neutral-300 border p-2 rounded-lg"
          >
            <div className="p-4">
              <div className="flex flex-row items-center justify-between">
                <h1 className="font-semibold text-4xl">Output</h1>
                <Button
                  onClick={() => setModalOpen(true)}
                  className="text-xl"
                  size={"lg"}
                >
                  {waiting ? <Hourglass /> : <Play />}
                </Button>
              </div>
              <div className="mt-6">
                <div className="mt-6">
                  <Label>Error:</Label>
                  <pre className="font-code p-2 border rounded-lg">
                    {error ? apiResponse?.err : ""}
                  </pre>
                </div>
                <div className="mt-6 ">
                  <Label>Program Output: </Label>
                  <pre className="font-code p-2 border rounded-lg max-h-[400px] overflow-auto">
                    {apiResponse?.output}
                  </pre>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className="border-neutral-300 border p-2 rounded-lg"
          >
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p className="font-medium text-xl">Program input</p>
        <Input
          value={input}
          onValueChange={(value) => setInput(value)}
          type="text"
        />
        <div className="flex flex-row items-center gap-4 self-end">
          <Button className="" variant={"default"} onClick={uploadCodeToServer}>
            Run
          </Button>
          <Button
            className=""
            variant={"outline"}
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Sandbox;
