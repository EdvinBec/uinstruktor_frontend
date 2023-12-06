'use client';
import {
  fetchProblem,
  uploadCodeProblem,
  uploadCodeProblemCode,
} from '@/lib/code';
import {
  ApiResponseCompiler,
  ApiResponseData,
  ApiResponseError,
  CodeProblem,
} from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Hourglass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CodeEditor from '@/components/ui/code-editor';

const ProblemPage = ({ params }: { params: { slug: string } }) => {
  const theme = useTheme();
  const [problem, setProblem] = useState<CodeProblem>();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponseCompiler>();
  const [selectedTab, setSelectedTab] = useState('details');

  useEffect(() => {
    fetchProblem(params.slug).then((response) => {
      setProblem(response);
    });
    const savedCode = fetchSavedCode();
    if (savedCode?.length !== 0) {
      setCode(savedCode as string);
    }

    function fetchSavedCode() {
      const data = localStorage.getItem(`code.${params.slug}`);
      if (data !== null) {
        return data;
      }
    }
  }, [params.slug]);

  function onEditorChange(code: string | undefined) {
    setCode(code as string);
    if (code !== undefined) {
      localStorage.setItem(`code.${params.slug}`, code);
    }
  }

  function handleUploadCode() {
    setWaiting(true);
    uploadCodeProblemCode(code, params.slug, problem?.lang as string)
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
        setSelectedTab('testCases');
        setWaiting(false);
      });
  }

  if (loading || !problem) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-row">
      <Tabs defaultValue="details" value={selectedTab} className="w-1/2">
        <TabsList>
          <TabsTrigger
            color="red"
            value="details"
            onClick={() => setSelectedTab('details')}
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="testCases"
            onClick={() => setSelectedTab('testCases')}
          >
            Tests
          </TabsTrigger>
          <TabsTrigger onClick={() => setSelectedTab('output')} value="output">
            Output
          </TabsTrigger>
        </TabsList>
        <div className="p-2 inline-flex">
          <Button onClick={handleUploadCode}>
            {waiting ? <Hourglass size={20} strokeWidth={1.75} /> : 'Compile'}
          </Button>
        </div>
        <TabsContent value="details">
          <div className="p-2">
            <h1 className="text-4xl">{problem?.title}</h1>
            <div
              className="p-2"
              dangerouslySetInnerHTML={{ __html: problem?.description }}
            />
          </div>
        </TabsContent>
        <TabsContent value="testCases">
          <div className="p-2">
            <h2 className="text-3xl">Test cases:</h2>
            <div className="space-y-4">
              {!error &&
                apiResponse?.result.testCases.map((testCase, index) => (
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
                        <span className="font-semibold">Expected output:</span>{' '}
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
                ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="output">
          <div className="p-2">
            <h2 className="text-3xl">Output:</h2>
            {/*  <p>{error ? apiResponse?.err.toString() : ''}</p> */}
          </div>
        </TabsContent>
      </Tabs>
      <div className="w-1/2">
        <CodeEditor
          value={code}
          onChange={onEditorChange}
          height="100vh"
          width="100%"
          defaultValue={problem.userCodeTemplate}
          defaultLanguage="cpp"
        />
      </div>
    </div>
  );
};

export default ProblemPage;