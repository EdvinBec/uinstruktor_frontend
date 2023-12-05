'use client';
import EditorPage from '@/components/ui/editor';
import { Assigment, getAssigmentData } from '@/lib/class';
import { TestCase } from '@/types';
import React, { useEffect, useState } from 'react';
import { uploadCode } from '@/lib/code';
import { fetchAIPrompt } from '@/lib/ai';
import CodeEditor from '@/components/ui/code-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hourglass } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
interface APICodeResponse {
  compile_status: boolean;
  id: string;
  message: string;
  result: {
    testCases: TestCase[];
  };
  status: string;
  err: string;
}

const AssigmentPage = ({ params }: { params: { id: string } }) => {
  const [assigment, setAssigment] = useState<Assigment>();
  const [code, setCode] = useState('');
  const [apiResponse, setApiResponse] = useState<APICodeResponse>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAssigmentData(params.id).then((data) => {
      setAssigment(data);
    });
  }, [params.id]);

  useEffect(() => {
    if (assigment?.codeTemplate !== undefined) {
      setCode(assigment?.codeTemplate);
    }
  }, [assigment]);

  function onEditorChange(code: string | undefined) {
    setCode(code as string);
  }

  function handleUploadCode() {
    setWaiting(true);
    uploadCode(code, params.id, assigment?.lang as string)
      .then(async (response) => {
        const result = await response.json();
        if (result.err) {
          setError(true);
        }
        if (result.compile_status) {
          setApiResponse(result);
        }
      })
      .finally(() => {
        setWaiting(false);
      });
  }

  function handleAIHelp() {
    //setWaiting(true);
    fetchAIPrompt(code)
      .then(async (response) => {
        const result = await response.json();
        setApiResponse(result.result.choices[0].message.content);
      })
      .finally(() => {
        //setWaiting(false);
      });
  }

  if (!assigment) {
    return <div>loading...</div>;
  }
  return (
    <div className="">
      <div className="flex flex-row">
        <Tabs defaultValue="details" className="w-1/2">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tests">Test cases</TabsTrigger>
          </TabsList>
          <div className="p-2 inline-flex">
            <Button onClick={handleUploadCode}>
              {waiting ? <Hourglass size={20} strokeWidth={1.75} /> : 'Compile'}
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
            <ScrollArea className="h-[60vh]">
              {!error
                ? apiResponse?.result.testCases.map((testCase, index) => (
                    <Card className="w-1/2" key={index}>
                      <CardHeader>
                        <CardTitle>Test case {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <span className="font-semibold">Input:</span>{' '}
                          {testCase.input}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Expected output:
                          </span>{' '}
                          {testCase.expectedOutput}
                        </p>
                        <p>
                          <span className="font-semibold">Actual output:</span>{' '}
                          {testCase.actualOutput}
                        </p>
                      </CardContent>
                      <CardFooter>
                        {testCase.matching ? (
                          <Badge variant={'passed'}>Passed</Badge>
                        ) : (
                          <Badge variant={'failed'}>Failed</Badge>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                : null}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="w-1/2 overflow-hidden">
          <CodeEditor
            defaultValue={assigment.codeTemplate}
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
