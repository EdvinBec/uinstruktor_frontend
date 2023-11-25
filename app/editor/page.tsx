'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { uploadCode } from '@/lib/code';
import { Hourglass } from 'lucide-react';
import { fetchAIPrompt } from '@/lib/ai';

const api = 'http://46.150.38.29:5000/api';

export default function EditorPage() {
  const [code, setCode] = useState('');
  const [APIResponse, setAPIResponse] = useState();
  const [waiting, setWaiting] = useState(false);

  function onEditorChange(code: string | undefined) {
    setCode(code as string);
  }

  function handleUploadCode() {
    setWaiting(true);
    uploadCode(code, 'C++')
      .then(async (response) => {
        const result = await response.json();
        console.log(result);
        if (result.compile_status) {
          setAPIResponse(result.result.output);
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
        console.log(result);
        setAPIResponse(result.result.choices[0].message.content);
      })
      .finally(() => {
        //setWaiting(false);
      });
  }

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3">
          <div>
            <h1 className="text-center text-2xl p-2">Instructions</h1>
            <div className="divide-y space-y-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                non saepe aperiam repudiandae placeat. Quia maiores, impedit
                iusto distinctio unde officia, incidunt quo, accusamus
                repudiandae illum velit quos dignissimos eligendi.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                non saepe aperiam repudiandae placeat. Quia maiores, impedit
                iusto distinctio unde officia, incidunt quo, accusamus
                repudiandae illum velit quos dignissimos eligendi.
              </p>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                non saepe aperiam repudiandae. Quia maiores, impedit iusto
                distinctio unde officia, incidunt quo, accusamus repudiandae
                illum velit quos dignissimos eligendi.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 gap-4">
            <Button onClick={handleUploadCode}>
              {waiting ? <Hourglass size={20} strokeWidth={1.75} /> : 'Compile'}
            </Button>
            <Button onClick={handleAIHelp}>AI Help</Button>
          </div>
          <div className="border">
            <h2 className="text-xl">
              Output: <span className="text-stone-700">{APIResponse}</span>
            </h2>
          </div>
        </div>
        <Editor
          options={{
            fontFamily: 'Fira Code',
            fontLigatures: true,
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoClosingComments: 'always',
          }}
          height="90vh"
          width="60%"
          className=""
          defaultLanguage="C++"
          defaultValue={`#include <iostream>\nusing namespace std; \nint main() \n{ \n  cout<<"Hello";\n}`}
          onChange={onEditorChange}
        />
      </div>
    </div>
  );
}
