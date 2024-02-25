"use client";
import { useTheme } from "next-themes";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierCaveLight,
  atelierCaveDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  header: string;
  description: string;
  code: string;
  id: string;
  language: "cpp" | "python" | "java";
};

const CodeBlock = ({ header, id, description, code, language }: Props) => {
  const { theme } = useTheme();

  return (
    <div id={id} className="bg-white dark:bg-black px-8 py-4 rounded-md">
      <h3 className="text-2xl font-bold mb-1">{header}</h3>
      <p className="mb-4">{description}</p>
      <SyntaxHighlighter
        style={theme === "light" ? atelierCaveLight : atelierCaveDark}
        className="rounded-xl"
        language={language}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
