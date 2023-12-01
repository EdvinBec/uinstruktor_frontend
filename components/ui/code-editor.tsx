import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import React from 'react';

type CodeEditorProps = {
  defaultValue: string;
  defaultLanguage: string;
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
  width?: string;
  className?: string;
};

const CodeEditor = ({
  defaultValue,
  defaultLanguage,
  value,
  onChange,
  height,
  width,
  className,
}: CodeEditorProps) => {
  const { theme } = useTheme();
  return (
    <div>
      <Editor
        options={{
          fontFamily: 'Fira Code',
          fontLigatures: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoClosingComments: 'always',
          theme: theme === 'light' ? 'vs' : 'vs-dark',
        }}
        height={height ?? '100vh'}
        width={width ?? '100%'}
        className={className}
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;
