"use client";
import { useTheme } from "next-themes";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierCaveLight,
  atelierCaveDark,
  githubGist,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  title: string;
  description: string;
  code: string;
  language?: "cpp" | "python";
};

const CodeBlock = ({ title, description, code, language }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-black px-8 py-4 rounded-md">
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="my-4">{description}</p>
      <SyntaxHighlighter
        style={theme === "light" ? githubGist : atelierCaveDark}
        className="rounded-xl bg-neutral-100"
        language={language ? language : "cpp"}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
