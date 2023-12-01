'use client';
import TextEditor from '@/components/ui/text-editor';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import CodeEditor from '@/components/ui/code-editor';
import { Button } from '@/components/ui/button';
import { uploadCodeProblem } from '@/lib/code';
import Codetag from '@/components/ui/code';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type TestCase = {
  input: string;
  output: string;
};

const NewProblemPage = () => {
  const [problem, setProblem] = useState({
    description: '',
    problemID: '',
    timeCreated: new Date(),
    title: '',
    userCodeTemplate: `class Resitev {
  public:
    variableType functionName(...params) {

    }
}`,
    serverCodeTemplate: `#include <libraries>\n
int main() {
  // declare variables;
  // use a input method
  cin>> input;\n
  // or
  getline(cin, input);

  // declare program entry point
  Resitev solution;
  cout<<solution.clientFunctionName;
}
`,
    lang: 'cpp',
  });
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  function handleUploadProblem() {
    uploadCodeProblem(problem).then(() => {});
  }

  function handleSetProblemDescription(text: string) {
    setProblem({ ...problem, description: text });
  }

  function handleSetProblemCodeClient(code: string | undefined) {
    if (code !== undefined) {
      setProblem({ ...problem, userCodeTemplate: code });
    }
  }
  function handleSetProblemCodeServer(code: string | undefined) {
    if (code !== undefined) {
      setProblem({ ...problem, serverCodeTemplate: code });
    }
  }
  function handleSetProblemTitle(title: string) {
    setProblem({ ...problem, title: title });
  }

  function handleSetTestCaseInput(input: string, index: number) {
    const testCasesArray = [...testCases];
    testCasesArray[index] = {
      ...testCasesArray[index],
      input: input,
    };
    setTestCases(testCasesArray);
  }
  function handleSetTestCaseOutput(output: string, index: number) {
    const testCasesArray = [...testCases];
    testCasesArray[index] = {
      ...testCasesArray[index],
      output: output,
    };
    setTestCases(testCasesArray);
  }
  function incrementTestCases() {
    setTestCases([...testCases, { input: '', output: '' }]);
  }
  function decrementTestCases() {
    setTestCases(testCases.slice(0, -1));
  }

  return (
    <div>
      <div className="flex-row flex">
        <div className="w-1/2 p-4 space-y-4 h-full">
          <div className="flex flex-row space-x-4">
            <h1 className="text-4xl pb-4">Create a new problem</h1>
            <Button onClick={handleUploadProblem}>Create</Button>
          </div>
          <Label htmlFor="problemInput">
            Problem title:
            <Input
              value={problem.title}
              onValueChange={handleSetProblemTitle}
              id="problemInput"
            />
          </Label>

          <TextEditor
            editableClassName="bg-neutral-700 p-2 rounded-lg"
            setValue={handleSetProblemDescription}
          />
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/2">
          <Tabs defaultValue="client">
            <TabsList>
              <TabsTrigger value="client">User</TabsTrigger>
              <TabsTrigger value="server">Server</TabsTrigger>
              <TabsTrigger value="tests">Test cases</TabsTrigger>
            </TabsList>
            <TabsContent value="client">
              <CodeEditor
                defaultLanguage={problem.lang}
                defaultValue={'USER CODE TEMPLATE'}
                value={problem.userCodeTemplate}
                onChange={handleSetProblemCodeClient}
              />
            </TabsContent>
            <TabsContent value="server">
              <CodeEditor
                defaultLanguage={problem.lang}
                defaultValue={'SERVER CODE TEMPLATE'}
                value={problem.serverCodeTemplate}
                onChange={handleSetProblemCodeServer}
              />
            </TabsContent>
            <TabsContent value="tests" className="p-2">
              <h3 className="text-2xl">
                Now you will need some test cases for code validation.
              </h3>
              <p className="py-1 mt-3">
                A test case consists of an <Codetag>input</Codetag>,{' '}
                <Codetag>Expected output</Codetag> and{' '}
                <Codetag>actual output</Codetag>. Below is a code editor where
                you provide a solved code problem that will be used to generate
                test cases. It will be the same as the{' '}
                <Codetag>userCodeTemplate</Codetag>
              </p>
              <div className="space-x-2 p-2">
                <Button onClick={incrementTestCases}>Add test case</Button>
                <Button onClick={decrementTestCases}>Remove test case</Button>
              </div>
              <div className="space-y-4 p-2 overflow-scroll h-[70vh]">
                {testCases.map((testCase, index) => (
                  <Card className="w-1/2" key={index}>
                    <CardHeader>Test case {index + 1}</CardHeader>
                    <CardContent>
                      <Label>
                        Input:
                        <Input
                          value={testCases[index].input}
                          onValueChange={(value) =>
                            handleSetTestCaseInput(value, index)
                          }
                        />
                      </Label>
                      <Label>
                        Output:
                        <Input
                          value={testCases[index].output}
                          onValueChange={(value) =>
                            handleSetTestCaseOutput(value, index)
                          }
                        />
                      </Label>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NewProblemPage;
