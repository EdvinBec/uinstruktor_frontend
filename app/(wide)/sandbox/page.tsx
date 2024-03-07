"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { uploadSandboxCode } from "@/lib/Services";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@/components/ui/code-editor";
import { defaultCode } from "@/lib/constants";
import OutputWindow from "./components/OutputWindow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ApiResponse = {
  compileStatus: boolean;
  output: string;
  message: string;
  status: string;
  err?: string;
};

const Sandbox = () => {
  const [code, setCode] = useState<string>(defaultCode);
  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [userInput, setUserInput] = useState<string>("");

  const handleUploadCode = () => {
    setDialogOpen(true);
  };

  const uploadCodeToServer = async () => {
    localStorage.setItem("sandbox-code", code);
    setDialogOpen(false);
    setIsLoading(true);
    uploadSandboxCode(code, userInput, "cpp")
      .then((res) => {
        if (res.status === "error") {
          setError(res.err);
          console.log(res.err);
        } else {
          setError("");
        }
        setApiResponse(res);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const savedLocalCode = localStorage.getItem("sandbox-code");
    if (savedLocalCode) {
      setCode(savedLocalCode);
    }
  }, []);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle>Vpis vrednosti</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>
                Vpisi vhodne spremenljivke. Loci jih z presledkom.{" "}
                {"(npr.: 2 6 2 333 123)"}. Pusti prazno ce jih nerabis.
              </p>
              <Input
                value={userInput}
                onValueChange={(value) => {
                  setUserInput(value);
                }}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={uploadCodeToServer}>Zazeni</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="w-full h-[85vh] p-2">
        <div className="hidden md:block">
          <ResizablePanelGroup className="space-x-2" direction="horizontal">
            <ResizablePanel
              defaultSize={50}
              minSize={30}
              className="border-[1px] border-gray-200 dark:border-0 rounded-md"
            >
              <CodeEditor
                value={code}
                onChange={(value) => {
                  setCode(value!);
                }}
                defaultLanguage="cpp"
                className="py-4 dark:bg-[#1c1b22]"
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={50}
              minSize={30}
              className="border-gray-200 dark:border-0 border-[1px] p-2 rounded-md"
            >
              <OutputWindow
                isLoading={isLoading}
                error={error!}
                output={apiResponse?.output!}
                uploadCodeToServer={handleUploadCode}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="block md:hidden h-full">
          <ResizablePanelGroup
            className="space-x-2 h-full"
            direction="vertical"
          >
            <ResizablePanel
              defaultSize={50}
              minSize={30}
              className="border-[1px] border-gray-200 dark:border-0 rounded-md"
            >
              <CodeEditor
                value={code}
                onChange={(value) => {
                  setCode(value!);
                }}
                defaultLanguage="cpp"
                className="py-4 dark:bg-[#1c1b22]"
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={50}
              minSize={30}
              className="border-gray-200 dark:border-0 border-[1px] p-2 rounded-md"
            >
              <OutputWindow
                isLoading={isLoading}
                error={error!}
                output={apiResponse?.output!}
                uploadCodeToServer={uploadCodeToServer}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};

export default Sandbox;
