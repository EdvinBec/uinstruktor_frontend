import { Editor, Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import React, { useRef } from "react";

type CodeEditorProps = {
  defaultValue?: string;
  defaultLanguage: string;
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
  width?: string;
  className?: string;
  setEditorDidMount?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CodeEditor = ({
  defaultValue,
  defaultLanguage,
  value,
  onChange,
  height,
  width,
  className,
  setEditorDidMount,
}: CodeEditorProps) => {
  const { theme } = useTheme();

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    setEditorDidMount !== undefined && setEditorDidMount!(true);
    monaco.editor.defineTheme("dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "",
          background: "#1c1b22",
        },
      ],
      colors: {
        "editor.background": "#1c1b22",
      },
    });
    monaco.editor.defineTheme("light", {
      base: "vs",
      inherit: true,
      rules: [{ token: "", background: "#ffffff" }],
      colors: {
        "editor.background": "#ffffff",
      },
    });
    if (theme === "light") {
      monaco.editor.setTheme("light");
    } else {
      monaco.editor.setTheme("dark");
    }
  }
  return (
    <div>
      <Editor
        options={{
          fontFamily: "Fira Code",
          fontLigatures: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoClosingComments: "always",
          minimap: {
            autohide: true,
            enabled: false,
          },
        }}
        theme={theme === "light" ? "light" : "dark"}
        height={height ?? "100vh"}
        width={width ?? "100%"}
        className={className}
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
