"use client";

import React from "react";
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

  const [error, setError] = useState<string>();

  const uploadCodeToServer = async () => {
    setIsLoading(true);
    uploadSandboxCode(code, "", "cpp")
      .then((res) => {
        if (res.status === "error") {
          setError(res.err);
          console.log(res.err);
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

  return (
    <>
      <div className="w-full h-[85vh] p-2">
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
              uploadCodeToServer={uploadCodeToServer}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default Sandbox;
