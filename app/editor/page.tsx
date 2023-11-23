'use client';

import { Button } from '@/components/ui/button';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { uploadCode } from '@/lib/code';
import { Hourglass } from 'lucide-react';

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

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3">
          <div>
            <h1 className="text-center text-2xl p-2">Instructions</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              non saepe aperiam repudiandae placeat. Quia maiores, impedit iusto
              distinctio unde officia, incidunt quo, accusamus repudiandae illum
              velit quos dignissimos eligendi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              non saepe aperiam repudiandae placeat. Quia maiores, impedit iusto
              distinctio unde officia, incidunt quo, accusamus repudiandae illum
              velit quos dignissimos eligendi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              non saepe aperiam repudiandae <code>placeat</code>. Quia maiores,
              impedit iusto distinctio unde officia, incidunt quo, accusamus
              repudiandae illum velit quos dignissimos eligendi.
            </p>
          </div>
          <div className="flex flex-row items-center p-2 gap-4">
            <Button onClick={handleUploadCode}>
              {waiting ? <Hourglass size={20} strokeWidth={1.75} /> : 'Compile'}
            </Button>
            <Button onClick={() => {}}>AI Help</Button>
          </div>
          <div className="border">
            <h2 className="text-xl">Output: {APIResponse}</h2>
          </div>
        </div>
        <Editor
          height="90vh"
          width="66vw"
          className="w-2/3"
          defaultLanguage="C++"
          defaultValue={`#include <iostream>\nusing namespace std; \nint main() \n{ \n  cout<<"Hello";\n}`}
          onChange={onEditorChange}
        />
      </div>
    </div>
  );
}
