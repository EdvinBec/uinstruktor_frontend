'use client';
import TextEditor from '@/components/ui/text-editor';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import CodeEditor from '@/components/ui/code-editor';

const NewProblemPage = () => {
  const [problem, setProblem] = useState({
    description: '',
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
    lang: '',
  });

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
  
  return (
    <div>
      <div className="flex-row flex">
        <div className="w-1/2 p-4 space-y-4 h-full">
          <h1 className="text-4xl pb-4">Create a new problem</h1>
          <Label htmlFor="problemInput">
            Problem title:
            <Input
              value={problem.title}
              onValueChange={handleSetProblemTitle}
              id="problemInput"
            />
          </Label>
          <TextEditor setValue={handleSetProblemDescription} />
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/2">
          <Tabs defaultValue="client">
            <TabsList>
              <TabsTrigger value="client">User</TabsTrigger>
              <TabsTrigger value="server">Server</TabsTrigger>
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NewProblemPage;
