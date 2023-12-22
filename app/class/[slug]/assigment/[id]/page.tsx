"use client";
import { Assigment, getAssigmentData } from "@/lib/class";
import { ApiResponse, TestCase } from "@/types";
import React, { useEffect, useState } from "react";
import { uploadCode } from "@/lib/code";
import { fetchAIPrompt } from "@/lib/ai";
import CodeEditor from "@/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Hourglass } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TestCaseCard from "@/components/ProblemCard/TestCaseCard";
import useAuth from "@/hooks/useAuth";
interface APICodeResponse {
  compile_status: boolean;
  id: string;
  message: string;
  result: TestCase[];
  status: string;
  err: string;
}

const AssigmentPage = ({
  params,
}: {
  params: { id: string; slug: string };
}) => {
  const [assigment, setAssigment] = useState<Assigment>();
  const [code, setCode] = useState("");
  const [apiResponse, setApiResponse] = useState<APICodeResponse>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    getAssigmentData(params.id).then((data) => {
      setAssigment(data);
    });
  }, [params.id]);

  useEffect(() => {
    if (assigment?.template !== undefined) {
      setCode(assigment?.template);
    }
    const savedCode = fetchSavedCode();
    if (savedCode?.length !== 0) {
      setCode(savedCode as string);
    }

    function fetchSavedCode() {
      const data = localStorage.getItem(`code.${params.slug}/${params.id}`);
      if (data !== null) {
        return data;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assigment]);

  function onEditorChange(code: string | undefined) {
    setCode(code as string);
    if (code !== undefined) {
      localStorage.setItem(`code.${params.slug}/${params.id}`, code);
    }
  }
  function handleUploadCode() {
    setWaiting(true);
    uploadCode(
      code,
      params.id,
      assigment?.lang as string,
      params.slug,
      auth?.username!,
    )
      .then(async (response) => {
        const result = await response.json();
        if (result.err || result.status === "error") {
          setError(true);
          setApiResponse(result);
        }
        if (result.compile_status) {
          setApiResponse(result);
          setError(false);
        }
      })
      .finally(() => {
        setWaiting(false);
      });
  }

  /*   function handleAIHelp() {
    //setWaiting(true);
    fetchAIPrompt(code)
      .then(async (response) => {
        const result = await response.json();
        setApiResponse(result.result.choices[0].message.content);
      })
      .finally(() => {
        //setWaiting(false);
      });
  } */

  if (!assigment) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row">
        <Tabs defaultValue="details" className="w-1/2">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tests">Test cases</TabsTrigger>
          </TabsList>
          <div className="p-2 inline-flex">
            <Button onClick={handleUploadCode}>
              {waiting ? <Hourglass size={20} strokeWidth={1.75} /> : "Compile"}
            </Button>
          </div>
          <TabsContent value="details">
            <div>
              <h1 className="text-3xl">{assigment.title}</h1>
              <p
                className="p-2"
                dangerouslySetInnerHTML={{ __html: assigment?.description }}
              />
            </div>
          </TabsContent>
          <TabsContent value="tests">
            <ScrollArea className="h-full">
              {!error ? (
                apiResponse?.result.map((testCase, index) => (
                  <TestCaseCard
                    input={testCase.input}
                    index={index + 1}
                    passed={testCase.matching}
                    key={index}
                    output={testCase.expectedOutput}
                    actualOutput={testCase.actualOutput}
                  />
                ))
              ) : (
                <>
                  <p className="font-semibold text-red-500">
                    {apiResponse?.message}
                  </p>
                  <pre className=" auto-wrap">{apiResponse?.err}</pre>
                </>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="w-1/2 overflow-hidden">
          <CodeEditor
            defaultValue={assigment.template}
            value={code}
            onChange={onEditorChange}
            defaultLanguage={assigment.lang}
          />
        </div>
      </div>
    </div>
  );
};

export default AssigmentPage;
