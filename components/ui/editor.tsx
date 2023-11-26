'use client';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { uploadCode } from '@/lib/code';
import { Hourglass } from 'lucide-react';
import { fetchAIPrompt } from '@/lib/ai';
import { Assigment, getAssigmentData } from '@/lib/class';
import { useTheme } from 'next-themes';

type TestCase = {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  matching: boolean;
};

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

export default function EditorPage({ assigmentID }: { assigmentID: string }) {
  const { theme } = useTheme();
  const [assigment, setAssigment] = useState<Assigment>();
  const [code, setCode] = useState('');
  const [APIResponse, setAPIResponse] = useState<APICodeResponse>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    getAssigmentData(assigmentID).then((data) => {
      setAssigment(data);
    });
  }, [assigmentID]);

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
    uploadCode(code, assigmentID, assigment?.lang as string)
      .then(async (response) => {
        const result = await response.json();
        if (result.err) {
          setError(true);
        }
        if (result.compile_status) {
          setAPIResponse(result);
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
        setAPIResponse(result.result.choices[0].message.content);
      })
      .finally(() => {
        //setWaiting(false);
      });
  }
  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3 p-2">
          <div>
            <h1 className="text-center text-2xl p-2">Instructions</h1>
            <div className="divide-y space-y-2">
              <p>{`${assigment?.description}`}</p>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 gap-4">
            <Button onClick={handleUploadCode}>
              {waiting ? <Hourglass size={20} strokeWidth={1.75} /> : 'Compile'}
            </Button>
            <Button disabled onClick={handleAIHelp}>
              AI Help
            </Button>
          </div>
          <div className="p-2 overflow-scroll h-[80vh]">
            {APIResponse !== undefined ? (
              <>
                <h2 className="text-xl">Output: </h2>
                <>
                  {!error ? (
                    APIResponse.result.testCases.map((testCase, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>Test case {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Input: {testCase.input}</p>
                          <p>Expected output: {testCase.expectedOutput}</p>
                          <p>Actual output: {testCase.actualOutput}</p>
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
                  ) : (
                    <p>{APIResponse.err}</p>
                  )}
                </>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <Editor
          options={{
            fontFamily: 'Fira Code',
            fontLigatures: true,
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoClosingComments: 'always',
            theme: theme === 'light' ? 'vs' : 'vs-dark',
          }}
          height="90vh"
          width="60%"
          className=""
          defaultLanguage="C++"
          defaultValue={assigment?.codeTemplate}
          value={code}
          onChange={onEditorChange}
        />
      </div>
    </div>
  );
}
